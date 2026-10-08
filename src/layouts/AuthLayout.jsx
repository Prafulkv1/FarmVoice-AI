import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import '../styles/auth.css'

function FarmIllustration() {
  return (
    <div className="auth-art" role="img" aria-label="Illustration of a farm landscape with crops and voice assistance">
      <div className="art-sun" aria-hidden="true" />
      <div className="art-cloud art-cloud--1" aria-hidden="true" />
      <div className="art-cloud art-cloud--2" aria-hidden="true" />
      <svg className="art-scene" viewBox="0 0 420 300" aria-hidden="true">
        <ellipse cx="210" cy="252" rx="180" ry="42" fill="#dcfce7" />
        <path d="M30 252 Q120 190 210 232 T390 232 L390 300 L30 300 Z" fill="#bbf7d0" />
        <path d="M60 252 Q140 205 220 238 T360 238" fill="none" stroke="#86efac" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        {/* crop rows */}
        <g stroke="#16a34a" strokeWidth="3" strokeLinecap="round" opacity="0.85">
          <line x1="90" y1="252" x2="90" y2="228" />
          <line x1="120" y1="254" x2="120" y2="230" />
          <line x1="150" y1="255" x2="150" y2="231" />
          <line x1="180" y1="255" x2="180" y2="231" />
          <line x1="210" y1="255" x2="210" y2="231" />
          <line x1="240" y1="254" x2="240" y2="230" />
          <line x1="270" y1="253" x2="270" y2="229" />
          <line x1="300" y1="251" x2="300" y2="227" />
        </g>
        <g fill="#22c55e" opacity="0.9">
          <ellipse cx="90" cy="224" rx="9" ry="6" />
          <ellipse cx="120" cy="226" rx="9" ry="6" />
          <ellipse cx="150" cy="227" rx="9" ry="6" />
          <ellipse cx="180" cy="227" rx="9" ry="6" />
          <ellipse cx="210" cy="227" rx="9" ry="6" />
          <ellipse cx="240" cy="226" rx="9" ry="6" />
          <ellipse cx="270" cy="225" rx="9" ry="6" />
          <ellipse cx="300" cy="223" rx="9" ry="6" />
        </g>
        {/* farmer silhouette */}
        <g>
          <circle cx="315" cy="150" r="16" fill="#166534" />
          <path d="M295 148 q20 -22 40 0 l-4 6 h-32 z" fill="#15803d" />
          <rect x="307" y="166" width="16" height="34" rx="7" fill="#166534" />
          <line x1="307" y1="176" x2="292" y2="190" stroke="#166534" strokeWidth="7" strokeLinecap="round" />
          <line x1="323" y1="176" x2="338" y2="190" stroke="#166534" strokeWidth="7" strokeLinecap="round" />
          <line x1="310" y1="200" x2="306" y2="222" stroke="#166534" strokeWidth="7" strokeLinecap="round" />
          <line x1="320" y1="200" x2="324" y2="222" stroke="#166534" strokeWidth="7" strokeLinecap="round" />
        </g>
        {/* voice / AI bubble */}
        <g>
          <rect x="52" y="56" width="150" height="62" rx="14" fill="#ffffff" stroke="#bbf7d0" strokeWidth="2" />
          <circle cx="76" cy="87" r="14" fill="#16a34a" />
          <rect x="71" y="80" width="3" height="14" rx="1.5" fill="#fff" />
          <rect x="76" y="77" width="3" height="20" rx="1.5" fill="#fff" />
          <rect x="81" y="81" width="3" height="12" rx="1.5" fill="#fff" />
          <line x1="98" y1="80" x2="182" y2="80" stroke="#e5e7eb" strokeWidth="6" strokeLinecap="round" />
          <line x1="98" y1="94" x2="162" y2="94" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
          <path d="M80 118 l10 14 10 -14" fill="#ffffff" stroke="#bbf7d0" strokeWidth="2" />
        </g>
        {/* leaves */}
        <g fill="#22c55e" opacity="0.9">
          <path d="M52 210 q18 -4 24 -22 q-20 2 -24 22" />
          <path d="M368 205 q-18 -4 -24 -22 q20 2 24 22" />
        </g>
      </svg>
      <div className="art-chips">
        <span className="art-chip">🎙 Voice-first</span>
        <span className="art-chip">🌾 Crop care</span>
        <span className="art-chip">🌦 Weather</span>
      </div>
    </div>
  )
}

export default function AuthLayout() {
  const [lang, setLang] = useState({ code: 'kn', label: 'ಕನ್ನಡ' })
  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-left">
          <div className="auth-brand-row">
            <span className="auth-logo" aria-hidden="true">🌿</span>
            <div>
              <p className="auth-brand-name">FarmVoice AI</p>
              <p className="auth-brand-sub">Smart Farming Assistant</p>
            </div>
            <div className="auth-lang">
              <LanguageSwitcher value={lang.code} onChange={setLang} compact id="auth-lang" />
            </div>
          </div>
          <div className="auth-hero">
            <p className="auth-eyebrow">Regional Language AI Assistance for Farmers</p>
            <h1>Your farm speaks.<br />We listen <span className="hl">in your language.</span></h1>
            <p className="auth-hero-sub">
              Get crop advice, weather alerts, mandi prices and government scheme help —
              simply by speaking. No typing needed.
            </p>
          </div>
          <FarmIllustration />
          <div className="auth-points">
            <div className="auth-point"><span>🎙</span><div><strong>Speak, don’t type</strong><p>Kannada, Hindi, Tamil & 8 more</p></div></div>
            <div className="auth-point"><span>🌦</span><div><strong>Weather + Mandi alerts</strong><p>Timely, village-level updates</p></div></div>
            <div className="auth-point"><span>🤖</span><div><strong>AI crop doctor</strong><p>Pest, soil & irrigation guidance</p></div></div>
          </div>
        </div>
        <div className="auth-right">
          <Outlet />
        </div>
      </div>
      <p className="auth-foot">© 2026 FarmVoice AI • Regional Language AI Assistance for Farmers</p>
    </div>
  )
}
