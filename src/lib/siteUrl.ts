/** Client-side canonical origin for Supabase auth redirects. */
export function getClientSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined
  if (fromEnv?.trim()) {
    const raw = fromEnv.trim()
    return (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).replace(/\/$/, '')
  }
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return 'https://www.themapscraper.com'
}
