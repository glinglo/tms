import { useState } from 'react'
import JsonLd from '../JsonLd'

interface FAQItem {
  question: string
  answer: string
}

export default function LandingFAQ({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  return (
    <>
      <JsonLd data={schema} />
      <div className="flex flex-col">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <div
              key={i}
              className={`border-t border-[rgba(32,32,32,0.10)]${i === faqs.length - 1 ? ' border-b' : ''}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full bg-transparent border-none cursor-pointer py-5 flex items-center justify-between gap-4 text-left"
              >
                <span className={`font-sans text-base font-semibold leading-[1.4] transition-colors duration-150 ${isOpen ? 'text-ink' : 'text-ink-muted'}`}>
                  {faq.question}
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
                style={{ maxHeight: isOpen ? '300px' : '0px' }}
              >
                <p className="font-sans text-[15px] font-normal leading-[1.65] text-ink-muted m-0 mb-5 pr-9">
                  {faq.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
