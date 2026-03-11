import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="logo-mark">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" fill="#C9A84C"/>
              <path d="M18 8 L18 28 M10 18 L26 18" stroke="#0a0a0a" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="brand-text">
            <h1 className="brand-name">Apex Health</h1>
            <p className="brand-sub">Research Analytics Platform</p>
          </div>
        </div>
        <div className="header-meta">
          <span className="mvp-badge">MVP · Demo</span>
          <span className="header-date">March 2025</span>
        </div>
      </div>
      <div className="header-divider" />
    </header>
  )
}
