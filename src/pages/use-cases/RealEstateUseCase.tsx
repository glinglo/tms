import { Link } from 'react-router-dom'
import LandingMeta from '../../components/landing/LandingMeta'
import LandingHero from '../../components/landing/LandingHero'
import LandingFAQ from '../../components/landing/LandingFAQ'
import LandingCTA from '../../components/landing/LandingCTA'
import DataFieldsTable from '../../components/landing/DataFieldsTable'
import BreadcrumbSchema from '../../components/BreadcrumbSchema'

const VALUE_PROPS = [
  {
    title: 'Find Partners Fast',
    desc: 'Looking for property managers in a new market? Search "property management companies in [city]" and get a full list with phone numbers and emails in seconds.',
  },
  {
    title: 'Build Referral Networks',
    desc: 'Extract real estate agents in your target area to build referral partnerships. Get their office address, phone, website, and Google rating. Marketing agencies also use this data to prospect estate agents as high-value clients.',
  },
  {
    title: 'Research New Markets',
    desc: 'Planning to expand? Analyze how many brokerages, investors, and property managers operate in any city before committing resources.',
  },
]

const EXAMPLE_SEARCHES = [
  'Real estate agents in Austin TX',
  'Property management companies in Miami',
  'Real estate investors in Los Angeles',
  'Commercial real estate brokers in Chicago',
  'Real estate appraisers in Denver',
  'Mortgage brokers in Phoenix',
]

const STEPS = [
  {
    n: '01',
    title: 'Search for real estate businesses',
    desc: 'Enter a query like "real estate agents in Dallas" or "property managers in San Francisco" into TheMapScraper.',
  },
  {
    n: '02',
    title: 'Extract contact details',
    desc: 'Get business names, phone numbers, email addresses, websites, Google ratings, and office addresses for every listing.',
  },
  {
    n: '03',
    title: 'Download CSV and start outreach',
    desc: 'Import your leads into your CRM or start calling. Each lead includes the direct business phone number.',
  },
]

const TIPS = [
  {
    title: 'Lead with market knowledge',
    desc: 'Reference the specific area or neighborhood. Show you know their market before asking for anything.',
  },
  {
    title: 'Offer value first',
    desc: 'Share a market report, a referral, or a co-marketing idea. Real estate is built on relationships.',
  },
  {
    title: 'Call, do not just email',
    desc: 'Real estate professionals live on their phones. A quick call often works better than email for this industry.',
  },
  {
    title: 'Follow up consistently',
    desc: 'Most deals in real estate happen after the 3rd to 5th touchpoint. Do not give up after one attempt.',
  },
]

const FAQS = [
  {
    question: 'What real estate businesses can I find on Google Maps?',
    answer:
      'You can find real estate agents, brokerages, property management companies, real estate investors, appraisers, mortgage brokers, title companies, home inspectors, and any other real estate-related business that has a Google Business Profile.',
  },
  {
    question: 'Does the data include email addresses?',
    answer:
      'Email addresses are extracted when the business has published them on their Google Business Profile. Typically 30-60% of real estate listings include email addresses. You also get phone numbers and websites for every listing.',
  },
  {
    question: 'Can I search for real estate leads in any city?',
    answer:
      'Yes. TheMapScraper works anywhere Google Maps covers. You can search for real estate businesses in any city, state, or country.',
  },
  {
    question: 'How many real estate leads can I get?',
    answer:
      'It depends on the market size. A search for "real estate agents in New York" will return hundreds of results. Smaller cities may return 20-50. The free tier includes 25 leads per month.',
  },
]

export default function RealEstateUseCase() {
  return (
    <>
      <LandingMeta
        title="Google Maps Scraper for Real Estate. Find Property Leads"
        description="Use TheMapScraper to find real estate agents, property managers, investors, and brokerages on Google Maps. Download leads as CSV. 50 free leads/month."
        path="/use-cases/real-estate/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.themapscraper.com/' },
          { name: 'Use Cases', url: 'https://www.themapscraper.com/use-cases/' },
          { name: 'Real Estate', url: 'https://www.themapscraper.com/use-cases/real-estate/' },
        ]}
      />

      <LandingHero
        badge="50 free leads/month"
        h1="Google Maps Scraper for Real Estate"
        subtitle="Find real estate agents, property managers, investors, and brokerages in any city. Download their contact details as a CSV file and start your outreach."
        ctaText="Extract Real Estate Leads"
      />

      {/* Why */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Why Real Estate Professionals Use Google Maps Data
          </h2>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {VALUE_PROPS.map((vp) => (
              <div key={vp.title} className="bg-cream border border-border-subtle rounded-[10px] p-7 flex flex-col gap-4">
                <h3 className="font-display font-bold text-[18px] leading-[1.25] tracking-[-0.02em] text-ink m-0">
                  {vp.title}
                </h3>
                <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example searches */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Example Searches for Real Estate
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {EXAMPLE_SEARCHES.map((query) => (
              <div
                key={query}
                className="bg-white border border-border-subtle rounded-[10px] px-5 py-4 flex items-center justify-between gap-4"
              >
                <span className="font-sans text-sm font-medium text-ink">{query}</span>
                <span className="font-mono text-xs text-ink-muted whitespace-nowrap">10 fields/listing</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-12 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            How to Generate Real Estate Leads in 3 Steps
          </h2>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {STEPS.map((step) => (
              <div key={step.n} className="bg-cream border border-border-subtle rounded-[10px] p-7 flex flex-col gap-4">
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

      {/* Data fields */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-8"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            What Data You Get for Each Listing
          </h2>
          <DataFieldsTable />
        </div>
      </section>

      {/* Outreach tips */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Tips for Real Estate Lead Outreach
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {TIPS.map((tip) => (
              <div key={tip.title} className="bg-cream border border-border-subtle rounded-[10px] p-6 flex flex-col gap-3">
                <h3 className="font-display font-bold text-[17px] tracking-[-0.02em] text-ink m-0">{tip.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-ink-muted m-0">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-20 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Frequently Asked Questions
          </h2>
          <LandingFAQ faqs={FAQS} />
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-white py-10 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <p className="font-sans text-xs font-semibold text-ink-faint uppercase tracking-[0.06em] m-0 mb-3">Related</p>
          <p className="font-sans text-sm text-ink-muted mb-4">
            Ready to build your list?{' '}
            <Link to="/" className="text-brand font-semibold hover:underline">
              Extract leads from Google Maps
            </Link>
            {' '}free — 25 leads per month included with no credit card required.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link to="/use-cases/" className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
              All Use Cases →
            </Link>
            <Link to="/use-cases/marketing-agencies/" className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
              Marketing Agencies →
            </Link>
            <Link to="/google-maps-lead-extractor/" className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
              Google Maps Lead Extractor →
            </Link>
          </div>
        </div>
      </section>

      <LandingCTA
        headline="Find real estate leads in your market"
        ctaText="Get 50 Free Leads"
        subtext="No credit card required"
      />
    </>
  )
}
