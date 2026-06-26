-- Zero-credits email trigger.
-- Fires when credits_balance crosses from > 0 to <= 0.
-- Fetches the user's last search for personalised copy.
-- Routes through the existing send-low-credits-email Edge Function.

-- ─── 1. Track zero-credits email dispatch ────────────────────────────────────

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS zero_credits_email_sent_at timestamptz;

-- ─── 2. Update trigger function ──────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.queue_low_credits_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_limit          integer;
  v_threshold      integer;
  v_user_email     text;
  v_business_type  text;
  v_location       text;
BEGIN
  -- ── Zero-credits branch ────────────────────────────────────────────────────
  IF NEW.credits_balance <= 0 AND OLD.credits_balance > 0 THEN
    SELECT email INTO v_user_email FROM auth.users WHERE id = NEW.id;

    IF v_user_email IS NOT NULL THEN
      SELECT s.business_type, s.location
        INTO v_business_type, v_location
        FROM public.searches s
       WHERE s.user_id = NEW.id
       ORDER BY s.created_at DESC
       LIMIT 1;

      INSERT INTO public.email_queue (user_id, email, template, send_after, payload)
      VALUES (
        NEW.id,
        v_user_email,
        'zero_credits',
        now(),
        jsonb_build_object(
          'user_id',           NEW.id::text,
          'email',             v_user_email,
          'credits_remaining', 0,
          'business_type',     v_business_type,
          'location',          v_location
        )
      )
      ON CONFLICT (user_id, template) WHERE sent = false DO NOTHING;
    END IF;

    RETURN NEW;
  END IF;

  -- ── Low-credits branch (unchanged) ────────────────────────────────────────
  v_limit     := public.plan_credit_limit(NEW.plan);
  v_threshold := (v_limit * 0.20)::integer;

  IF NEW.credits_balance >= v_threshold OR OLD.credits_balance < v_threshold THEN
    RETURN NEW;
  END IF;

  IF OLD.low_credits_email_sent_at IS NOT NULL
     AND OLD.low_credits_email_sent_at > now() - interval '7 days'
  THEN
    RETURN NEW;
  END IF;

  SELECT email INTO v_user_email FROM auth.users WHERE id = NEW.id;
  IF v_user_email IS NULL THEN
    RETURN NEW;
  END IF;

  NEW.low_credits_email_sent_at := now();

  INSERT INTO public.email_queue (user_id, email, template, send_after, payload)
  VALUES (
    NEW.id,
    v_user_email,
    'low_credits',
    now(),
    jsonb_build_object(
      'user_id',           NEW.id::text,
      'email',             v_user_email,
      'credits_remaining', NEW.credits_balance,
      'plan',              NEW.plan
    )
  )
  ON CONFLICT (user_id, template) WHERE sent = false DO NOTHING;

  RETURN NEW;
END;
$$;

-- ─── 3. Update process_email_queue() ─────────────────────────────────────────
-- Adds zero_credits routing and stamps zero_credits_email_sent_at after send.

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
      WHEN 'welcome'      THEN '/functions/v1/send-welcome-email'
      WHEN 'low_credits'  THEN '/functions/v1/send-low-credits-email'
      WHEN 'zero_credits' THEN '/functions/v1/send-low-credits-email'
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
      UPDATE public.profiles SET low_credits_email_sent_at = now() WHERE id = r.user_id;
    END IF;

    IF r.template = 'zero_credits' THEN
      UPDATE public.profiles SET zero_credits_email_sent_at = now() WHERE id = r.user_id;
    END IF;
  END LOOP;
END;
$$;
