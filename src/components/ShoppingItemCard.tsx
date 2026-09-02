import type { ShoppingItem } from '../data/shopping'
import type { ShoppingItemState } from '../hooks/useShoppingPlan'

interface ShoppingItemCardProps {
  item: ShoppingItem
  state: ShoppingItemState
  blocked: boolean
  purchased: boolean
  quantity: string
  onUpdate: (update: Partial<ShoppingItemState>) => void
  onPurchased: (value: boolean) => void
  onQuantity: (value: string) => void
}

export function ShoppingItemCard({ item, state, blocked, purchased, quantity, onUpdate, onPurchased, onQuantity }: ShoppingItemCardProps) {
  const needed = state.needed ?? item.defaultNeeded
  return (
    <li className={`shopping-item-card ${blocked ? 'item-blocked' : ''} ${state.packed ? 'item-packed' : ''}`}>
      <div className="shopping-item-heading"><div><h3>{item.title}</h3>{item.note && <p>{item.note}</p>}</div>{blocked && <span>Waiting on Aaron</span>}</div>
      <div className="shopping-stages" role="group" aria-label={`${item.title} progress`}>
        <label><input type="checkbox" checked={needed} onChange={(event) => onUpdate({ needed: event.target.checked })} /><span>Needed</span></label>
        <label><input type="checkbox" disabled={blocked} checked={purchased} onChange={(event) => onPurchased(event.target.checked)} /><span>Purchased</span></label>
        <label><input type="checkbox" disabled={blocked} checked={state.packed ?? false} onChange={(event) => onUpdate({ packed: event.target.checked })} /><span>Packed</span></label>
      </div>
      <details>
        <summary>Quantity, owner & notes</summary>
        <div className="shopping-item-details">
          <label><span>Quantity</span><input value={quantity} placeholder="Not decided" onChange={(event) => onQuantity(event.target.value)} /></label>
          <label><span>Owner</span><input value={state.owner ?? ''} placeholder="Unassigned" onChange={(event) => onUpdate({ owner: event.target.value })} /></label>
          <label className="shopping-notes"><span>Notes</span><textarea rows={2} value={state.notes ?? ''} placeholder="Add useful details" onChange={(event) => onUpdate({ notes: event.target.value })} /></label>
        </div>
      </details>
    </li>
  )
}
