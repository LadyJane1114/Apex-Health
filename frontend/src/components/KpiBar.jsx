import { useEffect, useState } from 'react'
import './KpiBar.css'

function AnimatedNumber({ target, suffix = '', decimals = 0 }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 900
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setVal(target); clearInterval(timer) }
      else setVal(start)
    }, step)
    return () => clearInterval(timer)
  }, [target])
  return <>{decimals > 0 ? val.toFixed(decimals) : Math.floor(val)}{suffix}</>
}

export default function KpiBar({ kpis }) {
  const cards = [
    { label: 'Total Studies', value: kpis.totalStudies, suffix: '', decimals: 0, icon: '📋', sub: 'In platform', desc: 'All research studies tracked' },
    { label: 'Active Studies', value: kpis.activeStudies, suffix: '', decimals: 0, icon: '🟢', sub: 'In progress', desc: 'Currently collecting data' },
    { label: 'Completed', value: kpis.completedStudies, suffix: '', decimals: 0, icon: '✅', sub: 'Finalized', desc: 'Results available' },
    { label: 'Avg SDOH Alignment', value: kpis.averageSdohAlignment, suffix: '%', decimals: 1, icon: '📊', sub: 'Across studies', desc: 'Higher = broader SDOH coverage', gold: true },
    { label: 'Total Participants', value: kpis.totalParticipants, suffix: '', decimals: 0, icon: '👥', sub: 'Enrolled', desc: 'Across active & completed studies' },
  ]

  return (
    <div className="kpi-bar">
      {cards.map((c, i) => (
        <div key={i} className={`kpi-card${c.gold ? ' kpi-card--gold' : ''}`} style={{ animationDelay: `${i * 0.07}s` }}>
          <div className="kpi-top">
            <span className="kpi-icon">{c.icon}</span>
            <span className="kpi-label">{c.label}</span>
          </div>
          <div className="kpi-value">
            <AnimatedNumber target={c.value} suffix={c.suffix} decimals={c.decimals} />
          </div>
          <div className="kpi-bottom">
            <span className="kpi-sub">{c.sub}</span>
            <span className="kpi-desc">{c.desc}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
