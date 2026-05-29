import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requireUserId } from './_lib/auth'
import { getSupabaseAdmin } from './_lib/supabaseAdmin'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const userId = await requireUserId(req)
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
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

  const { data: profile, error: fetchErr } = await supabase
    .from('profiles')
    .select('credits_balance')
    .eq('id', userId)
    .single()

  if (fetchErr || !profile) {
    return res.status(404).json({ error: 'Profile not found' })
  }

  const balance = profile.credits_balance
  if (creditsToDeduct > balance) {
    return res.status(402).json({
      error: 'Insufficient credits',
      balance,
      required: creditsToDeduct,
    })
  }

  const newBalance = balance - creditsToDeduct

  const { error: updateErr } = await supabase
    .from('profiles')
    .update({ credits_balance: newBalance })
    .eq('id', userId)

  if (updateErr) {
    return res.status(500).json({ error: 'Failed to update credits' })
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

  return res.status(200).json({ newBalance })
}
