import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requireUserId } from './_lib/auth.js'
import { getCreditWallet } from './_lib/credits.js'
import { getSupabaseAdmin, isSupabaseAdminConfigured, supabaseAdminConfigHint } from './_lib/supabaseAdmin.js'
import {
  respondScrapeError,
  scrapeError,
  scrapeErrorFromUpstream,
  ScrapeUserError,
  throwScrape,
} from './_lib/scrapeErrors.js'

const ACTOR_ID = 'nwua9Gu5YrADL7ZDj'
const BASE = 'https://api.apify.com/v2'
const PREVIEW_MAX_RESULTS = 10

function upstreamHeaders() {
  return {
    Authorization: `Bearer ${process.env.APIFY_API_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.APIFY_API_TOKEN) {
    console.error('[scrape-start] APIFY_API_TOKEN missing')
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
      console.error('[scrape-start] Supabase admin not configured')
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

    if (redownloadSearchId) {
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
        console.error('[scrape-start] credit wallet failed', err)
        return respondScrapeError(res, scrapeError('INTERNAL'))
      }

      if (!wallet) {
        console.error('[scrape-start] profile not found', userId)
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
      console.error('[scrape-start] start run failed', startRes.status, startRaw.slice(0, 500))
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
      console.error('[scrape-start] no run id in start response')
      throwScrape('SEARCH_FAILED')
    }

    return res.status(200).json({ runId })
  } catch (err: unknown) {
    if (err instanceof ScrapeUserError) {
      return respondScrapeError(res, err.payload)
    }
    console.error('[scrape-start] unexpected error', err)
    return respondScrapeError(res, scrapeError('INTERNAL'))
  }
}
