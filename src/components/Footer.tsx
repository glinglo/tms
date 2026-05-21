import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black py-12 px-6 pb-8">
      <div className="max-w-[1080px] mx-auto">

        <div className="mb-10">
          <a href="/" className="no-underline inline-block mb-[10px]">
            <span className="font-display text-xl font-bold text-[#fcfcfc] tracking-[-0.5px]">
              the<span className="text-brand">map</span>scraper
            </span>
          </a>
          <p className="font-sans text-sm font-normal leading-relaxed text-[rgba(252,252,252,0.35)] m-0">
            Google Maps lead scraper for sales teams, agencies, and cold callers.
          </p>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.10)] pt-6 flex items-center justify-between flex-wrap gap-3">
          <p className="font-sans text-xs text-[rgba(252,252,252,0.3)] m-0">
            © {year} themapscraper.com. Not affiliated with Google.
          </p>
          <div className="flex items-center gap-[6px]">
            {[{ label: 'Privacy', to: '/privacy' }, { label: 'Terms', to: '/terms' }].map(({ label, to }, i) => (
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
          </div>
        </div>

      </div>
    </footer>
  )
}
