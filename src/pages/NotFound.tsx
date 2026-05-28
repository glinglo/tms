import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found | TheMapScraper'
    const meta = Object.assign(document.createElement('meta'), {
      name: 'robots',
      content: 'noindex',
    })
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="font-sans text-5xl font-bold text-[rgba(32,32,32,0.12)] mb-6 tracking-tight">
        404
      </p>
      <h1 className="font-display text-2xl font-bold text-ink tracking-tight mb-3">
        Page not found
      </h1>
      <p className="font-sans text-base text-ink-muted mb-8 max-w-sm">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="font-sans text-sm font-semibold text-white bg-brand px-6 py-3 rounded-pill no-underline transition-colors duration-150 hover:bg-brand-dark"
      >
        Go to homepage
      </Link>
    </div>
  )
}
