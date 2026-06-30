import { useState } from 'react'
import PricingPlansGrid from '../components/PricingPlansGrid'

const FAQS = [
  {
    q: 'Is there a free plan?',
    a: 'Yes. The free plan includes 25 leads per month with all data fields and CSV export. No credit card required. You can upgrade anytime.',
  },
  {
    q: 'Do leads expire?',
    a: 'No. Leads never expire. Buy once, use whenever you need.',
  },
  {
    q: 'How do leads work?',
    a: '1 lead = 1 business. When you download a list of 500 businesses, you use 500 leads. Leads never expire, so you can buy a pack today and use it months later.',
  },
  {
    q: 'What fields are included in the CSV?',
    a: 'Business name, phone, address, website, star rating, review count, email (when available), coordinates, and Google Maps URL.',
  },
  {
    q: 'Can I upgrade from the free plan?',
    a: 'Yes. You can buy a lead pack anytime from your dashboard. Your account and settings carry over. The free plan resets every month; purchased leads never expire.',
  },
]

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="bg-cream min-h-screen py-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <div className="text-center mb-14">
          <h1 className="font-display text-[clamp(36px,5vw,56px)] font-bold tracking-[-0.025em] text-ink m-0 mb-3 leading-[1.05]">
            Simple, transparent pricing
          </h1>
          <p className="font-sans text-base text-ink-faint m-0">
            Start free. Buy leads when you need more. They never expire.
          </p>
        </div>

        <PricingPlansGrid />

        <div className="mt-20 max-w-[720px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink m-0 mb-8 text-center"
            style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}
          >
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
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full bg-transparent border-none cursor-pointer py-5 flex items-center justify-between gap-4 text-left"
                  >
                    <span
                      className={`font-sans text-base font-semibold leading-[1.4] transition-colors duration-150 ${isOpen ? 'text-ink' : 'text-ink-muted'}`}
                    >
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
