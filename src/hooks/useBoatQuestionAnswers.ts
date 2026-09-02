import { useState } from 'react'
import type { BoatQuestionStatus } from '../types/event'
import { loadLocal, saveLocal } from '../utils/storage'

export interface BoatQuestionAnswer {
  status: BoatQuestionStatus
  details: string
}

type AnswerMap = Record<string, BoatQuestionAnswer>
const storageKey = 'caycay-party-boat-answers'

function loadAnswers(): AnswerMap {
  return loadLocal<AnswerMap>(storageKey, {})
}

export function useBoatQuestionAnswers() {
  const [answers, setAnswers] = useState<AnswerMap>(loadAnswers)
  const answerFor = (questionId: string): BoatQuestionAnswer => answers[questionId] ?? { status: 'Unanswered', details: '' }
  const updateAnswer = (questionId: string, update: Partial<BoatQuestionAnswer>) => {
    setAnswers((current) => {
      const existing = current[questionId]
      const nextAnswer: BoatQuestionAnswer = {
        status: update.status ?? existing?.status ?? 'Unanswered',
        details: update.details ?? existing?.details ?? '',
      }
      const next = { ...current, [questionId]: nextAnswer }
      saveLocal(storageKey, next)
      return next
    })
  }
  return { answers, answerFor, updateAnswer }
}
