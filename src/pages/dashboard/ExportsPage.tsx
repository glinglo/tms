import { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import type { DashboardOutletContext } from '../../components/DashboardLayout'
import SearchErrorBanner from '../../components/SearchErrorBanner'
import { supabase } from '../../lib/supabase'
import { authHeaders } from '../../lib/apiAuth'
import { parseScrapeErrorResponse, type ScrapeErrorCode } from '../../lib/scrapeErrors'
import type { Lead } from '../../types/lead'
import { generateCSV, downloadCSV } from '../../lib/csv'

interface SearchRecord {
  id: string
  business_type: string
  location: string
  result_count: number
  credits_used: number
  created_at: string
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

const COLS = '1.2fr 2fr 0.8fr 0.8fr 1fr'

export default function ExportsPage() {
  const { user } = useAuthContext()
  const { openBuyCredits } = useOutletContext<DashboardOutletContext>()
  const [searches, setSearches] = useState<SearchRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [redownloading, setRedownloading] = useState<string | null>(null)
  const [redownloadError, setRedownloadError] = useState('')
  const [redownloadErrorCode, setRedownloadErrorCode] = useState<ScrapeErrorCode | undefined>()
  const redownloadPollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => { if (redownloadPollRef.current) clearInterval(redownloadPollRef.current) }
  }, [])

  useEffect(() => {
    if (!user) return
    supabase
      .from('searches')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setSearches((data as SearchRecord[]) ?? [])
        setLoading(false)
      })
  }, [user])

  const handleRedownload = async (record: SearchRecord) => {
    if (redownloading) return
    if (redownloadPollRef.current) clearInterval(redownloadPollRef.current)
    setRedownloading(record.id)
    setRedownloadError('')
    setRedownloadErrorCode(undefined)

    let runId: string
    try {
      const startRes = await fetch('/api/scrape-start', {
        method: 'POST',
        headers: await authHeaders(),
        body: JSON.stringify({
          businessType: record.business_type,
          location: record.location,
          maxResults: record.result_count,
          redownloadSearchId: record.id,
        }),
      })
      if (!startRes.ok) {
        const { message, code } = await parseScrapeErrorResponse(startRes)
        setRedownloadError(message)
        setRedownloadErrorCode(code)
        setRedownloading(null)
        return
      }
      const body = await startRes.json() as { runId: string }
      runId = body.runId
    } catch {
      setRedownloadError('Something went wrong. Please check your connection and try again.')
      setRedownloadErrorCode(undefined)
      setRedownloading(null)
      return
    }

    redownloadPollRef.current = setInterval(async () => {
      try {
        const statusRes = await fetch(`/api/scrape-status?runId=${encodeURIComponent(runId)}`)
        if (!statusRes.ok) {
          const { message, code } = await parseScrapeErrorResponse(statusRes)
          clearInterval(redownloadPollRef.current!)
          setRedownloadError(message)
          setRedownloadErrorCode(code)
          setRedownloading(null)
          return
        }
        const data = await statusRes.json() as { status: string; results?: Lead[] }
        if (data.status === 'done') {
          clearInterval(redownloadPollRef.current!)
          const csv = generateCSV(data.results ?? [])
          const filename = `${record.business_type}-${record.location}-leads.csv`
            .toLowerCase().replace(/\s+/g, '-')
          downloadCSV(csv, filename)
          setRedownloading(null)
        }
        // 'pending' → keep polling
      } catch {
        clearInterval(redownloadPollRef.current!)
        setRedownloadError('Something went wrong. Please try again.')
        setRedownloadErrorCode(undefined)
        setRedownloading(null)
      }
    }, 3000)
  }

  return (
    <>
      <style>{`
        @keyframes spin { to { transform:rotate(360deg) } }
      `}</style>

      <div className="px-4 py-6 md:px-10 md:py-12 max-w-[1040px]">
        <h1
          className="font-display font-bold tracking-[-0.02em] text-ink m-0 mb-[6px]"
          style={{ fontSize: 'clamp(26px, 3vw, 34px)' }}
        >
          Your exports
        </h1>
        <p className="font-sans text-sm text-ink-faint m-0 mb-7">
          Re-download past exports at no extra credit cost
        </p>

        {redownloadError && (
          <SearchErrorBanner
            message={redownloadError}
            code={redownloadErrorCode}
            context="redownload"
            onBuyCredits={openBuyCredits}
          />
        )}

        {loading ? (
          <div className="flex items-center gap-[10px] text-ink-faint">
            <span
              className="inline-block w-[14px] h-[14px] rounded-full border-2 border-[#e8e5df] border-t-brand"
              style={{ animation: 'spin 0.8s linear infinite' }}
            />
            <span className="font-sans text-sm">Loading exports...</span>
          </div>
        ) : searches.length === 0 ? (
          <div className="bg-white border border-border-subtle rounded-[12px] px-8 py-16 text-center">
            <p className="font-display text-lg font-bold text-ink m-0 mb-2 tracking-[-0.01em]">
              No exports yet
            </p>
            <p className="font-sans text-sm text-ink-faint m-0">
              Head to Dashboard to run your first search and download a CSV.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[10px]">
          <div className="bg-white border border-border-subtle rounded-[10px] overflow-hidden min-w-[560px]">
            <div
              className="grid py-[10px] px-5 bg-cream border-b border-[rgba(32,32,32,0.10)]"
              style={{ gridTemplateColumns: COLS }}
            >
              {['Date', 'Search query', 'Results', 'Credits used', ''].map((col, i) => (
                <span key={i} className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em]">
                  {col}
                </span>
              ))}
            </div>

            {searches.map((record, i) => {
              const isRedownloading = redownloading === record.id
              return (
                <div
                  key={record.id}
                  className={`grid py-[13px] px-5 items-center transition-colors duration-100 hover:bg-[#fafaf8] ${i < searches.length - 1 ? 'border-b border-[rgba(32,32,32,0.07)]' : ''}`}
                  style={{ gridTemplateColumns: COLS }}
                >
                  <span className="font-sans text-[13px] text-ink-faint">
                    {formatDate(record.created_at)}
                  </span>
                  <span className="font-sans text-sm font-semibold text-ink pr-3">
                    {record.business_type}
                    <span className="font-normal text-ink-faint"> in </span>
                    {record.location}
                  </span>
                  <span className="font-mono text-[13px] text-ink-muted">
                    {record.result_count}
                  </span>
                  <span className="font-mono text-[13px] text-ink-muted">
                    {record.credits_used}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRedownload(record)}
                    disabled={!!redownloading}
                    className={`font-sans text-xs font-semibold border rounded-pill px-[14px] py-[6px] flex items-center gap-[6px] w-fit transition-all duration-150 ${isRedownloading ? 'text-ink-faint border-[rgba(32,32,32,0.1)] cursor-not-allowed bg-transparent' : redownloading ? 'text-ink-faint border-[rgba(32,32,32,0.1)] cursor-not-allowed bg-transparent' : 'text-brand border-[rgba(234,40,4,0.3)] cursor-pointer bg-transparent hover:bg-[rgba(234,40,4,0.05)] hover:border-brand'}`}
                  >
                    {isRedownloading ? (
                      <>
                        <span
                          className="inline-block w-[10px] h-[10px] rounded-full border-2 border-[rgba(32,32,32,0.15)] border-t-ink-faint"
                          style={{ animation: 'spin 0.7s linear infinite' }}
                        />
                        Fetching...
                      </>
                    ) : '↓ Re-download'}
                  </button>
                </div>
              )
            })}
          </div>
          </div>
        )}

        <p className="font-sans text-xs text-ink-faint mt-4 m-0">
          Need more leads?{' '}
          <button
            type="button"
            onClick={openBuyCredits}
            className="font-sans text-xs text-brand bg-transparent border-none cursor-pointer p-0 underline"
          >
            Buy credits
          </button>
        </p>
      </div>
    </>
  )
}
