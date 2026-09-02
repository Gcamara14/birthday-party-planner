import { useState } from 'react'
import { loadLocal, saveLocal } from '../utils/storage'

interface FoodPlanState {
  values: Record<string, string>
  purchased: Record<string, boolean>
}

const storageKey = 'caycay-party-food-plan'
const emptyPlan: FoodPlanState = { values: { pizzas: '4' }, purchased: {} }

function loadPlan(): FoodPlanState {
  const stored = loadLocal<FoodPlanState>(storageKey, emptyPlan)
  return { ...emptyPlan, ...stored, values: { ...emptyPlan.values, ...stored.values }, purchased: { ...emptyPlan.purchased, ...stored.purchased } }
}

export function useFoodPlan() {
  const [plan, setPlan] = useState<FoodPlanState>(loadPlan)
  const update = (next: FoodPlanState) => { setPlan(next); saveLocal(storageKey, next) }
  const setValue = (id: string, value: string) => update({ ...plan, values: { ...plan.values, [id]: value } })
  const setPurchased = (id: string, purchased: boolean) => update({ ...plan, purchased: { ...plan.purchased, [id]: purchased } })
  return { plan, setValue, setPurchased }
}
