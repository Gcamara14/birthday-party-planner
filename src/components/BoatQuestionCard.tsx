import { boatQuestions, decisionsUnlockedBy } from '../data/boatQuestions'
import type { BoatQuestionAnswer } from '../hooks/useBoatQuestionAnswers'
import type { BoatQuestionStatus } from '../types/event'

type BoatQuestion = (typeof boatQuestions)[number]

interface BoatQuestionCardProps {
  question: BoatQuestion
  answer: BoatQuestionAnswer
  onChange: (update: Partial<BoatQuestionAnswer>) => void
}

const statuses: BoatQuestionStatus[] = ['Unanswered', 'Asked / Waiting', 'Answered']

export function BoatQuestionCard({ question, answer, onChange }: BoatQuestionCardProps) {
  const unlocks = decisionsUnlockedBy(question)
  return (
    <article className={`boat-question question-${answer.status.toLowerCase().replace(/\W+/g, '-')} ${question.important && answer.status === 'Unanswered' ? 'question-critical' : ''}`}>
      <div className="question-heading">
        <div>
          {question.important && answer.status === 'Unanswered' && <span className="needs-answer">Needs answer</span>}
          <h3>{question.title}</h3>
        </div>
        <label className="question-status">
          <span className="sr-only">Status for {question.title}</span>
          <select value={answer.status} onChange={(event) => onChange({ status: event.target.value as BoatQuestionStatus })}>
            {statuses.map((status) => <option key={status}>{status}</option>)}
          </select>
        </label>
      </div>
      <label className="answer-field">
        <span>Answer / details</span>
        <textarea value={answer.details} rows={2} placeholder="Record Aaron's answer here…" onChange={(event) => onChange({ details: event.target.value })} />
      </label>
      <div className={`unlock-note ${answer.status === 'Answered' ? 'unlocked' : ''}`}>
        <strong>{answer.status === 'Answered' ? 'Now unblocked' : 'This answer unlocks'}</strong>
        <span>{unlocks.join(' · ')}</span>
      </div>
    </article>
  )
}
