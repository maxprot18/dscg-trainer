/**
 * Mises à jour de l'application installée. Le service worker garde la version téléchargée pour le hors
 * ligne ; le navigateur ne revérifie qu'à l'ouverture d'une page, ce qui peut tarder pour une application
 * laissée ouverte ou installée sur l'écran d'accueil. On revérifie donc au retour au premier plan et toutes
 * les heures, et sur demande depuis les réglages. Une version trouvée s'annonce par le bandeau « Recharger ».
 */

/** Intervalle des vérifications automatiques. */
export const UPDATE_CHECK_INTERVAL_MS = 60 * 60 * 1000

/** Revérifie le service worker au retour au premier plan et à intervalle régulier ; renvoie l'arrêt. */
export function watchForUpdates(registration: ServiceWorkerRegistration): () => void {
  const check = () => {
    if (document.visibilityState === 'visible' && navigator.onLine !== false) void registration.update().catch(() => {})
  }
  const timer = window.setInterval(check, UPDATE_CHECK_INTERVAL_MS)
  document.addEventListener('visibilitychange', check)
  return () => {
    window.clearInterval(timer)
    document.removeEventListener('visibilitychange', check)
  }
}

export type UpdateCheck = 'update' | 'latest' | 'offline' | 'unavailable'

/** Vérification à la demande : « update » si une nouvelle version est téléchargée (ou en cours). */
export async function checkForUpdate(): Promise<UpdateCheck> {
  if (!('serviceWorker' in navigator)) return 'unavailable'
  if (navigator.onLine === false) return 'offline'
  const registration = await navigator.serviceWorker.getRegistration()
  if (!registration) return 'unavailable'
  try {
    await registration.update()
  } catch {
    return 'offline'
  }
  return registration.waiting || registration.installing ? 'update' : 'latest'
}
