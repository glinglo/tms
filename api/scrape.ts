import type { VercelRequest, VercelResponse } from '@vercel/node'

const ACTOR_ID = 'nwua9Gu5YrADL7ZDj'
const BASE = 'https://api.apify.com/v2'
const POLL_INTERVAL_MS = 3000
const TIMEOUT_MS = 420000

function apifyHeaders() {
  return {
    Authorization: `Bearer ${process.env.APIFY_API_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

async function pollRun(runId: string): Promise<string> {
  const deadline = Date.now() + TIMEOUT_MS
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS))
    const res = await fetch(`${BASE}/acts/${ACTOR_ID}/runs/${runId}`, {
      headers: apifyHeaders(),
    })
    const body = await res.json() as { data: { status: string; defaultDatasetId: string } }
    const { status, defaultDatasetId } = body.data
    if (status === 'SUCCEEDED') return defaultDatasetId
    if (status === 'FAILED' || status === 'ABORTED' || status === 'TIMED-OUT') {
      throw new Error(`Apify run ended with status: ${status}`)
    }
  }
  throw new Error('Timed out waiting for Apify run to complete')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.APIFY_API_TOKEN
  if (!token) {
    return res.status(500).json({ error: 'APIFY_API_TOKEN is not configured' })
  }

  const { businessType, location, maxResults = 100 } = req.body as {
    businessType?: string
    location?: string
    maxResults?: number
  }

  if (!businessType?.trim() || !location?.trim()) {
    return res.status(400).json({ error: 'businessType and location are required' })
  }

  try {
    // 1. Start the actor run
    const startRes = await fetch(`${BASE}/acts/${ACTOR_ID}/runs`, {
      method: 'POST',
      headers: apifyHeaders(),
      body: JSON.stringify({
        searchStringsArray: [businessType.trim()],
        locationQuery: location.trim(),
        maxCrawledPlacesPerSearch: maxResults,
        language: 'en',
      }),
    })

    if (!startRes.ok) {
      const detail = await startRes.text()
      return res.status(502).json({ error: 'Failed to start Apify run', detail })
    }

    const startBody = await startRes.json() as { data: { id: string } }
    const runId = startBody.data?.id
    if (!runId) {
      return res.status(502).json({ error: 'Apify did not return a run ID' })
    }

    // 2. Poll until SUCCEEDED
    const datasetId = await pollRun(runId)

    // 3. Fetch dataset items
    const itemsRes = await fetch(
      `${BASE}/datasets/${datasetId}/items?clean=true&format=json`,
      { headers: apifyHeaders() }
    )

    if (!itemsRes.ok) {
      return res.status(502).json({ error: 'Failed to fetch dataset items' })
    }

    const items = await itemsRes.json() as Record<string, unknown>[]

    // 4. Map to the fields we expose
    const results = items.map((item) => ({
      title:        (item.title        as string  | null) ?? null,
      phone:        (item.phone        as string  | null) ?? null,
      address:      (item.address      as string  | null) ?? null,
      totalScore:   (item.totalScore   as number  | null) ?? null,
      reviewsCount: (item.reviewsCount as number  | null) ?? null,
      website:      (item.website      as string  | null) ?? null,
      email:        (item.email        as string  | null) ?? null,
    }))

    return res.status(200).json({ results, total: results.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return res.status(500).json({ error: message })
  }
}
