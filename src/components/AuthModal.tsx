import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { getClientSiteUrl } from '../lib/siteUrl'

type Mode = 'signup' | 'login'
type Status = 'idle' | 'loading' | 'success' | 'error'

export default function AuthModal() {
  const { modalMode, closeModal, openSignUp, openLogin } = useAuthContext()
  const navigate = useNavigate()

  const [mode, setMode] = useState<Mode>(modalMode === 'login' ? 'login' : 'signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (modalMode) {
      setMode(modalMode)
      setStatus('idle')
      setErrorMsg('')
      setEmail('')
      setPassword('')
    }
  }, [modalMode])

  if (!modalMode) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const { supabase } = await import('../lib/supabase')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${getClientSiteUrl()}/dashboard`,
        },
      })
      if (error) {
        setErrorMsg(error.message)
        setStatus('error')
      } else {
        setStatus('success')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setErrorMsg(error.message)
        setStatus('error')
      } else {
        closeModal()
        navigate('/dashboard')
      }
    }
  }

  const switchMode = (next: Mode) => {
    setMode(next)
    setStatus('idle')
    setErrorMsg('')
    if (next === 'signup') openSignUp()
    else openLogin()
  }

  const isLoading = status === 'loading'

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes modalSlideUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes spin { to { transform:rotate(360deg) } }
      `}</style>

      <div
        onClick={closeModal}
        className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.45)] backdrop-blur-[2px]"
        style={{ animation: 'fadeIn 0.15s ease' }}
      />

      <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-cream rounded-[20px] border border-[rgba(32,32,32,0.10)] p-10 w-full max-w-[420px] pointer-events-auto relative"
          style={{ animation: 'modalSlideUp 0.2s cubic-bezier(0.22,1,0.36,1) forwards' }}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-transparent border-none cursor-pointer w-8 h-8 rounded-pill flex items-center justify-center text-ink-faint text-lg leading-none transition-colors duration-150 hover:bg-[rgba(32,32,32,0.06)] hover:text-ink"
          >
            ×
          </button>

          <h2 className="font-display text-[26px] font-bold tracking-[-0.02em] text-ink m-0 mb-[6px]">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="font-sans text-sm text-ink-faint m-0 mb-7">
            {mode === 'signup'
              ? 'Sign up free — no credit card required'
              : 'Sign in to access your leads'}
          </p>

          {status === 'success' && mode === 'signup' ? (
            <div className="bg-[#f0fdf4] border border-[rgba(34,197,94,0.3)] rounded-[12px] px-5 py-4 font-sans text-sm text-[#166534] leading-[1.5]">
              <strong>Check your email!</strong><br />
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
              <div className="flex flex-col gap-[6px]">
                <label className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.06em]">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="font-sans text-[15px] text-ink bg-white border border-[rgba(32,32,32,0.15)] rounded-pill px-[18px] py-3 outline-none transition-colors duration-150 focus:border-brand"
                />
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.06em]">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                  className="font-sans text-[15px] text-ink bg-white border border-[rgba(32,32,32,0.15)] rounded-pill px-[18px] py-3 outline-none transition-colors duration-150 focus:border-brand"
                />
              </div>

              {status === 'error' && (
                <p className="font-sans text-[13px] text-brand m-0">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`mt-1 font-sans text-[15px] font-semibold text-white border-none rounded-pill py-[14px] flex items-center justify-center gap-2 transition-colors duration-150 ${isLoading ? 'bg-[#f0a090] cursor-not-allowed' : 'bg-brand cursor-pointer hover:bg-brand-dark'}`}
              >
                {isLoading ? (
                  <>
                    <span
                      className="inline-block w-[14px] h-[14px] rounded-full border-2 border-[rgba(255,255,255,0.4)] border-t-white"
                      style={{ animation: 'spin 0.7s linear infinite' }}
                    />
                    {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
                  </>
                ) : (
                  mode === 'signup' ? 'Create account' : 'Sign in'
                )}
              </button>
            </form>
          )}

          <p className="font-sans text-[13px] text-ink-faint mt-5 m-0 text-center">
            {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => switchMode(mode === 'signup' ? 'login' : 'signup')}
              className="bg-transparent border-none cursor-pointer font-sans text-[13px] font-semibold text-brand p-0"
            >
              {mode === 'signup' ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
