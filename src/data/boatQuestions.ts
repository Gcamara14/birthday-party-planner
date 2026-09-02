import { allTasks } from './tasks'

export const boatQuestionCategories = [
  'Boarding & Timing', 'Food & Drinks', 'Boat Amenities', 'Cake & Decorations', 'Trash & Cleanup', 'Day-of Logistics',
]

const importantQuestionPatterns = [
  /host\/helper crew arrive/i, /guests begin boarding/i, /dock by 11:30/i, /depart exactly/i,
  /window include boarding/i, /after departure/i, /outside food/i, /BYOB/i, /beer allowed/i,
  /Prosecco/i, /hard liquor/i, /glass bottles/i, /provide a cooler/i, /Bluetooth/i,
  /birthday cake/i, /candles allowed/i, /decorations allowed/i, /cleanup responsibilities/i,
  /phone number/i, /meeting\/boarding landmark/i, /unload supplies/i,
]

export const boatQuestions = allTasks
  .filter((task) => task.group === 'Aaron & boat rules')
  .map((task) => ({ ...task, important: importantQuestionPatterns.some((pattern) => pattern.test(task.title)) }))

export function decisionsUnlockedBy(question: (typeof boatQuestions)[number]): string[] {
  const title = question.title.toLowerCase()
  if (/boarding|dock by|depart|arrives after|sign\/show/.test(title)) return ['Guest arrival plan', 'Partiful timing message']
  if (/outside food|costco pizza/.test(title)) return ['Pizza plan']
  if (/byob|beer|prosecco|liquor|glass|alcohol container/.test(title)) return ['Drink plan', 'Partiful food and drink guidance']
  if (/cooler|storage|ice|cups|refrigerator|food\/drink items/.test(title)) return ['Food and drink quantities', 'Packing list']
  if (/speaker|connect to it/.test(title)) return ['Music and backup speaker plan']
  if (/bathroom|seating|covered areas|outlets/.test(title)) return ['Guest guidance', 'Day-of preparation']
  if (/cake|candle|flameless/.test(title)) return ['Cake and birthday-moment plan']
  if (/decoration|balloon|banner|tape|attachment/.test(title)) return ['Boat-safe decor plan']
  if (/cleanup|trash|recycling/.test(title)) return ['Cleanup plan', 'Cleanup packing list']
  if (/phone number/.test(title)) return ['Day-of contact plan']
  if (/landmark|unload|loading/.test(title)) return ['Arrival and supply transport plan']
  if (/parking/.test(title)) return ['Parking and rideshare guidance']
  if (/guest message/.test(title)) return ['Final Partiful wording']
  return ['Related planning decision']
}
