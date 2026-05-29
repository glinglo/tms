export const FREE_MONTHLY_CREDITS = 50

export interface CreditWallet {
  freeRemaining: number
  paidBalance: number
  totalAvailable: number
  freeMonthly: number
  freeUsed: number
  creditsPeriod: string
}

/** Single balance shown in the UI (free + paid combined on the server). */
export function formatCreditsLabel(total: number | null): string {
  if (total === null) return '— credits'
  if (total === 0) return '0 credits remaining'
  return `${total.toLocaleString()} credits remaining`
}
