import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { PLANS } from '../data/plans'
import { startCheckout } from '../lib/checkout'

interface Props {
  open: boolean
  onClose: () => void
  userId: string
  userEmail: string
}

interface Stats {
  totalContacts: number
  totalScrapes: number
  businessType: string | null
  location: string | null
}

export default function ZeroCreditsModal({ open, onClose, userId, userEmail }: Props) {
  const [stats, setStats] = useState<Stats | null>(null)
  const [checkingOut, setCheckingOut] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !userId) return
    supabase
      .from('searches')
      .select('result_count, business_type, location')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!data || data.length === 0) {
          setStats({ totalContacts: 0, totalScrapes: 0, businessType: null, location: null })
          return
        }
        setStats({
          totalContacts: data.reduce((sum, r) => sum + (r.result_count ?? 0), 0),
          totalScrapes: data.length,
          businessType: data[0].business_type ?? null,
          location: data[0].location ?? null,
        })
      })
  }, [open, userId])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  const handleBuy = async (priceId: string) => {
    setCheckingOut(priceId)
    try { await startCheckout(priceId, userId, userEmail) }
    catch { setCheckingOut(null) }
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes modalSlideUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      <div
        role="presentation"
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.45)] backdrop-blur-[2px]"
        style={{ animation: 'fadeIn 0.15s ease' }}
      />

      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-6 pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="zero-credits-modal-title"
          onClick={(e) => e.stopPropagation()}
          className="bg-cream rounded-[20px] border border-[rgba(32,32,32,0.10)] w-full max-w-[640px] max-h-[min(90vh,760px)] overflow-y-auto pointer-events-auto relative shadow-[0_24px_64px_rgba(0,0,0,0.12)]"
          style={{ animation: 'modalSlideUp 0.2s cubic-bezier(0.22,1,0.36,1) forwards' }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 bg-white border border-[rgba(32,32,32,0.10)] cursor-pointer w-8 h-8 rounded-pill flex items-center justify-center text-ink-faint text-lg leading-none transition-colors duration-150 hover:bg-[rgba(32,32,32,0.06)] hover:text-ink"
          >
            ×
          </button>

          <div className="px-6 pt-8 pb-7 md:px-8 md:pt-10">
            <div className="text-center mb-7 pr-6">
              <h2
                id="zero-credits-modal-title"
                className="font-display text-[clamp(20px,3vw,26px)] font-bold tracking-[-0.02em] text-ink m-0 mb-2"
              >
                You've used all your free credits
              </h2>
              {stats && stats.totalScrapes > 0 && (
                <p className="font-sans text-sm text-ink-faint m-0">
                  {stats.businessType && stats.location
                    ? <>You scraped <strong className="text-ink">{stats.businessType}</strong> in <strong className="text-ink">{stats.location}</strong> — and extracted <strong className="text-ink">{stats.totalContacts.toLocaleString()} contacts</strong> across <strong className="text-ink">{stats.totalScrapes} scrape{stats.totalScrapes !== 1 ? 's' : ''}</strong></>
                    : <>You've extracted <strong className="text-ink">{stats.totalContacts.toLocaleString()} contacts</strong> across <strong className="text-ink">{stats.totalScrapes} scrape{stats.totalScrapes !== 1 ? 's' : ''}</strong></>
                  }
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-[14px] p-5 flex flex-col gap-3 relative ${plan.featured ? 'border-2 border-brand' : 'border border-border-subtle'}`}
                >
                  {plan.featured && (
                    <span className="absolute -top-[11px] left-1/2 -translate-x-1/2 bg-brand text-white font-sans text-[10px] font-bold px-3 py-[3px] rounded-full tracking-[0.05em] uppercase whitespace-nowrap">
                      ✨ Most popular
                    </span>
                  )}
                  <div>
                    <p className="font-sans text-[11px] font-bold text-ink-faint uppercase tracking-[0.06em] m-0 mb-1">{plan.name}</p>
                    <p className="font-display text-[30px] font-bold text-ink tracking-[-0.03em] m-0 leading-none">{plan.price}</p>
                  </div>
                  <p className="font-sans text-[13px] text-ink-muted m-0 leading-snug">{plan.credits.toLocaleString()} credits · emails included</p>
                  <button
                    type="button"
                    onClick={() => handleBuy(plan.priceId)}
                    disabled={!!checkingOut}
                    className={`mt-auto font-sans text-[13px] font-semibold border-none rounded-pill px-4 py-[10px] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed ${plan.featured ? 'bg-brand text-white cursor-pointer hover:bg-brand-dark' : 'bg-ink text-white cursor-pointer hover:bg-[rgba(32,32,32,0.82)]'}`}
                  >
                    {checkingOut === plan.priceId ? 'Loading...' : `Buy ${plan.name}`}
                  </button>
                </div>
              ))}
            </div>

            <p className="font-sans text-[13px] text-ink-faint text-center m-0">
              Credits never expire — pay once, use anytime.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
