import { MessageTemplateCard } from '../components/MessageTemplateCard'
import { boatQuestions } from '../data/boatQuestions'
import { eventDetails } from '../data/event'
import { useBoatQuestionAnswers } from '../hooks/useBoatQuestionAnswers'
import { useCommunicationPlan } from '../hooks/useCommunicationPlan'
import { useLogisticsPlan } from '../hooks/useLogisticsPlan'

const detailFields = [
  { id: 'payment', label: 'Payment instructions', placeholder: 'Venmo/account and timing' },
  { id: 'food-byob', label: 'Food / BYOB wording', placeholder: 'Add only after boat rules are clear' },
  { id: 'weather', label: 'Weather guidance', placeholder: 'Add close to the event' },
]

export function CommunicationsPage() {
  const { plan: communications, setDetail, setDraft, refreshDraft } = useCommunicationPlan()
  const { plan: logistics } = useLogisticsPlan()
  const { answerFor } = useBoatQuestionAnswers()
  const detail = (id: string) => communications.details[id]?.trim() ?? ''
  const boardingQuestions = boatQuestions.filter((question) => /guests begin boarding|dock by 11:30|depart exactly|after departure/i.test(question.title))
  const boardingAnswersComplete = boardingQuestions.every((question) => answerFor(question.id).status === 'Answered')
  const foodQuestions = boatQuestions.filter((question) => /outside food|BYOB|beer allowed|Prosecco|hard liquor|glass bottles|alcohol containers/i.test(question.title))
  const foodRulesComplete = foodQuestions.every((question) => answerFor(question.id).status === 'Answered')
  const boardingTime = logistics.confirmedBoarding ? logistics.values['boarding-time']?.trim() : ''
  const earlyMeetup = logistics.values['early-meetup']?.trim() ?? ''
  const parking = logistics.values.parking?.trim() ?? ''
  const rideshare = logistics.values.rideshare?.trim() ?? ''
  const transportation = [parking, rideshare].filter(Boolean).join(' ')
  const afterParty = logistics.afterPartyLocation.trim()
  const dayOfContact = logistics.dayOfGuestContact.trim()

  const mainMissing = [
    !boardingAnswersComplete || !boardingTime ? 'Confirmed boarding information from Aaron' : '',
    !earlyMeetup ? 'Optional 11:00 AM early-meetup location' : '',
    !detail('payment') ? 'Payment instructions' : '',
    !foodRulesComplete || !detail('food-byob') ? 'Confirmed food / BYOB wording' : '',
    !transportation ? 'Parking or rideshare recommendation' : '',
    !afterParty ? 'After-party location' : '',
  ].filter(Boolean)

  const mainGenerated = [
    "🎉 CayCay’s 25th birthday boat party is officially booked!",
    '',
    `Saturday, October 3, 2026`,
    `Cruise: ${eventDetails.cruiseTime}`,
    `Location: 272 Jefferson Street, Fisherman’s Wharf`,
    boardingAnswersComplete ? `Official meetup: ${eventDetails.meetupTime}` : '',
    boardingTime ? `Boarding: ${boardingTime}` : '',
    boardingAnswersComplete ? 'Please arrive with plenty of buffer—the boat leaves on time, and late arrival risks missing it.' : '',
    earlyMeetup ? `Optional early-bird meetup at 11:00 AM: ${earlyMeetup}` : '',
    '',
    `$${eventDetails.cost.suggestedContribution} suggested contribution. ${detail('payment')}`.trim(),
    foodRulesComplete ? detail('food-byob') : '',
    '',
    'What to wear: Dress in layers, wear comfortable boat-friendly shoes, and bring sunglasses.',
    transportation ? `Transportation: ${transportation}` : '',
    afterParty ? `After-party: ${afterParty}` : '',
    '',
    `Space is limited to ${eventDetails.guestLimit} guests. If you can no longer attend, please update your Partiful RSVP so the spot can go to someone else.`,
  ].filter((line, index, lines) => line || (index > 0 && lines[index - 1])).join('\n').trim()

  const reminderMissing = [
    !boardingAnswersComplete ? 'Confirmed arrival and departure procedure' : '', !detail('weather') ? 'Final weather guidance' : '',
    !foodRulesComplete || !detail('food-byob') ? 'BYOB guidance, if applicable' : '', !transportation ? 'Transportation guidance' : '',
    !dayOfContact ? 'Day-of guest contact' : '', !afterParty ? 'After-party location' : '',
  ].filter(Boolean)

  const reminderGenerated = [
    '⛵ Tomorrow: CayCay’s birthday boat party!', '',
    boardingAnswersComplete ? `Arrive: ${eventDetails.meetupTime}` : '',
    `Meet: 272 Jefferson Street, Fisherman’s Wharf`,
    boardingTime ? `Boarding: ${boardingTime}` : '',
    boardingAnswersComplete ? 'The cruise begins at 12:00 PM—please leave extra time so you do not miss the boat.' : '',
    detail('weather') ? `Weather: ${detail('weather')}` : '',
    'Bring: Layers, comfortable boat-friendly shoes, and sunglasses.',
    foodRulesComplete ? detail('food-byob') : '', transportation ? `Transportation: ${transportation}` : '',
    dayOfContact ? `Day-of contact: ${dayOfContact}` : '', afterParty ? `After-party: ${afterParty}` : '',
  ].filter(Boolean).join('\n').trim()

  const mainMessage = communications.drafts.main ?? mainGenerated
  const reminderMessage = communications.drafts.reminder ?? reminderGenerated

  return (
    <section className="communications-page" aria-labelledby="communications-title">
      <header className="communications-heading"><p className="eyebrow">Guest communications</p><h1 id="communications-title">One channel. Clear details.</h1><p>Partiful is the single guest communication channel. Draft from confirmed information and surface everything still missing.</p></header>
      <aside className="partiful-principle"><span aria-hidden="true">P</span><div><strong>Partiful only</strong><p>Avoid splitting essential logistics across separate message threads.</p></div></aside>

      <section className="message-details" aria-labelledby="message-details-title">
        <div className="communications-section-heading"><div><p className="eyebrow">Shared details</p><h2 id="message-details-title">Fill gaps once confirmed</h2></div></div>
        <div>{detailFields.map((field) => <label className={field.id === 'food-byob' && !foodRulesComplete ? 'communication-field-blocked' : ''} key={field.id}><span>{field.label}{field.id === 'food-byob' && !foodRulesComplete && <em>Waiting on Aaron</em>}</span><input value={communications.details[field.id] ?? ''} placeholder={field.placeholder} onChange={(event) => setDetail(field.id, event.target.value)} /></label>)}</div>
      </section>

      <div className="templates-list">
        <MessageTemplateCard id="main-update" eyebrow="Main event update" title="Main Event Update" target="Target: after critical Aaron dependencies are answered." message={mainMessage} missing={mainMissing} onChange={(value) => setDraft('main', value)} onRefresh={() => refreshDraft('main', mainGenerated)} />
        <MessageTemplateCard id="day-before" eyebrow="Final reminder" title="Day-before Reminder" target="Target: the day before the cruise. Keep it short and scannable." message={reminderMessage} missing={reminderMissing} onChange={(value) => setDraft('reminder', value)} onRefresh={() => refreshDraft('reminder', reminderGenerated)} />
      </div>
    </section>
  )
}
