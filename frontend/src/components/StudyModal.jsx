import { useEffect } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis } from 'recharts'
import { SDOH_CATEGORIES } from '../data/dummyData'
import './StudyModal.css'

const STATUS_STYLE = {
  Active:    { bg: '#dcfce7', color: '#166534' },
  Completed: { bg: '#dbeafe', color: '#1e40af' },
  Proposed:  { bg: '#fef9c3', color: '#854d0e' }
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="sm-tt">
      <p style={{ fontSize: 11, color: '#8A847A', marginBottom: 2 }}>{payload[0].payload.cat}</p>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: '#C9A84C', fontWeight: 700 }}>{payload[0].value}%</p>
    </div>
  )
}

export default function StudyModal({ study, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const radarData = SDOH_CATEGORIES.map(cat => ({
    cat: cat.length > 14 ? cat.split(' ').slice(0, 2).join(' ') : cat,
    fullName: cat,
    score: study.sdohScores[cat] || 0
  }))

  const trendData = (study.trend || [study.overallSdohScore]).map((v, i) => ({
    pt: `T${i + 1}`, score: v
  }))

  const topSdoh = Object.entries(study.sdohScores)
    .sort(([, a], [, b]) => b - a).slice(0, 3)

  const lowSdoh = Object.entries(study.sdohScores)
    .sort(([, a], [, b]) => a - b).slice(0, 3)

  return (
    <div className="sm-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="sm-modal">
        {/* Header */}
        <div className="sm-header">
          <div className="sm-header-left">
            <div className="sm-header-badges">
              <span className="sm-status" style={STATUS_STYLE[study.status] || {}}>{study.status}</span>
              <span className="sm-type-badge">{study.studyType}</span>
              <span className="sm-year-badge">{study.year}</span>
            </div>
            <h2 className="sm-title">{study.title}</h2>
            <div className="sm-meta-row">
              <span>👤 {study.author}</span>
              <span>🏫 {study.institution}</span>
              {study.region && <span>📍 {study.region}</span>}
              {study.fundingSource && <span>💰 {study.fundingSource}</span>}
            </div>
          </div>
          <button className="sm-close" onClick={onClose}>✕</button>
        </div>

        <div className="sm-body">
          {/* Score summary row */}
          <div className="sm-score-row">
            <div className="sm-score-big">
              <span className="sm-score-num">{study.overallSdohScore}%</span>
              <span className="sm-score-label">Overall SDOH Alignment</span>
            </div>
            <div className="sm-score-stat">
              <span className="sm-stat-val">{study.participants > 0 ? study.participants.toLocaleString() : 'TBD'}</span>
              <span className="sm-stat-label">Participants</span>
            </div>
            <div className="sm-score-stat">
              <span className="sm-stat-val">{topSdoh[0]?.[0].split(' ')[0]}</span>
              <span className="sm-stat-label">Top Determinant</span>
            </div>
            <div className="sm-score-stat">
              <span className="sm-stat-val">{study.targetPopulation}</span>
              <span className="sm-stat-label">Target Population</span>
            </div>
          </div>

          {/* Description + Key findings */}
          <div className="sm-two-col">
            <div className="sm-section">
              <h4 className="sm-section-title">Study Description</h4>
              <p className="sm-desc">{study.description}</p>
            </div>
            <div className="sm-section sm-findings">
              <h4 className="sm-section-title">💡 Key Findings</h4>
              <p className="sm-desc">{study.keyFindings}</p>
            </div>
          </div>

          {/* Charts row */}
          <div className="sm-charts-row">
            {/* Radar */}
            <div className="sm-chart-block">
              <h4 className="sm-section-title">SDOH Coverage Radar</h4>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="#E4DFD5" />
                  <PolarAngleAxis dataKey="cat" tick={{ fontSize: 9, fill: '#8A847A', fontFamily: 'DM Sans' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Radar dataKey="score" stroke="#C9A84C" fill="#C9A84C" fillOpacity={0.2} strokeWidth={2} dot={{ fill: '#C9A84C', r: 2 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Trend sparkline */}
            {trendData.length > 1 && (
              <div className="sm-chart-block">
                <h4 className="sm-section-title">Alignment Score Trend</h4>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={trendData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                    <XAxis dataKey="pt" tick={{ fontSize: 10, fill: '#8A847A' }} tickLine={false} axisLine={false} />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10, fill: '#8A847A' }} tickFormatter={v => `${v}%`} tickLine={false} axisLine={false} width={36} />
                    <Tooltip formatter={v => [`${v}%`, 'Score']} contentStyle={{ background: '#0d0d0d', border: '1px solid #9A7A2E', borderRadius: 4, fontSize: 12, color: '#C9A84C' }} />
                    <Line type="monotone" dataKey="score" stroke="#C9A84C" strokeWidth={2.5} dot={{ fill: '#C9A84C', r: 4 }} activeDot={{ r: 6, fill: '#E8C96B' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Strengths & gaps */}
            <div className="sm-chart-block">
              <h4 className="sm-section-title">Top Strengths</h4>
              <div className="sm-sdoh-list">
                {topSdoh.map(([k, v]) => (
                  <div key={k} className="sm-sdoh-row">
                    <span className="sm-sdoh-name">{k}</span>
                    <div className="sm-sdoh-bar-bg"><div className="sm-sdoh-bar-fill" style={{ width: `${v}%`, background: '#C9A84C' }} /></div>
                    <span className="sm-sdoh-val">{v}%</span>
                  </div>
                ))}
              </div>
              <h4 className="sm-section-title" style={{ marginTop: 18 }}>Coverage Gaps</h4>
              <div className="sm-sdoh-list">
                {lowSdoh.map(([k, v]) => (
                  <div key={k} className="sm-sdoh-row">
                    <span className="sm-sdoh-name">{k}</span>
                    <div className="sm-sdoh-bar-bg"><div className="sm-sdoh-bar-fill" style={{ width: `${v}%`, background: '#E4DFD5' }} /></div>
                    <span className="sm-sdoh-val" style={{ color: '#8A847A' }}>{v}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
