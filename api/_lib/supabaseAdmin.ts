import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function supabaseUrl(): string | undefined {
  const raw = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  return raw?.trim() || undefined
}

export function isSupabaseAdminConfigured(): boolean {
  return Boolean(supabaseUrl() && process.env.SUPABASE_SERVICE_KEY?.trim())
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = supabaseUrl()
  const key = process.env.SUPABASE_SERVICE_KEY?.trim()
  if (!url || !key) return null
  return createClient(url, key)
}

export function supabaseAdminConfigHint(): string | undefined {
  if (isSupabaseAdminConfigured()) return undefined
  const missing: string[] = []
  if (!supabaseUrl()) missing.push('SUPABASE_URL (or VITE_SUPABASE_URL)')
  if (!process.env.SUPABASE_SERVICE_KEY?.trim()) missing.push('SUPABASE_SERVICE_KEY')
  const vars = missing.join(' and ')
  if (process.env.NODE_ENV === 'development') {
    return `Add ${vars} to .env (service role from Supabase → Project Settings → API), then restart npm run dev:api.`
  }
  return `Set ${vars} in Vercel → Project → Settings → Environment Variables (Production).`
}
