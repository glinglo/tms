import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const STEPS = [
  {
    number: '01',
    title: 'Type a business type\nand location',
    description:
      'Enter any business category (dentists, roofers, gyms, lawyers) and a city, state, or country. Be as specific or broad as you like.',
    code: 'business: "Dentists"\nlocation: "Austin, TX"',
  },
  {
    number: '02',
    title: 'Preview real results\nbefore signing up',
    description:
      'See 3 live results instantly: real business names, phone numbers, addresses, and ratings. No fake demo data.',
    code: '✓ Sunrise Dental Group\n✓ Austin Family Dentistry\n✓ Capitol Smiles\n  + 244 more...',
  },
  {
    number: '03',
    title: 'Download your CSV\nwith one click',
    description:
      'Unlock all results with credits. Your CSV arrives immediately with phone, address, email, website, and more. Ready to open in Excel.',
    code: 'name,phone,address,website\n"Sunrise Dental",+1 512...\n"Austin Family",+1 512...',
  },
]

export default function HowItWorks() {
  const { user, openSignUp } = useAuthContext()
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (user) {
      navigate('/pricing')
    } else {
      openSignUp()
    }
  }

  return (
    <section id="how-it-works" className="bg-ink py-24 px-6">
      <div className="max-w-[1080px] mx-auto">
        <div className="mb-16">
          <h2
            className="font-display font-bold leading-none tracking-[-0.025em] text-[#fcfcfc] m-0 mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            How It Works
          </h2>
          <p className="font-sans text-lg font-normal leading-[1.56] text-[rgba(252,252,252,0.6)] m-0 max-w-[480px]">
            Three steps from search to spreadsheet. No technical skills required.
          </p>
        </div>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-[#2a2a2a] border border-[rgba(255,255,255,0.1)] rounded-[10px] p-7 flex flex-col gap-5"
            >
              <span className="font-mono text-[11px] font-normal text-brand tracking-[0.08em]">
                {step.number}
              </span>

              <h3
                className="font-display font-bold leading-[1.2] tracking-[-0.02em] text-[#fcfcfc] m-0 whitespace-pre-line"
                style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
              >
                {step.title}
              </h3>

              <p className="font-sans text-sm font-normal leading-relaxed text-[rgba(252,252,252,0.6)] m-0 grow">
                {step.description}
              </p>

              <div className="bg-black rounded-[6px] p-4">
                <pre className="font-mono text-xs font-normal leading-relaxed text-[rgba(252,252,252,0.72)] m-0 whitespace-pre-wrap break-words">
                  {step.code}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Data fields section */}
        <div className="mt-16 pt-12 border-t border-[rgba(255,255,255,0.08)]">
          <h2
            className="font-display font-bold tracking-[-0.02em] text-[#fcfcfc] m-0 mb-2"
            style={{ fontSize: 'clamp(20px, 2.5vw, 26px)' }}
          >
            What Data Can You Extract from Google Maps?
          </h2>
          <p className="font-sans text-sm text-[rgba(252,252,252,0.5)] m-0 mb-5">
            Every field exported to CSV, ready for your CRM or outreach tool.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Business name', 'Phone number', 'Email address', 'Physical address',
              'Website URL', 'Google rating', 'Review count', 'Business category',
              'Opening hours', 'Coordinates', 'Google Maps URL',
            ].map((field) => (
              <span
                key={field}
                className="font-sans text-xs font-semibold text-[rgba(252,252,252,0.7)] bg-[#2a2a2a] border border-[rgba(255,255,255,0.1)] rounded-pill px-3 py-[5px]"
              >
                {field}
              </span>
            ))}
          </div>
        </div>

        {/* Social proof + Why Choose */}
        <div className="mt-12 flex justify-center">
          <span className="font-sans text-[13px] font-normal text-[rgba(252,252,252,0.35)]">
            ✦{'  '}3,200+ businesses scraped this week{'  '}·{'  '}94,000+ leads exported
          </span>
        </div>

        <div
          id="pricing"
          className="mt-8 border-t border-[rgba(255,255,255,0.1)] pt-12 flex items-center justify-between flex-wrap gap-6"
        >
          <div>
            <h2 className="font-display text-[22px] font-bold text-[#fcfcfc] m-0 mb-[6px] tracking-[-0.02em]">
              Why Choose TheMapScraper?
            </h2>
            <p className="font-sans text-sm text-[rgba(252,252,252,0.5)] m-0">
              A map scraper built for non-technical users. Credits never expire, one credit = one lead, no subscriptions.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-end">
            <div className="flex gap-3 flex-wrap items-start">
              {[
                { label: 'Free', price: '$0', leads: '50 leads/mo', featured: false },
                { label: 'Starter', price: '€9', leads: '500 leads', featured: false },
                { label: 'Growth', price: '€29', leads: '2,000 leads', featured: true },
                { label: 'Pro', price: '€69', leads: '6,000 leads', featured: false },
              ].map((pack) => (
                <div key={pack.label} className="flex flex-col items-center gap-[6px]">
                  <div className="h-[22px] flex items-center">
                    {pack.featured && (
                      <span className="font-sans text-[10px] font-bold text-brand bg-[rgba(234,40,4,0.12)] rounded-pill px-[9px] py-[3px] uppercase tracking-[0.05em]">
                        Most popular
                      </span>
                    )}
                  </div>
                  <div
                    className={`bg-[#2a2a2a] rounded-[10px] px-5 py-4 text-center min-w-[100px] ${pack.featured ? 'border-[1.5px] border-brand' : 'border border-[rgba(255,255,255,0.1)]'}`}
                  >
                    <div className={`font-sans text-[11px] font-semibold mb-1 uppercase tracking-[0.05em] ${pack.featured ? 'text-brand' : 'text-[rgba(252,252,252,0.5)]'}`}>
                      {pack.label}
                    </div>
                    <div className="font-display text-2xl font-bold text-[#fcfcfc] tracking-[-0.02em]">
                      {pack.price}
                    </div>
                    <div className="font-sans text-xs text-[rgba(252,252,252,0.4)] mt-[2px]">
                      {pack.leads}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleGetStarted}
              className="font-sans text-sm font-semibold text-white bg-brand border-none rounded-pill px-6 py-[11px] cursor-pointer transition-colors duration-150 hover:bg-brand-dark"
            >
              Get started →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
