import { useState } from 'react'
import { PLANS } from '../data/plans'
import { startCheckout } from '../lib/checkout'
import { useAuthContext } from '../context/AuthContext'

export default function Pricing() {
  const { user, openSignUp } = useAuthContext()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handlePlan = async (plan: typeof PLANS[number]) => {
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

  return (
    <div className="bg-cream min-h-screen py-20 px-6">
      <div className="max-w-[860px] mx-auto">

        <div className="text-center mb-14">
          <h1 className="font-display text-[clamp(36px,5vw,56px)] font-bold tracking-[-0.025em] text-ink m-0 mb-3 leading-[1.05]">
            Credits that never expire
          </h1>
          <p className="font-sans text-base text-ink-faint m-0">
            One credit = one lead. Buy once, use whenever.
          </p>
        </div>

        {error && (
          <p className="font-sans text-sm text-brand text-center mb-6">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PLANS.map((plan) => {
            const isLoading = loadingId === plan.id
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-[16px] p-7 flex flex-col gap-5 relative ${
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
                  <p className={`font-sans text-[11px] font-bold uppercase tracking-[0.07em] m-0 mb-3 ${plan.featured ? 'text-brand' : 'text-ink-faint'}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-[6px]">
                    <span className="font-display text-[42px] font-bold text-ink tracking-[-0.03em] leading-none">
                      {plan.price}
                    </span>
                    <span className="font-sans text-sm text-ink-faint mb-[6px]">one-time</span>
                  </div>
                  <p className="font-sans text-sm text-ink-muted m-0 mt-1">
                    {plan.creditsLabel}
                  </p>
                </div>

                <div className="h-px bg-[rgba(32,32,32,0.07)]" />

                <ul className="m-0 p-0 flex flex-col gap-[8px] list-none">
                  {[
                    plan.creditsLabel,
                    plan.perCredit,
                    'CSV export with all fields',
                    'Credits never expire',
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-[8px] font-sans text-sm text-ink-muted">
                      <span className="text-brand font-bold text-base leading-none shrink-0">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
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
                        className={`inline-block w-[13px] h-[13px] rounded-full border-2 ${plan.featured ? 'border-[rgba(255,255,255,0.4)] border-t-white' : 'border-[rgba(32,32,32,0.2)] border-t-ink'}`}
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

        <p className="font-sans text-xs text-ink-faint text-center mt-8">
          Payments processed securely by Stripe. Credits added instantly after payment.
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
