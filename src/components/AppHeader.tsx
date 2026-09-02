import { BrandMark } from './BrandMark'

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <a className="brand" href="#overview" aria-label="Birthday plan overview">
          <BrandMark />
          <span>
            <strong>CayCay's 25th</strong>
            <small>Boat party plan</small>
          </span>
        </a>
        <span className="privacy-chip">
          <span aria-hidden="true">●</span> Private plan
        </span>
      </div>
    </header>
  )
}
