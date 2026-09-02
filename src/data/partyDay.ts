import { allTasks } from './tasks'
import type { PlanningTask } from '../types/event'

interface PartyDayItemDefinition {
  id: string
  label: string
  taskPrefixes: string[]
}

export interface PartyDayItem extends PartyDayItemDefinition {
  tasks: PlanningTask[]
}

export interface PartyDayPhase {
  id: string
  title: string
  timeHint: string
  items: PartyDayItem[]
}

const phases: Array<Omit<PartyDayPhase, 'items'> & { items: PartyDayItemDefinition[] }> = [
  {
    id: 'before-leaving', title: 'Before leaving', timeHint: 'At home', items: [
      { id: 'weather', label: 'Check weather', taskPrefixes: ['Check weather.'] },
      { id: 'ice-check', label: 'Check with Aaron about ice', taskPrefixes: ['Check with Aaron about ice'] },
      { id: 'aaron-confirmation', label: 'Confirm Aaron / day-of contact', taskPrefixes: ['Confirm Aaron/day-of contact'] },
      { id: 'phones', label: 'Phones charged', taskPrefixes: ['Charge phones.'] },
      { id: 'speaker', label: 'Speaker charged', taskPrefixes: ['Charge backup speaker'] },
      { id: 'playlist', label: 'Offline playlist downloaded', taskPrefixes: ['Download playlist offline.'] },
      { id: 'cake', label: 'Cake confirmed', taskPrefixes: ['Confirm cake.'] },
      { id: 'pizza', label: 'Pizza confirmed', taskPrefixes: ['Confirm pizza.'] },
      { id: 'drinks', label: 'Drinks loaded', taskPrefixes: ['Load drinks.'] },
      { id: 'cooler', label: 'Cooler and ice loaded', taskPrefixes: ['Load cooler/ice'] },
      { id: 'decor', label: 'Decor loaded', taskPrefixes: ['Load decor.'] },
      { id: 'trash-bags', label: 'Trash bags loaded', taskPrefixes: ['Load trash bags.'] },
      { id: 'cart', label: 'Folding cart loaded', taskPrefixes: ['Load cart.'] },
      { id: 'packing', label: 'Final packing check', taskPrefixes: ['Check packing list.'] },
    ],
  },
  {
    id: 'wharf', title: "At Fisherman's Wharf", timeHint: 'Guests ready by 11:45 AM', items: [
      { id: 'crew-arrival', label: 'Helper crew arrives first', taskPrefixes: ['Host/helper crew arrives first'] },
      { id: 'contact-aaron', label: 'Contact Aaron', taskPrefixes: ['Contact Aaron.'] },
      { id: 'unload', label: 'Unload supplies', taskPrefixes: ['Unload supplies.'] },
      { id: 'setup', label: 'Set up decor, food, and drinks', taskPrefixes: ['Setup allowed decorations', 'Set up drinks/food'] },
      { id: 'helper-roles', label: 'Helpers know their roles', taskPrefixes: ['Helpers know their roles'] },
      { id: 'arrival-monitor', label: 'Guest contact monitors arrivals', taskPrefixes: ['Guest contact monitors arrivals'] },
      { id: 'meetup', label: 'Guests gathered by 11:45', taskPrefixes: ['Guests gathered and ready to board by 11:45'] },
      { id: 'boarding', label: 'Board when Aaron allows', taskPrefixes: ['Boarding begins when Aaron allows'] },
    ],
  },
  {
    id: 'on-boat', title: 'On the boat', timeHint: '12:00–2:00 PM', items: [
      { id: 'music', label: 'Music running', taskPrefixes: ['Music running.'] },
      { id: 'food-drinks', label: 'Food and drinks accessible', taskPrefixes: ['Drinks/food accessible'] },
      { id: 'photos', label: 'Photos and candids happening', taskPrefixes: ['Photos/candids happening'] },
      { id: 'birthday', label: 'Cake + Happy Birthday', taskPrefixes: ['Birthday cake + Happy Birthday'] },
      { id: 'group-photo', label: 'Full-group photo', taskPrefixes: ['Full-group photo.'] },
      { id: 'activity', label: 'Optional activity—only if desired', taskPrefixes: ['Optional activity only if the vibe calls'] },
    ],
  },
  {
    id: 'before-docking', title: 'Before docking', timeHint: 'Final sweep', items: [
      { id: 'reminder', label: 'Belongings and cleanup reminder', taskPrefixes: ['MC/helper gives belongings/cleanup reminder'] },
      { id: 'cleanup', label: 'Collect food, cake, and drink leftovers', taskPrefixes: ['Cake/food/drink leftovers collected'] },
      { id: 'trash', label: 'Trash and recycling collected', taskPrefixes: ['Trash/recycling collected'] },
      { id: 'decorations', label: 'Decorations removed', taskPrefixes: ['Decorations removed.'] },
      { id: 'sweep', label: 'Final belongings sweep', taskPrefixes: ['Final belongings sweep'] },
      { id: 'after-party', label: 'Transition guests to the after-party', taskPrefixes: ['Transition guests toward after-party'] },
    ],
  },
]

export const partyDayPhases: PartyDayPhase[] = phases.map((phase) => ({
  ...phase,
  items: phase.items.map((item) => ({
    ...item,
    tasks: allTasks.filter((task) => item.taskPrefixes.some((prefix) => task.title.startsWith(prefix)) && task.group === 'Day-of checklist'),
  })),
}))
