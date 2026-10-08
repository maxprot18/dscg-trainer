import { Settings } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TYPE_LABELS } from '@/content/labels'
import { taxonomy, useExercises } from '@/content/load'
import type { Exercise } from '@/content/schema'
import type { SessionMode } from '@/db/db'
import { useProgress, type ProgressData } from '@/db/progress'
import { sessionSearch } from '@/engine/sessionConfig'
import {
  activeDays,
  currentStreak,
  MASTERY_LABELS,
  predictedGrades,
  programProgress,
  sessionHistory,
  statsByType,
  totalTimeMs,
  weeklyActivity,
  type GroupProgress,
  type Mastery,
  type NotionProgress,
  type UeProgress,
} from '@/engine/stats'
import { MASTERY_COLORS, MASTERY_TEXT } from '@/lib/mastery'
import { cn } from '@/lib/utils'

const MODE_LABELS: Record<SessionMode, string> = {
  quick: 'Session rapide',
  theme: 'Par thème',
  smart: 'Révision intelligente',
  errors: 'Erreurs',
  exam: 'Examen blanc',
  full: 'Sujet complet',
  cards: 'Flashcards',
  diagnostic: 'Positionnement',
}

const percent = (rate: number | null) => (rate === null ? '—' : `${Math.round(rate * 100)} %`)

function formatDuration(ms: number): string {
  const minutes = Math.round(ms / 60000)
  return minutes >= 60 ? `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')}` : `${minutes} min`
}

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' })
const dateTimeFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

export function ProgressPage() {
  const progress = useProgress()
  if (!progress) return <p className="text-muted-foreground">Chargement de la progression…</p>
  return <ProgressView progress={progress} />
}

export function ProgressView({ progress, now: nowProp }: { progress: ProgressData; now?: number }) {
  const [now] = useState(() => nowProp ?? Date.now())
  const ues = useMemo(() => programProgress(taxonomy, progress.attempts, progress.reviews), [progress])
  const all = useMemo(() => ues.flatMap((u) => u.themes.flatMap((t) => t.notions)), [ues])
  const overall = useMemo(() => {
    const recent = all.reduce((s, n) => s + n.recent, 0)
    return recent === 0 ? null : all.reduce((s, n) => s + n.recentCorrect, 0) / recent
  }, [all])
  const due = progress.reviews.filter((r) => r.due <= now).length
  const mastered = all.filter((n) => n.mastery === 'mastered').length

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Progression</h1>
      <Card>
        <CardContent className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3">
          <Stat value={progress.attempts.length} label="exercices faits" />
          <Stat value={percent(overall)} label="réussite récente" />
          <Stat value={formatDuration(totalTimeMs(progress.attempts))} label="temps passé" />
          <Stat value={`${currentStreak(progress.attempts, now)} j`} label="série en cours" />
          <Stat value={activeDays(progress.attempts)} label="jours d’entraînement" />
          <Stat value={`${mastered} / ${all.length}`} label="notions maîtrisées" />
        </CardContent>
      </Card>
      {due > 0 && (
        <Button asChild size="lg">
          <Link to={`/session${sessionSearch({ mode: 'smart', seed: now % 2 ** 31 })}`}>
            Réviser les {due} notion{due > 1 ? 's' : ''} du jour
          </Link>
        </Button>
      )}
      <PredictedGrades progress={progress} />
      <WeeklyChart progress={progress} now={now} />
      <Heatmap ues={ues} />
      <ByUe ues={ues} now={now} />
      <ByType progress={progress} />
      <History progress={progress} />
      <BackupCard />
    </div>
  )
}

/** Note prévisionnelle par UE, tirée des derniers examens blancs et sujets complets. */
function PredictedGrades({ progress }: { progress: ProgressData }) {
  const grades = useMemo(() => predictedGrades(progress.sessions), [progress])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Note prévisionnelle</CardTitle>
        <CardDescription>
          Moyenne de vos trois derniers examens blancs ou sujets complets de chaque UE, le plus récent comptant davantage.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        {grades.size === 0 ? (
          <p className="text-muted-foreground">
            Passez un <Link to="/entrainement#examen-blanc" className="text-primary underline underline-offset-2">examen blanc</Link> pour
            obtenir une note estimée par UE.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {taxonomy.ues
              .filter((u) => grades.has(u.id))
              .map((u) => {
                const g = grades.get(u.id)!
                return (
                  <li key={u.id} className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0">
                      <span className="font-medium">{u.id}</span> <span className="text-muted-foreground">— {u.title}</span>
                    </span>
                    <span className="shrink-0 text-right tabular-nums">
                      <span className={cn('font-semibold', g.grade >= 10 ? 'text-emerald-700 dark:text-emerald-400' : 'text-destructive')}>
                        {g.grade.toLocaleString('fr-FR')} / 20
                      </span>
                      <span className="text-muted-foreground block text-xs">
                        {g.exams} examen{g.exams > 1 ? 's' : ''}, dernier : {g.last.toLocaleString('fr-FR')}
                      </span>
                    </span>
                  </li>
                )
              })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-muted-foreground text-xs">{label}</div>
    </div>
  )
}

function Legend() {
  return (
    <ul className="text-muted-foreground flex flex-wrap gap-3 text-xs">
      {(Object.keys(MASTERY_LABELS) as Mastery[]).map((m) => (
        <li key={m} className="flex items-center gap-1">
          <span className={cn('inline-block size-3 rounded-sm border', MASTERY_COLORS[m])} aria-hidden />
          {MASTERY_LABELS[m]}
        </li>
      ))}
    </ul>
  )
}

function notionLabel(n: NotionProgress & { title: string }): string {
  const rate = n.rate === null ? '' : ` : ${Math.round(n.rate * 100)} % sur ${n.recent} tentative${n.recent > 1 ? 's' : ''}`
  return `${n.title} (${MASTERY_LABELS[n.mastery]}${rate})`
}

/** Carte de chaleur : une case par notion du programme, colorée selon le niveau de maîtrise. */
function Heatmap({ ues }: { ues: UeProgress[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Carte du programme</CardTitle>
        <CardDescription>Une case par notion. Les cases grises sont les zones non travaillées.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Legend />
        {ues.map((ue) => (
          <section key={ue.id} aria-label={`Carte ${ue.id}`}>
            <h2 className="mb-1 text-sm font-semibold">
              {ue.id} <span className="text-muted-foreground font-normal">— {ue.covered} / {ue.total} notions travaillées</span>
            </h2>
            <div className="flex flex-col gap-1">
              {ue.themes.map((t) => (
                <div key={t.id} className="flex flex-wrap items-center gap-1">
                  {t.notions.map((n) => (
                    <Link
                      key={n.notion}
                      to={`/cours/${n.notion}`}
                      title={notionLabel(n)}
                      aria-label={notionLabel(n)}
                      data-mastery={n.mastery}
                      className={cn('size-6 rounded-sm border', MASTERY_COLORS[n.mastery])}
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>
        ))}
      </CardContent>
    </Card>
  )
}

function GroupLine({ title, group }: { title: string; group: GroupProgress }) {
  return (
    <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3">
      <span className="font-medium">{title}</span>
      <span className="text-muted-foreground text-xs">
        {percent(group.rate)} · {group.covered}/{group.total} notions · {group.counts.mastered} maîtrisée
        {group.counts.mastered > 1 ? 's' : ''} · {group.counts.review} à revoir
      </span>
    </span>
  )
}

/** Taux de réussite par UE, thème et notion. */
function ByUe({ ues, now }: { ues: UeProgress[]; now: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Réussite par UE, thème et notion</CardTitle>
        <CardDescription>Taux calculé sur les 10 dernières tentatives de chaque notion.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        {ues.map((ue) => (
          <details key={ue.id} className="rounded-md border p-2">
            <summary className="flex cursor-pointer gap-2">
              <GroupLine title={`${ue.id} — ${ue.title}`} group={ue} />
            </summary>
            <div className="mt-2 flex flex-col gap-2 pl-2">
              {ue.themes.map((t) => (
                <details key={t.id} className="border-l-2 pl-2">
                  <summary className="flex cursor-pointer gap-2">
                    <GroupLine title={t.title} group={t} />
                  </summary>
                  <ul className="mt-1 flex flex-col gap-1">
                    {t.notions.map((n) => (
                      <li key={n.notion} className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <Link to={`/cours/${n.notion}`} className="hover:underline">
                          {n.title}
                        </Link>
                        <span className="text-xs">
                          <span className={MASTERY_TEXT[n.mastery]}>{MASTERY_LABELS[n.mastery]}</span>
                          {n.rate !== null && (
                            <span className="text-muted-foreground">
                              {' '}
                              · {percent(n.rate)} ({n.recentCorrect}/{n.recent})
                            </span>
                          )}
                          {n.due !== undefined && (
                            <span className="text-muted-foreground">
                              {' '}
                              · {n.due <= now ? 'à réviser' : `révision le ${dateFormat.format(n.due)}`}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="link" size="sm" className="h-auto px-0">
                    <Link to={`/session${sessionSearch({ mode: 'theme', seed: now % 2 ** 31, scope: { ue: ue.id, theme: t.id } })}`}>
                      S’entraîner sur ce thème
                    </Link>
                  </Button>
                </details>
              ))}
            </div>
          </details>
        ))}
      </CardContent>
    </Card>
  )
}

const weekFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' })

/** Activité des 8 dernières semaines : exercices faits, puis taux de réussite (deux petits graphiques, une mesure chacun). */
function WeeklyChart({ progress, now }: { progress: ProgressData; now: number }) {
  const weeks = useMemo(() => weeklyActivity(progress.attempts, now), [progress, now])
  const max = Math.max(1, ...weeks.map((w) => w.attempts))
  const W = 320
  const H = 70
  const gap = 6
  const bw = (W - gap * (weeks.length - 1)) / weeks.length
  if (progress.attempts.length === 0) return null
  return (
    <Card>
      <CardHeader>
        <CardTitle>Huit dernières semaines</CardTitle>
        <CardDescription>Exercices faits par semaine, puis taux de réussite. La semaine en cours est à droite.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <figure>
          <figcaption className="text-muted-foreground mb-1 text-xs font-semibold uppercase">Exercices</figcaption>
          <svg viewBox={`0 0 ${W} ${H + 16}`} className="h-auto w-full" role="img" aria-label="Exercices faits par semaine">
            <desc>{weeks.map((w) => `semaine du ${weekFormat.format(w.start)} : ${w.attempts}`).join(' ; ')}</desc>
            <line x1={0} y1={H} x2={W} y2={H} className="stroke-border" />
            {weeks.map((w, i) => {
              const h = (w.attempts / max) * (H - 4)
              return (
                <g key={w.start}>
                  <title>{`Semaine du ${weekFormat.format(w.start)} : ${w.attempts} exercice${w.attempts > 1 ? 's' : ''}`}</title>
                  <rect x={i * (bw + gap)} y={H - h} width={bw} height={h} rx={3} className="fill-primary" />
                  {w.attempts > 0 && (
                    <text x={i * (bw + gap) + bw / 2} y={H - h - 3} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                      {w.attempts}
                    </text>
                  )}
                  <text x={i * (bw + gap) + bw / 2} y={H + 12} textAnchor="middle" className="fill-muted-foreground text-[8px]">
                    {weekFormat.format(w.start)}
                  </text>
                </g>
              )
            })}
          </svg>
        </figure>
        <figure>
          <figcaption className="text-muted-foreground mb-1 text-xs font-semibold uppercase">Réussite</figcaption>
          <svg viewBox={`0 0 ${W} ${H + 4}`} className="h-auto w-full" role="img" aria-label="Taux de réussite par semaine">
            <desc>{weeks.map((w) => `semaine du ${weekFormat.format(w.start)} : ${percent(w.rate)}`).join(' ; ')}</desc>
            <line x1={0} y1={H} x2={W} y2={H} className="stroke-border" />
            <line x1={0} y1={H * 0.3} x2={W} y2={H * 0.3} className="stroke-border" strokeDasharray="3 3" />
            {weeks.map((w, i) => {
              if (w.rate === null) return null
              const h = w.rate * (H - 4)
              return (
                <g key={w.start}>
                  <title>{`Semaine du ${weekFormat.format(w.start)} : ${percent(w.rate)}`}</title>
                  <rect x={i * (bw + gap)} y={H - h} width={bw} height={h} rx={3} className="fill-emerald-500" />
                  <text x={i * (bw + gap) + bw / 2} y={H - h - 3} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                    {Math.round(w.rate * 100)}
                  </text>
                </g>
              )
            })}
          </svg>
          <p className="text-muted-foreground text-xs">Ligne pointillée : 70 %, seuil de réussite des exercices composites.</p>
        </figure>
      </CardContent>
    </Card>
  )
}

/** Réussite par type d'exercice (le contenu est chargé en arrière-plan pour connaître le type de chaque tentative). */
function ByType({ progress }: { progress: ProgressData }) {
  const exercises = useExercises(progress.attempts.length > 0)
  const stats = useMemo(() => {
    if (!exercises) return null
    const types = new Map(exercises.map((e) => [e.id, e.type]))
    return statsByType(progress.attempts, (id) => types.get(id))
  }, [exercises, progress])
  if (progress.attempts.length === 0) return null
  return (
    <Card>
      <CardHeader>
        <CardTitle>Réussite par type d’exercice</CardTitle>
        <CardDescription>Du type le moins réussi au mieux réussi, sur toutes les tentatives.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        {!stats ? (
          <p className="text-muted-foreground">Chargement…</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {stats.map((s) => (
              <li key={s.type} className="flex items-center gap-3">
                <span className="w-40 shrink-0 truncate">{TYPE_LABELS[s.type as Exercise['type']] ?? s.type}</span>
                <span className="bg-muted h-2 flex-1 overflow-hidden rounded-full" aria-hidden>
                  <span className="bg-primary block h-full" style={{ width: `${Math.round(s.rate * 100)}%` }} />
                </span>
                <span className="text-muted-foreground w-28 shrink-0 text-right text-xs">
                  {Math.round(s.rate * 100)} % · {s.correct}/{s.attempts}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

function History({ progress }: { progress: ProgressData }) {
  const [mode, setMode] = useState<SessionMode | ''>('')
  const sessions = useMemo(
    () => sessionHistory(progress.sessions, progress.attempts).filter((s) => !mode || s.mode === mode),
    [progress, mode],
  )
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <CardTitle>Historique des sessions</CardTitle>
        <select
          aria-label="Filtrer par mode"
          className="border-input bg-background h-8 rounded-md border px-2 text-xs"
          value={mode}
          onChange={(e) => setMode(e.target.value as SessionMode | '')}
        >
          <option value="">Tous les modes</option>
          {(Object.keys(MODE_LABELS) as SessionMode[]).map((m) => (
            <option key={m} value={m}>
              {MODE_LABELS[m]}
            </option>
          ))}
        </select>
      </CardHeader>
      <CardContent className="text-sm">
        {sessions.length === 0 ? (
          <p className="text-muted-foreground">Aucune session pour l’instant.</p>
        ) : (
          <ul className="flex flex-col divide-y">
            {sessions.slice(0, 20).map((s) => (
              <li key={s.id} className="flex flex-wrap items-baseline justify-between gap-x-3 py-1.5">
                <span>
                  {MODE_LABELS[s.mode]}
                  {s.scope ? <span className="text-muted-foreground"> · {s.scope}</span> : null}
                </span>
                <span className="text-muted-foreground text-xs">
                  {dateTimeFormat.format(s.startedAt)} · {s.correct}/{s.answered} réussi{s.correct > 1 ? 's' : ''} ·{' '}
                  {formatDuration(s.durationMs)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

function BackupCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sauvegarde et réglages</CardTitle>
        <CardDescription>
          La progression reste dans ce navigateur. Export, import, remise à zéro et objectif quotidien sont dans les réglages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="outline">
          <Link to="/reglages">
            <Settings /> Ouvrir les réglages
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
