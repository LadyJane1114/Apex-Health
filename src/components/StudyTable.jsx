import { useState } from 'react'
import './StudyTable.css'

const STATUS_STYLE = {
  Active:    { bg: '#dcfce7', color: '#166534' },
  Completed: { bg: '#dbeafe', color: '#1e40af' },
  Proposed:  { bg: '#fef9c3', color: '#854d0e' }
}

export default function StudyTable({ studies, selectedSdoh }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="st-card">
      <div className="st-header">
        <div>
          <h2 className="st-title">Research Studies</h2>
          <p className="st-sub">
            {studies.length === 0
              ? 'No studies match the current filters'
              : `${studies.length} ${studies.length === 1 ? 'study' : 'studies'} · click any row to expand`}
          </p>
        </div>
      </div>

      {studies.length === 0 ? (
        <div className="st-empty">
          <div className="st-empty-icon">🔍</div>
          <p>No studies match the current filters.</p>
          <p className="st-empty-hint">Try adjusting your filter selections.</p>
        </div>
      ) : (
        <div className="st-wrap">
          <table className="st-table">
            <thead>
              <tr>
                <th>Study Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Type</th>
                <th>Population</th>
                <th>Status</th>
                <th>SDOH Score</th>
                {selectedSdoh && <th>{selectedSdoh.split(' ')[0]} Score</th>}
              </tr>
            </thead>
            <tbody>
              {studies.map(s => (
                <>
                  <tr
                    key={s.id}
                    className={`st-row${expanded === s.id ? ' st-row--open' : ''}`}
                    onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                  >
                    <td className="st-title-cell">
                      <span className="st-chevron">{expanded === s.id ? '▾' : '▸'}</span>
                      <span className="st-study-title">{s.title}</span>
                    </td>
                    <td className="st-author">{s.author}</td>
                    <td>{s.year}</td>
                    <td><span className="st-type">{s.studyType}</span></td>
                    <td>{s.targetPopulation}</td>
                    <td>
                      <span className="st-status" style={STATUS_STYLE[s.status] || {}}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <div className="st-score">
                        <span className="st-score-num">{s.overallSdohScore}%</span>
                        <div className="st-bar-bg">
                          <div className="st-bar-fill" style={{ width: `${s.overallSdohScore}%` }} />
                        </div>
                      </div>
                    </td>
                    {selectedSdoh && (
                      <td>
                        <span className="st-sdoh-score" style={{
                          color: s.sdohScores[selectedSdoh] >= 80 ? '#9A7A2E' : 'inherit'
                        }}>
                          {s.sdohScores[selectedSdoh] ?? '—'}%
                        </span>
                      </td>
                    )}
                  </tr>
                  {expanded === s.id && (
                    <tr key={`${s.id}-exp`} className="st-expand-row">
                      <td colSpan={selectedSdoh ? 8 : 7}>
                        <div className="st-expand">
                          <div className="st-expand-desc">
                            <strong>Description:</strong> {s.description}
                          </div>
                          <div className="st-expand-sdoh">
                            <p className="st-expand-sdoh-label">SDOH Scores</p>
                            <div className="st-sdoh-grid">
                              {Object.entries(s.sdohScores).map(([k, v]) => (
                                <div key={k} className={`st-sdoh-item${k === selectedSdoh ? ' highlighted' : ''}`}>
                                  <span className="st-sdoh-name">{k}</span>
                                  <div className="st-sdoh-bar-bg">
                                    <div className="st-sdoh-bar-fill" style={{ width: `${v}%`, opacity: v >= 80 ? 1 : 0.5 }} />
                                  </div>
                                  <span className="st-sdoh-val">{v}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
