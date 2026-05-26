import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PreviewSection from './components/PreviewSection'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AuthModal from './components/AuthModal'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Pricing from './pages/Pricing'
import DashboardLayout from './components/DashboardLayout'
import SearchPage from './pages/dashboard/SearchPage'
import ExportsPage from './pages/dashboard/ExportsPage'
import { AuthProvider, useAuthContext } from './context/AuthContext'
import CookieBanner from './components/CookieBanner'
import { DEFAULT_QUERY, defaultResults } from './data/defaultResults'
import type { Lead } from './types/lead'

type SearchState = 'idle' | 'loading' | 'results' | 'error'

const PREVIEW_MAX_RESULTS = 10

function isDefaultQuery(q: { business: string; location: string }) {
  return (
    q.business.trim().toLowerCase() === DEFAULT_QUERY.business.toLowerCase() &&
    q.location.trim().toLowerCase() === DEFAULT_QUERY.location.toLowerCase()
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, openLogin } = useAuthContext()
  if (loading) return null
  if (!user) {
    openLogin()
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

function HomePage() {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [searchState, setSearchState] = useState<SearchState>('results')
  const [leads, setLeads] = useState<Lead[]>(defaultResults)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSearch = async (q: { business: string; location: string }) => {
    if (isDefaultQuery(q)) {
      setQuery(DEFAULT_QUERY)
      setLeads(defaultResults)
      setSearchState('results')
      return
    }

    setQuery(q)
    setSearchState('loading')
    setLeads([])
    setErrorMsg(null)

    setTimeout(() => {
      const el = document.getElementById('preview-section')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)

    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: q.business,
          location: q.location,
          maxResults: PREVIEW_MAX_RESULTS,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`)
      }

      const data = await res.json() as { results: Lead[]; total: number }
      setLeads(data.results)
      setSearchState('results')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setErrorMsg(message)
      setSearchState('error')
    }
  }

  return (
    <>
      <Hero query={query} setQuery={setQuery} onSearch={handleSearch} />
      <PreviewSection
        query={query}
        searchState={searchState}
        leads={leads}
        errorMsg={errorMsg}
      />
      <HowItWorks />
      <FAQ />
    </>
  )
}

function AppInner() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')
  const isPricing = location.pathname === '/pricing'
  const hideChrome = isDashboard || isPricing

  return (
    <div style={{ backgroundColor: '#f9f7f3', minHeight: '100vh' }}>
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SearchPage />} />
          <Route path="exports" element={<ExportsPage />} />
        </Route>
      </Routes>
      {!hideChrome && <Footer />}
      <AuthModal />
      <CookieBanner />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </BrowserRouter>
  )
}
