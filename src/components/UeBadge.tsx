import type { UeId } from '@/content/schema'
import { ueStyle } from '@/content/ue'
import { cn } from '@/lib/utils'

/** Pastille d'UE : point de couleur de l'UE et texte dans la couleur du texte (jamais dans celle de la série). */
export function UeBadge({ ue, className, label }: { ue: UeId; className?: string; label?: string }) {
  return (
    <span
      style={ueStyle(ue)}
      className={cn('inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap', className)}
    >
      <span aria-hidden className="size-2 shrink-0 rounded-full bg-[var(--ue)]" />
      {label ?? ue}
    </span>
  )
}
