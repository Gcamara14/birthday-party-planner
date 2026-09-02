import { useState } from 'react'
import { loadLocal, saveLocal } from '../utils/storage'

interface CommunicationPlan {
  details: Record<string, string>
  drafts: Record<string, string>
}

const storageKey = 'caycay-party-communications-v3'
const emptyPlan: CommunicationPlan = {
  details: { 'food-byob': 'Outside food and BYOB are allowed. Hosts plan to provide pizza, beer, Prosecco, water, and non-alcoholic options.' },
  drafts: {},
}

function loadPlan(): CommunicationPlan {
  const stored = loadLocal<CommunicationPlan>(storageKey, emptyPlan)
  return { ...emptyPlan, ...stored, details: { ...emptyPlan.details, ...stored.details }, drafts: { ...emptyPlan.drafts, ...stored.drafts } }
}

export function useCommunicationPlan() {
  const [plan, setPlan] = useState<CommunicationPlan>(loadPlan)
  const update = (next: CommunicationPlan) => { setPlan(next); saveLocal(storageKey, next) }
  const setDetail = (id: string, value: string) => update({ ...plan, details: { ...plan.details, [id]: value } })
  const setDraft = (id: string, value: string) => update({ ...plan, drafts: { ...plan.drafts, [id]: value } })
  const refreshDraft = (id: string, generated: string) => setDraft(id, generated)
  return { plan, setDetail, setDraft, refreshDraft }
}
