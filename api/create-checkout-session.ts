import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { getSiteUrl } from './lib/siteUrl'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) return res.status(500).json({ error: 'STRIPE_SECRET_KEY not configured' })

  const { priceId, userId, userEmail } = req.body as {
    priceId?: string
    userId?: string
    userEmail?: string
  }

  if (!priceId || !userId) return res.status(400).json({ error: 'Missing priceId or userId' })

  const siteUrl = getSiteUrl()

  try {
    const stripe = new Stripe(secretKey)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/dashboard?payment=success`,
      cancel_url: `${siteUrl}/dashboard?payment=cancelled`,
      ...(userEmail ? { customer_email: userEmail } : {}),
      metadata: { userId, priceId },
    })
    return res.status(200).json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error'
    return res.status(500).json({ error: message })
  }
}
