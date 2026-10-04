import { ArrowRight, Clock, SkipForward, Timer, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { ExercisePlayer } from '@/components/exercise/ExercisePlayer'
import { SessionSummary, type SessionEntry } from '@/components/exercise/SessionSummary'
import { ExamSummary } from '@/components/exercise/ExamSummary'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { examDurations, useExercises } from '@/content/load'
import type { Exercise } from '@/content/schema'
import type { Attempt } from '@/db/db'
import { loadProgress } from '@/db/progress'
import type { ExerciseResult, PartResponse } from '@/engine/grading'
import { endSession, findResumableSession, recordAttempt, startSession, type ResumableSession } from '@/engine/recorder'
import type { ProgressSnapshot } from '@/engine/session'
import {
  buildSession,
  needsProgress,
  newSeed,
  parseSessionSearch,
  sessionScope,
  sessionSearch,
  timeLimit,
  type SessionConfig,
} from '@/engine/sessionConfig'
import { useKeyboard } from '@/hooks/useKeyboard'

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
  // Un pool fourni (tests) dispense de charger tout le contenu.
  const loaded = useExercises(!pool)
  const available = pool ?? loaded
  if (!available) return <p className="text-muted-foreground">Chargement des exercices…</p>
  return <SessionLoader pool={available} />
}

function SessionLoader({ pool }: { pool: readonly Exercise[] }) {
  const [params] = useSearchParams()
  const search = params.toString()
  const config = useMemo(() => parseSessionSearch(new URLSearchParams(search)), [search])
  if (!config) return <BackToTraining message="Session introuvable." />
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
  const [exercises] = useState(() => buildSession(config, pool, examDurations, snapshot, Date.now()))
  // Examen blanc : un examen interrompu sur le même sujet est proposé à la reprise.
  const [resumable, setResumable] = useState<ResumableSession | null | undefined>(config.mode === 'exam' ? undefined : null)
  const [decision, setDecision] = useState<'resume' | 'restart' | null>(null)
  useEffect(() => {
    if (config.mode !== 'exam') return
    let alive = true
    void findResumableSession(
      search,
      exercises.map((e) => e.id),
    ).then((found) => alive && setResumable(found))
    return () => {
      alive = false
    }
  }, [config.mode, search, exercises])

  if (exercises.length === 0) {
    const message =
      config.mode === 'errors'
        ? 'Aucune erreur à rejouer : toutes vos dernières tentatives sont réussies.'
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
            Vous avez commencé cet examen blanc et répondu à {resumable.attempts.length} exercice
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
  const exam = config.mode === 'exam'
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
  const [finished, setFinished] = useState(() => (resume?.attempts.length ?? 0) >= exercises.length)
  const [elapsed, setElapsed] = useState(() => Math.floor((Date.now() - (resume?.startedAt ?? Date.now())) / 1000))
  const sessionId = useRef<Promise<number> | null>(resume ? Promise.resolve(resume.sessionId) : null)
  const exerciseStartedAt = useRef(0)

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
      if (limit !== null && seconds >= limit) setFinished(true)
    }, 1000)
    return () => window.clearInterval(timer)
  }, [finished, limit, startedAt])

  useEffect(() => {
    if (finished) void sessionId.current?.then((id) => endSession(id))
  }, [finished])

  const onComplete = (exercise: Exercise, result: ExerciseResult, responses: PartResponse[]) => {
    const durationMs = Date.now() - exerciseStartedAt.current
    setEntries((e) => [...e, { exercise, result }])
    setAnswers((m) => new Map(m).set(exercise.id, responses))
    setAnswered(true)
    void sessionId.current?.then((id) => recordAttempt(exercise, responses, result, durationMs, id))
  }

  const next = () => {
    if (index + 1 >= exercises.length) return setFinished(true)
    setIndex((i) => i + 1)
    setAnswered(false)
    exerciseStartedAt.current = Date.now()
    window.scrollTo?.({ top: 0 })
  }

  const stop = () => {
    const pending = exercises.length - entries.length
    if (pending > 0 && !window.confirm(`Terminer maintenant ? ${pending} exercice${pending > 1 ? 's' : ''} ne ser${pending > 1 ? 'ont' : 'a'} pas traité${pending > 1 ? 's' : ''}.`)) return
    setFinished(true)
  }

  useKeyboard((key) => (key === 'Enter' ? (next(), true) : false), answered && !finished)

  if (finished && config.mode === 'exam') {
    return (
      <ExamSummary
        ue={config.ue}
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
      />
    )
  }

  const current = exercises[index]
  const remaining = limit !== null ? Math.max(0, limit - elapsed) : null

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 text-sm">
        <span className="font-medium">
          {index + 1} / {exercises.length}
        </span>
        <Progress value={((index + (answered ? 1 : 0)) / exercises.length) * 100} className="flex-1" />
        <span
          className={remaining !== null && remaining <= 30 ? 'text-destructive font-semibold' : 'text-muted-foreground'}
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
      <ExercisePlayer
        key={`${index}-${current.id}`}
        exercise={current}
        deferFeedback={exam}
        onComplete={(r, resp) => onComplete(current, r, resp)}
      />
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
    </div>
  )
}
