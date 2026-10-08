import { useCallback, useEffect, useRef, useState } from 'react'

export type RecorderState = 'idle' | 'recording' | 'stopped' | 'unsupported' | 'denied' | 'no-mic' | 'busy'

/**
 * Enregistrement audio local (MediaRecorder) : rien ne quitte l'appareil. L'enregistrement est
 * rendu sous forme d'URL locale (lecture et téléchargement), libérée au démontage.
 */
export function useRecorder() {
  const supported = typeof window !== 'undefined' && typeof window.MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia
  const [state, setState] = useState<RecorderState>(supported ? 'idle' : 'unsupported')
  const [url, setUrl] = useState<string | null>(null)
  const recorder = useRef<MediaRecorder | null>(null)
  const [mimeType, setMimeType] = useState('audio/webm')
  const chunks = useRef<Blob[]>([])

  const start = useCallback(async () => {
    if (!supported) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const rec = new MediaRecorder(stream)
      chunks.current = []
      rec.ondataavailable = (e) => e.data.size > 0 && chunks.current.push(e.data)
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        const blob = new Blob(chunks.current, { type: rec.mimeType || 'audio/webm' })
        setUrl((old) => {
          if (old) URL.revokeObjectURL(old)
          return URL.createObjectURL(blob)
        })
        setState('stopped')
      }
      rec.start()
      recorder.current = rec
      setMimeType(rec.mimeType || 'audio/webm')
      setState('recording')
    } catch (error) {
      // Refus de l'autorisation, absence de micro ou micro déjà utilisé : messages distincts.
      const name = error instanceof DOMException ? error.name : ''
      setState(name === 'NotFoundError' || name === 'OverconstrainedError' ? 'no-mic' : name === 'NotReadableError' ? 'busy' : 'denied')
    }
  }, [supported])

  const stop = useCallback(() => {
    if (recorder.current?.state === 'recording') recorder.current.stop()
  }, [])

  useEffect(
    () => () => {
      if (recorder.current?.state === 'recording') recorder.current.stop()
    },
    [],
  )
  useEffect(() => () => void (url && URL.revokeObjectURL(url)), [url])

  return { state, url, start, stop, mimeType }
}
