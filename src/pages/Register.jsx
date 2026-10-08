import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LANGUAGES } from '../data/appData.js'
import '../styles/auth.css'

export default function Register() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    navigate('/app/dashboard')
  }

  return (
    <div className="auth-card-wrap auth-card-wrap--register">
      <div className="auth-card auth-card--wide">
        <div className="auth-card-logo">
          <span className="logo-circle" aria-hidden="true">🌿</span>
        </div>
        <h2 className="auth-title">Create Your FarmVoice Account</h2>
        <p className="auth-sub">Get personalized farming assistance in your preferred language.</p>

        <form onSubmit={onSubmit} className="auth-form">
          <div className="grid-2">
            <label className="field">
              <span className="field-label">Full Name</span>
              <span className="input-wrap">
                <span className="input-icon" aria-hidden="true">👤</span>
                <input type="text" placeholder="e.g. Ravi Kumar" autoComplete="name" required />
              </span>
            </label>
            <label className="field">
              <span className="field-label">Mobile Number</span>
              <span className="input-wrap">
                <span className="input-icon" aria-hidden="true">📱</span>
                <input type="tel" placeholder="10-digit mobile number" autoComplete="tel" required />
              </span>
            </label>
          </div>

          <label className="field">
            <span className="field-label">Email</span>
            <span className="input-wrap">
              <span className="input-icon" aria-hidden="true">✉</span>
              <input type="email" placeholder="you@example.com" autoComplete="email" />
            </span>
          </label>

          <div className="grid-2">
            <label className="field">
              <span className="field-label">Password</span>
              <span className="input-wrap">
                <span className="input-icon" aria-hidden="true">🔒</span>
                <input type={showPw ? 'text' : 'password'} placeholder="Create password" autoComplete="new-password" required />
                <button type="button" className="pw-toggle" aria-label={showPw ? 'Hide password' : 'Show password'} onClick={() => setShowPw((v) => !v)}>
                  {showPw ? '🙈' : '👁'}
                </button>
              </span>
            </label>
            <label className="field">
              <span className="field-label">Confirm Password</span>
              <span className="input-wrap">
                <span className="input-icon" aria-hidden="true">🔒</span>
                <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm password" autoComplete="new-password" required />
                <button type="button" className="pw-toggle" aria-label={showConfirm ? 'Hide password' : 'Show password'} onClick={() => setShowConfirm((v) => !v)}>
                  {showConfirm ? '🙈' : '👁'}
                </button>
              </span>
            </label>
          </div>

          <div className="grid-2">
            <label className="field">
              <span className="field-label">State</span>
              <span className="input-wrap">
                <span className="input-icon" aria-hidden="true">📍</span>
                <input type="text" placeholder="e.g. Karnataka" autoComplete="address-level1" />
              </span>
            </label>
            <label className="field">
              <span className="field-label">District</span>
              <span className="input-wrap">
                <span className="input-icon" aria-hidden="true">📌</span>
                <input type="text" placeholder="e.g. Mysuru" autoComplete="address-level2" />
              </span>
            </label>
          </div>

          <label className="field">
            <span className="field-label">Preferred Language</span>
            <span className="input-wrap">
              <span className="input-icon" aria-hidden="true">🌐</span>
              <select defaultValue="kn" aria-label="Preferred Language">
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </span>
          </label>

          <label className="terms">
            <input type="checkbox" required />
            <span>I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms</a> and <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a></span>
          </label>

          <button type="submit" className="btn-primary">Create Account</button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}
