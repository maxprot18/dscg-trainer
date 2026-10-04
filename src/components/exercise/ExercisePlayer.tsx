/**
 * Lecteur d'un exercice : énoncé, parties enchaînées (la suivante apparaît quand la
 * précédente est validée), puis note globale et correction détaillée.
 *
 * En examen blanc (`deferFeedback`), la correction n'est pas montrée pendant l'épreuve : les
 * réponses validées sont verrouillées et la correction est affichée à la fin, en relecture
 * (`review` : réponses déjà données, exercice affiché entièrement corrigé).
 */
import { BookOpen } from 'lucide-react'
import { useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { BookmarkButton } from '@/components/BookmarkButton'
import { ReportLink } from '@/components/ReportLink'
import { TypeIcon } from '@/components/TypeIcon'
import { Markdown } from '@/components/Markdown'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CYCLE_LABELS, TYPE_LABELS } from '@/content/labels'
import { hasCourse } from '@/content/load'
import type { Exercise } from '@/content/schema'
import { combineResults, gradePart, type ExerciseResult, type PartResponse, type PartResult } from '@/engine/grading'
import { exerciseParts, STAGE_LABELS } from '@/engine/parts'
import { formatNumber } from '@/engine/numbers'
import { exerciseIssueUrl } from '@/lib/report'

import { Explanation, Verdict } from './Feedback'
import { PartView } from './parts'

/**
 * Énoncé long d'un cas : repliable, pour qu'il ne défile pas hors de vue pendant les
 * sous-questions sur mobile ; ouvert par défaut.
 */
function FoldableContext({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details open className="group rounded-lg border">
      <summary className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 font-semibold select-none">
        <span>{title}</span>
        <span className="text-muted-foreground text-xs font-normal group-open:hidden">Afficher l’énoncé</span>
        <span className="text-muted-foreground hidden text-xs font-normal group-open:inline">Replier</span>
      </summary>
      <div className="flex flex-col gap-3 border-t px-3 py-3">{children}</div>
    </details>
  )
}

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
      return exercise.dossier ? (
        <FoldableContext title={exercise.title}>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary">Sujet type d’examen</Badge>
            <Badge variant="outline">{Math.round(exercise.estimated_seconds / 60)} min</Badge>
            {exercise.total_points !== undefined && <Badge variant="outline">{formatNumber(exercise.total_points)} points</Badge>}
          </div>
          <div className="text-sm">
            <Markdown source={exercise.context} />
          </div>
          {exercise.annexes?.map((annex, i) => (
            <details key={i} className="rounded-md border">
              <summary className="cursor-pointer px-3 py-2 text-sm font-medium">
                Annexe {i + 1} — {annex.title}
              </summary>
              <div className="border-t px-3 py-2 text-sm">
                <Markdown source={annex.content} />
              </div>
            </details>
          ))}
        </FoldableContext>
      ) : (
        <FoldableContext title={exercise.title}>
          <p className="text-sm whitespace-pre-line">{exercise.context}</p>
        </FoldableContext>
      )
    case 'consolidation_case': {
      const names = new Map(exercise.entities.map((e) => [e.id, e.name]))
      return (
        <FoldableContext title={exercise.title}>
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
        </FoldableContext>
      )
    }
    case 'audit_case':
      return (
        <FoldableContext title={exercise.title}>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary">Cycle {CYCLE_LABELS[exercise.cycle]}</Badge>
            {exercise.assertions?.map((a) => (
              <Badge key={a} variant="outline">
                {a}
              </Badge>
            ))}
          </div>
          <p className="text-sm whitespace-pre-line">{exercise.situation}</p>
        </FoldableContext>
      )
  }
}

export interface ExercisePlayerProps {
  exercise: Exercise
  onComplete?: (result: ExerciseResult, responses: PartResponse[]) => void
  /** Examen blanc : pas de correction pendant l'épreuve. */
  deferFeedback?: boolean
  /** Relecture d'un exercice déjà traité, avec les réponses données. */
  review?: readonly PartResponse[]
}

export function ExercisePlayer({ exercise, onComplete, deferFeedback = false, review }: ExercisePlayerProps) {
  const parts = useMemo(() => exerciseParts(exercise), [exercise])
  const [responses, setResponses] = useState<PartResponse[]>(() => (review ? [...review] : []))
  const [results, setResults] = useState<PartResult[]>(() =>
    review ? review.map((r, i) => gradePart(parts[i], r)) : [],
  )
  const [final, setFinal] = useState<ExerciseResult | null>(() =>
    review && review.length === parts.length ? combineResults(parts, results) : null,
  )
  const completed = useRef(review !== undefined)
  const multi = parts.length > 1
  const hidden = deferFeedback && !review

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
      onComplete?.(result, nextResponses)
    }
  }

  return (
    <article className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>
          <TypeIcon type={exercise.type} className="size-3.5" /> {TYPE_LABELS[exercise.type]}
        </Badge>
        <Badge variant="outline">Niveau {exercise.difficulty}</Badge>
      </div>
      <Statement exercise={exercise} />
      {parts.slice(0, review ? results.length : results.length + 1).map((part, i) => (
        <div key={part.id} className={multi ? 'border-l-2 pl-3' : undefined}>
          {multi && (
            <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase">
              Question {i + 1}/{parts.length}
              {part.stage ? ` · ${STAGE_LABELS[part.stage]}` : ''} · {formatNumber(part.weight)} pt
              {part.weight > 1 ? 's' : ''}
            </p>
          )}
          {/* Structure identique avant et après validation : la saisie reste affichée, verrouillée. */}
          <fieldset disabled={hidden && i < results.length} className="flex min-w-0 flex-col gap-2">
            <PartView
              part={part}
              response={hidden ? undefined : responses[i]}
              result={hidden ? undefined : results[i]}
              active={i === results.length}
              onSubmit={(r) => submit(i, r)}
            />
            {hidden && i < results.length && (
              <p className="text-muted-foreground text-xs">Réponse enregistrée : correction à la fin de l’examen.</p>
            )}
          </fieldset>
        </div>
      ))}
      {final && hidden && (
        <p className="text-muted-foreground border-t pt-4 text-sm">Réponse enregistrée. La correction sera affichée à la fin de l’examen.</p>
      )}
      {final && !hidden && (
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
          <div className="flex flex-wrap items-center gap-2">
            {hasCourse(exercise.notion) && (
              <Button asChild variant="outline" size="sm">
                <Link to={`/cours/${exercise.notion}`}>
                  <BookOpen /> Voir la fiche de cours
                </Link>
              </Button>
            )}
            <BookmarkButton target={exercise.id} />
          </div>
          <ReportLink href={exerciseIssueUrl(exercise)} />
        </div>
      )}
    </article>
  )
}
