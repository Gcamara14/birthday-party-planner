import { readFileSync } from 'node:fs'
import { strict as assert } from 'node:assert'

const masterPlan = readFileSync(new URL('../caycay_25th_boat_party_master_plan.md', import.meta.url), 'utf8')
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

const requiredFacts = [
  "CayCay's 25th birthday", 'Saturday, October 3, 2026', '12:00 PM-2:00 PM',
  '272 Jefferson Street', 'Boat capacity', '55 people', 'Partiful guest limit',
  '38 Going + 11 Maybe', '$1,376.04', '$20 suggested',
]
requiredFacts.forEach((fact) => assert(masterPlan.includes(fact), `Missing source fact: ${fact}`))

const standardTasks = masterPlan.match(/^\s*-\s+\[ \]/gm) ?? []
const inlineTasks = masterPlan.match(/\\\[ \\\]/g) ?? []
assert.equal(standardTasks.length, 210, 'The standard task inventory changed; audit task parsing and metadata.')
assert.equal(inlineTasks.length, 7, 'The inline helper task inventory changed; update inlineSourceTasks.')

const boatCategories = ['Boarding & Timing', 'Food & Drinks', 'Boat Amenities', 'Cake & Decorations', 'Trash & Cleanup', 'Day-of Logistics']
boatCategories.forEach((category) => assert(masterPlan.includes(`## ${category}`), `Missing boat-question category: ${category}`))
assert.equal(packageJson.private, true, 'Package must remain private.')

console.log('Project source validation passed: event facts, 217 checkbox tasks, and boat-question categories are present.')
