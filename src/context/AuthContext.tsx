import { createContext, useContext, useState, type ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'
import type { User } from '@supabase/supabase-js'

type ModalMode = 'signup' | 'login' | null

interface AuthContextValue {
  user: User | null
  loading: boolean
  signOut: () => void
  modalMode: ModalMode
  openSignUp: () => void
  openLogin: () => void
  closeModal: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading, signOut } = useAuth()
  const [modalMode, setModalMode] = useState<ModalMode>(null)

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signOut,
      modalMode,
      openSignUp: () => setModalMode('signup'),
      openLogin: () => setModalMode('login'),
      closeModal: () => setModalMode(null),
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}
