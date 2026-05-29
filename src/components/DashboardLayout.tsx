import { useCallback, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { authHeaders } from '../lib/apiAuth'
import { computeWalletFromProfile, formatCreditsLabel, type CreditWallet } from '../lib/credits'
import { supabase } from '../lib/supabase'
import BuyCreditsModal from './BuyCreditsModal'

export interface DashboardOutletContext {
  credits: number | null
  wallet: CreditWallet | null
  refreshCredits: () => void
  openBuyCredits: () => void
}

function IconHome() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6.5L8 2l6 4.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" />
      <path d="M6 15V9h4v6" />
    </svg>
  )
}

function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v8M5 7l3 3 3-3" />
      <path d="M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="17" y2="6" />
      <line x1="3" y1="10" x2="17" y2="10" />
      <line x1="3" y1="14" x2="17" y2="14" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="4" y1="4" x2="16" y2="16" />
      <line x1="16" y1="4" x2="4" y2="16" />
    </svg>
  )
}

function getInitials(email: string): string {
  return email.split('@')[0].slice(0, 2).toUpperCase()
}

export default function DashboardLayout() {
  const { user, signOut } = useAuthContext()
  const location = useLocation()
  const navigate = useNavigate()
  const [credits, setCredits] = useState<number | null>(null)
  const [wallet, setWallet] = useState<CreditWallet | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [paymentBanner, setPaymentBanner] = useState(false)
  const [buyCreditsOpen, setBuyCreditsOpen] = useState(false)

  const userId = user?.id

  const fetchCreditsFromProfile = useCallback(async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('credits_balance, free_credits_used, credits_period')
      .eq('id', userId!)
      .maybeSingle()

    if (error || !data) return false

    const wallet = computeWalletFromProfile(data)
    setWallet(wallet)
    setCredits(wallet.totalAvailable)
    return true
  }, [userId])

  const fetchCredits = useCallback(async () => {
    if (!userId) return
    if (await fetchCreditsFromProfile()) return

    try {
      const res = await fetch('/api/credits', {
        headers: await authHeaders(),
      })
      if (res.ok) {
        const body = (await res.json()) as CreditWallet
        setWallet(body)
        setCredits(body.totalAvailable)
        return
      }
    } catch {
      // Profile read is primary; API is fallback for period sync
    }

    setCredits(null)
    setWallet(null)
  }, [userId, fetchCreditsFromProfile])

  // Fetch on mount and whenever the user changes
  useEffect(() => { fetchCredits() }, [fetchCredits])

  // Refetch when the tab regains focus (catches manual Supabase edits)
  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === 'visible') fetchCredits() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [fetchCredits])

  // Show payment success banner and refresh credits when returning from Stripe
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('payment') === 'success') {
      setPaymentBanner(true)
      fetchCredits()
      navigate('/dashboard', { replace: true })
      const timer = setTimeout(() => setPaymentBanner(false), 6000)
      return () => clearTimeout(timer)
    }
  }, [location.search, fetchCredits, navigate])

  // Close sidebar on route change (mobile nav)
  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <IconHome /> },
    { label: 'Exports', href: '/dashboard/exports', icon: <IconDownload /> },
  ]

  const email = user?.email ?? ''
  const initials = email ? getInitials(email) : '??'

  const SidebarContent = () => (
    <>
      <div className="px-5 pt-5 pb-4 flex items-center justify-between">
        <Link to="/" className="no-underline">
          <span className="font-display text-base font-bold text-ink tracking-[-0.4px]">
            the<span className="text-brand">map</span>scraper
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden bg-transparent border-none cursor-pointer text-ink-faint p-1"
        >
          <IconClose />
        </button>
      </div>

      <div className="h-px bg-[rgba(32,32,32,0.08)] mx-4 mb-3" />

      <nav className="flex-1 px-2">
        {navItems.map(({ label, href, icon }) => {
          const isActive = location.pathname === href
          return (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-[10px] px-3 py-[9px] rounded-lg no-underline mb-[2px] font-sans text-sm transition-colors duration-100 border-l-2 ${
                isActive
                  ? 'font-semibold text-ink bg-[rgba(32,32,32,0.06)] border-brand'
                  : 'font-medium text-ink-muted bg-transparent border-transparent hover:bg-[rgba(32,32,32,0.04)]'
              }`}
            >
              {icon}
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 pb-5 pt-3 border-t border-[rgba(32,32,32,0.08)]">
        <div className="flex items-center gap-[10px] mb-3">
          <div className="w-8 h-8 rounded-pill bg-ink flex items-center justify-center shrink-0">
            <span className="font-sans text-[11px] font-bold text-white tracking-[0.03em]">
              {initials}
            </span>
          </div>
          <div className="overflow-hidden">
            <p className="font-sans text-xs font-semibold text-ink m-0 overflow-hidden text-ellipsis whitespace-nowrap">
              {email}
            </p>
            <p className="font-sans text-[11px] text-ink-faint m-0">
              {formatCreditsLabel(credits)}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setBuyCreditsOpen(true)
            setSidebarOpen(false)
          }}
          className="w-full font-sans text-[13px] font-semibold text-white bg-brand border-none rounded-pill py-[10px] cursor-pointer transition-colors duration-150 mb-[10px] hover:bg-brand-dark"
        >
          Buy credits
        </button>

        <button
          onClick={signOut}
          className="block w-full text-center font-sans text-xs text-ink-faint bg-transparent border-none cursor-pointer py-1 transition-colors duration-150 hover:text-ink"
        >
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 w-60 h-screen bg-cream-dark border-r border-[rgba(32,32,32,0.10)] flex-col z-40">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 w-72 h-screen bg-cream-dark border-r border-[rgba(32,32,32,0.10)] flex flex-col z-50 md:hidden transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-h-screen md:ml-60 bg-cream">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between h-14 px-4 bg-cream-dark border-b border-[rgba(32,32,32,0.10)] sticky top-0 z-30">
          <Link to="/" className="no-underline">
            <span className="font-display text-base font-bold text-ink tracking-[-0.4px]">
              the<span className="text-brand">map</span>scraper
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-transparent border-none cursor-pointer text-ink p-1"
            aria-label="Open menu"
          >
            <IconMenu />
          </button>
        </header>

        {paymentBanner && (
          <div className="mx-6 mt-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-[#16a34a] text-base leading-none">✓</span>
            <p className="font-sans text-sm font-medium text-[#15803d] m-0">
              Payment successful — your credits have been added.
            </p>
            <button
              onClick={() => setPaymentBanner(false)}
              className="ml-auto bg-transparent border-none cursor-pointer text-[#16a34a] text-lg leading-none p-0"
            >
              ×
            </button>
          </div>
        )}
        <main className="flex-1">
          <Outlet
            context={{
              credits,
              wallet,
              refreshCredits: fetchCredits,
              openBuyCredits: () => setBuyCreditsOpen(true),
            } satisfies DashboardOutletContext}
          />
        </main>
      </div>

      <BuyCreditsModal open={buyCreditsOpen} onClose={() => setBuyCreditsOpen(false)} />
    </div>
  )
}
