/** Identité visuelle des UE : variable CSS `--ue-UE4`, utilisable en style inline ou en classe arbitraire. */
import type { UeId } from './schema'

/** Style inline qui expose la couleur de l'UE sous `--ue` (ex. `className="bg-[var(--ue)]"`). */
export function ueStyle(ue: UeId): { ['--ue']: string } {
  return { '--ue': `var(--ue-${ue})` }
}

/** Nom court d'une UE (« UE 4 »). */
export function ueShort(ue: UeId): string {
  return `UE ${ue.slice(2)}`
}
