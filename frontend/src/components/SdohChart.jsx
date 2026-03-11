import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts'
import './SdohChart.css'

const SHORT = {
  "Income & Distribution": "Income",
  "Education": "Education",
  "Unemployment & Job Security": "Unemployment",
  "Employment Conditions": "Employment",
  "Early Childhood Development": "Early Child.",
  "Food Insecurity": "Food Security",
  "Housing": "Housing",
  "Social Exclusion": "Soc. Exclusion",
  "Social Safety Network": "Safety Net",
  "Health Services": "Health Svcs",
  "Indigenous Status": "Indigenous",
  "Gender": "Gender",
  "Race": "Race",
  "Disability": "Disability"
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="sdoh-tooltip">
      <p className="tt-name">{payload[0].payload.determinant}</p>
      <p className="tt-val">{payload[0].value}%</p>
      <p className="tt-label">avg alignment</p>
    </div>
  )
}

export default function SdohChart({ data, selectedSdoh }) {
  const [view, setView] = useState('bar')

  const barData = [...data]
    .sort((a, b) => b.averageScore - a.averageScore)
    .map(d => ({ ...d, short: SHORT[d.determinant] || d.determinant }))

  const radarData = data.map(d => ({
    ...d,
    short: SHORT[d.determinant] || d.determinant,
    score: d.averageScore
  }))

  const getBarColor = (entry) => {
    if (selectedSdoh && entry.determinant === selectedSdoh) return '#E8C96B'
    if (entry.averageScore >= 80) return '#C9A84C'
    if (entry.averageScore >= 65) return '#C9A84C99'
    return '#E4DFD5'
  }

  return (
    <div className="sdoh-card">
      <div className="sdoh-header">
        <div className="sdoh-title-block">
          <h2 className="sdoh-title">SDOH Alignment Analysis</h2>
          <p className="sdoh-subtitle">
            Average alignment scores across 14 Social Determinants of Health · Canadian Public Health Association framework
          </p>
        </div>
        <div className="view-toggle">
          <button className={`vt-btn${view === 'bar' ? ' active' : ''}`} onClick={() => setView('bar')}>
            Bar Chart
          </button>
          <button className={`vt-btn${view === 'radar' ? ' active' : ''}`} onClick={() => setView('radar')}>
            Radar
          </button>
        </div>
      </div>

      <div className="sdoh-chart-wrap">
        {view === 'bar' ? (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData} margin={{ top: 8, right: 16, left: 0, bottom: 64 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4DFD5" vertical={false} />
              <XAxis
                dataKey="short"
                tick={{ fontSize: 11, fill: '#8A847A', fontFamily: 'DM Sans' }}
                angle={-38}
                textAnchor="end"
                interval={0}
                tickLine={false}
                axisLine={{ stroke: '#E4DFD5' }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: '#8A847A', fontFamily: 'DM Sans' }}
                tickFormatter={v => `${v}%`}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(201,168,76,0.07)' }} />
              <Bar dataKey="averageScore" radius={[4, 4, 0, 0]} maxBarSize={44}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={getBarColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={360}>
            <RadarChart data={radarData} margin={{ top: 16, right: 48, bottom: 16, left: 48 }}>
              <PolarGrid stroke="#E4DFD5" />
              <PolarAngleAxis
                dataKey="short"
                tick={{ fontSize: 10, fill: '#8A847A', fontFamily: 'DM Sans' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                dataKey="score"
                stroke="#C9A84C"
                fill="#C9A84C"
                fillOpacity={0.2}
                strokeWidth={2}
                dot={{ fill: '#C9A84C', r: 3 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="sdoh-legend">
        <div className="leg-item"><span className="leg-dot" style={{ background: '#C9A84C' }}/> High alignment (≥80%)</div>
        <div className="leg-item"><span className="leg-dot" style={{ background: '#C9A84C99' }}/> Moderate (65–79%)</div>
        <div className="leg-item"><span className="leg-dot" style={{ background: '#E4DFD5', border: '1px solid #CCC7BC' }}/> Lower (&lt;65%)</div>
        {selectedSdoh && (
          <div className="leg-item leg-selected">
            <span className="leg-dot" style={{ background: '#E8C96B' }}/> Selected: {selectedSdoh}
          </div>
        )}
      </div>
    </div>
  )
}
