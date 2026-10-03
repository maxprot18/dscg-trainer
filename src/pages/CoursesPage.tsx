import { Badge } from '@/components/ui/badge'
import { taxonomy } from '@/content/load'

export function CoursesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Cours</h1>
      <p className="text-muted-foreground text-sm">Programme du DSCG, découpé en UE, thèmes et notions.</p>
      {taxonomy.ues.map((ue) => (
        <details key={ue.id} className="rounded-xl border p-4">
          <summary className="cursor-pointer font-semibold">
            {ue.id} — {ue.title}
          </summary>
          <div className="mt-3 flex flex-col gap-3">
            {ue.themes.map((theme) => (
              <details key={theme.id} className="pl-2">
                <summary className="cursor-pointer">
                  {theme.title} <Badge variant="secondary">{theme.notions.length}</Badge>
                </summary>
                <ul className="text-muted-foreground mt-2 list-disc pl-6 text-sm">
                  {theme.notions.map((notion) => (
                    <li key={notion.id}>{notion.title}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}
