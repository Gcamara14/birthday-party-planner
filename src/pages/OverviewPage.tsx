import { EventSnapshot } from '../components/EventSnapshot'
import { SectionHeading } from '../components/SectionHeading'
import { eventDetails } from '../data/event'
import { allTasks } from '../data/tasks'
import { routeForTask } from '../data/navigation'
import { useCountdown } from '../hooks/useCountdown'
import { useTaskStatuses } from '../hooks/useTaskStatuses'

export function OverviewPage() {
  const countdown = useCountdown(eventDetails.dateTime)
  const { statusFor } = useTaskStatuses()
  const priorityOrder = { Critical: 0, High: 1, Normal: 2, 'Nice-to-have': 3 }
  const statusOrder = { 'In Progress': 0, 'Not Started': 1, Waiting: 2, Done: 3 }
  const nextActions = allTasks.filter((task) => task.isNextAction && statusFor(task) !== 'Done').sort((a, b) => statusOrder[statusFor(a)] - statusOrder[statusFor(b)] || priorityOrder[a.priority] - priorityOrder[b.priority] || a.sourceLine - b.sourceLine).slice(0, 4)
  const bestAction = nextActions[0]
  const allBlocked = allTasks.filter((task) => statusFor(task) === 'Waiting')
  const blocked = allBlocked.slice(0, 3)
  const deadlineGroups = [
    { label: 'Next 48 hours', match: ['Next 48 hours'] }, { label: 'End of this week', match: ['End of this week'] },
    { label: 'This weekend / early next week', match: ['This weekend / early next week'] }, { label: 'By mid-September', match: ['By mid-September'] },
    { label: '~10 days before', match: ['~10 days before'] }, { label: '3–5 days before', match: ['3–5 days before'] },
    { label: 'Day before', match: ['Day before'] }, { label: 'Party day', match: ['Party day · before leaving', 'Party day · at the Wharf', 'Party day · onboard', 'Party day · before docking', 'Party day'] },
  ]
  const upcoming = deadlineGroups.map(({ label, match }) => ({ label, count: allTasks.filter((task) => task.dueLabel && match.includes(task.dueLabel) && statusFor(task) !== 'Done').length })).filter((item) => item.count > 0).slice(0, 4)

  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Saturday · October 3 · San Francisco</p>
          <h1 id="page-title">CayCay's 25th Birthday Boat Party</h1>
          <p className="hero-copy">A two-hour birthday cruise on the San Francisco Bay—with the details handled so the day itself can be just vibes.</p>
        </div>
        <div className="countdown-card" aria-label={countdown.isPast ? 'The event date has passed' : `${countdown.days} days and ${countdown.hours} hours until the party`}>
          {countdown.isPast ? (
            <><strong>Party day</strong><span>October 3, 2026</span></>
          ) : (
            <><strong>{countdown.days}</strong><span>days to go</span><small>{countdown.hours} hours</small></>
          )}
        </div>
      </section>

      <section className="tasks-section home-priorities" aria-labelledby="tasks-title">
        <div className="tasks-heading-row">
          <SectionHeading
            id="tasks-title"
            eyebrow="Needs attention"
            title="Next Actions"
            description="The highest-priority outstanding work from the master plan."
          />
          <a className="view-all-link" href="#tasks">View task board →</a>
        </div>
        {bestAction ? <div className="best-action">
          <div><span className="best-action-label">Do this next</span><h3>{bestAction.title}</h3><p>{bestAction.notes ?? bestAction.dependency ?? 'Open the relevant workspace to move this forward.'}</p><dl><div><dt>Owner</dt><dd>{bestAction.owner ?? 'Unassigned'}</dd></div><div><dt>When</dt><dd>{bestAction.dueLabel ?? 'Not specified'}</dd></div></dl></div>
          <a href={`#${routeForTask(bestAction)}`}>Open workspace →</a>
        </div> : <div className="next-actions-clear"><span aria-hidden="true">✓</span><div><h3>Immediate actions complete</h3><p>Open the Timeline to see the next milestone.</p></div></div>}
        {nextActions.length > 1 && <div className="next-queue"><p>Then</p><ol>{nextActions.slice(1).map((task) => <li key={task.id}><a href={`#${routeForTask(task)}`}><span>{task.title}</span><strong>{task.owner ?? 'Unassigned'} · {task.dueLabel ?? 'No timeframe'}</strong></a></li>)}</ol></div>}
      </section>

      <div className="home-signal-grid">
        <section className="home-blockers" aria-labelledby="home-blockers-title">
          <div className="signal-heading"><div><p className="eyebrow">Blocked</p><h2 id="home-blockers-title">Waiting on answers</h2></div><span>{allBlocked.length}</span></div>
          {blocked.length ? <ul>{blocked.map((task) => <li key={task.id}><strong>{task.title}</strong><span>{task.dependency ?? 'Dependency unresolved'}</span></li>)}</ul> : <p className="signal-empty">No tasks are currently marked Waiting.</p>}
          <a href="#aaron">Open Aaron / Boat Questions →</a>
        </section>
        <section className="home-deadlines" aria-labelledby="home-deadlines-title">
          <div className="signal-heading"><div><p className="eyebrow">Coming up</p><h2 id="home-deadlines-title">Upcoming deadlines</h2></div></div>
          <ul>{upcoming.map((item) => <li key={item.label}><span>{item.label}</span><strong>{item.count} open</strong></li>)}</ul>
          <a href="#timeline">Open planning timeline →</a>
        </section>
      </div>

      <div className="home-event-status"><EventSnapshot /></div>
    </>
  )
}
