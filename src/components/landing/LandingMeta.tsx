import { useEffect } from 'react'
import Canonical from '../Canonical'

interface LandingMetaProps {
  title: string
  description: string
  path: string
  robots?: string
}

const BASE = 'https://www.themapscraper.com'
const OG_IMAGE = 'https://www.themapscraper.com/og-image.png'

function getContent(selector: string): string {
  return document.querySelector<HTMLMetaElement>(selector)?.content ?? ''
}

function setContent(attr: 'name' | 'property', key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
}

export default function LandingMeta({ title, description, path, robots }: LandingMetaProps) {
  useEffect(() => {
    const orig = {
      title: document.title,
      desc:    getContent('meta[name="description"]'),
      ogTitle: getContent('meta[property="og:title"]'),
      ogDesc:  getContent('meta[property="og:description"]'),
      ogUrl:   getContent('meta[property="og:url"]'),
      twTitle: getContent('meta[name="twitter:title"]'),
      twDesc:  getContent('meta[name="twitter:description"]'),
      robots:  getContent('meta[name="robots"]'),
    }

    document.title = title
    setContent('name',     'description',       description)
    setContent('property', 'og:title',          title)
    setContent('property', 'og:description',    description)
    setContent('property', 'og:url',            `${BASE}${path}`)
    setContent('property', 'og:image',          OG_IMAGE)
    setContent('name',     'twitter:title',     title)
    setContent('name',     'twitter:description', description)
    setContent('name',     'twitter:image',     OG_IMAGE)
    if (robots) setContent('name', 'robots', robots)

    return () => {
      document.title = orig.title
      setContent('name',     'description',       orig.desc)
      setContent('property', 'og:title',          orig.ogTitle)
      setContent('property', 'og:description',    orig.ogDesc)
      setContent('property', 'og:url',            orig.ogUrl)
      setContent('name',     'twitter:title',     orig.twTitle)
      setContent('name',     'twitter:description', orig.twDesc)
      if (robots) setContent('name', 'robots', orig.robots)
    }
  }, [title, description, path, robots])

  return <Canonical path={path} />
}
