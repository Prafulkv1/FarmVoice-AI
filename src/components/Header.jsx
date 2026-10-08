import React from 'react'
import { useNavigate } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import NotificationIcon from './NotificationIcon.jsx'
import UserMenu from './UserMenu.jsx'
import '../styles/header.css'

export default function Header({ onMenuToggle, lang, onLangChange }) {
  const navigate = useNavigate()
  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="icon-btn hamburger"
          aria-label="Toggle navigation menu"
          onClick={onMenuToggle}
        >
          <span aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </span>
        </button>
        <button type="button" className="brand" onClick={() => navigate('/app/dashboard')} aria-label="FarmVoice AI home">
          <span className="brand-mark" aria-hidden="true">🌿</span>
          <span className="brand-text">
            <span className="brand-title">FarmVoice AI</span>
            <span className="brand-sub">Regional Language AI Assistance for Farmers</span>
          </span>
        </button>
      </div>
      <div className="header-right">
        <LanguageSwitcher value={lang} onChange={onLangChange} compact />
        <NotificationIcon count={3} />
        <span className="header-divider" aria-hidden="true" />
        <UserMenu />
      </div>
    </header>
  )
}
