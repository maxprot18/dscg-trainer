import { dailyReminderIcs } from './reminder'

describe('rappel quotidien (.ics)', () => {
  it('événement quotidien jusqu’à l’examen, avec alerte, au lendemain si l’heure est passée', () => {
    const ics = dailyReminderIcs('19:30', 'https://exemple.org/dscg-trainer/', new Date(2026, 9, 4, 20, 0), '2027-05-12')
    expect(ics).toContain('BEGIN:VCALENDAR\r\n')
    expect(ics).toContain('DTSTART:20261005T193000')
    expect(ics).toContain('RRULE:FREQ=DAILY;UNTIL=20270512T235959')
    expect(ics).toContain('BEGIN:VALARM')
    expect(ics).toContain('URL:https://exemple.org/dscg-trainer/')
    expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true)
  })

  it('le jour même si l’heure n’est pas passée ; sans date d’examen, sans fin', () => {
    const ics = dailyReminderIcs('19:30', 'u', new Date(2026, 9, 4, 8, 0))
    expect(ics).toContain('DTSTART:20261004T193000')
    expect(ics).toContain('RRULE:FREQ=DAILY\r\n')
  })
})
