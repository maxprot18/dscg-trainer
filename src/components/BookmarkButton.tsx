import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useLiveQuery } from 'dexie-react-hooks'

import { Button } from '@/components/ui/button'
import { db, toggleMark } from '@/db/db'

/** Bouton « à revoir plus tard » sur un exercice (`target` = id) ou une fiche (`notion:<id>`). */
export function BookmarkButton({ target, className }: { target: string; className?: string }) {
  const marked = useLiveQuery(
    async () => (await db.marks.where('[kind+target]').equals(['bookmark', target]).count()) > 0,
    [target],
    false,
  )
  const label = marked ? 'Retirer de « à revoir plus tard »' : 'À revoir plus tard'
  return (
    <Button
      variant={marked ? 'secondary' : 'ghost'}
      size="sm"
      className={className}
      aria-pressed={marked}
      aria-label={label}
      title={label}
      onClick={() => void toggleMark('bookmark', target)}
    >
      {marked ? <BookmarkCheck /> : <Bookmark />}
      {marked ? 'À revoir' : 'À revoir plus tard'}
    </Button>
  )
}
