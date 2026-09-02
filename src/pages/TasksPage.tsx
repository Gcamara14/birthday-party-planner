import { useMemo, useState } from 'react'
import { TaskListItem } from '../components/TaskListItem'
import { allTasks, taskGroups } from '../data/tasks'
import { useTaskStatuses } from '../hooks/useTaskStatuses'
import type { TaskOwner } from '../types/event'

type View = 'All' | 'Next Actions' | 'Waiting' | 'In Progress' | 'Done' | 'By owner'
const views: View[] = ['All', 'Next Actions', 'Waiting', 'In Progress', 'Done', 'By owner']
const priorityOrder = { Critical: 0, High: 1, Normal: 2, 'Nice-to-have': 3 }
const ownerOptions: Array<TaskOwner | 'Unassigned'> = ['Gio', 'CayCay', 'Sam', 'Kira', 'Lynn', 'Other', 'Unassigned']
export function TasksPage() {
  const [view, setView] = useState<View>('Next Actions')
  const [owner, setOwner] = useState<TaskOwner | 'Unassigned'>('Unassigned')
  const { statuses, statusFor, changeStatus } = useTaskStatuses()

  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => {
      const status = statuses[task.id] ?? task.status
      if (view === 'Next Actions') return task.isNextAction && status !== 'Done'
      if (view === 'Waiting' || view === 'In Progress' || view === 'Done') return status === view
      if (view === 'By owner') return owner === 'Unassigned' ? !task.owner : task.owner === owner
      return true
    }).sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority] || a.sourceLine - b.sourceLine)
  }, [owner, statuses, view])

  const groupedTasks = taskGroups
    .map((group) => ({ group, tasks: filteredTasks.filter((task) => task.group === group) }))
    .filter(({ tasks }) => tasks.length > 0)

  return (
    <section className="tasks-page" aria-labelledby="task-board-title">
      <div className="task-page-heading">
        <div>
          <p className="eyebrow">Master plan</p>
          <h1 id="task-board-title">Task board</h1>
          <p>Every actionable checkbox from the source of truth, organized into manageable planning areas.</p>
        </div>
        <div className="task-total" aria-label={`${allTasks.length} total tasks`}><strong>{allTasks.length}</strong><span>Total tasks</span></div>
      </div>
      <aside className="task-board-purpose"><strong>This is the source for task status.</strong><span>Use planning workspaces to record detailed decisions; return here to manage the full checklist.</span></aside>

      <div className="task-toolbar">
        <div className="view-tabs" role="group" aria-label="Task views">
          {views.map((item) => (
            <button key={item} className={view === item ? 'active' : ''} type="button" aria-pressed={view === item} onClick={() => setView(item)}>{item}</button>
          ))}
        </div>
        {view === 'By owner' && (
          <label className="owner-filter">
            <span>Owner</span>
            <select value={owner} onChange={(event) => setOwner(event.target.value as TaskOwner | 'Unassigned')}>
              {ownerOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        )}
      </div>

      <p className="result-count" aria-live="polite">Showing {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}</p>
      {groupedTasks.length > 0 ? groupedTasks.map(({ group, tasks }) => {
        const headingId = `group-${group.replace(/\W+/g, '-').toLowerCase()}`
        return (
          <section className="task-group" key={group} aria-labelledby={headingId}>
            <div className="task-group-heading"><h2 id={headingId}>{group}</h2><span>{tasks.length}</span></div>
            <div className="task-list">
              {tasks.map((task) => <TaskListItem key={task.id} task={task} status={statusFor(task)} onStatusChange={changeStatus} />)}
            </div>
          </section>
        )
      }) : <div className="empty-state"><span aria-hidden="true">✓</span><h2>Nothing here right now</h2><p>Tasks matching this view will appear here.</p></div>}
    </section>
  )
}
