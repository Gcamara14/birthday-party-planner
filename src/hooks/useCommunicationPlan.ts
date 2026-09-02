import { useState } from 'react'
import { loadLocal, saveLocal } from '../utils/storage'

interface CommunicationPlan {
  details: Record<string, string>
  drafts: Record<string, string>
}

const storageKey = 'caycay-party-communications'
const emptyPlan: CommunicationPlan = { details: {}, drafts: {} }

function loadPlan(): CommunicationPlan {
  return { ...emptyPlan, ...loadLocal<CommunicationPlan>(storageKey, emptyPlan) }
}

export function useCommunicationPlan() {
  const [plan, setPlan] = useState<CommunicationPlan>(loadPlan)
  const update = (next: CommunicationPlan) => { setPlan(next); saveLocal(storageKey, next) }
  const setDetail = (id: string, value: string) => update({ ...plan, details: { ...plan.details, [id]: value } })
  const setDraft = (id: string, value: string) => update({ ...plan, drafts: { ...plan.drafts, [id]: value } })
  const refreshDraft = (id: string, generated: string) => setDraft(id, generated)
  return { plan, setDetail, setDraft, refreshDraft }
}
