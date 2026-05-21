import { FormEvent } from 'react'

interface HeroProps {
  query: { business: string; location: string }
  setQuery: (q: { business: string; location: string }) => void
  onSearch: (q: { business: string; location: string }) => void
}

const EXAMPLE_PILLS = [
  { business: 'Dentists', location: 'Texas' },
  { business: 'Roofers', location: 'Florida' },
  { business: 'Gyms', location: 'Barcelona' },
  { business: 'Lawyers', location: 'New York' },
  { business: 'Restaurants', location: 'London' },
]

export default function Hero({ query, setQuery, onSearch }: HeroProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.business.trim() && !query.location.trim()) return
    onSearch(query)
  }

  return (
    <section className="bg-cream px-6 pt-24 pb-20">
      <div className="max-w-[800px] mx-auto text-center">
        <div className="inline-flex items-center gap-[6px] bg-white border border-border-subtle rounded-pill px-[14px] py-[5px] mb-8">
          <span className="w-[6px] h-[6px] rounded-full bg-[#2b9a66] inline-block" />
          <span className="font-sans text-xs font-semibold text-ink-muted">
            Google Maps leads, exported as CSV
          </span>
        </div>

        <h1 className="font-display font-extrabold leading-none tracking-[-0.03em] text-ink mb-6" style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>
          Find any business.
          <br />
          <span className="text-brand">Export in seconds.</span>
        </h1>

        <p className="font-sans text-lg font-normal leading-relaxed text-ink-muted mb-5">
          Type a business type and location. Get a clean CSV of real leads
          <br />
          with phone numbers, addresses, and websites — no spreadsheets needed.
        </p>

        <p className="font-sans text-[13px] font-normal text-ink-faint mb-7">
          No extensions&nbsp;&nbsp;·&nbsp;&nbsp;No setup&nbsp;&nbsp;·&nbsp;&nbsp;Just leads
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border-[1.5px] border-[rgba(32,32,32,0.18)] rounded-pill pl-7 pr-2 py-2 flex items-center max-w-[680px] mx-auto mb-7 shadow-[0_8px_32px_rgba(32,32,32,0.10),0_2px_8px_rgba(32,32,32,0.06)] transition-shadow duration-200"
        >
          <div className="flex-1 flex flex-col min-w-0 pr-1 text-left">
            <label className="font-sans text-[10px] font-bold text-ink-faint uppercase tracking-[0.06em] mb-[2px] block">
              Business type
            </label>
            <input
              type="text"
              value={query.business}
              onChange={(e) => setQuery({ ...query, business: e.target.value })}
              placeholder="e.g. Dentists, Roofers, Gyms"
              className="border-none outline-none bg-transparent font-sans text-base font-medium text-ink w-full p-0"
            />
          </div>

          <div className="w-px h-9 bg-border-subtle mx-5 shrink-0" />

          <div className="flex-1 flex flex-col min-w-0 pr-1 text-left">
            <label className="font-sans text-[10px] font-bold text-ink-faint uppercase tracking-[0.06em] mb-[2px] block">
              Location
            </label>
            <input
              type="text"
              value={query.location}
              onChange={(e) => setQuery({ ...query, location: e.target.value })}
              placeholder="City, state, or country"
              className="border-none outline-none bg-transparent font-sans text-base font-medium text-ink w-full p-0"
            />
          </div>

          <button
            type="submit"
            className="shrink-0 bg-brand text-white font-sans text-[15px] font-semibold px-7 py-[14px] rounded-pill border-none cursor-pointer transition-colors duration-150 whitespace-nowrap ml-2 hover:bg-brand-dark"
          >
            Search leads
          </button>
        </form>

        <div className="flex flex-nowrap gap-[6px] justify-center items-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] pb-[2px]">
          <span className="font-sans text-xs font-normal text-[#bbbbbb] shrink-0">
            Try:
          </span>
          {EXAMPLE_PILLS.map((pill) => (
            <button
              key={`${pill.business}-${pill.location}`}
              onClick={() => {
                const q = { business: pill.business, location: pill.location }
                setQuery(q)
                onSearch(q)
              }}
              className="font-sans text-xs font-normal text-ink-faint bg-transparent border border-[rgba(32,32,32,0.1)] rounded-pill px-[11px] py-1 cursor-pointer transition-all duration-150 whitespace-nowrap shrink-0 hover:text-ink hover:border-[rgba(32,32,32,0.3)]"
            >
              {pill.business} in {pill.location}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
