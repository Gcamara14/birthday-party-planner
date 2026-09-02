import type { PlanningTask, TaskStatus } from '../types/event'
import { TaskStatusControl } from './TaskStatusControl'
import { routeForTask } from '../data/navigation'

interface TaskListItemProps {
  task: PlanningTask
  status: TaskStatus
  onStatusChange: (taskId: string, status: TaskStatus) => void
}

export function TaskListItem({ task, status, onStatusChange }: TaskListItemProps) {
  const workspaceRoute = routeForTask(task)
  return (
    <article className={`task-list-item ${status === 'Done' ? 'task-done' : ''}`}>
      <div className="task-list-main">
        <div className="task-kickers">
          <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
          {task.isNextAction && <span className="next-chip">Next action</span>}
        </div>
        <h3>{task.title}</h3>
        {task.notes && <p className="task-notes">{task.notes}</p>}
        <dl className="task-details">
          <div><dt>Owner</dt><dd>{task.owner ?? 'Unassigned'}</dd></div>
          <div><dt>When</dt><dd>{task.dueLabel ?? 'Not specified'}</dd></div>
          <div><dt>Blocker</dt><dd>{task.dependency ?? 'None noted'}</dd></div>
        </dl>
        {workspaceRoute !== 'tasks' && <a className="task-workspace-link" href={`#${workspaceRoute}`}>Open related workspace →</a>}
      </div>
      <TaskStatusControl taskTitle={task.title} value={status} onChange={(nextStatus) => onStatusChange(task.id, nextStatus)} />
    </article>
  )
}
