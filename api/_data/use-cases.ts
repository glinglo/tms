export interface ContentEntry {
  slug: string
  lastmod: string // YYYY-MM-DD
}

const useCases: ContentEntry[] = [
  { slug: 'real-estate', lastmod: '2026-05-27' },
  { slug: 'marketing-agencies', lastmod: '2026-05-27' },
]

export default useCases
