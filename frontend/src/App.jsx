import { useState, useMemo } from 'react'
import Header from './components/Header'
import KpiBar from './components/KpiBar'
import SdohChart from './components/SdohChart'
import StudyTable from './components/StudyTable'
import FilterPanel from './components/FilterPanel'
import TrendChart from './components/TrendChart'
import PopulationChart from './components/PopulationChart'
import InsightsPanel from './components/InsightsPanel'
import StudyModal from './components/StudyModal'
import { STUDIES, KPIS, SDOH_AGGREGATES } from './data/dummyData'
import './styles/app.css'

const TABS = ['Overview', 'SDOH Analysis', 'Studies', 'Insights']

export default function App() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [selectedStudy, setSelectedStudy] = useState(null)
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
    totalParticipants: filteredStudies.reduce((sum, s) => sum + (s.participants || 0), 0),
    averageSdohAlignment: filteredStudies.length
      ? Math.round(filteredStudies.reduce((s, st) => s + st.overallSdohScore, 0) / filteredStudies.length * 10) / 10
      : 0
  }), [filteredStudies])

  return (
    <div className="app">
      <Header activeTab={activeTab} tabs={TABS} onTabChange={setActiveTab} />

      <main className="main">
        {/* Tab: Overview */}
        {activeTab === 'Overview' && (
          <div className="tab-content">
            <div className="page-intro">
              <h2 className="page-heading">Research Analytics Dashboard</h2>
              <p className="page-sub">Social Determinants of Health alignment across active research studies · Canadian Public Health Association Framework</p>
            </div>
            <KpiBar kpis={liveKpis} />
            <div className="overview-grid">
              <TrendChart />
              <PopulationChart studies={filteredStudies} />
            </div>
            <SdohChart data={chartData} selectedSdoh={filters.sdoh} compact />
          </div>
        )}

        {/* Tab: SDOH Analysis */}
        {activeTab === 'SDOH Analysis' && (
          <div className="tab-content">
            <div className="page-intro">
              <h2 className="page-heading">SDOH Alignment Analysis</h2>
              <p className="page-sub">Deep dive into how research studies address each of the 14 Social Determinants of Health</p>
            </div>
            <div className="content-grid">
              <aside className="sidebar">
                <FilterPanel filters={filters} onChange={setFilters} />
              </aside>
              <section className="charts-area">
                <SdohChart data={chartData} selectedSdoh={filters.sdoh} />
                <InsightsPanel studies={filteredStudies} sdohData={chartData} />
              </section>
            </div>
          </div>
        )}

        {/* Tab: Studies */}
        {activeTab === 'Studies' && (
          <div className="tab-content">
            <div className="page-intro">
              <h2 className="page-heading">Research Studies</h2>
              <p className="page-sub">Browse and filter all research studies in the platform</p>
            </div>
            <div className="content-grid">
              <aside className="sidebar">
                <FilterPanel filters={filters} onChange={setFilters} />
              </aside>
              <section className="charts-area">
                <StudyTable
                  studies={filteredStudies}
                  selectedSdoh={filters.sdoh}
                  onStudyClick={setSelectedStudy}
                />
              </section>
            </div>
          </div>
        )}

        {/* Tab: Insights */}
        {activeTab === 'Insights' && (
          <div className="tab-content">
            <div className="page-intro">
              <h2 className="page-heading">Platform Insights</h2>
              <p className="page-sub">Key findings, gaps, and recommendations across all research studies</p>
            </div>
            <InsightsPanel studies={STUDIES} sdohData={SDOH_AGGREGATES} full />
          </div>
        )}
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

      {selectedStudy && (
        <StudyModal study={selectedStudy} onClose={() => setSelectedStudy(null)} />
      )}
    </div>
  )
}
