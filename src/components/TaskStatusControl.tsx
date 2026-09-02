import type { TaskStatus } from '../types/event'

const statuses: TaskStatus[] = ['Not Started', 'Waiting', 'In Progress', 'Done']

interface TaskStatusControlProps {
  taskTitle: string
  value: TaskStatus
  onChange: (status: TaskStatus) => void
}

export function TaskStatusControl({ taskTitle, value, onChange }: TaskStatusControlProps) {
  return (
    <label className="status-control">
      <span className="sr-only">Status for {taskTitle}</span>
      <select value={value} onChange={(event) => onChange(event.target.value as TaskStatus)}>
        {statuses.map((status) => <option key={status}>{status}</option>)}
      </select>
    </label>
  )
}
