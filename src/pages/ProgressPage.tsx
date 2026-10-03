import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { exportProgress } from '@/db/db'

async function downloadExport() {
  const data = await exportProgress()
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `dscg-progression-${data.exportedAt.slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function ProgressPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Progression</h1>
      <Card>
        <CardHeader>
          <CardTitle>Suivi par thème</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Taux de réussite, carte de chaleur et répétition espacée arrivent en phase 4.
        </CardContent>
      </Card>
      <Button variant="outline" onClick={() => void downloadExport()}>
        Exporter ma progression (JSON)
      </Button>
    </div>
  )
}
