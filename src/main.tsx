import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import { getConsent } from './components/CookieBanner'
import './index.css'
import App from './App.tsx'

function maybeInjectAnalytics() {
  if (getConsent() === 'accepted') {
    inject()
  }
}

maybeInjectAnalytics()

// Re-check after the user accepts via the banner
window.addEventListener('consent-updated', maybeInjectAnalytics, { once: true })

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Use hydrateRoot on SSR-prerendered pages so the static H1/content is preserved
// as the LCP element rather than being wiped and re-painted by createRoot.
// Non-SSR pages have an empty #root and fall through to createRoot (same behaviour as before).
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
