import { ChevronRight } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { UeBadge } from '@/components/UeBadge'
import { Card } from '@/components/ui/card'
import { exerciseCount, taxonomy } from '@/content/load'
import { ueStyle } from '@/content/ue'
import { useProgress } from '@/db/progress'
import { programProgress } from '@/engine/stats'

/** Entrée des cours : une carte par UE avec l'avancement (notions travaillées, maîtrisées). */
export function CoursesPage() {
  const progress = useProgress()
  const ues = useMemo(
    () => (progress ? programProgress(taxonomy, progress.attempts, progress.reviews) : null),
    [progress],
  )
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Cours</h1>
      <p className="text-muted-foreground text-sm">
        Programme officiel du DSCG : une fiche par notion, avec ses exercices. Choisissez une UE.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {taxonomy.ues.map((ue) => {
          const p = ues?.find((u) => u.id === ue.id)
          const total = ue.themes.reduce((n, t) => n + t.notions.length, 0)
          return (
            <li key={ue.id}>
              <Card className="relative overflow-hidden p-0">
                <Link to={`/cours/ue/${ue.id}`} className="hover:bg-accent/50 flex items-stretch gap-3 p-4" style={ueStyle(ue.id)}>
                  <span aria-hidden className="w-1.5 shrink-0 rounded-full bg-[var(--ue)]" />
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <UeBadge ue={ue.id} />
                      <span className="text-muted-foreground text-xs">
                        {ue.themes.length} thèmes · {total} notions · {exerciseCount(ue.id)} exercices
                      </span>
                    </span>
                    <span className="font-semibold">
                      {ue.id} — {ue.title}
                    </span>
                    <span className="flex items-center gap-2 text-xs" aria-busy={!p}>
                        <span
                          className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full"
                          role="progressbar"
                          aria-label={`${ue.id} : ${p?.covered ?? 0} notions travaillées sur ${total}`}
                          aria-valuenow={p?.covered ?? 0}
                          aria-valuemax={total}
                        >
                          <span className="block h-full bg-emerald-500" style={{ width: `${((p?.counts.mastered ?? 0) / total) * 100}%` }} />
                        </span>
                        <span className="text-muted-foreground">
                          {p?.counts.mastered ?? 0} maîtrisée{(p?.counts.mastered ?? 0) > 1 ? 's' : ''} · {p?.covered ?? 0} travaillée
                          {(p?.covered ?? 0) > 1 ? 's' : ''}
                        </span>
                      </span>
                  </span>
                  <ChevronRight className="text-muted-foreground size-5 shrink-0 self-center" aria-hidden />
                </Link>
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
