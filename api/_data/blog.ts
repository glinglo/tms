export interface ContentEntry {
  slug: string
  lastmod: string // YYYY-MM-DD
}

// Add new blog posts here — sitemap updates automatically on next deploy.
const blog: ContentEntry[] = [
  { slug: 'google-maps-scraper-api', lastmod: '2026-06-01' },
  { slug: 'scrape-google-maps-reviews', lastmod: '2026-06-01' },
  { slug: 'google-maps-scraper-extension-vs-web-app', lastmod: '2026-05-31' },
  { slug: 'google-maps-lead-generation-guide', lastmod: '2026-05-28' },
  { slug: 'best-google-maps-scrapers', lastmod: '2026-05-28' },
  { slug: 'how-to-scrape-google-maps', lastmod: '2026-05-28' },
]

export default blog
