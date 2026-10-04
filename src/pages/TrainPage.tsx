import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { examDurations, exerciseCount, taxonomy, useExercises } from '@/content/load'
import type { UeId } from '@/content/schema'
import { useProgress } from '@/db/progress'
import { buildExamSession, QUICK_SESSION_SECONDS, QUICK_SESSION_SIZE, SMART_SESSION_SIZE } from '@/engine/session'
import { useSettings } from '@/lib/settings'
import { newSeed, sessionSearch } from '@/engine/sessionConfig'
import { failedExerciseIds } from '@/engine/stats'

const selectClass =
  'border-input bg-background focus-visible:ring-ring/50 h-10 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-[3px]'

/**
 * Choix du mode d'entraînement. L'écran s'affiche tout de suite avec les nombres d'exercices
 * calculés au build ; le contenu se charge en arrière-plan pour l'examen blanc et les erreurs.
 */
export function TrainPage() {
  const navigate = useNavigate()
  const exercises = useExercises()
  const count = exerciseCount

  const firstUe = taxonomy.ues.find((u) => count(u.id) > 0)?.id ?? taxonomy.ues[0].id
  const progress = useProgress()
  const [now] = useState(() => Date.now())
  const dueCount = progress?.reviews.filter((r) => r.due <= now).length ?? 0
  const knownIds = useMemo(() => new Set((exercises ?? []).map((e) => e.id)), [exercises])
  const errorCount =
    progress && exercises ? failedExerciseIds(progress.attempts).filter((id) => knownIds.has(id)).length : 0
  const [examUe, setExamUe] = useState<UeId>(firstUe)
  const [diagUe, setDiagUe] = useState<UeId>(firstUe)
  const examSize = useMemo(
    () => (exercises ? buildExamSession(exercises, examUe, examDurations[examUe], 0).length : null),
    [exercises, examUe],
  )
  const [ue, setUe] = useState<UeId>(firstUe)
  const [theme, setTheme] = useState('')
  const [notion, setNotion] = useState('')
  const settings = useSettings()
  // Flashcards : comptées sur le contenu chargé (les nombres calculés au build ne distinguent pas les types).
  const [cardsUe, setCardsUe] = useState<UeId | ''>('')
  const [cardsTheme, setCardsTheme] = useState('')
  const cardCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const e of exercises ?? []) {
      if (e.type !== 'flashcard') continue
      for (const key of ['total', e.ue, `${e.ue}/${e.theme}`]) map.set(key, (map.get(key) ?? 0) + 1)
    }
    return map
  }, [exercises])
  const cardsAvailable = cardCounts.get(cardsUe ? (cardsTheme ? `${cardsUe}/${cardsTheme}` : cardsUe) : 'total') ?? 0
  const ueData = taxonomy.ues.find((u) => u.id === ue)!
  const themeData = ueData.themes.find((t) => t.id === theme)
  const available = notion ? count(`notion:${notion}`) : theme ? count(`${ue}/${theme}`) : count(ue)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">S'entraîner</h1>
      <Card>
        <CardHeader>
          <CardTitle>Session rapide</CardTitle>
          <CardDescription>
            {QUICK_SESSION_SIZE} questions mélangées, {QUICK_SESSION_SECONDS / 60} minutes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            size="lg"
            className="w-full"
            disabled={count('total') === 0}
            onClick={() => navigate(`/session${sessionSearch({ mode: 'quick', seed: newSeed() })}`)}
          >
            Lancer une session rapide
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Révision intelligente</CardTitle>
          <CardDescription>
            {dueCount > 0
              ? `${dueCount} notion${dueCount > 1 ? 's' : ''} à réviser aujourd’hui (répétition espacée), complétées par des notions nouvelles.`
              : 'Aucune révision échue : la session propose des notions nouvelles ou bientôt à revoir.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            size="lg"
            className="w-full"
            disabled={count('total') === 0}
            onClick={() => navigate(`/session${sessionSearch({ mode: 'smart', seed: newSeed() })}`)}
          >
            Réviser ({SMART_SESSION_SIZE} exercices au plus)
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mode erreurs</CardTitle>
          <CardDescription>Rejouer les exercices dont la dernière tentative est ratée.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            disabled={errorCount === 0}
            aria-busy={!exercises}
            onClick={() => navigate(`/session${sessionSearch({ mode: 'errors', seed: newSeed() })}`)}
          >
            {errorCount === 0 ? 'Aucune erreur à rejouer' : `Rejouer mes erreurs (${Math.min(errorCount, 20)})`}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Test de positionnement</CardTitle>
          <CardDescription>
            Une question par thème de l’UE, sans chrono, pour savoir d’où vous partez ; les résultats alimentent la révision
            intelligente.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm">
            UE à tester
            <select className={selectClass} value={diagUe} onChange={(e) => setDiagUe(e.target.value as UeId)}>
              {taxonomy.ues.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.id} — {u.title} ({u.themes.length} thèmes)
                </option>
              ))}
            </select>
          </label>
          <Button
            size="lg"
            variant="outline"
            disabled={count(diagUe) === 0}
            onClick={() => navigate(`/session${sessionSearch({ mode: 'diagnostic', seed: newSeed(), ue: diagUe })}`)}
          >
            Commencer le test ({taxonomy.ues.find((u) => u.id === diagUe)!.themes.length} questions environ)
          </Button>
        </CardContent>
      </Card>
      <Card id="examen-blanc" className="scroll-mt-4">
        <CardHeader>
          <CardTitle>Examen blanc</CardTitle>
          <CardDescription>
            Sujet type d’une UE, chronométré à la durée de l’épreuve, noté sur 20, correction à la fin.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm">
            UE de l’examen
            <select className={selectClass} value={examUe} onChange={(e) => setExamUe(e.target.value as UeId)}>
              {taxonomy.ues.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.id} — {u.title} ({formatDuration(examDurations[u.id])})
                </option>
              ))}
            </select>
          </label>
          <Button
            size="lg"
            variant="outline"
            disabled={!examSize}
            onClick={() => navigate(`/session${sessionSearch({ mode: 'exam', seed: newSeed(), ue: examUe })}`)}
          >
            {examSize === null
              ? 'Préparation du sujet…'
              : examSize === 0
              ? 'Pas encore assez d’exercices'
              : `Commencer l’examen (${examSize} exercices, ${formatDuration(examDurations[examUe])})`}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Session par thème</CardTitle>
          <CardDescription>Choisissez une UE, puis éventuellement un thème et une notion.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm">
            UE
            <select
              className={selectClass}
              value={ue}
              onChange={(e) => {
                setUe(e.target.value as UeId)
                setTheme('')
                setNotion('')
              }}
            >
              {taxonomy.ues.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.id} — {u.title} ({count(u.id)})
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Thème
            <select
              className={selectClass}
              value={theme}
              onChange={(e) => {
                setTheme(e.target.value)
                setNotion('')
              }}
            >
              <option value="">Tous les thèmes</option>
              {ueData.themes.map((t) => (
                <option key={t.id} value={t.id} disabled={count(`${ue}/${t.id}`) === 0}>
                  {t.title} ({count(`${ue}/${t.id}`)})
                </option>
              ))}
            </select>
          </label>
          {themeData && (
            <label className="flex flex-col gap-1 text-sm">
              Notion
              <select className={selectClass} value={notion} onChange={(e) => setNotion(e.target.value)}>
                <option value="">Toutes les notions</option>
                {themeData.notions.map((n) => (
                  <option key={n.id} value={n.id} disabled={count(`notion:${n.id}`) === 0}>
                    {n.title} ({count(`notion:${n.id}`)})
                  </option>
                ))}
              </select>
            </label>
          )}
          <Button
            size="lg"
            disabled={available === 0}
            onClick={() =>
              navigate(
                `/session${sessionSearch({
                  mode: 'theme',
                  seed: newSeed(),
                  scope: { ue, theme: theme || undefined, notion: notion || undefined },
                })}`,
              )
            }
          >
            {available === 0
              ? 'Aucun exercice pour l’instant'
              : `Commencer (${Math.min(available, settings.themeSessionSize)} exercices)`}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Flashcards</CardTitle>
          <CardDescription>
            Définitions, seuils et vocabulaire en recto / verso. Les cartes ratées reviennent dans la révision intelligente.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm">
            UE
            <select
              className={selectClass}
              value={cardsUe}
              onChange={(e) => {
                setCardsUe(e.target.value as UeId | '')
                setCardsTheme('')
              }}
            >
              <option value="">Toutes les UE ({cardCounts.get('total') ?? '…'})</option>
              {taxonomy.ues.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.id} — {u.title} ({cardCounts.get(u.id) ?? 0})
                </option>
              ))}
            </select>
          </label>
          {cardsUe && (
            <label className="flex flex-col gap-1 text-sm">
              Thème
              <select className={selectClass} value={cardsTheme} onChange={(e) => setCardsTheme(e.target.value)}>
                <option value="">Tous les thèmes</option>
                {taxonomy.ues
                  .find((u) => u.id === cardsUe)!
                  .themes.map((t) => (
                    <option key={t.id} value={t.id} disabled={!cardCounts.get(`${cardsUe}/${t.id}`)}>
                      {t.title} ({cardCounts.get(`${cardsUe}/${t.id}`) ?? 0})
                    </option>
                  ))}
              </select>
            </label>
          )}
          <Button
            size="lg"
            variant="outline"
            disabled={cardsAvailable === 0}
            aria-busy={!exercises}
            onClick={() =>
              navigate(
                `/session${sessionSearch({
                  mode: 'cards',
                  seed: newSeed(),
                  scope: cardsUe ? { ue: cardsUe, theme: cardsTheme || undefined } : undefined,
                })}`,
              )
            }
          >
            {!exercises
              ? 'Chargement des cartes…'
              : cardsAvailable === 0
                ? 'Aucune carte pour cette sélection'
                : `Réviser les cartes (${Math.min(cardsAvailable, settings.cardsSessionSize)})`}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function formatDuration(minutes: number): string {
  return minutes >= 60 ? `${Math.floor(minutes / 60)} h${minutes % 60 ? ` ${minutes % 60}` : ''}` : `${minutes} min`
}
