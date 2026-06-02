import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Hero from './components/Hero'
import PreviewSection from './components/PreviewSection'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import { DEFAULT_QUERY, defaultResults } from './data/defaultResults'
import Blog from './pages/Blog'
import HowToScrapeGoogleMaps from './pages/blog/HowToScrapeGoogleMaps'
import BestGoogleMapsScrapers from './pages/blog/BestGoogleMapsScrapers'
import GoogleMapsLeadGenerationGuide from './pages/blog/GoogleMapsLeadGenerationGuide'
import Alternatives from './pages/Alternatives'
import RealEstateUseCase from './pages/use-cases/RealEstateUseCase'
import MarketingAgenciesUseCase from './pages/use-cases/MarketingAgenciesUseCase'
import GoogleMapsLeadExtractor from './pages/GoogleMapsLeadExtractor'
import ExtractEmailsGoogleMaps from './pages/ExtractEmailsGoogleMaps'
import GoogleMapsBusinessScraperFree from './pages/GoogleMapsBusinessScraperFree'
import GoogleMapsDataScraperCsv from './pages/GoogleMapsDataScraperCsv'
import RestaurantLeads from './pages/scrape/RestaurantLeads'
import DentistLeads from './pages/scrape/DentistLeads'
import PlumberLeads from './pages/scrape/PlumberLeads'
import LawyerLeads from './pages/scrape/LawyerLeads'
import RealEstateAgentLeads from './pages/scrape/RealEstateAgentLeads'
import GoogleMapsScraperExtension from './pages/blog/GoogleMapsScraperExtension'
import ScrapeGoogleMapsReviews from './pages/blog/ScrapeGoogleMapsReviews'
import GoogleMapsScraperApi from './pages/blog/GoogleMapsScraperApi'
import ApifyAlternative from './pages/alternatives/ApifyAlternative'
import OutscraperAlternative from './pages/alternatives/OutscraperAlternative'
import ScrapIoAlternative from './pages/alternatives/ScrapIoAlternative'
import About from './pages/About'

function HomeSSR() {
  return (
    <>
      <Hero
        query={DEFAULT_QUERY}
        setQuery={() => {}}
        onSearch={() => {}}
      />
      <PreviewSection
        query={DEFAULT_QUERY}
        searchState="results"
        leads={defaultResults}
        errorMsg={null}
      />
      <HowItWorks />
      <FAQ />
    </>
  )
}

const PAGE_MAP: Record<string, React.ComponentType> = {
  '/': HomeSSR,
  '/blog/': Blog,
  '/blog/how-to-scrape-google-maps/': HowToScrapeGoogleMaps,
  '/blog/best-google-maps-scrapers/': BestGoogleMapsScrapers,
  '/blog/google-maps-lead-generation-guide/': GoogleMapsLeadGenerationGuide,
  '/alternatives/': Alternatives,
  '/use-cases/real-estate/': RealEstateUseCase,
  '/use-cases/marketing-agencies/': MarketingAgenciesUseCase,
  '/google-maps-lead-extractor/': GoogleMapsLeadExtractor,
  '/extract-emails-google-maps/': ExtractEmailsGoogleMaps,
  '/google-maps-business-scraper-free/': GoogleMapsBusinessScraperFree,
  '/google-maps-data-scraper-csv/': GoogleMapsDataScraperCsv,
  '/scrape/restaurant-leads/': RestaurantLeads,
  '/scrape/dentist-leads/': DentistLeads,
  '/scrape/plumber-leads/': PlumberLeads,
  '/scrape/lawyer-leads/': LawyerLeads,
  '/scrape/real-estate-agent-leads/': RealEstateAgentLeads,
  '/blog/google-maps-scraper-api/': GoogleMapsScraperApi,
  '/blog/scrape-google-maps-reviews/': ScrapeGoogleMapsReviews,
  '/blog/google-maps-scraper-extension-vs-web-app/': GoogleMapsScraperExtension,
  '/alternatives/apify/': ApifyAlternative,
  '/alternatives/outscraper/': OutscraperAlternative,
  '/alternatives/scrap-io/': ScrapIoAlternative,
  '/about/': About,
}

export function render(url: string): string {
  const Page = PAGE_MAP[url]
  if (!Page) return ''
  return renderToString(
    <MemoryRouter initialEntries={[url]}>
      <AuthProvider>
        <Page />
      </AuthProvider>
    </MemoryRouter>
  )
}
