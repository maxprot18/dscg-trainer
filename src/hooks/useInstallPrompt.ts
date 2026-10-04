/**
 * Invite d'installation de la PWA : l'événement `beforeinstallprompt` est gardé pour que le
 * bouton « Installer » reste disponible (bandeau et réglages).
 */
import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferredInstall: BeforeInstallPromptEvent | null = null
const installListeners = new Set<() => void>()
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredInstall = e as BeforeInstallPromptEvent
    for (const l of installListeners) l()
  })
  window.addEventListener('appinstalled', () => {
    deferredInstall = null
    for (const l of installListeners) l()
  })
}

/** Invite d'installation si le navigateur la propose ; `null` sinon. */
export function useInstallPrompt(): (() => Promise<void>) | null {
  const [, force] = useState(0)
  useEffect(() => {
    const l = () => force((n) => n + 1)
    installListeners.add(l)
    return () => {
      installListeners.delete(l)
    }
  }, [])
  if (!deferredInstall) return null
  return async () => {
    const event = deferredInstall
    if (!event) return
    await event.prompt()
    await event.userChoice
    deferredInstall = null
    for (const l of installListeners) l()
  }
}

