import { PersonCard } from '../components/PersonCard'
import { RoleBadge } from '../components/RoleBadge'
import { operationalRoles, people } from '../data/people'

export function PeoplePage() {
  return (
    <section className="people-page" aria-labelledby="people-title">
      <div className="people-heading">
        <p className="eyebrow">People & responsibilities</p>
        <h1 id="people-title">A small crew, with clear roles.</h1>
        <p>Assignments stay light and specific so CayCay can celebrate and Gio can enjoy the party instead of troubleshooting it.</p>
      </div>

      <aside className="delegation-note">
        <span aria-hidden="true">✦</span>
        <div><strong>Day-of principle</strong><p>CayCay should not carry logistics. Gio should delegate guest questions, setup, documentation, and cleanup before party day.</p></div>
      </aside>

      <section aria-labelledby="crew-title">
        <div className="people-section-heading"><div><p className="eyebrow">The crew</p><h2 id="crew-title">Who is involved</h2></div><div className="role-legend" aria-label="Role status legend"><RoleBadge state="Confirmed" /><RoleBadge state="Proposed" /></div></div>
        <div className="people-grid">{people.map((person) => <PersonCard key={person.id} person={person} />)}</div>
      </section>

      <section className="assignments-section" aria-labelledby="assignments-title">
        <div className="people-section-heading"><div><p className="eyebrow">Decision view</p><h2 id="assignments-title">Operational roles</h2></div><span className="assignment-open">{operationalRoles.filter((role) => role.state !== 'Confirmed').length} to confirm</span></div>
        <div className="assignment-list">
          {operationalRoles.map((role) => (
            <article className={`assignment-row assignment-${role.state.toLowerCase()}`} key={role.id}>
              <div className="assignment-title"><h3>{role.title}</h3><RoleBadge state={role.state} /></div>
              <p>{role.purpose}</p>
              <div className="candidate-line"><strong>{role.state === 'Unassigned' ? 'Owner' : 'Suggested'}</strong><span>{role.candidates.length ? role.candidates.join(' or ') : 'Unassigned'}</span></div>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
