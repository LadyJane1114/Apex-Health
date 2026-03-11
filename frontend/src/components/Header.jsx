import './Header.css'

export default function Header({ activeTab, tabs, onTabChange }) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <div className="logo">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
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
          <span className="nav-badge">MVP Demo</span>
          <span className="nav-date">March 2025</span>
        </div>
      </div>
      <div className="header-bar" />
      <div className="header-nav">
        <div className="nav-inner">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`nav-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
              {activeTab === tab && <span className="nav-tab-line" />}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
