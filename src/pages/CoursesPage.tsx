import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { hasCourse, taxonomy, useExercises } from '@/content/load'

export function CoursesPage() {
  const exercises = useExercises()
  const countByNotion = new Map<string, number>()
  for (const e of exercises ?? []) countByNotion.set(e.notion, (countByNotion.get(e.notion) ?? 0) + 1)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Cours</h1>
      <p className="text-muted-foreground text-sm">Programme du DSCG, découpé en UE, thèmes et notions.</p>
      {taxonomy.ues.map((ue) => (
        <details key={ue.id} className="rounded-xl border p-4">
          <summary className="cursor-pointer font-semibold">
            {ue.id} — {ue.title}
          </summary>
          <div className="mt-3 flex flex-col gap-3">
            {ue.themes.map((theme) => (
              <details key={theme.id} className="pl-2">
                <summary className="cursor-pointer">
                  {theme.title} <Badge variant="secondary">{theme.notions.length}</Badge>
                </summary>
                <ul className="mt-2 flex flex-col gap-1 pl-4 text-sm">
                  {theme.notions.map((notion) => {
                    const count = countByNotion.get(notion.id) ?? 0
                    const course = hasCourse(notion.id)
                    return (
                      <li key={notion.id}>
                        {course || count > 0 ? (
                          <Link to={`/cours/${notion.id}`} className="hover:text-primary inline-flex items-start gap-1">
                            {course && <FileText className="mt-0.5 size-3.5 shrink-0" aria-label="fiche de cours" />}
                            <span className="underline-offset-2 hover:underline">{notion.title}</span>
                            {count > 0 && <span className="text-muted-foreground">({count})</span>}
                          </Link>
                        ) : (
                          <span className="text-muted-foreground">{notion.title}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </details>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}
