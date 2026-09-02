import { ExperienceChecklist } from '../components/ExperienceChecklist'
import { birthdayMomentItems, musicItems, optionalActivities } from '../data/experience'
import { useExperiencePlan } from '../hooks/useExperiencePlan'
import { boatQuestions } from '../data/boatQuestions'
import { useBoatQuestionAnswers } from '../hooks/useBoatQuestionAnswers'

export function ExperiencePage() {
  const { plan, setReady, setActivity, setOwner } = useExperiencePlan()
  const { answerFor } = useBoatQuestionAnswers()
  const questionsAnswered = (pattern: RegExp) => {
    const matching = boatQuestions.filter((question) => pattern.test(question.title))
    return matching.length > 0 && matching.every((question) => answerFor(question.id).status === 'Answered')
  }
  const resolvedBlockers = {
    cake: questionsAnswered(/bring a birthday cake/i),
    'candle-rules': questionsAnswered(/birthday candles|flameless candles/i),
    'boat-speaker': questionsAnswered(/working Bluetooth|guests connect/i),
    'backup-speaker': questionsAnswered(/bring our own backup speaker/i),
  }
  return (
    <section className="experience-page" aria-labelledby="experience-title">
      <header className="experience-heading">
        <p className="eyebrow">Party experience</p>
        <h1 id="experience-title">Minimal structure, maximum vibes.</h1>
        <p>Prepare a few intentional ingredients, then let the two hours onboard unfold naturally.</p>
      </header>

      <aside className="no-itinerary"><span aria-hidden="true">≈</span><div><strong>This is not an itinerary</strong><p>No minute-by-minute schedule. The MC can read the room and cue the birthday moment when it feels right.</p></div></aside>

      <div className="experience-grid">
        <section className="experience-card birthday-card" aria-labelledby="birthday-moment-title">
          <div className="experience-card-heading"><span aria-hidden="true">✦</span><div><p>One intentional moment</p><h2 id="birthday-moment-title">Birthday moment</h2></div></div>
          <div className="owner-inputs">
            <label><span>Cake owner</span><input value={plan.cakeOwner} placeholder="Unassigned" onChange={(event) => setOwner('cakeOwner', event.target.value)} /></label>
          </div>
          <ExperienceChecklist items={birthdayMomentItems} checked={plan.ready} onChange={setReady} resolvedBlockers={resolvedBlockers} />
        </section>

        <section className="experience-card music-card" aria-labelledby="music-title">
          <div className="experience-card-heading"><span aria-hidden="true">♫</span><div><p>Set the atmosphere</p><h2 id="music-title">Music</h2></div></div>
          <div className="owner-inputs">
            <label><span>Playlist owner</span><input value={plan.playlistOwner} placeholder="Unassigned" onChange={(event) => setOwner('playlistOwner', event.target.value)} /></label>
          </div>
          <ExperienceChecklist items={musicItems} checked={plan.ready} onChange={setReady} resolvedBlockers={resolvedBlockers} />
        </section>

        <section className="experience-card activities-card" aria-labelledby="activities-title">
          <div className="experience-card-heading"><span aria-hidden="true">◇</span><div><p>Only if the vibe calls</p><h2 id="activities-title">Optional activities</h2></div></div>
          <p className="activities-intro">Keep at most one lightweight idea in the back pocket. Selecting an option does not schedule it.</p>
          <ul className="activity-options">
            {optionalActivities.map((activity) => (
              <li key={activity.id}>
                <label><input type="checkbox" checked={plan.selectedActivities[activity.id] ?? false} onChange={(event) => setActivity(activity.id, event.target.checked)} /><span><strong>{activity.title}</strong><small>{activity.note}</small></span></label>
                <span className="optional-chip">Optional</span>
              </li>
            ))}
          </ul>
          <p className="vibe-rule"><strong>Vibe rule:</strong> Skip every activity if people are already having a great time.</p>
        </section>
      </div>
    </section>
  )
}
