import { useState } from 'react'
import { loadLocal, saveLocal } from '../utils/storage'

interface ReadinessPlan {
  complete: Record<string, boolean>
  weatherNotes: Record<string, string>
}

const storageKey = 'caycay-party-readiness-v2'
const emptyPlan: ReadinessPlan = { complete: { 'aaron-rules': true }, weatherNotes: {} }

function loadPlan(): ReadinessPlan {
  const stored = loadLocal<ReadinessPlan>(storageKey, emptyPlan)
  return { ...emptyPlan, ...stored, complete: { ...emptyPlan.complete, ...stored.complete }, weatherNotes: { ...emptyPlan.weatherNotes, ...stored.weatherNotes } }
}

export function useReadinessPlan() {
  const [plan, setPlan] = useState<ReadinessPlan>(loadPlan)
  const update = (next: ReadinessPlan) => { setPlan(next); saveLocal(storageKey, next) }
  const setComplete = (id: string, complete: boolean) => update({ ...plan, complete: { ...plan.complete, [id]: complete } })
  const setWeatherNote = (id: string, note: string) => update({ ...plan, weatherNotes: { ...plan.weatherNotes, [id]: note } })
  return { plan, setComplete, setWeatherNote }
}
