import { Link } from 'react-router-dom'
import LandingMeta from '../components/landing/LandingMeta'
import LandingHero from '../components/landing/LandingHero'
import LandingFAQ from '../components/landing/LandingFAQ'
import LandingCTA from '../components/landing/LandingCTA'
import DataFieldsTable from '../components/landing/DataFieldsTable'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const FREE_FEATURES = [
  {
    icon: '🗂️',
    title: 'All Data Fields',
    desc: 'Names, phones, emails, addresses, websites, ratings. Same data as paid plans.',
  },
  {
    icon: '⬇️',
    title: 'CSV Download',
    desc: 'Export your results as a clean CSV file. No watermarks, no limitations on the file.',
  },
  {
    icon: '🌐',
    title: 'No Extension',
    desc: 'Works directly in your browser. Nothing to install or configure.',
  },
  {
    icon: '💳',
    title: 'No Credit Card',
    desc: 'Create an account and start extracting immediately. No payment info needed.',
  },
]

const COMPARISON_ROWS = [
  { feature: 'Monthly extractions', free: 'Limited',       premium: 'Unlimited' },
  { feature: 'Data fields',         free: 'All included',  premium: 'All included' },
  { feature: 'CSV export',          free: 'Yes',           premium: 'Yes' },
  { feature: 'Priority support',    free: 'Community',     premium: 'Dedicated' },
  { feature: 'API access',          free: 'No',            premium: 'Yes' },
]

const NO_FRICTION = [
  {
    icon: '🔌',
    title: 'No Extension',
    desc: 'Other scrapers need Chrome extensions that break on updates and slow your browser. TheMapScraper works server-side — nothing touches your browser.',
  },
  {
    icon: '💳',
    title: 'No Credit Card',
    desc: 'Create your account in seconds. Start extracting leads immediately. Upgrade only if you need more volume.',
  },
  {
    icon: '⚙️',
    title: 'No Setup',
    desc: 'No API keys, no configuration files, no technical knowledge. If you can use Google Maps, you can use TheMapScraper.',
  },
]

const FAQS = [
  {
    question: 'Is TheMapScraper really free?',
    answer:
      'Yes. The free tier gives you real extractions with all data fields and CSV download. No watermarks, no hidden limitations on data quality. Upgrade anytime if you need higher volumes.',
  },
  {
    question: 'Do I need a credit card to start?',
    answer:
      'No. Create an account and start extracting leads immediately without any payment information.',
  },
  {
    question: 'What are the limits of the free plan?',
    answer:
      'The free plan includes a monthly extraction limit. All data fields including names, phones, emails, addresses, and ratings are included in every plan.',
  },
  {
    question: 'Is the data quality different on the free plan?',
    answer:
      'No. You get the exact same data quality and fields on the free plan as on paid plans. The only difference is the number of extractions per month.',
  },
  {
    question: 'Can I upgrade later?',
    answer:
      'Yes. You can upgrade to a premium plan anytime from your dashboard. Your existing data and account settings are preserved.',
  },
]

const RELATED = [
  { label: 'Google Maps Lead Extractor',         to: '/google-maps-lead-extractor/' },
  { label: 'Extract Emails from Google Maps',    to: '/extract-emails-google-maps/' },
  { label: 'Google Maps Data Scraper to CSV',    to: '/google-maps-data-scraper-csv/' },
]

export default function GoogleMapsBusinessScraperFree() {
  return (
    <>
      <LandingMeta
        title="Free Google Maps Scraper. Extract Business Data at No Cost"
        description="Free Google Maps scraper with no extension required. Extract business names, phones, emails and addresses. Download CSV. No credit card, no setup. Start free."
        path="/google-maps-business-scraper-free/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://themapscraper.com/' },
          { name: 'Free Google Maps Business Scraper', url: 'https://themapscraper.com/google-maps-business-scraper-free/' },
        ]}
      />

      {/* Hero */}
      <LandingHero
        badge="No credit card required"
        h1="Free Google Maps Business Scraper"
        subtitle="Extract business data from Google Maps at no cost. No credit card, no browser extension, no time limit. Just search and download."
        ctaText="Start Free"
        ctaHref="/"
      />

      {/* Free plan features */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            What You Get with the Free Plan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FREE_FEATURES.map((f) => (
              <div key={f.title} className="bg-cream border border-border-subtle rounded-[10px] p-6 flex gap-4">
                <span className="text-2xl leading-none shrink-0 mt-[2px]" aria-hidden="true">{f.icon}</span>
                <div>
                  <h3 className="font-display font-bold text-[17px] tracking-[-0.02em] text-ink m-0 mb-1">{f.title}</h3>
                  <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Premium */}
      <section className="bg-cream py-20 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Free vs Premium Plans
          </h2>
          <div className="overflow-x-auto rounded-[10px] border border-border-subtle">
            <table className="w-full border-collapse" style={{ minWidth: '420px' }}>
              <thead>
                <tr className="bg-cream-dark">
                  <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">Feature</th>
                  <th className="font-sans text-[11px] font-semibold text-[#16a34a] uppercase tracking-[0.05em] text-left py-[10px] px-5 bg-[rgba(22,163,74,0.04)]">Free</th>
                  <th className="font-sans text-[11px] font-semibold text-brand uppercase tracking-[0.05em] text-left py-[10px] px-5 bg-[rgba(234,40,4,0.04)]">Premium</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} className={`border-t border-[rgba(32,32,32,0.07)] ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}>
                    <td className="py-3 px-5 font-sans text-sm font-semibold text-ink">{row.feature}</td>
                    <td className="py-3 px-5 font-sans text-sm text-ink font-medium bg-[rgba(22,163,74,0.02)]">{row.free}</td>
                    <td className="py-3 px-5 font-sans text-sm text-ink-muted bg-[rgba(234,40,4,0.02)]">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <Link
              to="/"
              className="inline-block bg-brand text-white font-sans text-sm font-semibold px-5 py-[10px] rounded-[8px] no-underline hover:opacity-90 transition-opacity"
            >
              Start Free
            </Link>
            <Link
              to="/pricing"
              className="font-sans text-sm font-semibold text-ink-muted no-underline hover:text-ink"
            >
              See full pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* No Friction */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            No Extension, No Credit Card, No Catch
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {NO_FRICTION.map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <span className="text-3xl leading-none" aria-hidden="true">{item.icon}</span>
                <h3 className="font-display font-bold text-[18px] tracking-[-0.02em] text-ink m-0">{item.title}</h3>
                <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Fields */}
      <section className="bg-cream py-20 px-6 border-t border-border-subtle">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            All Data Fields Included on Every Plan
          </h2>
          <p className="font-sans text-base text-ink-faint m-0 mb-8">
            Free or paid, you always get the full dataset.
          </p>
          <DataFieldsTable />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-base font-normal text-ink-faint m-0 mb-10">
            Common questions about the free Google Maps scraper.
          </p>
          <LandingFAQ faqs={FAQS} />
        </div>
      </section>

      {/* Related tools */}
      <section className="bg-cream py-10 px-6 border-t border-border-subtle">
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
        headline="Start scraping for free"
        ctaText="Create Free Account"
        ctaHref="/"
        subtext="No credit card required. No extension needed."
      />
    </>
  )
}
