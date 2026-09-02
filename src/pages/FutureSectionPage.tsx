import { navigationItems } from '../data/navigation'

export function FutureSectionPage({ sectionId }: { sectionId: string }) {
  const section = navigationItems.find((item) => item.id === sectionId) ?? navigationItems[0]

  return (
    <section className="future-page" aria-labelledby="future-title">
      <p className="eyebrow">Foundation ready</p>
      <h1 id="future-title">{section.label}</h1>
      <p>{section.description}</p>
      <div className="future-card">
        <span aria-hidden="true">✦</span>
        <div>
          <h2>Reserved for a later phase</h2>
          <p>The navigation and page boundary are ready. Features and controls will be added only when their phase begins.</p>
        </div>
      </div>
      <a className="text-link" href="#overview">Return to overview <span aria-hidden="true">→</span></a>
    </section>
  )
}
