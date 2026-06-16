import { Link } from 'react-router-dom'
import LandingMeta from '../components/landing/LandingMeta'
import LandingHero from '../components/landing/LandingHero'
import LandingCTA from '../components/landing/LandingCTA'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Fast bulk extraction',
    desc: 'Pull hundreds of business listings from any Google Maps search in seconds — no waiting, no rate limits.',
  },
  {
    icon: '📋',
    title: '10+ data fields per lead',
    desc: 'Get business name, address, phone, website, email, rating, review count, category, and more.',
  },
  {
    icon: '📥',
    title: 'CSV & spreadsheet ready',
    desc: 'Download a clean CSV you can import directly into any CRM, spreadsheet, or outreach tool.',
  },
  {
    icon: '🖱️',
    title: 'No code, no extension',
    desc: 'Runs entirely in your browser. No Chrome extension, no API key, no technical setup required.',
  },
]

export default function GoogleMapsScraper() {
  return (
    <>
      <LandingMeta
        title="Google Maps Scraper — Extract Business Leads in Seconds"
        description="TheMapScraper is a Google Maps scraper that pulls business names, phones, emails, addresses, and websites into a ready-to-use CSV. No code, no extension."
        path="/google-maps-scraper/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.themapscraper.com/' },
          { name: 'Google Maps Scraper', url: 'https://www.themapscraper.com/google-maps-scraper/' },
        ]}
      />

      {/* Hero */}
      <LandingHero
        badge="No extension required"
        h1="Google Maps Scraper"
        subtitle="Extract business leads from any Google Maps search. Get phone numbers, emails, addresses, and websites — exported to CSV in seconds."
        ctaText="Start for free"
      />

      {/* Demo placeholder */}
      <section className="bg-white py-20 px-6 border-t border-border-subtle">
        <div className="max-w-[800px] mx-auto">
          <div className="rounded-xl border-2 border-dashed border-border-subtle bg-cream flex items-center justify-center" style={{ minHeight: '340px' }}>
            <p className="font-mono text-sm text-ink-faint">[DEMO GOES HERE]</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-cream py-20 px-6 border-t border-border-subtle">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Everything you need to build a lead list
          </h2>
          <p className="font-sans text-base text-ink-faint text-center m-0 mb-12 max-w-[480px] mx-auto">
            Designed for sales teams, agencies, and recruiters who need accurate local business data — fast.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-border-subtle rounded-[10px] p-6 flex flex-col gap-3"
              >
                <span className="text-2xl leading-none">{f.icon}</span>
                <h3 className="font-display font-bold text-[17px] tracking-[-0.02em] text-ink m-0">
                  {f.title}
                </h3>
                <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="bg-white py-10 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <p className="font-sans text-xs font-semibold text-ink-faint uppercase tracking-[0.06em] m-0 mb-3">Related tools</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: 'Google Maps Lead Extractor', to: '/google-maps-lead-extractor/' },
              { label: 'Extract Emails from Google Maps', to: '/extract-emails-google-maps/' },
              { label: 'Google Maps Data Scraper to CSV', to: '/google-maps-data-scraper-csv/' },
              { label: 'Free Google Maps Business Scraper', to: '/google-maps-business-scraper-free/' },
            ].map(({ label, to }) => (
              <Link key={to} to={to} className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LandingCTA
        headline="Start scraping Google Maps for free"
        ctaText="Start for free"
        ctaHref="/"
        subtext="No credit card required"
      />
    </>
  )
}
