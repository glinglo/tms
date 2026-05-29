export const LEAD_LIMIT_OPTIONS = [50, 100, 250, 500] as const

/** Largest preset ≤ credits, or exact balance when below the minimum preset. */
export function maxLeadOptionForCredits(credits: number): number {
  const allowed = LEAD_LIMIT_OPTIONS.filter((n) => n <= credits)
  if (allowed.length > 0) return allowed[allowed.length - 1]
  return Math.max(1, credits)
}

export function leadLimitOptionsForCredits(credits: number | null): number[] {
  if (credits === null || credits <= 0) return [...LEAD_LIMIT_OPTIONS]
  const fromPresets = LEAD_LIMIT_OPTIONS.filter((n) => n <= credits)
  if (fromPresets.length > 0) return [...fromPresets]
  return [Math.max(1, credits)]
}

export function clampLeadLimit(value: number, credits: number | null): number {
  if (credits === null || credits <= 0) return value
  const options = leadLimitOptionsForCredits(credits)
  if (options.includes(value)) return value
  return maxLeadOptionForCredits(credits)
}
