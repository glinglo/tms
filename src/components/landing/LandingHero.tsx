import { Link } from 'react-router-dom'

interface LandingHeroProps {
  h1: string
  subtitle: string
  ctaText: string
  ctaHref: string
  badge?: string
}

export default function LandingHero({ h1, subtitle, ctaText, ctaHref, badge }: LandingHeroProps) {
  return (
    <section className="bg-cream px-6 pt-24 pb-20">
      <div className="max-w-[800px] mx-auto text-center">
        {badge && (
          <div className="inline-flex items-center gap-[6px] bg-white border border-border-subtle rounded-pill px-[14px] py-[5px] mb-8">
            <span className="w-[6px] h-[6px] rounded-full bg-[#2b9a66] inline-block" />
            <span className="font-sans text-xs font-semibold text-ink-muted">{badge}</span>
          </div>
        )}

        <h1
          className="font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-ink mb-6"
          style={{ fontSize: 'clamp(34px, 5.5vw, 68px)' }}
        >
          {h1}
        </h1>

        <p className="font-sans text-lg font-normal leading-relaxed text-ink-muted mb-8 max-w-[580px] mx-auto">
          {subtitle}
        </p>

        <Link
          to={ctaHref}
          className="inline-flex items-center gap-2 bg-brand text-white font-sans text-[15px] font-semibold px-8 py-4 rounded-pill no-underline transition-colors duration-150 hover:bg-brand-dark"
        >
          {ctaText} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
