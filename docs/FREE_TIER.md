# Free tier — 50 leads/month

## Model

| Bucket | Column | Behavior |
|--------|--------|----------|
| Free monthly | `free_credits_used` + `credits_period` | Up to **50** leads per UTC calendar month; resets when the month changes |
| Paid | `credits_balance` | Added by Stripe webhook; **never** reset |

Deduction uses free allowance first, then paid balance.

## Vercel (required for `/api/credits`, scrape, deduct)

In **Production** (and Preview if you test there), set:

| Variable | Value |
|----------|--------|
| `SUPABASE_URL` | Same as `VITE_SUPABASE_URL` |
| `SUPABASE_SERVICE_KEY` | Service role secret (Supabase → Project Settings → API) |

Without `SUPABASE_SERVICE_KEY`, `/api/credits` returns **500** and the dashboard may show **0 credits** until the client fallback reads your profile (after a frontend deploy with fallback).

## Deploy (required once)

1. Open [Supabase](https://supabase.com/dashboard) → your project → **SQL Editor**.
2. Paste and run the full script: `supabase/migrations/001_free_monthly_credits.sql`
3. Confirm `profiles` has columns `free_credits_used` and `credits_period`.
4. New sign-ups get a profile row via `on_auth_user_created` with **0 paid** and **50 free** for the current month.

Existing users keep their current `credits_balance` as paid credits; free allowance starts fresh for the current month after migration.

## API

- `GET /api/credits` — returns wallet (`freeRemaining`, `paidBalance`, `totalAvailable`, …)
- `POST /api/deduct-credits` — spends free first, then paid
- `POST /api/scrape` — caps `maxResults` to `totalAvailable` (except re-download)
