import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requireUserId } from './_lib/auth'
import { getCreditWallet } from './_lib/credits'
import { getSupabaseAdmin, isSupabaseAdminConfigured, supabaseAdminConfigHint } from './_lib/supabaseAdmin'
import {
  respondScrapeError,
  scrapeError,
  scrapeErrorFromRunStatus,
  scrapeErrorFromUpstream,
  ScrapeUserError,
  throwScrape,
} from './_lib/scrapeErrors'

const ACTOR_ID = 'nwua9Gu5YrADL7ZDj'
const BASE = 'https://api.apify.com/v2'
const POLL_INTERVAL_MS = 3000
const TIMEOUT_MS = 420000
const PREVIEW_MAX_RESULTS = 10

function upstreamHeaders() {
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
      headers: upstreamHeaders(),
    })
    const raw = await res.text()
    if (!res.ok) {
      console.error('[scrape] poll run failed', res.status, raw.slice(0, 500))
      throw new ScrapeUserError(scrapeErrorFromUpstream(res.status, raw))
    }
    let body: { data?: { status: string; defaultDatasetId: string } }
    try {
      body = JSON.parse(raw) as { data?: { status: string; defaultDatasetId: string } }
    } catch {
      throwScrape('SEARCH_FAILED')
    }
    const status = body.data?.status
    const defaultDatasetId = body.data?.defaultDatasetId
    if (status === 'SUCCEEDED' && defaultDatasetId) return defaultDatasetId
    if (status === 'FAILED' || status === 'ABORTED' || status === 'TIMED-OUT') {
      console.error('[scrape] run ended', status, runId)
      throw new ScrapeUserError(scrapeErrorFromRunStatus(status))
    }
  }
  throwScrape('SEARCH_TIMEOUT')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.APIFY_API_TOKEN
  if (!token) {
    console.error('[scrape] APIFY_API_TOKEN missing')
    return respondScrapeError(res, scrapeError('INTERNAL'))
  }

  const {
    businessType,
    location,
    maxResults = 100,
    leadEnrichment = false,
    redownloadSearchId,
    preview = false,
  } = req.body as {
    businessType?: string
    location?: string
    maxResults?: number
    leadEnrichment?: boolean
    redownloadSearchId?: string
    preview?: boolean
  }

  if (!businessType?.trim() || !location?.trim()) {
    return respondScrapeError(res, scrapeError('INVALID_REQUEST'))
  }

  let effectiveMax = Math.max(1, Math.floor(maxResults))

  if (preview) {
    if (leadEnrichment || redownloadSearchId) {
      return respondScrapeError(res, scrapeError('INVALID_REQUEST'))
    }
    effectiveMax = Math.min(effectiveMax, PREVIEW_MAX_RESULTS)
  } else {
    if (!isSupabaseAdminConfigured()) {
      console.error('[scrape] Supabase admin not configured')
      return respondScrapeError(res, scrapeError('INTERNAL', supabaseAdminConfigHint()))
    }

    const userId = await requireUserId(req)
    if (!userId) {
      return respondScrapeError(res, scrapeError('UNAUTHORIZED'))
    }

    const supabase = getSupabaseAdmin()
    if (!supabase) {
      return respondScrapeError(res, scrapeError('INTERNAL', supabaseAdminConfigHint()))
    }

    const isRedownload = Boolean(redownloadSearchId)

    if (isRedownload) {
      const { data: prior, error: priorErr } = await supabase
        .from('searches')
        .select('id')
        .eq('id', redownloadSearchId)
        .eq('user_id', userId)
        .maybeSingle()

      if (priorErr || !prior) {
        return respondScrapeError(
          res,
          scrapeError('INVALID_REQUEST', 'This export could not be found.'),
        )
      }
    } else {
      let wallet
      try {
        wallet = await getCreditWallet(supabase, userId)
      } catch (err) {
        console.error('[scrape] credit wallet failed', err)
        return respondScrapeError(res, scrapeError('INTERNAL'))
      }

      if (!wallet) {
        console.error('[scrape] profile not found', userId)
        return respondScrapeError(res, scrapeError('INTERNAL'))
      }

      if (wallet.totalAvailable <= 0) {
        return respondScrapeError(res, scrapeError('NO_CREDITS'))
      }

      effectiveMax = Math.min(effectiveMax, wallet.totalAvailable)
    }
  }

  try {
    const startRes = await fetch(`${BASE}/acts/${ACTOR_ID}/runs`, {
      method: 'POST',
      headers: upstreamHeaders(),
      body: JSON.stringify({
        searchStringsArray: [businessType.trim()],
        locationQuery: location.trim(),
        maxCrawledPlacesPerSearch: effectiveMax,
        language: 'en',
        scrapeContacts: leadEnrichment,
        scrapePlaceDetailPage: leadEnrichment,
        ...(leadEnrichment ? { website: 'withWebsite' as const } : {}),
        maxImages: 0,
      }),
    })

    const startRaw = await startRes.text()
    if (!startRes.ok) {
      console.error('[scrape] start run failed', startRes.status, startRaw.slice(0, 500))
      throw new ScrapeUserError(scrapeErrorFromUpstream(startRes.status, startRaw))
    }

    let startBody: { data?: { id: string } }
    try {
      startBody = JSON.parse(startRaw) as { data?: { id: string } }
    } catch {
      throwScrape('SEARCH_FAILED')
    }

    const runId = startBody.data?.id
    if (!runId) {
      console.error('[scrape] no run id in start response')
      throwScrape('SEARCH_FAILED')
    }

    const datasetId = await pollRun(runId)

    const itemsRes = await fetch(
      `${BASE}/datasets/${datasetId}/items?clean=true&format=json`,
      { headers: upstreamHeaders() },
    )

    if (!itemsRes.ok) {
      const itemsRaw = await itemsRes.text()
      console.error('[scrape] dataset fetch failed', itemsRes.status, itemsRaw.slice(0, 300))
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

    return res.status(200).json({ results, total: results.length })
  } catch (err: unknown) {
    if (err instanceof ScrapeUserError) {
      return respondScrapeError(res, err.payload)
    }
    console.error('[scrape] unexpected error', err)
    return respondScrapeError(res, scrapeError('INTERNAL'))
  }
}
