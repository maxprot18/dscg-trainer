import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { exercises } from '@/content/load'

export function TrainPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">S'entraîner</h1>
      <Card>
        <CardHeader>
          <CardTitle>Bientôt disponible</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Le moteur d'exercices (session rapide, session par thème) arrive en phase 1. {exercises.length} exercice(s)
          vérifié(s) sont déjà chargés.
        </CardContent>
      </Card>
    </div>
  )
}
