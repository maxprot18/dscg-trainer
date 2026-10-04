import { ArrowRight, Clock, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { ExercisePlayer } from '@/components/exercise/ExercisePlayer'
import { SessionSummary, type SessionEntry } from '@/components/exercise/SessionSummary'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { exercises as allExercises } from '@/content/load'
import type { Exercise } from '@/content/schema'
import type { ExerciseResult, PartResponse } from '@/engine/grading'
import { endSession, recordAttempt, startSession } from '@/engine/recorder'
import {
  buildSession,
  newSeed,
  parseSessionSearch,
  scopeKey,
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

export function SessionPage({ pool = allExercises }: { pool?: readonly Exercise[] }) {
  const [params] = useSearchParams()
  const search = params.toString()
  const config = useMemo(() => parseSessionSearch(new URLSearchParams(search)), [search])
  const exercises = useMemo(() => (config ? buildSession(config, pool) : []), [config, pool])
  if (!config) return <BackToTraining message="Session introuvable." />
  if (exercises.length === 0) return <BackToTraining message="Aucun exercice disponible pour cette sélection pour l’instant." />
  // La clé recrée le déroulé (état remis à zéro) à chaque nouvelle session.
  return <SessionRunner key={search} config={config} exercises={exercises} />
}

function formatClock(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

function SessionRunner({ config, exercises }: { config: SessionConfig; exercises: Exercise[] }) {
  const navigate = useNavigate()
  const limit = timeLimit(config)
  const [startedAt] = useState(() => Date.now())
  const [index, setIndex] = useState(0)
  const [entries, setEntries] = useState<SessionEntry[]>([])
  const [answered, setAnswered] = useState(false)
  const [finished, setFinished] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const sessionId = useRef<Promise<number> | null>(null)
  const exerciseStartedAt = useRef(0)

  useEffect(() => {
    // Garde : en mode strict, React exécute deux fois les effets au montage.
    if (sessionId.current) return
    exerciseStartedAt.current = Date.now()
    sessionId.current = startSession(config.mode, exercises, config.mode === 'theme' ? scopeKey(config.scope) : undefined)
  }, [config, exercises])

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

  useKeyboard((key) => (key === 'Enter' ? (next(), true) : false), answered && !finished)

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
          aria-label={remaining !== null ? 'Temps restant' : 'Temps écoulé'}
        >
          <Clock className="mr-1 inline size-4" aria-hidden />
          {formatClock(remaining ?? elapsed)}
        </span>
        <Button variant="ghost" size="icon" aria-label="Terminer la session" onClick={() => setFinished(true)}>
          <X />
        </Button>
      </div>
      <ExercisePlayer
        key={`${index}-${current.id}`}
        exercise={current}
        onComplete={(r, resp) => onComplete(current, r, resp)}
      />
      {answered && (
        <Button size="lg" onClick={next} className="self-end">
          {index + 1 >= exercises.length ? 'Voir le bilan' : 'Suivant'} <ArrowRight />
        </Button>
      )}
    </div>
  )
}
