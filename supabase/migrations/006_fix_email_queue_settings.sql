-- Fix process_email_queue(): replace current_setting() calls with hardcoded values.
-- Supabase does not support custom GUC parameters via ALTER DATABASE/ROLE, so
-- current_setting('app.supabase_url') always returned NULL, causing silent no-ops.
--
-- ⚠️  Fill in YOUR_SERVICE_ROLE_KEY before running supabase db push.
--     Project Settings → API → service_role (secret) key.

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
  base_url := 'https://kqwtjiybmwzbilpfbcfi.supabase.co';
  svc_key  := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtxd3RqaXlibXd6YmlscGZiY2ZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTM1NjM4NywiZXhwIjoyMDk0OTMyMzg3fQ.-V6kRids_PxWGtoYH6wevSqAWNwPKd8c1_C0ahT2gts';

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
