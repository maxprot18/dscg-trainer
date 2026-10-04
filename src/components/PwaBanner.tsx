/**
 * Bandeaux PWA : nouvelle version disponible (recharger) et installation de l'application.
 * L'événement `beforeinstallprompt` est gardé pour que le bouton « Installer » reste disponible.
 */
import { Download, RefreshCw, X } from 'lucide-react'
import { useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

import { Button } from '@/components/ui/button'
import { useInstallPrompt } from '@/hooks/useInstallPrompt'

const INSTALL_DISMISSED_KEY = 'dscg-install-dismissed'

export function PwaBanner() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()
  const install = useInstallPrompt()
  const [installDismissed, setInstallDismissed] = useState(() => {
    try {
      return localStorage.getItem(INSTALL_DISMISSED_KEY) === '1'
    } catch {
      return false
    }
  })

  if (needRefresh) {
    return (
      <div role="status" className="bg-primary text-primary-foreground flex items-center justify-between gap-3 px-4 py-2 text-sm">
        <span>Nouvelle version disponible.</span>
        <span className="flex items-center gap-1">
          <Button size="sm" variant="secondary" onClick={() => void updateServiceWorker(true)}>
            <RefreshCw /> Recharger
          </Button>
          <Button size="icon" variant="ghost" aria-label="Plus tard" onClick={() => setNeedRefresh(false)}>
            <X />
          </Button>
        </span>
      </div>
    )
  }
  if (install && !installDismissed) {
    return (
      <div role="status" className="bg-muted flex items-center justify-between gap-3 px-4 py-2 text-sm">
        <span>Installez l’application pour l’avoir hors ligne sur l’écran d’accueil.</span>
        <span className="flex items-center gap-1">
          <Button size="sm" onClick={() => void install()}>
            <Download /> Installer
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Ne plus proposer"
            onClick={() => {
              setInstallDismissed(true)
              try {
                localStorage.setItem(INSTALL_DISMISSED_KEY, '1')
              } catch {
                // stockage indisponible
              }
            }}
          >
            <X />
          </Button>
        </span>
      </div>
    )
  }
  return null
}
