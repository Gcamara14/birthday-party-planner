import type { NavigationItem } from '../types/event'

export const navigationItems: NavigationItem[] = [
  { id: 'overview', label: 'Overview', shortLabel: 'Home', description: 'Event snapshot and next actions', phase: 'available' },
  { id: 'tasks', label: 'Task board', shortLabel: 'Tasks', description: 'Owners, priorities, and blockers', phase: 'available' },
  { id: 'timeline', label: 'Timeline', shortLabel: 'Timeline', description: 'Milestones through party day', phase: 'available' },
  { id: 'aaron', label: 'Aaron / Boat', shortLabel: 'Aaron', description: 'Questions, answers, and unlocked decisions', phase: 'available' },
  { id: 'people', label: 'People & roles', shortLabel: 'People', description: 'Hosts and helper assignments', phase: 'available' },
  { id: 'food', label: 'Food & drinks', shortLabel: 'Food', description: 'Quantities, boat rules, and shopping', phase: 'available' },
  { id: 'experience', label: 'Party experience', shortLabel: 'Vibes', description: 'Birthday moment, music, and optional activities', phase: 'available' },
  { id: 'logistics', label: 'Logistics & transport', shortLabel: 'Logistics', description: 'Arrival, supplies, transportation, and late guests', phase: 'available' },
  { id: 'communications', label: 'Guest communications', shortLabel: 'Messages', description: 'Partiful updates and reminders', phase: 'available' },
  { id: 'shopping', label: 'Shopping & packing', shortLabel: 'Packing', description: 'Needed, purchased, and packed items', phase: 'available' },
  { id: 'party-day', label: 'Party Day mode', shortLabel: 'Party Day', description: 'A focused day-of checklist', phase: 'available' },
  { id: 'readiness', label: 'Final readiness', shortLabel: 'Ready', description: 'Weather checkpoints and definition of done', phase: 'available' },
  { id: 'more', label: 'More planning', shortLabel: 'More', description: 'Messages, packing, and decisions', phase: 'future', showOnMobile: false },
]
