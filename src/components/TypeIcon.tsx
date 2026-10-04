import {
  BookOpen,
  Calculator,
  CircleHelp,
  GitFork,
  ListChecks,
  Receipt,
  SearchCheck,
  ToggleLeft,
  type LucideIcon,
} from 'lucide-react'

import type { Exercise } from '@/content/schema'

const TYPE_ICONS: Record<Exercise['type'], LucideIcon> = {
  mcq: ListChecks,
  true_false: ToggleLeft,
  numeric: Calculator,
  journal_entry: Receipt,
  case_study: BookOpen,
  consolidation_case: GitFork,
  audit_case: SearchCheck,
  flashcard: CircleHelp,
}

export function TypeIcon({ type, className = 'size-4' }: { type: Exercise['type']; className?: string }) {
  const Icon = TYPE_ICONS[type]
  return <Icon className={className} aria-hidden />
}
