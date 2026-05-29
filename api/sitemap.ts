import type { VercelRequest, VercelResponse } from '@vercel/node'
import blog from './_data/blog.js'
import alternatives from './_data/alternatives.js'
import useCases from './_data/use-cases.js'
import scrapePages from './_data/scrape.js'

const BASE_URL = 'https://www.themapscraper.com'
const TODAY = new Date().toISOString().split('T')[0]

interface UrlEntry {
  loc: string
  lastmod: string
  changefreq: string
  priority: string
}

const STATIC_PAGES: UrlEntry[] = [
  { loc: '/', lastmod: TODAY, changefreq: 'weekly', priority: '1.0' },
  { loc: '/pricing/', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  // Comparisons hub
  { loc: '/alternatives/', lastmod: '2026-05-27', changefreq: 'monthly', priority: '0.8' },
  // Use cases hub
  { loc: '/use-cases/', lastmod: '2026-05-27', changefreq: 'monthly', priority: '0.8' },
  // Transactional landing pages
  { loc: '/google-maps-lead-extractor/', lastmod: '2025-05-01', changefreq: 'monthly', priority: '0.9' },
  { loc: '/extract-emails-google-maps/', lastmod: '2025-05-01', changefreq: 'monthly', priority: '0.9' },
  { loc: '/google-maps-data-scraper-csv/', lastmod: '2025-05-01', changefreq: 'monthly', priority: '0.9' },
  { loc: '/google-maps-business-scraper-free/', lastmod: '2025-05-01', changefreq: 'monthly', priority: '0.9' },
  // Legal
  { loc: '/privacy-policy/', lastmod: '2025-01-01', changefreq: 'yearly', priority: '0.2' },
  { loc: '/terms-of-service/', lastmod: '2025-01-01', changefreq: 'yearly', priority: '0.2' },
]

function urlTag(entry: UrlEntry): string {
  return `  <url>
    <loc>${BASE_URL}${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
}

function buildUrlset(entries: UrlEntry[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(urlTag),
    '</urlset>',
  ].join('\n')
}

function buildSitemapIndex(sitemaps: string[]): string {
  const today = TODAY
  const tags = sitemaps.map(
    (name) => `  <sitemap>\n    <loc>${BASE_URL}/sitemap-${name}.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`
  )
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...tags,
    '</sitemapindex>',
  ].join('\n')
}

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const dynamicEntries: UrlEntry[] = [
    ...blog.map((p) => ({
      loc: `/blog/${p.slug}/`,
      lastmod: p.lastmod,
      changefreq: 'weekly',
      priority: '0.7',
    })),
    ...alternatives.map((p) => ({
      loc: `/alternatives/${p.slug}/`,
      lastmod: p.lastmod,
      changefreq: 'monthly',
      priority: '0.8',
    })),
    ...useCases.map((p) => ({
      loc: `/use-cases/${p.slug}/`,
      lastmod: p.lastmod,
      changefreq: 'monthly',
      priority: '0.8',
    })),
    ...scrapePages.map((p) => ({
      loc: `/scrape/${p.slug}/`,
      lastmod: p.lastmod,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ]

  const allEntries = [...STATIC_PAGES, ...dynamicEntries]

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')

  // If over 50 000 URLs, switch to sitemap index split by section
  const LIMIT = 50_000
  if (allEntries.length > LIMIT) {
    res.status(200).send(buildSitemapIndex(['static', 'blog', 'alternatives', 'use-cases', 'scrape']))
    return
  }

  res.status(200).send(buildUrlset(allEntries))
}
