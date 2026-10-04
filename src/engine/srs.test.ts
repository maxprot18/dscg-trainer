// @vitest-environment node
import { applySm2, DAY_MS, dueDate, INITIAL_EASE, isDue, MIN_EASE, qualityFromScore, reviewAfterAttempt, startOfDay } from './srs'

const T0 = new Date(2026, 9, 5, 9, 0).getTime()

describe('répétition espacée (SM-2)', () => {
  it('qualité : la réussite (70 %) donne au moins 3, un échec moins de 3', () => {
    expect(qualityFromScore(1, true)).toBe(5)
    expect(qualityFromScore(0.9, true)).toBe(4)
    expect(qualityFromScore(0.7, true)).toBe(3)
    expect(qualityFromScore(0.5, false)).toBe(2)
    expect(qualityFromScore(0.2, false)).toBe(1)
    expect(qualityFromScore(0, false)).toBe(0)
  })

  it('succès successifs : 1 jour, 6 jours, puis intervalle × facilité', () => {
    let r = applySm2(undefined, 'n', 5, T0)
    expect(r).toMatchObject({ interval: 1, repetitions: 1, due: startOfDay(T0 + DAY_MS) })
    expect(r.ease).toBeCloseTo(INITIAL_EASE + 0.1)
    r = applySm2(r, 'n', 5, T0 + DAY_MS)
    expect(r).toMatchObject({ interval: 6, repetitions: 2 })
    r = applySm2(r, 'n', 4, T0 + 7 * DAY_MS)
    expect(r.interval).toBe(Math.round(6 * 2.7))
    expect(r.repetitions).toBe(3)
    expect(r.ease).toBeCloseTo(2.7)
  })

  it('échec : retour à 1 jour, une rechute comptée si la notion était acquise, facilité plancher 1,3', () => {
    let r = applySm2(undefined, 'n', 5, T0)
    r = applySm2(r, 'n', 5, T0 + DAY_MS)
    r = applySm2(r, 'n', 0, T0 + 7 * DAY_MS)
    expect(r).toMatchObject({ interval: 1, repetitions: 0, lapses: 1, due: startOfDay(T0 + 8 * DAY_MS) })
    for (let i = 0; i < 10; i++) r = applySm2(r, 'n', 0, T0 + (10 + i) * DAY_MS)
    expect(r.ease).toBe(MIN_EASE)
  })

  it('une revue par jour : l’état est recalculé sur la moyenne des tentatives du jour', () => {
    // Jour 1 : deux réussites, la notion est acquise pour 1 jour.
    let r = reviewAfterAttempt(undefined, 'n', [1], T0)
    r = reviewAfterAttempt(r, 'n', [1, 1], T0 + 60_000)
    expect(r).toMatchObject({ repetitions: 1, interval: 1 })
    // Jour 2 : réussite, échec, réussite (67 %) : la revue du jour est ratée...
    const day2 = T0 + DAY_MS
    r = reviewAfterAttempt(r, 'n', [1], day2)
    expect(r).toMatchObject({ repetitions: 2, interval: 6 })
    r = reviewAfterAttempt(r, 'n', [1, 0], day2 + 1)
    expect(r).toMatchObject({ repetitions: 0, interval: 1, lapses: 1 })
    // ... puis réussie après une quatrième tentative (75 %) : l'échec du jour est effacé.
    r = reviewAfterAttempt(r, 'n', [1, 0, 1, 1], day2 + 2)
    expect(r).toMatchObject({ repetitions: 2, interval: 6, lapses: 0, due: dueDate(day2, 6) })
    expect(r.prior).toMatchObject({ repetitions: 1, interval: 1 })
  })

  it('échéance au début du jour prévu, y compris au passage à l’heure d’hiver', () => {
    const r = applySm2(undefined, 'n', 5, T0)
    expect(isDue(r, T0)).toBe(false)
    expect(isDue(r, startOfDay(T0 + DAY_MS))).toBe(true)
    const saturday = new Date(2026, 9, 24, 22, 0).getTime()
    expect(new Date(dueDate(saturday, 1))).toEqual(new Date(2026, 9, 25))
    expect(new Date(dueDate(saturday, 6))).toEqual(new Date(2026, 9, 30))
  })
})
