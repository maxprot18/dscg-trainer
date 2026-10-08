/**
 * Fin d'examen blanc : note sur 20, détail par exercice et correction de chaque exercice
 * (relecture avec les réponses données).
 */
import { CircleCheck, CircleMinus, CircleX } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { exerciseHeadline, TYPE_LABELS } from '@/content/labels'
import type { Exercise, UeId } from '@/content/schema'
import type { PartResponse } from '@/engine/grading'
import { formatNumber } from '@/engine/numbers'
import { examGrade } from '@/engine/session'

import { ExercisePlayer } from './ExercisePlayer'
import type { SessionEntry } from './SessionSummary'

export function ExamSummary({
  ue,
  full = false,
  exercises,
  entries,
  answers,
  elapsedSeconds,
  timedOut,
}: {
  ue: UeId
  /** Sujet complet (dossiers seulement) plutôt qu'examen blanc. */
  full?: boolean
  exercises: readonly Exercise[]
  entries: readonly SessionEntry[]
  answers: ReadonlyMap<string, PartResponse[]>
  elapsedSeconds: number
  timedOut: boolean
}) {
  const results = new Map(entries.map((e) => [e.exercise.id, e.result]))
  const grade = examGrade(exercises, new Map(entries.map((e) => [e.exercise.id, e.result.score])))
  const totalWeight = exercises.reduce((s, e) => s + e.estimated_seconds, 0)
  const points = (e: Exercise) => (e.estimated_seconds / totalWeight) * 20
  const minutes = Math.floor(elapsedSeconds / 60)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        {full ? 'Sujet complet' : 'Examen blanc'} {ue} : correction
      </h1>
      {timedOut && <p className="text-muted-foreground text-sm">Temps écoulé : l’épreuve s’est arrêtée automatiquement.</p>}
      <Card>
        <CardHeader>
          <CardTitle>Note : {formatNumber(grade, 2)} / 20</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          {entries.length} exercice{entries.length > 1 ? 's' : ''} traité{entries.length > 1 ? 's' : ''} sur {exercises.length}{' '}
          en {Math.floor(minutes / 60)} h {String(minutes % 60).padStart(2, '0')}. Chaque exercice pèse sa durée estimée ;
          un exercice commencé compte au prorata des questions traitées, un exercice non traité vaut 0. Les réponses
          rédigées sont notées sur les points clés repérés dans votre copie.
        </CardContent>
      </Card>
      <ol className="flex flex-col gap-2">
        {exercises.map((exercise, i) => {
          const result = results.get(exercise.id)
          const responses = answers.get(exercise.id)
          return (
            <li key={exercise.id} className="rounded-md border p-3 text-sm">
              <details>
                <summary className="flex cursor-pointer items-start gap-2">
                  {!result ? (
                    <CircleMinus className="text-muted-foreground mt-0.5 size-4 shrink-0" aria-label="non traité" />
                  ) : result.correct ? (
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-700" aria-label="réussi" />
                  ) : (
                    <CircleX className="mt-0.5 size-4 shrink-0 text-red-700" aria-label="à revoir" />
                  )}
                  <span className="flex-1">
                    <span className="block">
                      {i + 1}. {exerciseHeadline(exercise)}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {TYPE_LABELS[exercise.type]} · {formatNumber((result?.score ?? 0) * points(exercise), 2)} /{' '}
                      {formatNumber(points(exercise), 2)} pt{result ? '' : ' · non traité'}
                    </span>
                  </span>
                </summary>
                <div className="mt-3 border-t pt-3">
                  {responses ? (
                    <ExercisePlayer exercise={exercise} review={responses} />
                  ) : (
                    <>
                      <p className="mb-1 font-semibold">Correction</p>
                      <p className="text-muted-foreground whitespace-pre-line">{exercise.explanation}</p>
                      <p className="text-muted-foreground mt-2 text-xs">Référence : {exercise.source_ref}</p>
                    </>
                  )}
                </div>
              </details>
            </li>
          )
        })}
      </ol>
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/progression">Voir ma progression</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/entrainement">Retour à l’entraînement</Link>
        </Button>
      </div>
    </div>
  )
}
