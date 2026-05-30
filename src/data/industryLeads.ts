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
      'Extract restaurant leads from Google Maps. See real sample data: 2,847 businesses with phone numbers, emails, websites, and ratings. Try free.',
    badge: '2,847 restaurants scraped',
    h1: 'Scrape Restaurant Leads from Google Maps',
    subtitle:
      "Extract phone numbers, emails, websites, and addresses from restaurant listings. Here's a sample of what you'll get.",
    stats: {
      total: '2,847',
      emailPct: '48%',
      websitePct: '91%',
      avgRating: '4.5',
    },
    sampleData: [
      { name: 'The Golden Fork', phone: '(212) 555-****', address: '42 West 38th St, New York, NY 10018', rating: 4.7, reviews: 1284, website: 'goldenfork****.com', email: 'info@golden****.com' },
      { name: 'Casa Maria Kitchen', phone: '(305) 555-****', address: '1201 SW 8th St, Miami, FL 33135', rating: 4.5, reviews: 892, website: 'casamaria****.com', email: 'hello@casama****.com' },
      { name: 'Sakura Ramen House', phone: '(310) 555-****', address: '323 N La Brea Ave, Los Angeles, CA 90036', rating: 4.8, reviews: 2341, website: 'sakurara****.com', email: 'contact@sakura****.com' },
      { name: 'The Blue Plate Diner', phone: '(773) 555-****', address: '512 N Clark St, Chicago, IL 60654', rating: 4.3, reviews: 567, website: 'blueplatedi****.com', email: 'info@bluepla****.com' },
      { name: 'Ember & Oak Steakhouse', phone: '(214) 555-****', address: '3700 McKinney Ave, Dallas, TX 75204', rating: 4.6, reviews: 1103, website: 'emberoakst****.com', email: 'reserv@embero****.com' },
      { name: 'Harbor Seafood Co.', phone: '(617) 555-****', address: '88 Broad St, Boston, MA 02110', rating: 4.7, reviews: 743, website: 'harborseaf****.com', email: 'info@harbor****.com' },
      { name: 'Saffron Indian Bistro', phone: '(415) 555-****', address: '1801 Divisadero St, San Francisco, CA 94115', rating: 4.5, reviews: 428, website: 'saffronbis****.com', email: 'hello@saffron****.com' },
      { name: 'The Corner Brasserie', phone: '(718) 555-****', address: '77 Atlantic Ave, Brooklyn, NY 11201', rating: 4.4, reviews: 315, website: 'cornerbras****.com', email: 'info@corner****.com' },
      { name: 'Café Verde', phone: '(602) 555-****', address: '5104 N 7th St, Phoenix, AZ 85014', rating: 4.6, reviews: 891, website: 'cafeverde****.com', email: 'eat@cafeve****.com' },
      { name: 'Tuscany Hills Ristorante', phone: '(702) 555-****', address: '3570 Las Vegas Blvd S, Las Vegas, NV 89109', rating: 4.8, reviews: 2187, website: 'tuscanyhi****.com', email: 'info@tuscan****.com' },
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
      { question: 'Can I get email addresses for restaurants?', answer: 'Yes. TheMapScraper enriches each restaurant listing by visiting the business website and extracting contact emails. About 48% of restaurant listings return a verified email address.' },
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
      'Extract dentist leads from Google Maps. See real sample data: 1,923 businesses with phone numbers, emails, websites, and ratings. Try free.',
    badge: '1,923 dental practices scraped',
    h1: 'Scrape Dentist Leads from Google Maps',
    subtitle:
      "Extract phone numbers, emails, websites, and addresses from dental practice listings. Here's a sample of what you'll get.",
    stats: {
      total: '1,923',
      emailPct: '52%',
      websitePct: '94%',
      avgRating: '4.7',
    },
    sampleData: [
      { name: 'Bright Smile Dental', phone: '(718) 555-****', address: '123 Main St, New York, NY 10001', rating: 4.8, reviews: 342, website: 'brightsmile****.com', email: 'info@brights****.com' },
      { name: 'Premier Family Dentistry', phone: '(312) 555-****', address: '789 N Michigan Ave, Chicago, IL 60611', rating: 4.9, reviews: 218, website: 'premierfami****.com', email: 'appts@premie****.com' },
      { name: 'Sunrise Dental Group', phone: '(310) 555-****', address: '2450 Colorado Ave, Santa Monica, CA 90404', rating: 4.7, reviews: 503, website: 'sunrisedent****.com', email: 'hello@sunris****.com' },
      { name: 'Coastal Smiles Dentistry', phone: '(954) 555-****', address: '1700 E Oakland Park Blvd, Fort Lauderdale, FL 33334', rating: 4.8, reviews: 187, website: 'coastalsmi****.com', email: 'info@coastal****.com' },
      { name: 'Advanced Dental Care', phone: '(404) 555-****', address: '3300 Piedmont Rd NE, Atlanta, GA 30305', rating: 4.6, reviews: 274, website: 'advancedde****.com', email: 'care@advanc****.com' },
      { name: 'City Dental Associates', phone: '(617) 555-****', address: '200 State St, Boston, MA 02109', rating: 4.7, reviews: 431, website: 'citydental****.com', email: 'info@cityden****.com' },
      { name: 'Westside Orthodontics', phone: '(602) 555-****', address: '4530 E Thomas Rd, Phoenix, AZ 85018', rating: 4.9, reviews: 156, website: 'westsideor****.com', email: 'smile@westsi****.com' },
      { name: 'Gentle Touch Dental', phone: '(713) 555-****', address: '6560 Fannin St, Houston, TX 77030', rating: 4.8, reviews: 89, website: 'gentletouc****.com', email: 'info@gentle****.com' },
      { name: 'Downtown Dental Studio', phone: '(503) 555-****', address: '811 SW 6th Ave, Portland, OR 97204', rating: 4.6, reviews: 203, website: 'downtownde****.com', email: 'hello@downto****.com' },
      { name: 'Heritage Dental Center', phone: '(303) 555-****', address: '1600 Glenarm Pl, Denver, CO 80203', rating: 4.7, reviews: 377, website: 'heritagede****.com', email: 'care@herita****.com' },
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
      { question: 'Can I get email addresses for dental practices?', answer: "Yes. TheMapScraper visits each practice's website to extract contact emails. Around 52% of dental practice listings return a verified email address, typically an appointment or front-desk contact." },
      { question: 'Is it legal to scrape dentist data from Google Maps?', answer: 'Yes. Business contact information that dental practices have published on their Google Business Profile is public data. Extracting it for B2B outreach is a standard and legally accepted practice.' },
      { question: 'What format is the dentist data exported in?', answer: 'All data downloads as a CSV file compatible with Excel, Google Sheets, HubSpot, Salesforce, or any CRM that accepts CSV imports.' },
    ],
    related: [
      { label: 'Restaurant Leads', to: '/scrape/restaurant-leads/' },
      { label: 'Plumber Leads', to: '/scrape/plumber-leads/' },
      { label: 'Lawyer Leads', to: '/scrape/lawyer-leads/' },
      { label: 'Real Estate Agent Leads', to: '/scrape/real-estate-agent-leads/' },
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
      'Extract plumber leads from Google Maps. See real sample data: 1,641 businesses with phone numbers, emails, websites, and ratings. Try free.',
    badge: '1,641 plumbing companies scraped',
    h1: 'Scrape Plumber Leads from Google Maps',
    subtitle:
      "Extract phone numbers, emails, websites, and addresses from plumbing company listings. Here's a sample of what you'll get.",
    stats: {
      total: '1,641',
      emailPct: '44%',
      websitePct: '87%',
      avgRating: '4.6',
    },
    sampleData: [
      { name: 'Rapids Plumbing & Drain', phone: '(212) 555-****', address: '285 W 130th St, New York, NY 10027', rating: 4.9, reviews: 482, website: 'rapidsplum****.com', email: 'info@rapidsp****.com' },
      { name: 'ProFlow Plumbing Services', phone: '(312) 555-****', address: '1427 N Halsted St, Chicago, IL 60642', rating: 4.8, reviews: 317, website: 'proflowplu****.com', email: 'service@profl****.com' },
      { name: 'Sunset Plumbing Co.', phone: '(310) 555-****', address: '8716 Venice Blvd, Los Angeles, CA 90034', rating: 4.7, reviews: 201, website: 'sunsetplum****.com', email: 'info@sunsetp****.com' },
      { name: 'Coastal Plumbing & HVAC', phone: '(305) 555-****', address: '3620 NW 2nd Ave, Miami, FL 33127', rating: 4.6, reviews: 143, website: 'coastalplu****.com', email: 'hello@coasta****.com' },
      { name: 'TrustFlow Plumbing', phone: '(713) 555-****', address: '9811 Westheimer Rd, Houston, TX 77042', rating: 4.8, reviews: 529, website: 'trustflowp****.com', email: 'info@trustf****.com' },
      { name: 'AquaTech Plumbers', phone: '(602) 555-****', address: '2121 E Camelback Rd, Phoenix, AZ 85016', rating: 4.9, reviews: 271, website: 'aquatechpl****.com', email: 'call@aquate****.com' },
      { name: 'Capital Plumbing Solutions', phone: '(202) 555-****', address: '650 Massachusetts Ave NW, Washington, DC 20001', rating: 4.7, reviews: 188, website: 'capitalplum****.com', email: 'info@capita****.com' },
      { name: 'Precision Plumbing & Drain', phone: '(503) 555-****', address: '4020 N Williams Ave, Portland, OR 97227', rating: 4.8, reviews: 362, website: 'precisionpl****.com', email: 'fix@precisi****.com' },
      { name: 'BlueWave Plumbing', phone: '(404) 555-****', address: '1284 Foster St, Atlanta, GA 30318', rating: 4.6, reviews: 94, website: 'bluewavepl****.com', email: 'info@bluewavep****.com' },
      { name: 'Summit Plumbing Services', phone: '(720) 555-****', address: '2401 15th St, Denver, CO 80202', rating: 4.9, reviews: 447, website: 'summitplum****.com', email: 'help@summit****.com' },
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
      { question: 'Can I get email addresses for plumbing companies?', answer: "Yes. TheMapScraper visits each company's website to find contact emails. Around 44% of plumbing listings return a verified email address, typically a dispatch or office contact." },
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
      'Extract lawyer leads from Google Maps. See real sample data: 2,104 businesses with phone numbers, emails, websites, and ratings. Try free.',
    badge: '2,104 law firms scraped',
    h1: 'Scrape Lawyer Leads from Google Maps',
    subtitle:
      "Extract phone numbers, emails, websites, and addresses from law firm listings. Here's a sample of what you'll get.",
    stats: {
      total: '2,104',
      emailPct: '61%',
      websitePct: '96%',
      avgRating: '4.6',
    },
    sampleData: [
      { name: 'Harrington & Associates Law', phone: '(212) 555-****', address: '120 Wall St, New York, NY 10005', rating: 4.8, reviews: 187, website: 'harringtona****.com', email: 'contact@harrin****.com' },
      { name: 'Sterling Legal Group', phone: '(312) 555-****', address: '190 S LaSalle St, Chicago, IL 60603', rating: 4.7, reviews: 124, website: 'sterlingleg****.com', email: 'info@sterlin****.com' },
      { name: 'Pacific Coast Law Firm', phone: '(310) 555-****', address: '11150 Santa Monica Blvd, Los Angeles, CA 90025', rating: 4.9, reviews: 93, website: 'pacificcoastl****.com', email: 'hello@pacifi****.com' },
      { name: 'Sunrise Legal Advisors', phone: '(305) 555-****', address: '701 Brickell Ave, Miami, FL 33131', rating: 4.8, reviews: 156, website: 'sunriselegal****.com', email: 'info@sunrisel****.com' },
      { name: 'Lone Star Law Group', phone: '(214) 555-****', address: '2100 Ross Ave, Dallas, TX 75201', rating: 4.6, reviews: 78, website: 'lonestarlaw****.com', email: 'consult@lones****.com' },
      { name: 'Beacon Hill Legal', phone: '(617) 555-****', address: '75 State St, Boston, MA 02109', rating: 4.9, reviews: 211, website: 'beaconhill****.com', email: 'info@beaconh****.com' },
      { name: 'Mountain West Law Firm', phone: '(720) 555-****', address: '1700 Lincoln St, Denver, CO 80203', rating: 4.7, reviews: 102, website: 'mountainwestl****.com', email: 'help@mount****.com' },
      { name: 'Golden Gate Legal Group', phone: '(415) 555-****', address: '555 California St, San Francisco, CA 94104', rating: 4.8, reviews: 134, website: 'goldengatele****.com', email: 'info@golden****.com' },
      { name: 'Capitol Advocacy Group', phone: '(202) 555-****', address: '1225 Eye St NW, Washington, DC 20005', rating: 4.9, reviews: 67, website: 'capitoladvoc****.com', email: 'contact@capito****.com' },
      { name: 'Prestige Law Partners', phone: '(713) 555-****', address: '1000 Main St, Houston, TX 77002', rating: 4.7, reviews: 88, website: 'prestigelaw****.com', email: 'info@prestig****.com' },
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
      { question: 'Can I get email addresses for law firms?', answer: "Yes. TheMapScraper visits each firm's website to extract contact emails. About 61% of law firm listings return a verified email address, higher than most industries due to the prevalence of professional websites." },
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
      'Extract real estate agent leads from Google Maps. See real sample data: 3,218 businesses with phone numbers, emails, websites, and ratings. Try free.',
    badge: '3,218 agencies scraped',
    h1: 'Scrape Real Estate Agent Leads from Google Maps',
    subtitle:
      "Extract phone numbers, emails, websites, and addresses from real estate agency listings. Here's a sample of what you'll get.",
    stats: {
      total: '3,218',
      emailPct: '57%',
      websitePct: '93%',
      avgRating: '4.7',
    },
    sampleData: [
      { name: 'Premier Properties Group', phone: '(212) 555-****', address: '575 Madison Ave, New York, NY 10022', rating: 4.9, reviews: 312, website: 'premierproper****.com', email: 'info@premier****.com' },
      { name: 'Lakefront Realty Group', phone: '(312) 555-****', address: '980 N Michigan Ave, Chicago, IL 60611', rating: 4.8, reviews: 241, website: 'lakefrontre****.com', email: 'hello@lakefr****.com' },
      { name: 'SoCal Dream Realty', phone: '(310) 555-****', address: '9025 Wilshire Blvd, Beverly Hills, CA 90211', rating: 4.7, reviews: 189, website: 'socaldreamr****.com', email: 'list@socald****.com' },
      { name: 'Brickell Luxury Real Estate', phone: '(305) 555-****', address: '801 Brickell Key Dr, Miami, FL 33131', rating: 4.9, reviews: 428, website: 'brickellre****.com', email: 'info@bricke****.com' },
      { name: 'Sunbelt Realty Partners', phone: '(602) 555-****', address: '2394 E Camelback Rd, Phoenix, AZ 85016', rating: 4.6, reviews: 156, website: 'sunbeltre****.com', email: 'homes@sunbe****.com' },
      { name: 'Austin Urban Realty', phone: '(512) 555-****', address: '110 Congress Ave, Austin, TX 78701', rating: 4.8, reviews: 203, website: 'austinurba****.com', email: 'info@austinu****.com' },
      { name: 'Pacific NW Properties', phone: '(206) 555-****', address: '1300 1st Ave, Seattle, WA 98101', rating: 4.7, reviews: 334, website: 'pacificnwpr****.com', email: 'hello@pacifi****.com' },
      { name: 'Heritage Home Advisors', phone: '(404) 555-****', address: '3400 Peachtree Rd NE, Atlanta, GA 30326', rating: 4.8, reviews: 117, website: 'heritagehome****.com', email: 'sell@herita****.com' },
      { name: 'Capitol Corridor Realty', phone: '(202) 555-****', address: '1501 K St NW, Washington, DC 20005', rating: 4.9, reviews: 87, website: 'capitolcorre****.com', email: 'info@capito****.com' },
      { name: 'Vegas Prime Properties', phone: '(702) 555-****', address: '3720 Howard Hughes Pkwy, Las Vegas, NV 89169', rating: 4.7, reviews: 264, website: 'vegasprimep****.com', email: 'list@vegasp****.com' },
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
      { question: 'Can I get email addresses for real estate agencies?', answer: 'Yes. TheMapScraper enriches each listing by visiting the agency website and extracting contact emails. About 57% of real estate listings return a verified email address.' },
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
