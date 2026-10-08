import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/header.css'

export default function UserMenu({ name = 'Ravi Kumar', phone = '+91 98765 43210' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="user-menu" ref={ref}>
      <button
        type="button"
        className="user-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="user-avatar" aria-hidden="true">{initials}</span>
        <span className="user-meta">
          <span className="user-name">{name}</span>
          <span className="user-sub">Farmer • Mysuru</span>
        </span>
        <span className={`user-caret ${open ? 'open' : ''}`} aria-hidden="true">▼</span>
      </button>
      {open && (
        <div className="user-dropdown" role="menu">
          <div className="user-dropdown-head">
            <span className="user-avatar user-avatar--lg" aria-hidden="true">{initials}</span>
            <div>
              <p className="user-dropdown-name">{name}</p>
              <p className="user-dropdown-phone">{phone}</p>
            </div>
          </div>
          <button type="button" role="menuitem" className="user-item">👤 &nbsp;View Profile</button>
          <button type="button" role="menuitem" className="user-item">⚙ &nbsp;Settings</button>
          <button type="button" role="menuitem" className="user-item">🌐 &nbsp;Language Preferences</button>
          <div className="user-divider" />
          <button
            type="button"
            role="menuitem"
            className="user-item user-item--danger"
            onClick={() => navigate('/login')}
          >
            ⎋ &nbsp;Logout
          </button>
        </div>
      )}
    </div>
  )
}
