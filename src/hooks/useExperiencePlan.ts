import { useState } from 'react'
import { loadLocal, saveLocal } from '../utils/storage'

interface ExperiencePlan {
  ready: Record<string, boolean>
  selectedActivities: Record<string, boolean>
  cakeOwner: string
  playlistOwner: string
}

const storageKey = 'caycay-party-experience'
const emptyPlan: ExperiencePlan = { ready: {}, selectedActivities: {}, cakeOwner: '', playlistOwner: '' }

function loadPlan(): ExperiencePlan {
  return { ...emptyPlan, ...loadLocal<ExperiencePlan>(storageKey, emptyPlan) }
}

export function useExperiencePlan() {
  const [plan, setPlan] = useState<ExperiencePlan>(loadPlan)
  const update = (next: ExperiencePlan) => { setPlan(next); saveLocal(storageKey, next) }
  const setReady = (id: string, ready: boolean) => update({ ...plan, ready: { ...plan.ready, [id]: ready } })
  const setActivity = (id: string, selected: boolean) => update({ ...plan, selectedActivities: { ...plan.selectedActivities, [id]: selected } })
  const setOwner = (field: 'cakeOwner' | 'playlistOwner', value: string) => update({ ...plan, [field]: value })
  return { plan, setReady, setActivity, setOwner }
}
