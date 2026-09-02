import { useState } from 'react'
import { loadLocal, saveLocal } from '../utils/storage'

interface ReadinessPlan {
  complete: Record<string, boolean>
  weatherNotes: Record<string, string>
}

const storageKey = 'caycay-party-readiness'
const emptyPlan: ReadinessPlan = { complete: {}, weatherNotes: {} }

function loadPlan(): ReadinessPlan {
  return { ...emptyPlan, ...loadLocal<ReadinessPlan>(storageKey, emptyPlan) }
}

export function useReadinessPlan() {
  const [plan, setPlan] = useState<ReadinessPlan>(loadPlan)
  const update = (next: ReadinessPlan) => { setPlan(next); saveLocal(storageKey, next) }
  const setComplete = (id: string, complete: boolean) => update({ ...plan, complete: { ...plan.complete, [id]: complete } })
  const setWeatherNote = (id: string, note: string) => update({ ...plan, weatherNotes: { ...plan.weatherNotes, [id]: note } })
  return { plan, setComplete, setWeatherNote }
}
