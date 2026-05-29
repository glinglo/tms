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
    them: 'Create account, select categories and filters.',
  },
  {
    feature: 'Pricing',
    us: 'Simple subscription. 50 leads/month free, no credit card. Paid plans for higher volumes.',
    them: 'From €49/month for 10,000 exports. Yearly deal available at €699.',
  },
  {
    feature: 'Free tier',
    us: '50 leads/month, no credit card.',
    them: '7-day trial with 100 leads.',
  },
  {
    feature: 'Extension required',
    us: 'No',
    them: 'No',
  },
  {
    feature: 'Filtering',
    us: 'Search by query and location.',
    them: 'Advanced: 4,000+ categories, rating range, review count, claimed/unclaimed, ad pixel detection, price range.',
  },
  {
    feature: 'Scale',
    us: 'City and area level.',
    them: 'Country-level scraping available.',
  },
  {
    feature: 'Email extraction',
    us: 'Included when available.',
    them: 'Included.',
  },
  {
    feature: 'CSV export',
    us: 'Yes',
    them: 'Yes',
  },
  {
    feature: 'Social media data',
    us: 'Not available.',
    them: 'Extracts social media profiles.',
  },
  {
    feature: 'Best for',
    us: 'Quick, simple lead extraction.',
    them: 'Highly filtered, targeted lead lists at scale.',
  },
]

const FAQS = [
  {
    question: 'Is Scrap.io free?',
    answer:
      'Scrap.io offers a 7-day free trial with 100 leads. After that, plans start at €49/month. TheMapScraper offers 50 leads/month free permanently, no time limit and no credit card required.',
  },
  {
    question: 'Can Scrap.io scrape an entire country?',
    answer:
      'Yes. Scrap.io can scrape at country level, which is unique among Google Maps scrapers. TheMapScraper works at city and area level, which is sufficient for most lead generation use cases.',
  },
  {
    question: 'Which has better filtering?',
    answer:
      'Scrap.io has more advanced filtering options including rating ranges, review counts, ad pixel detection, and claimed/unclaimed status. TheMapScraper offers simpler search-based filtering by query and location.',
  },
  {
    question: 'Which is cheaper?',
    answer:
      'TheMapScraper offers 50 leads/month free (no credit card) and lower-priced paid plans. Scrap.io starts at €49/month but includes advanced filtering and larger export volumes. The right choice depends on whether you need those advanced features.',
  },
]

export default function ScrapIoAlternative() {
  return (
    <>
      <LandingMeta
        title="TheMapScraper vs Scrap.io [2026 Comparison]"
        description="Compare TheMapScraper and Scrap.io for Google Maps lead generation. Pricing, filtering features, ease of use, and which scraper fits your workflow."
        path="/alternatives/scrap-io/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.themapscraper.com/' },
          { name: 'Alternatives', url: 'https://www.themapscraper.com/alternatives/' },
          { name: 'vs Scrap.io', url: 'https://www.themapscraper.com/alternatives/scrap-io/' },
        ]}
      />

      <LandingHero
        h1="TheMapScraper vs Scrap.io"
        subtitle="Scrap.io is a specialized Google Maps scraper with advanced filtering. TheMapScraper focuses on speed and simplicity. Here is how they compare."
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
          <ComparisonTable competitor="Scrap.io" rows={ROWS} />
        </div>
      </section>

      {/* When to choose Scrap.io */}
      <section className="bg-cream px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-5"
            style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}
          >
            When to Choose Scrap.io
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Scrap.io is the better choice if you need advanced filtering (by rating, review count,
            ad pixel, claimed status), want to scrape at country scale rather than city level, need
            social media profiles in addition to contact data, or are willing to pay €49+/month for
            more granular lead targeting.
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
            TheMapScraper is the better choice if you want the fastest possible setup with zero
            learning curve, need a free tier to test before committing, prefer a lower price point
            for basic lead extraction, or just need names, phones, emails, and addresses without
            advanced filtering.{' '}
            <Link to="/" className="text-brand font-medium hover:underline">
              TheMapScraper
            </Link>{' '}
            includes 50 free leads per month with no time limit and no credit card required.
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
            Common questions about TheMapScraper vs Scrap.io.
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
              to="/alternatives/outscraper/"
              className="font-sans text-sm font-semibold text-ink-muted no-underline border border-border-subtle bg-white rounded-pill px-5 py-2.5 transition-colors duration-150 hover:text-ink"
            >
              TheMapScraper vs Outscraper
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
