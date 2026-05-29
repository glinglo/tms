import type { ScrapeErrorCode } from '../lib/scrapeErrors'
import { isNoCreditsCode, isServiceUnavailableCode } from '../lib/scrapeErrors'

interface SearchErrorBannerProps {
  message: string
  code?: ScrapeErrorCode
  onBuyCredits?: () => void
}

export default function SearchErrorBanner({
  message,
  code,
  onBuyCredits,
}: SearchErrorBannerProps) {
  const showBuyCredits = isNoCreditsCode(code) && onBuyCredits
  const isTemporary = isServiceUnavailableCode(code)

  return (
    <div
      className={`rounded-[10px] px-[18px] py-[14px] mb-5 border ${
        isTemporary
          ? 'bg-[#f8f8f6] border-[rgba(32,32,32,0.12)]'
          : 'bg-[#fff8f0] border-[rgba(234,40,4,0.2)]'
      }`}
      role="alert"
    >
      <p className="font-sans text-sm font-semibold text-ink m-0 mb-1">
        {isTemporary ? 'Search temporarily unavailable' : "We couldn't complete your search"}
      </p>
      <p className="font-sans text-sm text-ink-muted m-0 leading-relaxed">{message}</p>
      {showBuyCredits && (
        <button
          type="button"
          onClick={onBuyCredits}
          className="mt-3 font-sans text-[13px] font-semibold text-brand bg-transparent border-none cursor-pointer p-0 underline"
        >
          Buy credits →
        </button>
      )}
      {isTemporary && (
        <p className="font-sans text-xs text-ink-faint m-0 mt-2">
          Your credits were not used. Try again later or use fewer leads with lead enrichment off.
        </p>
      )}
    </div>
  )
}
