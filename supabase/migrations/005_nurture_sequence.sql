-- Nurture sequence: 4 emails for free-plan users at D+1, D+3, D+7, D+14.
--
-- Also fixes two bugs carried forward from earlier migrations:
--   1. queue_welcome_email() used ON CONFLICT (user_id, template) DO NOTHING, which
--      references a constraint that no longer exists after 004 replaced the unconditional
--      unique index with a partial one (WHERE sent = false). This caused a runtime error.
--   2. process_email_queue() fallback body omitted "template", which the nurture edge
--      function requires. Added to the COALESCE fallback for any payload-less rows.

-- ─── 1. Replace queue_welcome_email() ────────────────────────────────────────
-- Adds nurture rows on confirmation, fixes ON CONFLICT to match the partial index,
-- and populates the payload column for the welcome row (was NULL before).
--
-- Trigger-ordering note: on auth.users INSERT, on_auth_user_confirmed_insert fires
-- BEFORE on_auth_user_created (alphabetical: "confirmed" < "created"). This means the
-- profiles row does not yet exist when this function runs for the INSERT case. The plan
-- SELECT will return NULL, which is treated as 'free' — correct, because all new users
-- start on the free plan. The UPDATE path (magic link confirmation) fires after the
-- profile exists and behaves normally.

CREATE OR REPLACE FUNCTION public.queue_welcome_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_plan text;
BEGIN
  IF (TG_OP = 'INSERT' AND NEW.email_confirmed_at IS NOT NULL)
  OR (TG_OP = 'UPDATE' AND OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
  THEN
    -- Welcome email (5-minute delay, unchanged)
    INSERT INTO public.email_queue (user_id, email, template, send_after, payload)
    VALUES (
      NEW.id,
      NEW.email,
      'welcome',
      now() + interval '5 minutes',
      jsonb_build_object(
        'user_id',    NEW.id::text,
        'email',      NEW.email,
        'created_at', NEW.created_at::text
      )
    )
    ON CONFLICT (user_id, template) WHERE sent = false DO NOTHING;

    -- Nurture sequence: only for free-plan users.
    -- Plan may be NULL here on INSERT (profile not yet created — see note above).
    SELECT plan INTO v_plan FROM public.profiles WHERE id = NEW.id;

    IF COALESCE(v_plan, 'free') = 'free' THEN
      INSERT INTO public.email_queue (user_id, email, template, send_after, payload)
      VALUES
        (
          NEW.id, NEW.email, 'nurture_1',
          now() + interval  '1 day',
          jsonb_build_object('user_id', NEW.id::text, 'email', NEW.email, 'template', 'nurture_1')
        ),
        (
          NEW.id, NEW.email, 'nurture_2',
          now() + interval  '3 days',
          jsonb_build_object('user_id', NEW.id::text, 'email', NEW.email, 'template', 'nurture_2')
        ),
        (
          NEW.id, NEW.email, 'nurture_3',
          now() + interval  '7 days',
          jsonb_build_object('user_id', NEW.id::text, 'email', NEW.email, 'template', 'nurture_3')
        ),
        (
          NEW.id, NEW.email, 'nurture_4',
          now() + interval '14 days',
          jsonb_build_object('user_id', NEW.id::text, 'email', NEW.email, 'template', 'nurture_4')
        )
      ON CONFLICT (user_id, template) WHERE sent = false DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- ─── 2. Replace process_email_queue() ────────────────────────────────────────
-- Adds nurture_1/2/3/4 routing to send-nurture-email.
-- Adds "template" to the COALESCE fallback body so payload-less rows still work.

CREATE OR REPLACE FUNCTION public.process_email_queue()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r        record;
  base_url text;
  svc_key  text;
  fn_path  text;
  body     jsonb;
BEGIN
  base_url := current_setting('app.supabase_url', true);
  svc_key  := current_setting('app.service_role_key', true);

  IF base_url IS NULL OR svc_key IS NULL THEN
    RAISE WARNING 'process_email_queue: app.supabase_url or app.service_role_key not set — skipping';
    RETURN;
  END IF;

  FOR r IN
    SELECT id, user_id, email, template, payload, created_at
    FROM public.email_queue
    WHERE send_after <= now()
      AND sent = false
    ORDER BY send_after
    FOR UPDATE SKIP LOCKED
  LOOP
    fn_path := CASE r.template
      WHEN 'welcome'     THEN '/functions/v1/send-welcome-email'
      WHEN 'low_credits' THEN '/functions/v1/send-low-credits-email'
      WHEN 'nurture_1'   THEN '/functions/v1/send-nurture-email'
      WHEN 'nurture_2'   THEN '/functions/v1/send-nurture-email'
      WHEN 'nurture_3'   THEN '/functions/v1/send-nurture-email'
      WHEN 'nurture_4'   THEN '/functions/v1/send-nurture-email'
      ELSE NULL
    END;

    IF fn_path IS NULL THEN
      RAISE WARNING 'process_email_queue: unknown template "%", skipping row %', r.template, r.id;
      CONTINUE;
    END IF;

    body := COALESCE(
      r.payload,
      jsonb_build_object(
        'user_id',    r.user_id::text,
        'email',      r.email,
        'template',   r.template,
        'created_at', r.created_at::text
      )
    );

    PERFORM net.http_post(
      url     := base_url || fn_path,
      headers := jsonb_build_object(
                   'Content-Type',  'application/json',
                   'Authorization', 'Bearer ' || svc_key
                 ),
      body    := body
    );

    UPDATE public.email_queue SET sent = true WHERE id = r.id;

    IF r.template = 'low_credits' THEN
      UPDATE public.profiles
      SET low_credits_email_sent_at = now()
      WHERE id = r.user_id;
    END IF;
  END LOOP;
END;
$$;

-- No trigger or cron changes needed — existing triggers call queue_welcome_email()
-- by name and the cron job calls process_email_queue() by name.
