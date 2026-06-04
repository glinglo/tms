import { Link } from 'react-router-dom'
import LandingMeta from '../../../components/landing/LandingMeta'
import LandingFAQ from '../../../components/landing/LandingFAQ'
import LandingCTA from '../../../components/landing/LandingCTA'
import DataFieldsTable from '../../../components/landing/DataFieldsTable'
import BreadcrumbSchema from '../../../components/BreadcrumbSchema'
import { useAuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ALL_CITY_LINKS } from '../../../data/dentistCities'
import type { CityConfig } from '../../../data/dentistCities'

const BASE = 'https://www.themapscraper.com'

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-[3px]">
      <span className="text-[#f59e0b] text-xs">★</span>
      <span className="font-sans text-sm font-medium text-ink">{rating.toFixed(1)}</span>
    </span>
  )
}

function CityCta({ city, total }: { city: string; total: string }) {
  const { user, openSignUp } = useAuthContext()
  const navigate = useNavigate()
  function handleCta() {
    if (user) navigate('/dashboard')
    else openSignUp()
  }
  return (
    <div className="mt-6 rounded-[10px] border border-border-subtle bg-cream px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="font-sans text-sm font-semibold text-ink m-0">
          Want all {total} dentists in {city}?
        </p>
        <p className="font-sans text-sm text-ink-muted m-0 mt-[2px]">
          Start free — 50 leads/month, no credit card required.
        </p>
      </div>
      <button
        onClick={handleCta}
        className="shrink-0 inline-flex items-center gap-2 bg-brand text-white font-sans text-[14px] font-semibold px-6 py-3 rounded-pill border-none cursor-pointer transition-colors duration-150 hover:bg-brand-dark whitespace-nowrap"
      >
        Start scraping free <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}

export default function DentistCityPage({ config }: { config: CityConfig }) {
  const { name, state, path, metaTitle, metaDescription, totalResults, stats, sampleData, aboutContent, faqs } = config

  const relatedCities = ALL_CITY_LINKS.filter((c) => c.to !== path)

  return (
    <>
      <LandingMeta title={metaTitle} description={metaDescription} path={path} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${BASE}/` },
          { name: 'Scrape', url: `${BASE}/scrape/` },
          { name: 'Dentist Leads', url: `${BASE}/scrape/dentist-leads/` },
          { name: `${name}, ${state}`, url: `${BASE}${path}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-cream pt-16 pb-12 px-6 border-b border-border-subtle">
        <div className="max-w-[800px] mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white border border-border-subtle rounded-full px-4 py-[6px] font-sans text-xs font-semibold text-ink-muted mb-6">
            {totalResults} dentists scraped in {name}
          </span>
          <h1
            className="font-display font-bold leading-none tracking-[-0.03em] text-ink m-0 mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
          >
            Scrape Dentist Leads in {name} from Google Maps
          </h1>
          <p className="font-sans text-base text-ink-faint m-0 mb-8 max-w-[600px] mx-auto">
            We scraped {totalResults} dentists in {name}. Here's a preview of the data you'll get — with emails, phone numbers, ratings, and more.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-brand text-white font-sans text-[15px] font-semibold px-8 py-[14px] rounded-pill no-underline transition-colors duration-150 hover:bg-brand-dark"
          >
            Start Free — 50 leads/month
          </a>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white py-10 px-6 border-b border-border-subtle">
        <div className="max-w-[900px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Dentists scraped', value: stats.total },
            { label: 'Have email address', value: stats.emailPct },
            { label: 'Have website', value: stats.websitePct },
            { label: 'Average rating', value: stats.avgRating },
          ].map(({ label, value }) => (
            <div key={label}>
              <p
                className="font-display font-bold text-ink m-0 leading-none tracking-[-0.03em]"
                style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
              >
                {value}
              </p>
              <p className="font-sans text-xs text-ink-faint m-0 mt-2 uppercase tracking-[0.05em] font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Data Table */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Sample Dentist Data from {name}
          </h2>
          <p className="font-sans text-base text-ink-faint m-0 mb-8">
            Real-looking data extracted with TheMapScraper. Full contact details are unlocked when you sign up.
          </p>
          <div className="overflow-x-auto rounded-[10px] border border-border-subtle bg-white">
            <table className="w-full border-collapse" style={{ minWidth: '780px' }}>
              <thead>
                <tr className="bg-cream-dark">
                  {['Business Name', 'Phone', 'Address', 'Rating', 'Reviews', 'Website', 'Email'].map((col) => (
                    <th
                      key={col}
                      className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-4 whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row, i) => (
                  <tr
                    key={row.name}
                    className={`border-t border-[rgba(32,32,32,0.07)] ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}
                  >
                    <td className="py-[10px] px-4 font-sans text-sm font-semibold text-ink whitespace-nowrap">{row.name}</td>
                    <td className="py-[10px] px-4 font-mono text-sm text-ink-muted whitespace-nowrap">{row.phone}</td>
                    <td className="py-[10px] px-4 font-sans text-sm text-ink-muted" style={{ maxWidth: '220px' }}>{row.address}</td>
                    <td className="py-[10px] px-4 whitespace-nowrap"><StarRating rating={row.rating} /></td>
                    <td className="py-[10px] px-4 font-sans text-sm text-ink-muted whitespace-nowrap">{row.reviews.toLocaleString()}</td>
                    <td className="py-[10px] px-4 font-mono text-sm text-ink-muted whitespace-nowrap">{row.website}</td>
                    <td className="py-[10px] px-4 font-mono text-sm text-ink-muted whitespace-nowrap">{row.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CityCta city={name} total={totalResults} />
        </div>
      </section>

      {/* Data Fields */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            What You'll Get for Each Dentist
          </h2>
          <p className="font-sans text-base text-ink-faint m-0 mb-8">
            Every column exported to CSV, ready for your CRM or outreach tool.
          </p>
          <DataFieldsTable />
        </div>
      </section>

      {/* About section */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-8"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            About Dentist Data in {name}
          </h2>
          <div className="flex flex-col gap-5">
            {aboutContent.split('\n\n').map((p, i) => (
              <p key={i} className="font-sans text-base font-normal leading-relaxed text-ink-muted m-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-12 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            How to Scrape Dentists in {name}
          </h2>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {[
              {
                n: '01',
                title: `Enter "dentists in ${name}"`,
                desc: `Type "dentists in ${name}" or a specialty like "orthodontists in ${name}" into TheMapScraper search box.`,
              },
              {
                n: '02',
                title: 'Click scrape and wait ~2 minutes',
                desc: `TheMapScraper pulls every matching dental practice from Google Maps in ${name} with full contact details and ratings.`,
              },
              {
                n: '03',
                title: 'Download your CSV',
                desc: `Get names, phones, emails, websites, addresses, ratings, and review counts for every dentist in ${name} — ready for your outreach tool.`,
              },
            ].map((step) => (
              <div
                key={step.n}
                className="bg-cream border border-border-subtle rounded-[10px] p-7 flex flex-col gap-4"
              >
                <span className="font-mono text-[11px] font-normal text-brand tracking-[0.08em]">{step.n}</span>
                <h3 className="font-display font-bold text-[18px] leading-[1.25] tracking-[-0.02em] text-ink m-0">
                  {step.title}
                </h3>
                <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-20 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-base font-normal text-ink-faint m-0 mb-10">
            Everything you need to know about scraping dentists in {name} from Google Maps.
          </p>
          <LandingFAQ faqs={faqs} />
        </div>
      </section>

      {/* Related cities + back to hub */}
      <section className="bg-white py-10 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <p className="font-sans text-xs font-semibold text-ink-faint uppercase tracking-[0.06em] m-0 mb-4">
            Dentist leads by city
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
            {relatedCities.map(({ label, to }) => (
              <Link key={to} to={to} className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
                {label} →
              </Link>
            ))}
          </div>
          <p className="font-sans text-xs font-semibold text-ink-faint uppercase tracking-[0.06em] m-0 mb-3">
            More industries
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link to="/scrape/dentist-leads/" className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
              ← All Dentist Leads
            </Link>
            <Link to="/scrape/plumber-leads/" className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
              Plumber Leads →
            </Link>
            <Link to="/scrape/lawyer-leads/" className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
              Lawyer Leads →
            </Link>
            <Link to="/scrape/restaurant-leads/" className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
              Restaurant Leads →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <LandingCTA
        headline={`Start scraping dentists in ${name}`}
        ctaText="Try It Free"
        ctaHref="/"
        subtext="50 free leads per month · No credit card required"
      />
    </>
  )
}
