import { ArrowLeft, Printer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Markdown } from '@/components/Markdown'
import { Button } from '@/components/ui/button'
import { loadAllCourses, taxonomy } from '@/content/load'

/** Toutes les fiches d'une UE sur une page, pour l'impression (CSS print : sans en-tête ni navigation). */
export function CoursePrintPage() {
  const { ueId = '' } = useParams()
  const ue = taxonomy.ues.find((u) => u.id === ueId)
  const [courses, setCourses] = useState<Map<string, string> | null>(null)

  useEffect(() => {
    let alive = true
    void loadAllCourses().then((list) => alive && setCourses(new Map(list.map((c) => [c.id, c.text]))))
    return () => {
      alive = false
    }
  }, [])

  if (!ue) {
    return (
      <div className="flex flex-col gap-4">
        <p>UE introuvable.</p>
        <Button asChild variant="outline" className="self-start">
          <Link to="/cours">Retour aux cours</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-2">
        <Link to={`/cours/ue/${ue.id}`} className="text-muted-foreground inline-flex items-center gap-1 text-sm">
          <ArrowLeft className="size-4" /> {ue.id}
        </Link>
        <Button onClick={() => window.print()} disabled={!courses}>
          <Printer /> Imprimer
        </Button>
      </div>
      <header>
        <h1 className="text-2xl font-bold">
          {ue.id} — {ue.title}
        </h1>
        <p className="text-muted-foreground text-sm">
          Fiches de cours · DSCG Trainer · contenu sous licence CC BY-SA 4.0
        </p>
      </header>
      {!courses ? (
        <p className="text-muted-foreground">Chargement des fiches…</p>
      ) : (
        ue.themes.map((theme) => (
          <section key={theme.id} className="flex flex-col gap-6">
            <h2 className="border-b pb-1 text-lg font-semibold">{theme.title}</h2>
            {theme.notions.map((notion) => {
              const text = courses.get(notion.id)
              return (
                <article key={notion.id} className="text-sm">
                  {text ? <Markdown source={text} /> : <h3 className="font-semibold">{notion.title}</h3>}
                </article>
              )
            })}
          </section>
        ))
      )}
    </div>
  )
}
