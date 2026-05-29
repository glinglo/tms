import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function supabaseUrl(): string | undefined {
  return process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
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
  if (process.env.NODE_ENV === 'development') {
    return 'Add SUPABASE_URL and SUPABASE_SERVICE_KEY to .env (service role secret from Supabase → Project Settings → API), then restart npm run dev:api.'
  }
  return undefined
}
