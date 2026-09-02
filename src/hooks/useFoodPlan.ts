import { useState } from 'react'
import { loadLocal, saveLocal } from '../utils/storage'

interface FoodPlanState {
  values: Record<string, string>
  purchased: Record<string, boolean>
}

const storageKey = 'caycay-party-food-plan'
const emptyPlan: FoodPlanState = { values: {}, purchased: {} }

function loadPlan(): FoodPlanState {
  return { ...emptyPlan, ...loadLocal<FoodPlanState>(storageKey, emptyPlan) }
}

export function useFoodPlan() {
  const [plan, setPlan] = useState<FoodPlanState>(loadPlan)
  const update = (next: FoodPlanState) => { setPlan(next); saveLocal(storageKey, next) }
  const setValue = (id: string, value: string) => update({ ...plan, values: { ...plan.values, [id]: value } })
  const setPurchased = (id: string, purchased: boolean) => update({ ...plan, purchased: { ...plan.purchased, [id]: purchased } })
  return { plan, setValue, setPurchased }
}
