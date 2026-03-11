import './KpiBar.css'

export default function KpiBar({ kpis }) {
  if (!kpis) return null

  const cards = [
    {
      label: 'Total Studies',
      value: kpis.totalStudies,
      icon: '📋',
      sub: 'In platform'
    },
    {
      label: 'Active Studies',
      value: kpis.activeStudies,
      icon: '🟢',
      sub: 'Currently running'
    },
    {
      label: 'Completed',
      value: kpis.completedStudies,
      icon: '✅',
      sub: 'Finalized'
    },
    {
      label: 'Avg SDOH Alignment',
      value: `${kpis.averageSdohAlignment}%`,
      icon: '📊',
      sub: 'Across all studies',
      highlight: true
    },
    {
      label: 'Populations Served',
      value: kpis.totalPopulationsServed,
      icon: '👥',
      sub: 'Distinct groups'
    }
  ]

  return (
    <div className="kpi-bar">
      {cards.map((c, i) => (
        <div key={i} className={`kpi-card${c.highlight ? ' kpi-card--gold' : ''}`}>
          <div className="kpi-icon">{c.icon}</div>
          <div className="kpi-content">
            <div className="kpi-value">{c.value}</div>
            <div className="kpi-label">{c.label}</div>
            <div className="kpi-sub">{c.sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
