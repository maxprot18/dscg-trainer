import { BookOpen, Dumbbell, Search } from 'lucide-react'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { TYPE_LABELS } from '@/content/labels'
import { loadAllCourses, taxonomy, useExercises } from '@/content/load'
import { buildTaxonomyIndex } from '@/content/taxonomy'
import { exerciseSearchable, prepare, queryTokens, searchPrepared } from '@/engine/search'

const index = buildTaxonomyIndex(taxonomy)

interface CourseDoc {
  id: string
  title: string
  ue: string
  text: string
}

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  // Saisie locale : la recherche suit la frappe avec un temps de retard (useDeferredValue), et l'URL n'est
  // mise à jour qu'après une courte pause, pour ne perdre aucune touche sur mobile.
  const [input, setInput] = useState(() => params.get('q') ?? '')
  const query = useDeferredValue(input)
  useEffect(() => {
    const timer = window.setTimeout(() => setParams(input ? { q: input } : {}, { replace: true }), 300)
    return () => window.clearTimeout(timer)
  }, [input, setParams])
  const exercises = useExercises()
  const [courses, setCourses] = useState<CourseDoc[] | null>(null)

  useEffect(() => {
    let alive = true
    void loadAllCourses().then((list) => {
      if (!alive) return
      setCourses(
        list.map(({ id, text }) => {
          const entry = index.notions.get(id)
          return { id, text, title: entry?.notion.title ?? id, ue: entry?.ue.id ?? '' }
        }),
      )
    })
    return () => {
      alive = false
    }
  }, [])

  const courseDocs = useMemo(() => (courses ? prepare(courses, (c) => ({ head: c.title, body: c.text })) : null), [courses])
  const exerciseDocs = useMemo(() => (exercises ? prepare(exercises, exerciseSearchable) : null), [exercises])
  const courseHits = useMemo(() => (courseDocs ? searchPrepared(courseDocs, query, 20) : []), [courseDocs, query])
  const exerciseHits = useMemo(() => (exerciseDocs ? searchPrepared(exerciseDocs, query, 30) : []), [exerciseDocs, query])
  const searching = queryTokens(query).length > 0

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Recherche</h1>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-3 left-3 size-4" aria-hidden />
        <input
          type="search"
          aria-label="Rechercher dans les cours et les exercices"
          placeholder="Ex. écart d’acquisition, IAS 16, carry-back…"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-input bg-background focus-visible:ring-ring/70 h-10 w-full rounded-md border pr-3 pl-9 text-sm outline-none focus-visible:ring-[3px]"
        />
      </form>
      {!searching ? (
        <p className="text-muted-foreground text-sm">
          Tapez au moins un mot de deux lettres. Accents et majuscules sont ignorés ; tous les mots doivent apparaître.
        </p>
      ) : courseDocs && exerciseDocs && courseHits.length === 0 && exerciseHits.length === 0 ? (
        <p className="text-muted-foreground text-sm">Aucun résultat pour « {query} ».</p>
      ) : (
        <>
          {/* Chaque section s'affiche dès que son contenu est chargé (les fiches sont plus légères). */}
          <section aria-label="Fiches de cours" className="flex flex-col gap-2">
            <h2 className="flex items-center gap-2 font-semibold">
              <BookOpen className="size-4" aria-hidden /> Fiches de cours {courseDocs && `(${courseHits.length})`}
            </h2>
            {!courseDocs ? (
              <p className="text-muted-foreground text-sm">Chargement des fiches…</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {courseHits.map(({ item, snippet }) => (
                  <li key={item.id}>
                    <Link to={`/cours/${item.id}`} className="hover:bg-accent block rounded-md border p-3 text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <Badge variant="secondary">{item.ue}</Badge> {item.title}
                      </span>
                      <span className="text-muted-foreground mt-1 block text-xs">{snippet}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section aria-label="Exercices" className="flex flex-col gap-2">
            <h2 className="flex items-center gap-2 font-semibold">
              <Dumbbell className="size-4" aria-hidden /> Exercices{' '}
              {exerciseDocs && `(${exerciseHits.length}${exerciseHits.length === 30 ? ' premiers' : ''})`}
            </h2>
            {!exerciseDocs ? (
              <p className="text-muted-foreground text-sm">Chargement des exercices…</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {exerciseHits.map(({ item, snippet }) => (
                  <li key={item.id}>
                    <Link to={`/exercice/${item.id}`} className="hover:bg-accent block rounded-md border p-3 text-sm">
                      <span className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{item.ue}</Badge>
                        <Badge variant="outline">{TYPE_LABELS[item.type]}</Badge>
                        <span className="text-muted-foreground text-xs">
                          {index.notions.get(item.notion)?.notion.title}
                        </span>
                      </span>
                      <span className="text-muted-foreground mt-1 block text-xs">{snippet}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  )
}
