export interface ContentEntry {
  slug: string
  lastmod: string // YYYY-MM-DD
}

// Add new programmatic scrape pages here — e.g. { slug: 'restaurants-new-york', lastmod: '2025-05-01' }
const scrapePages: ContentEntry[] = []

export default scrapePages
