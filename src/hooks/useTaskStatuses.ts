import { useState } from 'react'
import { allTasks } from '../data/tasks'
import type { PlanningTask, TaskStatus } from '../types/event'
import { loadLocal, saveLocal } from '../utils/storage'

type StatusMap = Record<string, TaskStatus>
const storageKey = 'caycay-party-task-statuses'

function loadStatuses(): StatusMap {
  const stored = loadLocal<StatusMap>(storageKey, {})
  allTasks.filter((task) => task.status === 'Done').forEach((task) => delete stored[task.id])
  return stored
}

export function useTaskStatuses() {
  const [statuses, setStatuses] = useState<StatusMap>(loadStatuses)

  const statusFor = (taskOrId: PlanningTask | string): TaskStatus => {
    const task = typeof taskOrId === 'string' ? allTasks.find((item) => item.id === taskOrId) : taskOrId
    return task ? statuses[task.id] ?? task.status : 'Not Started'
  }

  const changeStatus = (taskId: string, status: TaskStatus) => {
    setStatuses((current) => {
      const next = { ...current, [taskId]: status }
      saveLocal(storageKey, next)
      return next
    })
  }

  return { statuses, statusFor, changeStatus }
}
