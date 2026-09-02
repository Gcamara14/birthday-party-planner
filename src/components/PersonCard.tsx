import type { Person } from '../types/event'
import { RoleBadge } from './RoleBadge'

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="person-card">
      <div className="person-avatar" aria-hidden="true">{person.name.slice(0, 1)}</div>
      <div className="person-copy">
        <h3>{person.name}</h3>
        <p className="person-relationship">{person.relationship}</p>
        <p className="person-summary">{person.summary}</p>
        <ul className="person-responsibilities" aria-label={`${person.name}'s responsibilities`}>
          {person.responsibilities.map((role) => <li key={role.label}><span>{role.label}</span><RoleBadge state={role.state} /></li>)}
        </ul>
      </div>
    </article>
  )
}
