import { Link } from 'react-router-dom'
import LandingMeta from '../components/landing/LandingMeta'
import LandingHero from '../components/landing/LandingHero'
import LandingFAQ from '../components/landing/LandingFAQ'
import LandingCTA from '../components/landing/LandingCTA'
import CSVPreview from '../components/landing/CSVPreview'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const TOOLS = [
  { name: 'Microsoft Excel',  icon: '📊' },
  { name: 'Google Sheets',    icon: '📋' },
  { name: 'HubSpot',          icon: '🔶' },
  { name: 'Salesforce',       icon: '☁️' },
  { name: 'Pipedrive',        icon: '📈' },
  { name: 'Airtable',         icon: '🗃️' },
  { name: 'Notion',           icon: '📝' },
]

const STEPS = [
  {
    n: '01',
    title: 'Search Google Maps',
    desc: 'Enter any business type and location — "dentists in Austin" or "hotels in Paris"',
  },
  {
    n: '02',
    title: 'Extract structured data',
    desc: 'TheMapScraper pulls every field into clean, separated columns',
  },
  {
    n: '03',
    title: 'Download your CSV',
    desc: 'One click to get a formatted file with no duplicates and no junk data',
  },
]

const FAQS = [
  {
    question: 'What columns does the CSV include?',
    answer:
      'The CSV includes: Business Name, Phone Number, Email, Full Address, Website URL, Google Rating, Review Count, Business Category, Opening Hours, and Google Maps URL. All organized in separate columns.',
  },
  {
    question: 'Can I open the CSV in Excel or Google Sheets?',
    answer:
      'Yes. The CSV file uses standard UTF-8 encoding with comma separation. It opens correctly in Microsoft Excel, Google Sheets, LibreOffice Calc, Apple Numbers, or any spreadsheet application.',
  },
  {
    question: 'Are there duplicate entries in the export?',
    answer:
      'No. TheMapScraper automatically deduplicates results so each business appears only once in your CSV file.',
  },
  {
    question: 'Can I import the CSV into my CRM?',
    answer:
      'Yes. The CSV format is universally supported by CRMs including HubSpot, Salesforce, Pipedrive, Zoho, Close, and others. Use their CSV import feature and map the columns.',
  },
  {
    question: 'What encoding does the CSV use?',
    answer:
      'UTF-8 encoding, which correctly handles international characters, accents, and special symbols in business names and addresses.',
  },
]

const RELATED = [
  { label: 'Google Maps Lead Extractor',       to: '/google-maps-lead-extractor/' },
  { label: 'Extract Emails from Google Maps',  to: '/extract-emails-google-maps/' },
  { label: 'Free Google Maps Business Scraper', to: '/google-maps-business-scraper-free/' },
  { label: 'Compare scraping tools',           to: '/alternatives/' },
]

export default function GoogleMapsDataScraperCsv() {
  return (
    <>
      <LandingMeta
        title="Google Maps Data Scraper to CSV. Export Clean Data Instantly"
        description="Scrape Google Maps data and export to CSV instantly. Clean columns, ready for Excel, Google Sheets, or CRM import. No coding, no extension. Free to try."
        path="/google-maps-data-scraper-csv/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://themapscraper.com/' },
          { name: 'Google Maps Data Scraper to CSV', url: 'https://themapscraper.com/google-maps-data-scraper-csv/' },
        ]}
      />

      {/* Hero */}
      <LandingHero
        badge="No extension required"
        h1="Google Maps Data Scraper to CSV"
        subtitle="Scrape any Google Maps search and download a clean, structured CSV file. Ready for Excel, Google Sheets, or your CRM."
        ctaText="Download Your First CSV"
        ctaHref="/"
      />

      {/* CSV Preview */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            What Your CSV File Looks Like
          </h2>
          <p className="font-sans text-base text-ink-faint m-0 mb-10 text-center">
            A real export from a Google Maps search for restaurants in New York.
          </p>
          <CSVPreview />
        </div>
      </section>

      {/* Tool Compatibility */}
      <section className="bg-cream py-20 px-6 border-t border-border-subtle">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Compatible with Every Tool You Use
          </h2>
          <p className="font-sans text-base text-ink-faint m-0 mb-10 text-center">
            Import your CSV into any tool that accepts spreadsheet data
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-[10px] bg-white border border-border-subtle rounded-[10px] px-5 py-3"
              >
                <span className="text-xl leading-none" aria-hidden="true">{tool.icon}</span>
                <span className="font-sans text-sm font-semibold text-ink">{tool.name}</span>
                <span className="text-[#16a34a] font-bold text-sm leading-none">✓</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-12 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Export Google Maps Data to CSV in Seconds
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
            Common questions about exporting Google Maps data to CSV.
          </p>
          <LandingFAQ faqs={FAQS} />
        </div>
      </section>

      {/* Related tools */}
      <section className="bg-white py-10 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <p className="font-sans text-xs font-semibold text-ink-faint uppercase tracking-[0.06em] m-0 mb-3">Related tools</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {RELATED.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="font-sans text-sm font-semibold text-brand no-underline hover:underline"
              >
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <LandingCTA
        headline="Export your first CSV now"
        ctaText="Try It Free"
        ctaHref="/"
        subtext="No credit card required"
      />
    </>
  )
}
