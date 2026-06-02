import LandingMeta from '../components/landing/LandingMeta'
import LandingCTA from '../components/landing/LandingCTA'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const COMMITMENTS = [
  {
    title: 'Transparency',
    body: 'We show you exactly what data you will get before you spend a single credit. The preview on the homepage is live — real results from a real search, not curated demo data.',
  },
  {
    title: 'Privacy',
    body: "We only extract publicly available business information. No private data, no login bypass, no scraping of personal profiles. The same information anyone sees when they search Google Maps manually.",
  },
  {
    title: 'Simplicity',
    body: 'If you can type a search query, you can use TheMapScraper. No API keys to generate, no browser extension to install, no Python environment to set up. Open the site, type your search, download your leads.',
  },
]

export default function About() {
  return (
    <>
      <LandingMeta
        title="About TheMapScraper | Built for Sales Teams and Agencies"
        description="TheMapScraper was built to make Google Maps lead generation simple. No code, no extensions, no API keys. Learn about our mission and how the tool works."
        path="/about/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.themapscraper.com/' },
          { name: 'About', url: 'https://www.themapscraper.com/about/' },
        ]}
      />

      {/* Hero */}
      <section className="bg-cream px-6 pt-24 pb-16">
        <div className="max-w-[720px] mx-auto">
          <h1
            className="font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-ink m-0 mb-5"
            style={{ fontSize: 'clamp(38px, 5.5vw, 64px)' }}
          >
            About TheMapScraper
          </h1>
          <p className="font-sans text-lg font-normal leading-relaxed text-ink-muted m-0 max-w-[560px]">
            A Google Maps scraper built for people who generate leads for a living — not for developers.
          </p>
        </div>
      </section>

      {/* Section 1 — Why We Built This */}
      <section className="bg-white px-6 py-16 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="font-display font-bold leading-[1.15] tracking-[-0.025em] text-ink m-0 mb-6"
            style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}
          >
            Why We Built This
          </h2>
          <div className="flex flex-col gap-4 font-sans text-base font-normal leading-[1.75] text-ink-muted">
            <p className="m-0">
              We were tired of the complexity of existing Google Maps scrapers. Every tool we tried asked for something before you could extract a single lead: create an API key, install a Chrome extension, write a Python script, sign up for a developer account, or navigate a platform built for engineers.
            </p>
            <p className="m-0">
              Sales reps, marketing agencies, recruiters, and small business owners do not want to learn a new platform. They want a list of businesses with phone numbers, emails, and addresses — fast. That is the entire problem we set out to solve.
            </p>
            <p className="m-0">
              TheMapScraper does one thing: it turns a Google Maps search into a downloadable CSV. You type a business type and a location. We return the leads. No extensions, no API keys, no coding required. We built the complexity into the backend so you do not have to deal with it.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — How It Works Under the Hood */}
      <section className="bg-cream px-6 py-16 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="font-display font-bold leading-[1.15] tracking-[-0.025em] text-ink m-0 mb-6"
            style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}
          >
            How It Works (Under the Hood)
          </h2>
          <div className="flex flex-col gap-4 font-sans text-base font-normal leading-[1.75] text-ink-muted mb-8">
            <p className="m-0">
              Most Google Maps scrapers hit the same limitation: Google only shows around 120 results per search viewport. We solve this with geolocation splitting — instead of running a single search over an entire city, we divide the target area into a grid of smaller zones and run parallel searches across each one. This lets us cover entire cities and regions without missing listings near the edges.
            </p>
            <p className="m-0">
              For each listing we find, we extract every publicly available field: business name, phone number, physical address, website URL, Google rating, review count, business category, opening hours, GPS coordinates, and the Google Maps URL for the listing itself.
            </p>
            <p className="m-0">
              Email enrichment is a separate step. When you request emails, TheMapScraper visits each business website and looks for contact information — email addresses published in footers, contact pages, or structured data. Around 30 to 60 percent of listings return an email this way, depending on industry and region.
            </p>
            <p className="m-0">
              Everything runs server-side. Your browser does not have to stay open, no extension is reading your screen, and results are compiled into a clean CSV ready to import into any CRM or spreadsheet.
            </p>
          </div>

          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {[
              { label: 'Geolocation splitting', desc: 'Full city coverage, no gaps' },
              { label: 'Server-side extraction', desc: 'No browser extension needed' },
              { label: 'Email enrichment', desc: 'Visits business websites automatically' },
              { label: 'Clean CSV output', desc: 'Ready for any CRM or spreadsheet' },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-border-subtle rounded-[8px] px-4 py-3">
                <p className="font-sans text-[13px] font-semibold text-ink m-0 mb-[2px]">{item.label}</p>
                <p className="font-sans text-xs text-ink-faint m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Our Commitment */}
      <section className="bg-white px-6 py-16 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="font-display font-bold leading-[1.15] tracking-[-0.025em] text-ink m-0 mb-3"
            style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}
          >
            Our Commitment
          </h2>
          <p className="font-sans text-base font-normal leading-relaxed text-ink-faint m-0 mb-8">
            Three things we will not compromise on, regardless of how the product grows.
          </p>

          <div className="flex flex-col gap-5">
            {COMMITMENTS.map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <span className="shrink-0 mt-[3px] w-5 h-5 rounded-full bg-[rgba(234,40,4,0.10)] flex items-center justify-center">
                  <span className="w-[6px] h-[6px] rounded-full bg-brand inline-block" />
                </span>
                <div>
                  <p className="font-sans text-base font-semibold text-ink m-0 mb-1">{item.title}</p>
                  <p className="font-sans text-[15px] font-normal leading-[1.7] text-ink-muted m-0">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <LandingCTA
        headline="Ready to try it?"
        ctaText="Start Free"
        subtext="50 free leads per month · No credit card required"
      />
    </>
  )
}
