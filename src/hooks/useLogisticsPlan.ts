import { useState } from 'react'
import { loadLocal, saveLocal } from '../utils/storage'

interface LogisticsPlan {
  values: Record<string, string>
  confirmedBoarding: boolean
  transportReady: Record<string, boolean>
  dayOfGuestContact: string
  afterPartyLocation: string
}

const storageKey = 'caycay-party-logistics-v4'
const emptyPlan: LogisticsPlan = { values: { 'boarding-time': '11:45 AM', parking: 'Pier 39 Garage is a convenient option about a 7-minute walk from the boat.', unloading: 'Cart supplies to Berth #4; exact dock access / early boarding not promised', 'supply-driver': 'Gio' }, confirmedBoarding: true, transportReady: {}, dayOfGuestContact: 'Aaron', afterPartyLocation: '' }

function loadPlan(): LogisticsPlan {
  const stored = loadLocal<LogisticsPlan>(storageKey, emptyPlan)
  return { ...emptyPlan, ...stored, values: { ...emptyPlan.values, ...stored.values } }
}

export function useLogisticsPlan() {
  const [plan, setPlan] = useState<LogisticsPlan>(loadPlan)
  const update = (next: LogisticsPlan) => { setPlan(next); saveLocal(storageKey, next) }
  const setValue = (id: string, value: string) => update({ ...plan, values: { ...plan.values, [id]: value } })
  const setTransportReady = (id: string, ready: boolean) => update({ ...plan, transportReady: { ...plan.transportReady, [id]: ready } })
  const setField = <K extends 'confirmedBoarding' | 'dayOfGuestContact' | 'afterPartyLocation'>(field: K, value: LogisticsPlan[K]) => update({ ...plan, [field]: value })
  return { plan, setValue, setTransportReady, setField }
}
