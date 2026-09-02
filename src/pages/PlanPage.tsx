const workspaces = [
  { step: '1', route: 'communications', title: 'Prepare the Partiful update', when: 'Work here now', description: 'Aaron logistics and the single 11:45 meetup are resolved. Fill the remaining payment, rideshare, and after-party gaps.' },
  { step: '2', route: 'people', title: 'Delegate the work', when: 'Next', description: 'Confirm light, specific roles so Gio and CayCay are not handling every day-of question.' },
  { step: '3', route: 'experience', title: 'Confirm cake, decor, and music', when: 'After roles', description: 'Choose the cake owner, simple decorations, playlist owner, and birthday-moment support.' },
  { step: '4', route: 'food', title: 'Choose food and drink quantities', when: 'With RSVP clarity', description: 'Boat rules are resolved. Decide pizza, drinks, ice, cups, and other quantities.' },
  { step: '5', route: 'logistics', title: 'Finish transport details', when: 'Alongside the above', description: 'The meetup and parking option are set. Finish rideshare guidance, dock access, and the after-party.' },
  { step: '6', route: 'shopping', title: 'Shop and pack', when: 'After quantities are decided', description: 'Track what is needed, purchased, owned, and packed.' },
]

export function PlanPage() {
  return (
    <section className="plan-page" aria-labelledby="plan-title">
      <header className="plan-heading"><p className="eyebrow">Planning guide</p><h1 id="plan-title">Where should I work?</h1><p>Use the Task Board to track work. Open a planning workspace only when you need to make or record that kind of decision.</p></header>
      <aside className="navigation-rule"><div><strong>Need to know what to do?</strong><span>Go to Home or Tasks.</span></div><div><strong>Need to decide a detail?</strong><span>Choose a workspace below.</span></div><div><strong>Is it October 3?</strong><span>Use Party Day mode.</span></div></aside>
      <a className="resolved-aaron-link" href="#aaron"><strong>Aaron logistics resolved ✓</strong><span>Review recorded rules and day-of caveats →</span></a>
      <ol className="workspace-list">
        {workspaces.map((workspace) => <li key={workspace.route}><a href={`#${workspace.route}`}><span className="workspace-step">{workspace.step}</span><div><span className="workspace-when">{workspace.when}</span><h2>{workspace.title}</h2><p>{workspace.description}</p></div><span className="workspace-arrow" aria-hidden="true">→</span></a></li>)}
      </ol>
      <div className="finish-links"><a href="#timeline"><strong>Need the deadline view?</strong><span>Open Timeline →</span></a><a href="#readiness"><strong>Checking whether everything is ready?</strong><span>Open Final Readiness →</span></a></div>
    </section>
  )
}
