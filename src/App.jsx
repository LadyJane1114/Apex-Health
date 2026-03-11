import { useState, useMemo } from 'react'
import Header from './components/Header'
import KpiBar from './components/KpiBar'
import SdohChart from './components/SdohChart'
import StudyTable from './components/StudyTable'
import FilterPanel from './components/FilterPanel'
import { STUDIES, KPIS, SDOH_AGGREGATES, SDOH_CATEGORIES } from './data/dummyData'
import './styles/app.css'

export default function App() {
  const [filters, setFilters] = useState({
    population: 'All Populations',
    status: '',
    sdoh: '',
    minScore: 0
  })

  const filteredStudies = useMemo(() => {
    return STUDIES.filter(s => {
      if (filters.population && filters.population !== 'All Populations') {
        if (!s.targetPopulation.toLowerCase().includes(filters.population.toLowerCase())) return false
      }
      if (filters.status && s.status !== filters.status) return false
      if (filters.minScore > 0 && s.overallSdohScore < filters.minScore) return false
      return true
    })
  }, [filters])

  // If a specific SDOH is selected, highlight that determinant in the chart
  const chartData = useMemo(() => {
    return SDOH_AGGREGATES.map(d => ({
      ...d,
      highlighted: filters.sdoh ? d.determinant === filters.sdoh : false
    }))
  }, [filters.sdoh])

  const liveKpis = useMemo(() => ({
    ...KPIS,
    totalStudies: filteredStudies.length,
    activeStudies: filteredStudies.filter(s => s.status === 'Active').length,
    completedStudies: filteredStudies.filter(s => s.status === 'Completed').length,
    averageSdohAlignment: filteredStudies.length
      ? Math.round(filteredStudies.reduce((s, st) => s + st.overallSdohScore, 0) / filteredStudies.length * 10) / 10
      : 0
  }), [filteredStudies])

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="page-intro">
          <h2 className="page-heading">Research Analytics Dashboard</h2>
          <p className="page-sub">Social Determinants of Health alignment across active research studies</p>
        </div>
        <KpiBar kpis={liveKpis} />
        <div className="content-grid">
          <aside className="sidebar">
            <FilterPanel filters={filters} onChange={setFilters} />
          </aside>
          <section className="charts-area">
            <SdohChart data={chartData} selectedSdoh={filters.sdoh} />
            <StudyTable studies={filteredStudies} selectedSdoh={filters.sdoh} />
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-brand">Apex Health Platform</span>
          <span className="footer-divider">·</span>
          <span>MVP Demo · March 2025</span>
          <span className="footer-divider">·</span>
          <span>Synthetic data only — not for clinical use</span>
        </div>
      </footer>
    </div>
  )
}
