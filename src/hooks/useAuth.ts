import { useEffect, useRef, useState } from 'react'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const unsubRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    import('../lib/supabase').then(({ supabase }) => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })
      unsubRef.current = () => subscription.unsubscribe()
    })

    return () => unsubRef.current?.()
  }, [])

  const signOut = () => {
    import('../lib/supabase').then(({ supabase }) => supabase.auth.signOut())
  }

  return { user, loading, signOut }
}
