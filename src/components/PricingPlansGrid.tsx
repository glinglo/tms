import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PLANS } from '../data/plans'
import { startCheckout } from '../lib/checkout'
import { useAuthContext } from '../context/AuthContext'

const FREE_FEATURES = [
  '25 leads per month',
  'All data fields included',
  'CSV export',
  'No credit card required',
]

interface PricingPlansGridProps {
  showFreePlan?: boolean
  compact?: boolean
}

export default function PricingPlansGrid({
  showFreePlan = true,
  compact = false,
}: PricingPlansGridProps) {
  const { user, openSignUp } = useAuthContext()
  const navigate = useNavigate()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  function handleFree() {
    if (user) navigate('/dashboard')
    else openSignUp()
  }

  const handlePlan = async (plan: (typeof PLANS)[number]) => {
    if (!user) {
      openSignUp()
      return
    }
    setLoadingId(plan.id)
    setError('')
    try {
      await startCheckout(plan.priceId, user.id, user.email ?? '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoadingId(null)
    }
  }

  const cardPad = compact ? 'p-5' : 'p-7'
  const priceSize = compact ? 'text-[34px]' : 'text-[42px]'

  return (
    <>
      {error && (
        <p className="font-sans text-sm text-brand text-center mb-4">{error}</p>
      )}

      <div
        className={`grid gap-4 ${
          showFreePlan
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-3'
        }`}
      >
        {showFreePlan && (
          <div className={`bg-white rounded-[16px] ${cardPad} flex flex-col gap-4 border border-border-subtle`}>
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.07em] m-0 mb-2 text-ink-faint">
                Free
              </p>
              <div className="flex items-end gap-[6px]">
                <span className={`font-display ${priceSize} font-bold text-ink tracking-[-0.03em] leading-none`}>
                  $0
                </span>
                <span className="font-sans text-sm text-ink-faint mb-[6px]">forever</span>
              </div>
              <p className="font-sans text-sm text-ink-muted m-0 mt-1">
                Try TheMapScraper with no commitment
              </p>
            </div>

            <div className="h-px bg-[rgba(32,32,32,0.07)]" />

            <ul className="m-0 p-0 flex flex-col gap-[8px] list-none">
              {FREE_FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-[8px] font-sans text-sm text-ink-muted">
                  <span className="text-[#2b9a66] font-bold text-base leading-none shrink-0 mt-px">✓</span>
                  {feat}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={handleFree}
              className="mt-auto w-full font-sans text-sm font-semibold rounded-pill py-3 border border-border-subtle bg-transparent text-ink cursor-pointer transition-colors duration-150 hover:bg-[rgba(32,32,32,0.05)]"
            >
              Start Free
            </button>
          </div>
        )}

        {PLANS.map((plan) => {
          const isLoading = loadingId === plan.id
          return (
            <div
              key={plan.id}
              className={`bg-white rounded-[16px] ${cardPad} flex flex-col gap-4 relative ${
                plan.featured
                  ? 'border-[1.5px] border-brand shadow-[0_4px_24px_rgba(234,40,4,0.10)]'
                  : 'border border-border-subtle'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-[13px] left-1/2 -translate-x-1/2">
                  <span className="font-sans text-[10px] font-bold text-white bg-brand rounded-pill px-3 py-[4px] uppercase tracking-[0.05em] whitespace-nowrap">
                    Most popular
                  </span>
                </div>
              )}

              <div>
                <p
                  className={`font-sans text-[11px] font-bold uppercase tracking-[0.07em] m-0 mb-2 ${
                    plan.featured ? 'text-brand' : 'text-ink-faint'
                  }`}
                >
                  {plan.name}
                </p>
                <div className="flex items-end gap-[6px]">
                  <span className={`font-display ${priceSize} font-bold text-ink tracking-[-0.03em] leading-none`}>
                    {plan.price}
                  </span>
                  <span className="font-sans text-sm text-ink-faint mb-[6px]">one-time</span>
                </div>
                <p className="font-sans text-sm text-ink-muted m-0 mt-1">{plan.creditsLabel}</p>
              </div>

              <div className="h-px bg-[rgba(32,32,32,0.07)]" />

              <ul className="m-0 p-0 flex flex-col gap-[8px] list-none">
                {[plan.creditsLabel, plan.perCredit, 'CSV export with all fields', 'Leads never expire'].map(
                  (feat) => (
                    <li key={feat} className="flex items-start gap-[8px] font-sans text-sm text-ink-muted">
                      <span className="text-brand font-bold text-base leading-none shrink-0 mt-px">✓</span>
                      {feat}
                    </li>
                  ),
                )}
              </ul>

              <button
                type="button"
                onClick={() => handlePlan(plan)}
                disabled={!!loadingId}
                className={`mt-auto w-full font-sans text-sm font-semibold rounded-pill py-3 border-none cursor-pointer transition-colors duration-150 flex items-center justify-center gap-2 ${
                  plan.featured
                    ? 'bg-brand text-white hover:bg-brand-dark'
                    : 'bg-[rgba(32,32,32,0.06)] text-ink hover:bg-[rgba(32,32,32,0.1)]'
                } ${loadingId ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <span
                      className={`inline-block w-[13px] h-[13px] rounded-full border-2 ${
                        plan.featured
                          ? 'border-[rgba(255,255,255,0.4)] border-t-white'
                          : 'border-[rgba(32,32,32,0.2)] border-t-ink'
                      }`}
                      style={{ animation: 'spin 0.7s linear infinite' }}
                    />
                    Redirecting...
                  </>
                ) : (
                  `Buy ${plan.name}`
                )}
              </button>
            </div>
          )
        })}
      </div>

      <p className={`font-sans text-xs text-ink-faint text-center ${compact ? 'mt-4' : 'mt-8'}`}>
        Payments processed securely by Stripe. Leads added instantly after payment.
      </p>
    </>
  )
}
