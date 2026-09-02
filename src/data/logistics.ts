export type ArrivalState = 'TBD' | 'Planned · pending confirmation' | 'Working assumption' | 'Confirmed'

export interface ArrivalStep {
  time: string
  title: string
  description: string
  state: ArrivalState
}

export const arrivalFlow: ArrivalStep[] = [
  { time: '~11:00 AM', title: 'Optional early-bird meetup', description: 'Nearby location has not been selected.', state: 'TBD' },
  { time: '11:30 AM', title: 'Official guest meetup', description: "272 Jefferson Street, Fisherman's Wharf", state: 'Planned · pending confirmation' },
  { time: '~11:45 AM', title: 'Expected boarding', description: 'Planning estimate only. Aaron must confirm the actual boarding time.', state: 'Working assumption' },
  { time: '12:00 PM', title: 'Cruise begins', description: 'The boat is booked from 12:00–2:00 PM.', state: 'Confirmed' },
]

export const logisticsFields = [
  { id: 'boarding-time', label: 'Exact boarding confirmation', placeholder: 'Enter time after Aaron confirms', note: 'Do not assume 11:45 AM is final.' },
  { id: 'early-meetup', label: 'Early meetup location', placeholder: 'TBD nearby location' },
  { id: 'parking', label: 'Parking recommendation', placeholder: 'Garage or parking details' },
  { id: 'rideshare', label: 'Rideshare recommendation', placeholder: 'Recommendation for guests' },
  { id: 'unloading', label: 'Supply unloading plan', placeholder: 'Loading area and process' },
  { id: 'supply-driver', label: 'Supply driver', placeholder: 'Unassigned' },
]

export const transportItems = [
  { id: 'cart', title: "Gio's brother's foldable wheeled cart", note: 'Borrow it and load it with consolidated supplies.' },
  { id: 'cooler', title: 'Cooler', note: "Transport Gio's cooler if the boat cooler is unavailable or uncertain." },
  { id: 'pizza', title: 'Pizza', note: 'Keep it stable and reasonably fresh.' },
  { id: 'drinks', title: 'Drinks', note: 'Plan weight, cold storage, and approved containers.' },
  { id: 'cake', title: 'Cake', note: 'Transport separately and do not stack it somewhere unstable.' },
  { id: 'decor', title: 'Decor', note: 'Bring only boat-safe items approved by Aaron.' },
]
