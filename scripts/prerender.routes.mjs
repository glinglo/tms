const BASE = 'https://www.themapscraper.com'

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, url }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: url,
    })),
  }
}

function article(title, date) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    datePublished: date,
    dateModified: date,
    author: { '@type': 'Organization', name: 'TheMapScraper' },
    publisher: { '@type': 'Organization', name: 'TheMapScraper' },
  }
}

const softwareApplication = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TheMapScraper',
  alternateName: 'Map Scraper',
  description:
    'Extract business data from Google Maps instantly. Phone numbers, emails, addresses, websites, ratings and more. Download clean CSV. No extensions, no setup.',
  url: BASE,
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
  url: BASE,
  logo: `${BASE}/logo.png`,
  description: 'Google Maps Lead Scraper. Extract business data from Google Maps instantly.',
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

export const routes = [
  // ── Homepage ───────────────────────────────────────────────────────────────
  {
    path: '/',
    title: 'Google Maps Scraper to Extract Business Leads | TheMapScraper',
    description:
      'Free map scraper for Google Maps. Extract phone numbers, emails, addresses & websites from any business. Download clean CSV. No code, no extension.',
    ogTitle: 'Google Maps Scraper to Extract Business Leads',
    ogDescription:
      'Scrape any business from Google Maps. Get phone numbers, emails, addresses & websites in a clean CSV. No setup required.',
    schemas: [
      softwareApplication,
      organization,
      faqPage,
      breadcrumb([{ name: 'Home', url: `${BASE}/` }]),
    ],
  },

  // ── Pricing ────────────────────────────────────────────────────────────────
  {
    path: '/pricing/',
    title: 'Pricing | TheMapScraper – Google Maps Lead Scraper',
    description:
      'Simple, transparent pricing for TheMapScraper. Start free with 50 leads per month, no credit card required. Upgrade for higher volumes.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Pricing', url: `${BASE}/pricing/` },
      ]),
    ],
  },

  // ── Landing pages ──────────────────────────────────────────────────────────
  {
    path: '/google-maps-lead-extractor/',
    title: 'Google Maps Lead Extractor. Get B2B Contacts in Seconds',
    description:
      'Extract verified business leads from Google Maps. Get names, phones, emails, addresses and websites. Download CSV instantly. No extension, no API, no code.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Google Maps Lead Extractor', url: `${BASE}/google-maps-lead-extractor/` },
      ]),
    ],
  },
  {
    path: '/extract-emails-google-maps/',
    title: 'Extract Emails from Google Maps. Business Email Scraper',
    description:
      'Find business emails from Google Maps listings. Bulk extract emails, phones and addresses. Download CSV. Perfect for cold outreach. No extension required.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Extract Emails from Google Maps', url: `${BASE}/extract-emails-google-maps/` },
      ]),
    ],
  },
  {
    path: '/google-maps-data-scraper-csv/',
    title: 'Google Maps Data Scraper to CSV. Export Clean Data Instantly',
    description:
      'Scrape Google Maps data and export to CSV instantly. Clean columns, ready for Excel, Google Sheets, or CRM import. No coding, no extension. Free to try.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Google Maps Data Scraper to CSV', url: `${BASE}/google-maps-data-scraper-csv/` },
      ]),
    ],
  },
  {
    path: '/google-maps-business-scraper-free/',
    title: 'Free Google Maps Scraper. Extract Business Data at No Cost',
    description:
      'Free Google Maps scraper with no extension required. Extract business names, phones, emails and addresses. Download CSV. No credit card, no setup. Start free.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Free Google Maps Business Scraper', url: `${BASE}/google-maps-business-scraper-free/` },
      ]),
    ],
  },

  // ── Alternatives ───────────────────────────────────────────────────────────
  {
    path: '/alternatives/',
    title: 'TheMapScraper Alternatives and Comparisons [2026]',
    description:
      'Compare TheMapScraper with Apify, Outscraper, and Scrap.io. Side-by-side features, pricing, and ease of use for Google Maps scraping tools.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Alternatives', url: `${BASE}/alternatives/` },
      ]),
    ],
  },
  {
    path: '/alternatives/apify/',
    title: 'TheMapScraper vs Apify Google Maps Scraper [2026 Comparison]',
    description:
      'Compare TheMapScraper and Apify for Google Maps scraping. Side-by-side pricing, features, ease of use, and which tool fits your needs best.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Alternatives', url: `${BASE}/alternatives/` },
        { name: 'vs Apify', url: `${BASE}/alternatives/apify/` },
      ]),
    ],
  },
  {
    path: '/alternatives/outscraper/',
    title: 'TheMapScraper vs Outscraper [2026 Comparison]',
    description:
      'Compare TheMapScraper and Outscraper for Google Maps scraping. Pricing, features, enrichment options, and which tool is right for you.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Alternatives', url: `${BASE}/alternatives/` },
        { name: 'vs Outscraper', url: `${BASE}/alternatives/outscraper/` },
      ]),
    ],
  },
  {
    path: '/alternatives/scrap-io/',
    title: 'TheMapScraper vs Scrap.io [2026 Comparison]',
    description:
      'Compare TheMapScraper and Scrap.io for Google Maps lead generation. Pricing, filtering features, ease of use, and which scraper fits your workflow.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Alternatives', url: `${BASE}/alternatives/` },
        { name: 'vs Scrap.io', url: `${BASE}/alternatives/scrap-io/` },
      ]),
    ],
  },

  // ── Use Cases ──────────────────────────────────────────────────────────────
  {
    path: '/use-cases/',
    title: 'Google Maps Scraper Use Cases. Who Uses TheMapScraper',
    description:
      'Discover how sales teams, marketing agencies, real estate agents, and recruiters use TheMapScraper to generate leads from Google Maps.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Use Cases', url: `${BASE}/use-cases/` },
      ]),
    ],
  },
  {
    path: '/use-cases/real-estate/',
    title: 'Google Maps Scraper for Real Estate. Find Property Leads',
    description:
      'Use TheMapScraper to find real estate agents, property managers, investors, and brokerages on Google Maps. Download leads as CSV. 50 free leads/month.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Use Cases', url: `${BASE}/use-cases/` },
        { name: 'Real Estate', url: `${BASE}/use-cases/real-estate/` },
      ]),
    ],
  },
  {
    path: '/use-cases/marketing-agencies/',
    title: 'Google Maps Scraper for Marketing Agencies. Find Clients',
    description:
      'Use TheMapScraper to find local businesses that need marketing services. Extract contacts from Google Maps, prospect estate agents, and build client lists.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Use Cases', url: `${BASE}/use-cases/` },
        { name: 'Marketing Agencies', url: `${BASE}/use-cases/marketing-agencies/` },
      ]),
    ],
  },

  // ── Blog ───────────────────────────────────────────────────────────────────
  {
    path: '/blog/',
    title: 'TheMapScraper Blog. Google Maps Scraping Guides and Tips',
    description:
      'Learn how to scrape Google Maps for lead generation. Guides, tutorials, comparisons, and tips for extracting business data.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Blog', url: `${BASE}/blog/` },
      ]),
    ],
  },
  {
    path: '/blog/how-to-scrape-google-maps/',
    title: 'How to Scrape Google Maps in 2026 (No Code, No Setup)',
    description:
      'Learn how to scrape Google Maps for business leads. Step-by-step guide covering no-code tools, what data you can extract, and how to use it for lead generation.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Blog', url: `${BASE}/blog/` },
        {
          name: 'How to Scrape Google Maps in 2026 (No Code, No Setup)',
          url: `${BASE}/blog/how-to-scrape-google-maps/`,
        },
      ]),
      article('How to Scrape Google Maps in 2026 (No Code, No Setup)', '2026-05-28'),
    ],
  },
  {
    path: '/blog/best-google-maps-scrapers/',
    title: '7 Best Google Maps Scrapers Compared [2026]',
    description:
      'Honest comparison of the best Google Maps scrapers in 2026. TheMapScraper, Apify, Outscraper, Scrap.io, and more. Features, pricing, and who each tool is best for.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Blog', url: `${BASE}/blog/` },
        {
          name: '7 Best Google Maps Scrapers Compared [2026]',
          url: `${BASE}/blog/best-google-maps-scrapers/`,
        },
      ]),
      article('7 Best Google Maps Scrapers Compared [2026]', '2026-05-28'),
    ],
  },
  {
    path: '/blog/google-maps-lead-generation-guide/',
    title: 'Google Maps Lead Generation: The Complete Guide [2026]',
    description:
      'Learn how to use Google Maps for B2B lead generation. From finding prospects to closing deals. Strategies, tools, and real examples for sales teams and agencies.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Blog', url: `${BASE}/blog/` },
        {
          name: 'Google Maps Lead Generation: The Complete Guide [2026]',
          url: `${BASE}/blog/google-maps-lead-generation-guide/`,
        },
      ]),
      article('Google Maps Lead Generation: The Complete Guide [2026]', '2026-05-28'),
    ],
  },

  // ── Legal ──────────────────────────────────────────────────────────────────
  {
    path: '/privacy-policy/',
    title: 'Privacy Policy | TheMapScraper',
    description:
      'Read TheMapScraper\'s privacy policy. Learn how we collect, use, and protect your personal data in compliance with GDPR.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Privacy Policy', url: `${BASE}/privacy-policy/` },
      ]),
    ],
  },
  {
    path: '/terms-of-service/',
    title: 'Terms of Service | TheMapScraper',
    description:
      'Read TheMapScraper\'s terms of service. Understand your rights and responsibilities when using our Google Maps scraper.',
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Terms of Service', url: `${BASE}/terms-of-service/` },
      ]),
    ],
  },
]
