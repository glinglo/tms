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
    us: 'Simple subscription. 50 leads/month free, no credit card. Paid plans for higher volumes.',
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
    question: 'Is Apify free?',
    answer:
      'Apify offers $5 in free monthly credits, which covers roughly 500-5,000 listings depending on the actor used. After that, pricing is usage-based. TheMapScraper offers 50 leads/month free with no credit card required.',
  },
  {
    question: 'Is Apify better than TheMapScraper?',
    answer:
      'It depends on your needs. Apify offers more power and flexibility for developers. TheMapScraper offers simplicity and speed for non-technical users who specifically need Google Maps data.',
  },
  {
    question: 'Can I use Apify without coding?',
    answer:
      'Apify has a no-code interface, but you still need to understand concepts like actors, input parameters, and run configurations. TheMapScraper requires no technical knowledge at all.',
  },
  {
    question: 'Which is cheaper for Google Maps scraping?',
    answer:
      'For low to medium volumes, TheMapScraper subscription pricing is typically more predictable. Apify pay-per-result can be cheaper at very low volumes but costs scale linearly and can become expensive at high volumes.',
  },
]

export default function ApifyAlternative() {
  return (
    <>
      <LandingMeta
        title="TheMapScraper vs Apify Google Maps Scraper [2026 Comparison]"
        description="Compare TheMapScraper and Apify for Google Maps scraping. Side-by-side pricing, features, ease of use, and which tool fits your needs best."
        path="/alternatives/apify/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://themapscraper.com/' },
          { name: 'Alternatives', url: 'https://themapscraper.com/alternatives/' },
          { name: 'vs Apify', url: 'https://themapscraper.com/alternatives/apify/' },
        ]}
      />

      <LandingHero
        h1="TheMapScraper vs Apify"
        subtitle="Apify is a powerful developer platform with 8,000+ scrapers. TheMapScraper is a focused Google Maps tool for non-technical users. Here is how they compare."
        ctaText="Try TheMapScraper Free"
        ctaHref="/pricing"
      />

      {/* Comparison Table */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-10 text-center"
            style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}
          >
            Feature Comparison
          </h2>
          <ComparisonTable competitor="Apify" rows={ROWS} />
        </div>
      </section>

      {/* When to choose Apify */}
      <section className="bg-cream px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-5"
            style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}
          >
            When to Choose Apify
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Apify is the better choice if you are a developer building automated scraping pipelines,
            need to scrape multiple platforms beyond Google Maps, require API access for integration
            with your own systems, or need advanced features like scheduling and webhooks. Apify is
            a powerful tool for technical teams.
          </p>
        </div>
      </section>

      {/* When to choose TheMapScraper */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-5"
            style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}
          >
            When to Choose TheMapScraper
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            TheMapScraper is the better choice if you want to extract Google Maps leads without any
            technical setup, need results in 2 minutes instead of 30, prefer simple subscription
            pricing over pay-per-result billing, or are a sales rep, marketer, or agency owner who
            just wants a CSV file of leads.
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-base font-normal text-ink-faint m-0 mb-10">
            Common questions about TheMapScraper vs Apify.
          </p>
          <LandingFAQ faqs={FAQS} />
        </div>
      </section>

      {/* Other comparisons */}
      <section className="bg-cream px-6 py-16">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-8 text-center"
            style={{ fontSize: 'clamp(18px, 2.5vw, 26px)' }}
          >
            Other Comparisons
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/alternatives/"
              className="font-sans text-sm font-semibold text-ink-muted no-underline border border-border-subtle bg-white rounded-pill px-5 py-2.5 transition-colors duration-150 hover:text-ink"
            >
              All comparisons
            </Link>
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
