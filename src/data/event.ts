import type { EventDetails } from '../types/event'

// Canonical structured event facts derived from the Markdown master plan.
// Update the PRD first when a planning decision changes, then mirror it here.
export const eventDetails: EventDetails = {
  occasion: "CayCay's 25th birthday",
  date: 'Saturday, October 3, 2026',
  dateTime: '2026-10-03T12:00:00-07:00',
  cruiseTime: '12:00–2:00 PM',
  meetupTime: '11:30 AM',
  departureAddress: "272 Jefferson Street, Fisherman's Wharf, San Francisco",
  boat: 'San Francisco Bay Yacht Cruise',
  captain: 'Aaron',
  boatCapacity: 55,
  guestLimit: 50,
  rsvps: { going: 38, maybe: 11 },
  cost: {
    totalPaid: 1376.04,
    boat: 1200,
    serviceFee: 176.04,
    suggestedContribution: 20,
  },
  communicationChannel: 'Partiful',
}
