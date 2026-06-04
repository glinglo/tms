export interface SampleRow {
  name: string
  phone: string
  address: string
  rating: number
  reviews: number
  website: string
  email: string
}

export interface IndustryConfig {
  slug: string
  name: string
  plural: string
  path: string
  metaTitle: string
  metaDescription: string
  badge: string
  h1: string
  subtitle: string
  stats: {
    total: string
    emailPct: string
    websitePct: string
    avgRating: string
  }
  sampleData: SampleRow[]
  whyH2: string
  whyParagraphs: string[]
  howSteps: { n: string; title: string; desc: string }[]
  faqs: { question: string; answer: string }[]
  related: { label: string; to: string }[]
  cityPages?: { label: string; to: string }[]
}

export const industries: IndustryConfig[] = [
  // ── Restaurants ───────────────────────────────────────────────────────────
  {
    slug: 'restaurant-leads',
    name: 'Restaurant',
    plural: 'restaurants',
    path: '/scrape/restaurant-leads/',
    metaTitle: 'Scrape Restaurant Leads from Google Maps | Sample Data',
    metaDescription:
      'Extract restaurant leads from Google Maps. See real sample data from 17,600+ restaurants in New York with phone numbers, emails, websites, and ratings. Try free.',
    badge: '17,600+ restaurants scraped',
    h1: 'Scrape Restaurant Leads from Google Maps',
    subtitle:
      "See real data from 17,600+ restaurants in New York. Extract phone numbers, emails, websites, and addresses — here's a sample of what you'll get.",
    stats: {
      total: '17,600+',
      emailPct: '64%',
      websitePct: '100%',
      avgRating: '4.5',
    },
    sampleData: [
      { name: 'The Victoria Theater Restaurant', phone: '(332) 266-****', address: '233 W 125th St, New York, NY 10027', rating: 4.3, reviews: 598, website: 'victoriatheater*****.com', email: 'bookings@victoria*****.com' },
      { name: "Rosa's At Park", phone: '(929) 502-****', address: '2568 Park Ave, Bronx, NY 10451', rating: 4.3, reviews: 570, website: 'rosaatpa*****.com', email: 'rosaatpark@gma*****.com' },
      { name: 'Suyo Gastrofusion', phone: '(718) 537-****', address: '1401 Plaza Dr, Bronx, NY 10452', rating: 4.5, reviews: 1191, website: 'suyon*****.com', email: 'rsvp@suyo*****.com' },
      { name: 'Caridad Restaurant', phone: '(212) 862-****', address: '3533 Broadway, New York, NY 10031', rating: 4.4, reviews: 1860, website: 'carid*****.com', email: 'contact@carid*****.com' },
      { name: 'THEP Thai Restaurant', phone: '(212) 899-****', address: '1439 2nd Ave, New York, NY 10021', rating: 4.8, reviews: 6807, website: 'thepnewy*****.com', email: 'info@thepnew*****.com' },
      { name: 'Morris Park Inn', phone: '(718) 239-****', address: '1024 Morris Park Ave, Bronx, NY 10461', rating: 4.6, reviews: 210, website: 'morrisparki*****.com', email: 'themorrisparkinn@gma*****.com' },
      { name: 'RIPPERS', phone: '—', address: '86-01 Shore Front Pkwy, Rockaway Beach, NY', rating: 4.4, reviews: 904, website: 'rippers*****.com', email: 'chris@rippers*****.com' },
      { name: 'Shake Shack', phone: '—', address: '3-03 30th St, Queens, NY 10001', rating: 3.8, reviews: 4358, website: 'shakesh*****.com', email: '—' },
      { name: 'LavieMex', phone: '(347) 293-****', address: '4001 E Tremont Ave, Bronx, NY 10465', rating: 4.3, reviews: 391, website: 'laviemex*****.com', email: '—' },
      { name: 'Oasis', phone: '(718) 318-****', address: '92-08 Rockaway Beach Blvd, Far Rockaway, NY', rating: 4.7, reviews: 295, website: 'oasisrock*****.com', email: '—' },
    ],
    whyH2: 'Why Scrape Restaurant Data from Google Maps?',
    whyParagraphs: [
      'Google Maps is the most comprehensive public directory of restaurants in existence, updated in real time by business owners and diners. For food-tech platforms, reservation software companies, and delivery aggregators, having an accurate, up-to-date list of every restaurant in a target market is the foundation of their go-to-market strategy.',
      "Food delivery platforms like new regional entrants use restaurant lead data to identify which establishments are not yet on a delivery service and reach out proactively. Getting a restaurant's phone number, website, and owner email from Google Maps in seconds—instead of calling each one manually—turns a week-long research task into a one-hour sprint.",
      'Restaurant-focused marketing agencies and POS software vendors use this data to build hyper-targeted prospect lists. By filtering for restaurants with low review counts or below-average ratings, agencies can identify businesses that are actively struggling and most likely to invest in marketing or operational tools.',
      'Franchise development teams and commercial real estate brokers also rely on restaurant lead data to understand competitive density in a given neighborhood before making site selection or investment decisions. TheMapScraper makes it possible to extract every restaurant in a zip code in under two minutes.',
    ],
    howSteps: [
      { n: '01', title: 'Enter "restaurants" and your target city', desc: 'Type "restaurants in Chicago" or "pizza restaurants in Brooklyn" into TheMapScraper search box.' },
      { n: '02', title: 'Click scrape and wait ~2 minutes', desc: 'TheMapScraper pulls every matching result from Google Maps including contact details and ratings.' },
      { n: '03', title: 'Download your CSV with all business data', desc: 'Get a clean spreadsheet with names, phones, emails, websites, addresses, ratings, and review counts.' },
    ],
    faqs: [
      { question: 'How many restaurants can I scrape per city?', answer: 'Google Maps typically lists 200–800 restaurants per city search, depending on the city size and how specific your query is. For major metros like New York or Los Angeles, broad searches return hundreds of results per neighborhood.' },
      { question: 'Can I get email addresses for restaurants?', answer: 'Yes. TheMapScraper enriches each restaurant listing by visiting the business website and extracting contact emails. About 64% of restaurant listings in New York return a verified email address.' },
      { question: 'Is it legal to scrape restaurant data from Google Maps?', answer: 'Extracting publicly available business information—names, addresses, phone numbers, and websites that businesses have chosen to publish—is generally considered legal. The data is the same information you see when you search Google Maps manually.' },
      { question: 'What format is the restaurant data exported in?', answer: 'All data downloads as a standard CSV file compatible with Excel, Google Sheets, and any CRM including HubSpot, Salesforce, and Pipedrive.' },
    ],
    related: [
      { label: 'Dentist Leads', to: '/scrape/dentist-leads/' },
      { label: 'Plumber Leads', to: '/scrape/plumber-leads/' },
      { label: 'Lawyer Leads', to: '/scrape/lawyer-leads/' },
      { label: 'Real Estate Agent Leads', to: '/scrape/real-estate-agent-leads/' },
    ],
  },

  // ── Dentists ──────────────────────────────────────────────────────────────
  {
    slug: 'dentist-leads',
    name: 'Dentist',
    plural: 'dentists',
    path: '/scrape/dentist-leads/',
    metaTitle: 'Scrape Dentist Leads from Google Maps | Sample Data',
    metaDescription:
      'Extract dentist leads from Google Maps. See real sample data from 4,200+ dentists in Miami with phone numbers, emails, websites, and ratings. Try free.',
    badge: '4,200+ dental practices scraped',
    h1: 'Scrape Dentist Leads from Google Maps',
    subtitle:
      "See real data from 4,200+ dentists in Miami. Extract phone numbers, emails, websites, and addresses — here's a sample of what you'll get.",
    stats: {
      total: '4,200+',
      emailPct: '62%',
      websitePct: '100%',
      avgRating: '4.7',
    },
    sampleData: [
      { name: 'Miro Dental Centers of Coral Gables', phone: '(954) 737-****', address: '564 SW 42nd Ave, Coral Gables, FL', rating: 4.7, reviews: 430, website: 'miroden*****.com', email: 'kmdo780@ao*****.com' },
      { name: 'Fortune Smiles Dental', phone: '(786) 542-****', address: '1843 SW 8th St, Miami, FL 33135', rating: 4.5, reviews: 66, website: 'fortunesmi*****.dental', email: 'frontdesk@fortunesmi*****.dental' },
      { name: 'Paya Dental', phone: '(305) 541-****', address: '2143 NW 7th St, Miami, FL 33125', rating: 4.5, reviews: 359, website: 'payaden*****.com', email: 'hialeah@payad*****.com' },
      { name: 'Minorca Smiles', phone: '(305) 443-****', address: '2030 Douglas Rd STE 110, Coral Gables, FL', rating: 5.0, reviews: 129, website: 'minorcasmi*****.com', email: 'raydelcastillodds@gm*****.com' },
      { name: 'Sky Dental Smiles', phone: '(863) 263-****', address: '5040 NW 7th St Suite 632, Miami, FL', rating: 4.9, reviews: 664, website: 'skydentalmi*****.com', email: 'skydentalmiami@gm*****.com' },
      { name: 'Family Plus Dental Centers', phone: '(305) 888-****', address: '4300 W Flagler St #201, Coral Gables, FL', rating: 4.1, reviews: 161, website: 'familyplus*****.com', email: 'info@familyplus*****.com' },
      { name: 'My Smile Miami', phone: '(305) 444-****', address: '782 NW 42nd Ave #633, Miami, FL 33126', rating: 5.0, reviews: 1559, website: 'drmar*****.com', email: 'info@drmar*****.com' },
      { name: 'Neel Patel, MD, FACS', phone: '(305) 390-****', address: '3641 S Miami Ave Suite 170, Miami, FL', rating: 4.6, reviews: 31, website: 'neelpa*****.com', email: '—' },
      { name: 'Vizcaya Dental Arts', phone: '(305) 568-****', address: '3683 S Miami Ave STE 305, Miami, FL', rating: 5.0, reviews: 89, website: 'vizcayadent*****.com', email: '—' },
      { name: 'Timeless Health', phone: '(786) 490-****', address: '3661 S Miami Ave #604, Miami, FL 33133', rating: 4.7, reviews: 119, website: 'timelesshea*****.com', email: '—' },
    ],
    whyH2: 'Why Scrape Dentist Data from Google Maps?',
    whyParagraphs: [
      'Dental practices represent one of the most valuable B2B lead segments for healthcare marketing agencies, dental software vendors, and supply companies. Every dental office needs practice management software, patient communication tools, insurance credentialing services, and a steady flow of new patients—making them receptive to targeted outreach.',
      'Dental marketing agencies use Google Maps data to identify practices in underserved areas with few reviews, outdated websites, or missing contact information. These signals indicate practices that are not actively investing in their online presence and are therefore strong candidates for marketing services.',
      'Dental supply companies and equipment manufacturers use scraped dentist data to build regional sales territories and identify independent practices that are not yet under a group purchasing organization (GPO) contract. Reaching these practices before competitors do requires up-to-date contact information at scale.',
      'Patient acquisition platforms and dental insurance networks use dentist lead data to verify coverage networks, identify gaps in provider directories, and recruit new participating dentists. TheMapScraper makes it possible to build a complete list of dentists in any metro area in minutes, not days.',
    ],
    howSteps: [
      { n: '01', title: 'Enter "dentists" and your target city', desc: 'Type "dentists in Dallas" or "pediatric dentists in Seattle" into TheMapScraper search box.' },
      { n: '02', title: 'Click scrape and wait ~2 minutes', desc: 'TheMapScraper pulls every matching dental practice from Google Maps with full contact details.' },
      { n: '03', title: 'Download your CSV with all business data', desc: 'Get names, phones, emails, websites, addresses, ratings, and review counts ready for your outreach tool.' },
    ],
    faqs: [
      { question: 'How many dentists can I scrape per city?', answer: 'Google Maps typically lists 150–500 dental practices per city search. For large metros, you can narrow by specialty—"orthodontists," "pediatric dentists," or "oral surgeons"—to get a more targeted list.' },
      { question: 'Can I get email addresses for dental practices?', answer: "Yes. TheMapScraper visits each practice's website to extract contact emails. Around 62% of dental practice listings in Miami return a verified email address, typically an appointment or front-desk contact." },
      { question: 'Is it legal to scrape dentist data from Google Maps?', answer: 'Yes. Business contact information that dental practices have published on their Google Business Profile is public data. Extracting it for B2B outreach is a standard and legally accepted practice.' },
      { question: 'What format is the dentist data exported in?', answer: 'All data downloads as a CSV file compatible with Excel, Google Sheets, HubSpot, Salesforce, or any CRM that accepts CSV imports.' },
    ],
    related: [
      { label: 'Restaurant Leads', to: '/scrape/restaurant-leads/' },
      { label: 'Plumber Leads', to: '/scrape/plumber-leads/' },
      { label: 'Lawyer Leads', to: '/scrape/lawyer-leads/' },
      { label: 'Real Estate Agent Leads', to: '/scrape/real-estate-agent-leads/' },
    ],
    cityPages: [
      { label: 'New York', to: '/scrape/dentist-leads/new-york/' },
      { label: 'Miami', to: '/scrape/dentist-leads/miami/' },
      { label: 'Chicago', to: '/scrape/dentist-leads/chicago/' },
      { label: 'Los Angeles', to: '/scrape/dentist-leads/los-angeles/' },
      { label: 'Houston', to: '/scrape/dentist-leads/houston/' },
    ],
  },

  // ── Plumbers ──────────────────────────────────────────────────────────────
  {
    slug: 'plumber-leads',
    name: 'Plumber',
    plural: 'plumbers',
    path: '/scrape/plumber-leads/',
    metaTitle: 'Scrape Plumber Leads from Google Maps | Sample Data',
    metaDescription:
      'Extract plumber leads from Google Maps. See real sample data from 2,100+ plumbers in Miami with phone numbers, emails, websites, and ratings. Try free.',
    badge: '2,100+ plumbing companies scraped',
    h1: 'Scrape Plumber Leads from Google Maps',
    subtitle:
      "See real data from 2,100+ plumbers in Miami. Extract phone numbers, emails, websites, and addresses — here's a sample of what you'll get.",
    stats: {
      total: '2,100+',
      emailPct: '54%',
      websitePct: '100%',
      avgRating: '4.7',
    },
    sampleData: [
      { name: 'Miami 24/7 Plumbing - Miami Emergency Plumber', phone: '(305) 440-****', address: '1331 SW 32nd Ave #4, Miami, FL 33145', rating: 4.9, reviews: 231, website: 'miami247pl*****.com', email: 'info@miami247pl*****.com' },
      { name: 'Miami Water Heater', phone: '(305) 633-****', address: '1324 NW 29th St, Miami, FL 33142', rating: 4.7, reviews: 266, website: 'miamiwaterhe*****.com', email: 'sales@miamiwaterhe*****.com' },
      { name: 'Sewer Solutions', phone: '(305) 423-****', address: '1300 S Miami Ave Unit 4309, Miami, FL 33130', rating: 4.8, reviews: 83, website: 'sewersol*****.com', email: 'sewersolutionsfl@gm*****.com' },
      { name: 'Ez Plumbing Repair Services', phone: '(786) 239-****', address: '27 NW 10th Ave APT 101, Miami, FL 33128', rating: 5.0, reviews: 50, website: 'ezplumbi*****.com', email: 'ezplumbingrepair@icl*****.com' },
      { name: 'AKO Plumbing Corp.', phone: '(305) 269-****', address: '300 NW 22nd Ave, Miami, FL 33125', rating: 4.8, reviews: 37, website: 'akoplum*****.com', email: 'info@akoplum*****.com' },
      { name: 'Ringemann Plumbing, Inc.', phone: '(305) 635-****', address: '2190 NW 22nd Ct, Miami, FL 33142', rating: 3.7, reviews: 3, website: 'ringemann*****.com', email: 'ana.c.lacayo@ringe*****.com' },
      { name: 'Lion Plumbing Med LLC', phone: '(786) 751-****', address: 'Miami, FL', rating: 5.0, reviews: 8, website: 'lionplumb*****.com', email: 'info@lionplumb*****.com' },
      { name: 'Roto-Rooter Plumbing & Water Cleanup', phone: '(305) 661-****', address: '1726 NW 36th St Unit 3, Miami, FL 33142', rating: 4.7, reviews: 2288, website: 'rotoroo*****.com', email: '—' },
      { name: '2 Bros Plumbing', phone: '(305) 910-****', address: '6008 NW 6th Ave, Miami, FL 33127', rating: 4.8, reviews: 151, website: '2brosplum*****.com', email: '—' },
      { name: 'Express Mold Removal Miami', phone: '(305) 564-****', address: '3275 NW 37th St, Miami, FL 33142', rating: 5.0, reviews: 26, website: 'expressmoldm*****.com', email: '—' },
    ],
    whyH2: 'Why Scrape Plumber Data from Google Maps?',
    whyParagraphs: [
      'Plumbing companies are among the most sought-after leads for home services aggregators, insurance restoration contractors, and field service management (FSM) software vendors. Every plumber needs scheduling tools, insurance partnerships, and a pipeline of new jobs—making them highly receptive to B2B outreach if you can reach them with the right offer.',
      'Home warranty companies and property management firms use plumber lead data to build vetted vendor networks. Rather than relying on word-of-mouth or expensive referral platforms, they scrape Google Maps to identify licensed plumbers in each zip code, then contact them directly about joining their preferred contractor program.',
      'Field service software companies like those offering job scheduling, dispatch, and invoicing tools target plumbing companies specifically because the industry has notoriously low software adoption rates. A list of plumbers with websites and email addresses represents a directly reachable segment of companies ready to modernize their operations.',
      'Digital marketing agencies that specialize in home services use plumber data to identify businesses with outdated websites, no Google Ads presence, or below-average ratings—all signals that the business owner is underinvesting in customer acquisition and is likely open to a conversation about marketing services.',
    ],
    howSteps: [
      { n: '01', title: 'Enter "plumbers" and your target city', desc: 'Type "plumbers in Houston" or "emergency plumbers in Denver" into TheMapScraper search box.' },
      { n: '02', title: 'Click scrape and wait ~2 minutes', desc: 'TheMapScraper extracts every matching plumbing company from Google Maps with contact details and ratings.' },
      { n: '03', title: 'Download your CSV with all business data', desc: 'Get a complete spreadsheet with names, phones, emails, websites, addresses, and review data.' },
    ],
    faqs: [
      { question: 'How many plumbers can I scrape per city?', answer: 'Google Maps typically lists 100–400 plumbing companies per city search. You can refine by specialty—"drain cleaning," "emergency plumber," or "commercial plumbing"—to get more targeted results.' },
      { question: 'Can I get email addresses for plumbers?', answer: "Yes, about a third of plumbing businesses publish contact emails on their websites. TheMapScraper enriches each listing by visiting the business website to extract emails, phone numbers, and social media profiles. For plumbers without a published email, the phone number is usually the fastest way to connect." },
      { question: 'Is it legal to scrape plumber data from Google Maps?', answer: 'Yes. Contact information that plumbing companies have voluntarily published on their Google Business Profile is publicly available data. Extracting it for B2B prospecting is a standard business practice.' },
      { question: 'What format is the plumber data exported in?', answer: 'All data downloads as a CSV file ready for Excel, Google Sheets, or any CRM including HubSpot, Salesforce, or Zoho.' },
    ],
    related: [
      { label: 'Restaurant Leads', to: '/scrape/restaurant-leads/' },
      { label: 'Dentist Leads', to: '/scrape/dentist-leads/' },
      { label: 'Lawyer Leads', to: '/scrape/lawyer-leads/' },
      { label: 'Real Estate Agent Leads', to: '/scrape/real-estate-agent-leads/' },
    ],
  },

  // ── Lawyers ───────────────────────────────────────────────────────────────
  {
    slug: 'lawyer-leads',
    name: 'Lawyer',
    plural: 'lawyers',
    path: '/scrape/lawyer-leads/',
    metaTitle: 'Scrape Lawyer Leads from Google Maps | Sample Data',
    metaDescription:
      'Extract lawyer leads from Google Maps. See real sample data from 8,500+ lawyers in Chicago with phone numbers, emails, websites, and ratings. Try free.',
    badge: '8,500+ law firms scraped',
    h1: 'Scrape Lawyer Leads from Google Maps',
    subtitle:
      "See real data from 8,500+ lawyers in Chicago. Extract phone numbers, emails, websites, and addresses — here's a sample of what you'll get.",
    stats: {
      total: '8,500+',
      emailPct: '72%',
      websitePct: '100%',
      avgRating: '4.5',
    },
    sampleData: [
      { name: 'Mandel Legal Aid Clinic', phone: '(773) 702-****', address: 'Chicago, IL', rating: 4.7, reviews: 12, website: 'uchicago*****.edu', email: 'bleiter@uchicag*****.edu' },
      { name: 'The Barclay Law Group', phone: '(312) 553-****', address: '3525 S King Dr, Chicago, IL 60653', rating: 3.5, reviews: 25, website: 'barclaylaw*****.com', email: 'info@barclaylaw*****.com' },
      { name: 'Attorney Shara Kamal', phone: '(872) 326-****', address: '5113 S Harper Ave Suite 2C, Chicago, IL 60615', rating: 4.8, reviews: 55, website: 'sharak*****.com', email: 'office@sharak*****.com' },
      { name: 'Law Office Of Julie A. Monberg PC', phone: '(773) 257-****', address: '1525 E 53rd St, Chicago, IL 60615', rating: 4.2, reviews: 25, website: 'monbergl*****.com', email: 'jmonberg@monbergl*****.com' },
      { name: 'Law Office of Charles R. Bonini', phone: '(312) 532-****', address: '6127 S University Ave, Chicago, IL 60637', rating: 5.0, reviews: 40, website: 'boninilaw*****.com', email: 'charles.bonini@gm*****.com' },
      { name: 'Law Offices of Chadwick and Lakerdas', phone: '(773) 955-****', address: '5300 S Shore Dr Ste 100, Chicago, IL 60615', rating: 4.4, reviews: 50, website: 'chadwicklak*****.com', email: 'schadwick@chadwicklak*****.com' },
      { name: 'Attorney Martin Perez, LLC', phone: '(773) 847-****', address: 'Chicago, IL', rating: 4.9, reviews: 30, website: 'mperez-l*****.com', email: 'martin@mperez-l*****.com' },
      { name: 'Vrdolyak Law Group LLC', phone: '(773) 731-****', address: '9618 S Commercial Ave, Chicago, IL 60617', rating: 4.7, reviews: 813, website: 'vrdolyakl*****.com', email: '—' },
      { name: 'Nunez Legal Group', phone: '(773) 727-****', address: '3501 E 106th St Suite #200, Chicago, IL 60617', rating: 5.0, reviews: 135, website: 'nunezlegal*****.com', email: '—' },
      { name: 'Bubaris & Associates PC', phone: '(773) 581-****', address: '5514 S Archer Ave, Chicago, IL 60638', rating: 4.3, reviews: 22, website: 'bubarislaw*****.com', email: '—' },
    ],
    whyH2: 'Why Scrape Lawyer Data from Google Maps?',
    whyParagraphs: [
      'Law firms represent one of the highest-value B2B lead categories due to their above-average spending on marketing, software, and professional services. Legal marketing agencies, bar association service providers, and legal tech companies all rely on accurate, up-to-date lists of attorneys to drive their outreach and sales pipelines.',
      "Legal marketing agencies use Google Maps data to identify solo practitioners and small firms (2–10 attorneys) that lack the resources of major firms but still compete for online visibility. These practices are strong candidates for SEO, PPC, and reputation management services—and they're reachable via the email addresses and phone numbers scraped from their listings.",
      'Legal tech companies selling practice management software, document automation tools, and e-signature solutions need to reach law firms by practice area and geography. Scraping Google Maps by query—"personal injury lawyers in Phoenix" or "immigration attorneys in New York"—yields a targeted list that outperforms buying generic attorney databases.',
      'Continuing legal education (CLE) providers, malpractice insurance brokers, and court reporting services all target attorneys with time-sensitive, recurring purchasing needs. Having a current, geographically segmented list of law firms means these vendors can run localized campaigns timed to bar association renewal cycles or legislative changes.',
    ],
    howSteps: [
      { n: '01', title: 'Enter your practice area and city', desc: 'Type "personal injury lawyers in Miami" or "family law attorneys in Chicago" into TheMapScraper.' },
      { n: '02', title: 'Click scrape and wait ~2 minutes', desc: 'TheMapScraper extracts every matching law firm from Google Maps with contact details and review data.' },
      { n: '03', title: 'Download your CSV with all business data', desc: 'Get firm names, phone numbers, emails, websites, addresses, ratings, and review counts in one clean file.' },
    ],
    faqs: [
      { question: 'How many lawyers can I scrape per city?', answer: 'Google Maps typically lists 200–600 law firms per city search. You can narrow by practice area—"divorce lawyers," "criminal defense attorneys," or "immigration lawyers"—for more targeted results.' },
      { question: 'Can I get email addresses for law firms?', answer: "Yes, over 50% of law firms publish contact emails on their websites. TheMapScraper enriches each listing by visiting the firm's website to extract email addresses, phone numbers, and social media profiles." },
      { question: 'Is it legal to scrape lawyer data from Google Maps?', answer: 'Yes. Attorney contact information published on Google Business Profile is public data. Many state bar associations also publish similar directories publicly. Extracting this for B2B prospecting is a standard and legal practice.' },
      { question: 'What format is the lawyer data exported in?', answer: 'All data downloads as a standard CSV compatible with Excel, Google Sheets, HubSpot, Salesforce, Clio, and any other platform that accepts CSV imports.' },
    ],
    related: [
      { label: 'Restaurant Leads', to: '/scrape/restaurant-leads/' },
      { label: 'Dentist Leads', to: '/scrape/dentist-leads/' },
      { label: 'Plumber Leads', to: '/scrape/plumber-leads/' },
      { label: 'Real Estate Agent Leads', to: '/scrape/real-estate-agent-leads/' },
    ],
  },

  // ── Real Estate Agents ────────────────────────────────────────────────────
  {
    slug: 'real-estate-agent-leads',
    name: 'Real Estate Agent',
    plural: 'real estate agents',
    path: '/scrape/real-estate-agent-leads/',
    metaTitle: 'Scrape Real Estate Agent Leads from Google Maps | Sample Data',
    metaDescription:
      'Extract real estate agent leads from Google Maps. See real sample data from 5,800+ real estate agents in Chicago with phone numbers, emails, websites, and ratings. Try free.',
    badge: '5,800+ agencies scraped',
    h1: 'Scrape Real Estate Agent Leads from Google Maps',
    subtitle:
      "See real data from 5,800+ real estate agents in Chicago. Extract phone numbers, emails, websites, and addresses — here's a sample of what you'll get.",
    stats: {
      total: '5,800+',
      emailPct: '60%',
      websitePct: '100%',
      avgRating: '4.6',
    },
    sampleData: [
      { name: 'SK Properties Group, LLC', phone: '(773) 493-****', address: '1525 E 53rd St #430, Chicago, IL 60615', rating: 4.9, reviews: 8, website: 'skpropert*****.com', email: 'skpropertiesgroup@gm*****.com' },
      { name: 'ART Property Management', phone: '(773) 568-****', address: '12115 S Halsted St #1, Chicago, IL 60628', rating: 3.3, reviews: 10, website: 'artproper*****.com', email: 'info@artproper*****.com' },
      { name: 'RE/MAX Premier - Hyde Park', phone: '(773) 966-****', address: '1461 E 57th St, Chicago, IL 60637', rating: 4.0, reviews: 9, website: 'remaxprem*****.com', email: 'info@remaxpr*****.com' },
      { name: 'Real Realty, Inc.', phone: '(773) 869-****', address: '3500 S Union Ave, Chicago, IL 60609', rating: 2.7, reviews: 49, website: 'realrealt*****.com', email: 'info@realrealt*****.com' },
      { name: 'Sheryl R Carter, Coldwell Banker', phone: '(773) 234-****', address: '1314 E 47th St, Chicago, IL 60653', rating: 5.0, reviews: 33, website: 'coldwellbank*****.com', email: 'sheryl.carter@cbexcha*****.com' },
      { name: 'City & Suburbs Realty, Inc.', phone: '(312) 282-****', address: '11119 S Halsted St, Chicago, IL 60628', rating: 5.0, reviews: 1, website: 'citysuburbs*****.com', email: 'citysuburbsrlty@ao*****.com' },
      { name: 'YUB Realty Inc.', phone: '(773) 716-****', address: '6233 W 63rd St, Chicago, IL 60638', rating: 4.8, reviews: 254, website: 'yubre*****.com', email: 'info@yubre*****.com' },
      { name: 'Jose Arroyo at Cloud Gate Realty', phone: '(773) 219-****', address: '4635 W 63rd St Unit E, Chicago, IL', rating: 5.0, reviews: 103, website: 'cloudgate*****.com', email: '—' },
      { name: 'Derek Walvoord Real Estate', phone: '(312) 543-****', address: '6956 S Euclid Ave, Chicago, IL 60649', rating: 5.0, reviews: 35, website: 'derekwalvo*****.com', email: '—' },
      { name: 'Dl3 Realty', phone: '(773) 721-****', address: 'Chicago, IL 60628', rating: 4.5, reviews: 12, website: 'dl3real*****.com', email: '—' },
    ],
    whyH2: 'Why Scrape Real Estate Agent Data from Google Maps?',
    whyParagraphs: [
      'Real estate agents and brokerages are among the most active spenders on marketing tools, CRM software, and lead generation services. Mortgage companies, title insurance providers, home inspection firms, and real estate tech platforms all compete to reach agents—making an accurate, up-to-date list of real estate agencies invaluable.',
      'Mortgage lenders and loan officers use real estate agent lead data to build referral networks. Rather than cold calling randomly, they target agents with high review counts and strong ratings—signals of an active, productive agent likely to refer buyers who need financing. TheMapScraper makes it possible to rank and filter agents across an entire metro in minutes.',
      "PropTech companies selling virtual tour software, e-signature tools, transaction management platforms, and CRM systems target independent brokerages and small teams that haven't yet standardized on enterprise solutions. A list of real estate offices by city, complete with websites and email addresses, is their primary prospecting asset.",
      'Real estate coaches, training programs, and continuing education providers use agent lead data to reach newly licensed agents and underperforming teams. By targeting agencies with lower review counts or recently opened businesses, they can identify agents who are early in their career and actively investing in professional development.',
    ],
    howSteps: [
      { n: '01', title: 'Enter "real estate agents" and your target city', desc: 'Type "real estate agents in Austin" or "realtors in Miami Beach" into TheMapScraper search box.' },
      { n: '02', title: 'Click scrape and wait ~2 minutes', desc: 'TheMapScraper pulls every matching agency from Google Maps with full contact details and rating data.' },
      { n: '03', title: 'Download your CSV with all business data', desc: 'Get names, phones, emails, websites, addresses, ratings, and review counts for every agent in your target market.' },
    ],
    faqs: [
      { question: 'How many real estate agents can I scrape per city?', answer: 'Google Maps typically lists 300–900 real estate agencies per city. You can refine by specialty—"luxury real estate," "commercial realtors," or "property management"—to get a more targeted list for your outreach.' },
      { question: 'Can I get email addresses for real estate agencies?', answer: 'Yes. TheMapScraper enriches each listing by visiting the agency website and extracting contact emails. About 60% of real estate listings in Chicago return a verified email address.' },
      { question: 'Is it legal to scrape real estate agent data from Google Maps?', answer: 'Yes. Agent contact information published on Google Business Profile is public data. Real estate agents intentionally make their contact details visible to attract clients—using this data for B2B outreach is entirely standard.' },
      { question: 'What format is the real estate agent data exported in?', answer: 'All data downloads as a CSV file compatible with Excel, Google Sheets, Follow Up Boss, LionDesk, HubSpot, or any other CRM that accepts CSV imports.' },
    ],
    related: [
      { label: 'Restaurant Leads', to: '/scrape/restaurant-leads/' },
      { label: 'Dentist Leads', to: '/scrape/dentist-leads/' },
      { label: 'Plumber Leads', to: '/scrape/plumber-leads/' },
      { label: 'Lawyer Leads', to: '/scrape/lawyer-leads/' },
    ],
  },
]

export const industryBySlug: Record<string, IndustryConfig> = Object.fromEntries(
  industries.map((i) => [i.slug, i])
)
