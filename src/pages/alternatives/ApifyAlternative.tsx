import { Link } from 'react-router-dom'
import LandingMeta from '../../components/landing/LandingMeta'
import LandingHero from '../../components/landing/LandingHero'
import LandingFAQ from '../../components/landing/LandingFAQ'
import LandingCTA from '../../components/landing/LandingCTA'
import ComparisonTable from '../../components/landing/ComparisonTable'
import BreadcrumbSchema from '../../components/BreadcrumbSchema'

const ROWS = [
  {
    feature: 'Setup time',
    us: 'Instant. Type a query and extract.',
    them: 'Create account, find the right actor, configure JSON inputs, run.',
  },
  {
    feature: 'Technical skill',
    us: 'None. If you can use Google Maps, you can use TheMapScraper.',
    them: 'Medium. You need to understand actors, input schemas, and platform concepts.',
  },
  {
    feature: 'Pricing',
    us: 'Simple subscription. 25 leads/month free, no credit card. Paid plans for higher volumes.',
    them: 'Pay per result. ~$0.50/1K for basic data, up to $6/1K with email enrichment. Platform fee $29+/mo at scale.',
  },
  {
    feature: 'Google Maps focus',
    us: 'Purpose-built for Google Maps only.',
    them: 'General scraping platform. Google Maps is one of 8,000+ actors.',
  },
  {
    feature: 'Extension required',
    us: 'No',
    them: 'No',
  },
  {
    feature: 'CSV export',
    us: 'One-click CSV download.',
    them: 'JSON by default. CSV available but requires extra step.',
  },
  {
    feature: 'Email extraction',
    us: 'Extracts emails when available on the listing.',
    them: 'Requires separate enrichment actor at additional cost.',
  },
  {
    feature: 'Scheduling and automation',
    us: 'Not available.',
    them: 'Yes. Full scheduling, webhooks, and API.',
  },
  {
    feature: 'API access',
    us: 'Not available.',
    them: 'Full REST API with SDKs.',
  },
  {
    feature: 'Learning curve',
    us: '2 minutes.',
    them: '30-60 minutes to get comfortable.',
  },
]

const FAQS = [
  {
    question: 'Is there a free Apify alternative for Google Maps?',
    answer:
      'Yes. TheMapScraper offers a free tier with 25 leads per month and no credit card required. It is purpose-built for Google Maps and requires no technical setup, making it a simple alternative to Apify\'s actor-based system for users who only need Google Maps data.',
  },
  {
    question: 'What is the difference between TheMapScraper and Apify?',
    answer:
      'TheMapScraper is a focused, no-code tool built specifically for Google Maps scraping. Apify is a general-purpose scraping platform with 8,000+ actors for scraping virtually any website. TheMapScraper is faster to start and simpler to use; Apify offers more power and flexibility for developers.',
  },
  {
    question: 'Does Apify have a free plan for Google Maps scraping?',
    answer:
      'Apify offers $5 in free monthly credits, which covers roughly 500–5,000 Google Maps listings depending on the actor used. TheMapScraper offers 25 free leads per month with no time limit and no credit card required, making it a straightforward option for small-scale use.',
  },
]

const h2Class = 'font-display font-bold tracking-[-0.025em] text-ink mb-5'
const h2Style = { fontSize: 'clamp(22px, 3vw, 34px)' }

export default function ApifyAlternative() {
  return (
    <>
      <LandingMeta
        title="Apify Google Maps Scraper Alternative: TheMapScraper vs Apify [2026]"
        description="Looking for a free Apify alternative for Google Maps? Compare TheMapScraper vs Apify on pricing, features and ease of use. No code, instant CSV, 50 free leads/month."
        path="/alternatives/apify/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.themapscraper.com/' },
          { name: 'Alternatives', url: 'https://www.themapscraper.com/alternatives/' },
          { name: 'vs Apify', url: 'https://www.themapscraper.com/alternatives/apify/' },
        ]}
      />

      <LandingHero
        h1="TheMapScraper vs Apify"
        subtitle="Apify is a powerful developer platform with 8,000+ scrapers. TheMapScraper is a focused Google Maps tool for non-technical users. Here is how they compare."
        ctaText="Try TheMapScraper Free"
        ctaHref="/pricing"
      />

      <div className="bg-cream px-6 pb-2 text-center">
        <p className="font-sans text-xs text-ink-faint m-0">
          Last updated: <time dateTime="2026-05">May 2026</time>
        </p>
      </div>

      {/* What is Apify Google Maps Scraper? */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className={h2Class} style={h2Style}>
            What is Apify Google Maps Scraper?
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Apify is a cloud-based web scraping and automation platform with a marketplace of 8,000+
            pre-built scrapers called "actors." The Google Maps Scraper actor extracts business data
            — names, addresses, phone numbers, ratings, and reviews — from Google Maps at scale. It
            is designed for developers and technical teams who need flexible, programmable scraping
            with API access, scheduling, and webhook integrations.
          </p>
        </div>
      </section>

      {/* Apify vs TheMapScraper: pricing comparison */}
      <section className="bg-cream px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className={h2Class} style={h2Style}>
            Apify vs TheMapScraper: pricing comparison
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Apify uses a pay-per-result model. The Google Maps actor costs approximately $0.50 per
            1,000 results for basic data, rising to $6 per 1,000 when you add email enrichment. At
            scale, Apify also charges a platform fee starting at $29/month. In contrast,
            TheMapScraper uses a flat monthly subscription with 50 free leads per month and no
            credit card required. For non-technical users running regular searches, subscription
            pricing is easier to budget and avoids surprise bills.
          </p>
        </div>
      </section>

      {/* Why choose a free Apify alternative? */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className={h2Class} style={h2Style}>
            Why choose a free Apify alternative?
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Apify is powerful, but it is built for developers. If you just need a list of businesses
            from Google Maps — names, phones, emails, and addresses — you do not need an actor-based
            platform with JSON input schemas and API keys. TheMapScraper gives you the same core
            data in two minutes with no setup. It is free for up to 50 leads per month, and paid
            plans are priced for individual use rather than enterprise pipelines. Try the{' '}
            <Link to="/" className="text-brand font-medium hover:underline">
              Google Maps lead scraper
            </Link>{' '}
            free — no credit card required.
          </p>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="bg-cream px-6 py-20">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-10 text-center"
            style={h2Style}
          >
            TheMapScraper vs Apify: feature comparison
          </h2>
          <ComparisonTable competitor="Apify" rows={ROWS} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-20 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Frequently asked questions
          </h2>
          <p className="font-sans text-base font-normal text-ink-faint m-0 mb-10">
            Common questions about TheMapScraper vs Apify.
          </p>
          <LandingFAQ faqs={FAQS} />
        </div>
      </section>

      {/* Compare more alternatives */}
      <section className="bg-cream px-6 py-16 border-t border-border-subtle">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-6"
            style={{ fontSize: 'clamp(18px, 2.5vw, 26px)' }}
          >
            Compare more alternatives
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/alternatives/outscraper/"
              className="font-sans text-sm font-semibold text-ink-muted no-underline border border-border-subtle bg-white rounded-pill px-5 py-2.5 transition-colors duration-150 hover:text-ink"
            >
              TheMapScraper vs Outscraper
            </Link>
            <Link
              to="/alternatives/scrap-io/"
              className="font-sans text-sm font-semibold text-ink-muted no-underline border border-border-subtle bg-white rounded-pill px-5 py-2.5 transition-colors duration-150 hover:text-ink"
            >
              TheMapScraper vs Scrap.io
            </Link>
          </div>
        </div>
      </section>

      <LandingCTA
        headline="Try TheMapScraper free"
        ctaText="Start Extracting Leads"
        ctaHref="/pricing"
        subtext="No credit card, no configuration, no learning curve"
      />
    </>
  )
}
