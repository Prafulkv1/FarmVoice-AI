import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)

  function onSubmit(e) {
    e.preventDefault()
    navigate('/app/dashboard')
  }

  return (
    <div className="auth-card-wrap">
      <div className="auth-card">
        <div className="auth-card-logo">
          <span className="logo-circle" aria-hidden="true">🌿</span>
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Sign in to continue to your smart farming assistant</p>

        <form onSubmit={onSubmit} className="auth-form" noValidate={false}>
          <label className="field">
            <span className="field-label">Mobile Number or Email</span>
            <span className="input-wrap">
              <span className="input-icon" aria-hidden="true">📱</span>
              <input type="text" name="identifier" placeholder="e.g. 98765 43210 or you@example.com" autoComplete="username" required />
            </span>
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <span className="input-wrap">
              <span className="input-icon" aria-hidden="true">🔒</span>
              <input
                type={showPw ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="pw-toggle"
                aria-label={showPw ? 'Hide password' : 'Show password'}
                onClick={() => setShowPw((v) => !v)}
              >
                {showPw ? '🙈' : '👁'}
              </button>
            </span>
          </label>

          <div className="form-row">
            <label className="remember">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span>Remember me</span>
            </label>
            <Link to="/login" className="forgot" onClick={(e) => e.preventDefault()}>Forgot Password?</Link>
          </div>

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>
        <div className="auth-social">
          <button type="button" className="btn-ghost">🔍 Google</button>
          <button type="button" className="btn-ghost">🎙 Voice OTP</button>
        </div>

        <p className="auth-switch">Don’t have an account? <Link to="/register">Create Account</Link></p>
        <p className="auth-demo-link">Preview app shell → <Link to="/app/dashboard">Open demo layout</Link></p>
      </div>
    </div>
  )
}
