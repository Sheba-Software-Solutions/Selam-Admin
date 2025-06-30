import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Mail, Lock } from 'lucide-react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (onLogin) onLogin()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200">
      <div className="relative w-full max-w-md flex flex-col items-center justify-center min-h-[80vh]">
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 rounded-3xl p-1 bg-gradient-to-tr from-blue-400 via-indigo-400 to-purple-400 blur-md opacity-60 animate-pulse z-0" />
        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 flex flex-col gap-10 border border-slate-200/40 min-h-[480px] justify-center"
          aria-label="Login form"
        >
          <div className="flex flex-col items-center gap-3 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 text-base">Sign in to your Selam Admin dashboard</p>
          </div>
          <div className="flex flex-col gap-6">
            <label className="flex flex-col gap-2 text-slate-700 font-semibold">
              Email
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="pl-10 py-3 rounded-xl border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-400/60 text-base transition-all duration-200"
                  autoComplete="email"
                  aria-label="Email address"
                />
              </div>
            </label>
            <label className="flex flex-col gap-2 text-slate-700 font-semibold">
              Password
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="pl-10 py-3 rounded-xl border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400/60 text-base transition-all duration-200"
                  autoComplete="current-password"
                  aria-label="Password"
                />
              </div>
            </label>
            <div className="flex justify-end">
              <button type="button" className="text-xs text-blue-600 hover:underline focus:outline-none">Forgot password?</button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-3 font-bold shadow-lg transition-all duration-200 text-lg mt-2 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          {/* Placeholder for future SSO/social login */}
        </form>
      </div>
    </div>
  )
} 