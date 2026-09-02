import masterPlan from '../../caycay_25th_boat_party_master_plan.md?raw'
import type { PlanningTask, TaskOwner, TaskPriority, TaskStatus } from '../types/event'

interface SourceTask {
  title: string
  details: string[]
  section: string
  subsection: string
  sourceLine: number
  checked: boolean
}

const GROUP_NAMES: Record<string, string> = {
  '3': 'Immediate priorities', '4': 'Aaron & boat rules', '5': 'People & responsibilities',
  '6': 'Food & drinks', '7': 'Cake & birthday moment', '8': 'Music', '9': 'Decorations',
  '10': 'Photos & video', '11': 'Activities & games', '13': 'Transportation & supplies',
  '14': 'After-party', '15': 'Payments', '16': 'Cleanup', '17': 'Weather',
  '19': 'Shopping & packing', '20': 'Day-of checklist',
}

const NEXT_ACTION_TITLES = [
  'Email/text/call Aaron', 'Talk through this master plan', 'Confirm which details must be known',
  "Receive/confirm Aaron's answers", 'Send one clean Partiful update',
  'Make clear that space is limited',
]

function cleanMarkdown(value: string) {
  return value.replace(/\\([>$])/g, '$1').replace(/\*\*/g, '').replace(/`/g, '').replace(/\s+/g, ' ').trim()
}

function sectionNumber(section: string) {
  return section.match(/^(\d+)/)?.[1] ?? ''
}

function parseSourceTasks(markdown: string): SourceTask[] {
  const lines = markdown.split('\n')
  const tasks: SourceTask[] = []
  let section = ''
  let subsection = ''

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const heading = line.match(/^#{1,3}\s+(.+)$/)
    if (heading) {
      const level = line.match(/^#+/)?.[0].length ?? 1
      if (/^\d+\./.test(heading[1]) || (level === 1 && !/^Definition of Done/.test(heading[1]))) {
        section = cleanMarkdown(heading[1]); subsection = ''
      }
      else subsection = cleanMarkdown(heading[1])
      continue
    }

    const checkbox = line.match(/^\s*-\s+\[([ xX])\]\s+(.+)$/)
    if (!checkbox) continue

    const titleParts = [checkbox[2]]
    const details: string[] = []
    let cursor = index + 1
    while (cursor < lines.length && lines[cursor].trim() !== '') {
      const continuation = lines[cursor]
      if (/^\s*-\s+\[[ xX]\]/.test(continuation) || /^#{1,3}\s+/.test(continuation) || /^-{5,}$/.test(continuation.trim())) break
      if (/^\s+-\s+/.test(continuation)) details.push(cleanMarkdown(continuation.replace(/^\s+-\s+/, '')))
      else if (/^\s{2,}\S/.test(continuation)) titleParts.push(continuation.trim())
      else break
      cursor += 1
    }

    tasks.push({ title: cleanMarkdown(titleParts.join(' ')), details, section, subsection, sourceLine: index + 1, checked: checkbox[1].toLowerCase() === 'x' })
  }
  return tasks
}

// The PRD contains one prose TODO and seven escaped inline checkboxes that are
// not valid Markdown list items. Keep them traceable here until the PRD is reformatted.
const inlineSourceTasks: SourceTask[] = [
  { title: 'Finalize late-guest wording', details: [], section: '2. Guest Arrival Plan', subsection: 'Late Guests', sourceLine: 93, checked: false },
  { title: 'Choose Sam or Kira as primary informal MC', details: [], section: '5. People & Responsibilities', subsection: 'Helper Crew', sourceLine: 255, checked: false },
  { title: 'Choose backup MC', details: [], section: '5. People & Responsibilities', subsection: 'Helper Crew', sourceLine: 255, checked: false },
  { title: 'Choose day-of guest contact', details: [], section: '5. People & Responsibilities', subsection: 'Helper Crew', sourceLine: 256, checked: false },
  { title: 'Choose cake owner', details: [], section: '5. People & Responsibilities', subsection: 'Helper Crew', sourceLine: 257, checked: false },
  { title: 'Choose photo/video lead(s)', details: [], section: '5. People & Responsibilities', subsection: 'Helper Crew', sourceLine: 257, checked: false },
  { title: 'Choose supply/setup helpers', details: [], section: '5. People & Responsibilities', subsection: 'Helper Crew', sourceLine: 258, checked: false },
  { title: 'Choose cleanup helpers', details: [], section: '5. People & Responsibilities', subsection: 'Helper Crew', sourceLine: 258, checked: false },
]

function getTimeframe(task: SourceTask): string | undefined {
  if (task.section.startsWith('3.')) {
    if (task.subsection.includes('Next 48 Hours')) return 'Next 48 hours'
    if (task.subsection.includes('End of This Week')) return 'End of this week'
    if (task.subsection.includes('This Weekend')) return 'This weekend / early next week'
    if (task.subsection.includes('Mid-September')) return 'By mid-September'
  }
  if (task.section.startsWith('17.')) {
    if (task.subsection.includes('10 Days')) return '~10 days before'
    if (task.subsection.includes('3-5 Days')) return '3–5 days before'
    if (task.subsection.includes('Day Before')) return 'Day before'
  }
  if (task.section.startsWith('20.')) {
    const labels: Record<string, string> = {
      'Before Leaving Home': 'Party day · before leaving', "At Fisherman's Wharf": 'Party day · at the Wharf',
      'On Boat': 'Party day · onboard', 'Before Docking': 'Party day · before docking',
    }
    return labels[task.subsection] ?? 'Party day'
  }
  return undefined
}

function getOwner(task: SourceTask): TaskOwner | undefined {
  if (task.title.startsWith('Email/text/call Aaron') || task.title.startsWith('Talk through this master plan')) return 'Gio'
  return undefined
}

function getPriority(task: SourceTask): TaskPriority {
  if (task.section.startsWith('4.')) return 'Critical'
  if (NEXT_ACTION_TITLES.some((title) => task.title.startsWith(title))) {
    return task.title.includes('Talk through') ? 'High' : 'Critical'
  }
  if (/confirm|boarding|departure|guest contact|capacity|cleanup plan|payment process/i.test(task.title)) return 'High'
  if (/optional|if any|if useful|if needed|if necessary|vibe calls/i.test(task.title)) return 'Nice-to-have'
  return 'Normal'
}

function getDependency(task: SourceTask): string | undefined {
  const title = task.title.toLowerCase()
  if (title.includes('once aaron') || title.includes('after rules are confirmed')) return "Aaron's confirmation"
  if (title.includes('with aaron') || title.includes('ask aaron')) return 'Response from Aaron'
  if (title.includes('once final attendance')) return 'Final attendance count'
  if (title.includes('only if allowed') || title.includes('if permitted') || title.includes('if necessary')) return 'Relevant boat rules'
  if (title.includes('once confirmed')) return 'Related plan must be confirmed'
  if (title.includes('partiful update')) return 'Confirmed guest-facing logistics'
  if (title.includes('after-party')) return 'After-party location selection'
  return undefined
}

function initialStatus(task: SourceTask, dependency?: string): TaskStatus {
  if (task.checked) return 'Done'
  if (task.title.startsWith('Send one clean Partiful update')) return 'In Progress'
  if (dependency && !task.section.startsWith('4.') && !task.section.startsWith('17.') && !task.section.startsWith('20.')) return 'Waiting'
  return 'Not Started'
}

const parsedTasks = [...parseSourceTasks(masterPlan), ...inlineSourceTasks]
const taskIdOccurrences = new Map<string, number>()

function stableTaskId(task: SourceTask) {
  const base = `${sectionNumber(task.section)}-${task.subsection}-${task.title}`
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 110)
  const occurrence = (taskIdOccurrences.get(base) ?? 0) + 1
  taskIdOccurrences.set(base, occurrence)
  return occurrence === 1 ? base : `${base}-${occurrence}`
}

export const allTasks: PlanningTask[] = parsedTasks.map((task) => {
  const dependency = getDependency(task)
  const group = GROUP_NAMES[sectionNumber(task.section)] ?? cleanMarkdown(task.section.replace(/^\d+\.\s*/, ''))
  return {
    id: stableTaskId(task),
    title: task.title,
    status: initialStatus(task, dependency),
    owner: getOwner(task),
    dueLabel: getTimeframe(task),
    priority: getPriority(task),
    dependency,
    notes: task.details.length > 0 ? task.details.join(' · ') : undefined,
    group,
    subgroup: task.subsection,
    sourceLine: task.sourceLine,
    isNextAction: task.section.startsWith('3.') && (task.subsection.includes('Next 48 Hours') || task.subsection.includes('End of This Week')),
  }
})

export const priorityTasks = allTasks.filter((task) => task.isNextAction).slice(0, 4)
export const taskGroups = Array.from(new Set(allTasks.map((task) => task.group)))
