import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PreviewSection from './components/PreviewSection'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AuthModal from './components/AuthModal'
import { AuthProvider, useAuthContext } from './context/AuthContext'
import CookieBanner from './components/CookieBanner'
import HomepageSchema from './components/HomepageSchema'
import { DEFAULT_QUERY, defaultResults } from './data/defaultResults'
import type { Lead } from './types/lead'
import { parseScrapeErrorResponse } from './lib/scrapeErrors'

// Route-level code splitting — these pages are never shown on the homepage
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Pricing = lazy(() => import('./pages/Pricing'))
const GoogleMapsLeadExtractor = lazy(() => import('./pages/GoogleMapsLeadExtractor'))
const ExtractEmailsGoogleMaps = lazy(() => import('./pages/ExtractEmailsGoogleMaps'))
const GoogleMapsDataScraperCsv = lazy(() => import('./pages/GoogleMapsDataScraperCsv'))
const GoogleMapsBusinessScraperFree = lazy(() => import('./pages/GoogleMapsBusinessScraperFree'))
const Alternatives = lazy(() => import('./pages/Alternatives'))
const ApifyAlternative = lazy(() => import('./pages/alternatives/ApifyAlternative'))
const OutscraperAlternative = lazy(() => import('./pages/alternatives/OutscraperAlternative'))
const ScrapIoAlternative = lazy(() => import('./pages/alternatives/ScrapIoAlternative'))
const UseCases = lazy(() => import('./pages/UseCases'))
const RealEstateUseCase = lazy(() => import('./pages/use-cases/RealEstateUseCase'))
const MarketingAgenciesUseCase = lazy(() => import('./pages/use-cases/MarketingAgenciesUseCase'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Blog = lazy(() => import('./pages/Blog'))
const HowToScrapeGoogleMaps = lazy(() => import('./pages/blog/HowToScrapeGoogleMaps'))
const BestGoogleMapsScrapers = lazy(() => import('./pages/blog/BestGoogleMapsScrapers'))
const GoogleMapsLeadGenerationGuide = lazy(() => import('./pages/blog/GoogleMapsLeadGenerationGuide'))
const DashboardLayout = lazy(() => import('./components/DashboardLayout'))
const SearchPage = lazy(() => import('./pages/dashboard/SearchPage'))
const ExportsPage = lazy(() => import('./pages/dashboard/ExportsPage'))

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
          preview: true,
        }),
      })

      if (!res.ok) {
        const { message } = await parseScrapeErrorResponse(res)
        setErrorMsg(message)
        setSearchState('error')
        return
      }

      const data = await res.json() as { results: Lead[]; total: number }
      setLeads(data.results)
      setSearchState('results')
    } catch {
      setErrorMsg('Preview search is temporarily unavailable. Please try again in a few minutes.')
      setSearchState('error')
    }
  }

  return (
    <>
      <HomepageSchema />
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
  const hideChrome = isDashboard

  return (
    <div style={{ backgroundColor: '#f9f7f3', minHeight: '100vh' }}>
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-of-service" element={<Terms />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/google-maps-lead-extractor/" element={<GoogleMapsLeadExtractor />} />
          <Route path="/extract-emails-google-maps/" element={<ExtractEmailsGoogleMaps />} />
          <Route path="/google-maps-data-scraper-csv/" element={<GoogleMapsDataScraperCsv />} />
          <Route path="/google-maps-business-scraper-free/" element={<GoogleMapsBusinessScraperFree />} />
          <Route path="/alternatives/" element={<Alternatives />} />
          <Route path="/alternatives/apify/" element={<ApifyAlternative />} />
          <Route path="/alternatives/outscraper/" element={<OutscraperAlternative />} />
          <Route path="/alternatives/scrap-io/" element={<ScrapIoAlternative />} />
          <Route path="/use-cases/" element={<UseCases />} />
          <Route path="/use-cases/real-estate/" element={<RealEstateUseCase />} />
          <Route path="/use-cases/marketing-agencies/" element={<MarketingAgenciesUseCase />} />
          <Route path="/blog/" element={<Blog />} />
          <Route path="/blog/how-to-scrape-google-maps/" element={<HowToScrapeGoogleMaps />} />
          <Route path="/blog/best-google-maps-scrapers/" element={<BestGoogleMapsScrapers />} />
          <Route path="/blog/google-maps-lead-generation-guide/" element={<GoogleMapsLeadGenerationGuide />} />
          <Route path="*" element={<NotFound />} />
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
      </Suspense>
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
