import type { ExperienceItem } from '../data/experience'

interface ExperienceChecklistProps {
  items: ExperienceItem[]
  checked: Record<string, boolean>
  onChange: (id: string, checked: boolean) => void
  resolvedBlockers?: Record<string, boolean>
}

export function ExperienceChecklist({ items, checked, onChange, resolvedBlockers = {} }: ExperienceChecklistProps) {
  return (
    <ul className="experience-checklist">
      {items.map((item) => (
        <li key={item.id} className={item.blocker && !resolvedBlockers[item.id] ? 'experience-blocked' : ''}>
          <label><input type="checkbox" disabled={Boolean(item.blocker && !resolvedBlockers[item.id])} checked={checked[item.id] ?? false} onChange={(event) => onChange(item.id, event.target.checked)} /><span><strong>{item.title}</strong><small>{item.note}</small></span></label>
          {item.blocker && <span className={`experience-blocker ${resolvedBlockers[item.id] ? 'resolved' : ''}`}>{resolvedBlockers[item.id] ? 'Answer recorded' : `Waiting on ${item.blocker}`}</span>}
        </li>
      ))}
    </ul>
  )
}
