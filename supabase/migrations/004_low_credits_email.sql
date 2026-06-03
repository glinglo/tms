-- Low-credits email trigger.
-- Also fixes email_queue unique index and upgrades process_email_queue()
-- to route by template and carry arbitrary payloads.

-- ─── 1. Fix email_queue unique index ─────────────────────────────────────────
-- The previous index (user_id, template) blocked a second low-credits email
-- even after the first was sent. Replace with a partial index that only
-- enforces uniqueness while a row is still pending (sent = false).

DROP INDEX IF EXISTS public.email_queue_user_template_uidx;

CREATE UNIQUE INDEX email_queue_user_template_uidx
  ON public.email_queue (user_id, template)
  WHERE sent = false;

-- ─── 2. Add payload column to email_queue ────────────────────────────────────
-- Stores the JSON body forwarded to the Edge Function.
-- NULL is fine for existing welcome rows (processor falls back to legacy fields).

ALTER TABLE public.email_queue
  ADD COLUMN IF NOT EXISTS payload jsonb;

-- ─── 3. Extend profiles ───────────────────────────────────────────────────────
-- plan: which pricing tier the user is on.
-- low_credits_email_sent_at: timestamp of the last low-credits email dispatched;
--   used to enforce the 7-day cooldown without a separate lookup table.
--
-- ⚠️  Set plan values for existing users after this migration if needed, e.g.:
--   UPDATE public.profiles SET plan = 'starter' WHERE <condition>;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS plan text NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS low_credits_email_sent_at timestamptz;

-- ─── 4. Plan credit limits ────────────────────────────────────────────────────
-- ⚠️  Adjust the Starter / Pro limits to match your actual pricing before deploying.

CREATE OR REPLACE FUNCTION public.plan_credit_limit(p_plan text)
RETURNS integer
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE p_plan
    WHEN 'free'    THEN 50
    WHEN 'starter' THEN 500
    WHEN 'growth'  THEN 2000
    WHEN 'pro'     THEN 6000
    ELSE 50
  END;
$$;

-- ─── 5. Trigger function: queue_low_credits_email ────────────────────────────
-- Fires on UPDATE of credits_balance on public.profiles.
-- Queues an email when credits cross below 20 % of the plan limit, but only if:
--   a) the crossing is a downward transition (OLD was above threshold)
--   b) no low-credits email was sent in the last 7 days

CREATE OR REPLACE FUNCTION public.queue_low_credits_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_limit     integer;
  v_threshold integer;
  v_user_email text;
BEGIN
  v_limit     := public.plan_credit_limit(NEW.plan);
  v_threshold := (v_limit * 0.20)::integer;

  -- Only fire on a downward crossing of the threshold
  IF NEW.credits_balance >= v_threshold OR OLD.credits_balance < v_threshold THEN
    RETURN NEW;
  END IF;

  -- Enforce 7-day cooldown
  IF OLD.low_credits_email_sent_at IS NOT NULL
     AND OLD.low_credits_email_sent_at > now() - interval '7 days'
  THEN
    RETURN NEW;
  END IF;

  -- Fetch the user's email from auth.users
  SELECT email INTO v_user_email
  FROM auth.users
  WHERE id = NEW.id;

  IF v_user_email IS NULL THEN
    RETURN NEW;
  END IF;

  -- Record intent immediately so back-to-back updates don't re-trigger within the window
  NEW.low_credits_email_sent_at := now();

  INSERT INTO public.email_queue (user_id, email, template, send_after, payload)
  VALUES (
    NEW.id,
    v_user_email,
    'low_credits',
    now(),   -- send immediately (no artificial delay needed for operational alerts)
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

-- ─── 6. Trigger on profiles ───────────────────────────────────────────────────

DROP TRIGGER IF EXISTS on_credits_low ON public.profiles;
CREATE TRIGGER on_credits_low
  BEFORE UPDATE OF credits_balance ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.queue_low_credits_email();

-- ─── 7. Replace process_email_queue() ────────────────────────────────────────
-- Routes each queued row to its Edge Function by template name.
-- Forwards the stored payload (or falls back to legacy fields for welcome rows
-- that predate the payload column).
-- After dispatching a low_credits email, stamps profiles.low_credits_email_sent_at
-- so the 7-day cooldown is anchored to actual dispatch time.

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
    -- Route to the correct Edge Function
    fn_path := CASE r.template
      WHEN 'welcome'     THEN '/functions/v1/send-welcome-email'
      WHEN 'low_credits' THEN '/functions/v1/send-low-credits-email'
      ELSE NULL
    END;

    IF fn_path IS NULL THEN
      RAISE WARNING 'process_email_queue: unknown template "%", skipping row %', r.template, r.id;
      CONTINUE;
    END IF;

    -- Use stored payload when available; fall back to legacy fields for old welcome rows
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

    -- Stamp dispatch time so the 7-day cooldown is anchored to when we actually sent,
    -- not when the trigger queued the row (which already set low_credits_email_sent_at
    -- optimistically — this corrects it to the real send time).
    IF r.template = 'low_credits' THEN
      UPDATE public.profiles
      SET low_credits_email_sent_at = now()
      WHERE id = r.user_id;
    END IF;
  END LOOP;
END;
$$;

-- No cron reschedule needed — same job name and schedule, function is replaced in place.
