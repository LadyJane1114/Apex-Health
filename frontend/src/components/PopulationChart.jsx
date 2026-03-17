import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import './PopulationChart.css'

const COLORS = ['#C9A84C', '#E8C96B', '#9A7A2E', '#C9A84Caa', '#9A7A2Eaa', '#E8C96Baa', '#C9A84C66', '#9A7A2E66']

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="pc-tooltip">
      <p className="pc-tt-name">{payload[0].payload.targetPopulation}</p>
      <p className="pc-tt-val">{payload[0].value}% SDOH</p>
      <p className="pc-tt-type">{payload[0].payload.studyType}</p>
    </div>
  )
}

export default function PopulationChart({ studies }) {
  const data = [...studies].sort((a, b) => b.overallSdohScore - a.overallSdohScore)

  return (
    <div className="pc-card">
      <div className="pc-header">
        <div>
          <h3 className="pc-title">Studies by Population</h3>
          <p className="pc-sub">SDOH alignment score per target population group</p>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="pc-empty">No studies match current filters</div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 40, left: 10, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4DFD5" horizontal={false} />
            <XAxis
              type="number"
              domain={[60, 85]}
              tick={{ fontSize: 10, fill: '#8A847A', fontFamily: 'DM Sans' }}
              tickFormatter={v => `${v}%`}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="targetPopulation"
              tick={{ fontSize: 11, fill: '#5A554E', fontFamily: 'DM Sans' }}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(201,168,76,0.06)' }} />
            <Bar dataKey="overallSdohScore" radius={[0, 4, 4, 0]} maxBarSize={22}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
