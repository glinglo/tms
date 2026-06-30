import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import LandingMeta from '../components/landing/LandingMeta'
import LandingHero from '../components/landing/LandingHero'
import LandingFAQ from '../components/landing/LandingFAQ'
import LandingCTA from '../components/landing/LandingCTA'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const WORKFLOW_STEPS = [
  {
    n: '01',
    title: 'Define your ICP',
    desc: 'Pick a business type and location that matches your ideal customer. "Dentists in Houston", "marketing agencies in London", "plumbers in Phoenix" — the more specific, the better your open rates.',
  },
  {
    n: '02',
    title: 'Scrape leads from Google Maps',
    desc: 'Run your search in TheMapScraper. Get business names, emails, phone numbers, websites, ratings, and addresses — all pulled live from Google Maps.',
  },
  {
    n: '03',
    title: 'Filter your CSV',
    desc: 'Open the CSV in Excel or Google Sheets. Remove rows without an email. Sort by rating or review count to prioritize higher-quality prospects.',
  },
  {
    n: '04',
    title: 'Import into your cold email tool',
    desc: 'Upload the cleaned CSV to Instantly, Lemlist, Smartlead, or Woodpecker. Map the columns to your campaign fields — takes under a minute.',
  },
  {
    n: '05',
    title: 'Personalize using the data',
    desc: 'Use the city, business name, and rating in your copy. "Saw your 4.7 rating on Google — wanted to reach out about X" outperforms any generic opener.',
  },
]

const COLD_EMAIL_FIELDS = [
  { field: 'Business name',    usage: 'Personalize subject line: "Quick question for {name}"' },
  { field: 'Email',            usage: 'Primary contact channel' },
  { field: 'Phone',            usage: 'Follow-up channel for high-value prospects' },
  { field: 'Rating + Reviews', usage: 'Personalize: "Saw your 4.8 rating on Google — impressive"' },
  { field: 'Website',          usage: 'Research before emailing' },
  { field: 'Address / City',   usage: 'Geo-personalize: "Fellow {city} business here"' },
]

const TOOLS = [
  'Instantly',
  'Lemlist',
  'Smartlead',
  'Woodpecker',
  'Mailshake',
  'Apollo (CSV import)',
  'HubSpot',
  'Salesforce',
]

const EMAIL_RATES = [
  { industry: 'Dentists',      rate: '~50%', bestFor: 'Dental marketing agencies, suppliers' },
  { industry: 'Lawyers',       rate: '~54%', bestFor: 'Legal tech, marketing services' },
  { industry: 'Plumbers',      rate: '~36%', bestFor: 'Home service marketing' },
  { industry: 'Real Estate',   rate: '~42%', bestFor: 'PropTech, mortgage brokers' },
  { industry: 'Restaurants',   rate: '~5%',  bestFor: 'Food delivery, POS systems' },
]

const FAQS = [
  {
    question: 'How many leads can I get for cold email?',
    answer:
      'The free tier gives you 25 leads to test. The Starter plan (€9) gives you 500 leads — enough for a solid cold email campaign targeting one city and niche.',
  },
  {
    question: 'Are the emails verified?',
    answer:
      'Emails are extracted directly from business websites, so they are real published addresses. We recommend using an email verification tool like ZeroBounce or NeverBounce before sending your campaign.',
  },
  {
    question: 'Can I scrape leads from multiple cities?',
    answer:
      'Yes, run separate searches for each city and combine the CSVs. For example, scrape dentists in Miami, Houston, and Chicago to build a nationwide list.',
  },
  {
    question: "What's the best cold email volume from Google Maps leads?",
    answer:
      "Start with 50–100 leads per campaign. Google Maps leads convert well because they're real businesses with verified contact info. Quality over quantity.",
  },
]

export default function ColdEmailLeadListBuilder() {
  const { user, openSignUp } = useAuthContext()
  const navigate = useNavigate()

  function handleCta() {
    if (user) navigate('/dashboard')
    else openSignUp()
  }

  return (
    <>
      <LandingMeta
        title="Cold Email Lead List Builder | Extract Emails from Google Maps"
        description="Build targeted cold email lead lists from Google Maps. Extract verified business emails, phones, and addresses by industry and city. 25 free leads to start."
        path="/cold-email-lead-list-builder/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.themapscraper.com/' },
          { name: 'Cold Email Lead List Builder', url: 'https://www.themapscraper.com/cold-email-lead-list-builder/' },
        ]}
      />

      {/* Hero */}
      <LandingHero
        badge="Emails extracted from live business websites"
        h1="Build Cold Email Lead Lists in Minutes"
        subtitle="Search any business type in any city. Get a CSV with emails, phone numbers, and addresses ready to import into Instantly, Lemlist, or any cold email tool."
        ctaText="Build Your First List Free"
      />

      {/* The Cold Email Lead Gen Workflow */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-6"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            The Cold Email Lead Gen Workflow
          </h2>
          <div className="font-sans text-base font-normal leading-[1.75] text-ink-muted flex flex-col gap-4 mb-10">
            <p className="m-0">
              Most cold email campaigns fail before the first send. The list is the problem — bought databases are stale, shared, and full of dead emails. Building your own list from a live source like Google Maps changes the math entirely.
            </p>
            <p className="m-0">
              Here is the exact workflow that works for local business outreach.
            </p>
          </div>
          <div className="flex flex-col gap-5 mb-10">
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.n}
                className="flex gap-5 bg-cream border border-border-subtle rounded-[10px] p-6"
              >
                <span className="font-mono text-[11px] font-normal text-brand tracking-[0.08em] shrink-0 mt-[2px]">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-display font-bold text-[17px] leading-[1.25] tracking-[-0.02em] text-ink m-0 mb-1">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={handleCta}
              className="inline-flex items-center gap-2 bg-brand text-white font-sans text-[15px] font-semibold px-8 py-4 rounded-pill border-none cursor-pointer transition-colors duration-150 hover:bg-brand-dark"
            >
              Start building your list <span aria-hidden="true">→</span>
            </button>
            <p className="font-sans text-sm text-ink-faint mt-3 m-0">25 free leads — no credit card required</p>
          </div>
        </div>
      </section>

      {/* Why Google Maps */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-6"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Why Google Maps Is the Best Source for Local Business Leads
          </h2>
          <div className="font-sans text-base font-normal leading-[1.75] text-ink-muted flex flex-col gap-4">
            <p className="m-0">
              Google Maps is the most complete database of local businesses ever assembled — over 250 million listings worldwide, maintained in real-time by the businesses themselves. If a company is active and local, it is almost certainly on Google Maps.
            </p>
            <p className="m-0">
              <strong className="text-ink">It includes businesses that don't appear on LinkedIn or Apollo.</strong> Those platforms index knowledge workers and tech companies. A plumbing business in Austin, a dental clinic in Miami, or a law firm in Manchester — these are Google Maps businesses, not LinkedIn companies. For local SMB outreach, Google Maps is the only source that matters.
            </p>
            <p className="m-0">
              <strong className="text-ink">The data is real-time.</strong> If a business appears on Google Maps, it is active. Google removes or downgrades listings for closed businesses quickly. You won't email a company that shut down two years ago.
            </p>
            <p className="m-0">
              <strong className="text-ink">Reviews and ratings let you qualify before reaching out.</strong> Filter for 4+ star businesses if you want clients who are already succeeding and ready to invest in growth. Target low-rated businesses if you sell reputation management or review generation services. No other lead source gives you this kind of signal before first contact.
            </p>
          </div>
        </div>
      </section>

      {/* What Data You Get for Cold Email */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            What Data You Get for Cold Email
          </h2>
          <p className="font-sans text-base text-ink-faint m-0 mb-8">
            Every field and how to use it in your outreach copy.
          </p>
          <div className="overflow-x-auto rounded-[10px] border border-border-subtle">
            <table className="w-full border-collapse" style={{ minWidth: '480px' }}>
              <thead>
                <tr className="bg-cream-dark">
                  <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">
                    Field
                  </th>
                  <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">
                    How to use in cold email
                  </th>
                </tr>
              </thead>
              <tbody>
                {COLD_EMAIL_FIELDS.map((row, i) => (
                  <tr
                    key={row.field}
                    className={`border-t border-[rgba(32,32,32,0.07)] ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}
                  >
                    <td className="py-3 px-5 font-sans text-sm font-semibold text-ink whitespace-nowrap">{row.field}</td>
                    <td className="py-3 px-5 font-sans text-sm text-ink-muted">{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Works With Your Favorite Cold Email Tools */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-6"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Works With Your Favorite Cold Email Tools
          </h2>
          <p className="font-sans text-base font-normal leading-[1.75] text-ink-muted m-0 mb-8">
            Export as CSV and import into any of these tools in seconds.
          </p>
          <div className="grid gap-3 mb-10" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
            {TOOLS.map((tool) => (
              <div
                key={tool}
                className="bg-white border border-border-subtle rounded-[8px] px-4 py-3 font-sans text-sm font-semibold text-ink"
              >
                {tool}
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={handleCta}
              className="inline-flex items-center gap-2 bg-brand text-white font-sans text-[15px] font-semibold px-8 py-4 rounded-pill border-none cursor-pointer transition-colors duration-150 hover:bg-brand-dark"
            >
              Build your cold email list <span aria-hidden="true">→</span>
            </button>
            <p className="font-sans text-sm text-ink-faint mt-3 m-0">25 free leads included — no credit card required</p>
          </div>
        </div>
      </section>

      {/* Email Enrichment Rates by Industry */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Email Enrichment Rates by Industry
          </h2>
          <p className="font-sans text-base text-ink-faint m-0 mb-8">
            These rates are based on real scrapes. TheMapScraper visits each business website to find published email addresses.
          </p>
          <div className="overflow-x-auto rounded-[10px] border border-border-subtle mb-6">
            <table className="w-full border-collapse" style={{ minWidth: '480px' }}>
              <thead>
                <tr className="bg-cream-dark">
                  <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">
                    Industry
                  </th>
                  <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">
                    Email rate
                  </th>
                  <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">
                    Best for
                  </th>
                </tr>
              </thead>
              <tbody>
                {EMAIL_RATES.map((row, i) => (
                  <tr
                    key={row.industry}
                    className={`border-t border-[rgba(32,32,32,0.07)] ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}
                  >
                    <td className="py-3 px-5 font-sans text-sm font-semibold text-ink">{row.industry}</td>
                    <td className="py-3 px-5 font-sans text-sm font-medium text-ink">{row.rate}</td>
                    <td className="py-3 px-5 font-sans text-sm text-ink-muted">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            Common questions about building cold email lead lists from Google Maps.
          </p>
          <LandingFAQ faqs={FAQS} />
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-white py-10 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <p className="font-sans text-xs font-semibold text-ink-faint uppercase tracking-[0.06em] m-0 mb-3">Related resources</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: 'Buy Local Business Leads',            to: '/buy-local-business-leads/' },
              { label: 'Google Maps Lead Generation Guide',   to: '/blog/google-maps-lead-generation-guide/' },
              { label: 'Google Maps Lead Extractor',          to: '/google-maps-lead-extractor/' },
              { label: 'Dentist Leads',                       to: '/scrape/dentist-leads/' },
            ].map(({ label, to }) => (
              <Link key={to} to={to} className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <LandingCTA
        headline="Build your cold email lead list"
        ctaText="Start Free"
        subtext="25 free leads included · No credit card required"
      />
    </>
  )
}
