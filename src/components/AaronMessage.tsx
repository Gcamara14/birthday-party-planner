import { useState } from 'react'
import { boatQuestionCategories, boatQuestions } from '../data/boatQuestions'
import type { BoatQuestionAnswer } from '../hooks/useBoatQuestionAnswers'
import { copyText } from '../utils/clipboard'

type BoatQuestion = (typeof boatQuestions)[number]

interface AaronMessageProps {
  questions: BoatQuestion[]
  answerFor: (questionId: string) => BoatQuestionAnswer
}

export function AaronMessage({ questions, answerFor }: AaronMessageProps) {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const unanswered = questions.filter((question) => question.important && answerFor(question.id).status === 'Unanswered')
  const grouped = boatQuestionCategories.map((category) => ({ category, questions: unanswered.filter((question) => question.subgroup === category) })).filter((group) => group.questions.length)
  const message = [
    'Hi Aaron! We’re getting the final details together for CayCay’s birthday boat party and had a few questions:',
    '',
    ...grouped.flatMap(({ category, questions: categoryQuestions }) => [category, ...categoryQuestions.map((question) => `• ${question.title}`), '']),
    'Thanks so much for your help!',
  ].join('\n').trim()

  const copyMessage = async () => {
    const success = await copyText(message)
    setCopied(success)
    setCopyFailed(!success)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="message-card" aria-labelledby="aaron-message-title">
      <div className="message-card-heading">
        <div><p className="eyebrow">Copy & send</p><h2 id="aaron-message-title">Message for Aaron</h2></div>
        <button type="button" onClick={copyMessage} disabled={unanswered.length === 0}>{copied ? 'Copied!' : 'Copy message'}</button>
      </div>
      {unanswered.length > 0 ? <textarea aria-label="Message for Aaron" value={message} readOnly rows={12} /> : <div className="all-answered"><span aria-hidden="true">✓</span><p>All important questions have an answer or are already waiting on Aaron.</p></div>}
      <p className="copy-status" aria-live="polite">{copied ? 'Message copied to clipboard.' : copyFailed ? 'Copy failed. Select the message text and copy it manually.' : `${unanswered.length} important unanswered questions included.`}</p>
    </section>
  )
}
