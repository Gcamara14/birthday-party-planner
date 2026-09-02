# Birthday Party Master Plan

A lightweight planning hub for CayCay's 25th birthday boat party in San Francisco. The project turns the master plan into a clear, shareable source of truth for the hosts and trusted helpers—so logistics are handled before departure and the party itself can be all good music, friends, Bay views, and vibes.

## Event at a glance

| | |
|---|---|
| **Occasion** | CayCay's 25th birthday |
| **Date** | Saturday, October 3, 2026 |
| **Cruise** | 12:00–2:00 PM |
| **Guest arrival / ready to board** | 11:45 AM |
| **Departure** | Bass Tub, 276 Jefferson Street, Berth #4, Fisherman's Wharf, San Francisco |
| **Capacity** | 55 aboard; 50-person guest-list limit |
| **Guest contribution** | $20 suggested |
| **Guest communication** | Partiful |

Aaron's core logistics are resolved. Guests should arrive ready to board at 11:45 AM; ice, unloading details, and candle use remain practical day-of checks. The master plan is the authoritative source for confirmed details and remaining decisions.

## Product vision

This repository is intended to become a simple planning dashboard for Gio, CayCay, and their helper crew. It is not a public invitation or guest-facing event website.

The dashboard's first screen should answer three questions:

1. What needs to happen next?
2. Who owns it?
3. What is blocking it?

Planned dashboard areas include next actions, a countdown, event details, a task board, the planning timeline, captain dependencies, roles, guest communications, food and drinks, packing, the day-of plan, and open decisions.

## Source of truth

The complete product requirements and operational plan live in [`caycay_25th_boat_party_master_plan.md`](./caycay_25th_boat_party_master_plan.md). It covers:

- Arrival, boarding, late-guest, and day-of logistics
- Questions and dependencies awaiting the captain
- Host and helper responsibilities
- Food, drinks, cake, music, decorations, and activities
- Transportation, payments, weather, cleanup, and the after-party
- Partiful communication templates and timing
- Shopping, packing, and day-of checklists
- The proposed dashboard data model and definition of done

When a dashboard is implemented, this document should remain the canonical planning record.

## Current priorities

- Prepare the Partiful update using the resolved 11:45 arrival and boat rules.
- Assign lightweight helper roles for guest coordination, the birthday moment, photos, setup, and cleanup.
- Finalize the cake, food and drink quantities, simple decor, and playlist.
- Choose the early meetup and after-party locations.
- Confirm payment, guest parking/rideshare guidance, exact dock access, and unloading details. Gio's supply-car plan is Pier 39 Garage plus the folding cart.

## Task model

Dashboard tasks should support these fields:

| Field | Values / purpose |
|---|---|
| **Status** | Not Started, Waiting, In Progress, Done |
| **Owner** | Gio, CayCay, Sam, Kira, Lynn, or Other |
| **Due date** | When the task should be completed |
| **Priority** | Critical, High, Normal, or Nice-to-have |
| **Dependency** | What must happen first |
| **Notes** | Supporting context and decisions |

## Definition of done

The plan is ready when the boat rules are confirmed, guests have accurate arrival information, attendance is within capacity, every major purchase and physical item has an owner, helper roles are clear, and weather, late-arrival, transportation, and cleanup plans are settled.

> By noon on October 3, the planning should disappear: CayCay feels celebrated, Gio enjoys the party with her, and everything else runs quietly in the background.

## Repository status

The project provides a responsive application shell, structured event data, accessible navigation, dashboard overview, master task board, planning timeline, boat-question tracker, people and roles view, food and drinks planner, party-experience planner, logistics planner, Partiful message builder, shopping and packing checklist, focused Party Day mode, final-readiness tracker, and GitHub Pages deployment workflow. Later planning sections remain intentional placeholders.

## Local development

```bash
npm install
npm run dev
```

Run `npm run check` for TypeScript validation and `npm run build` for a production build.

Run the complete local verification before committing:

```bash
npm test
npm run check
npm run build
```

Planning changes are stored in browser `localStorage`. They persist across refreshes in the same browser and device, but they are not synced between phones or accounts and are not written back to the Markdown file.

## Deploying to GitHub Pages

1. Push the project to the `main` branch on GitHub.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The included `.github/workflows/deploy-pages.yml` workflow installs dependencies, builds the Vite site, and publishes `dist/`.
5. Confirm the completed deployment in the repository's **Actions** tab.

The Vite base path is configured for the `birthday-party-planner` repository. If the GitHub repository is renamed, update `base` in `vite.config.ts`. This is a client-side application with no authentication layer; verify the deployed Pages visibility before entering information you consider sensitive.

## Updating event data safely

The Markdown master plan remains the source of truth. When details change, update it first and then mirror the relevant structured values in:

- `src/data/event.ts` — event facts, schedule, location, attendance, and cost
- `src/data/tasks.ts` — parsing, grouping, and metadata rules for every actionable master-plan item; task titles are loaded directly from the Markdown source
- `src/data/navigation.ts` — available and future dashboard sections
- `src/data/people.ts` — confirmed host responsibilities, proposed helper roles, and unassigned operational roles
- `src/data/foodPlan.ts` — editable quantity fields, shopping items, and boat-rule dependencies
- `src/data/experience.ts` — birthday moment, music readiness, and optional activity ideas
- `src/data/logistics.ts` — proposed arrival flow, transportation fields, and supply transport items
- `src/data/shopping.ts` — categorized master shopping list and boat-rule dependencies
- `src/data/readiness.ts` — weather checkpoints and the 16 Definition of Done conditions

Shared TypeScript interfaces live in `src/types/event.ts`. Presentation components should consume these modules rather than embedding new event facts directly in the UI.

Task IDs are derived from section, subsection, and task title rather than Markdown line numbers. Adding surrounding prose will not invalidate saved statuses. Renaming an existing checklist item creates a new task identity, so avoid changing task wording merely for formatting.
