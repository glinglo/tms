import { lazy, Suspense, useState, useEffect, useRef } from 'react'
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
const BuyLocalBusinessLeads = lazy(() => import('./pages/BuyLocalBusinessLeads'))
const ColdEmailLeadListBuilder = lazy(() => import('./pages/ColdEmailLeadListBuilder'))
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
const GoogleMapsScraperExtension = lazy(() => import('./pages/blog/GoogleMapsScraperExtension'))
const ScrapeGoogleMapsReviews = lazy(() => import('./pages/blog/ScrapeGoogleMapsReviews'))
const GoogleMapsScraperApi = lazy(() => import('./pages/blog/GoogleMapsScraperApi'))
const DashboardLayout = lazy(() => import('./components/DashboardLayout'))
const SearchPage = lazy(() => import('./pages/dashboard/SearchPage'))
const ExportsPage = lazy(() => import('./pages/dashboard/ExportsPage'))
const About = lazy(() => import('./pages/About'))
const RestaurantLeads = lazy(() => import('./pages/scrape/RestaurantLeads'))
const DentistLeads = lazy(() => import('./pages/scrape/DentistLeads'))
const PlumberLeads = lazy(() => import('./pages/scrape/PlumberLeads'))
const LawyerLeads = lazy(() => import('./pages/scrape/LawyerLeads'))
const RealEstateAgentLeads = lazy(() => import('./pages/scrape/RealEstateAgentLeads'))
const DentistNewYork = lazy(() => import('./pages/scrape/cities/DentistNewYork'))
const DentistMiami = lazy(() => import('./pages/scrape/cities/DentistMiami'))
const DentistChicago = lazy(() => import('./pages/scrape/cities/DentistChicago'))
const DentistLosAngeles = lazy(() => import('./pages/scrape/cities/DentistLosAngeles'))
const DentistHouston = lazy(() => import('./pages/scrape/cities/DentistHouston'))
const GoogleMapsScraper = lazy(() => import('./pages/GoogleMapsScraper'))

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
  const [previewRunId, setPreviewRunId] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!previewRunId) return
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/scrape-status?runId=${encodeURIComponent(previewRunId)}`)
        if (!res.ok) {
          const { message } = await parseScrapeErrorResponse(res)
          clearInterval(pollRef.current!)
          setPreviewRunId(null)
          setErrorMsg(message)
          setSearchState('error')
          return
        }
        const data = await res.json() as { status: string; results?: Lead[] }
        if (data.status === 'done') {
          clearInterval(pollRef.current!)
          setPreviewRunId(null)
          setLeads(data.results ?? [])
          setSearchState('results')
        }
        // 'pending' → keep polling
      } catch {
        clearInterval(pollRef.current!)
        setPreviewRunId(null)
        setErrorMsg('Preview search is temporarily unavailable. Please try again in a few minutes.')
        setSearchState('error')
      }
    }, 3000)
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [previewRunId])

  const handleSearch = async (q: { business: string; location: string }) => {
    if (isDefaultQuery(q)) {
      setQuery(DEFAULT_QUERY)
      setLeads(defaultResults)
      setSearchState('results')
      return
    }

    if (pollRef.current) clearInterval(pollRef.current)
    setPreviewRunId(null)
    setQuery(q)
    setSearchState('loading')
    setLeads([])
    setErrorMsg(null)

    setTimeout(() => {
      const el = document.getElementById('preview-section')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)

    try {
      const res = await fetch('/api/scrape-start', {
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

      const { runId } = await res.json() as { runId: string }
      setPreviewRunId(runId)
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
          <Route path="/about/" element={<About />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-of-service" element={<Terms />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/google-maps-scraper/" element={<GoogleMapsScraper />} />
          <Route path="/google-maps-lead-extractor/" element={<GoogleMapsLeadExtractor />} />
          <Route path="/buy-local-business-leads/" element={<BuyLocalBusinessLeads />} />
          <Route path="/cold-email-lead-list-builder/" element={<ColdEmailLeadListBuilder />} />
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
          <Route path="/blog/google-maps-scraper-extension-vs-web-app/" element={<GoogleMapsScraperExtension />} />
          <Route path="/blog/scrape-google-maps-reviews/" element={<ScrapeGoogleMapsReviews />} />
          <Route path="/blog/google-maps-scraper-api/" element={<GoogleMapsScraperApi />} />
          <Route path="/scrape/restaurant-leads/" element={<RestaurantLeads />} />
          <Route path="/scrape/dentist-leads/" element={<DentistLeads />} />
          <Route path="/scrape/dentist-leads/new-york/" element={<DentistNewYork />} />
          <Route path="/scrape/dentist-leads/miami/" element={<DentistMiami />} />
          <Route path="/scrape/dentist-leads/chicago/" element={<DentistChicago />} />
          <Route path="/scrape/dentist-leads/los-angeles/" element={<DentistLosAngeles />} />
          <Route path="/scrape/dentist-leads/houston/" element={<DentistHouston />} />
          <Route path="/scrape/plumber-leads/" element={<PlumberLeads />} />
          <Route path="/scrape/lawyer-leads/" element={<LawyerLeads />} />
          <Route path="/scrape/real-estate-agent-leads/" element={<RealEstateAgentLeads />} />
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
