import { exampleExercises } from '@/content/__fixtures__/examples'
import { exerciseSchema } from '@/content/schema'
import { DscgDatabase } from '@/db/db'

import { gradeExercise, type PartResponse } from './grading'
import { endSession, findResumableSession, recordAttempt, RESUME_WINDOW_MS, startSession } from './recorder'

describe('enregistrement', () => {
  it('crée la session, enregistre la tentative et clôt la session', async () => {
    const database = new DscgDatabase('test-recorder')
    const ex = exerciseSchema.parse(exampleExercises.mcq)
    const sessionId = await startSession('quick', [ex], undefined, database)
    const responses: PartResponse[] = [{ kind: 'choice', selected: [1] }]
    await recordAttempt(ex, responses, gradeExercise(ex, responses), 1234.4, sessionId, database)
    await endSession(sessionId, database)

    const [attempt] = await database.attempts.toArray()
    expect(attempt).toMatchObject({ exerciseId: ex.id, notion: ex.notion, correct: true, score: 1, durationMs: 1234, sessionId })
    const session = await database.sessions.get(sessionId)
    expect(session?.exerciseIds).toEqual([ex.id])
    expect(session?.endedAt).toBeGreaterThan(0)
    // La tentative réussie programme la révision de la notion dans 1 jour (SM-2).
    const review = await database.reviews.get(ex.notion)
    expect(review).toMatchObject({ notion: ex.notion, repetitions: 1, interval: 1 })
  })

  it('reprise d’un examen blanc : même sujet, non terminé, moins de 24 h', async () => {
    const database = new DscgDatabase('test-resume')
    const ex = exerciseSchema.parse(exampleExercises.mcq)
    const search = 'mode=exam&seed=1&ue=UE4'
    const now = 1_000_000
    const sessionId = await startSession('exam', [ex], 'UE4', database, now, search)
    const responses: PartResponse[] = [{ kind: 'choice', selected: [1] }]
    await recordAttempt(ex, responses, gradeExercise(ex, responses), 1000, sessionId, database, now + 1000)

    const found = await findResumableSession(search, [ex.id], database, now + 2000)
    expect(found).toMatchObject({ sessionId, startedAt: now })
    expect(found?.attempts).toHaveLength(1)
    expect(await findResumableSession(search, ['autre'], database, now + 2000)).toBeNull()
    expect(await findResumableSession('mode=exam&seed=2&ue=UE4', [ex.id], database, now + 2000)).toBeNull()
    expect(await findResumableSession(search, [ex.id], database, now + RESUME_WINDOW_MS + 1)).toBeNull()
    await endSession(sessionId, database, now + 3000)
    expect(await findResumableSession(search, [ex.id], database, now + 4000)).toBeNull()
  })
})
