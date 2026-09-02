import { AaronMessage } from '../components/AaronMessage'
import { BoatQuestionCard } from '../components/BoatQuestionCard'
import { boatQuestionCategories, boatQuestions, decisionsUnlockedBy } from '../data/boatQuestions'
import { useBoatQuestionAnswers } from '../hooks/useBoatQuestionAnswers'

export function BoatQuestionsPage() {
  const { answers, answerFor, updateAnswer } = useBoatQuestionAnswers()
  const counts = boatQuestions.reduce((result, question) => {
    result[answerFor(question.id).status] += 1
    return result
  }, { Unanswered: 0, 'Asked / Waiting': 0, Answered: 0 })
  const unlocked = Array.from(new Set(boatQuestions.filter((question) => answerFor(question.id).status === 'Answered').flatMap(decisionsUnlockedBy)))

  return (
    <section className="boat-page" aria-labelledby="boat-page-title">
      <div className="boat-page-heading">
        <p className="eyebrow">Highest-priority dependency</p>
        <h1 id="boat-page-title">Aaron / Boat Questions</h1>
        <p>Track exactly what we still need to ask, what is waiting on Aaron, and what his answers unlock.</p>
      </div>

      <dl className="question-summary" aria-label="Question progress">
        <div><dt>Unanswered</dt><dd>{counts.Unanswered}</dd></div>
        <div><dt>Asked / Waiting</dt><dd>{counts['Asked / Waiting']}</dd></div>
        <div><dt>Answered</dt><dd>{counts.Answered}</dd></div>
      </dl>

      {unlocked.length > 0 && <aside className="unblocked-summary"><strong>Planning now unblocked</strong><p>{unlocked.join(' · ')}</p></aside>}
      <AaronMessage questions={boatQuestions} answerFor={answerFor} />

      <div className="question-groups">
        {boatQuestionCategories.map((category) => {
          const questions = boatQuestions.filter((question) => question.subgroup === category)
          const unanswered = questions.filter((question) => answerFor(question.id).status === 'Unanswered').length
          const categoryId = `boat-${category.replace(/\W+/g, '-').toLowerCase()}`
          return (
            <section className="question-group" key={category} aria-labelledby={categoryId}>
              <div className="question-group-heading"><div><h2 id={categoryId}>{category}</h2><p>{unanswered} unanswered · {questions.length} total</p></div></div>
              <div className="question-list">
                {questions.map((question) => <BoatQuestionCard key={question.id} question={question} answer={answers[question.id] ?? answerFor(question.id)} onChange={(update) => updateAnswer(question.id, update)} />)}
              </div>
            </section>
          )
        })}
      </div>
    </section>
  )
}
