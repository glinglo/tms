-- Free tier: 50 leads/month (UTC calendar month) + paid credits_balance (never reset).
-- Run in Supabase SQL Editor or via Supabase CLI.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS free_credits_used integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS credits_period text;

UPDATE public.profiles
SET credits_period = to_char(timezone('UTC', now()), 'YYYY-MM')
WHERE credits_period IS NULL;

-- Backfill profiles for users created before a trigger existed
INSERT INTO public.profiles (id, credits_balance, free_credits_used, credits_period)
SELECT
  u.id,
  0,
  0,
  to_char(timezone('UTC', now()), 'YYYY-MM')
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = u.id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, credits_balance, free_credits_used, credits_period)
  VALUES (
    NEW.id,
    0,
    0,
    to_char(timezone('UTC', now()), 'YYYY-MM')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
