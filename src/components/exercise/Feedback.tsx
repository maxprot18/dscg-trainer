import { CircleCheck, CircleX } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Verdict({ correct, score, label }: { correct: boolean; score?: number; label?: string }) {
  const partial = !correct && score !== undefined && score > 0
  return (
    <div
      role="status"
      className={cn(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
        correct
          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
          : partial
            ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
            : 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200',
      )}
    >
      {correct ? <CircleCheck className="size-4" aria-hidden /> : <CircleX className="size-4" aria-hidden />}
      {label ?? (correct ? 'Bonne réponse' : partial ? `Réponse partielle (${Math.round(score * 100)} %)` : 'Réponse incorrecte')}
    </div>
  )
}

export function Explanation({ children }: { children: string }) {
  return <p className="text-muted-foreground text-sm whitespace-pre-line">{children}</p>
}
