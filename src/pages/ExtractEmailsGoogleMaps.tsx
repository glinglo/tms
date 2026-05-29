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
    title: 'Search for businesses',
    desc: "Enter any query like 'hotels in Barcelona' or 'lawyers in London'",
  },
  {
    n: '02',
    title: 'Extract contact details including emails',
    desc: 'TheMapScraper pulls business emails, phones, addresses, and websites',
  },
  {
    n: '03',
    title: 'Download your email list as CSV',
    desc: 'Open in Excel, Google Sheets, or import directly into your outreach tool',
  },
]

const TIPS = [
  {
    title: 'Personalize every email',
    desc: 'Reference the business name, location, or category. Generic emails get ignored.',
  },
  {
    title: 'Provide value first',
    desc: 'Explain what you can do for their specific business before asking for anything.',
  },
  {
    title: 'Keep it short',
    desc: '3-5 sentences maximum. Business owners are busy.',
  },
  {
    title: 'Include an unsubscribe option',
    desc: 'Always give recipients a way to opt out. It builds trust and keeps you compliant.',
  },
]

const FAQS = [
  {
    question: 'Do all Google Maps listings have email addresses?',
    answer:
      'No. Email availability depends on whether the business has published their email on their Google Business Profile. Typically 30-60% of listings include email addresses, varying by industry and region.',
  },
  {
    question: 'Can I use extracted emails for cold outreach?',
    answer:
      'Yes. These are publicly available business contact emails that companies have chosen to display. Standard cold email best practices apply: personalize, provide value, and include an unsubscribe option.',
  },
  {
    question: 'What if a listing does not have an email?',
    answer:
      'You still get the business phone number, website URL, and physical address. You can visit their website to find contact forms or use the phone number for direct outreach.',
  },
  {
    question: 'How is this different from email finder tools like Hunter.io?',
    answer:
      'Email finder tools search for individual employee emails at a company. TheMapScraper extracts the public business contact email from Google Maps listings. They serve different purposes and can be used together.',
  },
]

export default function ExtractEmailsGoogleMaps() {
  return (
    <>
      <LandingMeta
        title="Extract Emails from Google Maps. Business Email Scraper"
        description="Find business emails from Google Maps listings. Bulk extract emails, phones and addresses. Download CSV. Perfect for cold outreach. No extension required."
        path="/extract-emails-google-maps/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.themapscraper.com/' },
          { name: 'Extract Emails from Google Maps', url: 'https://www.themapscraper.com/extract-emails-google-maps/' },
        ]}
      />

      {/* Hero */}
      <LandingHero
        badge="No extension required"
        h1="Extract Emails from Google Maps"
        subtitle="Get business emails, phone numbers, and full contact details from any Google Maps search. Download everything as a clean CSV file."
        ctaText="Extract Emails Now"
        ctaHref="/"
      />

      {/* Tutorial steps */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-12 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            How to Extract Business Emails from Google Maps
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

      {/* Honesty callout */}
      <section className="bg-white py-4 px-6 pb-20">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-6"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            What to Expect with Email Extraction
          </h2>
          <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-[12px] p-6 flex gap-4">
            <span className="text-2xl leading-none shrink-0 mt-[2px]" aria-hidden="true">ℹ️</span>
            <p className="font-sans text-[15px] font-normal leading-[1.65] text-[#1e40af] m-0">
              Not all Google Maps listings include email addresses. TheMapScraper extracts emails when businesses have made them publicly available on their Google Business Profile. Typically 30-60% of listings include emails, depending on the industry and region. For listings without email, you still get phone numbers, websites, and addresses for alternative outreach channels. You can{' '}
              <Link to="/" className="text-[#1e40af] font-medium underline">
                scrape Google Maps
              </Link>{' '}
              and download a full CSV with all available fields from the homepage.
            </p>
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
            What Contact Data Do You Get?
          </h2>
          <p className="font-sans text-base text-ink-faint m-0 mb-8">
            Every field exported to CSV, including email when available.
          </p>
          <DataFieldsTable highlightField="email" />
        </div>
      </section>

      {/* Tips */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Best Practices for Google Maps Email Outreach
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TIPS.map((tip) => (
              <div key={tip.title} className="bg-cream border border-border-subtle rounded-[10px] p-6">
                <h3 className="font-display font-bold text-[17px] tracking-[-0.02em] text-ink m-0 mb-2">{tip.title}</h3>
                <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0">{tip.desc}</p>
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
            Common questions about extracting emails from Google Maps.
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
              { label: 'Google Maps Lead Extractor',        to: '/google-maps-lead-extractor/' },
              { label: 'Google Maps Data Scraper to CSV',   to: '/google-maps-data-scraper-csv/' },
              { label: 'Free Google Maps Business Scraper', to: '/google-maps-business-scraper-free/' },
              { label: 'Compare scraping tools',            to: '/alternatives/' },
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
        headline="Start extracting emails now"
        ctaText="Try It Free"
        ctaHref="/"
        subtext="No credit card required"
      />
    </>
  )
}
