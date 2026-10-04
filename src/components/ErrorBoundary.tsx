import { RotateCw } from 'lucide-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { errorIssueUrl, isStaleChunkError, logError, type LoggedError } from '@/lib/errorLog'

interface State {
  failed: boolean
  entry: LoggedError | null
  stale: boolean
}

/**
 * Filet de sécurité des écrans : une erreur affiche un message avec « Recharger » et « Signaler »
 * (issue pré-remplie) au lieu d'une page blanche ; l'en-tête et la navigation restent utilisables.
 * `resetKey` (la route) efface l'erreur quand on change d'écran.
 */
export class ErrorBoundary extends Component<{ children: ReactNode; resetKey: string }, State & { key: string }> {
  state: State & { key: string } = { failed: false, entry: null, stale: false, key: this.props.resetKey }

  static getDerivedStateFromError(error: unknown): Partial<State> {
    return { failed: true, stale: isStaleChunkError(error) }
  }

  static getDerivedStateFromProps(props: { resetKey: string }, state: State & { key: string }) {
    return props.resetKey !== state.key ? { failed: false, entry: null, stale: false, key: props.resetKey } : null
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    const entry = logError(error)
    if (info.componentStack && !entry.stack) entry.stack = info.componentStack.split('\n').slice(0, 8).join('\n')
    this.setState({ entry })
  }

  render() {
    const { failed, entry, stale } = this.state
    if (!failed) return this.props.children
    return (
      <div role="alert" className="flex flex-col gap-3 rounded-xl border p-4">
        <h1 className="text-lg font-semibold">{stale ? 'Une nouvelle version est disponible' : 'Une erreur est survenue'}</h1>
        <p className="text-muted-foreground text-sm">
          {stale
            ? 'Cet écran a changé depuis votre dernière visite. Rechargez la page pour l’afficher.'
            : 'Votre progression n’est pas touchée. Rechargez la page ; si l’erreur revient, signalez-la pour qu’elle soit corrigée.'}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => location.reload()}>
            <RotateCw /> Recharger
          </Button>
          {entry && !stale && (
            <Button asChild variant="outline">
              <a href={errorIssueUrl(entry)} target="_blank" rel="noopener noreferrer">
                Signaler l’erreur
              </a>
            </Button>
          )}
        </div>
        {entry && !stale && <p className="text-muted-foreground font-mono text-xs break-words">{entry.message}</p>}
      </div>
    )
  }
}
