import { Link } from 'react-router-dom'
import LandingMeta from '../components/landing/LandingMeta'
import LandingCTA from '../components/landing/LandingCTA'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const SUMMARY_ROWS = [
  {
    feature: 'Type',
    tms: 'Web app',
    apify: 'Cloud platform',
    outscraper: 'Cloud platform',
    scrapio: 'Web app',
  },
  {
    feature: 'Setup',
    tms: 'Instant, no extension',
    apify: 'Create account, configure actor',
    outscraper: 'Create account, set up task',
    scrapio: 'Create account, select filters',
  },
  {
    feature: 'Pricing model',
    tms: 'Simple subscription',
    apify: 'Pay per result (~$0.50-6/1K)',
    outscraper: 'Pay per result (~$3/1K base)',
    scrapio: 'Subscription (from €49/mo)',
  },
  {
    feature: 'Free tier',
    tms: '50 leads/month, no credit card',
    apify: '$5 credit/month',
    outscraper: '500 records',
    scrapio: '7-day trial, 100 leads',
  },
  {
    feature: 'Extension required',
    tms: 'No',
    apify: 'No',
    outscraper: 'No',
    scrapio: 'No',
  },
  {
    feature: 'Technical skill needed',
    tms: 'None',
    apify: 'Medium',
    outscraper: 'Low',
    scrapio: 'Low',
  },
  {
    feature: 'Email extraction',
    tms: 'When available on listing',
    apify: 'Via enrichment actors',
    outscraper: 'Separate paid add-on (~$3/1K extra)',
    scrapio: 'Included',
  },
  {
    feature: 'CSV export',
    tms: 'Yes',
    apify: 'Yes (JSON default)',
    outscraper: 'Yes',
    scrapio: 'Yes',
  },
  {
    feature: 'Best for',
    tms: 'Non-technical users wanting quick leads',
    apify: 'Developers and automation',
    outscraper: 'Scale scraping with enrichment',
    scrapio: 'Filtered lead lists',
  },
]

const COMPARISON_CARDS = [
  {
    to: '/alternatives/apify/',
    title: 'TheMapScraper vs Apify',
    summary:
      'Apify is a powerful developer platform for automation and scraping. TheMapScraper is a focused, no-code tool for Google Maps leads.',
    tag: 'Developer platform',
  },
  {
    to: '/alternatives/outscraper/',
    title: 'TheMapScraper vs Outscraper',
    summary:
      'Outscraper offers pay-as-you-go scraping with enrichment add-ons. TheMapScraper offers simple subscription pricing with no stacked costs.',
    tag: 'Pay-as-you-go',
  },
  {
    to: '/alternatives/scrap-io/',
    title: 'TheMapScraper vs Scrap.io',
    summary:
      'Scrap.io provides advanced filtering and country-level scraping. TheMapScraper prioritizes instant setup and a lower price point.',
    tag: 'Advanced filtering',
  },
]

export default function Alternatives() {
  return (
    <>
      <LandingMeta
        title="TheMapScraper Alternatives and Comparisons [2026]"
        description="Compare TheMapScraper with Apify, Outscraper, and Scrap.io. Side-by-side features, pricing, and ease of use for Google Maps scraping tools."
        path="/alternatives/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.themapscraper.com/' },
          { name: 'Alternatives', url: 'https://www.themapscraper.com/alternatives/' },
        ]}
      />

      {/* Hero */}
      <section className="bg-cream px-6 pt-24 pb-16">
        <div className="max-w-[800px] mx-auto text-center">
          <h1
            className="font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-ink mb-5"
            style={{ fontSize: 'clamp(30px, 5vw, 58px)' }}
          >
            TheMapScraper vs Other Google Maps Scrapers
          </h1>
          <p className="font-sans text-lg font-normal leading-relaxed text-ink-muted max-w-[560px] mx-auto">
            Honest comparisons to help you pick the right tool for your needs.{' '}
            <Link to="/" className="text-brand font-semibold hover:underline">
              TheMapScraper
            </Link>
            {' '}is the tool being compared — start there if you want to try it free.
          </p>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-10 text-center"
            style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}
          >
            Quick Comparison
          </h2>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-border-subtle">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="font-display font-semibold text-sm text-ink-muted px-5 py-4 bg-[#f3f0e8] w-[20%]">
                    Feature
                  </th>
                  <th className="font-display font-semibold text-sm text-[#1d7a4a] px-5 py-4 bg-[#f0faf4] w-[20%]">
                    TheMapScraper
                  </th>
                  <th className="font-display font-semibold text-sm text-ink-muted px-5 py-4 bg-[#f3f0e8] w-[20%]">
                    Apify
                  </th>
                  <th className="font-display font-semibold text-sm text-ink-muted px-5 py-4 bg-[#f3f0e8] w-[20%]">
                    Outscraper
                  </th>
                  <th className="font-display font-semibold text-sm text-ink-muted px-5 py-4 bg-[#f3f0e8] w-[20%]">
                    Scrap.io
                  </th>
                </tr>
              </thead>
              <tbody>
                {SUMMARY_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-border-subtle last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}
                  >
                    <td className="px-5 py-4 font-sans text-sm font-semibold text-ink align-top">
                      {row.feature}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-ink align-top bg-[#f7fbf8]">
                      {row.tms}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-ink-muted align-top">
                      {row.apify}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-ink-muted align-top">
                      {row.outscraper}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-ink-muted align-top">
                      {row.scrapio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked per competitor */}
          <div className="md:hidden flex flex-col gap-6">
            {(['apify', 'outscraper', 'scrapio'] as const).map((key) => {
              const labels: Record<string, string> = { apify: 'Apify', outscraper: 'Outscraper', scrapio: 'Scrap.io' }
              return (
                <div key={key} className="rounded-xl border border-border-subtle overflow-hidden">
                  <div className="px-4 py-3 bg-[#f3f0e8] border-b border-border-subtle">
                    <span className="font-display font-semibold text-sm text-ink">
                      TheMapScraper vs {labels[key]}
                    </span>
                  </div>
                  {SUMMARY_ROWS.map((row) => (
                    <div
                      key={row.feature}
                      className="grid grid-cols-2 border-b border-border-subtle last:border-0"
                    >
                      <div className="px-4 py-3 bg-[#f7fbf8] border-r border-border-subtle">
                        <p className="font-sans text-[10px] font-semibold text-ink-muted uppercase tracking-wide mb-1">
                          {row.feature}
                        </p>
                        <p className="font-sans text-sm text-ink m-0">{row.tms}</p>
                      </div>
                      <div className="px-4 py-3">
                        <p className="font-sans text-[10px] font-semibold text-ink-muted uppercase tracking-wide mb-1">
                          {labels[key]}
                        </p>
                        <p className="font-sans text-sm text-ink-muted m-0">
                          {row[key as keyof typeof row]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Individual comparison cards */}
      <section className="bg-cream px-6 py-20">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold tracking-[-0.025em] text-ink mb-10 text-center"
            style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}
          >
            Detailed Comparisons
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {COMPARISON_CARDS.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="block bg-white rounded-xl border border-border-subtle p-6 no-underline transition-shadow duration-150 hover:shadow-md"
              >
                <span className="inline-block font-sans text-[11px] font-semibold text-ink-muted uppercase tracking-wide bg-cream px-3 py-1 rounded-full mb-4">
                  {card.tag}
                </span>
                <h3 className="font-display font-bold text-lg text-ink tracking-[-0.02em] mb-3">
                  {card.title}
                </h3>
                <p className="font-sans text-sm text-ink-muted leading-relaxed m-0">
                  {card.summary}
                </p>
                <span className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-brand mt-4">
                  See full comparison <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
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
