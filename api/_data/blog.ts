export interface ContentEntry {
  slug: string
  lastmod: string // YYYY-MM-DD
}

// Add new blog posts here — sitemap updates automatically on next deploy.
const blog: ContentEntry[] = []

export default blog
