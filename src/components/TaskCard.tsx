import type { PlanningTask, TaskStatus } from '../types/event'

export function TaskCard({ task, status = task.status }: { task: PlanningTask; status?: TaskStatus }) {
  return (
    <article className="task-card">
      <div className="task-card-topline">
        <span className={`status status-${status.toLowerCase().replace(/\s+/g, '-')}`}>{status}</span>
        <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>
      <h3>{task.title}</h3>
      <dl className="task-meta">
        <div><dt>Owner</dt><dd>{task.owner ?? 'Unassigned'}</dd></div>
        {task.dueLabel && <div><dt>Due</dt><dd>{task.dueLabel}</dd></div>}
      </dl>
      {task.dependency && <p className="dependency"><strong>Waiting on:</strong> {task.dependency}</p>}
    </article>
  )
}
