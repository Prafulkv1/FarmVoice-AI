import React, { useEffect, useRef, useState } from 'react'
import { LANGUAGES } from '../data/appData.js'
import '../styles/header.css'

export default function LanguageSwitcher({ value = 'kn', onChange, compact = false, id = 'lang' }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(
    LANGUAGES.find((l) => l.code === value) || LANGUAGES[1]
  )
  const ref = useRef(null)

  useEffect(() => {
    const found = LANGUAGES.find((l) => l.code === value)
    if (found) setSelected(found)
  }, [value])

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

  function pick(lang) {
    setSelected(lang)
    setOpen(false)
    if (onChange) onChange(lang)
  }

  return (
    <div className={`lang-switcher ${compact ? 'lang-switcher--compact' : ''}`} ref={ref}>
      <button
        id={id}
        type="button"
        className="lang-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lang-globe" aria-hidden="true">🌐</span>
        <span className="lang-current">{selected.label}</span>
        <span className={`lang-caret ${open ? 'open' : ''}`} aria-hidden="true">▼</span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox" aria-label="Select language">
          {LANGUAGES.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === selected.code}>
              <button
                type="button"
                className={`lang-option ${l.code === selected.code ? 'active' : ''}`}
                onClick={() => pick(l)}
              >
                <span className="lang-option-label">{l.label}</span>
                {l.code === selected.code && <span className="lang-check" aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
