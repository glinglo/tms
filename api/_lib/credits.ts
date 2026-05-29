import type { SupabaseClient } from '@supabase/supabase-js'

export const FREE_MONTHLY_CREDITS = 50

export function currentCreditsPeriod(): string {
  const now = new Date()
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

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

export async function syncCreditPeriod(
  supabase: SupabaseClient,
  userId: string,
  row: ProfileCreditsRow,
): Promise<ProfileCreditsRow> {
  const period = currentCreditsPeriod()
  if (row.credits_period === period) return row

  const { data, error } = await supabase
    .from('profiles')
    .update({
      credits_period: period,
      free_credits_used: 0,
    })
    .eq('id', userId)
    .select('credits_balance, free_credits_used, credits_period')
    .single()

  if (error || !data) {
    throw new Error(`Failed to sync credit period: ${error?.message ?? 'no row'}`)
  }

  return data as ProfileCreditsRow
}

export async function getCreditWallet(
  supabase: SupabaseClient,
  userId: string,
): Promise<CreditWallet | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('credits_balance, free_credits_used, credits_period')
    .eq('id', userId)
    .single()

  if (error || !data) return null

  const synced = await syncCreditPeriod(supabase, userId, data as ProfileCreditsRow)
  return computeWalletFromProfile(synced)
}

export type DeductCreditsResult =
  | { ok: true; wallet: CreditWallet }
  | { ok: false; reason: 'insufficient'; wallet: CreditWallet }

export async function deductCredits(
  supabase: SupabaseClient,
  userId: string,
  amount: number,
): Promise<DeductCreditsResult> {
  const { data, error } = await supabase
    .from('profiles')
    .select('credits_balance, free_credits_used, credits_period')
    .eq('id', userId)
    .single()

  if (error || !data) {
    throw new Error('Profile not found')
  }

  const synced = await syncCreditPeriod(supabase, userId, data as ProfileCreditsRow)
  const wallet = computeWalletFromProfile(synced)

  if (amount > wallet.totalAvailable) {
    return { ok: false, reason: 'insufficient', wallet }
  }

  const useFree = Math.min(amount, wallet.freeRemaining)
  const usePaid = amount - useFree
  const newFreeUsed = wallet.freeUsed + useFree
  const newPaidBalance = wallet.paidBalance - usePaid

  const { error: updateErr } = await supabase
    .from('profiles')
    .update({
      free_credits_used: newFreeUsed,
      credits_balance: newPaidBalance,
      credits_period: wallet.creditsPeriod,
    })
    .eq('id', userId)

  if (updateErr) {
    throw new Error('Failed to update credits')
  }

  return {
    ok: true,
    wallet: computeWalletFromProfile({
      credits_balance: newPaidBalance,
      free_credits_used: newFreeUsed,
      credits_period: wallet.creditsPeriod,
    }),
  }
}
