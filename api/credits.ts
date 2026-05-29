import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requireUserId } from './_lib/auth'
import { getCreditWallet } from './_lib/credits'
import { getSupabaseAdmin, isSupabaseAdminConfigured, supabaseAdminConfigHint } from './_lib/supabaseAdmin'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!isSupabaseAdminConfigured()) {
    return res.status(500).json({
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
      return res.status(404).json({ error: 'Profile not found' })
    }

    return res.status(200).json(wallet)
  } catch (err) {
    console.error('[credits] wallet error:', err)
    return res.status(500).json({
      error:
        'Could not load credits. Apply the free-tier migration in Supabase (see docs/FREE_TIER.md).',
    })
  }
}
