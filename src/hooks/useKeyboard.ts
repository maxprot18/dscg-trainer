import { useEffect, useLayoutEffect, useRef } from 'react'

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

/**
 * Raccourcis clavier (1-9 pour répondre, Entrée pour valider), ignorés pendant la saisie
 * dans un champ. Le gestionnaire reçoit `event.key` et retourne true s'il a traité la touche.
 */
export function useKeyboard(handler: (key: string) => boolean | void, enabled: boolean) {
  const ref = useRef(handler)
  useLayoutEffect(() => {
    ref.current = handler
  })
  useEffect(() => {
    if (!enabled) return
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return
      if (ref.current(e.key)) e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enabled])
}
