export type ArrivalState = 'TBD' | 'Planned · pending confirmation' | 'Working assumption' | 'Confirmed'

export interface ArrivalStep {
  time: string
  title: string
  description: string
  state: ArrivalState
}

export const arrivalFlow: ArrivalStep[] = [
  { time: '11:00–11:30 AM', title: 'Gio + helpers set up', description: 'No formal guest meetup. Park at Pier 39 Garage, cart supplies to the boat, meet helpers, and get organized.', state: 'Working assumption' },
  { time: '~11:10–11:30 AM', title: 'Move supplies to Berth #4', description: 'Bring supplies to the dock. Early boarding has not been promised; board only when Aaron and the crew are ready.', state: 'Working assumption' },
  { time: '11:45 AM', title: 'Guests arrive ready to board', description: 'Confirmed destination: Bass Tub, 276 Jefferson Street, Berth #4.', state: 'Confirmed' },
  { time: '12:00 PM', title: 'Cruise begins', description: 'The boat is booked from 12:00–2:00 PM.', state: 'Confirmed' },
]

export const logisticsFields = [
  { id: 'boarding-time', label: 'Guest boarding readiness', placeholder: 'Confirmed time', note: 'Guests should arrive ready to board at 11:45 AM.' },
  { id: 'parking', label: 'Guest parking option', placeholder: 'Parking guidance', note: 'Pier 39 Garage is convenient and about a 7-minute walk; present it as an option, not required parking.' },
  { id: 'rideshare', label: 'Rideshare recommendation', placeholder: 'Recommendation for guests' },
  { id: 'unloading', label: 'Supply unloading plan', placeholder: 'Confirm exact location morning-of' },
  { id: 'supply-driver', label: 'Supply driver', placeholder: 'Unassigned', note: 'Current plan: Gio.' },
]

export const transportItems = [
  { id: 'cart', title: "Gio's brother's foldable wheeled cart", note: 'Borrow it and load it with consolidated supplies.' },
  { id: 'cooler', title: 'Cooler', note: "Transport Gio's cooler if the boat cooler is unavailable or uncertain." },
  { id: 'pizza', title: 'Pizza', note: 'Transport four planned Costco pizzas flat; serve inside on or around one dinette so they stay warm and out of the outdoor space.' },
  { id: 'drinks', title: 'Drinks', note: 'Plan weight, cold storage, and approved containers.' },
  { id: 'cake', title: 'Cake', note: 'Transport separately and do not stack it somewhere unstable.' },
  { id: 'decor', title: 'Decor', note: 'Bring only boat-safe items approved by Aaron.' },
]
