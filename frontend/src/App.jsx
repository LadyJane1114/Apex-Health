import { useState, useEffect } from 'react'
import Header from './components/Header'
import KpiBar from './components/KpiBar'
import SdohChart from './components/SdohChart'
import StudyTable from './components/StudyTable'
import FilterPanel from './components/FilterPanel'
import { fetchStudies, fetchKpis, fetchSdohAggregates } from './data/api'
import './styles/app.css'

// Fallback demo data if backend is not running
const DEMO_KPIS = {
  totalStudies: 8,
  activeStudies: 4,
  completedStudies: 3,
  averageSdohAlignment: 74.2,
  totalPopulationsServed: 8
}

const DEMO_SDOH = [
  { determinant: "Income & Distribution", averageScore: 78.8 },
  { determinant: "Education", averageScore: 73.1 },
  { determinant: "Unemployment & Job Security", averageScore: 75.0 },
  { determinant: "Employment Conditions", averageScore: 72.5 },
  { determinant: "Early Childhood Development", averageScore: 71.3 },
  { determinant: "Food Insecurity", averageScore: 68.8 },
  { determinant: "Housing", averageScore: 72.5 },
  { determinant: "Social Exclusion", averageScore: 78.8 },
  { determinant: "Social Safety Network", averageScore: 80.0 },
  { determinant: "Health Services", averageScore: 78.1 },
  { determinant: "Indigenous Status", averageScore: 60.6 },
  { determinant: "Gender", averageScore: 68.1 },
  { determinant: "Race", averageScore: 75.6 },
  { determinant: "Disability", averageScore: 62.5 }
]

const DEMO_STUDIES = [
  {
    id: 1, title: "Housing Instability and Mental Health Outcomes in Urban Indigenous Communities",
    author: "Dr. Sarah Redcloud", year: "2023", studyType: "Cohort Study",
    targetPopulation: "Indigenous", status: "Active", overallSdohScore: 74.6,
    description: "Examines the relationship between housing instability and mental health in urban Indigenous populations."
  },
  {
    id: 2, title: "Food Security Interventions Among Low-Income Families in Nova Scotia",
    author: "Dr. James Tompkins", year: "2023", studyType: "RCT",
    targetPopulation: "Low-Income", status: "Active", overallSdohScore: 73.2,
    description: "Evaluates community-based food security programs and their impact on family health outcomes."
  },
  {
    id: 3, title: "Early Childhood Development Programs: Racial Disparities in Access",
    author: "Dr. Amara Diallo", year: "2022", studyType: "Cross-Sectional",
    targetPopulation: "Racialized Groups", status: "Completed", overallSdohScore: 75.4,
    description: "Investigates racial disparities in access to early childhood development programs."
  },
  {
    id: 4, title: "Gender-Based Employment Barriers in Healthcare Sector",
    author: "Dr. Priya Nair", year: "2023", studyType: "Survey",
    targetPopulation: "Women", status: "Active", overallSdohScore: 71.4,
    description: "Examines gender-based employment barriers among healthcare workers."
  },
  {
    id: 5, title: "Disability and Social Exclusion: Community Integration Programs",
    author: "Dr. Michael Chen", year: "2022", studyType: "Mixed Methods",
    targetPopulation: "Disability", status: "Completed", overallSdohScore: 74.6,
    description: "Evaluates social integration programs for people with disabilities."
  },
  {
    id: 6, title: "Income Inequality and Preventable Hospitalizations",
    author: "Dr. Emma Laurent", year: "2024", studyType: "Retrospective",
    targetPopulation: "General Population", status: "Proposed", overallSdohScore: 74.3,
    description: "Analyzes the relationship between income inequality and rates of preventable hospitalizations."
  },
  {
    id: 7, title: "Immigrant Health Outcomes and Social Safety Net Access",
    author: "Dr. Rahim Chowdhury", year: "2023", studyType: "Cohort Study",
    targetPopulation: "Immigrants", status: "Active", overallSdohScore: 78.2,
    description: "Studies health outcomes for recent immigrants and their access to social safety programs."
  },
  {
    id: 8, title: "Elderly Care: Employment Conditions of Personal Support Workers",
    author: "Dr. Carol MacPherson", year: "2022", studyType: "Survey",
    targetPopulation: "Elderly", status: "Completed", overallSdohScore: 72.1,
    description: "Evaluates working conditions and burnout among personal support workers in elderly care."
  }
]

export default function App() {
  const [kpis, setKpis] = useState(DEMO_KPIS)
  const [sdohData, setSdohData] = useState(DEMO_SDOH)
  const [studies, setStudies] = useState(DEMO_STUDIES)
  const [loading, setLoading] = useState(false)
  const [usingDemo, setUsingDemo] = useState(true)

  const [filters, setFilters] = useState({
    population: '',
    status: '',
    sdoh: '',
    minScore: ''
  })

  // Try to load from API, fall back to demo data silently
  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadStudies()
  }, [filters])

  async function loadData() {
    try {
      const [kpiRes, sdohRes] = await Promise.all([
        fetchKpis(),
        fetchSdohAggregates()
      ])
      setKpis(kpiRes)
      setSdohData(sdohRes)
      setUsingDemo(false)
    } catch {
      // silently use demo data
    }
  }

  async function loadStudies() {
    try {
      const params = {}
      if (filters.population) params.population = filters.population
      if (filters.status) params.status = filters.status
      if (filters.minScore) params.minScore = filters.minScore
      const data = await fetchStudies(params)
      setStudies(data)
      setUsingDemo(false)
    } catch {
      // filter demo data locally
      let filtered = DEMO_STUDIES
      if (filters.population) {
        filtered = filtered.filter(s =>
          s.targetPopulation.toLowerCase().includes(filters.population.toLowerCase()))
      }
      if (filters.status) {
        filtered = filtered.filter(s =>
          s.status.toLowerCase() === filters.status.toLowerCase())
      }
      if (filters.minScore) {
        filtered = filtered.filter(s => s.overallSdohScore >= parseFloat(filters.minScore))
      }
      setStudies(filtered)
    }
  }

  return (
    <div className="app">
      <Header />
      {usingDemo && (
        <div className="demo-banner">
          <span>⚡</span> Running with demo data — start the Spring Boot backend for live data
        </div>
      )}
      <main className="main">
        <KpiBar kpis={kpis} />
        <div className="content-grid">
          <aside className="sidebar">
            <FilterPanel filters={filters} onChange={setFilters} />
          </aside>
          <section className="charts-section">
            <SdohChart data={sdohData} />
            <StudyTable studies={studies} />
          </section>
        </div>
      </main>
      <footer className="footer">
        <p>© 2025 Apex Health Platform · MVP Demo · Synthetic data only · Not for clinical use</p>
      </footer>
    </div>
  )
}
