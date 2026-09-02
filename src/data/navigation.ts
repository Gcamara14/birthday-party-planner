import type { NavigationItem, PlanningTask } from '../types/event'

export const navigationItems: NavigationItem[] = [
  { id: 'overview', label: 'Home', shortLabel: 'Home', description: 'See what needs attention right now', phase: 'available', showOnMobile: true, group: 'Focus' },
  { id: 'tasks', label: 'Task board', shortLabel: 'Tasks', description: 'Track status, owners, and blockers', phase: 'available', showOnMobile: true, group: 'Focus' },
  { id: 'timeline', label: 'Timeline', shortLabel: 'Timeline', description: 'See work by deadline', phase: 'available', group: 'Focus' },
  { id: 'plan', label: 'Planning guide', shortLabel: 'Plan', description: 'Choose the right planning workspace', phase: 'available', showOnMobile: true, group: 'Plan' },
  { id: 'aaron', label: 'Aaron / Boat', shortLabel: 'Aaron', description: 'Review resolved rules and day-of caveats', phase: 'available', group: 'Plan' },
  { id: 'people', label: 'People & roles', shortLabel: 'People', description: 'Delegate day-of responsibilities', phase: 'available', group: 'Plan' },
  { id: 'logistics', label: 'Logistics & transport', shortLabel: 'Logistics', description: 'Plan arrival and move supplies', phase: 'available', group: 'Plan' },
  { id: 'food', label: 'Food & drinks', shortLabel: 'Food', description: 'Decide quantities after boat rules', phase: 'available', group: 'Plan' },
  { id: 'experience', label: 'Party experience', shortLabel: 'Vibes', description: 'Prepare the birthday moment and music', phase: 'available', group: 'Plan' },
  { id: 'communications', label: 'Guest messages', shortLabel: 'Messages', description: 'Draft Partiful updates from confirmed facts', phase: 'available', group: 'Plan' },
  { id: 'shopping', label: 'Shopping & packing', shortLabel: 'Packing', description: 'Buy and pack the finalized plan', phase: 'available', group: 'Plan' },
  { id: 'readiness', label: 'Final readiness', shortLabel: 'Ready', description: 'Confirm the definition of done', phase: 'available', showOnMobile: true, group: 'Finish' },
  { id: 'party-day', label: 'Party Day mode', shortLabel: 'Party Day', description: 'Use only on October 3', phase: 'available', showOnMobile: true, group: 'Finish' },
]

export function routeForTask(task: PlanningTask): string {
  if (task.group === 'Aaron & boat rules' || /Aaron/i.test(task.title)) return 'aaron'
  if (task.group === 'People & responsibilities') return 'people'
  if (task.group === 'Food & drinks') return 'food'
  if (['Cake & birthday moment', 'Music', 'Activities & games', 'Photos & video', 'Decorations'].includes(task.group)) return 'experience'
  if (task.group === 'Transportation & supplies' || task.group === 'After-party') return 'logistics'
  if (task.group === 'Payments') return 'communications'
  if (task.group === 'Shopping & packing') return 'shopping'
  if (task.group === 'Weather') return 'readiness'
  if (task.group === 'Day-of checklist') return 'party-day'
  if (/Partiful|guest update|RSVP/i.test(task.title)) return 'communications'
  if (/helper|MC|photo\/video lead/i.test(task.title)) return 'people'
  if (/meetup|transport|parking|rideshare|after-party/i.test(task.title)) return 'logistics'
  return 'tasks'
}
