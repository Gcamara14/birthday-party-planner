import { AaronMessage } from '../components/AaronMessage'
import { BoatQuestionCard } from '../components/BoatQuestionCard'
import { boatQuestionCategories, boatQuestions, decisionsUnlockedBy } from '../data/boatQuestions'
import { useBoatQuestionAnswers } from '../hooks/useBoatQuestionAnswers'

const answerSummary = [
  {
    title: 'Boarding & timing',
    items: [
      'Guests: Bass Tub, 276 Jefferson Street, Berth #4 by 11:45 AM.',
      'Cruise: 12:00–2:00 PM. Do not plan around late-arrival accommodations.',
      'Gio: Pier 39 Garage around 11:00 AM, then cart supplies to the dock.',
      'Early dock access is not promised; board when Aaron and the crew are ready.',
    ],
  },
  {
    title: 'Food & drinks',
    items: [
      'Outside food and BYOB are allowed.',
      'Beer, Prosecco, hard liquor, and glass bottles are allowed.',
      'A cooler is provided onboard.',
      'Ice is not guaranteed—check with Aaron morning-of and bring it if needed.',
    ],
  },
  {
    title: 'Boat & setup',
    items: [
      'Bluetooth stereo plays throughout the boat; a backup speaker is optional.',
      'Use the heated cabin for pizza, cake storage, extra supplies, and appropriate bags or jackets.',
      'Use the central outdoor area for drinks and socializing; use the outdoor perimeter for views and photos.',
      'No cannabis or other drugs are allowed onboard.',
    ],
  },
  {
    title: 'Cake, decor & cleanup',
    items: [
      'Birthday cake and simple decorations are approved.',
      'Candles were not explicitly approved—bring them, but ask before lighting.',
      'Bring trash and recycling bags and leave the boat clean.',
      'Exact unloading access and cleanup specifics were not discussed; coordinate with Aaron on arrival.',
    ],
  },
]

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
        <p className="eyebrow">Recorded boat plan</p>
        <h1 id="boat-page-title">Aaron / Boat Questions</h1>
        <p>Review the resolved rules, recorded assumptions, and small day-of caveats. Aaron logistics no longer block party planning.</p>
      </div>

      <dl className="question-summary" aria-label="Question progress">
        <div><dt>Unanswered</dt><dd>{counts.Unanswered}</dd></div>
        <div><dt>Asked / Waiting</dt><dd>{counts['Asked / Waiting']}</dd></div>
        <div><dt>Answered</dt><dd>{counts.Answered}</dd></div>
      </dl>

      {unlocked.length > 0 && <aside className="unblocked-summary"><strong>Planning now unblocked</strong><p>{unlocked.join(' · ')}</p></aside>}
      <AaronMessage questions={boatQuestions} answerFor={answerFor} />

      <section className="boat-answer-summary" aria-labelledby="boat-answer-summary-title">
        <div className="boat-answer-summary-heading">
          <div><p className="eyebrow">Quick reference</p><h2 id="boat-answer-summary-title">Boat answers at a glance</h2></div>
          <span>Planning unblocked</span>
        </div>
        <div className="boat-answer-summary-grid">
          {answerSummary.map((group) => (
            <section key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ))}
        </div>
        <p className="boat-answer-summary-note"><strong>Only practical checks remain:</strong> ice morning-of, permission before lighting candles, and dock access when Gio arrives.</p>
      </section>

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
