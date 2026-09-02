import { useEffect, useState } from 'react'
import { AppHeader } from './components/AppHeader'
import { Navigation } from './components/Navigation'
import { navigationItems } from './data/navigation'
import { OverviewPage } from './pages/OverviewPage'
import { TasksPage } from './pages/TasksPage'
import { TimelinePage } from './pages/TimelinePage'
import { BoatQuestionsPage } from './pages/BoatQuestionsPage'
import { PeoplePage } from './pages/PeoplePage'
import { FoodPage } from './pages/FoodPage'
import { ExperiencePage } from './pages/ExperiencePage'
import { LogisticsPage } from './pages/LogisticsPage'
import { CommunicationsPage } from './pages/CommunicationsPage'
import { ShoppingPage } from './pages/ShoppingPage'
import { PartyDayPage } from './pages/PartyDayPage'
import { ReadinessPage } from './pages/ReadinessPage'
import { PlanPage } from './pages/PlanPage'

function getRoute() {
  const route = window.location.hash.replace('#', '') || 'overview'
  return navigationItems.some((item) => item.id === route) ? route : 'overview'
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState(getRoute)

  useEffect(() => {
    const handleHashChange = () => setActiveRoute(getRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(activeRoute === 'party-day' ? '#party-day-main' : '#main-content')?.focus({ preventScroll: true })
    })
  }, [activeRoute])

  if (activeRoute === 'party-day') {
    return <><a className="skip-link" href="#party-day-main">Skip to checklist</a><PartyDayPage /></>
  }

  return (
    <div className="app-frame">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <AppHeader />
      <div className="app-layout">
        <Navigation activeId={activeRoute} onNavigate={setActiveRoute} />
        <main id="main-content" tabIndex={-1}>
          {activeRoute === 'overview' && <OverviewPage />}
          {activeRoute === 'tasks' && <TasksPage />}
          {activeRoute === 'timeline' && <TimelinePage />}
          {activeRoute === 'plan' && <PlanPage />}
          {activeRoute === 'aaron' && <BoatQuestionsPage />}
          {activeRoute === 'people' && <PeoplePage />}
          {activeRoute === 'food' && <FoodPage />}
          {activeRoute === 'experience' && <ExperiencePage />}
          {activeRoute === 'logistics' && <LogisticsPage />}
          {activeRoute === 'communications' && <CommunicationsPage />}
          {activeRoute === 'shopping' && <ShoppingPage />}
          {activeRoute === 'readiness' && <ReadinessPage />}
        </main>
      </div>
      <footer>
        <p>Made for CayCay's 25th · Source of truth: the master plan</p>
      </footer>
    </div>
  )
}
