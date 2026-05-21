import { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import type { Lead } from '../../types/lead'
import { generateCSV, downloadCSV } from '../../lib/csv'

type SearchState = 'idle' | 'loading' | 'results' | 'error'

interface OutletCtx {
  credits: number | null
  refreshCredits: () => void
}

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
  const { credits, refreshCredits } = useOutletContext<OutletCtx>()

  const [business, setBusiness] = useState('')
  const [location, setLocation] = useState('')
  const [maxResults, setMaxResults] = useState(100)
  const [searchState, setSearchState] = useState<SearchState>('idle')
  const [leads, setLeads] = useState<Lead[]>([])
  const [errorMsg, setErrorMsg] = useState('')
  const [loadingMsg, setLoadingMsg] = useState('')
  const [downloading, setDownloading] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const lastQuery = useRef({ business: '', location: '' })

  useEffect(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    if (searchState !== 'loading') {
      setLoadingMsg('')
      return
    }

    const b = lastQuery.current.business
    const l = lastQuery.current.location

    const stages = [
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

    lastQuery.current = { business: business.trim(), location: location.trim() }
    setSearchState('loading')
    setLeads([])
    setErrorMsg('')

    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: business.trim(),
          location: location.trim(),
          maxResults,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`)
      }
      const data = await res.json() as { results: Lead[] }
      setLeads(data.results)
      setSearchState('results')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setSearchState('error')
    }
  }

  const handleDownload = async () => {
    if (!user || leads.length === 0 || downloading) return
    setDownloading(true)

    const csv = generateCSV(leads)
    const filename = `${lastQuery.current.business}-${lastQuery.current.location}-leads.csv`
      .toLowerCase().replace(/\s+/g, '-')
    downloadCSV(csv, filename)

    try {
      const res = await fetch('/api/deduct-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          creditsToDeduct: leads.length,
          businessType: lastQuery.current.business,
          location: lastQuery.current.location,
          resultCount: leads.length,
        }),
      })
      const body = await res.json().catch(() => null)
      console.log('[handleDownload] /api/deduct-credits status:', res.status, '| body:', body)
      if (res.ok) refreshCredits()
    } catch (err) {
      console.error('[handleDownload] fetch error:', err)
    } finally {
      setDownloading(false)
    }
  }

  console.log('[SearchPage] credits from context:', credits, '| type:', typeof credits)
  const hasNoCredits = credits !== null && credits === 0
  console.log('[SearchPage] hasNoCredits:', hasNoCredits)

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
            <button className="font-sans text-[13px] font-semibold text-brand bg-transparent border-none cursor-pointer p-0 underline">
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
                className="font-sans text-[15px] text-ink bg-cream border border-border-subtle rounded-pill px-4 py-[11px] outline-none transition-colors duration-150 focus:border-brand cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%238d8d8d' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
              >
                <option value={50}>50 leads (~30 sec)</option>
                <option value={100}>100 leads (~1 min)</option>
                <option value={250}>250 leads (~3 min)</option>
                <option value={500}>500 leads (~6 min)</option>
              </select>
            </div>
          </div>

          {/* Submit — right-aligned */}
          <div className="flex justify-end">
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

        {searchState === 'error' && (
          <p className="font-sans text-sm text-brand m-0 mb-5">
            {errorMsg}
          </p>
        )}

        {(searchState === 'loading' || (searchState === 'results' && leads.length > 0)) && (
          <div>
            {searchState === 'results' && (
              <div className="flex items-center justify-between mb-3 flex-wrap gap-[10px]">
                <p className="font-sans text-sm text-ink-muted m-0">
                  <strong className="text-ink">{leads.length} results found</strong>
                  {' '}— downloading will use{' '}
                  <strong className="text-ink">{leads.length} of {maxResults} credits</strong>
                </p>
                <button
                  onClick={handleDownload}
                  disabled={downloading || hasNoCredits}
                  title={hasNoCredits ? 'Buy credits to download' : undefined}
                  className={`font-sans text-sm font-semibold text-white border-none rounded-pill px-5 py-[10px] flex items-center gap-[7px] transition-colors duration-150 ${hasNoCredits ? 'bg-[#c8c2b8] cursor-not-allowed' : downloading ? 'bg-[#c8c2b8] cursor-not-allowed' : 'bg-brand cursor-pointer hover:bg-brand-dark'}`}
                >
                  {downloading ? 'Downloading...' : '↓ Download CSV'}
                </button>
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
                    <span className="font-sans text-[13px] text-[#bbbbbb]">—</span>
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
