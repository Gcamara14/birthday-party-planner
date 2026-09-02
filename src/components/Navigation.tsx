import { navigationItems } from '../data/navigation'

interface NavigationProps {
  activeId: string
  onNavigate: (id: string) => void
}

export function Navigation({ activeId, onNavigate }: NavigationProps) {
  const groups = ['Focus', 'Plan', 'Finish'] as const
  const activeItem = navigationItems.find((item) => item.id === activeId)
  return (
    <>
      <nav className="side-nav" aria-label="Planning sections">
        {groups.map((group) => <div className="nav-group" key={group}><p className="nav-heading">{group}</p><ul>
          {navigationItems.filter((item) => item.group === group).map((item) => <li key={item.id}><a href={`#${item.id}`} className={activeId === item.id ? 'active' : undefined} aria-current={activeId === item.id ? 'page' : undefined} onClick={() => onNavigate(item.id)}><span><strong>{item.label}</strong><small>{item.description}</small></span></a></li>)}
        </ul></div>)}
      </nav>

      <nav className="bottom-nav" aria-label="Planning sections">
        {navigationItems.filter((item) => item.showOnMobile).map((item) => {
          const isActive = item.id === activeId || (item.id === 'plan' && activeItem?.group === 'Plan')
          return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={isActive ? 'active' : undefined}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-dot" aria-hidden="true" />
            {item.shortLabel}
          </a>
        )})}
      </nav>
    </>
  )
}
