import { Flame, Search, Target } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { BackupReminder } from '@/components/BackupReminder'
import { ExamPlanCard } from '@/components/ExamPlanCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { exerciseCount, taxonomy } from '@/content/load'
import type { Attempt, Review } from '@/db/db'
import { useProgress } from '@/db/progress'
import { newSeed, sessionSearch } from '@/engine/sessionConfig'
import { startOfDay } from '@/engine/srs'
import { currentStreak } from '@/engine/stats'
import { requestPersistenceOnce } from '@/lib/backup'
import { useSettings } from '@/lib/settings'

const NO_ATTEMPTS: Attempt[] = []
const NO_REVIEWS: Review[] = []

export function HomePage() {
  const progress = useProgress()
  const [now] = useState(() => Date.now())
  const notionCount = taxonomy.ues.reduce((n, ue) => n + ue.themes.reduce((m, t) => m + t.notions.length, 0), 0)
  const streak = progress ? currentStreak(progress.attempts, now) : 0
  const due = progress?.reviews.filter((r) => r.due <= now).length ?? 0
  const { dailyGoal } = useSettings()
  const today = progress ? progress.attempts.filter((a) => startOfDay(a.date) === startOfDay(now)).length : 0
  const attempts = progress?.attempts.length ?? 0
  // Stockage persistant demandé une fois, dès que l'utilisateur a commencé à s'entraîner.
  useEffect(() => {
    void requestPersistenceOnce(attempts)
  }, [attempts])

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold">DSCG Trainer</h1>
        <p className="text-muted-foreground">Audit, comptabilité, IFRS, consolidation, finance, droit et fiscalité.</p>
      </header>
      <BackupReminder attempts={attempts} now={now} />
      <Button asChild size="lg" className="h-14 text-lg">
        <Link to="/entrainement">S'entraîner</Link>
      </Button>
      {/* Toujours rendue (avec des valeurs à zéro pendant le chargement) pour éviter un saut de mise en page. */}
      <Card aria-busy={!progress}>
          <CardContent className="flex items-center gap-4">
            <GoalRing done={today} goal={dailyGoal} />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="flex items-center gap-2 font-semibold">
                <Target className="size-4 shrink-0" aria-hidden />
                {today >= dailyGoal ? 'Objectif du jour atteint' : `${today} / ${dailyGoal} exercices aujourd’hui`}
              </p>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Flame className={streak > 0 ? 'size-4 shrink-0 text-orange-500' : 'size-4 shrink-0'} aria-hidden />
                {streak > 0 ? `${streak} jour${streak > 1 ? 's' : ''} d’affilée` : 'Aucune série en cours'}
                {due > 0 ? ` · ${due} notion${due > 1 ? 's' : ''} à réviser` : ''}
              </p>
              <Button asChild variant="outline" size="sm" className="mt-1 self-start">
                <Link to={`/session${sessionSearch({ mode: 'smart', seed: newSeed() })}`}>Révision intelligente</Link>
              </Button>
            </div>
          </CardContent>
      </Card>
      {/* Rendue dès le premier affichage (progression vide en attendant la base) : pas de décalage de mise en page. */}
      <ExamPlanCard attempts={progress?.attempts ?? NO_ATTEMPTS} reviews={progress?.reviews ?? NO_REVIEWS} now={now} />
      <Card>
        <CardHeader>
          <CardTitle>Contenu disponible</CardTitle>
          <CardDescription>Programme officiel du DSCG (arrêté du 4 août 2025)</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <Stat value={exerciseCount('total').toLocaleString('fr-FR')} label="exercices" />
            <Stat value={notionCount} label="notions" />
            <Stat value={taxonomy.ues.length} label="UE" />
          </div>
          <Button asChild variant="ghost" size="sm" className="self-center">
            <Link to="/recherche">
              <Search /> Rechercher dans les cours et les exercices
            </Link>
          </Button>
        </CardContent>
      </Card>
      <p className="text-muted-foreground text-center text-xs">
        Version {__APP_VERSION__} · contenu sous licence CC BY-SA 4.0 ·{' '}
        <a href="https://github.com/maxprot18/dscg-trainer" target="_blank" rel="noopener noreferrer" className="underline">
          code source
        </a>
      </p>
    </div>
  )
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-muted-foreground text-xs">{label}</div>
    </div>
  )
}

/** Anneau d'objectif quotidien (exercices faits aujourd'hui sur l'objectif). */
function GoalRing({ done, goal }: { done: number; goal: number }) {
  const r = 26
  const c = 2 * Math.PI * r
  const ratio = Math.min(1, goal > 0 ? done / goal : 0)
  return (
    <svg
      viewBox="0 0 64 64"
      className="size-16 shrink-0"
      role="img"
      aria-label={`Objectif du jour : ${done} exercices sur ${goal}`}
    >
      <circle cx="32" cy="32" r={r} className="stroke-muted fill-none" strokeWidth="6" />
      <circle
        cx="32"
        cy="32"
        r={r}
        className={ratio >= 1 ? 'fill-none stroke-emerald-500' : 'stroke-primary fill-none'}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${c * ratio} ${c}`}
        transform="rotate(-90 32 32)"
      />
      <text x="32" y="36" textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
        {done}
      </text>
    </svg>
  )
}
