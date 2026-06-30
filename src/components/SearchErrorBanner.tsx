import type { ScrapeErrorCode } from '../lib/scrapeErrors'
import { isNoCreditsCode, isServiceUnavailableCode } from '../lib/scrapeErrors'

interface SearchErrorBannerProps {
  message: string
  code?: ScrapeErrorCode
  onBuyCredits?: () => void
  /** Dashboard search vs exports re-download */
  context?: 'search' | 'redownload'
}

export default function SearchErrorBanner({
  message,
  code,
  onBuyCredits,
  context = 'search',
}: SearchErrorBannerProps) {
  const showBuyCredits = isNoCreditsCode(code) && onBuyCredits
  const isTemporary = isServiceUnavailableCode(code)

  const heading = isTemporary
    ? context === 'redownload'
      ? 'Re-download temporarily unavailable'
      : 'Search temporarily unavailable'
    : context === 'redownload'
      ? "We couldn't re-download this export"
      : "We couldn't complete your search"

  const footnote = isTemporary
    ? context === 'redownload'
      ? 'Re-download runs a fresh search at no extra cost. Try again later.'
      : 'Your leads were not used. Try again later or use fewer leads with lead enrichment off.'
    : null

  const bodyText = isTemporary
    ? context === 'redownload'
      ? 'We cannot fetch results right now. Please try again in a few hours or contact support if this continues.'
      : 'Lead search is temporarily unavailable. Please try again in a few hours or contact support if this continues.'
    : message

  return (
    <div
      className={`rounded-[10px] px-[18px] py-[14px] mb-5 border ${
        isTemporary
          ? 'bg-[#f8f8f6] border-[rgba(32,32,32,0.12)]'
          : 'bg-[#fff8f0] border-[rgba(234,40,4,0.2)]'
      }`}
      role="alert"
    >
      <p className="font-sans text-sm font-semibold text-ink m-0 mb-1">{heading}</p>
      <p className="font-sans text-sm text-ink-muted m-0 leading-relaxed">{bodyText}</p>
      {showBuyCredits && (
        <button
          type="button"
          onClick={onBuyCredits}
          className="mt-3 font-sans text-[13px] font-semibold text-brand bg-transparent border-none cursor-pointer p-0 underline"
        >
          Buy leads →
        </button>
      )}
      {footnote && (
        <p className="font-sans text-xs text-ink-faint m-0 mt-2">{footnote}</p>
      )}
    </div>
  )
}
