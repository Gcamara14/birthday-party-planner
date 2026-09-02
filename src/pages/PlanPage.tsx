const workspaces = [
  { step: '1', route: 'aaron', title: 'Resolve boat questions', when: 'Start here', description: 'Get boarding, food, alcohol, amenities, decor, and cleanup answers from Aaron. These answers unblock most of the plan.' },
  { step: '2', route: 'people', title: 'Delegate the work', when: 'This weekend', description: 'Confirm light, specific roles so Gio and CayCay are not handling every day-of question.' },
  { step: '3', route: 'logistics', title: 'Set the arrival plan', when: 'After Aaron replies', description: 'Confirm boarding, the optional early meetup, transportation, unloading, and the after-party transition.' },
  { step: '4', route: 'food', title: 'Choose quantities', when: 'After rules + RSVP clarity', description: 'Plan pizza, drinks, cake supplies, ice, cups, and cooler needs without guessing.' },
  { step: '5', route: 'experience', title: 'Prepare the key moments', when: 'After roles are assigned', description: 'Set up the cake moment, playlist, speakers, and one optional back-pocket activity.' },
  { step: '6', route: 'communications', title: 'Message the guests', when: 'After critical details are confirmed', description: 'Build the Partiful update from confirmed facts. Missing information stays visibly excluded.' },
  { step: '7', route: 'shopping', title: 'Shop and pack', when: 'After quantities are decided', description: 'Track what is needed, purchased, owned, and packed.' },
]

export function PlanPage() {
  return (
    <section className="plan-page" aria-labelledby="plan-title">
      <header className="plan-heading"><p className="eyebrow">Planning guide</p><h1 id="plan-title">Where should I work?</h1><p>Use the Task Board to track work. Open a planning workspace only when you need to make or record that kind of decision.</p></header>
      <aside className="navigation-rule"><div><strong>Need to know what to do?</strong><span>Go to Home or Tasks.</span></div><div><strong>Need to decide a detail?</strong><span>Choose a workspace below.</span></div><div><strong>Is it October 3?</strong><span>Use Party Day mode.</span></div></aside>
      <ol className="workspace-list">
        {workspaces.map((workspace) => <li key={workspace.route}><a href={`#${workspace.route}`}><span className="workspace-step">{workspace.step}</span><div><span className="workspace-when">{workspace.when}</span><h2>{workspace.title}</h2><p>{workspace.description}</p></div><span className="workspace-arrow" aria-hidden="true">→</span></a></li>)}
      </ol>
      <div className="finish-links"><a href="#timeline"><strong>Need the deadline view?</strong><span>Open Timeline →</span></a><a href="#readiness"><strong>Checking whether everything is ready?</strong><span>Open Final Readiness →</span></a></div>
    </section>
  )
}
