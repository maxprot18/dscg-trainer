import { ArrowLeft, ArrowRight, Clock, SkipForward, Timer, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { ExercisePlayer } from '@/components/exercise/ExercisePlayer'
import { SessionSummary, type SessionEntry } from '@/components/exercise/SessionSummary'
import { ExamSummary } from '@/components/exercise/ExamSummary'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { contentPaths, examDurations, ueSlugs, useExerciseFiles } from '@/content/load'
import type { Exercise } from '@/content/schema'
import type { Attempt } from '@/db/db'
import { loadProgress } from '@/db/progress'
import { gradeExercise, type ExerciseResult, type PartResponse } from '@/engine/grading'
import { endSession, findResumableSession, recordAttempt, startSession, type ResumableSession } from '@/engine/recorder'
import type { ProgressSnapshot } from '@/engine/session'
import { examGrade } from '@/engine/session'
import {
  buildSession,
  isExamMode,
  needsProgress,
  newSeed,
  parseSessionSearch,
  sessionScope,
  sessionSearch,
  sessionFiles,
  timeLimit,
  type SessionConfig,
} from '@/engine/sessionConfig'
import { useKeyboard } from '@/hooks/useKeyboard'
import { readSettings } from '@/lib/settings'
import { cn } from '@/lib/utils'

function BackToTraining({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-4">
      <p>{message}</p>
      <Button asChild variant="outline" className="self-start">
        <Link to="/entrainement">Choisir une session</Link>
      </Button>
    </div>
  )
}

export function SessionPage({ pool }: { pool?: readonly Exercise[] }) {
  const [params] = useSearchParams()
  const search = params.toString()
  const config = useMemo(() => parseSessionSearch(new URLSearchParams(search)), [search])
  if (!config) return <BackToTraining message="Session introuvable." />
  // Un pool fourni (tests) dispense de charger le contenu.
  return pool ? <SessionLoader config={config} pool={pool} /> : <ContentLoader config={config} />
}

/** Charge les seuls fichiers de contenu utiles à la session (`sessionFiles`). */
function ContentLoader({ config }: { config: SessionConfig }) {
  const files = useMemo(() => sessionFiles(config, contentPaths, ueSlugs), [config])
  const pool = useExerciseFiles(files)
  if (!pool) return <p className="text-muted-foreground">Chargement des exercices…</p>
  return <SessionLoader config={config} pool={pool} />
}

function SessionLoader({ config, pool }: { config: SessionConfig; pool: readonly Exercise[] }) {
  const [params] = useSearchParams()
  const search = params.toString()
  // La clé recrée le déroulé (état remis à zéro) à chaque nouvelle session.
  return needsProgress(config) ? (
    <ProgressSessionLoader key={search} config={config} pool={pool} />
  ) : (
    <SessionBuilder key={search} config={config} pool={pool} />
  )
}

/** Révision intelligente et mode erreurs : la série est tirée une fois, sur l'historique du moment. */
function ProgressSessionLoader({ config, pool }: { config: SessionConfig; pool: readonly Exercise[] }) {
  const [snapshot, setSnapshot] = useState<ProgressSnapshot | null>(null)
  useEffect(() => {
    let alive = true
    void loadProgress().then((data) => alive && setSnapshot(data))
    return () => {
      alive = false
    }
  }, [])
  if (!snapshot) return <p className="text-muted-foreground">Préparation de la session…</p>
  return <SessionBuilder config={config} pool={pool} snapshot={snapshot} />
}

function SessionBuilder({
  config,
  pool,
  snapshot,
}: {
  config: SessionConfig
  pool: readonly Exercise[]
  snapshot?: ProgressSnapshot
}) {
  const [params] = useSearchParams()
  const search = params.toString()
  const [exercises] = useState(() => {
    const settings = readSettings()
    return buildSession(config, pool, examDurations, snapshot, Date.now(), { theme: settings.themeSessionSize, cards: settings.cardsSessionSize })
  })
  // Examen blanc ou sujet complet : un examen interrompu sur le même sujet est proposé à la reprise.
  const [resumable, setResumable] = useState<ResumableSession | null | undefined>(isExamMode(config) ? undefined : null)
  const [decision, setDecision] = useState<'resume' | 'restart' | null>(null)
  useEffect(() => {
    if (!isExamMode(config)) return
    let alive = true
    void findResumableSession(
      search,
      exercises.map((e) => e.id),
    ).then((found) => alive && setResumable(found))
    return () => {
      alive = false
    }
  }, [config, search, exercises])

  if (exercises.length === 0) {
    const message =
      config.mode === 'errors'
        ? 'Aucune erreur à rejouer : toutes vos dernières tentatives sont réussies.'
        : config.mode === 'cards'
          ? 'Aucune flashcard pour cette sélection.'
          : config.mode === 'full'
            ? 'Pas encore assez de sujets type d’examen dans cette UE pour composer un sujet complet.'
            : 'Aucun exercice disponible pour cette sélection pour l’instant.'
    return <BackToTraining message={message} />
  }
  if (resumable === undefined) return <p className="text-muted-foreground">Préparation de la session…</p>
  if (resumable && decision === null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Examen interrompu</CardTitle>
          <CardDescription>
            Vous avez commencé {config.mode === 'full' ? 'ce sujet complet' : 'cet examen blanc'} et répondu à {resumable.attempts.length} exercice
            {resumable.attempts.length > 1 ? 's' : ''} sur {exercises.length}. Le chronomètre reprend là où il en était.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button onClick={() => setDecision('resume')}>Reprendre l’examen</Button>
          <Button
            variant="outline"
            onClick={() => {
              void endSession(resumable.sessionId)
              setDecision('restart')
            }}
          >
            Recommencer
          </Button>
        </CardContent>
      </Card>
    )
  }
  return <SessionRunner config={config} exercises={exercises} search={search} resume={decision === 'resume' ? resumable : null} />
}

function formatClock(seconds: number): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h}:${pad(m)}:${pad(seconds % 60)}` : `${m}:${pad(seconds % 60)}`
}

/** Reconstruit l'état d'un exercice déjà traité (reprise d'examen) à partir de la tentative enregistrée. */
function entryFromAttempt(exercise: Exercise, attempt: Attempt): SessionEntry {
  const score = attempt.score ?? (attempt.correct ? 1 : 0)
  return { exercise, result: { score, correct: attempt.correct, parts: [], earned: score, total: 1 } }
}

function SessionRunner({
  config,
  exercises,
  search,
  resume,
}: {
  config: SessionConfig
  exercises: Exercise[]
  search: string
  resume: ResumableSession | null
}) {
  const navigate = useNavigate()
  const limit = timeLimit(config, examDurations)
  const exam = isExamMode(config)
  const [startedAt] = useState(() => resume?.startedAt ?? Date.now())
  const byId = useMemo(() => new Map(exercises.map((e) => [e.id, e])), [exercises])
  const [index, setIndex] = useState(() => resume?.attempts.length ?? 0)
  const [entries, setEntries] = useState<SessionEntry[]>(() =>
    (resume?.attempts ?? []).flatMap((a) => {
      const exercise = byId.get(a.exerciseId)
      return exercise ? [entryFromAttempt(exercise, a)] : []
    }),
  )
  const [answers, setAnswers] = useState<Map<string, PartResponse[]>>(
    () => new Map((resume?.attempts ?? []).map((a) => [a.exerciseId, a.answer as PartResponse[]])),
  )
  const [answered, setAnswered] = useState(false)
  // Examen : réponses partielles de chaque exercice commencé (on peut y revenir, elles comptent au prorata).
  const [progress, setProgress] = useState<Map<string, (PartResponse | undefined)[]>>(() => new Map())
  const [finished, setFinished] = useState(() => (resume?.attempts.length ?? 0) >= exercises.length)
  const [elapsed, setElapsed] = useState(() => Math.floor((Date.now() - (resume?.startedAt ?? Date.now())) / 1000))
  const sessionId = useRef<Promise<number> | null>(resume ? Promise.resolve(resume.sessionId) : null)
  const exerciseStartedAt = useRef(0)
  const done = useMemo(() => new Set(entries.map((e) => e.exercise.id)), [entries])
  const [warning, setWarning] = useState<string | null>(null)

  /**
   * Fin d'examen : enregistre chaque exercice commencé mais pas terminé (arrêt, temps écoulé), noté sur ses
   * seules réponses ; une question non traitée vaut 0.
   */
  const flushPartials = () => {
    const pending = [...progress].filter(([id, responses]) => !done.has(id) && responses.some(Boolean))
    if (!pending.length) return
    const added: SessionEntry[] = []
    for (const [id, responses] of pending) {
      const exercise = byId.get(id)
      if (!exercise) continue
      const result = gradeExercise(exercise, responses as PartResponse[])
      added.push({ exercise, result })
      void sessionId.current?.then((sid) => recordAttempt(exercise, responses as PartResponse[], result, 0, sid))
    }
    setEntries((e) => [...e, ...added])
    setAnswers((m) => {
      const next = new Map(m)
      for (const [id, responses] of pending) next.set(id, responses as PartResponse[])
      return next
    })
  }
  const finish = () => {
    if (exam) flushPartials()
    setFinished(true)
  }
  const finishRef = useRef(finish)
  finishRef.current = finish

  useEffect(() => {
    // Garde : en mode strict, React exécute deux fois les effets au montage.
    if (sessionId.current) return
    exerciseStartedAt.current = Date.now()
    sessionId.current = startSession(config.mode, exercises, sessionScope(config), undefined, Date.now(), search)
  }, [config, exercises, search])

  useEffect(() => {
    if (finished) return
    const timer = window.setInterval(() => {
      const seconds = Math.floor((Date.now() - startedAt) / 1000)
      setElapsed(seconds)
      if (limit !== null && seconds >= limit) finishRef.current()
      // Examen : alertes à 15 et 5 minutes de la fin, comme les annonces de la salle d'examen.
      else if (limit !== null && exam) {
        const left = limit - seconds
        if (left === 15 * 60 || left === 5 * 60) setWarning(`Plus que ${left / 60} minutes.`)
      }
    }, 1000)
    return () => window.clearInterval(timer)
  }, [finished, limit, startedAt, exam])

  useEffect(() => {
    if (!finished) return
    // Examen : la note sur 20 est gardée avec la session (note prévisionnelle par UE), sauf examen abandonné
    // avant la première réponse.
    const grade =
      exam && entries.length > 0 ? examGrade(exercises, new Map(entries.map((e) => [e.exercise.id, e.result.score]))) : undefined
    void sessionId.current?.then((id) => endSession(id, undefined, Date.now(), grade))
    // Une seule fois, à la fin : les réponses ne changent plus ensuite.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  const onComplete = (exercise: Exercise, result: ExerciseResult, responses: PartResponse[]) => {
    const durationMs = Date.now() - exerciseStartedAt.current
    setEntries((e) => [...e, { exercise, result }])
    setAnswers((m) => new Map(m).set(exercise.id, responses))
    setAnswered(true)
    void sessionId.current?.then((id) => recordAttempt(exercise, responses, result, durationMs, id))
  }

  /** Examen : aller librement d'un exercice à l'autre (les réponses données restent enregistrées). */
  const goTo = (i: number) => {
    setIndex(i)
    setAnswered(done.has(exercises[i].id))
    exerciseStartedAt.current = Date.now()
    window.scrollTo?.({ top: 0 })
  }

  const next = () => {
    if (exam) return index + 1 >= exercises.length ? stop() : goTo(index + 1)
    if (index + 1 >= exercises.length) return setFinished(true)
    setIndex((i) => i + 1)
    setAnswered(false)
    exerciseStartedAt.current = Date.now()
    window.scrollTo?.({ top: 0 })
  }

  const stop = () => {
    const pending = exercises.length - done.size
    if (pending > 0 && !window.confirm(`Terminer maintenant ? ${pending} exercice${pending > 1 ? 's' : ''} ne ser${pending > 1 ? 'ont' : 'a'} pas traité${pending > 1 ? 's' : ''}.`)) return
    finish()
  }

  useKeyboard((key) => (key === 'Enter' ? (next(), true) : false), answered && !finished)

  if (finished && isExamMode(config)) {
    return (
      <ExamSummary
        ue={config.ue}
        full={config.mode === 'full'}
        exercises={exercises}
        entries={entries}
        answers={answers}
        elapsedSeconds={elapsed}
        timedOut={limit !== null && elapsed >= limit}
      />
    )
  }

  if (finished) {
    return (
      <SessionSummary
        entries={entries}
        planned={exercises.length}
        elapsedSeconds={elapsed}
        timedOut={limit !== null && elapsed >= limit}
        onRestart={() => navigate(`/session${sessionSearch({ ...config, seed: newSeed() })}`)}
        answers={answers}
      />
    )
  }

  const current = exercises[index]
  const remaining = limit !== null ? Math.max(0, limit - elapsed) : null
  const started = (id: string) => progress.get(id)?.some(Boolean) ?? false

  return (
    <div className="flex flex-col gap-4">
      {/* Barre collante : le chrono reste visible dans les longs énoncés. */}
      <div className="bg-background/95 sticky top-0 z-10 -mx-4 flex items-center gap-3 px-4 py-2 text-sm backdrop-blur">
        <span className="font-medium">
          {index + 1} / {exercises.length}
        </span>
        <Progress
          value={exam ? (done.size / exercises.length) * 100 : ((index + (answered ? 1 : 0)) / exercises.length) * 100}
          className="flex-1"
          aria-label="Avancement de la session"
        />
        <span
          className={
            remaining !== null && (remaining <= 30 || (exam && remaining <= 5 * 60))
              ? 'text-destructive font-semibold'
              : remaining !== null && exam && remaining <= 15 * 60
                ? 'font-semibold text-amber-700 dark:text-amber-400'
                : 'text-muted-foreground'
          }
          aria-label={remaining !== null ? 'Temps restant' : 'Durée de la session'}
          title={remaining !== null ? 'Temps restant' : 'Durée de la session (sans limite)'}
        >
          {remaining !== null ? <Clock className="mr-1 inline size-4" aria-hidden /> : <Timer className="mr-1 inline size-4" aria-hidden />}
          {formatClock(remaining ?? elapsed)}
        </span>
        <Button variant="ghost" size="icon" aria-label="Terminer la session" onClick={stop}>
          <X />
        </Button>
      </div>
      {warning && (
        <div role="alert" className="flex items-center justify-between gap-2 rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          <span>{warning}</span>
          <Button variant="ghost" size="sm" onClick={() => setWarning(null)}>
            OK
          </Button>
        </div>
      )}
      {exam && (
        <nav aria-label="Exercices de l’épreuve" className="flex flex-wrap gap-1">
          {exercises.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === index ? 'step' : undefined}
              aria-label={`Exercice ${i + 1}${done.has(e.id) ? ', traité' : started(e.id) ? ', commencé' : ''}`}
              className={cn(
                'min-w-9 rounded-md border px-2 py-1 text-xs tabular-nums',
                done.has(e.id) ? 'bg-primary text-primary-foreground border-primary' : started(e.id) ? 'border-primary text-primary' : 'text-muted-foreground',
                i === index && 'ring-ring ring-offset-background ring-2 ring-offset-1',
              )}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      )}
      <ExercisePlayer
        key={`${index}-${current.id}`}
        exercise={current}
        deferFeedback={exam}
        onComplete={(r, resp) => onComplete(current, r, resp)}
        initial={exam ? (done.has(current.id) ? answers.get(current.id) : progress.get(current.id)) : undefined}
        onProgress={exam ? (responses) => setProgress((m) => new Map(m).set(current.id, responses)) : undefined}
      />
      {exam ? (
        <div className="flex items-center justify-between gap-2">
          <Button variant="outline" onClick={() => goTo(index - 1)} disabled={index === 0}>
            <ArrowLeft /> Précédent
          </Button>
          <Button size="lg" onClick={next} variant={index + 1 >= exercises.length ? 'default' : 'outline'}>
            {index + 1 >= exercises.length ? 'Terminer l’épreuve' : 'Suivant'} <ArrowRight />
          </Button>
        </div>
      ) : (
      <div className="flex items-center justify-end gap-2">
        {!answered && (
          <Button variant="ghost" onClick={next} title="Passer sans répondre (compte comme non traité)">
            <SkipForward /> Passer
          </Button>
        )}
        {answered && (
          <Button size="lg" onClick={next}>
            {index + 1 >= exercises.length ? 'Voir le bilan' : 'Suivant'} <ArrowRight />
          </Button>
        )}
      </div>
      )}
    </div>
  )
}
