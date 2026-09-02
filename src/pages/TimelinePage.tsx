import { allTasks } from '../data/tasks'
import { useTaskStatuses } from '../hooks/useTaskStatuses'

const milestones = [
  { label: 'Next 48 hours', match: ['Next 48 hours'], focus: 'Start here', description: 'Resolve the critical questions that unlock the rest of the plan.' },
  { label: 'End of this week', match: ['End of this week'], description: 'Turn confirmed logistics into one clear guest update.' },
  { label: 'This weekend / early next week', match: ['This weekend / early next week'], description: 'Give the helper crew light, specific roles.' },
  { label: 'By mid-September', match: ['By mid-September'], description: 'Lock the major choices and assign purchasing and transport.' },
  { label: '~10 days before', match: ['~10 days before'], description: 'Begin watching the marine-area forecast.' },
  { label: '3–5 days before', match: ['3–5 days before'], description: 'Recheck conditions and communicate only if needed.' },
  { label: 'Day before', match: ['Day before'], description: 'Make the final weather check and send a concise reminder.' },
  { label: 'Party day', match: ['Party day · before leaving', 'Party day · at the Wharf', 'Party day · onboard', 'Party day · before docking', 'Party day'], description: 'Pack, arrive, celebrate, and leave the boat in excellent condition.' },
]

export function TimelinePage() {
  const { statusFor } = useTaskStatuses()
  const milestoneData = milestones.map((milestone) => {
    const tasks = allTasks.filter((task) => task.dueLabel && milestone.match.includes(task.dueLabel))
    const completed = tasks.filter((task) => statusFor(task) === 'Done').length
    return { ...milestone, tasks, completed, outstanding: tasks.length - completed }
  })
  const currentIndex = milestoneData.findIndex((milestone) => milestone.outstanding > 0)

  return (
    <section className="timeline-page" aria-labelledby="timeline-title">
      <div className="timeline-heading">
        <p className="eyebrow">Planning rhythm</p>
        <h1 id="timeline-title">What should we work on now?</h1>
        <p>Work from the top down. Each milestone is built from the same tasks and statuses as the task board.</p>
      </div>

      <aside className="critical-path resolved-path" aria-labelledby="critical-path-title">
        <span className="critical-path-icon" aria-hidden="true">!</span>
        <div>
          <p className="eyebrow">Dependency resolved</p>
          <h2 id="critical-path-title">Aaron logistics are no longer blocking the plan</h2>
          <p>Move next to Partiful details, helper roles, cake, quantities, decor, music, and the after-party.</p>
        </div>
      </aside>

      <ol className="timeline-list">
        {milestoneData.map((milestone, index) => {
          const isCurrent = index === currentIndex
          const isComplete = milestone.tasks.length > 0 && milestone.outstanding === 0
          const percent = milestone.tasks.length ? Math.round((milestone.completed / milestone.tasks.length) * 100) : 0
          return (
            <li className={`milestone ${isCurrent ? 'milestone-current' : ''} ${isComplete ? 'milestone-complete' : ''}`} key={milestone.label}>
              <span className="timeline-marker" aria-hidden="true">{isComplete ? '✓' : index + 1}</span>
              <article>
                <div className="milestone-topline">
                  <div>
                    {isCurrent && <span className="now-chip">Work on this now</span>}
                    <h2>{milestone.label}</h2>
                    <p>{milestone.description}</p>
                  </div>
                  <div className="milestone-count" aria-label={`${milestone.completed} completed and ${milestone.outstanding} outstanding`}>
                    <strong>{milestone.outstanding}</strong><span>outstanding</span>
                  </div>
                </div>
                <div className="progress-track" role="progressbar" aria-label={`${milestone.label} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
                  <span style={{ width: `${percent}%` }} />
                </div>
                <p className="progress-copy">{milestone.completed} of {milestone.tasks.length} complete</p>
                <details open={isCurrent}>
                  <summary>View milestone tasks</summary>
                  <ul className="milestone-tasks">
                    {milestone.tasks.map((task) => {
                      const status = statusFor(task)
                      return (
                        <li key={task.id}>
                          <span className={`timeline-status timeline-status-${status.toLowerCase().replace(/\s+/g, '-')}`} aria-label={status}>{status === 'Done' ? '✓' : ''}</span>
                          <div><strong>{task.title}</strong><span>{status} · {task.owner ?? 'Unassigned'}</span>{task.dependency && <em>Blocked by: {task.dependency}</em>}</div>
                        </li>
                      )
                    })}
                  </ul>
                </details>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
