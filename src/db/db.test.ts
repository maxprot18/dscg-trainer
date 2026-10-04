import { clearProgress, DscgDatabase, exportProgress, importProgress, setMark, toggleMark } from './db'

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

  it('marques : bascule, pose idempotente, export v2, import d’un export v1', async () => {
    const database = new DscgDatabase('test-marks')
    expect(await toggleMark('bookmark', 'ex-1', database)).toBe(true)
    expect(await toggleMark('bookmark', 'ex-1', database)).toBe(false)
    await setMark('read', 'notion:a', database)
    await setMark('read', 'notion:a', database)
    expect(await database.marks.count()).toBe(1)
    const dump = await exportProgress(database)
    expect(dump.version).toBe(2)
    expect(dump.marks).toHaveLength(1)

    const v1 = { app: 'dscg-trainer' as const, version: 1 as const, exportedAt: '', attempts: [], reviews: [], sessions: [] }
    await importProgress(v1, database)
    expect(await database.marks.count()).toBe(0)
    await setMark('read', 'notion:b', database)
    await clearProgress(database)
    expect(await database.marks.count()).toBe(0)
  })

  it('refuse un fichier étranger', async () => {
    await expect(importProgress({ app: 'autre' } as never, new DscgDatabase('test-bad'))).rejects.toThrow()
  })
})
