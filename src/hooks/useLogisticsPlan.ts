import { useState } from 'react'
import { loadLocal, saveLocal } from '../utils/storage'

interface LogisticsPlan {
  values: Record<string, string>
  confirmedBoarding: boolean
  transportReady: Record<string, boolean>
  dayOfGuestContact: string
  afterPartyLocation: string
}

const storageKey = 'caycay-party-logistics'
const emptyPlan: LogisticsPlan = { values: {}, confirmedBoarding: false, transportReady: {}, dayOfGuestContact: '', afterPartyLocation: '' }

function loadPlan(): LogisticsPlan {
  return { ...emptyPlan, ...loadLocal<LogisticsPlan>(storageKey, emptyPlan) }
}

export function useLogisticsPlan() {
  const [plan, setPlan] = useState<LogisticsPlan>(loadPlan)
  const update = (next: LogisticsPlan) => { setPlan(next); saveLocal(storageKey, next) }
  const setValue = (id: string, value: string) => update({ ...plan, values: { ...plan.values, [id]: value } })
  const setTransportReady = (id: string, ready: boolean) => update({ ...plan, transportReady: { ...plan.transportReady, [id]: ready } })
  const setField = <K extends 'confirmedBoarding' | 'dayOfGuestContact' | 'afterPartyLocation'>(field: K, value: LogisticsPlan[K]) => update({ ...plan, [field]: value })
  return { plan, setValue, setTransportReady, setField }
}
