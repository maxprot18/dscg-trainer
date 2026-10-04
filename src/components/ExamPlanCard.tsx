import { CalendarClock } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { UeId } from '@/content/ids'
import { taxonomy } from '@/content/load'
import type { Attempt, Review } from '@/db/db'
import { examPlan, type ExamPlan } from '@/engine/plan'
import { newSeed, sessionSearch } from '@/engine/sessionConfig'
import { notionProgress } from '@/engine/stats'
import { DAILY_GOAL_CHOICES, saveSettings, useSettings } from '@/lib/settings'

const notionsByUe = new Map<UeId, string[]>(taxonomy.ues.map((u) => [u.id, u.themes.flatMap((t) => t.notions.map((n) => n.id))]))

const PHASE_TEXT: Record<ExamPlan['phase'], string> = {
  learn: 'Découverte : voyez chaque jour quelques notions nouvelles et révisez celles qui sont dues.',
  consolidate: 'Consolidation : tout a été vu ; travaillez les notions fragiles et faites un examen blanc par semaine.',
  final: 'Dernière ligne droite : examens blancs chronométrés, mode erreurs et révision intelligente.',
  past: 'La date d’examen est passée : mettez-la à jour dans les réglages pour la prochaine session.',
}

function listUes(ues: readonly string[]): string {
  return ues.length <= 1 ? ues.join('') : `${ues.slice(0, -1).join(', ')} et ${ues[ues.length - 1]}`
}

/** Plan de révision à rebours de la date d'examen (accueil). */
export function ExamPlanCard({ attempts, reviews, now }: { attempts: readonly Attempt[]; reviews: readonly Review[]; now: number }) {
  const { examDate, examUes, dailyGoal } = useSettings()
  const ues = examUes
  const plan = useMemo(
    () => (examDate && ues.length ? examPlan(examDate, ues, notionsByUe, notionProgress(attempts, reviews), now) : null),
    [examDate, ues, attempts, reviews, now],
  )

  if (!plan || !examDate) {
    return (
      <Card>
        <CardContent className="flex items-start gap-3 text-sm">
          <CalendarClock aria-hidden className="text-primary mt-0.5 size-5 shrink-0" />
          <div className="flex flex-col gap-2">
            <p>Indiquez la date de votre examen et vos UE pour obtenir un plan de révision et un rythme quotidien.</p>
            <Button asChild variant="outline" size="sm" className="self-start">
              <Link to="/reglages#examen">Renseigner mon examen</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const date = new Date(`${examDate}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  const countdown = plan.daysLeft > 1 ? `J-${plan.daysLeft}` : plan.daysLeft === 1 ? 'Demain' : plan.daysLeft === 0 ? 'Aujourd’hui' : 'Passé'
  const untouched = plan.perUe.filter((u) => u.seen === 0).map((u) => u.ue)
  const goal = DAILY_GOAL_CHOICES.reduce((best, c) => (Math.abs(c - plan.exercisesPerDay) < Math.abs(best - plan.exercisesPerDay) ? c : best))
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between gap-2">
          <span>Mon examen · {listUes(ues)}</span>
          <span className="text-primary text-xl font-bold tabular-nums">{countdown}</span>
        </CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span>
              {plan.seen} / {plan.total} notions travaillées · {plan.mastered} maîtrisées
            </span>
            <span className="tabular-nums">{plan.total ? Math.round((plan.seen / plan.total) * 100) : 0} %</span>
          </div>
          <div aria-hidden className="bg-muted relative h-2 overflow-hidden rounded-full">
            <div className="bg-primary/40 absolute inset-y-0 left-0" style={{ width: `${(plan.seen / Math.max(1, plan.total)) * 100}%` }} />
            <div className="bg-primary absolute inset-y-0 left-0" style={{ width: `${(plan.mastered / Math.max(1, plan.total)) * 100}%` }} />
          </div>
        </div>
        <p>{PHASE_TEXT[plan.phase]}</p>
        {plan.phase !== 'past' && (
          <p className="font-medium">
            Rythme conseillé : {plan.exercisesPerDay} exercices par jour
            {plan.newPerDay > 0 && `, dont ${plan.newPerDay} notion${plan.newPerDay > 1 ? 's' : ''} nouvelle${plan.newPerDay > 1 ? 's' : ''}`}.
            {goal !== dailyGoal && (
              <Button variant="link" size="sm" className="h-auto px-1" onClick={() => saveSettings({ dailyGoal: goal })}>
                En faire mon objectif ({goal})
              </Button>
            )}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {plan.phase !== 'past' && (
            <Button asChild size="sm">
              <Link to={`/session${sessionSearch({ mode: 'smart', seed: newSeed(), ues: [...ues] })}`}>Séance du jour</Link>
            </Button>
          )}
          {untouched.slice(0, 2).map((ue) => (
            <Button key={ue} asChild size="sm" variant="outline">
              <Link to={`/session${sessionSearch({ mode: 'diagnostic', seed: newSeed(), ue })}`}>Test de positionnement {ue}</Link>
            </Button>
          ))}
          {plan.phase === 'final' && (
            <Button asChild size="sm" variant="outline">
              <Link to="/entrainement#examen-blanc">Examen blanc</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
