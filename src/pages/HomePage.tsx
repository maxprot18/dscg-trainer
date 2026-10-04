import { Flame, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { taxonomy, useExercises } from '@/content/load'
import { useProgress } from '@/db/progress'
import { newSeed, sessionSearch } from '@/engine/sessionConfig'
import { currentStreak } from '@/engine/stats'

export function HomePage() {
  const exercises = useExercises()
  const progress = useProgress()
  const [now] = useState(() => Date.now())
  const notionCount = taxonomy.ues.reduce((n, ue) => n + ue.themes.reduce((m, t) => m + t.notions.length, 0), 0)
  const streak = progress ? currentStreak(progress.attempts, now) : 0
  const due = progress?.reviews.filter((r) => r.due <= now).length ?? 0

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold">DSCG Trainer</h1>
        <p className="text-muted-foreground">Audit, comptabilité, IFRS, consolidation, finance, droit et fiscalité.</p>
      </header>
      <Button asChild size="lg" className="h-14 text-lg">
        <Link to="/entrainement">S'entraîner</Link>
      </Button>
      {progress && progress.attempts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="size-5 text-orange-500" aria-hidden />
              {streak > 0 ? `${streak} jour${streak > 1 ? 's' : ''} d’affilée` : 'Reprenez votre série aujourd’hui'}
            </CardTitle>
            <CardDescription>
              {due > 0
                ? `${due} notion${due > 1 ? 's' : ''} à réviser aujourd’hui.`
                : 'Aucune révision échue : de nouvelles notions vous attendent.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to={`/session${sessionSearch({ mode: 'smart', seed: newSeed() })}`}>Lancer la révision intelligente</Link>
            </Button>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Contenu disponible</CardTitle>
          <CardDescription>Programme officiel du DSCG (arrêté du 4 août 2025)</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <Stat value={exercises?.length ?? '…'} label="exercices" />
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
