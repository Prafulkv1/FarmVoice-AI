import React from 'react'
import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../data/appData.js'
import '../styles/sidebar.css'

export default function Sidebar({ open, onNavigate }) {
  return (
    <>
      <div
        className={`sidebar-scrim ${open ? 'show' : ''}`}
        onClick={onNavigate}
        aria-hidden={!open}
      />
      <aside className={`app-sidebar ${open ? 'open' : ''}`} aria-label="Primary navigation">
        <div className="sidebar-brand">
          <span className="sidebar-mark" aria-hidden="true">🌿</span>
          <div>
            <p className="sidebar-title">FarmVoice AI</p>
            <p className="sidebar-sub">Smart Farming Assistant</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item, idx) => (
            <NavLink
              key={item.key}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `side-link ${isActive || (idx === 0 && window.location.pathname === '/app') ? 'active' : ''}`
              }
            >
              <span className="side-icon" aria-hidden="true">{item.icon}</span>
              <span className="side-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-card">
          <p className="sidebar-card-title">🌱 Need help?</p>
          <p className="sidebar-card-text">Ask FarmVoice in your own language, anytime.</p>
          <button type="button" className="sidebar-card-btn">Open AI Assistant</button>
        </div>
      </aside>
    </>
  )
}
