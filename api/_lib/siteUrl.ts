/** Canonical public site URL (no trailing slash). Used for Stripe redirects, etc. */
export function getSiteUrl(): string {
  const raw =
    process.env.SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim() ||
    'https://www.themapscraper.com'

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  return withProtocol.replace(/\/$/, '')
}
