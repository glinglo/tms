import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  respondScrapeError,
  scrapeError,
  scrapeErrorFromRunStatus,
  scrapeErrorFromUpstream,
  ScrapeUserError,
} from './_lib/scrapeErrors.js'

const BASE = 'https://api.apify.com/v2'

function upstreamHeaders() {
  return { Authorization: `Bearer ${process.env.APIFY_API_TOKEN}` }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.APIFY_API_TOKEN) {
    return respondScrapeError(res, scrapeError('INTERNAL'))
  }

  const runId = typeof req.query.runId === 'string' ? req.query.runId.trim() : null
  if (!runId) {
    return respondScrapeError(res, scrapeError('INVALID_REQUEST'))
  }

  try {
    const statusRes = await fetch(`${BASE}/actor-runs/${runId}`, {
      headers: upstreamHeaders(),
    })

    const raw = await statusRes.text()
    if (!statusRes.ok) {
      console.error('[scrape-status] status fetch failed', statusRes.status, raw.slice(0, 300))
      throw new ScrapeUserError(scrapeErrorFromUpstream(statusRes.status, raw))
    }

    let body: { data?: { status: string; defaultDatasetId?: string } }
    try {
      body = JSON.parse(raw) as { data?: { status: string; defaultDatasetId?: string } }
    } catch {
      return respondScrapeError(res, scrapeError('INTERNAL'))
    }

    const status = body.data?.status
    const defaultDatasetId = body.data?.defaultDatasetId

    if (!status) {
      return respondScrapeError(res, scrapeError('SEARCH_FAILED'))
    }

    if (status === 'RUNNING' || status === 'READY' || status === 'CREATED') {
      return res.status(200).json({ status: 'pending' })
    }

    if (status === 'FAILED' || status === 'ABORTED' || status === 'TIMED-OUT') {
      console.error('[scrape-status] run ended with status', status, runId)
      return respondScrapeError(res, scrapeErrorFromRunStatus(status))
    }

    if (status === 'SUCCEEDED') {
      if (!defaultDatasetId) {
        console.error('[scrape-status] SUCCEEDED but no datasetId', runId)
        return respondScrapeError(res, scrapeError('SEARCH_FAILED'))
      }

      const itemsRes = await fetch(
        `${BASE}/datasets/${defaultDatasetId}/items?clean=true&format=json`,
        { headers: upstreamHeaders() },
      )

      if (!itemsRes.ok) {
        const itemsRaw = await itemsRes.text()
        console.error('[scrape-status] dataset fetch failed', itemsRes.status, itemsRaw.slice(0, 300))
        throw new ScrapeUserError(scrapeErrorFromUpstream(itemsRes.status, itemsRaw))
      }

      const items = await itemsRes.json() as Record<string, unknown>[]

      const first = (arr: unknown): string | null => {
        if (Array.isArray(arr) && arr.length > 0 && typeof arr[0] === 'string') return arr[0]
        return null
      }

      const results = items.map((item) => ({
        title: (item.title as string | null) ?? null,
        phone: (item.phone as string | null) ?? null,
        address: (item.address as string | null) ?? null,
        totalScore: (item.totalScore as number | null) ?? null,
        reviewsCount: (item.reviewsCount as number | null) ?? null,
        website: (item.website as string | null) ?? null,
        email: first(item.emails),
        instagram: first(item.instagrams),
        facebook: first(item.facebooks),
        linkedin: first(item.linkedIns),
      }))

      return res.status(200).json({ status: 'done', results, total: results.length })
    }

    console.error('[scrape-status] unexpected run status', status, runId)
    return respondScrapeError(res, scrapeError('SEARCH_FAILED'))
  } catch (err: unknown) {
    if (err instanceof ScrapeUserError) {
      return respondScrapeError(res, err.payload)
    }
    console.error('[scrape-status] unexpected error', err)
    return respondScrapeError(res, scrapeError('INTERNAL'))
  }
}
