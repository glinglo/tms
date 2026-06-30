import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black py-12 px-6 pb-8">
      <div className="max-w-[1080px] mx-auto">

        <div className="mb-10 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-x-6 gap-y-8 items-start">
          <div>
            <a href="/" className="no-underline inline-block mb-[10px]">
              <span className="font-display text-xl font-bold text-[#fcfcfc] tracking-[-0.5px]">
                the<span className="text-brand">map</span>scraper
              </span>
            </a>
            <p className="font-sans text-sm font-normal leading-relaxed text-[rgba(252,252,252,0.35)] m-0">
              Google Maps lead scraper for sales teams, agencies, and cold callers.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[11px] font-semibold text-[rgba(252,252,252,0.3)] uppercase tracking-[0.06em] m-0 mb-1">
              Tools
            </p>
            {[
              { label: 'Google Maps Lead Extractor',       to: '/google-maps-lead-extractor/' },
              { label: 'Extract Emails from Google Maps',  to: '/extract-emails-google-maps/' },
              { label: 'Google Maps Data Scraper to CSV',  to: '/google-maps-data-scraper-csv/' },
              { label: 'Free Google Maps Scraper',         to: '/google-maps-business-scraper-free/' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="font-sans text-sm text-[rgba(252,252,252,0.4)] no-underline transition-colors duration-150 hover:text-[#fcfcfc]"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[11px] font-semibold text-[rgba(252,252,252,0.3)] uppercase tracking-[0.06em] m-0 mb-1">
              Use Cases
            </p>
            {[
              { label: 'Use Cases Overview',         to: '/use-cases/' },
              { label: 'Real Estate Agents',          to: '/use-cases/real-estate/' },
              { label: 'Marketing Agencies',          to: '/use-cases/marketing-agencies/' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="font-sans text-sm text-[rgba(252,252,252,0.4)] no-underline transition-colors duration-150 hover:text-[#fcfcfc]"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[11px] font-semibold text-[rgba(252,252,252,0.3)] uppercase tracking-[0.06em] m-0 mb-1">
              Lead Types
            </p>
            {[
              { label: 'Restaurant Leads',         to: '/scrape/restaurant-leads/' },
              { label: 'Dentist Leads',             to: '/scrape/dentist-leads/' },
              { label: 'Plumber Leads',             to: '/scrape/plumber-leads/' },
              { label: 'Lawyer Leads',              to: '/scrape/lawyer-leads/' },
              { label: 'Real Estate Agent Leads',   to: '/scrape/real-estate-agent-leads/' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="font-sans text-sm text-[rgba(252,252,252,0.4)] no-underline transition-colors duration-150 hover:text-[#fcfcfc]"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[11px] font-semibold text-[rgba(252,252,252,0.3)] uppercase tracking-[0.06em] m-0 mb-1">
              Resources
            </p>
            {[
              { label: 'Blog',                       to: '/blog/' },
              { label: 'Buy Local Business Leads',   to: '/buy-local-business-leads/' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="font-sans text-sm text-[rgba(252,252,252,0.4)] no-underline transition-colors duration-150 hover:text-[#fcfcfc]"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[11px] font-semibold text-[rgba(252,252,252,0.3)] uppercase tracking-[0.06em] m-0 mb-1">
              Comparisons
            </p>
            {[
              { label: 'Alternatives Overview',        to: '/alternatives/' },
              { label: 'TheMapScraper vs Apify',       to: '/alternatives/apify/' },
              { label: 'TheMapScraper vs Outscraper',  to: '/alternatives/outscraper/' },
              { label: 'TheMapScraper vs Scrap.io',    to: '/alternatives/scrap-io/' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="font-sans text-sm text-[rgba(252,252,252,0.4)] no-underline transition-colors duration-150 hover:text-[#fcfcfc]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.10)] pt-6 flex items-center justify-between flex-wrap gap-3">
          <p className="font-sans text-xs text-[rgba(252,252,252,0.3)] m-0" suppressHydrationWarning>
            © {year} themapscraper.com. Not affiliated with Google.
          </p>
          <div className="flex items-center gap-[6px]">
            {[
              { label: 'About', to: '/about/' },
              { label: 'Privacy', to: '/privacy-policy' },
              { label: 'Terms', to: '/terms-of-service' },
            ].map(({ label, to }, i) => (
              <>
                {i > 0 && (
                  <span key={`dot-${i}`} className="text-[rgba(252,252,252,0.2)] text-xs">·</span>
                )}
                <Link
                  key={label}
                  to={to}
                  className="font-sans text-xs text-[rgba(252,252,252,0.35)] no-underline transition-colors duration-150 hover:text-[#fcfcfc]"
                >
                  {label}
                </Link>
              </>
            ))}
            <span className="text-[rgba(252,252,252,0.2)] text-xs">·</span>
            <a
              href="mailto:jose@themapscraper.com"
              className="font-sans text-xs text-[rgba(252,252,252,0.35)] no-underline transition-colors duration-150 hover:text-[#fcfcfc]"
            >
              Contact
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
