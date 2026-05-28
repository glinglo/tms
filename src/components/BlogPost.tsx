import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LandingMeta from './landing/LandingMeta'
import BreadcrumbSchema from './BreadcrumbSchema'
import JsonLd from './JsonLd'
import LandingCTA from './landing/LandingCTA'

interface BlogPostProps {
  title: string
  description: string
  canonical: string   // path, e.g. /blog/how-to-scrape-google-maps/
  date: string        // ISO: 2026-05-28
  readTime: string    // e.g. "11 min read"
  children: React.ReactNode
}

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const BASE = 'https://themapscraper.com'

export default function BlogPost({ title, description, canonical, date, readTime, children }: BlogPostProps) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const breadcrumbItems = [
    { name: 'Home', url: `${BASE}/` },
    { name: 'Blog', url: `${BASE}/blog/` },
    { name: title, url: `${BASE}${canonical}` },
  ]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    datePublished: date,
    dateModified: date,
    author: { '@type': 'Organization', name: 'TheMapScraper' },
    publisher: { '@type': 'Organization', name: 'TheMapScraper' },
  }

  return (
    <>
      <LandingMeta title={title} description={description} path={canonical} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <JsonLd data={articleSchema} />

      <header className="bg-cream border-b border-border-subtle py-14">
        <div className="max-w-[720px] mx-auto px-6">
          <nav className="mb-5 flex items-center gap-2 font-sans text-xs text-ink-muted">
            <Link to="/" className="hover:text-ink transition-colors duration-150 no-underline">Home</Link>
            <span>/</span>
            <Link to="/blog/" className="hover:text-ink transition-colors duration-150 no-underline">Blog</Link>
          </nav>
          <h1 className="font-display text-4xl font-bold text-ink tracking-tight leading-[1.15] mb-5">
            {title}
          </h1>
          <div className="flex items-center gap-3 font-sans text-sm text-ink-muted">
            <time dateTime={date}>{formatDate(date)}</time>
            <span className="text-[rgba(32,32,32,0.25)]">·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </header>

      <article>
        <div className="max-w-[720px] mx-auto px-6 py-12">
          {children}
        </div>
      </article>

      <LandingCTA
        headline="Start extracting Google Maps leads today"
        ctaText="Get 50 free leads"
        subtext="No credit card required. Results in under two minutes."
      />
    </>
  )
}
