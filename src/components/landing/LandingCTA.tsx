import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

interface LandingCTAProps {
  headline: string
  ctaText: string
  ctaHref?: string
  subtext?: string
}

export default function LandingCTA({ headline, ctaText, subtext }: LandingCTAProps) {
  const { user, openSignUp } = useAuthContext()
  const navigate = useNavigate()

  function handleCta() {
    if (user) navigate('/dashboard')
    else openSignUp()
  }

  return (
    <section className="bg-ink py-24 px-6">
      <div className="max-w-[600px] mx-auto text-center">
        <h2
          className="font-display font-bold leading-[1.1] tracking-[-0.025em] text-[#fcfcfc] m-0 mb-6"
          style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
        >
          {headline}
        </h2>
        <button
          onClick={handleCta}
          className="inline-flex items-center gap-2 bg-brand text-white font-sans text-[15px] font-semibold px-8 py-4 rounded-pill border-none cursor-pointer transition-colors duration-150 hover:bg-brand-dark"
        >
          {ctaText} <span aria-hidden="true">→</span>
        </button>
        {subtext && (
          <p className="font-sans text-sm text-[rgba(252,252,252,0.4)] m-0 mt-4">{subtext}</p>
        )}
      </div>
    </section>
  )
}
