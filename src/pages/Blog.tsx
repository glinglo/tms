import { Link } from 'react-router-dom'
import LandingMeta from '../components/landing/LandingMeta'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const posts = [
  {
    slug: '/blog/google-maps-scraper-api/',
    title: 'Google Maps Scraper API: How to Extract Data Programmatically [2026]',
    excerpt:
      'Access Google Maps data via API. Compare the official Google Places API vs scraper APIs from Apify, Outscraper, and more. Pricing, limits, and when to skip the API entirely.',
    date: '2026-06-01',
    readTime: '10 min read',
  },
  {
    slug: '/blog/scrape-google-maps-reviews/',
    title: 'How to Scrape Google Maps Reviews: Complete Guide [2026]',
    excerpt:
      'Extract Google Maps reviews at scale. Learn how to scrape review text, ratings, dates, and reviewer data. Tools, methods, and use cases for review analysis.',
    date: '2026-06-01',
    readTime: '10 min read',
  },
  {
    slug: '/blog/google-maps-scraper-extension-vs-web-app/',
    title: 'Google Maps Scraper Extension vs Web App: What to Use in 2026',
    excerpt:
      'Chrome extensions for Google Maps scraping are convenient but fragile. This guide compares extension-based scrapers vs web app scrapers so you can choose the right tool.',
    date: '2026-05-31',
    readTime: '9 min read',
  },
  {
    slug: '/blog/google-maps-lead-generation-guide/',
    title: 'Google Maps Lead Generation: The Complete Guide [2026]',
    excerpt:
      'How to use Google Maps as a systematic lead generation channel. Strategies for finding SMB prospects, personalizing outreach, and building a repeatable sales process.',
    date: '2026-05-28',
    readTime: '12 min read',
  },
  {
    slug: '/blog/best-google-maps-scrapers/',
    title: '7 Best Google Maps Scrapers Compared [2026]',
    excerpt:
      'Honest comparison of the seven best Google Maps scrapers in 2026. TheMapScraper, Apify, Outscraper, Scrap.io, and more. Features, pricing, and who each tool is best for.',
    date: '2026-05-28',
    readTime: '12 min read',
  },
  {
    slug: '/blog/how-to-scrape-google-maps/',
    title: 'How to Scrape Google Maps in 2026',
    excerpt:
      'A step-by-step guide to extracting business leads from Google Maps without code. Covers no-code tools, what data you can extract, and how to use it for sales prospecting.',
    date: '2026-05-28',
    readTime: '11 min read',
  },
]

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Blog() {
  return (
    <>
      <LandingMeta
        title="Google Maps Scraping Blog — Guides, Tips & Tools | TheMapScraper"
        description="Guides and tutorials on Google Maps scraping, lead generation, and business data extraction. Learn how to extract leads without code."
        path="/blog/"
        robots="noindex, follow"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.themapscraper.com/' },
          { name: 'Blog', url: 'https://www.themapscraper.com/blog/' },
        ]}
      />

      <div className="bg-cream border-b border-border-subtle py-14">
        <div className="max-w-[1080px] mx-auto px-6">
          <h1 className="font-display text-4xl font-bold text-ink tracking-tight mb-3">Google Maps Scraping — Guides &amp; Resources</h1>
          <p className="font-sans text-base text-ink-muted m-0">
            Guides, tutorials, and tips for extracting data from Google Maps. Ready to get started? Use the{' '}
            <Link to="/" className="text-brand font-semibold hover:underline">
              Google Maps scraper
            </Link>
            {' '}to pull your first list of leads in minutes.
          </p>
        </div>
      </div>

      <div className="max-w-[1080px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={post.slug}
              className="no-underline group"
            >
              <article className="bg-white border border-border-subtle rounded-2xl p-7 h-full flex flex-col transition-shadow duration-200 hover:shadow-md">
                <div className="flex items-center gap-2 font-sans text-xs text-ink-muted mb-4">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="text-[rgba(32,32,32,0.25)]">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="font-display text-xl font-bold text-ink tracking-tight leading-snug mb-3 group-hover:text-brand transition-colors duration-150">
                  {post.title}
                </h2>
                <p className="font-sans text-sm text-ink-muted leading-relaxed flex-1 mb-5">
                  {post.excerpt}
                </p>
                <span className="font-sans text-sm font-semibold text-brand">
                  Read article &rarr;
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
