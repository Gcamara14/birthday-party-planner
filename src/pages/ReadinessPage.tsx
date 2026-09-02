import { readinessConditions, weatherCheckpoints } from '../data/readiness'
import { useReadinessPlan } from '../hooks/useReadinessPlan'
import { useTaskStatuses } from '../hooks/useTaskStatuses'

export function ReadinessPage() {
  const { plan, setComplete, setWeatherNote } = useReadinessPlan()
  const { statusFor, changeStatus } = useTaskStatuses()
  const completed = readinessConditions.filter((condition) => plan.complete[condition.id]).length
  const percent = Math.round((completed / readinessConditions.length) * 100)
  const groups = Array.from(new Set(readinessConditions.map((condition) => condition.group)))
  const checkpointDone = (taskIds: string[]) => taskIds.length > 0 && taskIds.every((id) => statusFor(id) === 'Done')
  const toggleCheckpoint = (taskIds: string[], done: boolean) => taskIds.forEach((id) => changeStatus(id, done ? 'Done' : 'Not Started'))

  return (
    <section className="readiness-page" aria-labelledby="readiness-title">
      <header className="readiness-heading"><p className="eyebrow">Final readiness</p><h1 id="readiness-title">Ready for the party?</h1><p>Use these final checkpoints to close gaps without overreacting to normal San Francisco weather.</p></header>

      <section className="readiness-score" aria-labelledby="score-title">
        <div><p className="eyebrow">Definition of done</p><h2 id="score-title">{completed} of {readinessConditions.length} readiness conditions complete</h2></div>
        <strong>{percent}%</strong>
        <div className="readiness-track" role="progressbar" aria-label="Overall party readiness" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><span style={{ width: `${percent}%` }} /></div>
      </section>

      <section className="weather-readiness" aria-labelledby="weather-readiness-title">
        <div className="readiness-section-heading"><div><p className="eyebrow">Weather rhythm</p><h2 id="weather-readiness-title">Check closer, not constantly</h2></div><span>No live API</span></div>
        <div className="weather-principles"><article><span aria-hidden="true">≈</span><div><strong>Normal SF cold or wind</strong><p>Manage with layers and practical guest guidance.</p></div></article><article><span aria-hidden="true">!</span><div><strong>Operator or safety concern</strong><p>Contact Aaron and follow the captain or operator's guidance.</p></div></article></div>
        <ol className="weather-checkpoints">
          {weatherCheckpoints.map((checkpoint) => {
            const taskIds = checkpoint.tasks.map((task) => task.id)
            const done = checkpointDone(taskIds)
            return <li key={checkpoint.id}><div className="weather-checkpoint-heading"><div><span>{checkpoint.timeframe}</span><h3>{checkpoint.title}</h3><p>{checkpoint.description}</p></div><label><input type="checkbox" checked={done} disabled={!taskIds.length} onChange={(event) => toggleCheckpoint(taskIds, event.target.checked)} /><span>{done ? 'Complete' : 'Mark complete'}</span></label></div><label className="weather-note"><span>Notes</span><textarea rows={2} value={plan.weatherNotes[checkpoint.id] ?? ''} placeholder="Record forecast context or a decision" onChange={(event) => setWeatherNote(checkpoint.id, event.target.value)} /></label></li>
          })}
        </ol>
      </section>

      <section className="ready-checklist" aria-labelledby="ready-checklist-title">
        <div className="readiness-section-heading"><div><p className="eyebrow">North-star checklist</p><h2 id="ready-checklist-title">Ready for Party</h2></div></div>
        <p className="ready-intro">Mark a condition complete only when it is genuinely handled. These confirmations are manual by design.</p>
        {groups.map((group) => <section className="readiness-group" key={group} aria-labelledby={`ready-${group.replace(/\W+/g, '-').toLowerCase()}`}><h3 id={`ready-${group.replace(/\W+/g, '-').toLowerCase()}`}>{group}</h3><ul>{readinessConditions.filter((condition) => condition.group === group).map((condition) => <li key={condition.id}><label><input type="checkbox" checked={plan.complete[condition.id] ?? false} onChange={(event) => setComplete(condition.id, event.target.checked)} /><span>{condition.title}</span></label></li>)}</ul></section>)}
      </section>
    </section>
  )
}
