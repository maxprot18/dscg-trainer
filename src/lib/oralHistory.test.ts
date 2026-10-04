import { drawTopic, readOralHistory, saveOralResult } from './oralHistory'

describe('oraux blancs', () => {
  beforeEach(() => localStorage.clear())

  it('tirage parmi les sujets pas encore passés, puis parmi tous', () => {
    const topics = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    expect(drawTopic(topics, ['a', 'b'], () => 0.99)?.id).toBe('c')
    expect(drawTopic(topics, ['a', 'b', 'c'], () => 0)?.id).toBe('a')
    expect(drawTopic([], [])).toBeUndefined()
  })

  it('historique des notes, le plus récent en tête', () => {
    saveOralResult({ date: 1, topicId: 'a', title: 'A', score: 12, scores: {} })
    saveOralResult({ date: 2, topicId: 'b', title: 'B', score: 15, scores: {} })
    expect(readOralHistory().map((r) => r.topicId)).toEqual(['b', 'a'])
  })
})
