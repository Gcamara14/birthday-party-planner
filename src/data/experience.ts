export interface ExperienceItem {
  id: string
  title: string
  note: string
  blocker?: string
}

export const birthdayMomentItems: ExperienceItem[] = [
  { id: 'cake', title: 'Cake', note: 'Choose, order, transport, and protect the birthday cake.', blocker: "Aaron's cake answer" },
  { id: 'happy-birthday', title: 'Happy Birthday song', note: 'Gather everyone to sing and celebrate CayCay.' },
  { id: 'natural-cue', title: 'MC gathers everyone naturally', note: 'Choose a natural point during the cruise—no scheduled minute.' },
  { id: 'cake-owner', title: 'Cake owner', note: 'Assign one person to pick up, transport, and protect the cake.' },
  { id: 'candle-rules', title: 'Candles / fire-rule confirmation', note: 'Use flameless candles if necessary.', blocker: "Aaron's candle and fire rules" },
  { id: 'cake-supplies', title: 'Plates, forks, and napkins', note: 'Include a cake knife or server if needed.' },
  { id: 'photo-ready', title: 'Photo / video readiness', note: 'Have the photo or video lead ready for the birthday moment.' },
]

export const musicItems: ExperienceItem[] = [
  { id: 'playlist-owner', title: 'Playlist owner', note: 'Choose one person to lead the birthday and boat playlist.' },
  { id: 'boat-speaker', title: 'Boat speaker confirmation', note: 'Confirm that the Bluetooth speaker works and how to connect.', blocker: "Aaron's speaker answer" },
  { id: 'backup-speaker', title: 'Backup speaker', note: 'Bring one if useful and allowed.', blocker: "Aaron's backup-speaker guidance" },
  { id: 'offline-playlist', title: 'Offline playlist', note: 'Download it in case reception is poor.' },
  { id: 'charged-devices', title: 'Charged devices', note: 'Charge phones and the backup speaker before leaving.' },
  { id: 'shared-access', title: 'Two people with playlist access', note: 'Make sure the music does not depend on one phone.' },
]

export const optionalActivities: ExperienceItem[] = [
  { id: 'trivia', title: 'CayCay trivia', note: 'A lightweight option if the group wants an activity.' },
  { id: 'stories', title: 'How-do-you-know-CayCay stories', note: 'Invite a few quick stories only if it feels natural.' },
  { id: 'photo-challenge', title: 'Photo challenge', note: 'An easy prompt that can happen alongside the party.' },
  { id: 'group-prompts', title: 'Group photo prompts', note: 'Simple prompts for fun group photos.' },
]
