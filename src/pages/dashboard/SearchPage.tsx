import { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import type { DashboardOutletContext } from '../../components/DashboardLayout'
import SearchErrorBanner from '../../components/SearchErrorBanner'
import type { Lead } from '../../types/lead'
import { authHeaders } from '../../lib/apiAuth'
import { parseScrapeErrorResponse, type ScrapeErrorCode } from '../../lib/scrapeErrors'
import { generateCSV, downloadCSV } from '../../lib/csv'
import { clampLeadLimit, leadLimitOptionsForCredits } from '../../lib/leadLimits'

type SearchState = 'idle' | 'loading' | 'results' | 'error'

const COLS = '2fr 1.2fr 2fr 0.7fr 1.5fr'

function cleanWebsite(url: string | null): string | null {
  if (!url) return null
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

function SkeletonRow({ opacity = 1, delay = 0 }: { opacity?: number; delay?: number }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: COLS,
      padding: '13px 20px', alignItems: 'center',
      borderBottom: '1px solid rgba(32,32,32,0.07)',
      opacity,
      animation: 'skeletonFadeIn 0.3s ease forwards',
      animationDelay: `${delay}ms`,
    }}>
      {[70, 55, 80, 30, 60].map((w, i) => (
        <div key={i} style={{
          height: '12px', width: `${w}%`, borderRadius: '6px',
          backgroundColor: '#e8e5df',
          animation: 'pulse 1.4s ease-in-out infinite',
          animationDelay: `${i * 80}ms`,
        }} />
      ))}
    </div>
  )
}

export default function SearchPage() {
  const { user } = useAuthContext()
  const { credits, refreshCredits, openBuyCredits } = useOutletContext<DashboardOutletContext>()

  const [business, setBusiness] = useState('')
  const [location, setLocation] = useState('')
  const [maxResults, setMaxResults] = useState(100)
  const [searchState, setSearchState] = useState<SearchState>('idle')
  const [leads, setLeads] = useState<Lead[]>([])
  const [errorMsg, setErrorMsg] = useState('')
  const [errorCode, setErrorCode] = useState<ScrapeErrorCode | undefined>()
  const [loadingMsg, setLoadingMsg] = useState('')
  const [leadEnrichment, setLeadEnrichment] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState('')
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const lastQuery = useRef({ business: '', location: '', leadEnrichment: false })

  useEffect(() => {
    if (credits === null || credits <= 0) return
    setMaxResults((prev) => clampLeadLimit(prev, credits))
  }, [credits])

  useEffect(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    if (searchState !== 'loading') {
      setLoadingMsg('')
      return
    }

    const b = lastQuery.current.business
    const l = lastQuery.current.location

    const enriching = lastQuery.current.leadEnrichment
    const stages = enriching
      ? [
          { delay: 0,     msg: 'Connecting to Google Maps...' },
          { delay: 3000,  msg: `Searching ${b} in ${l}...` },
          { delay: 8000,  msg: 'Found first results, loading more...' },
          { delay: 20000, msg: 'Looking up emails and social profiles...' },
          { delay: 45000, msg: 'Enrichment takes a bit longer — almost there...' },
        ]
      : [
          { delay: 0,     msg: 'Connecting to Google Maps...' },
          { delay: 3000,  msg: `Searching ${b} in ${l}...` },
          { delay: 8000,  msg: 'Found first results, loading more...' },
          { delay: 15000, msg: 'Almost there...' },
        ]
    stages.forEach(({ delay, msg }) => {
      const t = setTimeout(() => setLoadingMsg(msg), delay)
      timersRef.current.push(t)
    })
    return () => timersRef.current.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!business.trim() || !location.trim()) return

    lastQuery.current = {
      business: business.trim(),
      location: location.trim(),
      leadEnrichment,
    }
    setSearchState('loading')
    setLeads([])
    setErrorMsg('')
    setErrorCode(undefined)
    setDownloadError('')

    const fetchLimit =
      credits !== null && credits > 0 ? Math.min(maxResults, credits) : maxResults

    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: await authHeaders(),
        body: JSON.stringify({
          businessType: business.trim(),
          location: location.trim(),
          maxResults: fetchLimit,
          leadEnrichment,
        }),
      })
      if (!res.ok) {
        const { message, code } = await parseScrapeErrorResponse(res)
        setErrorMsg(message)
        setErrorCode(code)
        setSearchState('error')
        return
      }
      const data = await res.json() as { results: Lead[] }
      setLeads(data.results)
      setSearchState('results')
    } catch {
      setErrorMsg('Something went wrong. Please check your connection and try again.')
      setErrorCode(undefined)
      setSearchState('error')
    }
  }

  const handleDownload = async () => {
    if (!user || leads.length === 0 || downloading) return

    const cost = leads.length
    if (credits === null) return
    if (cost > credits) {
      setDownloadError(
        `You have ${credits} credit${credits === 1 ? '' : 's'} but this export has ${cost} leads. Buy more credits or run a smaller search.`,
      )
      return
    }

    setDownloading(true)
    setDownloadError('')

    try {
      const res = await fetch('/api/deduct-credits', {
        method: 'POST',
        headers: await authHeaders(),
        body: JSON.stringify({
          creditsToDeduct: cost,
          businessType: lastQuery.current.business,
          location: lastQuery.current.location,
          resultCount: cost,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as {
          error?: string
          balance?: number
          required?: number
        }
        if (res.status === 402 && body.balance != null && body.required != null) {
          setDownloadError(
            `Insufficient credits (${body.balance} available, ${body.required} required).`,
          )
        } else {
          setDownloadError(body.error ?? 'Could not deduct credits')
        }
        return
      }

      const csv = generateCSV(leads)
      const filename = `${lastQuery.current.business}-${lastQuery.current.location}-leads.csv`
        .toLowerCase().replace(/\s+/g, '-')
      downloadCSV(csv, filename)
      refreshCredits()
    } catch {
      setDownloadError('Something went wrong. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const hasNoCredits = credits !== null && credits === 0
  const insufficientForDownload =
    credits !== null && leads.length > 0 && leads.length > credits
  const canDownload =
    credits !== null && leads.length > 0 && leads.length <= credits && !hasNoCredits

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        @keyframes spin  { to { transform:rotate(360deg) } }
        @keyframes skeletonFadeIn { from { opacity:0; transform:translateY(4px) } to { opacity:1; transform:translateY(0) } }
        @keyframes resultsFadeIn { from { opacity:0 } to { opacity:1 } }
      `}</style>

      <div className="px-4 py-5 md:px-10 md:py-6 max-w-[1040px]">
        <h1
          className="font-display font-bold tracking-[-0.02em] text-ink m-0 mb-[6px]"
          style={{ fontSize: 'clamp(26px, 3vw, 34px)' }}
        >
          Find leads
        </h1>
        <p className="font-sans text-sm text-ink-faint m-0 mb-7">
          Search Google Maps and download a clean CSV
        </p>

        {hasNoCredits && (
          <div className="bg-[#fff8f0] border border-[rgba(234,40,4,0.2)] rounded-[10px] px-[18px] py-[14px] mb-5 flex items-center justify-between flex-wrap gap-[10px]">
            <p className="font-sans text-sm text-ink m-0">
              You have no credits. Buy a pack to start searching.
            </p>
            <button
              type="button"
              onClick={openBuyCredits}
              className="font-sans text-[13px] font-semibold text-brand bg-transparent border-none cursor-pointer p-0 underline"
            >
              Buy credits →
            </button>
          </div>
        )}

        <form
          onSubmit={handleSearch}
          className="bg-white border border-border-subtle rounded-[14px] p-4 md:p-5 mb-7 flex flex-col gap-3"
        >
          {/* Three inputs in one row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-[5px]">
              <label className="font-sans text-[10px] font-bold text-ink-faint uppercase tracking-[0.07em]">
                Business type
              </label>
              <input
                type="text"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder="e.g. Dentists"
                required
                className="font-sans text-[15px] text-ink bg-cream border border-border-subtle rounded-pill px-4 py-[11px] outline-none transition-colors duration-150 focus:border-brand"
              />
            </div>

            <div className="flex flex-col gap-[5px]">
              <label className="font-sans text-[10px] font-bold text-ink-faint uppercase tracking-[0.07em]">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Chicago, IL"
                required
                className="font-sans text-[15px] text-ink bg-cream border border-border-subtle rounded-pill px-4 py-[11px] outline-none transition-colors duration-150 focus:border-brand"
              />
            </div>

            <div className="flex flex-col gap-[5px]">
              <label className="font-sans text-[10px] font-bold text-ink-faint uppercase tracking-[0.07em]">
                Leads to fetch
              </label>
              <select
                value={maxResults}
                onChange={(e) => setMaxResults(Number(e.target.value))}
                disabled={hasNoCredits}
                className="font-sans text-[15px] text-ink bg-cream border border-border-subtle rounded-pill px-4 py-[11px] outline-none transition-colors duration-150 focus:border-brand cursor-pointer appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%238d8d8d' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
              >
                {leadLimitOptionsForCredits(credits).map((n) => (
                  <option key={n} value={n}>
                    {n} leads (~{n <= 50 ? '30 sec' : n <= 100 ? '1 min' : n <= 250 ? '3 min' : '6 min'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Enrichment option + submit */}
          <div className="flex flex-wrap items-center justify-end gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer select-none m-0">
                <input
                  type="checkbox"
                  checked={leadEnrichment}
                  onChange={(e) => setLeadEnrichment(e.target.checked)}
                  disabled={searchState === 'loading'}
                  className="w-4 h-4 accent-brand cursor-pointer disabled:cursor-not-allowed"
                />
                <span className="font-sans text-sm text-ink-muted">
                  Add lead enrichment
                </span>
              </label>
              <span className="relative group inline-flex shrink-0">
                <span
                  tabIndex={0}
                  role="img"
                  aria-label="About lead enrichment"
                  className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full border border-[rgba(32,32,32,0.18)] bg-cream font-sans text-[11px] font-bold text-ink-faint leading-none cursor-help hover:border-brand hover:text-brand transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
                >
                  i
                </span>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-10 w-[min(280px,calc(100vw-48px))] px-3 py-2 rounded-lg bg-ink text-white font-sans text-xs leading-snug text-center opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity duration-150 shadow-[0_4px_16px_rgba(0,0,0,0.12)] after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-ink"
                >
                  If enabled, we search each business website for email addresses and social profiles. The search takes longer.
                </span>
              </span>
            </div>
            <button
              type="submit"
              disabled={searchState === 'loading' || hasNoCredits}
              title={hasNoCredits ? 'Buy credits to search' : undefined}
              className={`font-sans text-sm font-semibold text-white border-none rounded-pill px-[22px] py-3 whitespace-nowrap flex items-center gap-2 transition-colors duration-150 ${hasNoCredits ? 'bg-[#c8c2b8] cursor-not-allowed' : searchState === 'loading' ? 'bg-[#f0a090] cursor-not-allowed' : 'bg-brand cursor-pointer hover:bg-brand-dark'}`}
            >
              {searchState === 'loading' ? (
                <>
                  <span
                    className="inline-block w-[13px] h-[13px] rounded-full border-2 border-[rgba(255,255,255,0.4)] border-t-white"
                    style={{ animation: 'spin 0.7s linear infinite' }}
                  />
                  Searching...
                </>
              ) : 'Search leads'}
            </button>
          </div>
        </form>

        {searchState === 'loading' && loadingMsg && (
          <p className="font-sans text-[13px] text-ink-faint -mt-4 mb-5 flex items-center gap-[7px]">
            <span
              className="inline-block w-[9px] h-[9px] rounded-full border-2 border-[#e8e5df] border-t-brand shrink-0"
              style={{ animation: 'spin 0.8s linear infinite' }}
            />
            {loadingMsg}
          </p>
        )}

        {searchState === 'error' && errorMsg && (
          <SearchErrorBanner
            message={errorMsg}
            code={errorCode}
            onBuyCredits={openBuyCredits}
          />
        )}

        {(searchState === 'loading' || (searchState === 'results' && leads.length > 0)) && (
          <div>
            {searchState === 'results' && (
              <div className="mb-3 flex flex-col gap-2">
                <div className="flex items-center justify-between flex-wrap gap-[10px]">
                  <p className="font-sans text-sm text-ink-muted m-0">
                    <strong className="text-ink">{leads.length} results found</strong>
                    {' '}— download uses{' '}
                    <strong className="text-ink">{leads.length} credit{leads.length === 1 ? '' : 's'}</strong>
                    {credits !== null && (
                      <> ({credits} remaining)</>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={downloading || !canDownload}
                    title={
                      hasNoCredits
                        ? 'Buy credits to download'
                        : insufficientForDownload
                          ? `You need ${leads.length} credits but only have ${credits}`
                          : undefined
                    }
                    className={`font-sans text-sm font-semibold text-white border-none rounded-pill px-5 py-[10px] flex items-center gap-[7px] transition-colors duration-150 ${!canDownload || downloading ? 'bg-[#c8c2b8] cursor-not-allowed' : 'bg-brand cursor-pointer hover:bg-brand-dark'}`}
                  >
                    {downloading ? 'Downloading...' : '↓ Download CSV'}
                  </button>
                </div>
                {(downloadError || insufficientForDownload) && (
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-sans text-sm text-brand m-0">
                      {downloadError ||
                        `You need ${leads.length} credits to download (${credits} available).`}
                    </p>
                    <button
                      type="button"
                      onClick={openBuyCredits}
                      className="font-sans text-[13px] font-semibold text-brand bg-transparent border-none cursor-pointer p-0 underline"
                    >
                      Buy credits
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="overflow-x-auto rounded-[10px]">
            <div
              className="bg-white border border-border-subtle rounded-[10px] overflow-hidden min-w-[560px]"
              style={{ animation: 'resultsFadeIn 0.3s ease' }}
            >
              <div
                className="grid py-[10px] px-5 bg-cream border-b border-[rgba(32,32,32,0.10)]"
                style={{ gridTemplateColumns: COLS }}
              >
                {['Business name', 'Phone', 'Address', 'Rating', 'Website'].map((col) => (
                  <span key={col} className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em]">{col}</span>
                ))}
              </div>

              {searchState === 'loading' && (
                <>
                  <SkeletonRow delay={0} />
                  <SkeletonRow opacity={0.85} delay={60} />
                  <SkeletonRow opacity={0.65} delay={120} />
                  <SkeletonRow opacity={0.4}  delay={180} />
                  <SkeletonRow opacity={0.2}  delay={240} />
                </>
              )}

              {searchState === 'results' && leads.map((lead, i) => (
                <div
                  key={i}
                  className={`grid py-[13px] px-5 items-center transition-colors duration-100 hover:bg-[#fafaf8] ${i < leads.length - 1 ? 'border-b border-[rgba(32,32,32,0.07)]' : ''}`}
                  style={{ gridTemplateColumns: COLS }}
                >
                  <span className="font-sans text-sm font-semibold text-ink pr-3">
                    {lead.title ?? '—'}
                  </span>
                  <span className="font-mono text-xs text-ink-muted pr-3">
                    {lead.phone ?? '—'}
                  </span>
                  <span className="font-sans text-[13px] text-ink-muted pr-3">
                    {lead.address ?? '—'}
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-ink">
                    {lead.totalScore != null ? <>{lead.totalScore.toFixed(1)} <span className="text-brand">★</span></> : '—'}
                  </span>
                  {lead.website ? (
                    <a
                      href={lead.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[13px] text-brand no-underline hover:underline"
                    >
                      {cleanWebsite(lead.website)}
                    </a>
                  ) : (
                    <span className="font-sans text-[13px] text-ink-faint">—</span>
                  )}
                </div>
              ))}
            </div>
            </div>
          </div>
        )}

        {searchState === 'results' && leads.length === 0 && (
          <p className="font-sans text-sm text-ink-faint">
            No results found. Try a different search.
          </p>
        )}
      </div>
    </>
  )
}
