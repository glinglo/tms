import type { VercelRequest } from '@vercel/node'
import { getSupabaseAdmin } from './supabaseAdmin'

export async function requireUserId(req: VercelRequest): Promise<string | null> {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return null
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    console.error('[auth] Supabase admin client not configured')
    return null
  }

  const token = header.slice(7)
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error) {
    console.error('[auth] getUser failed:', error.message)
    return null
  }
  if (!user) return null
  return user.id
}
