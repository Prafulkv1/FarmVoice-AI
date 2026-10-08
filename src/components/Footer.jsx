import React from 'react'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <p className="footer-brand">🌿 <strong>FarmVoice AI</strong> – Regional Language AI Assistance for Farmers</p>
        <nav className="footer-links" aria-label="Footer">
          <a href="#about">About</a>
          <span aria-hidden="true">•</span>
          <a href="#help">Help</a>
          <span aria-hidden="true">•</span>
          <a href="#privacy">Privacy</a>
          <span aria-hidden="true">•</span>
          <a href="#terms">Terms</a>
          <span aria-hidden="true">•</span>
          <a href="#contact">Contact</a>
        </nav>
        <p className="footer-copy">© 2026 FarmVoice AI. All rights reserved.</p>
      </div>
    </footer>
  )
}
