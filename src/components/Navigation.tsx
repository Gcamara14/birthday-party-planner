import { navigationItems } from '../data/navigation'

interface NavigationProps {
  activeId: string
  onNavigate: (id: string) => void
}

export function Navigation({ activeId, onNavigate }: NavigationProps) {
  return (
    <>
      <nav className="side-nav" aria-label="Planning sections">
        <p className="nav-heading">Plan</p>
        <ul>
          {navigationItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? 'active' : undefined}
                aria-current={activeId === item.id ? 'page' : undefined}
                onClick={() => onNavigate(item.id)}
              >
                <span>{item.label}</span>
                {item.phase === 'future' && <span className="soon">Soon</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="bottom-nav" aria-label="Planning sections">
        {navigationItems.filter((item) => item.showOnMobile !== false).map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeId === item.id ? 'active' : undefined}
            aria-current={activeId === item.id ? 'page' : undefined}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-dot" aria-hidden="true" />
            {item.shortLabel}
          </a>
        ))}
      </nav>
    </>
  )
}
