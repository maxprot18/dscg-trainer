import { DscgDatabase, exportProgress, importProgress } from './db'

describe('progression locale', () => {
  it('exporte puis réimporte les trois tables', async () => {
    const source = new DscgDatabase('test-source')
    await source.attempts.add({ exerciseId: 'ex-1', notion: 'n-1', date: 1, answer: [1], correct: true, durationMs: 4000 })
    await source.reviews.add({ notion: 'n-1', due: 2, interval: 1, ease: 2.5, repetitions: 1, lapses: 0 })
    await source.sessions.add({ mode: 'quick', startedAt: 1, exerciseIds: ['ex-1'] })
    const dump = await exportProgress(source)
    expect(dump.attempts).toHaveLength(1)

    const target = new DscgDatabase('test-target')
    await target.attempts.add({ exerciseId: 'old', notion: 'n-0', date: 0, answer: null, correct: false, durationMs: 1 })
    await importProgress(JSON.parse(JSON.stringify(dump)), target)
    expect(await target.attempts.toArray()).toEqual(dump.attempts)
    expect(await target.reviews.count()).toBe(1)
    expect(await target.sessions.count()).toBe(1)
  })

  it('refuse un fichier étranger', async () => {
    await expect(importProgress({ app: 'autre' } as never, new DscgDatabase('test-bad'))).rejects.toThrow()
  })
})
