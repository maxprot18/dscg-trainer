/**
 * Rappel quotidien sans serveur : un fichier iCalendar (.ics) avec un événement répété chaque jour
 * jusqu'à la date d'examen, et une alerte à l'heure choisie. Il s'importe dans n'importe quel
 * agenda (iPhone, Android, Outlook, Google Agenda).
 */
const pad = (n: number) => String(n).padStart(2, '0')
const stamp = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`

/** `time` : HH:MM (heure locale) ; `until` : AAAA-MM-JJ (dernier jour inclus) ou rien. */
export function dailyReminderIcs(time: string, url: string, now: Date, until?: string | null): string {
  const [h, m] = time.split(':').map(Number)
  const first = new Date(now)
  first.setHours(h, m, 0, 0)
  if (first.getTime() <= now.getTime()) first.setDate(first.getDate() + 1)
  const local = `${first.getFullYear()}${pad(first.getMonth() + 1)}${pad(first.getDate())}T${pad(h)}${pad(m)}00`
  const rule = until ? `RRULE:FREQ=DAILY;UNTIL=${until.replace(/-/g, '')}T235959` : 'RRULE:FREQ=DAILY'
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DSCG Trainer//Rappel quotidien//FR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:dscg-trainer-rappel-${now.getTime()}@dscg-trainer`,
    `DTSTAMP:${stamp(now)}`,
    `DTSTART:${local}`,
    'DURATION:PT20M',
    rule,
    'SUMMARY:Révision DSCG',
    `DESCRIPTION:Séance du jour dans DSCG Trainer : ${url}`,
    `URL:${url}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Révision DSCG',
    'TRIGGER:PT0M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n') + '\r\n'
}

export function downloadReminder(time: string, until?: string | null): void {
  const url = new URL(import.meta.env.BASE_URL, location.origin).toString()
  const blob = new Blob([dailyReminderIcs(time, url, new Date(), until)], { type: 'text/calendar' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'dscg-rappel-quotidien.ics'
  a.click()
  URL.revokeObjectURL(a.href)
}
