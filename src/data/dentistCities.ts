import type { SampleRow } from './industryLeads'

export interface CityConfig {
  slug: string
  name: string
  state: string
  path: string
  metaTitle: string
  metaDescription: string
  totalResults: string
  stats: {
    total: string
    emailPct: string
    websitePct: string
    avgRating: string
  }
  sampleData: SampleRow[]
  aboutContent: string
  faqs: { question: string; answer: string }[]
}

const allCities: CityConfig[] = [
  // ── New York ──────────────────────────────────────────────────────────────
  {
    slug: 'new-york',
    name: 'New York',
    state: 'NY',
    path: '/scrape/dentist-leads/new-york/',
    metaTitle: 'Scrape Dentists in New York from Google Maps | TheMapScraper',
    metaDescription:
      'Extract dentist leads in New York. See sample data: 4,200+ dentists with phone numbers, emails, and ratings. Download CSV free.',
    totalResults: '4,200+',
    stats: {
      total: '4,200+',
      emailPct: '58%',
      websitePct: '100%',
      avgRating: '4.6',
    },
    sampleData: [
      { name: "Esthetix Dentist, NYC's Dental Implant & Cosmetic Specialist", phone: '(212) 795-****', address: '285 Fort Washington Ave, New York, NY 10032', rating: 4.8, reviews: 1187, website: '—', email: 'a.philomin@esthetixdental*****.com' },
      { name: 'Arverne Dental', phone: '(718) 736-****', address: '86-01A Rockaway Beach Blvd, Rockaway Beach, NY 11693', rating: 4.8, reviews: 2017, website: '—', email: 'info@arvernedent*****.com' },
      { name: 'Harlem Center for Aesthetic Dentistry', phone: '(212) 283-****', address: '470 Malcolm X Blvd #1d, New York, NY 10037', rating: 4.7, reviews: 400, website: '—', email: 'hello@harlemdentis*****.com' },
      { name: 'Infinity Smiles | Dr. Shah', phone: '(718) 359-****', address: '143-05 41st Ave, Flushing, NY 11355', rating: 4.9, reviews: 314, website: '—', email: 'infinitysmilesny@gm*****.com' },
      { name: 'Glad Dental P.C.', phone: '(646) 404-****', address: '293 E 149th St, Bronx, NY 10451', rating: 4.2, reviews: 168, website: '—', email: 'glad.dental@yah*****.com' },
      { name: 'Comfort Dental Care', phone: '(646) 393-****', address: '326 E 149th St Ste 2, Bronx, NY 10451', rating: 4.1, reviews: 142, website: '—', email: '125@dentalworkn*****.com' },
      { name: 'Open Dental PC', phone: '(718) 618-****', address: '326 E 149th St, Bronx, NY 10451', rating: 3.2, reviews: 141, website: '—', email: '125@dentalworkn*****.com' },
      { name: 'National Dental Flushing', phone: '(718) 313-****', address: '40-20 Main St 3rd Floor, Flushing, NY 11354', rating: 4.5, reviews: 1118, website: '—', email: '—' },
      { name: 'Gentle Dental in Queens', phone: '(718) 514-****', address: '35-30 Francis Lewis Blvd #203, Flushing, NY 11358', rating: 4.7, reviews: 1073, website: '—', email: '—' },
      { name: 'Dr. Sameh Aknouk Dental Services PC', phone: '(718) 824-****', address: '1473 West Ave, Bronx, NY 10462', rating: 4.4, reviews: 944, website: '—', email: '—' },
    ],
    aboutContent:
      "New York City has over 4,200 dental practices listed on Google Maps, distributed across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. Manhattan alone hosts hundreds of cosmetic dental specialists — from Midtown implant centers to Upper West Side family practices — making New York one of the leading cities for high-end cosmetic dentistry in the United States. The density and competition are unmatched: independent practices invest heavily in SEO, Google Ads, and patient communication software to stay visible in a market where another dentist is rarely more than two blocks away.\n\nFor B2B outreach, New York's dental market offers multiple distinct segments. Luxury cosmetic and implant practices on the Upper East Side and in Midtown respond to premium materials and technology vendors. High-volume community clinics in the Bronx, Central Brooklyn, and South Queens are prime targets for scheduling software, patient financing tools, and insurance credentialing services. Dental supply representatives and marketing agencies use Google Maps scraping to build NYC-specific prospect lists that segment practices by neighborhood, review volume, and specialty — giving them far better targeting than any purchased directory.",
    faqs: [
      {
        question: 'How many dentists are in New York?',
        answer:
          'New York City has over 4,200 dental practices listed on Google Maps across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.',
      },
      {
        question: 'Can I get dentist emails in New York?',
        answer:
          'Yes, 58% of dentists in New York have contact emails extracted from their websites. TheMapScraper visits each practice\'s website to find published email addresses, phone numbers, and social media profiles.',
      },
      {
        question: 'What format is the data?',
        answer:
          'CSV file with columns for name, phone, address, rating, reviews, website, email, Instagram, Facebook, and LinkedIn. Ready for import into any CRM or spreadsheet.',
      },
    ],
  },

  // ── Miami ─────────────────────────────────────────────────────────────────
  {
    slug: 'miami',
    name: 'Miami',
    state: 'FL',
    path: '/scrape/dentist-leads/miami/',
    metaTitle: 'Scrape Dentists in Miami from Google Maps | TheMapScraper',
    metaDescription:
      'Extract dentist leads in Miami. See sample data: 3,500+ dentists with phone numbers, emails, and ratings. Download CSV free.',
    totalResults: '3,500+',
    stats: {
      total: '3,500+',
      emailPct: '74%',
      websitePct: '100%',
      avgRating: '4.7',
    },
    sampleData: [
      { name: 'Paya Dental - Dental Clinic & Implants Miami', phone: '(305) 541-****', address: '2143 NW 7th St, Miami, FL 33125', rating: 4.5, reviews: 360, website: '—', email: 'hialeah@payadent*****.com' },
      { name: 'Community Smiles Dental Clinic', phone: '(305) 363-****', address: '750 NW 20th St #110, Miami, FL 33127', rating: 4.4, reviews: 323, website: '—', email: 'info@csmil*****.org' },
      { name: 'Garmen Dental Emergencies and Smiles', phone: '(786) 580-****', address: '1334 SW 1st St, Miami, FL 33135', rating: 4.8, reviews: 225, website: '—', email: 'garmendental@gm*****.com' },
      { name: 'Otero Dental Centers of Miami', phone: '(305) 442-****', address: '3719 NW 7th St, Miami, FL 33126', rating: 4.5, reviews: 88, website: '—', email: 'info@oterodentalcent*****.com' },
      { name: 'Ernesto Martinez DDS (EM DENTAL)', phone: '(305) 541-****', address: '2742 SW 8th St #219, Miami, FL 33135', rating: 4.8, reviews: 68, website: '—', email: 'em-dental@outlo*****.com' },
      { name: 'Fortune Smiles Dental', phone: '(786) 542-****', address: '1843 SW 8th St, Miami, FL 33135', rating: 4.5, reviews: 66, website: '—', email: 'frontdesk@fortunesmil*****.dental' },
      { name: 'Fresh Dental Smiles', phone: '(305) 448-****', address: '4565 NW 7th St, Miami, FL 33126', rating: 5.0, reviews: 52, website: '—', email: 'fds.dentist@gm*****.com' },
      { name: 'AC Pediatric Dentistry & Orthodontics', phone: '(305) 882-****', address: '2950 SW 8th St, Miami, FL 33135', rating: 4.4, reviews: 1093, website: '—', email: '—' },
      { name: 'Relax and Smile Dental Care', phone: '(786) 983-****', address: '271 NE 2nd St, Miami, FL 33132', rating: 4.9, reviews: 880, website: '—', email: '—' },
      { name: 'Aspen Dental - Miami, FL', phone: '(305) 702-****', address: '1420 NW N River Dr STE 170, Miami, FL 33125', rating: 4.5, reviews: 553, website: '—', email: '—' },
    ],
    aboutContent:
      "Miami's dental market is shaped by its large Spanish-speaking population and a thriving dental tourism industry. Practices in Coral Gables, Brickell, and Miami Beach regularly attract patients from Latin America and the Caribbean — particularly from Venezuela, Colombia, and Brazil — seeking cosmetic procedures at prices significantly below what they'd pay at home. Many practices actively advertise bilingual services in English and Spanish, reflecting the demographics of neighborhoods like Hialeah, Doral, and Little Havana where Spanish is the primary language for patient communication.\n\nFor dental marketers and suppliers, Miami represents a blend of premium cosmetic practices and high-volume general dentistry. The Coral Gables and SW 8th Street corridors host clusters of well-established independent practices that haven't yet joined DSO networks, making them high-priority targets for equipment vendors, practice management software, and patient acquisition platforms. Hialeah hosts dozens of busy community clinics chronically underserved by dental technology companies. Miami's warm climate, international reputation for aesthetics, and high concentration of high-net-worth individuals from Latin America make it a uniquely valuable dental market — one where cosmetic dentistry revenue per practice significantly outpaces national averages.",
    faqs: [
      {
        question: 'How many dentists are in Miami?',
        answer:
          'The Miami metro area has over 3,500 dental practices listed on Google Maps, spanning Miami, Coral Gables, Hialeah, and surrounding cities.',
      },
      {
        question: 'Can I get dentist emails in Miami?',
        answer:
          'Yes, 74% of dentists in Miami have contact emails extracted from their websites. TheMapScraper visits each practice\'s website to find published email addresses, phone numbers, and social media profiles.',
      },
      {
        question: 'What format is the data?',
        answer:
          'CSV file with columns for name, phone, address, rating, reviews, website, email, Instagram, Facebook, and LinkedIn. Ready for import into any CRM or spreadsheet.',
      },
    ],
  },

  // ── Chicago ───────────────────────────────────────────────────────────────
  {
    slug: 'chicago',
    name: 'Chicago',
    state: 'IL',
    path: '/scrape/dentist-leads/chicago/',
    metaTitle: 'Scrape Dentists in Chicago from Google Maps | TheMapScraper',
    metaDescription:
      'Extract dentist leads in Chicago. See sample data: 3,800+ dentists with phone numbers, emails, and ratings. Download CSV free.',
    totalResults: '3,800+',
    stats: {
      total: '3,800+',
      emailPct: '70%',
      websitePct: '100%',
      avgRating: '4.6',
    },
    sampleData: [
      { name: 'Precision Dental Care S Ashland', phone: '(773) 832-****', address: '4317 S Ashland Ave, Chicago, IL 60609', rating: 4.9, reviews: 2093, website: '—', email: 'precisionkedzie@gm*****.com' },
      { name: 'Chatham Dental Care', phone: '(773) 994-****', address: '7931 S King Dr, Chicago, IL 60619', rating: 4.2, reviews: 1039, website: '—', email: 'chathamdentalcare@gm*****.com' },
      { name: 'Manus Dental - Hyde Park', phone: '(773) 692-****', address: '1646 E 55th St, Chicago, IL 60615', rating: 4.5, reviews: 516, website: '—', email: 'manus@manush*****.com' },
      { name: 'Universal Dental of Hyde Park', phone: '(773) 966-****', address: '1634 E 53rd St, Chicago, IL 60615', rating: 4.1, reviews: 367, website: '—', email: 'info@udclin*****.com' },
      { name: 'Dental 360 - California and 55th', phone: '(773) 776-****', address: '2759 W 55th St, Chicago, IL 60632', rating: 4.7, reviews: 348, website: '—', email: 'info@dental360u*****.com' },
      { name: 'Archer Dentistry - Dental Impressions', phone: '(773) 295-****', address: '5430 S Kedzie Ave, Chicago, IL 60632', rating: 4.8, reviews: 300, website: '—', email: 'dentalimpressions54@gm*****.com' },
      { name: 'Sonrisa Family Dental', phone: '(872) 314-****', address: '3450 S Archer Ave, Chicago, IL 60608', rating: 4.1, reviews: 206, website: '—', email: 'info@sfdchica*****.com' },
      { name: 'The Dental Clinic-Kedzie', phone: '(773) 776-****', address: '3210 W 63rd St, Chicago, IL 60629', rating: 4.3, reviews: 1338, website: '—', email: '—' },
      { name: 'Studio Dental-Damen', phone: '(773) 869-****', address: '4516 S Damen Ave, Chicago, IL 60609', rating: 4.3, reviews: 1165, website: '—', email: '—' },
      { name: 'Archer Dentistry - Chicago (Archer Ave)', phone: '(773) 819-****', address: '3924 S Archer Ave Unit D, Chicago, IL 60632', rating: 4.8, reviews: 959, website: '—', email: '—' },
    ],
    aboutContent:
      "Chicago's dental landscape mirrors the city's distinct neighborhood geography, creating a market with dramatically different dynamics block by block. The Loop and River North have premium practices serving corporate employees and downtown residents. The South Side neighborhoods — Bronzeville, Hyde Park, Chatham, Pilsen — host a mix of community health centers and independent practices often underserved by dental technology vendors despite serving large, dense patient populations. The Archer Avenue corridor in particular has emerged as a significant dental hub, with multiple high-review practices serving Chicago's diverse immigrant communities.\n\nFor dental suppliers and marketing agencies, Chicago's diversity demands neighborhood-specific outreach strategies. Practices in affluent North Side neighborhoods (Lincoln Park, Lakeview, Wicker Park) are strong targets for premium materials, Invisalign, and cosmetic technology. South and Southwest Side practices respond to scheduling efficiency tools and insurance billing software. The robust employer insurance market — dominated by BlueCross BlueShield of Illinois and Delta Dental — means most practices are already on major panels, but independent practices looking to add cash-pay patients are actively evaluating patient acquisition platforms. Chicago's suburbs (Naperville, Evanston, Oak Park) add thousands more practices to the addressable market for any Midwest-focused dental vendor.",
    faqs: [
      {
        question: 'How many dentists are in Chicago?',
        answer:
          'Chicago has over 3,800 dental practices on Google Maps across neighborhoods from the Loop to the South Side, North Side, and western suburbs.',
      },
      {
        question: 'Can I get dentist emails in Chicago?',
        answer:
          'Yes, 70% of dentists in Chicago have contact emails extracted from their websites. TheMapScraper visits each practice\'s website to find published email addresses, phone numbers, and social media profiles.',
      },
      {
        question: 'What format is the data?',
        answer:
          'CSV file with columns for name, phone, address, rating, reviews, website, email, Instagram, Facebook, and LinkedIn. Ready for import into any CRM or spreadsheet.',
      },
    ],
  },

  // ── Los Angeles ───────────────────────────────────────────────────────────
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    state: 'CA',
    path: '/scrape/dentist-leads/los-angeles/',
    metaTitle: 'Scrape Dentists in Los Angeles from Google Maps | TheMapScraper',
    metaDescription:
      'Extract dentist leads in Los Angeles. See sample data: 6,100+ dentists with phone numbers, emails, and ratings. Download CSV free.',
    totalResults: '6,100+',
    stats: {
      total: '6,100+',
      emailPct: '64%',
      websitePct: '100%',
      avgRating: '4.7',
    },
    sampleData: [
      { name: 'Venice Family Dentistry', phone: '(310) 873-****', address: '8610 S Sepulveda Blvd #202, Los Angeles, CA 90045', rating: 4.8, reviews: 78, website: '—', email: 'venicefamilydentistry@gm*****.com' },
      { name: 'White Oak Family Dentistry', phone: '(818) 363-****', address: '10718 White Oak Ave Suite 1, Granada Hills, CA 91344', rating: 5.0, reviews: 98, website: '—', email: 'Frontoffice@whiteoakfamilydentis*****.com' },
      { name: 'Scott A. Warner DDS', phone: '(310) 459-****', address: '984 Monument St Suite 207, Pacific Palisades, CA 90272', rating: 5.0, reviews: 39, website: '—', email: 'drwarneroffice@gm*****.com' },
      { name: 'Dental Spa', phone: '(310) 454-****', address: '881 Alma Real Dr #222, Pacific Palisades, CA 90272', rating: 5.0, reviews: 26, website: '—', email: 'thedentalspa@yah*****.com' },
      { name: 'Dr. Ali Vaziri', phone: '(310) 230-****', address: '859 Vía De La Paz C, Pacific Palisades, CA 90272', rating: 4.7, reviews: 12, website: '—', email: 'info@palisadesend*****.com' },
      { name: 'Rhonda L. Jensen D.D.S.', phone: '(310) 451-****', address: '910 Vía De La Paz #207, Pacific Palisades, CA 90272', rating: 4.5, reviews: 8, website: '—', email: 'rljensendds@gm*****.com' },
      { name: 'Watanabe, Lynn, DDS Dental Spa', phone: '(310) 454-****', address: '881 Alma Real Dr #222, Pacific Palisades, CA 90272', rating: 5.0, reviews: 6, website: '—', email: 'thedentalspa@yah*****.com' },
      { name: 'Lavo Dental', phone: '(818) 345-****', address: '9671 Reseda Blvd, Northridge, CA 91324', rating: 5.0, reviews: 615, website: '—', email: '—' },
      { name: 'TLC for Smiles', phone: '(818) 360-****', address: '18121 Chatsworth St Ste A, Granada Hills, CA 91344', rating: 4.5, reviews: 588, website: '—', email: '—' },
      { name: 'Parthenia Family Dental', phone: '(818) 830-****', address: '14712 Parthenia St #E, Panorama City, CA 91402', rating: 4.7, reviews: 510, website: '—', email: '—' },
    ],
    aboutContent:
      "Greater Los Angeles is one of the largest dental markets in the United States, with over 6,100 practices spread across a metro area spanning hundreds of square miles. Beverly Hills and the Westside are globally recognized for cosmetic dentistry, attracting entertainment industry professionals, influencers, and international patients seeking smile transformations. Pacific Palisades, Santa Monica, and Brentwood host boutique practices with premium fee-for-service models, where revenue per patient is among the highest in the country. Meanwhile, the San Fernando Valley — Granada Hills, Northridge, Panorama City, Van Nuys — has dense clusters of family dentistry practices serving large suburban populations with very different demographics and price sensitivities.\n\nThe Valley vs. Westside divide is pronounced in dental demographics: insurance mix, average treatment value, and patient expectations differ dramatically across the metro. For dental supply companies, distinguishing Westside cosmetic specialists from Valley family practices helps prioritize which products to lead with on each sales call. DSO consolidation in LA is among the most advanced in the country — remaining independent practices are therefore high-priority targets for vendors and potential DSO affiliates before consolidation eliminates them as prospects. Hollywood, Downtown LA, Koreatown, and East LA each have additional distinct dental markets worth segmenting for targeted outreach campaigns.",
    faqs: [
      {
        question: 'How many dentists are in Los Angeles?',
        answer:
          'Greater Los Angeles has over 6,100 dental practices on Google Maps, making it one of the largest dental markets in the United States.',
      },
      {
        question: 'Can I get dentist emails in Los Angeles?',
        answer:
          'Yes, 64% of dentists in Los Angeles have contact emails extracted from their websites. TheMapScraper visits each practice\'s website to find published email addresses, phone numbers, and social media profiles.',
      },
      {
        question: 'What format is the data?',
        answer:
          'CSV file with columns for name, phone, address, rating, reviews, website, email, Instagram, Facebook, and LinkedIn. Ready for import into any CRM or spreadsheet.',
      },
    ],
  },

  // ── Houston ───────────────────────────────────────────────────────────────
  {
    slug: 'houston',
    name: 'Houston',
    state: 'TX',
    path: '/scrape/dentist-leads/houston/',
    metaTitle: 'Scrape Dentists in Houston from Google Maps | TheMapScraper',
    metaDescription:
      'Extract dentist leads in Houston. See sample data: 4,500+ dentists with phone numbers, emails, and ratings. Download CSV free.',
    totalResults: '4,500+',
    stats: {
      total: '4,500+',
      emailPct: '64%',
      websitePct: '100%',
      avgRating: '4.7',
    },
    sampleData: [
      { name: 'Aventura Dental', phone: '(713) 672-****', address: '10911 East Fwy, Houston, TX 77029', rating: 4.9, reviews: 2366, website: '—', email: 'aventura@houtxdentalgr*****.com' },
      { name: 'Flash Dental', phone: '(281) 407-****', address: '1050 Yale St #200, Houston, TX 77008', rating: 5.0, reviews: 606, website: '—', email: 'Flash@flashdent*****.com' },
      { name: 'Brident Dental & Orthodontics', phone: '(713) 325-****', address: '12052 East Fwy, Houston, TX 77029', rating: 4.4, reviews: 495, website: '—', email: 'corporate@brid*****.com' },
      { name: 'Minali Dental', phone: '(832) 422-****', address: '7700 Fulton St Suite A, Houston, TX 77022', rating: 4.9, reviews: 430, website: '—', email: 'minalidental@gm*****.com' },
      { name: 'Smile Rite Dental', phone: '(713) 742-****', address: '3310 Orlando St, Houston, TX 77093', rating: 4.9, reviews: 336, website: '—', email: 'smileritedental@gm*****.com' },
      { name: 'District Dental', phone: '(832) 804-****', address: '2802 White Oak Dr #300, Houston, TX 77007', rating: 4.9, reviews: 157, website: '—', email: 'info@district-dent*****.com' },
      { name: 'Little York Dental', phone: '(281) 447-****', address: '410 W Little York Rd, Houston, TX 77076', rating: 4.8, reviews: 108, website: '—', email: 'littleyorkdental410@gm*****.com' },
      { name: 'Memorial Park Dental Spa', phone: '(713) 864-****', address: '6010 Washington Ave Suite D, Houston, TX 77007', rating: 4.8, reviews: 1007, website: '—', email: '—' },
      { name: 'Jefferson Dental & Orthodontics', phone: '(346) 639-****', address: '5900 Lyons Ave, Houston, TX 77020', rating: 4.5, reviews: 986, website: '—', email: '—' },
      { name: 'Jefferson Dental & Orthodontics', phone: '(346) 553-****', address: '5406 Airline Dr F, Houston, TX 77076', rating: 4.6, reviews: 982, website: '—', email: '—' },
    ],
    aboutContent:
      "Houston's dental market combines rapid population growth with striking geographic and cultural diversity. The Texas Medical Center — the world's largest medical complex — anchors a cluster of specialty practices in the Medical Center and Midtown: oral surgeons, periodontists, prosthodontists, and endodontists that are prime targets for high-end equipment vendors and specialty software. Beyond the Medical Center, practices are distributed across the Heights, Galleria, East Houston, and fast-growing suburbs like Katy, Sugar Land, The Woodlands, and Pearland, each with distinct patient demographics and purchasing behaviors.\n\nHouston's large Hispanic community, concentrated on the East Side and Northside, supports dozens of high-volume Spanish-speaking practices with distinct marketing and operational needs. A significant Vietnamese dental community operates in the Bellaire and Midtown areas, serving Houston's large Vietnamese-American population. For dental marketing agencies covering the South and Southwest, Houston represents one of the highest-growth dental markets in the country — population expansion consistently outpaces new practice formation, keeping existing practices at high capacity and receptive to patient acquisition tools. DSO consolidation in Houston lags behind coastal markets, leaving a large population of independent practitioners actively evaluating software, equipment, and partnership opportunities.",
    faqs: [
      {
        question: 'How many dentists are in Houston?',
        answer:
          'Houston has over 4,500 dental practices on Google Maps across the Greater Houston metro area, from the Heights to Katy, Sugar Land, and Pasadena.',
      },
      {
        question: 'Can I get dentist emails in Houston?',
        answer:
          'Yes, 64% of dentists in Houston have contact emails extracted from their websites. TheMapScraper visits each practice\'s website to find published email addresses, phone numbers, and social media profiles.',
      },
      {
        question: 'What format is the data?',
        answer:
          'CSV file with columns for name, phone, address, rating, reviews, website, email, Instagram, Facebook, and LinkedIn. Ready for import into any CRM or spreadsheet.',
      },
    ],
  },
]

export default allCities

export function cityBySlug(slug: string): CityConfig | undefined {
  return allCities.find((c) => c.slug === slug)
}

export const ALL_CITY_LINKS = allCities.map((c) => ({ label: c.name, to: c.path }))
