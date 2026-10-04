import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { taxonomy, useExercises } from '@/content/load'
import type { Exercise, UeId } from '@/content/schema'
import { QUICK_SESSION_SECONDS, QUICK_SESSION_SIZE } from '@/engine/session'
import { newSeed, sessionSearch } from '@/engine/sessionConfig'

const selectClass =
  'border-input bg-background focus-visible:ring-ring/50 h-10 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-[3px]'

export function TrainPage() {
  const exercises = useExercises()
  if (!exercises) return <p className="text-muted-foreground">Chargement des exercices…</p>
  return <TrainChooser exercises={exercises} />
}

function TrainChooser({ exercises }: { exercises: Exercise[] }) {
  const navigate = useNavigate()
  const counts = useMemo(() => {
    const map = new Map<string, number>()
    const add = (key: string) => map.set(key, (map.get(key) ?? 0) + 1)
    for (const e of exercises) {
      add(e.ue)
      add(`${e.ue}/${e.theme}`)
      add(`notion:${e.notion}`)
    }
    return map
  }, [exercises])
  const count = (key: string) => counts.get(key) ?? 0

  const firstUe = taxonomy.ues.find((u) => count(u.id) > 0)?.id ?? taxonomy.ues[0].id
  const [ue, setUe] = useState<UeId>(firstUe)
  const [theme, setTheme] = useState('')
  const [notion, setNotion] = useState('')
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
            disabled={exercises.length === 0}
            onClick={() => navigate(`/session${sessionSearch({ mode: 'quick', seed: newSeed() })}`)}
          >
            Lancer une session rapide
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
            {available === 0 ? 'Aucun exercice pour l’instant' : `Commencer (${Math.min(available, 20)} exercices)`}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
