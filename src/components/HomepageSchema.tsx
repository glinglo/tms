import JsonLd from './JsonLd'
import BreadcrumbSchema from './BreadcrumbSchema'

const softwareApplication = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TheMapScraper',
  alternateName: 'Map Scraper',
  description:
    'Extract business data from Google Maps instantly. Phone numbers, emails, addresses, websites, ratings and more. Download clean CSV. No extensions, no setup.',
  url: 'https://themapscraper.com',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier: 50 leads per month, no credit card required',
  },
  featureList: [
    'Google Maps business data extraction',
    'CSV export',
    'Phone number extraction',
    'Email extraction',
    'Business address extraction',
    'Website URL extraction',
    'No browser extension required',
    'No API keys needed',
  ],
}

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TheMapScraper',
  url: 'https://themapscraper.com',
  logo: 'https://themapscraper.com/logo.png',
  description:
    'Google Maps Lead Scraper. Extract business data from Google Maps instantly.',
  sameAs: [],
}

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What data can I extract from Google Maps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TheMapScraper extracts business names, phone numbers, email addresses, physical addresses, website URLs, Google ratings, review counts, business categories, and opening hours from any Google Maps search. All data exports to a clean CSV file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to install a browser extension?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. TheMapScraper works directly in your browser with no extensions, no downloads, and no technical setup. Just enter your search query and download your leads.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is TheMapScraper free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TheMapScraper offers 50 free leads per month with no credit card required. All data fields are included. Premium plans are available for higher volumes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What format does the data export in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All extracted data downloads as a clean CSV file compatible with Excel, Google Sheets, or any CRM like HubSpot, Salesforce, or Pipedrive.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is TheMapScraper different from Apify or Outscraper?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unlike Apify or Outscraper, TheMapScraper requires zero technical setup. No API keys, no actors, no browser extensions. You get a simple web interface where you type a search and download leads instantly.',
      },
    },
  ],
}

export default function HomepageSchema() {
  return (
    <>
      <JsonLd data={softwareApplication} />
      <JsonLd data={organization} />
      <JsonLd data={faqPage} />
      <BreadcrumbSchema
        items={[{ name: 'Home', url: 'https://themapscraper.com/' }]}
      />
    </>
  )
}
