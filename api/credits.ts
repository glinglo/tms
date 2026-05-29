import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requireUserId } from './lib/auth'
import { getCreditWallet } from './lib/credits'
import { getSupabaseAdmin, isSupabaseAdminConfigured, supabaseAdminConfigHint } from './lib/supabaseAdmin'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    return await handleCredits(req, res)
  } catch (err) {
    console.error('[credits] unhandled:', err)
    return res.status(500).json({ code: 'INTERNAL', error: 'Could not load credits.' })
  }
}

async function handleCredits(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!isSupabaseAdminConfigured()) {
    return res.status(500).json({
      code: 'CONFIG_MISSING',
      error: supabaseAdminConfigHint() ?? 'Server configuration error',
    })
  }

  const userId = await requireUserId(req)
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized — sign in again' })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase credentials not configured' })
  }

  try {
    const wallet = await getCreditWallet(supabase, userId)
    if (!wallet) {
      return res.status(404).json({ code: 'PROFILE_NOT_FOUND', error: 'Profile not found' })
    }

    return res.status(200).json(wallet)
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    console.error('[credits] wallet error:', detail)
    const migrationHint =
      /column|free_credits_used|credits_period/i.test(detail)
    return res.status(500).json({
      code: migrationHint ? 'DB_SCHEMA' : 'WALLET_ERROR',
      error: migrationHint
        ? 'Database missing free-tier columns. Run supabase/migrations/001_free_monthly_credits.sql in Supabase SQL Editor.'
        : 'Could not load credits.',
      detail: process.env.NODE_ENV === 'development' ? detail : undefined,
    })
  }
}
