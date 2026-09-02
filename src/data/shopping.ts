export type ShoppingCategory = 'Food' | 'Drinks' | 'Birthday / cake' | 'Decorations' | 'Logistics' | 'Technology / music' | 'Cleanup'
export type ShoppingBlocker = 'food' | 'alcohol' | 'cooler' | 'cake' | 'candles' | 'decor' | 'speaker'

export interface ShoppingItem {
  id: string
  title: string
  category: ShoppingCategory
  defaultNeeded: boolean
  blocker?: ShoppingBlocker
  foodPlanId?: string
  note?: string
}

export const shoppingCategories: ShoppingCategory[] = ['Food', 'Drinks', 'Birthday / cake', 'Decorations', 'Logistics', 'Technology / music', 'Cleanup']

export const shoppingItems: ShoppingItem[] = [
  { id: 'pizzas', title: 'Costco pizzas', category: 'Food', defaultNeeded: true, blocker: 'food', foodPlanId: 'pizzas' },
  { id: 'cake', title: 'Birthday cake', category: 'Birthday / cake', defaultNeeded: true, blocker: 'cake' },
  { id: 'cake-plates', title: 'Cake plates', category: 'Birthday / cake', defaultNeeded: true },
  { id: 'forks', title: 'Forks', category: 'Birthday / cake', defaultNeeded: true },
  { id: 'napkins', title: 'Napkins', category: 'Birthday / cake', defaultNeeded: true, foodPlanId: 'napkins' },
  { id: 'cake-server', title: 'Cake knife / server', category: 'Birthday / cake', defaultNeeded: true },
  { id: 'candles', title: 'Candles or flameless candles', category: 'Birthday / cake', defaultNeeded: false, blocker: 'candles' },
  { id: 'lighter', title: 'Lighter', category: 'Birthday / cake', defaultNeeded: false, blocker: 'candles', note: 'Only if permitted.' },
  { id: 'beer', title: 'Beer', category: 'Drinks', defaultNeeded: true, blocker: 'alcohol', foodPlanId: 'beer' },
  { id: 'prosecco', title: 'Prosecco', category: 'Drinks', defaultNeeded: true, blocker: 'alcohol', foodPlanId: 'prosecco' },
  { id: 'tequila', title: 'Tequila / liquor', category: 'Drinks', defaultNeeded: false, blocker: 'alcohol', foodPlanId: 'tequila', note: 'Only if allowed.' },
  { id: 'water', title: 'Water', category: 'Drinks', defaultNeeded: true, foodPlanId: 'water' },
  { id: 'non-alcoholic', title: 'Non-alcoholic drinks', category: 'Drinks', defaultNeeded: true, foodPlanId: 'non-alcoholic' },
  { id: 'ice', title: 'Ice', category: 'Drinks', defaultNeeded: true, foodPlanId: 'ice' },
  { id: 'cups', title: 'Cups', category: 'Drinks', defaultNeeded: true, foodPlanId: 'cups' },
  { id: 'opener', title: 'Bottle opener / corkscrew', category: 'Drinks', defaultNeeded: false, blocker: 'alcohol' },
  { id: 'decorations', title: 'Approved decorations', category: 'Decorations', defaultNeeded: false, blocker: 'decor' },
  { id: 'banner', title: 'Birthday banner', category: 'Decorations', defaultNeeded: false, blocker: 'decor' },
  { id: 'fasteners', title: 'Approved tape / fasteners', category: 'Decorations', defaultNeeded: false, blocker: 'decor' },
  { id: 'cooler', title: 'Cooler', category: 'Logistics', defaultNeeded: false, blocker: 'cooler', foodPlanId: 'cooler' },
  { id: 'cart', title: "Brother's folding cart", category: 'Logistics', defaultNeeded: true },
  { id: 'backup-speaker', title: 'Backup speaker', category: 'Technology / music', defaultNeeded: false, blocker: 'speaker' },
  { id: 'power', title: 'Power bank / charging cable', category: 'Technology / music', defaultNeeded: true },
  { id: 'trash-bags', title: 'Heavy-duty trash bags', category: 'Cleanup', defaultNeeded: true },
  { id: 'recycling-bags', title: 'Recycling bags', category: 'Cleanup', defaultNeeded: false },
]
