import { useMemo } from 'react'

import type { UeId } from '@/content/ids'
import { taxonomy } from '@/content/load'
import type { Attempt, Review } from '@/db/db'
import { examPlan, type ExamPlan } from '@/engine/plan'
import { notionProgress } from '@/engine/stats'
import { useSettings } from '@/lib/settings'

const notionsByUe = new Map<UeId, string[]>(taxonomy.ues.map((u) => [u.id, u.themes.flatMap((t) => t.notions.map((n) => n.id))]))

/** Plan de révision à rebours de la date d'examen renseignée dans les réglages, ou `null`. */
export function useExamPlan(attempts: readonly Attempt[], reviews: readonly Review[], now: number) {
  const { examDate, examUes } = useSettings()
  const plan = useMemo(
    () => (examDate && examUes.length ? examPlan(examDate, examUes, notionsByUe, notionProgress(attempts, reviews), now) : null),
    [examDate, examUes, attempts, reviews, now],
  )
  return { plan, examDate, ues: examUes }
}

/** Le plan donne le rythme du jour tant que l'examen est à venir. */
export function planIsActive(plan: ExamPlan | null): plan is ExamPlan {
  return plan !== null && plan.phase !== 'past'
}
