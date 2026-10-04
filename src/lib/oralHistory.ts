/** Oraux blancs passés (auto-évaluation), gardés dans le navigateur : 50 derniers. */
const KEY = 'dscg-oral-history'

export interface OralResult {
  date: number
  topicId: string
  title: string
  /** Note d'auto-évaluation sur 20. */
  score: number
  scores: Record<string, number>
}

export function readOralHistory(): OralResult[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(raw) ? (raw as OralResult[]) : []
  } catch {
    return []
  }
}

export function saveOralResult(result: OralResult): OralResult[] {
  const list = [result, ...readOralHistory()].slice(0, 50)
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    // Stockage indisponible : le résultat reste affiché.
  }
  return list
}

/** Tirage d'un sujet, en évitant les sujets déjà passés tant qu'il en reste. */
export function drawTopic<T extends { id: string }>(topics: readonly T[], done: readonly string[], random = Math.random): T | undefined {
  const fresh = topics.filter((t) => !done.includes(t.id))
  const pool = fresh.length ? fresh : topics
  return pool[Math.floor(random() * pool.length)]
}
