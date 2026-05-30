export interface ContentEntry {
  slug: string
  lastmod: string // YYYY-MM-DD
}

const scrapePages: ContentEntry[] = [
  { slug: 'restaurant-leads', lastmod: '2026-05-30' },
  { slug: 'dentist-leads', lastmod: '2026-05-30' },
  { slug: 'plumber-leads', lastmod: '2026-05-30' },
  { slug: 'lawyer-leads', lastmod: '2026-05-30' },
  { slug: 'real-estate-agent-leads', lastmod: '2026-05-30' },
]

export default scrapePages
