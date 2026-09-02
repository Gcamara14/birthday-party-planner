import { arrivalFlow, logisticsFields, transportItems } from '../data/logistics'
import { useLogisticsPlan } from '../hooks/useLogisticsPlan'

export function LogisticsPage() {
  const { plan, setValue, setTransportReady, setField } = useLogisticsPlan()
  const boardingTime = plan.values['boarding-time'] ?? ''

  return (
    <section className="logistics-page" aria-labelledby="logistics-title">
      <header className="logistics-heading">
        <p className="eyebrow">Logistics & transportation</p>
        <h1 id="logistics-title">Get everyone—and everything—to the boat.</h1>
        <p>A clear arrival anchor, a practical supply plan, and no host troubleshooting at departure time.</p>
      </header>

      <section className="arrival-section" aria-labelledby="arrival-title">
        <div className="logistics-section-heading"><div><p className="eyebrow">Proposed flow</p><h2 id="arrival-title">Guest arrival</h2></div><span>Not an itinerary</span></div>
        <ol className="arrival-flow">
          {arrivalFlow.map((step) => (
            <li key={step.time} className={`arrival-${step.state.toLowerCase().replace(/\W+/g, '-')}`}>
              <time>{step.time}</time><div><span className="arrival-state">{step.state}</span><h3>{step.title}</h3><p>{step.description}</p></div>
            </li>
          ))}
        </ol>
        <aside className="boarding-warning"><strong>11:45 AM is not confirmed</strong><p>It remains a working assumption until Aaron provides the actual boarding time.</p></aside>
      </section>

      <section className="logistics-plan-section" aria-labelledby="transport-plan-title">
        <div className="logistics-section-heading"><div><p className="eyebrow">Editable details</p><h2 id="transport-plan-title">Transportation plan</h2></div></div>
        <div className="logistics-fields">
          {logisticsFields.map((field) => (
            <label key={field.id} className={field.id === 'boarding-time' && !plan.confirmedBoarding ? 'field-pending' : ''}>
              <span><strong>{field.label}</strong>{field.id === 'boarding-time' && <em>{plan.confirmedBoarding && boardingTime ? 'Confirmed with Aaron' : 'TBD'}</em>}</span>
              <input value={plan.values[field.id] ?? ''} placeholder={field.placeholder} onChange={(event) => setValue(field.id, event.target.value)} />
              {'note' in field && field.note && <small>{field.note}</small>}
            </label>
          ))}
        </div>
        <label className="confirmation-check"><input type="checkbox" disabled={!boardingTime.trim()} checked={plan.confirmedBoarding && Boolean(boardingTime.trim())} onChange={(event) => setField('confirmedBoarding', event.target.checked)} /><span><strong>Aaron confirmed the boarding time above</strong><small>Enter a time before confirming it. This does not change the separate 11:45 working assumption shown in the source.</small></span></label>
      </section>

      <section className="supply-section" aria-labelledby="supply-title">
        <div className="logistics-section-heading"><div><p className="eyebrow">Physical plan</p><h2 id="supply-title">Supply transport</h2></div><span>{transportItems.filter((item) => plan.transportReady[item.id]).length} / {transportItems.length} ready</span></div>
        <ul className="transport-list">
          {transportItems.map((item) => <li key={item.id}><label><input type="checkbox" checked={plan.transportReady[item.id] ?? false} onChange={(event) => setTransportReady(item.id, event.target.checked)} /><span><strong>{item.title}</strong><small>{item.note}</small></span></label></li>)}
        </ul>
      </section>

      <section className="late-plan" aria-labelledby="late-title">
        <div className="logistics-section-heading"><div><p className="eyebrow">Protect the hosts</p><h2 id="late-title">Late guests & after-party</h2></div></div>
        <div className="late-principles"><p><strong>Do not delay the boat.</strong> Hosts should not spend the birthday troubleshooting late arrivals.</p><p>If someone misses departure, direct them to the after-party.</p></div>
        <div className="late-fields">
          <label><span>Day-of guest contact</span><input value={plan.dayOfGuestContact} placeholder="Unassigned" onChange={(event) => setField('dayOfGuestContact', event.target.value)} /></label>
          <label><span>After-party location</span><input value={plan.afterPartyLocation} placeholder="TBD" onChange={(event) => setField('afterPartyLocation', event.target.value)} /></label>
        </div>
        <p className="transition-note">At the end of the cruise, transition guests toward the confirmed after-party location. Late-guest wording should be finalized after Aaron confirms departure procedures.</p>
      </section>
    </section>
  )
}
