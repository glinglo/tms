import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  console.log('[deduct-credits] env keys:', Object.keys(process.env).filter(k => k.includes('SUPABASE')))
  console.log('[deduct-credits] SUPABASE_SERVICE_KEY exists:', !!process.env.SUPABASE_SERVICE_KEY)
  console.log('[deduct-credits] SUPABASE_URL exists:', !!process.env.SUPABASE_URL)
  console.log('[deduct-credits] VITE_SUPABASE_URL exists:', !!process.env.VITE_SUPABASE_URL)

  const { userId, creditsToDeduct, businessType, location, resultCount } = req.body as {
    userId: string
    creditsToDeduct: number
    businessType: string
    location: string
    resultCount: number
  }

  if (!userId || typeof creditsToDeduct !== 'number' || creditsToDeduct < 1) {
    return res.status(400).json({ error: 'Missing or invalid fields' })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY

  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: 'Supabase credentials not configured' })
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  const { data: profile, error: fetchErr } = await supabase
    .from('profiles')
    .select('credits_balance')
    .eq('id', userId)
    .single()

  if (fetchErr || !profile) {
    return res.status(404).json({ error: 'Profile not found' })
  }

  const newBalance = Math.max(0, profile.credits_balance - creditsToDeduct)

  const { error: updateErr } = await supabase
    .from('profiles')
    .update({ credits_balance: newBalance })
    .eq('id', userId)

  if (updateErr) {
    return res.status(500).json({ error: 'Failed to update credits' })
  }

  const { data: insertData, error: insertErr } = await supabase
    .from('searches')
    .insert({
      user_id: userId,
      business_type: businessType,
      location,
      result_count: resultCount,
      credits_used: creditsToDeduct,
    })
    .select()

  return res.status(200).json({
    newBalance,
    debug: {
      insertData,
      insertError: insertErr ? { message: insertErr.message, code: insertErr.code, details: insertErr.details } : null,
    },
  })
}
