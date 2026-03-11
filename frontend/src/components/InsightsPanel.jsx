import './InsightsPanel.css'

function getInsights(studies, sdohData) {
  if (!studies.length) return []

  const sorted = [...sdohData].sort((a, b) => b.averageScore - a.averageScore)
  const top3 = sorted.slice(0, 3)
  const bottom3 = sorted.slice(-3)

  const avgScore = studies.reduce((s, st) => s + st.overallSdohScore, 0) / studies.length
  const highestStudy = [...studies].sort((a, b) => b.overallSdohScore - a.overallSdohScore)[0]
  const lowestStudy = [...studies].sort((a, b) => a.overallSdohScore - b.overallSdohScore)[0]

  const activeCount = studies.filter(s => s.status === 'Active').length
  const totalParticipants = studies.reduce((s, st) => s + (st.participants || 0), 0)

  const regions = [...new Set(studies.map(s => s.region).filter(Boolean))]

  return [
    {
      type: 'strength',
      icon: '🏆',
      title: 'Highest SDOH Coverage',
      body: `The strongest determinant coverage is in <strong>${top3.map(t => t.determinant).join(', ')}</strong>, with average scores of ${top3.map(t => t.averageScore + '%').join(', ')} respectively.`
    },
    {
      type: 'gap',
      icon: '⚠️',
      title: 'Coverage Gaps Identified',
      body: `Research coverage is weakest for <strong>${bottom3.map(t => t.determinant).join(', ')}</strong>. These determinants average below ${Math.round(bottom3[bottom3.length-1].averageScore)}% — indicating opportunities for new studies.`
    },
    {
      type: 'info',
      icon: '📍',
      title: 'Geographic Reach',
      body: `Current studies span <strong>${regions.length} regions</strong> including ${regions.slice(0, 3).join(', ')}${regions.length > 3 ? ` and ${regions.length - 3} more` : ''}. National-level coverage is a key expansion goal.`
    },
    {
      type: 'strength',
      icon: '⭐',
      title: 'Top Performing Study',
      body: `<strong>"${highestStudy?.title}"</strong> by ${highestStudy?.author} leads with a ${highestStudy?.overallSdohScore}% SDOH alignment score, serving the ${highestStudy?.targetPopulation} population.`
    },
    {
      type: 'recommendation',
      icon: '💡',
      title: 'Recommendation: Expand Indigenous Status Coverage',
      body: `Only ${studies.filter(s => (s.sdohScores?.['Indigenous Status'] || 0) >= 70).length} of ${studies.length} studies score ≥70% on Indigenous Status. Targeted funding for Indigenous-led research would close this gap.`
    },
    {
      type: 'info',
      icon: '👥',
      title: 'Participant Reach',
      body: `Active and completed studies collectively enroll <strong>${totalParticipants.toLocaleString()} participants</strong>. The ${activeCount} active studies are currently in data collection phase.`
    },
    {
      type: 'recommendation',
      icon: '🔬',
      title: 'Recommendation: Diversify Study Methods',
      body: `Current portfolio is survey-heavy. Adding more <strong>RCTs and longitudinal cohort studies</strong> would strengthen causal evidence for SDOH interventions.`
    },
    {
      type: 'gap',
      icon: '📉',
      title: 'Lowest Alignment Area',
      body: `<strong>"${lowestStudy?.title}"</strong> has the lowest overall alignment at ${lowestStudy?.overallSdohScore}%. Expanding its SDOH framing could increase its platform impact score.`
    }
  ]
}

const TYPE_STYLE = {
  strength:       { bg: '#f0fdf4', border: '#bbf7d0', icon_bg: '#dcfce7', label: 'Strength',       labelColor: '#166534' },
  gap:            { bg: '#fff7ed', border: '#fed7aa', icon_bg: '#ffedd5', label: 'Gap',             labelColor: '#9a3412' },
  recommendation: { bg: '#fefce8', border: '#fde68a', icon_bg: '#fef9c3', label: 'Recommendation', labelColor: '#854d0e' },
  info:           { bg: '#f0f9ff', border: '#bae6fd', icon_bg: '#e0f2fe', label: 'Insight',         labelColor: '#075985' },
}

export default function InsightsPanel({ studies, sdohData, full }) {
  const insights = getInsights(studies, sdohData || [])

  return (
    <div className={`ip-wrap${full ? ' ip-wrap--full' : ''}`}>
      <div className="ip-header">
        <h3 className="ip-title">{full ? 'Platform Insights & Recommendations' : 'Key Insights'}</h3>
        <p className="ip-sub">Auto-generated from current study data · {insights.length} findings</p>
      </div>
      <div className={`ip-grid${full ? ' ip-grid--full' : ''}`}>
        {insights.map((ins, i) => {
          const s = TYPE_STYLE[ins.type] || TYPE_STYLE.info
          return (
            <div key={i} className="ip-card" style={{ background: s.bg, borderColor: s.border, animationDelay: `${i * 0.06}s` }}>
              <div className="ip-card-top">
                <span className="ip-icon" style={{ background: s.icon_bg }}>{ins.icon}</span>
                <span className="ip-type-badge" style={{ color: s.labelColor, background: s.icon_bg }}>{s.label}</span>
              </div>
              <h4 className="ip-card-title">{ins.title}</h4>
              <p className="ip-card-body" dangerouslySetInnerHTML={{ __html: ins.body }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
