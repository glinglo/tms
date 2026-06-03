-- Email queue: holds outbound emails to be dispatched on a delay.
-- Requires pg_net extension (enabled by default on Supabase).

-- ─── Table ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.email_queue (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text        NOT NULL,
  template    text        NOT NULL,
  send_after  timestamptz NOT NULL,
  sent        boolean     NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Prevent duplicate welcome emails per user
CREATE UNIQUE INDEX IF NOT EXISTS email_queue_user_template_uidx
  ON public.email_queue (user_id, template);

-- Speed up the cron processor query
CREATE INDEX IF NOT EXISTS email_queue_pending_idx
  ON public.email_queue (send_after)
  WHERE sent = false;

-- ─── Trigger function ─────────────────────────────────────────────────────────
-- Separate from handle_new_user() / on_auth_user_created which manages profiles.
-- Fires on:
--   INSERT  → user confirmed immediately (OAuth, admin-created, etc.)
--   UPDATE  → user confirmed email via magic link / OTP (email_confirmed_at flips NULL → non-NULL)

CREATE OR REPLACE FUNCTION public.queue_welcome_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (TG_OP = 'INSERT' AND NEW.email_confirmed_at IS NOT NULL)
  OR (TG_OP = 'UPDATE' AND OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
  THEN
    INSERT INTO public.email_queue (user_id, email, template, send_after)
    VALUES (
      NEW.id,
      NEW.email,
      'welcome',
      now() + interval '5 minutes'
    )
    ON CONFLICT (user_id, template) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- ─── Triggers ─────────────────────────────────────────────────────────────────

-- Covers immediate-confirm flows (OAuth, admin invite, etc.)
DROP TRIGGER IF EXISTS on_auth_user_confirmed_insert ON auth.users;
CREATE TRIGGER on_auth_user_confirmed_insert
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.queue_welcome_email();

-- Covers magic link / OTP flows where confirmation is a later UPDATE
DROP TRIGGER IF EXISTS on_auth_user_confirmed_update ON auth.users;
CREATE TRIGGER on_auth_user_confirmed_update
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.queue_welcome_email();
