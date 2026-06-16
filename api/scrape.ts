import type { VercelRequest, VercelResponse } from '@vercel/node'

// Replaced by /api/scrape-start + /api/scrape-status
export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(410).json({ error: 'This endpoint has been removed. Use /api/scrape-start and /api/scrape-status.' })
}
