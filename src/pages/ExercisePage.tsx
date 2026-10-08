import { ArrowLeft } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ExercisePlayer } from '@/components/exercise/ExercisePlayer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { taxonomy, useExercise } from '@/content/load'
import { buildTaxonomyIndex } from '@/content/taxonomy'
import { recordAttempt } from '@/engine/recorder'
import { newSeed, sessionSearch } from '@/engine/sessionConfig'

const index = buildTaxonomyIndex(taxonomy)

/** Un exercice seul (ouvert depuis la recherche) ; la tentative est enregistrée hors session. */
export function ExercisePage() {
  const { exerciseId = '' } = useParams()
  const exercise = useExercise(exerciseId)
  const navigate = useNavigate()
  const [startedAt] = useState(() => Date.now())
  const recorded = useRef(false)

  if (exercise === undefined) return <p className="text-muted-foreground">Chargement de l’exercice…</p>
  if (!exercise) {
    return (
      <div className="flex flex-col gap-4">
        <p>Exercice introuvable.</p>
        <Button asChild variant="outline" className="self-start">
          <Link to="/recherche">Retour à la recherche</Link>
        </Button>
      </div>
    )
  }
  const entry = index.notions.get(exercise.notion)

  return (
    <div className="flex flex-col gap-4">
      <button type="button" onClick={() => navigate(-1)} className="text-muted-foreground inline-flex items-center gap-1 self-start text-sm">
        <ArrowLeft className="size-4" /> Retour
      </button>
      {entry && (
        <div className="flex flex-wrap items-center gap-1">
          <Badge variant="secondary">{entry.ue.id}</Badge>
          <Link to={`/cours/${exercise.notion}`} className="text-sm hover:underline">
            {entry.notion.title}
          </Link>
        </div>
      )}
      <ExercisePlayer
        key={exercise.id}
        exercise={exercise}
        onComplete={(result, responses) => {
          if (recorded.current) return
          recorded.current = true
          void recordAttempt(exercise, responses, result, Date.now() - startedAt)
        }}
      />
      {entry && (
        <Button
          variant="outline"
          className="self-start"
          onClick={() =>
            navigate(
              `/session${sessionSearch({
                mode: 'theme',
                seed: newSeed(),
                scope: { ue: entry.ue.id, theme: entry.theme.id, notion: exercise.notion },
              })}`,
            )
          }
        >
          S’entraîner sur cette notion
        </Button>
      )}
    </div>
  )
}
