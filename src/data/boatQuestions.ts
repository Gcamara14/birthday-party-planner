import { allTasks } from './tasks'

export const boatQuestionCategories = [
  'Boarding & Timing', 'Food & Drinks', 'Boat Amenities', 'Cake & Decorations', 'Trash & Cleanup', 'Day-of Logistics',
]

const importantQuestionPatterns = [
  /host\/helper crew arrive/i, /guests begin boarding/i, /dock by 11:45/i, /depart exactly/i,
  /window include boarding/i, /after departure/i, /outside food/i, /BYOB/i, /beer allowed/i,
  /Prosecco/i, /hard liquor/i, /glass bottles/i, /provide a cooler/i, /Bluetooth/i,
  /birthday cake/i, /candles allowed/i, /decorations allowed/i, /cleanup responsibilities/i,
  /phone number/i, /meeting\/boarding landmark/i, /unload supplies/i,
]

function recordedResolution(title: string): string {
  if (/host\/helper crew arrive/i.test(title)) return 'Not specifically confirmed. Current plan: host/helper crew arrives around 11:30 AM.'
  if (/guests begin boarding|dock by 11:45/i.test(title)) return 'Guests should arrive and be ready to board at 11:45 AM.'
  if (/depart exactly|window include boarding/i.test(title)) return 'Booking starts at 12:00 PM. Guests should be ready to board at 11:45 AM.'
  if (/after departure/i.test(title)) return 'Do not plan around accommodations. Guests should treat 11:45 AM as the deadline and go to the after-party if they miss departure.'
  if (/sign\/show/i.test(title)) return 'Not specifically discussed; no additional pre-boarding action is needed for the current plan.'
  if (/outside food|Costco pizzas/i.test(title)) return 'Allowed.'
  if (/BYOB|beer allowed|Prosecco|hard liquor|glass bottles|alcohol containers/i.test(title)) return 'Allowed based on Aaron’s response and listing evidence reviewed by the hosts.'
  if (/provide a cooler/i.test(title)) return 'Yes, a cooler is provided onboard.'
  if (/ice provided/i.test(title)) return 'May be provided, but not guaranteed. Check with Aaron morning-of and bring ice if needed.'
  if (/drink storage|refrigerator|cups provided|food\/drink items/i.test(title)) return 'No separate follow-up needed for the current plan; plan supplies conservatively.'
  if (/working Bluetooth|connect to it/i.test(title)) return 'Bluetooth stereo is available and plays throughout the boat.'
  if (/backup speaker/i.test(title)) return 'Optional and probably unnecessary because the boat stereo is confirmed.'
  if (/bathroom|seating|covered areas|outlets/i.test(title)) return 'No additional planning blocker based on the listing review.'
  if (/bring a birthday cake/i.test(title)) return 'Yes. Aaron explicitly approved the birthday cake.'
  if (/birthday candles|flameless candles/i.test(title)) return 'Open flame was not explicitly confirmed. Bring candles and a lighter, then ask before use; this is not a planning blocker.'
  if (/decorations allowed/i.test(title)) return 'Simple decorations are explicitly approved.'
  if (/balloons|banners\/tape|attachment methods|decorations that are prohibited/i.test(title)) return 'Keep decor simple and boat-safe within Aaron’s approval; do not assume unconfirmed attachment methods.'
  if (/cleanup|trash|recycling/i.test(title)) return 'Specific requirements were not discussed. Bring trash/recycling bags and leave the boat clean.'
  if (/phone number/i.test(title)) return 'Aaron is the day-of contact.'
  if (/meeting\/boarding landmark/i.test(title)) return 'Bass Tub, 276 Jefferson Street, Berth #4, Fisherman’s Wharf.'
  if (/unload|loading/i.test(title)) return 'Use the folding cart to bring supplies to Berth #4. Exact dock access and early boarding were not promised; coordinate with Aaron on arrival.'
  if (/parking/i.test(title)) return 'Gio plans to use Pier 39 Garage for the supply car. Guest garage/pricing guidance still needs separate research.'
  if (/guest message/i.test(title)) return 'No additional Aaron instructions are needed before drafting the guest message.'
  return 'Resolved for current planning; no additional Aaron follow-up is required.'
}

export const boatQuestions = allTasks
  .filter((task) => task.group === 'Aaron & boat rules')
  .map((task) => ({ ...task, important: importantQuestionPatterns.some((pattern) => pattern.test(task.title)), defaultStatus: 'Answered' as const, defaultDetails: recordedResolution(task.title) }))

export const defaultBoatAnswers = Object.fromEntries(boatQuestions.map((question) => [question.id, { status: question.defaultStatus, details: question.defaultDetails }]))

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
