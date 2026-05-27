import { Link } from 'react-router-dom'
import LandingMeta from '../components/landing/LandingMeta'
import LandingCTA from '../components/landing/LandingCTA'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const USE_CASES = [
  {
    emoji: '🏠',
    title: 'Real Estate Agents',
    desc: 'Find property managers, investors, and brokerages in any area. Build prospect lists for partnerships and referral networks.',
    to: '/use-cases/real-estate/',
  },
  {
    emoji: '📣',
    title: 'Marketing Agencies',
    desc: 'Discover local businesses that need digital marketing services. Target businesses without websites, with low ratings, or in specific niches.',
    to: '/use-cases/marketing-agencies/',
  },
  {
    emoji: '💼',
    title: 'Sales Teams',
    desc: 'Build B2B prospect lists by industry and location. Get direct phone numbers and emails for cold outreach campaigns.',
    to: null,
  },
  {
    emoji: '🔍',
    title: 'Recruiters',
    desc: 'Find companies in specific industries and locations. Source contact data for talent placement and staffing outreach.',
    to: null,
  },
  {
    emoji: '📊',
    title: 'Market Researchers',
    desc: 'Analyze business density, ratings, and competition levels across cities and industries.',
    to: null,
  },
  {
    emoji: '🔗',
    title: 'Local SEO Agencies',
    desc: 'Audit local competitors, find businesses with unclaimed profiles, and identify link building opportunities.',
    to: null,
  },
]

export default function UseCases() {
  return (
    <>
      <LandingMeta
        title="Google Maps Scraper Use Cases. Who Uses TheMapScraper"
        description="Discover how sales teams, marketing agencies, real estate agents, and recruiters use TheMapScraper to generate leads from Google Maps."
        path="/use-cases/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://themapscraper.com/' },
          { name: 'Use Cases', url: 'https://themapscraper.com/use-cases/' },
        ]}
      />

      {/* Hero */}
      <section className="bg-cream px-6 pt-24 pb-16">
        <div className="max-w-[800px] mx-auto text-center">
          <h1
            className="font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-ink mb-5"
            style={{ fontSize: 'clamp(30px, 5vw, 58px)' }}
          >
            Who Uses TheMapScraper
          </h1>
          <p className="font-sans text-lg font-normal leading-relaxed text-ink-muted max-w-[560px] mx-auto m-0">
            From sales teams to real estate agents, see how businesses use Google Maps data to find and close new clients.
          </p>
        </div>
      </section>

      {/* Use case cards */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-10 text-center"
            style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}
          >
            Use Cases by Industry
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((uc) => {
              const inner = (
                <div
                  className={`bg-cream border border-border-subtle rounded-[12px] p-6 flex flex-col gap-3 h-full${uc.to ? ' transition-shadow duration-150 hover:shadow-md' : ''}`}
                >
                  <span className="text-3xl" aria-hidden="true">{uc.emoji}</span>
                  <h3 className="font-display font-bold text-[18px] tracking-[-0.02em] text-ink m-0">
                    {uc.title}
                  </h3>
                  <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0 flex-1">
                    {uc.desc}
                  </p>
                  {uc.to && (
                    <span className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-brand mt-1">
                      See how <span aria-hidden="true">→</span>
                    </span>
                  )}
                </div>
              )

              return uc.to ? (
                <Link key={uc.title} to={uc.to} className="no-underline flex">
                  {inner}
                </Link>
              ) : (
                <div key={uc.title} className="flex">
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <LandingCTA
        headline="Start extracting leads for your industry"
        ctaText="Get 50 Free Leads"
        subtext="No credit card required"
      />
    </>
  )
}
