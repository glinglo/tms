-- pg_cron job to dispatch pending emails via the send-welcome-email Edge Function.
-- Requires: pg_cron and pg_net extensions (both enabled by default on Supabase Pro/Team).
--
-- BEFORE RUNNING THIS MIGRATION you must set two database settings.
-- Run these in the Supabase SQL editor (replace the placeholder values):
--
--   ALTER DATABASE postgres
--     SET app.supabase_url = 'https://<your-project-ref>.supabase.co';
--
--   ALTER DATABASE postgres
--     SET app.service_role_key = '<your-service-role-key>';
--
-- The service role key is in: Supabase Dashboard → Project Settings → API.
-- These settings are never exposed via the public PostgREST API.

-- ─── Processor function ───────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.process_email_queue()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r record;
  base_url text;
  svc_key  text;
BEGIN
  base_url := current_setting('app.supabase_url', true);
  svc_key  := current_setting('app.service_role_key', true);

  IF base_url IS NULL OR svc_key IS NULL THEN
    RAISE WARNING 'process_email_queue: app.supabase_url or app.service_role_key not set — skipping';
    RETURN;
  END IF;

  FOR r IN
    SELECT id, user_id, email, created_at
    FROM public.email_queue
    WHERE send_after <= now()
      AND sent = false
    ORDER BY send_after
    FOR UPDATE SKIP LOCKED        -- safe under concurrent cron runs
  LOOP
    -- Fire-and-forget HTTP POST via pg_net (async, non-blocking)
    PERFORM net.http_post(
      url     := base_url || '/functions/v1/send-welcome-email',
      headers := jsonb_build_object(
                   'Content-Type',  'application/json',
                   'Authorization', 'Bearer ' || svc_key
                 ),
      body    := jsonb_build_object(
                   'user_id',    r.user_id::text,
                   'email',      r.email,
                   'created_at', r.created_at::text
                 )
    );

    -- Mark sent immediately; the Edge Function has its own 10-min idempotency guard
    -- so a false positive here (net failure) at worst skips one email rather than spamming
    UPDATE public.email_queue SET sent = true WHERE id = r.id;
  END LOOP;
END;
$$;

-- ─── pg_cron schedule ─────────────────────────────────────────────────────────

-- Remove any previous version of this job before (re-)creating it
SELECT cron.unschedule('process-email-queue')
WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'process-email-queue'
);

SELECT cron.schedule(
  'process-email-queue',
  '*/2 * * * *',          -- every 2 minutes
  'SELECT public.process_email_queue()'
);
