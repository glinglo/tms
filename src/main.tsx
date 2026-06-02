import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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

// Always use createRoot. The pre-rendered HTML in #root exists solely for
// crawlers (SEO meta tags, H1, schema). Real users get a full client render.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
