// @vitest-environment node
import { applyReview, DAY_MS, INITIAL_EASE, isDue, MIN_EASE, qualityFromScore } from './srs'

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
    let r = applyReview(undefined, 'n', 5, T0)
    expect(r).toMatchObject({ interval: 1, repetitions: 1, due: T0 + DAY_MS })
    expect(r.ease).toBeCloseTo(INITIAL_EASE + 0.1)
    r = applyReview(r, 'n', 5, T0 + DAY_MS)
    expect(r).toMatchObject({ interval: 6, repetitions: 2 })
    r = applyReview(r, 'n', 4, T0 + 7 * DAY_MS)
    expect(r.interval).toBe(Math.round(6 * 2.7))
    expect(r.repetitions).toBe(3)
    expect(r.ease).toBeCloseTo(2.7)
  })

  it('échec : retour à 1 jour, une rechute comptée si la notion était acquise, facilité plancher 1,3', () => {
    let r = applyReview(undefined, 'n', 5, T0)
    r = applyReview(r, 'n', 5, T0 + DAY_MS)
    r = applyReview(r, 'n', 0, T0 + 7 * DAY_MS)
    expect(r).toMatchObject({ interval: 1, repetitions: 0, lapses: 1, due: T0 + 8 * DAY_MS })
    for (let i = 0; i < 10; i++) r = applyReview(r, 'n', 0, T0 + (10 + i) * DAY_MS)
    expect(r.ease).toBe(MIN_EASE)
  })

  it('le même jour, un second succès n’allonge pas l’intervalle et un second échec ne pénalise pas deux fois', () => {
    const first = applyReview(undefined, 'n', 5, T0)
    const again = applyReview(first, 'n', 5, T0 + 60_000)
    expect(again).toMatchObject({ interval: 1, repetitions: 1, due: first.due, ease: first.ease })
    const fail = applyReview(undefined, 'n', 1, T0)
    const failAgain = applyReview(fail, 'n', 0, T0 + 60_000)
    expect(failAgain.ease).toBe(fail.ease)
    expect(failAgain.lapses).toBe(0)
  })

  it('un échec après un succès le même jour compte comme une rechute', () => {
    const ok = applyReview(undefined, 'n', 5, T0)
    const ko = applyReview(ok, 'n', 0, T0 + 60_000)
    expect(ko).toMatchObject({ repetitions: 0, lapses: 1, interval: 1 })
  })

  it('échéance', () => {
    const r = applyReview(undefined, 'n', 5, T0)
    expect(isDue(r, T0)).toBe(false)
    expect(isDue(r, T0 + DAY_MS)).toBe(true)
  })
})
