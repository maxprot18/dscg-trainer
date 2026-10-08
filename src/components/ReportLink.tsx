import { Flag } from 'lucide-react'

/** Lien discret vers une issue GitHub pré-remplie (s'ouvre dans un nouvel onglet). */
export function ReportLink({ href, label = 'Signaler une erreur' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground inline-flex min-h-9 items-center gap-1 self-start py-2 text-xs underline-offset-2 hover:underline"
    >
      <Flag className="size-3" aria-hidden /> {label}
    </a>
  )
}
