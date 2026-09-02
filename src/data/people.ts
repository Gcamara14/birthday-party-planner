import type { PartyRole, Person } from '../types/event'

// Responsibilities mirror section 5 of the master plan. Potential helper
// responsibilities remain proposed until the hosts make explicit assignments.
export const people: Person[] = [
  {
    id: 'caycay', name: 'CayCay', relationship: 'Birthday girl · Primary social host',
    summary: 'Owns the guest list and invitations and decides who she wants at her birthday. She should not carry day-of logistics.',
    responsibilities: [
      { label: 'Primary social host', state: 'Confirmed' },
      { label: 'Guest list & invitations', state: 'Confirmed' },
    ],
  },
  {
    id: 'gio', name: 'Gio', relationship: 'Overall logistics · Planning lead',
    summary: 'Coordinates Aaron, supplies, the timeline, and the master plan while helping host the party.',
    responsibilities: [
      { label: 'Overall logistics', state: 'Confirmed' },
      { label: 'Planning lead', state: 'Confirmed' },
      { label: 'Aaron coordination', state: 'Confirmed' },
    ],
  },
  {
    id: 'sam', name: 'Sam', relationship: 'Helper',
    summary: 'Has offered to help. Keep the final assignment light and specific.',
    responsibilities: [
      { label: 'MC / crowd cues', state: 'Proposed' }, { label: 'Setup', state: 'Proposed' },
      { label: 'Guest coordination', state: 'Proposed' }, { label: 'Cleanup', state: 'Proposed' },
    ],
  },
  {
    id: 'kira', name: 'Kira', relationship: 'Helper',
    summary: 'Has offered to help. Keep the final assignment light and specific.',
    responsibilities: [
      { label: 'MC / crowd cues', state: 'Proposed' }, { label: 'Setup', state: 'Proposed' },
      { label: 'Guest coordination', state: 'Proposed' }, { label: 'Cleanup', state: 'Proposed' },
    ],
  },
  {
    id: 'lynn', name: 'Lynn', relationship: 'Helper',
    summary: 'Has offered to help. Keep the final assignment light and specific.',
    responsibilities: [
      { label: 'Setup', state: 'Proposed' }, { label: 'Guest coordination', state: 'Proposed' },
      { label: 'Cake / birthday moment', state: 'Proposed' }, { label: 'Photo / video', state: 'Proposed' },
      { label: 'Cleanup', state: 'Proposed' },
    ],
  },
]

export const operationalRoles: PartyRole[] = [
  { id: 'mc', title: 'MC / crowd cues', state: 'Proposed', candidates: ['Sam', 'Kira'], purpose: 'Gather guests for the birthday moment, group photo, and final cleanup cue.' },
  { id: 'guest-contact', title: 'Day-of guest contact', state: 'Proposed', candidates: ['Sam', 'Kira', 'Lynn'], purpose: 'Handle arrival questions and late guests so the hosts do not have to.' },
  { id: 'setup', title: 'Setup', state: 'Proposed', candidates: ['Sam', 'Kira', 'Lynn'], purpose: 'Help unload and set up allowed food, drinks, and decorations.' },
  { id: 'cake-owner', title: 'Cake owner', state: 'Proposed', candidates: ['Lynn'], purpose: 'Pick up, transport, protect, and prepare the cake moment.' },
  { id: 'photo-video', title: 'Photo / video lead', state: 'Proposed', candidates: ['Lynn'], purpose: 'Capture candid moments, birthday singing, and the full-group photo.' },
  { id: 'supply-transport', title: 'Supply transport', state: 'Unassigned', candidates: [], purpose: 'Drive, unload, and physically move supplies to the boat.' },
  { id: 'cleanup', title: 'Cleanup', state: 'Proposed', candidates: ['Sam', 'Kira', 'Lynn'], purpose: 'Collect trash, remove decorations, and complete the final belongings sweep.' },
]
