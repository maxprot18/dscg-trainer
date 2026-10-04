import { ArrowLeft, BookmarkCheck, Check, Printer } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { UeBadge } from '@/components/UeBadge'
import { Button } from '@/components/ui/button'
import { exerciseCount, hasCourse, taxonomy } from '@/content/load'
import { UE_IDS } from '@/content/ids'
import type { UeId } from '@/content/schema'
import { useMarks, useProgress } from '@/db/progress'
import { newSeed, sessionSearch } from '@/engine/sessionConfig'
import { MASTERY_LABELS, notionProgress, type Mastery } from '@/engine/stats'
import { MASTERY_COLORS } from '@/lib/mastery'
import { cn } from '@/lib/utils'

/** Une UE : ses thèmes et toutes ses notions, avec le niveau de maîtrise et les fiches déjà lues. */
export function CourseUePage() {
  const { ueId = '' } = useParams()
  const ue = taxonomy.ues.find((u) => u.id === ueId)
  const progress = useProgress()
  const read = useMarks('read')
  const bookmarks = useMarks('bookmark')
  const byNotion = useMemo(
    () => (progress ? notionProgress(progress.attempts, progress.reviews) : new Map()),
    [progress],
  )
  if (!ue || !(UE_IDS as readonly string[]).includes(ueId)) {
    return (
      <div className="flex flex-col gap-4">
        <p>UE introuvable.</p>
        <Button asChild variant="outline" className="self-start">
          <Link to="/cours">Retour aux cours</Link>
        </Button>
      </div>
    )
  }
  const id = ue.id as UeId
  const mastery = (notion: string): Mastery => byNotion.get(notion)?.mastery ?? 'new'

  return (
    <div className="flex flex-col gap-4">
      <Link to="/cours" className="text-muted-foreground inline-flex items-center gap-1 text-sm">
        <ArrowLeft className="size-4" /> Toutes les UE
      </Link>
      <header className="flex flex-col gap-2">
        <UeBadge ue={id} className="self-start" />
        <h1 className="text-2xl font-bold">{ue.title}</h1>
        <p className="text-muted-foreground text-sm">
          Épreuve : {ue.exam.format}
          {ue.exam.duration_minutes !== null &&
            `, ${ue.exam.duration_minutes >= 60 ? `${ue.exam.duration_minutes / 60} h` : `${ue.exam.duration_minutes} min`}`}
          , coefficient {ue.exam.coefficient}.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link to={`/session${sessionSearch({ mode: 'theme', seed: newSeed(), scope: { ue: id } })}`}>
              S’entraîner sur cette UE
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="no-print">
            <Link to={`/cours/ue/${id}/imprimer`}>
              <Printer /> Fiches à imprimer
            </Link>
          </Button>
        </div>
      </header>
      <nav aria-label="Thèmes" className="flex flex-wrap gap-1 text-xs">
        {ue.themes.map((t) => (
          <a key={t.id} href={`#theme-${t.id}`} className="bg-muted hover:bg-accent rounded-full px-2.5 py-1">
            {t.title}
          </a>
        ))}
      </nav>
      {ue.themes.map((theme) => (
        <section key={theme.id} id={`theme-${theme.id}`} aria-labelledby={`h-${theme.id}`} className="rounded-xl border">
          <h2 id={`h-${theme.id}`} className="bg-muted/50 flex items-baseline justify-between gap-2 rounded-t-xl border-b px-4 py-2 font-semibold">
            <span>{theme.title}</span>
            <span className="text-muted-foreground text-xs font-normal whitespace-nowrap">
              {exerciseCount(`${id}/${theme.id}`)} ex.
            </span>
          </h2>
          <ul className="divide-y">
            {theme.notions.map((notion) => {
              const m = mastery(notion.id)
              const count = exerciseCount(`notion:${notion.id}`)
              const course = hasCourse(notion.id)
              const isRead = read?.has(`notion:${notion.id}`)
              const marked = bookmarks?.has(`notion:${notion.id}`)
              return (
                <li key={notion.id}>
                  <Link
                    to={`/cours/${notion.id}`}
                    className="hover:bg-accent/50 flex items-center gap-3 px-4 py-2.5 text-sm"
                    aria-label={`${notion.title} (${MASTERY_LABELS[m]}${isRead ? ', fiche lue' : ''})`}
                  >
                    <span aria-hidden className={cn('size-2.5 shrink-0 rounded-full border', MASTERY_COLORS[m])} />
                    <span className={cn('min-w-0 flex-1', !course && 'text-muted-foreground')}>{notion.title}</span>
                    {marked && <BookmarkCheck className="text-muted-foreground size-3.5 shrink-0" aria-label="à revoir plus tard" />}
                    {isRead && <Check className="size-3.5 shrink-0 text-emerald-600" aria-label="fiche lue" />}
                    <span className="text-muted-foreground w-8 shrink-0 text-right text-xs">{count}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
