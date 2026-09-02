export interface FoodPlanField {
  id: string
  label: string
  type: 'number' | 'text'
  placeholder: string
  unit?: string
  note?: string
  blocker?: 'alcohol' | 'byob' | 'cooler'
  shoppingItem?: string
}

export const foodPlanFields: FoodPlanField[] = [
  { id: 'expected-guests', label: 'Expected guest count', type: 'number', placeholder: 'Enter count', note: 'Current snapshot: 38 Going + 11 Maybe' },
  { id: 'pizzas', label: 'Costco pizzas', type: 'number', placeholder: 'Enter quantity', unit: 'pizzas', note: 'Calculate after attendance is clearer', shoppingItem: 'Costco pizzas' },
  { id: 'beer', label: 'Beer', type: 'text', placeholder: 'Enter quantity / format', blocker: 'alcohol', shoppingItem: 'Beer' },
  { id: 'prosecco', label: 'Prosecco', type: 'text', placeholder: 'Enter quantity / format', blocker: 'alcohol', shoppingItem: 'Prosecco' },
  { id: 'water', label: 'Water', type: 'text', placeholder: 'Enter quantity / format', shoppingItem: 'Water' },
  { id: 'non-alcoholic', label: 'Non-alcoholic drinks', type: 'text', placeholder: 'Options and quantity', shoppingItem: 'Non-alcoholic drinks' },
  { id: 'tequila', label: 'Potential tequila', type: 'text', placeholder: 'Only if allowed', blocker: 'alcohol', note: 'Do not purchase until liquor and container rules are confirmed', shoppingItem: 'Tequila / liquor, only if allowed' },
  { id: 'ice', label: 'Ice', type: 'text', placeholder: 'Enter quantity', shoppingItem: 'Ice' },
  { id: 'cups', label: 'Cups', type: 'text', placeholder: 'Enter quantity / type', shoppingItem: 'Cups' },
  { id: 'napkins', label: 'Napkins', type: 'text', placeholder: 'Enter quantity', shoppingItem: 'Napkins' },
  { id: 'cake-supplies', label: 'Cake supplies', type: 'text', placeholder: 'Plates, forks, server, candles…', note: 'Candles and lighter only if permitted', shoppingItem: 'Cake and serving supplies' },
  { id: 'cooler', label: 'Cooler requirements', type: 'text', placeholder: 'Capacity, ice, or backup plan', blocker: 'cooler', note: "Gio's cooler is available as a backup", shoppingItem: 'Cooler, if needed' },
]

export const knownFoodDirection = [
  'Costco pizza', 'Birthday cake', 'Beer', 'Prosecco', 'Water', 'Non-alcoholic options',
]
