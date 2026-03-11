import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, ReferenceLine
} from 'recharts'
import { YEARLY_TREND } from '../data/dummyData'
import './TrendChart.css'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="tc-tooltip">
      <p className="tc-tt-year">{label}</p>
      <p className="tc-tt-val">{payload[0].value}% avg alignment</p>
      <p className="tc-tt-studies">{payload[1]?.value} studies</p>
    </div>
  )
}

export default function TrendChart() {
  return (
    <div className="tc-card">
      <div className="tc-header">
        <div>
          <h3 className="tc-title">Platform Growth Trend</h3>
          <p className="tc-sub">Average SDOH alignment score & study count over time</p>
        </div>
        <div className="tc-badge">2020 – 2024</div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={YEARLY_TREND} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E4DFD5" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#8A847A', fontFamily: 'DM Sans' }} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="score"
            domain={[65, 80]}
            tick={{ fontSize: 11, fill: '#8A847A', fontFamily: 'DM Sans' }}
            tickFormatter={v => `${v}%`}
            tickLine={false}
            axisLine={false}
            width={38}
          />
          <YAxis yAxisId="count" orientation="right" hide domain={[0, 12]} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine yAxisId="score" y={74.2} stroke="#C9A84C" strokeDasharray="4 4" strokeOpacity={0.5} />
          <Area
            yAxisId="score"
            type="monotone"
            dataKey="avgScore"
            stroke="#C9A84C"
            strokeWidth={2.5}
            fill="url(#goldGrad)"
            dot={{ fill: '#C9A84C', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#E8C96B' }}
          />
          <Line
            yAxisId="count"
            type="monotone"
            dataKey="studies"
            stroke="#9A7A2E"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="tc-legend">
        <div className="tc-leg"><span style={{ background: '#C9A84C' }} className="tc-leg-dot"/><span>Avg SDOH Score</span></div>
        <div className="tc-leg"><span style={{ background: '#9A7A2E', borderRadius: 2 }} className="tc-leg-dot"/><span>Study Count</span></div>
        <div className="tc-leg"><span style={{ background: 'transparent', border: '1px dashed #C9A84C80' }} className="tc-leg-dot"/><span>Current benchmark</span></div>
      </div>
    </div>
  )
}
