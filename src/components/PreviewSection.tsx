import { useEffect, useRef, useState } from 'react'
import type { Lead } from '../types/lead'
import { useAuthContext } from '../context/AuthContext'

type SearchState = 'idle' | 'loading' | 'results' | 'error'

interface PreviewSectionProps {
  query: { business: string; location: string }
  searchState: SearchState
  leads: Lead[]
  errorMsg: string | null
}

const COLS = '2fr 1.3fr 2fr 0.7fr 1.4fr'
const VISIBLE = 3


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

function cleanWebsite(url: string | null): string | null {
  if (!url) return null
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

export default function PreviewSection({ query, searchState, leads, errorMsg }: PreviewSectionProps) {
  const { openSignUp } = useAuthContext()
  const [visible, setVisible] = useState(searchState === 'results')
  const [contentState, setContentState] = useState<SearchState>(searchState)
  const [loadingMsg, setLoadingMsg] = useState('')
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (searchState !== 'idle' && !visible) {
      setContentState(searchState)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    }
  }, [searchState, visible])

  useEffect(() => {
    if (searchState !== 'idle') setContentState(searchState)
  }, [searchState])

  useEffect(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    if (searchState !== 'loading') {
      setLoadingMsg('')
      return
    }

    const business = query.business
    const location = query.location

    const stages = [
      { delay: 0,     msg: `Connecting to Google Maps...` },
      { delay: 3000,  msg: `Searching ${business} in ${location}...` },
      { delay: 8000,  msg: `Found first results, loading more...` },
      { delay: 15000, msg: `Almost there...` },
    ]

    stages.forEach(({ delay, msg }) => {
      const t = setTimeout(() => setLoadingMsg(msg), delay)
      timersRef.current.push(t)
    })

    return () => timersRef.current.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState])

  if (searchState === 'idle' && !visible) return null

  const business = query.business || 'businesses'
  const location  = query.location  || 'your area'
  const visibleRows = leads.slice(0, VISIBLE)
  const blurredRows = leads.slice(VISIBLE)
  const total = leads.length

  return (
    <>
      <style>{`
        @keyframes pulse         { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        @keyframes spin          { to { transform: rotate(360deg) } }
        @keyframes skeletonFadeIn{ from { opacity:0; transform:translateY(4px) } to { opacity:1; transform:translateY(0) } }
        @keyframes sectionSlideUp{ from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes resultsFadeIn { from { opacity:0 } to { opacity:1 } }
      `}</style>

      <section
        id="preview-section"
        className="bg-cream px-6 pb-24"
        style={{
          animation: visible ? 'sectionSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
          opacity: visible ? undefined : 0,
        }}
      >
        <div className="max-w-[960px] mx-auto">

          <div className="mb-5">
            <h2 className="font-display font-bold leading-[1.15] tracking-[-0.02em] text-ink m-0 mb-1" style={{ fontSize: 'clamp(22px, 3vw, 28px)' }}>
              Preview —{' '}
              <span className="text-ink-muted font-semibold">
                {business} in {location}
              </span>
            </h2>
            <p className="font-sans text-sm text-ink-faint m-0">
              {contentState === 'loading' && (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-[10px] h-[10px] rounded-full border-2 border-[#e8e5df] border-t-brand shrink-0" style={{ animation: 'spin 0.8s linear infinite' }} />
                  {loadingMsg || 'Connecting to Google Maps...'}
                </span>
              )}
              {contentState === 'results' && total > 0 && <>Hundreds of results found — showing a preview</>}
              {contentState === 'results' && total === 0 && 'No results found. Try a different search.'}
              {contentState === 'error' && (
                <span className="text-brand">
                  {errorMsg ?? 'Something went wrong. Please try again.'}
                </span>
              )}
            </p>
          </div>

          {(contentState === 'loading' || (contentState === 'results' && total > 0)) && (
            <div className="bg-white border border-border-subtle rounded-[10px] overflow-hidden">
              <div
                className="grid py-[10px] px-5 bg-cream border-b border-[rgba(32,32,32,0.10)]"
                style={{ gridTemplateColumns: COLS }}
              >
                {['Business name', 'Phone', 'Address', 'Rating', 'Website'].map((col) => (
                  <span key={col} className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em]">{col}</span>
                ))}
              </div>

              {contentState === 'loading' && (
                <>
                  <SkeletonRow delay={0} />
                  <SkeletonRow opacity={0.85} delay={60} />
                  <SkeletonRow opacity={0.65} delay={120} />
                  <SkeletonRow opacity={0.4}  delay={180} />
                  <SkeletonRow opacity={0.2}  delay={240} />
                </>
              )}

              {contentState === 'results' && total > 0 && (
                <div style={{ animation: 'resultsFadeIn 0.35s ease forwards' }}>
                  {visibleRows.map((lead, i) => (
                    <div
                      key={i}
                      className="grid py-[13px] px-5 items-center border-b border-[rgba(32,32,32,0.07)] transition-colors duration-100 hover:bg-[#fafaf8]"
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

                  {blurredRows.length > 0 && (
                    <div className="relative min-h-[300px]">
                      {blurredRows.map((lead, i) => (
                        <div
                          key={i}
                          className="grid py-[13px] px-5 items-center border-t border-[rgba(32,32,32,0.07)] blur-[5px] select-none pointer-events-none"
                          style={{ gridTemplateColumns: COLS }}
                        >
                          <span className="font-sans text-sm font-semibold text-ink">{lead.title ?? '—'}</span>
                          <span className="font-mono text-xs text-ink-muted">{lead.phone ?? '—'}</span>
                          <span className="font-sans text-[13px] text-ink-muted">{lead.address ?? '—'}</span>
                          <span className="font-sans text-[13px] font-semibold text-ink">
                            {lead.totalScore != null ? `${lead.totalScore.toFixed(1)} ★` : '—'}
                          </span>
                          <span className="font-sans text-[13px] text-brand">{cleanWebsite(lead.website)}</span>
                        </div>
                      ))}

                      <div className="absolute inset-0 flex flex-col items-center justify-end pb-9" style={{ background: 'linear-gradient(to bottom, rgba(249,247,243,0) 0%, rgba(249,247,243,0.75) 40%, #f9f7f3 70%)' }}>
                        <div className="flex flex-col items-center gap-[6px] mt-24">
                          <p className="font-display text-xl font-bold text-ink m-0 tracking-[-0.02em] text-center">
                            Unlock 500+ leads for {business} in {location}
                          </p>
                          <p className="font-sans text-[13px] text-ink-faint m-0 mb-3 text-center">
                            Sign up free to unlock all leads and export as CSV
                          </p>
                          <button
                            onClick={openSignUp}
                            className="font-sans text-[15px] font-semibold text-white bg-brand px-7 py-3 rounded-pill border-none cursor-pointer transition-colors duration-150 flex items-center gap-2 hover:bg-brand-dark"
                          >
                            Get full list <span>→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {contentState === 'results' && total > 0 && (
            <div className="mt-3 flex items-center gap-[6px] flex-wrap">
              <span className="font-sans text-xs text-ink-faint">CSV includes:</span>
              {['Name', 'Phone', 'Address', 'Email', 'Website', 'Hours', 'Coordinates'].map((field) => (
                <span key={field} className="font-sans text-[11px] font-semibold text-ink-muted bg-cream-dark rounded-pill px-[9px] py-[3px]">{field}</span>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  )
}
