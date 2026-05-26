import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'cookie_consent'

export type ConsentValue = 'accepted' | 'declined'

export function getConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'accepted' || v === 'declined') return v
  } catch {}
  return null
}

function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {}
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getConsent() === null) setVisible(true)
  }, [])

  const handleAccept = () => {
    setConsent('accepted')
    setVisible(false)
    window.dispatchEvent(new Event('consent-updated'))
  }

  const handleDecline = () => {
    setConsent('declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none">
      <div className="max-w-2xl mx-auto bg-cream border border-border-subtle rounded-[16px] shadow-[0_-2px_16px_rgba(32,32,32,0.08),0_4px_24px_rgba(32,32,32,0.10)] px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 pointer-events-auto">
        <p className="font-sans text-sm text-ink-muted m-0 flex-1 leading-relaxed">
          We use analytics cookies to understand how you use our site and improve your experience.{' '}
          <Link to="/privacy-policy" className="text-brand underline underline-offset-2 hover:text-brand-dark">
            Privacy Policy
          </Link>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="font-sans text-sm font-semibold text-ink bg-transparent border border-border-subtle rounded-pill px-4 py-[8px] cursor-pointer transition-colors duration-150 hover:bg-[rgba(32,32,32,0.06)] whitespace-nowrap"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="font-sans text-sm font-semibold text-white bg-brand border-none rounded-pill px-4 py-[8px] cursor-pointer transition-colors duration-150 hover:bg-brand-dark whitespace-nowrap"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
