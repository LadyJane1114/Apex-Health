import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from 'recharts'
import { useState } from 'react'
import './SdohChart.css'

const GOLD = '#C9A84C'
const GOLD_DARK = '#9A7A2E'
const BLACK = '#0a0a0a'

const shortLabels = {
  "Income & Distribution": "Income",
  "Education": "Education",
  "Unemployment & Job Security": "Unemployment",
  "Employment Conditions": "Employment",
  "Early Childhood Development": "Early Child.",
  "Food Insecurity": "Food Sec.",
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
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-name">{payload[0].payload.determinant}</p>
        <p className="tooltip-value">{payload[0].value}% alignment</p>
      </div>
    )
  }
  return null
}

export default function SdohChart({ data }) {
  const [chartType, setChartType] = useState('bar')

  if (!data || data.length === 0) return null

  const radarData = data.map(d => ({
    ...d,
    short: shortLabels[d.determinant] || d.determinant,
    score: d.averageScore
  }))

  const barData = [...data]
    .sort((a, b) => b.averageScore - a.averageScore)
    .map(d => ({ ...d, short: shortLabels[d.determinant] || d.determinant }))

  return (
    <div className="sdoh-chart-card">
      <div className="chart-header">
        <div>
          <h2 className="chart-title">SDOH Alignment Analysis</h2>
          <p className="chart-subtitle">
            Average alignment scores across 14 Social Determinants of Health (CPHA framework)
          </p>
        </div>
        <div className="chart-toggle">
          <button
            className={`toggle-btn${chartType === 'bar' ? ' active' : ''}`}
            onClick={() => setChartType('bar')}
          >
            Bar
          </button>
          <button
            className={`toggle-btn${chartType === 'radar' ? ' active' : ''}`}
            onClick={() => setChartType('radar')}
          >
            Radar
          </button>
        </div>
      </div>

      <div className="chart-body">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DC" vertical={false} />
              <XAxis
                dataKey="short"
                tick={{ fontSize: 11, fill: '#5A554E', fontFamily: 'DM Sans' }}
                angle={-35}
                textAnchor="end"
                interval={0}
                height={70}
                tickLine={false}
                axisLine={{ stroke: '#E8E4DC' }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: '#5A554E', fontFamily: 'DM Sans' }}
                tickFormatter={v => `${v}%`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(201,168,76,0.08)' }} />
              <Bar dataKey="averageScore" radius={[3, 3, 0, 0]} maxBarSize={42}>
                {barData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.averageScore >= 75 ? GOLD : entry.averageScore >= 65 ? '#C9A84C99' : '#E8E4DC'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={radarData} margin={{ top: 10, right: 40, left: 40, bottom: 10 }}>
              <PolarGrid stroke="#E8E4DC" />
              <PolarAngleAxis
                dataKey="short"
                tick={{ fontSize: 10, fill: '#5A554E', fontFamily: 'DM Sans' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                dataKey="score"
                stroke={GOLD}
                fill={GOLD}
                fillOpacity={0.25}
                strokeWidth={2}
                dot={{ fill: GOLD, r: 3 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="sdoh-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: GOLD }} />
          <span>High alignment (≥75%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#C9A84C99' }} />
          <span>Moderate alignment (65–74%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#E8E4DC' }} />
          <span>Lower alignment (&lt;65%)</span>
        </div>
      </div>
    </div>
  )
}
