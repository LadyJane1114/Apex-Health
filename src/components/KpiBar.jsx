import './KpiBar.css'

export default function KpiBar({ kpis }) {
  const cards = [
    { label: 'Total Studies', value: kpis.totalStudies, icon: '📋', sub: 'In platform' },
    { label: 'Active Studies', value: kpis.activeStudies, icon: '🟢', sub: 'Currently running' },
    { label: 'Completed', value: kpis.completedStudies, icon: '✅', sub: 'Finalized' },
    { label: 'Avg SDOH Alignment', value: `${kpis.averageSdohAlignment}%`, icon: '📊', sub: 'Across filtered studies', gold: true },
    { label: 'Populations Served', value: kpis.totalPopulationsServed, icon: '👥', sub: 'Distinct groups' },
  ]

  return (
    <div className="kpi-bar">
      {cards.map((c, i) => (
        <div key={i} className={`kpi-card${c.gold ? ' kpi-card--gold' : ''}`} style={{ animationDelay: `${i * 0.07}s` }}>
          <div className="kpi-icon">{c.icon}</div>
          <div className="kpi-body">
            <div className="kpi-value">{c.value}</div>
            <div className="kpi-label">{c.label}</div>
            <div className="kpi-sub">{c.sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
