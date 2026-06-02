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

const webApplication = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TheMapScraper',
  url: BASE,
  description:
    'Free Google Maps scraper to extract business leads. Phone numbers, emails, addresses, websites. Download clean CSV. No code required.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier: 50 leads per month, no credit card required',
  },
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
    title: 'Google Maps Scraper — Extract Business Leads Free | TheMapScraper',
    description:
      'Free Google Maps scraper. Extract phone numbers, emails, addresses and websites from any business. Download clean CSV instantly. No code, no extension, no signup.',
    ogTitle: 'Google Maps Scraper — Extract Business Leads Free',
    ogDescription:
      'Free Google Maps scraper. Extract phone numbers, emails, addresses and websites from any business. Download clean CSV instantly. No code, no extension, no signup.',
    renderSsr: true,
    schemas: [
      webApplication,
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
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Google Maps Lead Extractor', url: `${BASE}/google-maps-lead-extractor/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How many leads can I extract at once?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TheMapScraper can extract hundreds of business leads in a single search. The exact number depends on how many businesses match your Google Maps query for that location and category.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need to install a browser extension?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. TheMapScraper works directly in your browser without any extension, download, or technical setup. Just type your search and extract.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I import leads into my CRM?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. All data exports as a standard CSV file that you can import into any CRM including HubSpot, Salesforce, Pipedrive, Zoho, or any tool that accepts CSV imports.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is the lead data accurate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The data comes directly from Google Maps listings, so it reflects what businesses have published on their Google Business Profile. Phone numbers, addresses, and websites are generally very accurate.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is it legal to extract leads from Google Maps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Extracting publicly available business information from Google Maps is generally considered legal. The data is public business contact information that companies have chosen to display.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/extract-emails-google-maps/',
    title: 'Extract Emails from Google Maps. Business Email Scraper',
    description:
      'Find business emails from Google Maps listings. Bulk extract emails, phones and addresses. Download CSV. Perfect for cold outreach. No extension required.',
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Extract Emails from Google Maps', url: `${BASE}/extract-emails-google-maps/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do all Google Maps listings have email addresses?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Email availability depends on whether the business has published their email on their Google Business Profile. Typically 30-60% of listings include email addresses, varying by industry and region.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use extracted emails for cold outreach?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. These are publicly available business contact emails that companies have chosen to display. Standard cold email best practices apply: personalize, provide value, and include an unsubscribe option.',
            },
          },
          {
            '@type': 'Question',
            name: 'What if a listing does not have an email?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You still get the business phone number, website URL, and physical address. You can visit their website to find contact forms or use the phone number for direct outreach.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is this different from email finder tools like Hunter.io?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Email finder tools search for individual employee emails at a company. TheMapScraper extracts the public business contact email from Google Maps listings. They serve different purposes and can be used together.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/google-maps-data-scraper-csv/',
    title: 'Google Maps Data Scraper to CSV. Export Clean Data Instantly',
    description:
      'Scrape Google Maps data and export to CSV instantly. Clean columns, ready for Excel, Google Sheets, or CRM import. No coding, no extension. Free to try.',
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Google Maps Data Scraper to CSV', url: `${BASE}/google-maps-data-scraper-csv/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What columns does the CSV include?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The CSV includes: Business Name, Phone Number, Email, Full Address, Website URL, Google Rating, Review Count, Business Category, Opening Hours, and Google Maps URL. All organized in separate columns.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I open the CSV in Excel or Google Sheets?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The CSV file uses standard UTF-8 encoding with comma separation. It opens correctly in Microsoft Excel, Google Sheets, LibreOffice Calc, Apple Numbers, or any spreadsheet application.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are there duplicate entries in the export?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. TheMapScraper automatically deduplicates results so each business appears only once in your CSV file.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I import the CSV into my CRM?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The CSV format is universally supported by CRMs including HubSpot, Salesforce, Pipedrive, Zoho, Close, and others. Use their CSV import feature and map the columns.',
            },
          },
          {
            '@type': 'Question',
            name: 'What encoding does the CSV use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'UTF-8 encoding, which correctly handles international characters, accents, and special symbols in business names and addresses.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/google-maps-business-scraper-free/',
    title: 'Free Google Maps Scraper. Extract Business Data at No Cost',
    description:
      'Free Google Maps scraper with no extension required. Extract business names, phones, emails and addresses. Download CSV. No credit card, no setup. Start free.',
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Free Google Maps Business Scraper', url: `${BASE}/google-maps-business-scraper-free/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is TheMapScraper really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The free plan gives you 50 leads per month with all data fields and CSV download included. No watermarks, no hidden limitations on data quality. Upgrade anytime if you need higher volumes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need a credit card to start?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Create an account and start extracting leads immediately without any payment information.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the limits of the free plan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The free plan includes 50 lead extractions per month. All data fields (names, phones, emails, addresses, ratings) are included. No credit card required. Unused leads do not roll over.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is the data quality different on the free plan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. You get the exact same data quality and fields on the free plan as on paid plans. The only difference is the number of extractions per month.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I upgrade later?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. You can upgrade to a premium plan anytime from your dashboard. Your existing data and account settings are preserved.',
            },
          },
        ],
      },
    ],
  },

  // ── Alternatives ───────────────────────────────────────────────────────────
  {
    path: '/alternatives/',
    title: 'TheMapScraper Alternatives and Comparisons [2026]',
    description:
      'Compare TheMapScraper with Apify, Outscraper, and Scrap.io. Side-by-side features, pricing, and ease of use for Google Maps scraping tools.',
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Alternatives', url: `${BASE}/alternatives/` },
      ]),
    ],
  },
  {
    path: '/alternatives/apify/',
    title: 'Apify Google Maps Scraper Alternative: TheMapScraper vs Apify [2026]',
    description:
      'Looking for a free Apify alternative for Google Maps? Compare TheMapScraper vs Apify on pricing, features and ease of use. No code, instant CSV, 50 free leads/month.',
    renderSsr: true,
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Alternatives', url: `${BASE}/alternatives/` },
        { name: 'vs Apify', url: `${BASE}/alternatives/apify/` },
      ]),
      softwareApplication,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is there a free Apify alternative for Google Maps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. TheMapScraper offers a free tier with 50 leads per month and no credit card required. It is purpose-built for Google Maps and requires no technical setup, making it a simple alternative to Apify's actor-based system for users who only need Google Maps data.",
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between TheMapScraper and Apify?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TheMapScraper is a focused, no-code tool built specifically for Google Maps scraping. Apify is a general-purpose scraping platform with 8,000+ actors for scraping virtually any website. TheMapScraper is faster to start and simpler to use; Apify offers more power and flexibility for developers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Apify have a free plan for Google Maps scraping?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Apify offers $5 in free monthly credits, which covers roughly 500–5,000 Google Maps listings depending on the actor used. TheMapScraper offers 50 free leads per month with no time limit and no credit card required, making it a straightforward option for small-scale use.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/alternatives/outscraper/',
    title: 'Outscraper Alternative: TheMapScraper vs Outscraper [2026 Comparison]',
    description:
      'Compare TheMapScraper and Outscraper for Google Maps lead generation. Free alternative with no credit system — extract emails, phones and addresses instantly.',
    renderSsr: true,
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Alternatives', url: `${BASE}/alternatives/` },
        { name: 'vs Outscraper', url: `${BASE}/alternatives/outscraper/` },
      ]),
      softwareApplication,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is there a free Outscraper alternative?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. TheMapScraper offers 50 free leads per month from Google Maps with no credit card required and no time limit. It is a simpler, subscription-based alternative for users who want predictable pricing instead of Outscraper's pay-as-you-go model.",
            },
          },
          {
            '@type': 'Question',
            name: 'What is Outscraper used for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Outscraper is a data extraction platform used for scraping Google Maps, Google Search, reviews, Amazon, and 50+ other sources. It is popular for lead generation, market research, and business intelligence, particularly among teams that need enriched contact data.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does TheMapScraper compare to Outscraper pricing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Outscraper uses pay-as-you-go pricing at approximately $3 per 1,000 Google Maps records, with email enrichment costing an additional $3–11 per 1,000. TheMapScraper uses a simple monthly subscription, which is easier to budget and avoids the unpredictable costs of stacking Outscraper's enrichment services.",
            },
          },
        ],
      },
    ],
  },
  {
    path: '/alternatives/scrap-io/',
    title: 'Scrap.io Alternative: TheMapScraper vs Scrap.io [2026 Comparison]',
    description:
      'TheMapScraper is a free Scrap.io alternative for Google Maps scraping. Compare pricing and features. Clean CSV in seconds, no extension needed.',
    renderSsr: true,
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Alternatives', url: `${BASE}/alternatives/` },
        { name: 'vs Scrap.io', url: `${BASE}/alternatives/scrap-io/` },
      ]),
      softwareApplication,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is Scrap.io free to use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Scrap.io offers a 7-day free trial with up to 100 leads. After the trial, plans start at €49 per month. TheMapScraper offers 50 free leads per month permanently with no time limit and no credit card required.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the best free Scrap.io alternative?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "TheMapScraper is a strong free alternative to Scrap.io for basic Google Maps lead extraction. It offers 50 leads per month at no cost with no credit card required. While it lacks Scrap.io's advanced filtering and country-level scraping, it is faster to set up and more affordable for smaller-scale use.",
            },
          },
          {
            '@type': 'Question',
            name: 'How is TheMapScraper different from Scrap.io?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Both tools extract business data from Google Maps. Scrap.io offers more advanced filtering — rating ranges, review counts, ad pixel detection — and country-level scraping, while TheMapScraper focuses on simplicity and speed with instant setup and lower pricing. TheMapScraper is better for quick lead extraction; Scrap.io is better for highly targeted lists at scale.',
            },
          },
        ],
      },
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
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Use Cases', url: `${BASE}/use-cases/` },
        { name: 'Real Estate', url: `${BASE}/use-cases/real-estate/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What real estate businesses can I find on Google Maps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can find real estate agents, brokerages, property management companies, real estate investors, appraisers, mortgage brokers, title companies, home inspectors, and any other real estate-related business that has a Google Business Profile.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does the data include email addresses?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Email addresses are extracted when the business has published them on their Google Business Profile. Typically 30-60% of real estate listings include email addresses. You also get phone numbers and websites for every listing.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I search for real estate leads in any city?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. TheMapScraper works anywhere Google Maps covers. You can search for real estate businesses in any city, state, or country.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many real estate leads can I get?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It depends on the market size. A search for "real estate agents in New York" will return hundreds of results. Smaller cities may return 20-50. The free tier includes 50 leads per month.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/use-cases/marketing-agencies/',
    title: 'Google Maps Scraper for Marketing Agencies. Find Clients',
    description:
      'Use TheMapScraper to find local businesses that need marketing services. Extract contacts from Google Maps, prospect estate agents, and build client lists.',
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Use Cases', url: `${BASE}/use-cases/` },
        { name: 'Marketing Agencies', url: `${BASE}/use-cases/marketing-agencies/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I find businesses that need marketing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Search for any business category on Google Maps. Look for businesses with low ratings (3-4 stars), few reviews, or no website listed. These are businesses that could benefit from marketing services.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I find businesses without websites?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TheMapScraper extracts the website field for each listing. If a business does not have a website on their Google profile, that field will be empty in your CSV. Filter for empty website fields to find businesses that need web design.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many leads can I get per city?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It depends on the city and business category. A search for "restaurants in Los Angeles" could return hundreds of results. The free tier includes 50 leads per month.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the best way to approach local businesses?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Personalized outreach works best. Reference their business name, location, and a specific observation (like their Google rating or lack of website). Generic mass emails have very low response rates.',
            },
          },
        ],
      },
    ],
  },

  // ── Blog ───────────────────────────────────────────────────────────────────
  {
    path: '/blog/',
    title: 'Google Maps Scraping Blog — Guides, Tips & Tools | TheMapScraper',
    description:
      'Guides and tutorials on Google Maps scraping, lead generation, and business data extraction. Learn how to extract leads without code.',
    renderSsr: true,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'TheMapScraper Blog',
        url: `${BASE}/blog/`,
        description: 'Guides and tutorials on Google Maps scraping and lead generation',
      },
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
    renderSsr: true,
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Blog', url: `${BASE}/blog/` },
        {
          name: 'How to Scrape Google Maps in 2026 (No Code, No Setup)',
          url: `${BASE}/blog/how-to-scrape-google-maps/`,
        },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to Scrape Google Maps in 2026 (No Code, No Setup)',
        url: `${BASE}/blog/how-to-scrape-google-maps/`,
        datePublished: '2026-05-01',
        dateModified: '2026-05-31',
        author: { '@type': 'Organization', name: 'TheMapScraper' },
        publisher: {
          '@type': 'Organization',
          name: 'TheMapScraper',
          logo: { '@type': 'ImageObject', url: `${BASE}/og-image.png` },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is Google Maps scraping free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Some tools offer free tiers. TheMapScraper includes 50 free leads per month with no credit card required. Python-based methods are free to run but require technical knowledge and ongoing proxy costs.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many businesses can I scrape at once?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It depends on the tool and the search query. TheMapScraper can extract hundreds of listings in a single search. The number of results depends on how many businesses match your query in that location.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I get email addresses from Google Maps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, when businesses have published their email on their Google Business Profile. Not all listings include emails. Typically 30 to 60 percent have email addresses depending on the industry.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the best Google Maps scraper?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It depends on your needs. For non-technical users who want quick results, TheMapScraper offers the simplest experience. For developers, Apify provides more customization. For enriched data, Outscraper adds phone validation and email discovery. See our full comparison at /alternatives/.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need a browser extension?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Not with TheMapScraper. It works directly in your browser with no installation required. Some other tools like MapLeadScraper and G Maps Extractor are Chrome extensions that do require installation.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/blog/best-google-maps-scrapers/',
    title: '7 Best Google Maps Scrapers Compared [2026]',
    description:
      'Honest comparison of the best Google Maps scrapers in 2026. TheMapScraper, Apify, Outscraper, Scrap.io, and more. Features, pricing, and who each tool is best for.',
    renderSsr: true,
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Blog', url: `${BASE}/blog/` },
        {
          name: '7 Best Google Maps Scrapers Compared [2026]',
          url: `${BASE}/blog/best-google-maps-scrapers/`,
        },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '7 Best Google Maps Scrapers Compared [2026]',
        url: `${BASE}/blog/best-google-maps-scrapers/`,
        datePublished: '2026-05-01',
        dateModified: '2026-05-31',
        author: { '@type': 'Organization', name: 'TheMapScraper' },
        publisher: {
          '@type': 'Organization',
          name: 'TheMapScraper',
          logo: { '@type': 'ImageObject', url: `${BASE}/og-image.png` },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the best free Google Maps scraper?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For non-technical users, TheMapScraper offers 50 free leads per month with no credit card required. For developers, open source options like the omkarcloud Google Maps scraper are completely free but require Python knowledge and proxy management.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do Google Maps scrapers extract emails?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Some do, but not all listings include email addresses. TheMapScraper and Outscraper extract emails when available on the listing. Outscraper also offers a separate email enrichment add-on. Typically 30 to 60 percent of listings include emails depending on the industry.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are Chrome extension scrapers reliable?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Chrome extensions work well for small extractions but have real limitations. They break when Google Maps updates its frontend, are typically limited to around 120 results per search, and require your browser to stay open during scraping.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which scraper is cheapest for high volume?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'At very high volumes (100,000 or more records per month), Outscraper and Apify both offer volume discounts that make per-record pricing competitive. For low to medium volumes, a flat subscription like TheMapScraper is typically more predictable.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/blog/google-maps-lead-generation-guide/',
    title: 'Google Maps Lead Generation: The Complete Guide [2026]',
    description:
      'Learn how to use Google Maps for B2B lead generation. From finding prospects to closing deals. Strategies, tools, and real examples for sales teams and agencies.',
    renderSsr: true,
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Blog', url: `${BASE}/blog/` },
        {
          name: 'Google Maps Lead Generation: The Complete Guide [2026]',
          url: `${BASE}/blog/google-maps-lead-generation-guide/`,
        },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Google Maps Lead Generation: The Complete Guide [2026]',
        url: `${BASE}/blog/google-maps-lead-generation-guide/`,
        datePublished: '2026-05-01',
        dateModified: '2026-05-31',
        author: { '@type': 'Organization', name: 'TheMapScraper' },
        publisher: {
          '@type': 'Organization',
          name: 'TheMapScraper',
          logo: { '@type': 'ImageObject', url: `${BASE}/og-image.png` },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How many leads can I get from Google Maps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It depends on the market. A search for "restaurants in New York" returns hundreds of results. Smaller cities and specific niches return 20 to 100. The free tier on TheMapScraper includes 50 leads per month to get started.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Google Maps better than LinkedIn for lead generation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'They serve different purposes. Google Maps is better for finding local and small businesses (restaurants, dentists, plumbers, local agencies). LinkedIn is better for targeting specific people at larger companies. Many sales teams use both.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I get emails from Google Maps listings?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TheMapScraper extracts emails when businesses have published them on their Google profile. Typically 30 to 60 percent of listings include emails. For the rest, you can visit their website or use an email finder tool.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a good response rate for Google Maps leads?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'With personalized outreach, expect 5 to 15 percent reply rates for cold email and 10 to 20 percent connection rates on cold calls. Generic mass emails get under 2 percent. Personalization using the business name, rating, and location data makes the biggest difference.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need to pay for a scraping tool?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Not necessarily. TheMapScraper offers 50 free leads per month with no credit card required. That is enough to test the workflow and see results before committing to a paid plan.',
            },
          },
        ],
      },
    ],
  },

  {
    path: '/blog/google-maps-scraper-api/',
    title: 'Google Maps Scraper API: How to Extract Data Programmatically [2026]',
    description:
      'Access Google Maps data via API. Compare the official Google Places API vs scraper APIs from Apify, Outscraper, and more. Pricing, limits, and when to skip the API entirely.',
    renderSsr: true,
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Blog', url: `${BASE}/blog/` },
        {
          name: 'Google Maps Scraper API',
          url: `${BASE}/blog/google-maps-scraper-api/`,
        },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Google Maps Scraper API: How to Extract Data Programmatically [2026]',
        url: `${BASE}/blog/google-maps-scraper-api/`,
        datePublished: '2026-06-01',
        dateModified: '2026-06-01',
        author: { '@type': 'Organization', name: 'TheMapScraper' },
        publisher: {
          '@type': 'Organization',
          name: 'TheMapScraper',
          logo: { '@type': 'ImageObject', url: `${BASE}/og-image.png` },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is the Google Places API free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You get $200 per month in free credit from Google, which covers roughly 11,000 Place Details requests. After that, costs scale with usage at around $17 per 1,000 requests for Place Details.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I get emails through the Google Maps API?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The official Google Places API does not return email addresses. Scraper APIs and no-code tools that enrich data by visiting business websites can extract emails when they are published there.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the cheapest way to get Google Maps data?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "For small volumes, TheMapScraper's free tier gives you 50 leads per month with no credit card required. For large volumes, scraper APIs like Apify or Outscraper offer better per-unit pricing than the official Places API.",
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need coding skills to use a Google Maps scraper API?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. All API options require programming knowledge to authenticate, make requests, handle pagination, and parse responses. If you do not code, a no-code tool like TheMapScraper gives you the same CSV output without writing any code.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/blog/scrape-google-maps-reviews/',
    title: 'How to Scrape Google Maps Reviews: Complete Guide [2026]',
    description:
      'Extract Google Maps reviews at scale. Learn how to scrape review text, ratings, dates, and reviewer data. Tools, methods, and use cases for review analysis.',
    renderSsr: true,
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Blog', url: `${BASE}/blog/` },
        {
          name: 'How to Scrape Google Maps Reviews',
          url: `${BASE}/blog/scrape-google-maps-reviews/`,
        },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to Scrape Google Maps Reviews: Complete Guide [2026]',
        url: `${BASE}/blog/scrape-google-maps-reviews/`,
        datePublished: '2026-06-01',
        dateModified: '2026-06-01',
        author: { '@type': 'Organization', name: 'TheMapScraper' },
        publisher: {
          '@type': 'Organization',
          name: 'TheMapScraper',
          logo: { '@type': 'ImageObject', url: `${BASE}/og-image.png` },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can I scrape all reviews for a business?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, but it takes time for businesses with thousands of reviews. Start with the overview data — total review count, average rating, and review tags — to decide which businesses are worth deeper analysis before committing to a full review extraction.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need coding skills to scrape reviews?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. TheMapScraper extracts review overview data — counts, ratings, and review tags — without any code. For full individual review text extraction across thousands of businesses, tools like Apify also offer no-code interfaces.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I export review data to CSV?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. TheMapScraper exports review count, average star rating, and review tags to CSV alongside the full business contact record. Dedicated review scrapers export the full text, reviewer name, date, and rating for each individual review.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is scraping Google Maps reviews legal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Scraping publicly available data is generally permitted under current US case law, including the hiQ v. LinkedIn precedent. Reviews on Google Maps are public by default. Avoid republishing reviews under your own name, collecting personal data without legitimate purpose, or violating GDPR in the EU.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/blog/google-maps-scraper-extension-vs-web-app/',
    title: 'Google Maps Scraper Extension vs Web App: What to Use in 2026',
    description:
      'Chrome extensions for Google Maps scraping are convenient but fragile. Compare extension-based scrapers vs web app scrapers and choose the right tool for your workflow.',
    renderSsr: true,
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Blog', url: `${BASE}/blog/` },
        {
          name: 'Google Maps Scraper Extension vs Web App',
          url: `${BASE}/blog/google-maps-scraper-extension-vs-web-app/`,
        },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Google Maps Scraper Extension vs Web App: What to Use in 2026',
        url: `${BASE}/blog/google-maps-scraper-extension-vs-web-app/`,
        datePublished: '2026-05-31',
        dateModified: '2026-05-31',
        author: { '@type': 'Organization', name: 'TheMapScraper' },
        publisher: {
          '@type': 'Organization',
          name: 'TheMapScraper',
          logo: { '@type': 'ImageObject', url: `${BASE}/og-image.png` },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can I use a Chrome extension to scrape Google Maps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, several Chrome extensions exist for this purpose — MapLeadScraper and G Maps Extractor are the most commonly used. They work by scraping the visible listings as you browse Google Maps. The limitation is that they are fragile: Google Maps UI updates break them regularly, and most cap at 120 results per search.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the best Google Maps scraper extension?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MapLeadScraper and G Maps Extractor are the most widely used Chrome extensions for Google Maps scraping. For users who want something that does not require installation or staying at their computer, a web app like TheMapScraper extracts the same data without the limitations of browser extensions.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do Google Maps Chrome extensions break frequently?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Chrome extensions that scrape Google Maps depend on the structure of the rendered page. Google updates its Maps frontend regularly, and each update can silently break an extension. Extension developers typically release a fix within days or weeks, but in the meantime the tool stops working entirely.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between a web app scraper and a Chrome extension scraper?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A Chrome extension runs inside your browser and scrapes the page you are viewing. A web app scraper runs on a server, sends structured queries to Google Maps, and returns the results. Web apps are more stable, faster, and do not require your browser to stay open.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is TheMapScraper a browser extension?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. TheMapScraper is a web application that runs entirely in your browser without any installation. You visit the website, type your search query, and receive a CSV of leads. No Chrome extension, no plugin, no setup required.',
            },
          },
        ],
      },
    ],
  },

  // ── Scrape / Industry leads ────────────────────────────────────────────────
  {
    path: '/scrape/restaurant-leads/',
    title: 'Scrape Restaurant Leads from Google Maps | Sample Data',
    description:
      'Extract restaurant leads from Google Maps. See real sample data: 2,847 businesses with phone numbers, emails, websites, and ratings. Try free.',
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Scrape', url: `${BASE}/scrape/` },
        { name: 'Restaurant Leads', url: `${BASE}/scrape/restaurant-leads/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How many restaurants can I scrape per city?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Google Maps typically lists 200–800 restaurants per city search, depending on the city size and how specific your query is. For major metros like New York or Los Angeles, broad searches return hundreds of results per neighborhood.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I get email addresses for restaurants?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. TheMapScraper enriches each restaurant listing by visiting the business website and extracting contact emails. About 48% of restaurant listings return a verified email address.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is it legal to scrape restaurant data from Google Maps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Extracting publicly available business information—names, addresses, phone numbers, and websites that businesses have chosen to publish—is generally considered legal. The data is the same information you see when you search Google Maps manually.',
            },
          },
          {
            '@type': 'Question',
            name: 'What format is the restaurant data exported in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All data downloads as a standard CSV file compatible with Excel, Google Sheets, and any CRM including HubSpot, Salesforce, and Pipedrive.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/scrape/dentist-leads/',
    title: 'Scrape Dentist Leads from Google Maps | Sample Data',
    description:
      'Extract dentist leads from Google Maps. See real sample data: 1,923 businesses with phone numbers, emails, websites, and ratings. Try free.',
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Scrape', url: `${BASE}/scrape/` },
        { name: 'Dentist Leads', url: `${BASE}/scrape/dentist-leads/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How many dentists can I scrape per city?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Google Maps typically lists 150–500 dental practices per city search. For large metros, you can narrow by specialty—"orthodontists," "pediatric dentists," or "oral surgeons"—to get a more targeted list.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I get email addresses for dental practices?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. TheMapScraper visits each practice's website to extract contact emails. Around 52% of dental practice listings return a verified email address, typically an appointment or front-desk contact.",
            },
          },
          {
            '@type': 'Question',
            name: 'Is it legal to scrape dentist data from Google Maps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Business contact information that dental practices have published on their Google Business Profile is public data. Extracting it for B2B outreach is a standard and legally accepted practice.',
            },
          },
          {
            '@type': 'Question',
            name: 'What format is the dentist data exported in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All data downloads as a CSV file compatible with Excel, Google Sheets, HubSpot, Salesforce, or any CRM that accepts CSV imports.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/scrape/plumber-leads/',
    title: 'Scrape Plumber Leads from Google Maps | Sample Data',
    description:
      'Extract plumber leads from Google Maps. See real sample data: 1,641 businesses with phone numbers, emails, websites, and ratings. Try free.',
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Scrape', url: `${BASE}/scrape/` },
        { name: 'Plumber Leads', url: `${BASE}/scrape/plumber-leads/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How many plumbers can I scrape per city?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Google Maps typically lists 100–400 plumbing companies per city search. You can refine by specialty—"drain cleaning," "emergency plumber," or "commercial plumbing"—to get more targeted results.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I get email addresses for plumbing companies?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. TheMapScraper visits each company's website to find contact emails. Around 44% of plumbing listings return a verified email address, typically a dispatch or office contact.",
            },
          },
          {
            '@type': 'Question',
            name: 'Is it legal to scrape plumber data from Google Maps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Contact information that plumbing companies have voluntarily published on their Google Business Profile is publicly available data. Extracting it for B2B prospecting is a standard business practice.',
            },
          },
          {
            '@type': 'Question',
            name: 'What format is the plumber data exported in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All data downloads as a CSV file ready for Excel, Google Sheets, or any CRM including HubSpot, Salesforce, or Zoho.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/scrape/lawyer-leads/',
    title: 'Scrape Lawyer Leads from Google Maps | Sample Data',
    description:
      'Extract lawyer leads from Google Maps. See real sample data: 2,104 businesses with phone numbers, emails, websites, and ratings. Try free.',
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Scrape', url: `${BASE}/scrape/` },
        { name: 'Lawyer Leads', url: `${BASE}/scrape/lawyer-leads/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How many lawyers can I scrape per city?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Google Maps typically lists 200–600 law firms per city search. You can narrow by practice area—"divorce lawyers," "criminal defense attorneys," or "immigration lawyers"—for more targeted results.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I get email addresses for law firms?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. TheMapScraper visits each firm's website to extract contact emails. About 61% of law firm listings return a verified email address, higher than most industries due to the prevalence of professional websites.",
            },
          },
          {
            '@type': 'Question',
            name: 'Is it legal to scrape lawyer data from Google Maps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Attorney contact information published on Google Business Profile is public data. Many state bar associations also publish similar directories publicly. Extracting this for B2B prospecting is a standard and legal practice.',
            },
          },
          {
            '@type': 'Question',
            name: 'What format is the lawyer data exported in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All data downloads as a standard CSV compatible with Excel, Google Sheets, HubSpot, Salesforce, Clio, and any other platform that accepts CSV imports.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/scrape/real-estate-agent-leads/',
    title: 'Scrape Real Estate Agent Leads from Google Maps | Sample Data',
    description:
      'Extract real estate agent leads from Google Maps. See real sample data: 3,218 businesses with phone numbers, emails, websites, and ratings. Try free.',
    renderSsr: true,
    schemas: [
      softwareApplication,
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Scrape', url: `${BASE}/scrape/` },
        { name: 'Real Estate Agent Leads', url: `${BASE}/scrape/real-estate-agent-leads/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How many real estate agents can I scrape per city?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Google Maps typically lists 300–900 real estate agencies per city. You can refine by specialty—"luxury real estate," "commercial realtors," or "property management"—to get a more targeted list for your outreach.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I get email addresses for real estate agencies?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. TheMapScraper enriches each listing by visiting the agency website and extracting contact emails. About 57% of real estate listings return a verified email address.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is it legal to scrape real estate agent data from Google Maps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Agent contact information published on Google Business Profile is public data. Real estate agents intentionally make their contact details visible to attract clients—using this data for B2B outreach is entirely standard.',
            },
          },
          {
            '@type': 'Question',
            name: 'What format is the real estate agent data exported in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All data downloads as a CSV file compatible with Excel, Google Sheets, Follow Up Boss, LionDesk, HubSpot, or any other CRM that accepts CSV imports.',
            },
          },
        ],
      },
    ],
  },

  // ── About ─────────────────────────────────────────────────────────────────
  {
    path: '/about/',
    title: 'About TheMapScraper | Built for Sales Teams and Agencies',
    description:
      'TheMapScraper was built to make Google Maps lead generation simple. No code, no extensions, no API keys. Learn about our mission and how the tool works.',
    renderSsr: true,
    schemas: [
      breadcrumb([
        { name: 'Home', url: `${BASE}/` },
        { name: 'About', url: `${BASE}/about/` },
      ]),
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
