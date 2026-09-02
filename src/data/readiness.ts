import { allTasks } from './tasks'

export const weatherCheckpoints = [
  {
    id: 'ten-days', timeframe: '~10 days before', title: 'Check the forecast',
    description: "Check the San Francisco / Fisherman's Wharf marine-area forecast.",
    taskPrefixes: ["Check San Francisco/Fisherman's Wharf marine-area forecast"],
  },
  {
    id: 'three-days', timeframe: '3–5 days before', title: 'Recheck conditions',
    description: 'Recheck weather, contact Aaron if conditions create concern, and send clothing guidance only if necessary.',
    taskPrefixes: ['Recheck weather.', 'Confirm with Aaron if conditions create any concern', 'Send clothing/weather guidance if necessary'],
  },
  {
    id: 'day-before', timeframe: 'Day before', title: 'Final check and reminder',
    description: 'Make the final weather check and send the final guest reminder.',
    taskPrefixes: ['Final weather check.', 'Final guest reminder.'],
  },
].map((checkpoint) => ({
  ...checkpoint,
  tasks: allTasks.filter((task) => task.group === 'Weather' && checkpoint.taskPrefixes.some((prefix) => task.title.startsWith(prefix))),
}))

export const readinessConditions = [
  { id: 'aaron-rules', title: "Aaron's rules and boarding details are confirmed", group: 'Critical dependencies' },
  { id: 'partiful-message', title: 'Guests have one clear Partiful message with accurate arrival information', group: 'Guest readiness' },
  { id: 'capacity', title: 'Guest list is within capacity', group: 'Guest readiness' },
  { id: 'food', title: 'Food is covered', group: 'Party essentials' },
  { id: 'drinks', title: 'Drinks are covered', group: 'Party essentials' },
  { id: 'cake', title: 'Cake and birthday supplies are covered', group: 'Party essentials' },
  { id: 'music', title: 'Music and speaker plan are covered', group: 'Party essentials' },
  { id: 'decor', title: 'Boat-safe decor is covered', group: 'Party essentials' },
  { id: 'item-owners', title: 'Every physical item has an owner', group: 'Ownership & transport' },
  { id: 'item-transport', title: 'Every physical item has a transportation plan', group: 'Ownership & transport' },
  { id: 'helper-roles', title: 'Sam, Kira, and Lynn know their lightweight roles', group: 'People' },
  { id: 'arrival-known', title: 'Guests know exactly where and when to arrive', group: 'Guest readiness' },
  { id: 'weather', title: 'Weather has been checked close to the event', group: 'Final safeguards' },
  { id: 'cleanup', title: 'Cleanup plan is ready', group: 'Final safeguards' },
  { id: 'late-arrival', title: 'Late-arrival plan is ready', group: 'Final safeguards' },
  { id: 'hosts-free', title: 'Gio and CayCay can board without actively managing logistics', group: 'People' },
]
