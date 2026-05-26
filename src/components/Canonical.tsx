import { useEffect } from 'react'

const BASE = 'https://themapscraper.com'

export default function Canonical({ path }: { path: string }) {
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = `${BASE}${path}`
    return () => { if (link) link.removeAttribute('href') }
  }, [path])
  return null
}
