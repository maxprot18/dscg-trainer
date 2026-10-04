import { BookOpen, CircleCheck, CircleX } from 'lucide-react'
import { Link } from 'react-router-dom'

import { TypeIcon } from '@/components/TypeIcon'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { exerciseHeadline, TYPE_LABELS } from '@/content/labels'
import { hasCourse, taxonomy } from '@/content/load'
import type { Exercise } from '@/content/schema'
import { buildTaxonomyIndex } from '@/content/taxonomy'
import type { ExerciseResult } from '@/engine/grading'
import { notionsToReview } from '@/engine/stats'

const index = buildTaxonomyIndex(taxonomy)

export interface SessionEntry {
  exercise: Exercise
  result: ExerciseResult
}

export function SessionSummary({
  entries,
  planned,
  elapsedSeconds,
  timedOut,
  onRestart,
}: {
  entries: SessionEntry[]
  planned: number
  elapsedSeconds: number
  timedOut: boolean
  onRestart: () => void
}) {
  const correct = entries.filter((e) => e.result.correct).length
  const pct = entries.length === 0 ? 0 : Math.round((correct / entries.length) * 100)
  const toReview = notionsToReview(entries)
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Bilan de la session</h1>
      {timedOut && <p className="text-muted-foreground text-sm">Temps écoulé : la session s’est arrêtée automatiquement.</p>}
      <Card>
        <CardHeader>
          <CardTitle>
            {correct} / {entries.length} réussi{correct > 1 ? 's' : ''} ({pct} %)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          {entries.length} exercice{entries.length > 1 ? 's' : ''} traité{entries.length > 1 ? 's' : ''} sur {planned} en{' '}
          {Math.floor(elapsedSeconds / 60)} min {elapsedSeconds % 60} s.
        </CardContent>
      </Card>
      {toReview.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="size-4" aria-hidden /> Notions à revoir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-1 text-sm">
              {toReview.map(({ notion, failed, total }) => {
                const entry = index.notions.get(notion)
                const title = entry?.notion.title ?? notion
                return (
                  <li key={notion} className="flex flex-wrap items-baseline justify-between gap-x-3">
                    {hasCourse(notion) ? (
                      <Link to={`/cours/${notion}`} className="text-primary underline underline-offset-2">
                        {title}
                      </Link>
                    ) : (
                      <span>{title}</span>
                    )}
                    <span className="text-muted-foreground text-xs">
                      {failed} raté{failed > 1 ? 's' : ''} sur {total}
                    </span>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      )}
      <ul className="flex flex-col gap-2">
        {entries.map(({ exercise, result }) => (
          <li key={exercise.id} className="flex items-start gap-2 rounded-md border p-3 text-sm">
            {result.correct ? (
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-700" aria-label="réussi" />
            ) : (
              <CircleX className="mt-0.5 size-4 shrink-0 text-red-700" aria-label="à revoir" />
            )}
            <div className="flex-1">
              <p>
                <Link to={`/exercice/${exercise.id}`} className="hover:underline">
                  {exerciseHeadline(exercise)}
                </Link>
              </p>
              <p className="text-muted-foreground flex items-center gap-1 text-xs">
                <TypeIcon type={exercise.type} className="size-3" /> {TYPE_LABELS[exercise.type]} ·{' '}
                {Math.round(result.score * 100)} %
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onRestart}>Nouvelle session</Button>
        <Button asChild variant="outline">
          <Link to="/entrainement">Changer de mode</Link>
        </Button>
      </div>
    </div>
  )
}
