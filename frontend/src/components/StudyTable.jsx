import { useState } from 'react'
import './StudyTable.css'

const STATUS_COLORS = {
  'Active': { bg: '#dcfce7', text: '#166534' },
  'Completed': { bg: '#e0f2fe', text: '#075985' },
  'Proposed': { bg: '#fef9c3', text: '#854d0e' }
}

export default function StudyTable({ studies }) {
  const [expanded, setExpanded] = useState(null)

  if (!studies || studies.length === 0) {
    return (
      <div className="study-table-card">
        <div className="table-header">
          <h2 className="table-title">Research Studies</h2>
        </div>
        <div className="table-empty">
          No studies match the selected filters.
        </div>
      </div>
    )
  }

  return (
    <div className="study-table-card">
      <div className="table-header">
        <div>
          <h2 className="table-title">Research Studies</h2>
          <p className="table-sub">{studies.length} {studies.length === 1 ? 'study' : 'studies'} found</p>
        </div>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Study Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Type</th>
              <th>Population</th>
              <th>Status</th>
              <th>SDOH Score</th>
            </tr>
          </thead>
          <tbody>
            {studies.map((s) => (
              <>
                <tr
                  key={s.id}
                  className={`table-row${expanded === s.id ? ' expanded' : ''}`}
                  onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                >
                  <td className="td-title">
                    <span className="expand-icon">{expanded === s.id ? '▾' : '▸'}</span>
                    {s.title}
                  </td>
                  <td>{s.author}</td>
                  <td>{s.year}</td>
                  <td>
                    <span className="type-badge">{s.studyType}</span>
                  </td>
                  <td>{s.targetPopulation}</td>
                  <td>
                    <span className="status-badge" style={{
                      background: STATUS_COLORS[s.status]?.bg || '#f3f4f6',
                      color: STATUS_COLORS[s.status]?.text || '#374151'
                    }}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <div className="score-cell">
                      <span className="score-value">{s.overallSdohScore}%</span>
                      <div className="score-bar-bg">
                        <div
                          className="score-bar-fill"
                          style={{ width: `${s.overallSdohScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                {expanded === s.id && (
                  <tr key={`${s.id}-desc`} className="expand-row">
                    <td colSpan={7}>
                      <div className="expand-content">
                        <strong>Description:</strong> {s.description || 'No description available.'}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
