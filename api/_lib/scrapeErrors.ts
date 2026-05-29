/** User-facing scrape errors — never mention upstream providers. */

export type ScrapeErrorCode =
  | 'NO_CREDITS'
  | 'UNAUTHORIZED'
  | 'SERVICE_UNAVAILABLE'
  | 'SEARCH_FAILED'
  | 'SEARCH_TIMEOUT'
  | 'SEARCH_BUSY'
  | 'INVALID_REQUEST'
  | 'INTERNAL'

export interface ScrapeErrorPayload {
  error: string
  code: ScrapeErrorCode
}

const MESSAGES: Record<ScrapeErrorCode, string> = {
  NO_CREDITS:
    'You have no credits left. Buy a credit pack to run new searches.',
  UNAUTHORIZED:
    'Your session expired. Please sign out and sign in again.',
  SERVICE_UNAVAILABLE:
    'Lead search is temporarily unavailable. Please try again in a few hours or contact support if this continues.',
  SEARCH_FAILED:
    'We could not complete this search. Try a smaller area, fewer leads, or turn off lead enrichment.',
  SEARCH_TIMEOUT:
    'This search took too long. Try fewer leads or a more specific location.',
  SEARCH_BUSY:
    'Search is temporarily busy. Please wait a minute and try again.',
  INVALID_REQUEST:
    'Invalid search request. Check your business type and location.',
  INTERNAL:
    'Something went wrong on our side. Please try again in a few minutes.',
}

export function scrapeError(
  code: ScrapeErrorCode,
  override?: string,
): ScrapeErrorPayload {
  return { code, error: override ?? MESSAGES[code] }
}

function textLooksLikeUsageLimit(text: string): boolean {
  const lower = text.toLowerCase()
  return (
    lower.includes('usage limit') ||
    lower.includes('billing cycle') ||
    lower.includes('maximum usage') ||
    lower.includes('platform usage') ||
    lower.includes('monthly platform') ||
    lower.includes('upgrade your plan') ||
    lower.includes('payment required') ||
    lower.includes('insufficient credit') ||
    lower.includes('not enough usage')
  )
}

/** Map HTTP status + body from upstream run/start APIs to a safe client payload. */
export function scrapeErrorFromUpstream(
  httpStatus: number,
  rawBody: string,
): ScrapeErrorPayload {
  if (textLooksLikeUsageLimit(rawBody)) {
    return scrapeError('SERVICE_UNAVAILABLE')
  }

  if (httpStatus === 401 || httpStatus === 403) {
    if (rawBody.toLowerCase().includes('token') || rawBody.toLowerCase().includes('unauthorized')) {
      return scrapeError('INTERNAL')
    }
    return scrapeError('SEARCH_BUSY')
  }

  if (httpStatus === 402 || httpStatus === 429) {
    return scrapeError('SERVICE_UNAVAILABLE')
  }

  if (httpStatus >= 500) {
    return scrapeError('SEARCH_BUSY')
  }

  return scrapeError('SEARCH_FAILED')
}

export function scrapeErrorFromRunStatus(status: string): ScrapeErrorPayload {
  const s = status.toUpperCase()
  if (s === 'ABORTED') {
    return scrapeError('SERVICE_UNAVAILABLE')
  }
  if (s === 'TIMED-OUT') {
    return scrapeError('SEARCH_TIMEOUT')
  }
  return scrapeError('SEARCH_FAILED')
}

export function statusForCode(code: ScrapeErrorCode): number {
  switch (code) {
    case 'NO_CREDITS':
      return 403
    case 'UNAUTHORIZED':
      return 401
    case 'INVALID_REQUEST':
      return 400
    case 'SERVICE_UNAVAILABLE':
      return 503
    case 'SEARCH_TIMEOUT':
      return 504
    case 'SEARCH_FAILED':
    case 'SEARCH_BUSY':
      return 502
    default:
      return 500
  }
}

export function respondScrapeError(
  res: { status: (n: number) => { json: (b: ScrapeErrorPayload) => void } },
  payload: ScrapeErrorPayload,
): void {
  res.status(statusForCode(payload.code)).json(payload)
}

export class ScrapeUserError extends Error {
  readonly payload: ScrapeErrorPayload

  constructor(payload: ScrapeErrorPayload) {
    super(payload.error)
    this.payload = payload
  }
}

export function throwScrape(code: ScrapeErrorCode, override?: string): never {
  throw new ScrapeUserError(scrapeError(code, override))
}
