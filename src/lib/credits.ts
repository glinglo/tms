export const FREE_MONTHLY_CREDITS = 25

export interface CreditWallet {
  freeRemaining: number
  paidBalance: number
  totalAvailable: number
  freeMonthly: number
  freeUsed: number
  creditsPeriod: string
}

export interface ProfileCreditsRow {
  credits_balance: number
  free_credits_used: number
  credits_period: string | null
}

export function currentCreditsPeriod(): string {
  const now = new Date()
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

/** Mirrors server wallet math (read-only; period reset on write happens in API). */
export function computeWalletFromProfile(
  row: ProfileCreditsRow,
  period = currentCreditsPeriod(),
): CreditWallet {
  const paidBalance = Math.max(0, row.credits_balance ?? 0)
  const freeUsed =
    row.credits_period === period ? Math.max(0, row.free_credits_used ?? 0) : 0
  const freeRemaining = Math.max(0, FREE_MONTHLY_CREDITS - freeUsed)

  return {
    freeRemaining,
    paidBalance,
    totalAvailable: freeRemaining + paidBalance,
    freeMonthly: FREE_MONTHLY_CREDITS,
    freeUsed,
    creditsPeriod: period,
  }
}

/** Single balance shown in the UI (free + paid combined on the server). */
export function formatCreditsLabel(total: number | null): string {
  if (total === null) return '— leads'
  if (total === 0) return '0 leads remaining'
  return `${total.toLocaleString()} leads remaining`
}
