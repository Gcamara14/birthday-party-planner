import { useState } from 'react'
import { loadLocal, saveLocal } from '../utils/storage'

export interface ShoppingItemState {
  needed?: boolean
  purchased?: boolean
  packed?: boolean
  owner?: string
  quantity?: string
  notes?: string
}

type ShoppingPlan = Record<string, ShoppingItemState>
const storageKey = 'caycay-party-shopping-plan'

function loadPlan(): ShoppingPlan {
  return loadLocal<ShoppingPlan>(storageKey, {})
}

export function useShoppingPlan() {
  const [plan, setPlan] = useState<ShoppingPlan>(loadPlan)
  const updateItem = (id: string, update: Partial<ShoppingItemState>) => {
    setPlan((current) => {
      const next = { ...current, [id]: { ...current[id], ...update } }
      saveLocal(storageKey, next)
      return next
    })
  }
  return { plan, updateItem }
}
