import { supabase } from './supabase'

export async function authHeaders(): Promise<Record<string, string>> {
  let { data: { session } } = await supabase.auth.getSession()

  if (!session?.access_token) {
    const refreshed = await supabase.auth.refreshSession()
    session = refreshed.data.session
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (session?.access_token) {
    headers.Authorization = `Bearer ${session.access_token}`
  }
  return headers
}
