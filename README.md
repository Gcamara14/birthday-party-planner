# Birthday Party Master Plan

A lightweight planning hub for CayCay's 25th birthday boat party in San Francisco. The project turns the master plan into a clear, shareable source of truth for the hosts and trusted helpers—so logistics are handled before departure and the party itself can be all good music, friends, Bay views, and vibes.

## Event at a glance

| | |
|---|---|
| **Occasion** | CayCay's 25th birthday |
| **Date** | Saturday, October 3, 2026 |
| **Cruise** | 12:00–2:00 PM |
| **Guest meetup** | 11:30 AM |
| **Departure** | 272 Jefferson Street, Fisherman's Wharf, San Francisco |
| **Capacity** | 55 aboard; 50-person guest-list limit |
| **Guest contribution** | $20 suggested |
| **Guest communication** | Partiful |

Boarding time and boat policies are still pending confirmation from the captain. The master plan is the authoritative source for confirmed details and open questions.

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

- Confirm boarding, food and drink, amenities, decoration, and cleanup rules with the captain.
- Review the master plan with CayCay.
- Choose the early meetup and after-party locations.
- Assign lightweight helper roles for guest coordination, the birthday moment, photos, setup, and cleanup.
- Send one clear Partiful update once the critical details are confirmed.

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

This repository currently contains the planning PRD. The dashboard described in the PRD is a future phase.

