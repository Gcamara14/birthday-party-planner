export type TaskStatus = 'Not Started' | 'Waiting' | 'In Progress' | 'Done'
export type TaskPriority = 'Critical' | 'High' | 'Normal' | 'Nice-to-have'
export type TaskOwner = 'Gio' | 'CayCay' | 'Sam' | 'Kira' | 'Lynn' | 'Other'

export interface EventDetails {
  occasion: string
  date: string
  dateTime: string
  cruiseTime: string
  meetupTime: string
  departureAddress: string
  boat: string
  captain: string
  boatCapacity: number
  guestLimit: number
  rsvps: {
    going: number
    maybe: number
  }
  cost: {
    totalPaid: number
    boat: number
    serviceFee: number
    suggestedContribution: number
  }
  communicationChannel: string
}

export interface PlanningTask {
  id: string
  title: string
  status: TaskStatus
  owner?: TaskOwner
  dueLabel?: string
  priority: TaskPriority
  dependency?: string
  notes?: string
  group: string
  subgroup: string
  sourceLine: number
  isNextAction: boolean
}

export type BoatQuestionStatus = 'Unanswered' | 'Asked / Waiting' | 'Answered'
export type RoleState = 'Confirmed' | 'Proposed' | 'Unassigned'

export interface Person {
  id: string
  name: string
  relationship: string
  summary: string
  responsibilities: Array<{ label: string; state: Exclude<RoleState, 'Unassigned'> }>
}

export interface PartyRole {
  id: string
  title: string
  state: RoleState
  candidates: string[]
  purpose: string
}

export interface NavigationItem {
  id: string
  label: string
  shortLabel: string
  description: string
  phase: 'available' | 'future'
  showOnMobile?: boolean
  group: 'Focus' | 'Plan' | 'Finish'
}
