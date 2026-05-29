import { useState } from 'react'

const FAQS = [
  {
    q: 'Do the credits expire?',
    a: 'Purchased credits never expire. The free plan includes 50 leads per calendar month; that allowance resets each month.',
  },
  {
    q: 'How do credits work?',
    a: 'Simple: 1 credit = 1 lead. When you download a list of 500 businesses, you use 500 credits. Credits never expire, so you can buy a pack today and use it months later. You can check your credit balance at any time from your dashboard.',
  },
  {
    q: 'How fresh is the data?',
    a: 'Results are scraped in real time when you search. Not from a cached database.',
  },
  {
    q: 'What fields are included in the CSV?',
    a: 'Business name, phone, address, website, star rating, review count, email (when available), coordinates, and Google Maps URL.',
  },
  {
    q: 'Is scraping Google Maps legal?',
    a: 'As a map scraper, TheMapScraper only collects publicly available data. No login required, no private data accessed. The same information anyone can see by visiting Google Maps manually.',
  },
  {
    q: 'Can I open the CSV in Excel or Google Sheets?',
    a: 'Yes, directly. No formatting or conversion needed.',
  },
  {
    q: 'What if my search returns fewer results than expected?',
    a: 'You are only charged credits for the leads actually returned, never more.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Credits are non-refundable but they never expire, so they\'re never wasted.',
  },
  {
    q: 'Can I scrape businesses in any country?',
    a: 'Yes. Google Maps data is available worldwide. Just type any city, region, or country in the location field.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-cream py-24 px-6">
      <div className="max-w-[720px] mx-auto">

        <div className="mb-12">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-base font-normal text-ink-faint m-0">
            Everything you need to know before buying credits.
          </p>
        </div>

        <div className="flex flex-col">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`border-t border-[rgba(32,32,32,0.10)]${i === FAQS.length - 1 ? ' border-b' : ''}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
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
    </section>
  )
}
