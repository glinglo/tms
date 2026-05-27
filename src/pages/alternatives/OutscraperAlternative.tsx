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
    us: '50 leads/month, no credit card.',
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
    question: 'Is Outscraper free?',
    answer:
      'Outscraper offers 500 free records for Google Maps scraping. After that, pricing is $3 per 1,000 records for base data. Email enrichment and contact scraping are additional charges.',
  },
  {
    question: 'Why is Outscraper pricing confusing?',
    answer:
      'Outscraper uses separate pricing for each service: Maps scraping, email extraction, phone validation, and contact enrichment. When you stack multiple services, the total cost per lead can reach $6-14 per 1,000, which is hard to predict upfront.',
  },
  {
    question: 'Does Outscraper extract emails?',
    answer:
      'Yes, but email extraction is a separate paid service on top of the base Maps scraping cost. TheMapScraper includes email extraction (when available on the listing) at no additional cost.',
  },
  {
    question: 'Which has better data quality?',
    answer:
      'Both tools pull data directly from Google Maps, so the base data quality is similar. Outscraper offers additional enrichment that can improve contact data, but at extra cost.',
  },
]

export default function OutscraperAlternative() {
  return (
    <>
      <LandingMeta
        title="TheMapScraper vs Outscraper [2026 Comparison]"
        description="Compare TheMapScraper and Outscraper for Google Maps scraping. Pricing, features, enrichment options, and which tool is right for you."
        path="/alternatives/outscraper/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://themapscraper.com/' },
          { name: 'Alternatives', url: 'https://themapscraper.com/alternatives/' },
          { name: 'vs Outscraper', url: 'https://themapscraper.com/alternatives/outscraper/' },
        ]}
      />

      <LandingHero
        h1="TheMapScraper vs Outscraper"
        subtitle="Outscraper is a pay-as-you-go scraping platform with enrichment features. TheMapScraper is a simpler tool focused on fast Google Maps extraction. Here is how they compare."
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
          <ComparisonTable competitor="Outscraper" rows={ROWS} />
        </div>
      </section>

      {/* When to choose Outscraper */}
      <section className="bg-cream px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-5"
            style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}
          >
            When to Choose Outscraper
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Outscraper is the better choice if you need data from multiple sources beyond Google
            Maps, require enrichment features like phone validation and tech stack detection, want
            API access for automated workflows, or need to scrape at very high volumes with volume
            discounts (rates drop to $1/1K after 100K records).
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
            TheMapScraper is the better choice if you only need Google Maps data, want predictable
            pricing without stacking costs, prefer instant setup over configuring task parameters,
            or find pay-as-you-go billing confusing and want a simple subscription.
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
            Common questions about TheMapScraper vs Outscraper.
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
