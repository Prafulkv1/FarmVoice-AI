import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/layout.css'

function EmptyContent({ title }) {
  return (
    <div className="empty-content">
      <div className="empty-card">
        <span className="empty-icon" aria-hidden="true">🌿</span>
        <h2>{title || 'Page Content'}</h2>
        <p>Page content will be added later. This is a reusable container for future modules.</p>
        <div className="empty-hint">
          <span>Future modules:</span>
          <span className="hint-chip">Dashboard</span>
          <span className="hint-chip">Farms</span>
          <span className="hint-chip">Crops</span>
          <span className="hint-chip">Weather</span>
          <span className="hint-chip">AI Assistant</span>
        </div>
      </div>
    </div>
  )
}

function titleFromPath(pathname) {
  const seg = pathname.split('/').filter(Boolean).pop() || 'dashboard'
  const map = {
    dashboard: 'Dashboard',
    farms: 'My Farms',
    crops: 'Crops',
    weather: 'Weather',
    assistant: 'AI Assistant',
    schemes: 'Government Schemes',
    history: 'Farm History',
    recommendations: 'Recommendations',
    notifications: 'Notifications',
    profile: 'Profile',
    settings: 'Settings',
  }
  return map[seg] || 'Page Content'
}

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lang, setLang] = useState('kn')
  const location = useLocation()

  // Close drawer on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  // Lock body scroll when drawer open on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  return (
    <div className="app-shell">
      <Header
        onMenuToggle={() => setSidebarOpen((v) => !v)}
        lang={lang}
        onLangChange={(l) => setLang(l.code)}
      />
      <div className="app-body">
        <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
        <main className="app-main" id="main-content">
          <Routes>
            <Route index element={<EmptyContent title={titleFromPath(location.pathname)} />} />
            <Route path=":page" element={<EmptyContent title={titleFromPath(location.pathname)} />} />
            <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}
