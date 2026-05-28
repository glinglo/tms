import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, loading, signOut, openLogin, openSignUp } = useAuthContext()
  const location = useLocation()
  const showHomeLinks = location.pathname === '/'

  return (
    <nav className="bg-cream border-b border-border-subtle h-[60px] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="no-underline flex items-center gap-2">
          <span className="font-display text-lg font-bold text-ink tracking-[-0.5px]">
            the<span className="text-brand">map</span>scraper
          </span>
        </Link>

        {showHomeLinks && (
          <div className="hidden md:flex gap-8 items-center">
            {[
              { label: 'Pricing', href: '/#pricing' },
              { label: 'How it works', href: '/#how-it-works' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-sans text-sm font-semibold text-ink-muted no-underline transition-colors duration-150 hover:text-ink"
              >
                {label}
              </a>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {!loading && (
            user ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden md:inline font-sans text-sm font-semibold text-ink-muted no-underline transition-colors duration-150 hover:text-ink"
                >
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="font-sans text-sm font-semibold text-ink-muted bg-transparent border border-[rgba(32,32,32,0.15)] rounded-pill px-[18px] py-2 cursor-pointer transition-colors duration-150 hover:border-ink hover:text-ink"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={openLogin}
                  className="hidden md:inline font-sans text-sm font-semibold text-ink-muted bg-transparent border-none cursor-pointer p-0 transition-colors duration-150 hover:text-ink"
                >
                  Log in
                </button>
                <button
                  onClick={openSignUp}
                  className="font-sans text-sm font-semibold text-white bg-brand px-5 py-[10px] rounded-pill border-none cursor-pointer transition-colors duration-150 hover:bg-brand-dark"
                >
                  Get started
                </button>
              </>
            )
          )}

          <button
            className="md:hidden bg-transparent border-none cursor-pointer p-1 text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="bg-cream border-b border-border-subtle px-6 py-4">
          {showHomeLinks && [
            { label: 'Pricing', href: '/#pricing' },
            { label: 'How it works', href: '/#how-it-works' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="block font-sans text-base font-semibold text-ink no-underline py-[10px] border-b border-[rgba(32,32,32,0.08)]"
            >
              {label}
            </a>
          ))}
          {!loading && (
            user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block font-sans text-base font-semibold text-ink no-underline py-[10px] border-b border-[rgba(32,32,32,0.08)]"
                >
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="block w-full text-left font-sans text-base font-semibold text-brand bg-transparent border-none cursor-pointer py-[10px]"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setMobileOpen(false); openLogin() }}
                  className="block w-full text-left font-sans text-base font-semibold text-ink bg-transparent border-none cursor-pointer py-[10px] border-b border-[rgba(32,32,32,0.08)]"
                >
                  Log in
                </button>
                <button
                  onClick={() => { setMobileOpen(false); openSignUp() }}
                  className="block w-full text-left font-sans text-base font-semibold text-brand bg-transparent border-none cursor-pointer py-[10px]"
                >
                  Get started
                </button>
              </>
            )
          )}
        </div>
      )}
    </nav>
  )
}
