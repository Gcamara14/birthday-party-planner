import { eventDetails } from '../data/event'

const snapshotItems = [
  { label: 'Date', value: eventDetails.date, detail: 'Birthday boat party', badge: 'Confirmed' },
  { label: 'Cruise', value: eventDetails.cruiseTime, detail: eventDetails.boat, badge: 'Confirmed' },
  { label: 'Departure', value: '276 Jefferson Street', detail: "Berth #4 · Fisherman's Wharf", badge: 'Confirmed' },
  { label: 'Current RSVPs', value: `${eventDetails.rsvps.going} Going + ${eventDetails.rsvps.maybe} Maybe`, detail: 'Latest known Partiful count', badge: 'Snapshot' },
]

export function EventSnapshot() {
  return (
    <section aria-labelledby="snapshot-title">
      <SectionTitle />
      <dl className="snapshot-grid">
        {snapshotItems.map((item) => (
          <div className="snapshot-card" key={item.label}>
            <dt><span>{item.label}</span><span className="confirmed-label">{item.badge}</span></dt>
            <dd>{item.value}</dd>
            <dd className="snapshot-detail">{item.detail}</dd>
          </div>
        ))}
      </dl>
      <dl className="detail-strip" aria-label="Capacity and payment details">
        <div>
          <dt>Boat capacity</dt>
          <dd>{eventDetails.boatCapacity} people</dd>
        </div>
        <div>
          <dt>Partiful limit</dt>
          <dd>{eventDetails.guestLimit} people</dd>
        </div>
        <div>
          <dt>Total paid</dt>
          <dd>${eventDetails.cost.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}</dd>
        </div>
        <div>
          <dt>Suggested contribution</dt>
          <dd>${eventDetails.cost.suggestedContribution} per guest</dd>
        </div>
      </dl>
      <aside className="notice" aria-label="Important planning note">
        <span className="notice-icon" aria-hidden="true">!</span>
        <div>
          <span className="confirmed-label">Resolved</span>
          <strong>Guests should arrive ready to board at 11:45 AM</strong>
          <p>Aaron logistics no longer block planning. Ice, unloading, and candle use remain day-of checks.</p>
        </div>
      </aside>
    </section>
  )
}

function SectionTitle() {
  return (
    <div className="section-heading compact">
      <p className="eyebrow">The essentials</p>
      <h2 id="snapshot-title">Event snapshot</h2>
    </div>
  )
}
