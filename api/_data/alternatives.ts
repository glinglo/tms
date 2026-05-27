export interface ContentEntry {
  slug: string
  lastmod: string // YYYY-MM-DD
}

const alternatives: ContentEntry[] = [
  { slug: 'apify', lastmod: '2026-05-27' },
  { slug: 'outscraper', lastmod: '2026-05-27' },
  { slug: 'scrap-io', lastmod: '2026-05-27' },
]

export default alternatives
