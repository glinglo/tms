import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PLANS } from '../data/plans'
import { startCheckout } from '../lib/checkout'
import { useAuthContext } from '../context/AuthContext'

const FREE_FEATURES = [
  '50 leads per month',
  'All data fields included',
  'CSV export',
  'No credit card required',
]

const FAQS = [
  {
    q: 'Is there a free plan?',
    a: 'Yes. The free plan includes 50 leads per month with all data fields and CSV export. No credit card required. You can upgrade anytime.',
  },
  {
    q: 'Do credits expire?',
    a: 'No. Credits never expire. Buy once, use whenever you need.',
  },
  {
    q: 'How do credits work?',
    a: '1 credit = 1 lead. When you download a list of 500 businesses, you use 500 credits. Credits never expire, so you can buy a pack today and use it months later.',
  },
  {
    q: 'What fields are included in the CSV?',
    a: 'Business name, phone, address, website, star rating, review count, email (when available), coordinates, and Google Maps URL.',
  },
  {
    q: 'Can I upgrade from the free plan?',
    a: 'Yes. You can buy a credit pack anytime from your dashboard. Your account and settings carry over. The free plan resets every month; purchased credits never expire.',
  },
]

export default function Pricing() {
  const { user, openSignUp } = useAuthContext()
  const navigate = useNavigate()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function handleFree() {
    if (user) navigate('/dashboard')
    else openSignUp()
  }

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
      <div className="max-w-[1080px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-display text-[clamp(36px,5vw,56px)] font-bold tracking-[-0.025em] text-ink m-0 mb-3 leading-[1.05]">
            Simple, transparent pricing
          </h1>
          <p className="font-sans text-base text-ink-faint m-0">
            Start free. Buy credits when you need more. They never expire.
          </p>
        </div>

        {error && (
          <p className="font-sans text-sm text-brand text-center mb-6">{error}</p>
        )}

        {/* Plan cards — 1 col mobile, 2 col sm, 4 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Free plan */}
          <div className="bg-white rounded-[16px] p-7 flex flex-col gap-5 border border-border-subtle">
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.07em] m-0 mb-3 text-ink-faint">
                Free
              </p>
              <div className="flex items-end gap-[6px]">
                <span className="font-display text-[42px] font-bold text-ink tracking-[-0.03em] leading-none">
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
              onClick={handleFree}
              className="mt-auto w-full font-sans text-sm font-semibold rounded-pill py-3 border border-border-subtle bg-transparent text-ink cursor-pointer transition-colors duration-150 hover:bg-[rgba(32,32,32,0.05)]"
            >
              Start Free
            </button>
          </div>

          {/* Paid plans */}
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
                    <li key={feat} className="flex items-start gap-[8px] font-sans text-sm text-ink-muted">
                      <span className={`font-bold text-base leading-none shrink-0 mt-px ${plan.featured ? 'text-brand' : 'text-brand'}`}>✓</span>
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

        {/* FAQ */}
        <div className="mt-20 max-w-[720px] mx-auto">
          <h2 className="font-display font-bold tracking-[-0.025em] text-ink m-0 mb-8 text-center"
            style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className={`border-t border-[rgba(32,32,32,0.10)]${i === FAQS.length - 1 ? ' border-b' : ''}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full bg-transparent border-none cursor-pointer py-5 flex items-center justify-between gap-4 text-left"
                  >
                    <span className={`font-sans text-base font-semibold leading-[1.4] transition-colors duration-150 ${isOpen ? 'text-ink' : 'text-ink-muted'}`}>
                      {faq.q}
                    </span>
                    <span
                      className={`shrink-0 w-5 h-5 flex items-center justify-center text-xl leading-none font-light transition-[color,transform] duration-200 ${isOpen ? 'text-brand' : 'text-[rgba(32,32,32,0.25)]'}`}
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ maxHeight: isOpen ? '200px' : '0px' }}
                  >
                    <p className="font-sans text-[15px] font-normal leading-[1.65] text-ink-muted m-0 mb-5 pr-9">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
