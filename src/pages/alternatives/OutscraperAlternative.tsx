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
    us: 'Instant.',
    them: 'Create account, configure task parameters, select enrichment options.',
  },
  {
    feature: 'Pricing model',
    us: 'Simple subscription.',
    them: 'Pay-as-you-go. $3/1K for base data. Email enrichment is a separate charge (~$3/1K extra). Total cost for enriched leads: ~$6-14/1K.',
  },
  {
    feature: 'Pricing predictability',
    us: 'Fixed monthly cost. You know exactly what you pay.',
    them: 'Variable. Total cost depends on which enrichment services you stack. Can be hard to predict.',
  },
  {
    feature: 'Free tier',
    us: '25 leads/month, no credit card.',
    them: '500 free records.',
  },
  {
    feature: 'Extension required',
    us: 'No',
    them: 'No',
  },
  {
    feature: 'Email extraction',
    us: 'Included when available on listing.',
    them: 'Separate paid add-on.',
  },
  {
    feature: 'Data sources',
    us: 'Google Maps.',
    them: 'Google Maps, Google Search, Reviews, Amazon, social media, 50+ sources.',
  },
  {
    feature: 'Enrichment',
    us: 'Not available.',
    them: 'Phone validation, email enrichment, tech stack detection.',
  },
  {
    feature: 'API access',
    us: 'Not available.',
    them: 'Full REST API.',
  },
  {
    feature: 'Best for',
    us: 'Quick lead extraction without complexity.',
    them: 'Teams needing enriched data from multiple sources.',
  },
]

const FAQS = [
  {
    question: 'Is there a free Outscraper alternative?',
    answer:
      'Yes. TheMapScraper offers 50 free leads per month from Google Maps with no credit card required and no time limit. It is a simpler, subscription-based alternative for users who want predictable pricing instead of Outscraper\'s pay-as-you-go model.',
  },
  {
    question: 'What is Outscraper used for?',
    answer:
      'Outscraper is a data extraction platform used for scraping Google Maps, Google Search, reviews, Amazon, and 50+ other sources. It is popular for lead generation, market research, and business intelligence, particularly among teams that need enriched contact data.',
  },
  {
    question: 'How does TheMapScraper compare to Outscraper pricing?',
    answer:
      'Outscraper uses pay-as-you-go pricing at approximately $3 per 1,000 Google Maps records, with email enrichment costing an additional $3–11 per 1,000. TheMapScraper uses a simple monthly subscription, which is easier to budget and avoids the unpredictable costs of stacking Outscraper\'s enrichment services.',
  },
]

const h2Class = 'font-display font-bold tracking-[-0.025em] text-ink mb-5'
const h2Style = { fontSize: 'clamp(22px, 3vw, 34px)' }

export default function OutscraperAlternative() {
  return (
    <>
      <LandingMeta
        title="Outscraper Alternative: TheMapScraper vs Outscraper [2026 Comparison]"
        description="Compare TheMapScraper and Outscraper for Google Maps lead generation. Free alternative with no credit system — extract emails, phones and addresses instantly."
        path="/alternatives/outscraper/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.themapscraper.com/' },
          { name: 'Alternatives', url: 'https://www.themapscraper.com/alternatives/' },
          { name: 'vs Outscraper', url: 'https://www.themapscraper.com/alternatives/outscraper/' },
        ]}
      />

      <LandingHero
        h1="TheMapScraper vs Outscraper"
        subtitle="Outscraper is a pay-as-you-go scraping platform with enrichment features. TheMapScraper is a simpler tool focused on fast Google Maps extraction. Here is how they compare."
        ctaText="Try TheMapScraper Free"
        ctaHref="/pricing"
      />

      <div className="bg-cream px-6 pb-2 text-center">
        <p className="font-sans text-xs text-ink-faint m-0">
          Last updated: <time dateTime="2026-05">May 2026</time>
        </p>
      </div>

      {/* What is Outscraper? */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className={h2Class} style={h2Style}>
            What is Outscraper?
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Outscraper (sometimes written as Outscrapper) is a paid Google Maps data API and
            multi-source scraping platform. It extracts business listings from Google Maps, Google
            Search, reviews, Amazon, and 50+ other sources on a pay-as-you-go basis. It is used
            primarily by sales teams and data agencies who need enriched contact data — phone
            validation, email addresses, and tech stack detection — beyond what Google Maps shows
            directly.
          </p>
        </div>
      </section>

      {/* Outscraper vs TheMapScraper: pricing */}
      <section className="bg-cream px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className={h2Class} style={h2Style}>
            Outscraper vs TheMapScraper: pricing
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Outscraper charges $3 per 1,000 Google Maps records for base data. Email extraction,
            phone validation, and tech stack detection are separate paid add-ons, each costing
            $3–11 per 1,000 records. Stacking two or three enrichment services quickly pushes the
            cost to $6–14 per 1,000 enriched leads. TheMapScraper uses a flat monthly subscription:
            you know exactly what you pay every month, and email extraction from Google Maps listings
            is included at no additional cost.
          </p>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-10 text-center"
            style={h2Style}
          >
            TheMapScraper vs Outscraper: feature comparison
          </h2>
          <ComparisonTable competitor="Outscraper" rows={ROWS} />
        </div>
      </section>

      {/* Is Outscraper free? */}
      <section className="bg-cream px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className={h2Class} style={h2Style}>
            Is Outscraper free? A note on pricing
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Outscraper offers 500 free records for Google Maps scraping. Beyond that, all usage is
            billed per record with no ongoing free tier. The total cost per lead depends on how many
            enrichment services you add on top of the base scraping fee, which can make budgeting
            difficult. TheMapScraper offers 50 free leads per month permanently — no time limit, no
            credit card, and no stacking of service costs. Go to the homepage to{' '}
            <Link to="/" className="text-brand font-medium hover:underline">
              extract leads from Google Maps
            </Link>{' '}
            with 50 free leads included.
          </p>
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
            Common questions about TheMapScraper vs Outscraper.
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
              to="/alternatives/apify/"
              className="font-sans text-sm font-semibold text-ink-muted no-underline border border-border-subtle bg-white rounded-pill px-5 py-2.5 transition-colors duration-150 hover:text-ink"
            >
              TheMapScraper vs Apify
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
        subtext="No credit card required"
      />
    </>
  )
}
