export type ScrapeErrorCode =
  | 'NO_CREDITS'
  | 'UNAUTHORIZED'
  | 'SERVICE_UNAVAILABLE'
  | 'SEARCH_FAILED'
  | 'SEARCH_TIMEOUT'
  | 'SEARCH_BUSY'
  | 'INVALID_REQUEST'
  | 'INTERNAL'

export interface ScrapeErrorBody {
  error?: string
  code?: ScrapeErrorCode
}

const FALLBACK_BY_STATUS: Record<number, string> = {
  400: 'Please check your search and try again.',
  401: 'Your session expired. Please sign in again.',
  403: 'You do not have enough leads for this search.',
  502: 'We could not complete this search. Try again with fewer leads.',
  503: 'Search is temporarily unavailable. Please try again later.',
  504: 'This search took too long. Try fewer leads or a narrower location.',
}

export function messageFromScrapeResponse(
  status: number,
  body: ScrapeErrorBody,
): { message: string; code?: ScrapeErrorCode } {
  if (body.error) {
    return { message: body.error, code: body.code }
  }
  return {
    message: FALLBACK_BY_STATUS[status] ?? 'Something went wrong. Please try again.',
    code: body.code,
  }
}

function isLocalDev(): boolean {
  return typeof window !== 'undefined' && window.location.hostname === 'localhost'
}

/** Read scrape API error body; handles empty/HTML proxy failures in local dev. */
export async function parseScrapeErrorResponse(
  res: Response,
): Promise<{ message: string; code?: ScrapeErrorCode }> {
  const text = await res.text()
  if (text) {
    try {
      const body = JSON.parse(text) as ScrapeErrorBody
      return messageFromScrapeResponse(res.status, body)
    } catch {
      /* proxy HTML or plain text */
    }
  }

  if (isLocalDev() && (res.status === 500 || res.status === 502)) {
    return {
      message:
        'The search API is not running. In a second terminal, run: npm run dev:api (then keep npm run dev).',
    }
  }

  return messageFromScrapeResponse(res.status, {})
}

export function isNoCreditsCode(code?: ScrapeErrorCode): boolean {
  return code === 'NO_CREDITS'
}

export function isServiceUnavailableCode(code?: ScrapeErrorCode): boolean {
  return code === 'SERVICE_UNAVAILABLE' || code === 'SEARCH_BUSY'
}
