import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <div className="logo">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="38" height="38" rx="4" fill="#C9A84C"/>
              <rect x="17" y="8" width="4" height="22" rx="2" fill="#0d0d0d"/>
              <rect x="8" y="17" width="22" height="4" rx="2" fill="#0d0d0d"/>
            </svg>
          </div>
          <div className="brand">
            <span className="brand-name">Apex Health</span>
            <span className="brand-tagline">Research Analytics Platform</span>
          </div>
        </div>
        <div className="header-right">
          <span className="nav-badge">MVP</span>
          <span className="nav-date">Demo · March 2025</span>
        </div>
      </div>
      <div className="header-bar" />
    </header>
  )
}
