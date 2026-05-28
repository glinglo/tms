export interface ContentEntry {
  slug: string
  lastmod: string // YYYY-MM-DD
}

// Add new blog posts here — sitemap updates automatically on next deploy.
const blog: ContentEntry[] = [
  { slug: 'google-maps-lead-generation-guide', lastmod: '2026-05-28' },
  { slug: 'best-google-maps-scrapers', lastmod: '2026-05-28' },
  { slug: 'how-to-scrape-google-maps', lastmod: '2026-05-28' },
]

export default blog
