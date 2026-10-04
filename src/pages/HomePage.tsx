import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { taxonomy, useExercises } from '@/content/load'

export function HomePage() {
  const exercises = useExercises()
  const notionCount = taxonomy.ues.reduce((n, ue) => n + ue.themes.reduce((m, t) => m + t.notions.length, 0), 0)
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold">DSCG Trainer</h1>
        <p className="text-muted-foreground">Audit, comptabilité, IFRS, consolidation, finance, droit et fiscalité.</p>
      </header>
      <Button asChild size="lg" className="h-14 text-lg">
        <Link to="/entrainement">S'entraîner</Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Contenu disponible</CardTitle>
          <CardDescription>Programme officiel du DSCG (arrêté du 4 août 2025)</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
          <Stat value={exercises?.length ?? '…'} label="exercices" />
          <Stat value={notionCount} label="notions" />
          <Stat value={taxonomy.ues.length} label="UE" />
        </CardContent>
      </Card>
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
