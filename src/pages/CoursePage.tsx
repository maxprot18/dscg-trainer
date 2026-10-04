import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Markdown } from '@/components/Markdown'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { loadCourse, taxonomy, useExercises } from '@/content/load'
import { buildTaxonomyIndex } from '@/content/taxonomy'
import { newSeed, sessionSearch } from '@/engine/sessionConfig'

const index = buildTaxonomyIndex(taxonomy)

export function CoursePage() {
  const { notionId = '' } = useParams()
  const entry = index.notions.get(notionId)
  const exercises = useExercises()
  const navigate = useNavigate()
  const [course, setCourse] = useState<{ id: string; text: string | null } | null>(null)

  useEffect(() => {
    let alive = true
    void loadCourse(notionId).then((text) => alive && setCourse({ id: notionId, text }))
    return () => {
      alive = false
    }
  }, [notionId])

  if (!entry) {
    return (
      <div className="flex flex-col gap-4">
        <p>Notion introuvable.</p>
        <Button asChild variant="outline" className="self-start">
          <Link to="/cours">Retour aux cours</Link>
        </Button>
      </div>
    )
  }

  const count = exercises?.filter((e) => e.notion === notionId).length ?? 0
  const text = course?.id === notionId ? course.text : undefined

  return (
    <div className="flex flex-col gap-4">
      <Link to="/cours" className="text-muted-foreground inline-flex items-center gap-1 text-sm">
        <ArrowLeft className="size-4" /> Cours
      </Link>
      <div className="flex flex-wrap gap-1">
        <Badge variant="secondary">{entry.ue.id}</Badge>
        <Badge variant="outline">{entry.theme.title}</Badge>
      </div>
      {text === undefined ? (
        <p className="text-muted-foreground">Chargement…</p>
      ) : text === null ? (
        <>
          <h1 className="text-xl font-bold">{entry.notion.title}</h1>
          <p className="text-muted-foreground text-sm">La fiche de cours de cette notion n’est pas encore rédigée.</p>
        </>
      ) : (
        <article className="text-sm">
          <Markdown source={text} />
        </article>
      )}
      <Button
        size="lg"
        disabled={count === 0}
        onClick={() =>
          navigate(
            `/session${sessionSearch({
              mode: 'theme',
              seed: newSeed(),
              scope: { ue: entry.ue.id, theme: entry.theme.id, notion: notionId },
            })}`,
          )
        }
      >
        {count === 0 ? 'Pas encore d’exercice sur cette notion' : `S’entraîner sur cette notion (${count})`}
      </Button>
    </div>
  )
}
