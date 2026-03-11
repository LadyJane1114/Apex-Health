import './StudyTable.css'

const STATUS_STYLE = {
  Active:    { bg: '#dcfce7', color: '#166534' },
  Completed: { bg: '#dbeafe', color: '#1e40af' },
  Proposed:  { bg: '#fef9c3', color: '#854d0e' }
}

export default function StudyTable({ studies, selectedSdoh, onStudyClick }) {
  return (
    <div className="st-card">
      <div className="st-header">
        <div>
          <h2 className="st-title">Research Studies</h2>
          <p className="st-sub">
            {studies.length === 0
              ? 'No studies match the current filters'
              : `${studies.length} ${studies.length === 1 ? 'study' : 'studies'} · click any row to view full details`}
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
                <th>Participants</th>
                <th>Status</th>
                <th>SDOH Score</th>
                {selectedSdoh && <th>{selectedSdoh.split(' ')[0]}</th>}
              </tr>
            </thead>
            <tbody>
              {studies.map(s => (
                <tr
                  key={s.id}
                  className="st-row"
                  onClick={() => onStudyClick && onStudyClick(s)}
                >
                  <td className="st-title-cell">
                    <span className="st-open-icon">↗</span>
                    <span className="st-study-title">{s.title}</span>
                  </td>
                  <td className="st-author">{s.author}</td>
                  <td>{s.year}</td>
                  <td><span className="st-type">{s.studyType}</span></td>
                  <td>{s.targetPopulation}</td>
                  <td>{s.participants > 0 ? s.participants.toLocaleString() : <span style={{ color: '#8A847A' }}>TBD</span>}</td>
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
                        color: (s.sdohScores[selectedSdoh] >= 80) ? '#9A7A2E' : 'inherit'
                      }}>
                        {s.sdohScores[selectedSdoh] ?? '—'}%
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
