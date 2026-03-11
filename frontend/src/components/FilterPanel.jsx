import './FilterPanel.css'

const SDOH_OPTIONS = [
  "Income & Distribution",
  "Education",
  "Unemployment & Job Security",
  "Employment Conditions",
  "Early Childhood Development",
  "Food Insecurity",
  "Housing",
  "Social Exclusion",
  "Social Safety Network",
  "Health Services",
  "Indigenous Status",
  "Gender",
  "Race",
  "Disability"
]

const POPULATION_OPTIONS = [
  "Indigenous", "Low-Income", "Elderly", "Children", "Women",
  "Immigrants", "LGBTQ+", "Disability", "General Population", "Racialized Groups"
]

const STUDY_TYPES = ["Cohort Study", "RCT", "Survey", "Cross-Sectional", "Mixed Methods", "Retrospective"]

export default function FilterPanel({ filters, onChange }) {
  const set = (key, val) => onChange(prev => ({ ...prev, [key]: val }))

  const hasFilters = filters.population || filters.status || filters.sdoh || filters.minScore

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3 className="filter-title">Filters</h3>
        {hasFilters && (
          <button
            className="clear-btn"
            onClick={() => onChange({ population: '', status: '', sdoh: '', minScore: '' })}
          >
            Clear all
          </button>
        )}
      </div>

      <div className="filter-section">
        <label className="filter-label">Study Status</label>
        <div className="filter-pills">
          {['', 'Active', 'Completed', 'Proposed'].map(s => (
            <button
              key={s}
              className={`pill${filters.status === s ? ' pill--active' : ''}`}
              onClick={() => set('status', s)}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">
          Social Determinant of Health
        </label>
        <select
          className="filter-select"
          value={filters.sdoh}
          onChange={e => set('sdoh', e.target.value)}
        >
          <option value="">All determinants</option>
          {SDOH_OPTIONS.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <p className="filter-hint">Filter studies addressing this SDOH</p>
      </div>

      <div className="filter-section">
        <label className="filter-label">
          Beneficiary / Target Population
        </label>
        <select
          className="filter-select"
          value={filters.population}
          onChange={e => set('population', e.target.value)}
        >
          <option value="">All populations</option>
          {POPULATION_OPTIONS.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <p className="filter-hint">Primary focus demographic</p>
      </div>

      <div className="filter-section">
        <label className="filter-label">
          Min. SDOH Alignment Score
        </label>
        <div className="range-row">
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            className="filter-range"
            value={filters.minScore || 0}
            onChange={e => set('minScore', e.target.value === '0' ? '' : e.target.value)}
          />
          <span className="range-value">
            {filters.minScore ? `${filters.minScore}%+` : 'Any'}
          </span>
        </div>
      </div>

      <div className="filter-info">
        <div className="info-icon">ℹ</div>
        <p>
          SDOH categories based on the Canadian Public Health Association's 14 social determinants framework.
        </p>
      </div>
    </div>
  )
}
