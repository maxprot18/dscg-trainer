/**
 * Lecteur d'un exercice : énoncé, parties enchaînées (la suivante apparaît quand la
 * précédente est validée), puis note globale et correction détaillée.
 */
import { useMemo, useRef, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { CYCLE_LABELS, TYPE_LABELS } from '@/content/labels'
import type { Exercise } from '@/content/schema'
import { combineResults, gradePart, type ExerciseResult, type PartResponse, type PartResult } from '@/engine/grading'
import { exerciseParts, STAGE_LABELS } from '@/engine/parts'
import { formatNumber } from '@/engine/numbers'

import { Explanation, Verdict } from './Feedback'
import { PartView } from './parts'

function Statement({ exercise }: { exercise: Exercise }) {
  switch (exercise.type) {
    case 'mcq':
    case 'true_false':
    case 'numeric':
    case 'journal_entry':
      return <p className="whitespace-pre-line">{exercise.statement}</p>
    case 'flashcard':
      return null
    case 'case_study':
      return (
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">{exercise.title}</h2>
          <p className="text-sm whitespace-pre-line">{exercise.context}</p>
        </div>
      )
    case 'consolidation_case': {
      const names = new Map(exercise.entities.map((e) => [e.id, e.name]))
      return (
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold">{exercise.title}</h2>
          <p className="text-sm whitespace-pre-line">{exercise.context}</p>
          <table className="w-full text-sm">
            <caption className="text-muted-foreground mb-1 text-left text-xs">Organigramme du groupe</caption>
            <thead className="text-muted-foreground text-left text-xs">
              <tr>
                <th className="py-1">Détentrice</th>
                <th>Détenue</th>
                <th className="text-right">% capital</th>
                <th className="text-right">% droits de vote</th>
              </tr>
            </thead>
            <tbody>
              {exercise.links.map((l) => (
                <tr key={`${l.from}-${l.to}`} className="border-t">
                  <td className="py-1">{names.get(l.from)}</td>
                  <td>{names.get(l.to)}</td>
                  <td className="text-right">{formatNumber(l.ownership_pct)} %</td>
                  <td className="text-right">{formatNumber(l.voting_pct ?? l.ownership_pct)} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    case 'audit_case':
      return (
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">{exercise.title}</h2>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary">Cycle {CYCLE_LABELS[exercise.cycle]}</Badge>
            {exercise.assertions?.map((a) => (
              <Badge key={a} variant="outline">
                {a}
              </Badge>
            ))}
          </div>
          <p className="text-sm whitespace-pre-line">{exercise.situation}</p>
        </div>
      )
  }
}

export interface ExercisePlayerProps {
  exercise: Exercise
  onComplete: (result: ExerciseResult, responses: PartResponse[]) => void
}

export function ExercisePlayer({ exercise, onComplete }: ExercisePlayerProps) {
  const parts = useMemo(() => exerciseParts(exercise), [exercise])
  const [responses, setResponses] = useState<PartResponse[]>([])
  const [results, setResults] = useState<PartResult[]>([])
  const [final, setFinal] = useState<ExerciseResult | null>(null)
  const completed = useRef(false)
  const multi = parts.length > 1

  const submit = (index: number, response: PartResponse) => {
    if (index !== results.length || completed.current) return
    const nextResponses = [...responses, response]
    const nextResults = [...results, gradePart(parts[index], response)]
    setResponses(nextResponses)
    setResults(nextResults)
    if (nextResults.length === parts.length) {
      completed.current = true
      const result = combineResults(parts, nextResults)
      setFinal(result)
      onComplete(result, nextResponses)
    }
  }

  return (
    <article className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{TYPE_LABELS[exercise.type]}</Badge>
        <Badge variant="outline">Niveau {exercise.difficulty}</Badge>
      </div>
      <Statement exercise={exercise} />
      {parts.slice(0, results.length + 1).map((part, i) => (
        <div key={part.id} className={multi ? 'border-l-2 pl-3' : undefined}>
          {multi && (
            <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase">
              Question {i + 1}/{parts.length}
              {part.stage ? ` · ${STAGE_LABELS[part.stage]}` : ''} · {formatNumber(part.weight)} pt
              {part.weight > 1 ? 's' : ''}
            </p>
          )}
          <PartView
            part={part}
            response={responses[i]}
            result={results[i]}
            active={i === results.length}
            onSubmit={(r) => submit(i, r)}
          />
        </div>
      ))}
      {final && (
        <div className="flex flex-col gap-3 border-t pt-4">
          {multi && (
            <Verdict
              correct={final.correct}
              score={final.score}
              label={`${final.correct ? 'Réussi' : 'À retravailler'} : ${formatNumber(final.earned)} / ${formatNumber(final.total)} points`}
            />
          )}
          <div>
            <p className="mb-1 text-sm font-semibold">Correction</p>
            <Explanation>{exercise.explanation}</Explanation>
          </div>
          <p className="text-muted-foreground text-xs">Référence : {exercise.source_ref}</p>
        </div>
      )}
    </article>
  )
}
