import { Link } from 'react-router-dom'
import LandingMeta from '../../components/landing/LandingMeta'
import LandingHero from '../../components/landing/LandingHero'
import LandingFAQ from '../../components/landing/LandingFAQ'
import LandingCTA from '../../components/landing/LandingCTA'
import DataFieldsTable from '../../components/landing/DataFieldsTable'
import BreadcrumbSchema from '../../components/BreadcrumbSchema'

const VALUE_PROPS = [
  {
    title: 'Find Businesses That Need You',
    desc: 'Search for businesses in any niche and location. Filter by low ratings or missing websites to find businesses that clearly need marketing help.',
  },
  {
    title: 'Build Niche Client Lists',
    desc: 'Specialize in restaurants? Dentists? HVAC companies? Search any Google Maps category in any city and build a targeted prospect list in minutes.',
  },
  {
    title: 'Scale Your Outreach',
    desc: 'Stop manually searching Google Maps one business at a time. Extract hundreds of prospects at once and focus your time on closing deals instead of finding leads.',
  },
]

const EXAMPLE_SEARCHES = [
  { query: 'Restaurants in [city]', note: 'Find restaurants that need social media management' },
  { query: 'Dentists in [city]', note: 'Dental marketing is a high-value niche' },
  { query: 'Plumbers in [city]', note: 'Home service businesses often need SEO and ads' },
  { query: 'Gyms in [city]', note: 'Fitness businesses need constant lead generation' },
  { query: 'Lawyers in [city]', note: 'Legal marketing is a premium service' },
  { query: 'Auto repair shops in [city]', note: 'Local businesses with high LTV for marketing services' },
]

const STEPS = [
  {
    n: '01',
    title: 'Pick a niche and location',
    desc: 'Choose an industry you serve (or want to serve) and a geographic area. Be specific: "dentists in Phoenix" not "businesses in Arizona".',
  },
  {
    n: '02',
    title: 'Extract and filter leads',
    desc: 'Download the CSV and sort by Google rating. Businesses with 3-4 stars and fewer than 50 reviews are often the best agency clients: successful enough to afford marketing but not yet dominant in their market.',
  },
  {
    n: '03',
    title: 'Research before outreach',
    desc: 'Visit their website (if they have one). Check their Google reviews. Find one specific thing you could improve. This becomes your personalized pitch.',
  },
  {
    n: '04',
    title: 'Personalized outreach',
    desc: 'Send a brief email or call mentioning their business by name, their Google rating, and one concrete suggestion. Avoid generic "we do marketing" pitches.',
  },
]

const TIPS = [
  {
    title: 'Lead with their Google rating',
    desc: 'Open your email with "I noticed [Business Name] has a 3.8 rating on Google Maps." This shows you did your homework and immediately highlights a problem you can solve.',
  },
  {
    title: 'Offer a free audit',
    desc: 'A quick website or SEO audit gives value upfront and positions you as an expert. Use the data from TheMapScraper to personalize it.',
  },
  {
    title: 'Target businesses without websites',
    desc: 'Search for businesses on Google Maps that have a phone number but no website. These are warm leads for web design and basic digital marketing services.',
  },
  {
    title: 'Batch your outreach by niche',
    desc: 'Extract 100 dentists, write one great email template for dentists, personalize the business name and rating, and send. Repeat for the next niche.',
  },
]

const FAQS = [
  {
    question: 'How do I find businesses that need marketing?',
    answer:
      'Search for any business category on Google Maps. Look for businesses with low ratings (3-4 stars), few reviews, or no website listed. These are businesses that could benefit from marketing services.',
  },
  {
    question: 'Can I find businesses without websites?',
    answer:
      'TheMapScraper extracts the website field for each listing. If a business does not have a website on their Google profile, that field will be empty in your CSV. Filter for empty website fields to find businesses that need web design.',
  },
  {
    question: 'How many leads can I get per city?',
    answer:
      'It depends on the city and business category. A search for "restaurants in Los Angeles" could return hundreds of results. The free tier includes 50 leads per month.',
  },
  {
    question: 'What is the best way to approach local businesses?',
    answer:
      'Personalized outreach works best. Reference their business name, location, and a specific observation (like their Google rating or lack of website). Generic mass emails have very low response rates.',
  },
]

export default function MarketingAgenciesUseCase() {
  return (
    <>
      <LandingMeta
        title="Google Maps Scraper for Marketing Agencies. Find Clients"
        description="Use TheMapScraper to find local businesses that need marketing services. Extract contacts from Google Maps, identify businesses without websites, and build client lists."
        path="/use-cases/marketing-agencies/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://themapscraper.com/' },
          { name: 'Use Cases', url: 'https://themapscraper.com/use-cases/' },
          { name: 'Marketing Agencies', url: 'https://themapscraper.com/use-cases/marketing-agencies/' },
        ]}
      />

      <LandingHero
        badge="50 free leads/month"
        h1="Google Maps Scraper for Marketing Agencies"
        subtitle="Find local businesses that need your services. Extract contact details from Google Maps and build targeted client prospect lists."
        ctaText="Find Agency Clients"
      />

      {/* Why */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Why Marketing Agencies Use Google Maps Data
          </h2>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {VALUE_PROPS.map((vp) => (
              <div key={vp.title} className="bg-cream border border-border-subtle rounded-[10px] p-7 flex flex-col gap-4">
                <h3 className="font-display font-bold text-[18px] leading-[1.25] tracking-[-0.02em] text-ink m-0">
                  {vp.title}
                </h3>
                <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example searches */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Example Searches for Agencies
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {EXAMPLE_SEARCHES.map((s) => (
              <div
                key={s.query}
                className="bg-white border border-border-subtle rounded-[10px] px-5 py-4 flex flex-col gap-1"
              >
                <span className="font-sans text-sm font-semibold text-ink">{s.query}</span>
                <span className="font-sans text-xs text-ink-muted">{s.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-12 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Agency Prospecting Strategy with Google Maps
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {STEPS.map((step) => (
              <div key={step.n} className="bg-cream border border-border-subtle rounded-[10px] p-7 flex flex-col gap-4">
                <span className="font-mono text-[11px] font-normal text-brand tracking-[0.08em]">{step.n}</span>
                <h3 className="font-display font-bold text-[18px] leading-[1.25] tracking-[-0.02em] text-ink m-0">
                  {step.title}
                </h3>
                <p className="font-sans text-sm font-normal leading-relaxed text-ink-muted m-0">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data fields */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-8"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            What Data You Get for Each Business
          </h2>
          <DataFieldsTable />
        </div>
      </section>

      {/* Outreach tips */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10 text-center"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Tips for Agency Client Outreach
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {TIPS.map((tip) => (
              <div key={tip.title} className="bg-cream border border-border-subtle rounded-[10px] p-6 flex flex-col gap-3">
                <h3 className="font-display font-bold text-[17px] tracking-[-0.02em] text-ink m-0">{tip.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-ink-muted m-0">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-20 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-ink m-0 mb-10"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
          >
            Frequently Asked Questions
          </h2>
          <LandingFAQ faqs={FAQS} />
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-white py-10 px-6 border-t border-border-subtle">
        <div className="max-w-[720px] mx-auto">
          <p className="font-sans text-xs font-semibold text-ink-faint uppercase tracking-[0.06em] m-0 mb-3">Related</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link to="/use-cases/" className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
              All Use Cases →
            </Link>
            <Link to="/use-cases/real-estate/" className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
              Real Estate Agents →
            </Link>
            <Link to="/google-maps-lead-extractor/" className="font-sans text-sm font-semibold text-brand no-underline hover:underline">
              Google Maps Lead Extractor →
            </Link>
          </div>
        </div>
      </section>

      <LandingCTA
        headline="Build your agency client list"
        ctaText="Get 50 Free Leads"
        subtext="No credit card required"
      />
    </>
  )
}
