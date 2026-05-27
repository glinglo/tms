import { Link } from 'react-router-dom'
import LandingMeta from '../components/landing/LandingMeta'
import LandingHero from '../components/landing/LandingHero'
import LandingFAQ from '../components/landing/LandingFAQ'
import LandingCTA from '../components/landing/LandingCTA'
import DataFieldsTable from '../components/landing/DataFieldsTable'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const STEPS = [
  {
    n: '01',
    title: 'Search any business type and location',
    desc: "Type a query like 'dentists in Chicago' or 'restaurants in Miami'",
  },
  {
    n: '02',
    title: 'Extract all business listings',
    desc: 'TheMapScraper pulls every matching result with full contact details',
  },
  {
    n: '03',
    title: 'Download your leads as CSV',
    desc: 'Get a clean spreadsheet ready for your CRM or outreach tool',
  },
]

const COMPARISON = [
  {
    feature: 'Setup time',
    us: 'Instant',
    ext: 'Install + configure',
    apify: 'Create account, learn platform',
  },
  {
    feature: 'Extension required',
    us: 'No',
    ext: 'Yes',
    apify: 'No, but complex UI',
  },
  {
    feature: 'Pricing model',
    us: 'Simple subscription',
    ext: 'Varies',
    apify: 'Pay per record or usage',
  },
  {
    feature: 'Ease of use',
    us: 'Type and download',
    ext: 'Moderate',
    apify: 'Technical',
  },
  {
    feature: 'Reliability',
    us: 'Server-side, stable',
    ext: 'Breaks on Maps updates',
    apify: 'Stable but complex',
  },
]

const USE_CASES = [
  {
    title: 'Sales Teams',
    desc: 'Build prospect lists of local businesses for cold outreach campaigns',
    to: null,
  },
  {
    title: 'Marketing Agencies',
    desc: 'Find potential clients who need digital marketing services',
    to: '/use-cases/marketing-agencies/',
  },
  {
    title: 'Real Estate Agents',
    desc: 'Source property-related leads from agents, investors, and managers',
    to: '/use-cases/real-estate/',
  },
  {
    title: 'Recruiters',
    desc: 'Discover companies in specific industries and locations for talent placement',
    to: null,
  },
]

const FAQS = [
  {
    question: 'How many leads can I extract at once?',
    answer:
      'TheMapScraper can extract hundreds of business leads in a single search. The exact number depends on how many businesses match your Google Maps query for that location and category.',
  },
  {
    question: 'Do I need to install a browser extension?',
    answer:
      'No. TheMapScraper works directly in your browser without any extension, download, or technical setup. Just type your search and extract.',
  },
  {
    question: 'Can I import leads into my CRM?',
    answer:
      'Yes. All data exports as a standard CSV file that you can import into any CRM including HubSpot, Salesforce, Pipedrive, Zoho, or any tool that accepts CSV imports.',
  },
  {
    question: 'Is the lead data accurate?',
    answer:
      'The data comes directly from Google Maps listings, so it reflects what businesses have published on their Google Business Profile. Phone numbers, addresses, and websites are generally very accurate.',
  },
  {
    question: 'Is it legal to extract leads from Google Maps?',
    answer:
      'Extracting publicly available business information from Google Maps is generally considered legal. The data is public business contact information that companies have chosen to display.',
  },
]

export default function GoogleMapsLeadExtractor() {
  return (
    <>
      <LandingMeta
        title="Google Maps Lead Extractor. Get B2B Contacts in Seconds"
        description="Extract verified business leads from Google Maps. Get names, phones, emails, addresses and websites. Download CSV instantly. No extension, no API, no code."
        path="/google-maps-lead-extractor/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://themapscraper.com/' },
          { name: 'Google Maps Lead Extractor', url: 'https://themapscraper.com/google-maps-lead-extractor/' },
        ]}
      />

      {/* Hero */}
      <LandingHero
        badge="No extension required"
        h1="Google Maps Lead Extractor"
        subtitle="Extract B2B leads from any Google Maps search. Get phone numbers, emails, addresses, and websites in a clean CSV. No browser extension needed."
        ctaText="Start Extracting Leads"
        ctaHref="/"
      />

      {/* How It Works */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-12 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Extract B2B Leads from Google Maps in 3 Steps
          </h2>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {STEPS.map((step) => (
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

      {/* Data Fields */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            What Lead Data Can You Extract?
          </h2>
          <p className="font-sans text-base text-ink-faint m-0 mb-8">
            Every field exported to CSV, ready for your CRM or outreach tool.
          </p>
          <DataFieldsTable />
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Why TheMapScraper vs Other Lead Extractors
          </h2>
          <div className="overflow-x-auto rounded-[10px] border border-border-subtle">
            <table className="w-full border-collapse" style={{ minWidth: '560px' }}>
              <thead>
                <tr className="bg-cream-dark">
                  <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">Feature</th>
                  <th className="font-sans text-[11px] font-semibold text-brand uppercase tracking-[0.05em] text-left py-[10px] px-5 bg-[rgba(234,40,4,0.04)]">TheMapScraper</th>
                  <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">Chrome Extensions</th>
                  <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">Apify / Outscraper</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} className={`border-t border-[rgba(32,32,32,0.07)] ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}>
                    <td className="py-3 px-5 font-sans text-sm font-semibold text-ink">{row.feature}</td>
                    <td className="py-3 px-5 font-sans text-sm text-ink font-medium bg-[rgba(234,40,4,0.03)]">{row.us}</td>
                    <td className="py-3 px-5 font-sans text-sm text-ink-muted">{row.ext}</td>
                    <td className="py-3 px-5 font-sans text-sm text-ink-muted">{row.apify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-sans text-sm text-ink-muted text-center mt-6">
            Want a deeper breakdown?{' '}
            <Link to="/alternatives/" className="text-brand font-semibold no-underline hover:underline">
              See our full comparison of Google Maps scraping tools →
            </Link>
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Who Uses Google Maps Lead Extraction?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {USE_CASES.map((uc) => {
              const inner = (
                <div className={`bg-white border border-border-subtle rounded-[10px] p-6 h-full${uc.to ? ' transition-shadow duration-150 hover:shadow-md' : ''}`}>
                  <h3 className="font-display font-bold text-[17px] tracking-[-0.02em] text-ink m-0 mb-2">{uc.title}</h3>
                  <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0">{uc.desc}</p>
                  {uc.to && (
                    <span className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-brand mt-3">
                      Learn more <span aria-hidden="true">→</span>
                    </span>
                  )}
                </div>
              )
              return uc.to ? (
                <Link key={uc.title} to={uc.to} className="no-underline flex">
                  {inner}
                </Link>
              ) : (
                <div key={uc.title}>{inner}</div>
              )
            })}
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
            Everything you need to know about extracting leads from Google Maps.
          </p>
          <LandingFAQ faqs={FAQS} />
        </div>
      </section>

      {/* Related tools */}
      <section className="bg-white py-10 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <p className="font-sans text-xs font-semibold text-ink-faint uppercase tracking-[0.06em] m-0 mb-3">Related tools</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: 'Extract Emails from Google Maps',   to: '/extract-emails-google-maps/' },
              { label: 'Google Maps Data Scraper to CSV',   to: '/google-maps-data-scraper-csv/' },
              { label: 'Free Google Maps Business Scraper', to: '/google-maps-business-scraper-free/' },
            ].map(({ label, to }) => (
              <Link key={to} to={to} className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <LandingCTA
        headline="Start extracting leads now"
        ctaText="Try It Free"
        ctaHref="/"
        subtext="No credit card required"
      />
    </>
  )
}
