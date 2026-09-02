import type { RoleState } from '../types/event'

export function RoleBadge({ state }: { state: RoleState }) {
  return <span className={`role-badge role-${state.toLowerCase()}`}>{state}</span>
}
