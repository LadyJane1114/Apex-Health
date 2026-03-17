import { SDOH_CATEGORIES, POPULATION_OPTIONS } from '../data/dummyData'
import './FilterPanel.css'

export default function FilterPanel({ filters, onChange }) {
  const set = (key, val) => onChange(p => ({ ...p, [key]: val }))
  const hasActive = filters.population !== 'All Populations' || filters.status || filters.sdoh || filters.minScore > 0

  return (
    <div className="fp">
      <div className="fp-head">
        <h3 className="fp-title">Filters</h3>
        {hasActive && (
          <button className="fp-clear" onClick={() => onChange({ population: 'All Populations', status: '', sdoh: '', minScore: 0 })}>
            Reset all
          </button>
        )}
      </div>

      {/* Status */}
      <div className="fp-section">
        <label className="fp-label">Study Status</label>
        <div className="fp-pills">
          {['', 'Active', 'Completed', 'Proposed'].map(s => (
            <button
              key={s}
              className={`fp-pill${filters.status === s ? ' fp-pill--on' : ''}`}
              onClick={() => set('status', s)}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* SDOH Filter */}
      <div className="fp-section">
        <label className="fp-label">Social Determinant of Health</label>
        <select className="fp-select" value={filters.sdoh} onChange={e => set('sdoh', e.target.value)}>
          <option value="">All 14 determinants</option>
          {SDOH_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <p className="fp-hint">Highlights selected determinant in chart</p>
      </div>

      {/* Population Filter */}
      <div className="fp-section">
        <label className="fp-label">Beneficiary / Target Population</label>
        <select className="fp-select" value={filters.population} onChange={e => set('population', e.target.value)}>
          {POPULATION_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <p className="fp-hint">Primary focus demographic of the study</p>
      </div>

      {/* Min Score */}
      <div className="fp-section">
        <label className="fp-label">
          Min. SDOH Alignment Score
          <span className="fp-score-val">{filters.minScore > 0 ? `${filters.minScore}%+` : 'Any'}</span>
        </label>
        <input
          type="range"
          min="0" max="95" step="5"
          className="fp-range"
          value={filters.minScore}
          onChange={e => set('minScore', Number(e.target.value))}
        />
        <div className="fp-range-labels"><span>0%</span><span>95%</span></div>
      </div>

      {/* Info box */}
      <div className="fp-info">
        <div className="fp-info-icon">ℹ</div>
        <p>SDOH categories follow the <strong>Canadian Public Health Association's</strong> 14 social determinants framework.</p>
      </div>
    </div>
  )
}
