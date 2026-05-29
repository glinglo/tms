import { useEffect } from 'react'
import PricingPlansGrid from './PricingPlansGrid'

interface BuyCreditsModalProps {
  open: boolean
  onClose: () => void
}

export default function BuyCreditsModal({ open, onClose }: BuyCreditsModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes modalSlideUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes spin { to { transform: rotate(360deg) } }
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
          aria-labelledby="buy-credits-title"
          onClick={(e) => e.stopPropagation()}
          className="bg-cream rounded-[20px] border border-[rgba(32,32,32,0.10)] w-full max-w-[960px] max-h-[min(90vh,900px)] overflow-y-auto pointer-events-auto relative shadow-[0_24px_64px_rgba(0,0,0,0.12)]"
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

          <div className="px-5 pt-8 pb-6 md:px-8 md:pt-9 md:pb-7">
            <div className="text-center mb-6 pr-8">
              <h2
                id="buy-credits-title"
                className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-ink m-0 mb-2"
              >
                Buy credits
              </h2>
              <p className="font-sans text-sm text-ink-faint m-0">
                One-time packs. Credits never expire.
              </p>
            </div>

            <PricingPlansGrid showFreePlan={false} compact />
          </div>
        </div>
      </div>
    </>
  )
}
