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
    us: 'Simple subscription. 25 leads/month free, no credit card. Paid plans for higher volumes.',
    them: 'From €49/month for 10,000 exports. Yearly deal available at €699.',
  },
  {
    feature: 'Free tier',
    us: '25 leads/month, no credit card.',
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
    question: 'Is Scrap.io free to use?',
    answer:
      'Scrap.io offers a 7-day free trial with up to 100 leads. After the trial, plans start at €49 per month. TheMapScraper offers 25 free leads per month permanently with no time limit and no credit card required.',
  },
  {
    question: 'What is the best free Scrap.io alternative?',
    answer:
      'TheMapScraper is a strong free alternative to Scrap.io for basic Google Maps lead extraction. It offers 25 leads per month at no cost with no credit card required. While it lacks Scrap.io\'s advanced filtering and country-level scraping, it is faster to set up and more affordable for smaller-scale use.',
  },
  {
    question: 'How is TheMapScraper different from Scrap.io?',
    answer:
      'Both tools extract business data from Google Maps. Scrap.io offers more advanced filtering — rating ranges, review counts, ad pixel detection — and country-level scraping, while TheMapScraper focuses on simplicity and speed with instant setup and lower pricing. TheMapScraper is better for quick lead extraction; Scrap.io is better for highly targeted lists at scale.',
  },
]

const h2Class = 'font-display font-bold tracking-[-0.025em] text-ink mb-5'
const h2Style = { fontSize: 'clamp(22px, 3vw, 34px)' }

export default function ScrapIoAlternative() {
  return (
    <>
      <LandingMeta
        title="Scrap.io Alternative: TheMapScraper vs Scrap.io [2026 Comparison]"
        description="TheMapScraper is a free Scrap.io alternative for Google Maps scraping. Compare pricing and features. Clean CSV in seconds, no extension needed."
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

      <div className="bg-cream px-6 pb-2 text-center">
        <p className="font-sans text-xs text-ink-faint m-0">
          Last updated: <time dateTime="2026-05">May 2026</time>
        </p>
      </div>

      {/* What is Scrap.io? */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className={h2Class} style={h2Style}>
            What is Scrap.io?
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Scrap.io is a specialized Google Maps scraper designed for bulk lead extraction with
            advanced filtering. It supports 4,000+ business categories, filtering by rating range,
            review count, claimed/unclaimed status, and ad pixel detection. Unlike general-purpose
            platforms, Scrap.io is purpose-built for Google Maps, supports country-level scraping,
            and includes social media profile extraction. Plans start at €49/month after a 7-day
            free trial.
          </p>
        </div>
      </section>

      {/* Scrap.io vs TheMapScraper: pricing */}
      <section className="bg-cream px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className={h2Class} style={h2Style}>
            Scrap.io vs TheMapScraper: pricing
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Scrap.io starts at €49/month for 10,000 exports, with a yearly plan available at €699.
            There is a 7-day free trial capped at 100 leads. TheMapScraper offers 50 free leads per
            month permanently with no credit card required. Paid plans are priced lower than
            Scrap.io for users who need fewer than 10,000 leads per month. If advanced filtering
            and country-level scraping are not requirements, TheMapScraper is the more
            cost-effective option.
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
            TheMapScraper vs Scrap.io: feature comparison
          </h2>
          <ComparisonTable competitor="Scrap.io" rows={ROWS} />
        </div>
      </section>

      {/* Why use a free Scrap.io alternative? */}
      <section className="bg-cream px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          <h2 className={h2Class} style={h2Style}>
            Why use a free Scrap.io alternative?
          </h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed">
            Scrap.io is an excellent tool for power users who need granular filtering, but its
            minimum plan is €49/month — significant if you only need occasional lead lists.
            TheMapScraper lets you start for free (25 leads/month, no credit card) and upgrade only
            if your volume grows. For sales reps, small agencies, or anyone running ad-hoc searches,{' '}
            <Link to="/" className="text-brand font-medium hover:underline">
              TheMapScraper
            </Link>{' '}
            extracts the same core data — name, phone, email, address, website — without the
            recurring cost.
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
            Common questions about TheMapScraper vs Scrap.io.
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
