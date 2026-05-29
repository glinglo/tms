import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requireUserId } from './_lib/auth'
import { deductCredits } from './_lib/credits'
import { getSupabaseAdmin, isSupabaseAdminConfigured, supabaseAdminConfigHint } from './_lib/supabaseAdmin'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
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

  const { creditsToDeduct, businessType, location, resultCount } = req.body as {
    creditsToDeduct?: number
    businessType?: string
    location?: string
    resultCount?: number
  }

  if (typeof creditsToDeduct !== 'number' || creditsToDeduct < 1) {
    return res.status(400).json({ error: 'Missing or invalid creditsToDeduct' })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase credentials not configured' })
  }

  try {
    const result = await deductCredits(supabase, userId, creditsToDeduct)

    if (!result.ok) {
      const { wallet } = result
      return res.status(402).json({
        error: 'Insufficient credits',
        balance: wallet.totalAvailable,
        freeRemaining: wallet.freeRemaining,
        paidBalance: wallet.paidBalance,
        required: creditsToDeduct,
      })
    }

    if (businessType && location && typeof resultCount === 'number') {
      await supabase.from('searches').insert({
        user_id: userId,
        business_type: businessType,
        location,
        result_count: resultCount,
        credits_used: creditsToDeduct,
      })
    }

    return res.status(200).json({
      newBalance: result.wallet.totalAvailable,
      wallet: result.wallet,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message === 'Profile not found') {
      return res.status(404).json({ error: 'Profile not found' })
    }
    console.error('[deduct-credits]', err)
    return res.status(500).json({ error: 'Failed to update credits' })
  }
}
