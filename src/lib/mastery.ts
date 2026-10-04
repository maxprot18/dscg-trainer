/** Couleurs des niveaux de maîtrise (carte du programme, listes de notions). */
import type { Mastery } from '@/engine/stats'

export const MASTERY_COLORS: Record<Mastery, string> = {
  new: 'bg-muted border-border',
  review: 'bg-red-400 border-red-500 dark:bg-red-700',
  progress: 'bg-amber-300 border-amber-400 dark:bg-amber-600',
  mastered: 'bg-emerald-500 border-emerald-600 dark:bg-emerald-600',
}

export const MASTERY_TEXT: Record<Mastery, string> = {
  new: 'text-muted-foreground',
  review: 'text-red-700 dark:text-red-400',
  progress: 'text-amber-700 dark:text-amber-400',
  mastered: 'text-emerald-700 dark:text-emerald-400',
}
