/** Identité visuelle des UE : variable CSS `--ue-UE4`, utilisable en style inline ou en classe arbitraire. */
import type { CSSProperties } from 'react'

import type { UeId } from './schema'

/** Style inline qui expose la couleur de l'UE sous `--ue` (ex. `className="bg-[var(--ue)]"`). */
export function ueStyle(ue: UeId): CSSProperties {
  return { '--ue': `var(--ue-${ue})` } as CSSProperties
}

/** Nom court d'une UE (« UE 4 »). */
export function ueShort(ue: UeId): string {
  return `UE ${ue.slice(2)}`
}
