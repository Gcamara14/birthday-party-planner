import { eventDetails } from '../data/event'
import { partyDayPhases } from '../data/partyDay'
import { useTaskStatuses } from '../hooks/useTaskStatuses'

export function PartyDayPage() {
  const { statusFor, changeStatus } = useTaskStatuses()
  const isDone = (taskIds: string[]) => taskIds.length > 0 && taskIds.every((id) => statusFor(id) === 'Done')
  const allItems = partyDayPhases.flatMap((phase) => phase.items)
  const completed = allItems.filter((item) => isDone(item.tasks.map((task) => task.id))).length
  const currentPhase = partyDayPhases.find((phase) => phase.items.some((item) => !isDone(item.tasks.map((task) => task.id))))

  const toggleItem = (taskIds: string[], done: boolean) => {
    taskIds.forEach((id) => changeStatus(id, done ? 'Done' : 'Not Started'))
  }

  return (
    <div className="party-day-page">
      <header className="party-day-header">
        <a href="#overview" aria-label="Exit Party Day mode and return to overview">← Exit</a>
        <span>Party Day</span>
        <span className="party-live-dot"><i aria-hidden="true" /> Oct 3</span>
      </header>
      <main id="party-day-main" tabIndex={-1}>
        <section className="party-day-hero" aria-labelledby="party-day-title">
          <p className="eyebrow">Simple, calm, ready</p>
          <h1 id="party-day-title">Today's game plan</h1>
          <dl><div><dt>Meetup plan</dt><dd>{eventDetails.meetupTime}*</dd></div><div><dt>Where</dt><dd>272 Jefferson Street</dd></div><div><dt>Cruise</dt><dd>{eventDetails.cruiseTime}</dd></div></dl>
          <p className="party-day-pending">* Confirm the meetup and boarding flow with Aaron before party day.</p>
          <div className="day-progress"><div><span style={{ width: `${Math.round((completed / allItems.length) * 100)}%` }} /></div><p><strong>{completed} of {allItems.length}</strong> ready</p></div>
        </section>

        <div className="party-day-phases">
          {partyDayPhases.map((phase) => {
            const phaseComplete = phase.items.filter((item) => isDone(item.tasks.map((task) => task.id))).length
            const isCurrent = currentPhase?.id === phase.id
            return (
              <section className={`day-phase ${isCurrent ? 'day-phase-current' : ''}`} key={phase.id} aria-labelledby={`day-${phase.id}`}>
                <div className="day-phase-heading"><div>{isCurrent && <span>Focus here</span>}<h2 id={`day-${phase.id}`}>{phase.title}</h2><p>{phase.timeHint}</p></div><strong>{phaseComplete}/{phase.items.length}</strong></div>
                <ul>
                  {phase.items.map((item) => {
                    const taskIds = item.tasks.map((task) => task.id)
                    const done = isDone(taskIds)
                    return <li key={item.id}><label><input type="checkbox" checked={done} disabled={taskIds.length === 0} onChange={(event) => toggleItem(taskIds, event.target.checked)} /><span>{item.label}</span></label></li>
                  })}
                </ul>
              </section>
            )
          })}
        </div>
        <aside className="party-day-reminder"><span aria-hidden="true">♥</span><p><strong>The real goal:</strong> CayCay feels celebrated, Gio enjoys the party, and nobody has to think too hard.</p></aside>
      </main>
    </div>
  )
}
