import { exampleExercises } from '@/content/__fixtures__/examples'
import { exerciseSchema } from '@/content/schema'
import { DscgDatabase } from '@/db/db'

import { gradeExercise, type PartResponse } from './grading'
import { endSession, recordAttempt, startSession } from './recorder'

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
  })
})
