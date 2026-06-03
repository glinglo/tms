import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const PRICE_TO_CREDITS: Record<string, number> = {
  'price_1TZZGmRgzkWTYE9PbeIfkFEp': 500,
  'price_1TZZGmRgzkWTYE9PyJvrXVRE': 2000,
  'price_1TZZGnRgzkWTYE9Pl81u2Qug': 6000,
}

const PRICE_TO_PLAN: Record<string, string> = {
  'price_1TZZGmRgzkWTYE9PbeIfkFEp': 'starter',
  'price_1TZZGmRgzkWTYE9PyJvrXVRE': 'growth',
  'price_1TZZGnRgzkWTYE9Pl81u2Qug': 'pro',
}

function readRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secretKey || !webhookSecret) {
    return res.status(500).json({ error: 'Stripe env vars not configured' })
  }

  const sig = req.headers['stripe-signature']
  if (!sig) return res.status(400).json({ error: 'Missing stripe-signature header' })

  const stripe = new Stripe(secretKey)
  let event: Stripe.Event

  try {
    const rawBody = await readRawBody(req)
    const body = rawBody.length > 0 ? rawBody : Buffer.from(JSON.stringify(req.body))
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('[webhook] signature verification failed:', err)
    return res.status(400).json({ error: 'Webhook signature verification failed' })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { userId, priceId } = session.metadata ?? {}

    if (!userId || !priceId) {
      console.error('[webhook] missing metadata:', session.metadata)
      return res.status(400).json({ error: 'Missing metadata' })
    }

    const creditsToAdd = PRICE_TO_CREDITS[priceId]
    if (!creditsToAdd) {
      console.error('[webhook] unknown priceId:', priceId)
      return res.status(400).json({ error: 'Unknown priceId' })
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_KEY
    if (!supabaseUrl || !serviceKey) {
      return res.status(500).json({ error: 'Supabase env vars not configured' })
    }

    const supabase = createClient(supabaseUrl, serviceKey)

    const { data: profile, error: fetchErr } = await supabase
      .from('profiles')
      .select('credits_balance')
      .eq('id', userId)
      .single()

    if (fetchErr || !profile) {
      console.error('[webhook] profile not found:', fetchErr)
      return res.status(404).json({ error: 'Profile not found' })
    }

    const newBalance = profile.credits_balance + creditsToAdd

    const { error: updateErr } = await supabase
      .from('profiles')
      .update({ credits_balance: newBalance })
      .eq('id', userId)

    if (updateErr) {
      console.error('[webhook] update error:', updateErr)
      return res.status(500).json({ error: 'Failed to update credits' })
    }

    console.log(`[webhook] +${creditsToAdd} credits → user ${userId}, new balance: ${newBalance}`)

    // Cancel pending nurture emails — user has upgraded
    const { error: nurtureErr } = await supabase
      .from('email_queue')
      .update({ sent: true })
      .eq('user_id', userId)
      .eq('sent', false)
      .like('template', 'nurture_%')

    if (nurtureErr) {
      console.error('[webhook] failed to cancel nurture emails:', nurtureErr)
    } else {
      console.log(`[webhook] cancelled pending nurture emails for user ${userId}`)
    }

    // Update plan in profiles
    const plan = PRICE_TO_PLAN[priceId]
    const { error: planErr } = await supabase
      .from('profiles')
      .update({ plan })
      .eq('id', userId)

    if (planErr) {
      console.error('[webhook] failed to update plan:', planErr)
    } else {
      console.log(`[webhook] plan → ${plan} for user ${userId}`)
    }
  }

  return res.status(200).json({ received: true })
}
