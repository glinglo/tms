import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import LandingMeta from '../components/landing/LandingMeta'
import LandingHero from '../components/landing/LandingHero'
import LandingFAQ from '../components/landing/LandingFAQ'
import LandingCTA from '../components/landing/LandingCTA'
import DataFieldsTable from '../components/landing/DataFieldsTable'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const STEPS = [
  {
    n: '01',
    title: 'Search any business type and location',
    desc: 'Type a query like "dentists in Miami" or "plumbers in Chicago". TheMapScraper hits Google Maps directly.',
  },
  {
    n: '02',
    title: 'We visit each business website',
    desc: 'For every listing found, we visit the business website to extract published contact emails — no database, no stale data.',
  },
  {
    n: '03',
    title: 'Download your clean CSV',
    desc: 'Get a ready-to-import file with names, emails, phones, addresses, and ratings. Open in Excel or import directly into your CRM.',
  },
]

const COMPARISON_ROWS = [
  { feature: 'Freshness',       bought: 'Months or years old',                       tms: 'Scraped in real-time' },
  { feature: 'Email accuracy',  bought: '60–70% valid at best',                       tms: 'Extracted live from business websites' },
  { feature: 'Exclusivity',     bought: 'Shared with your competitors',               tms: 'Only you have your list' },
  { feature: 'Filtering',       bought: 'Limited (industry, region)',                 tms: 'Any business type, any city, worldwide' },
  { feature: 'Cost',            bought: '$200–$500 for 10,000 leads',                 tms: '€9 for 500 leads, €29 for 2,000' },
  { feature: 'Format',          bought: 'Varies — often requires cleanup',            tms: 'Clean CSV, ready to import' },
]

const FAQS = [
  {
    question: 'Is this better than buying leads from Apollo or ZoomInfo?',
    answer:
      'For local businesses, yes. Apollo and ZoomInfo focus on B2B SaaS companies, startups, and enterprise contacts. TheMapScraper targets local businesses listed on Google Maps — restaurants, dentists, lawyers, plumbers, agencies. Different data source, different use case. If you sell to local SMBs, Google Maps data is more relevant and significantly cheaper.',
  },
  {
    question: 'How fresh is the data?',
    answer:
      'Data is scraped in real-time when you run a search. You always get the latest information from Google Maps — whatever businesses have on their profile at that moment. There is no cached database sitting between you and the source.',
  },
  {
    question: 'Do the leads include email addresses?',
    answer:
      'Yes. TheMapScraper visits each business website to extract published email addresses. Email rates vary by industry: 50–70% for lawyers and dentists, 30–50% for plumbers and contractors, 5–20% for restaurants. You also get phone numbers, addresses, and websites for every listing regardless of email availability.',
  },
  {
    question: 'Can I import the leads into my CRM or cold email tool?',
    answer:
      'Yes. Leads are exported as standard CSV files. Import directly into HubSpot, Salesforce, Pipedrive, Instantly, Lemlist, or any tool that accepts CSV. No reformatting needed.',
  },
]

export default function BuyLocalBusinessLeads() {
  const { user, openSignUp } = useAuthContext()
  const navigate = useNavigate()

  function handleCta() {
    if (user) navigate('/dashboard')
    else openSignUp()
  }

  return (
    <>
      <LandingMeta
        title="Buy Local Business Leads with Emails | Fresh Google Maps Data"
        description="Stop buying stale lead lists. Scrape fresh local business leads from Google Maps with emails, phones, and addresses. Build your own list in minutes. 25 free leads."
        path="/buy-local-business-leads/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.themapscraper.com/' },
          { name: 'Buy Local Business Leads', url: 'https://www.themapscraper.com/buy-local-business-leads/' },
        ]}
      />

      {/* Hero */}
      <LandingHero
        badge="Real-time Google Maps data"
        h1="Stop Buying Stale Lead Lists"
        subtitle="Lead databases go stale fast. 30% of business data changes every year. Instead of buying outdated lists, scrape fresh leads directly from Google Maps — with emails, phone numbers, and addresses."
        ctaText="Build Your Lead List Free"
      />

      {/* The Problem */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-6"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            The Problem with Buying Lead Lists
          </h2>
          <div className="font-sans text-base font-normal leading-[1.75] text-ink-muted flex flex-col gap-4">
            <p className="m-0">
              Buying a lead list feels like a shortcut. You pay $200–$500 for 10,000 "verified" local business contacts and expect to start outreach immediately. In practice, the results are usually disappointing.
            </p>
            <p className="m-0">
              <strong className="text-ink">The data is old.</strong> Most lead databases are compiled months or years before you buy them. Business data changes constantly — owners retire, phone numbers change, offices relocate. Industry research puts data decay at 30–40% per year. That $500 list could have 3,000–4,000 invalid contacts on day one.
            </p>
            <p className="m-0">
              <strong className="text-ink">Everyone has the same list.</strong> When you buy from a data vendor, so do your competitors. The businesses on that list have already received dozens of nearly identical cold emails from people who bought the same database. Response rates crater.
            </p>
            <p className="m-0">
              <strong className="text-ink">The filtering is limited.</strong> You cannot filter for "plumbers in Phoenix with under 50 reviews" or "law firms in Brooklyn that opened in the last year." You get a broad segment and have to clean it yourself.
            </p>
            <p className="m-0">
              <strong className="text-ink">Emails bounce.</strong> Bought lists routinely deliver 30–40% bounce rates on the first campaign. That damages your sender reputation and can get your domain blacklisted.
            </p>
          </div>
        </div>
      </section>

      {/* A Better Approach */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-6"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            A Better Approach: Scrape Your Own Leads
          </h2>
          <div className="font-sans text-base font-normal leading-[1.75] text-ink-muted flex flex-col gap-4">
            <p className="m-0">
              TheMapScraper pulls business data directly from Google Maps when you run a search. The data is not sitting in a database — it is fetched in real-time from the source that businesses themselves maintain.
            </p>
            <p className="m-0">
              <strong className="text-ink">You control the targeting.</strong> Type "dentists in Chicago" or "marketing agencies in Austin" and you get exactly those businesses. Not a segment of a pre-built list — the exact result set for your query, pulled fresh.
            </p>
            <p className="m-0">
              <strong className="text-ink">Emails come from business websites, not old databases.</strong> For each listing found on Google Maps, TheMapScraper visits the business website and looks for published contact emails. These are live addresses that businesses have chosen to display publicly — not addresses harvested years ago and resold.
            </p>
            <p className="m-0">
              <strong className="text-ink">Only you have your list.</strong> No one else ran the same search at the same time for the same niche. That exclusivity gives your outreach a real advantage — you are reaching businesses before they have been saturated by competitors using the same dataset.
            </p>
            <p className="m-0">
              The output is a clean CSV with names, emails, phone numbers, addresses, ratings, and websites — ready to import directly into HubSpot, Salesforce, Pipedrive, Instantly, or Lemlist without any cleanup.
            </p>
          </div>
        </div>
      </section>

      {/* Data Fields */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            What You Get for Each Lead
          </h2>
          <p className="font-sans text-base text-ink-faint m-0 mb-8">
            Every field exported to CSV, ready for your CRM or outreach tool.
          </p>
          <DataFieldsTable />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-12 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            How It Works
          </h2>
          <div className="grid gap-6 mb-12" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="bg-white border border-border-subtle rounded-[10px] p-7 flex flex-col gap-4"
              >
                <span className="font-mono text-[11px] font-normal text-brand tracking-[0.08em]">{step.n}</span>
                <h3 className="font-display font-bold text-[18px] leading-[1.25] tracking-[-0.02em] text-ink m-0">
                  {step.title}
                </h3>
                <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={handleCta}
              className="inline-flex items-center gap-2 bg-brand text-white font-sans text-[15px] font-semibold px-8 py-4 rounded-pill border-none cursor-pointer transition-colors duration-150 hover:bg-brand-dark"
            >
              Build your first lead list <span aria-hidden="true">→</span>
            </button>
            <p className="font-sans text-sm text-ink-faint mt-3 m-0">25 free leads included — no credit card required</p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Fresh Data vs Bought Lists
          </h2>
          <div className="overflow-x-auto rounded-[10px] border border-border-subtle">
            <table className="w-full border-collapse" style={{ minWidth: '520px' }}>
              <thead>
                <tr className="bg-cream-dark">
                  <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">
                  </th>
                  <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">
                    Bought Lead Lists
                  </th>
                  <th className="font-sans text-[11px] font-semibold text-brand uppercase tracking-[0.05em] text-left py-[10px] px-5 bg-[rgba(234,40,4,0.04)]">
                    TheMapScraper
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} className={`border-t border-[rgba(32,32,32,0.07)] ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}>
                    <td className="py-3 px-5 font-sans text-sm font-semibold text-ink">{row.feature}</td>
                    <td className="py-3 px-5 font-sans text-sm text-ink-muted">{row.bought}</td>
                    <td className="py-3 px-5 font-sans text-sm text-ink font-medium bg-[rgba(234,40,4,0.03)]">{row.tms}</td>
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
            Common questions about building your own local business lead list.
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
              { label: 'Google Maps Lead Generation Guide', to: '/blog/google-maps-lead-generation-guide/' },
              { label: 'Google Maps Lead Extractor',        to: '/google-maps-lead-extractor/' },
              { label: 'Dentist Leads',                     to: '/scrape/dentist-leads/' },
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
        headline="Build your local business lead list"
        ctaText="Start Free"
        subtext="25 free leads included · No credit card required"
      />
    </>
  )
}
