import { Download, RotateCcw, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

import { useInstallPrompt } from '@/hooks/useInstallPrompt'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { clearProgress, exportProgress, importProgress, type ProgressExport } from '@/db/db'
import { DAILY_GOAL_CHOICES, saveSettings, SESSION_SIZE_CHOICES, useSettings } from '@/lib/settings'

const selectClass =
  'border-input bg-background focus-visible:ring-ring/50 h-10 rounded-md border px-3 text-sm outline-none focus-visible:ring-[3px]'

async function downloadExport() {
  const data = await exportProgress()
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `dscg-progression-${data.exportedAt.slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function SettingsPage() {
  const settings = useSettings()
  const install = useInstallPrompt()
  const input = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string | null>(null)

  const onFile = async (file: File) => {
    try {
      const data = JSON.parse(await file.text()) as ProgressExport
      if (!window.confirm('Remplacer toute la progression de cet appareil par celle du fichier ?')) return
      await importProgress(data)
      setMessage(`Progression importée : ${data.attempts.length} tentatives, ${data.sessions.length} sessions.`)
    } catch (e) {
      setMessage(`Import impossible : ${e instanceof Error ? e.message : 'fichier illisible'}.`)
    }
  }

  const reset = async () => {
    if (!window.confirm('Effacer toute la progression de cet appareil ? Exportez-la d’abord si vous voulez la garder.')) return
    await clearProgress()
    setMessage('Progression effacée.')
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Réglages</h1>
      <Card>
        <CardHeader>
          <CardTitle>Entraînement</CardTitle>
          <CardDescription>Objectif affiché sur l’accueil et taille des sessions.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <label className="flex items-center justify-between gap-3 text-sm">
            Objectif quotidien
            <select
              className={selectClass}
              value={settings.dailyGoal}
              onChange={(e) => saveSettings({ dailyGoal: Number(e.target.value) })}
            >
              {DAILY_GOAL_CHOICES.map((n) => (
                <option key={n} value={n}>
                  {n} exercices par jour
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center justify-between gap-3 text-sm">
            Session par thème
            <select
              className={selectClass}
              value={settings.themeSessionSize}
              onChange={(e) => saveSettings({ themeSessionSize: Number(e.target.value) })}
            >
              {SESSION_SIZE_CHOICES.map((n) => (
                <option key={n} value={n}>
                  {n} exercices
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center justify-between gap-3 text-sm">
            Session de flashcards
            <select
              className={selectClass}
              value={settings.cardsSessionSize}
              onChange={(e) => saveSettings({ cardsSessionSize: Number(e.target.value) })}
            >
              {SESSION_SIZE_CHOICES.map((n) => (
                <option key={n} value={n}>
                  {n} cartes
                </option>
              ))}
            </select>
          </label>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Affichage</CardTitle>
          <CardDescription>Thème clair, sombre ou celui du système.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2">
            <ThemeToggle /> Changer de thème
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {install ? (
              <Button variant="outline" onClick={() => void install()}>
                <Download /> Installer l’application
              </Button>
            ) : (
              <p className="text-muted-foreground">
                Pour installer l’application : « Ajouter à l’écran d’accueil » dans le menu du navigateur (ou elle est déjà installée).
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sauvegarde</CardTitle>
          <CardDescription>
            La progression reste dans ce navigateur. Exportez-la pour la sauvegarder ou la reprendre sur un autre appareil.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => void downloadExport()}>
              <Download /> Exporter ma progression (JSON)
            </Button>
            <Button variant="outline" onClick={() => input.current?.click()}>
              <Upload /> Importer une progression
            </Button>
            <Button variant="outline" className="text-destructive" onClick={() => void reset()}>
              <RotateCcw /> Remettre à zéro
            </Button>
            <input
              ref={input}
              type="file"
              accept="application/json,.json"
              className="hidden"
              aria-label="Fichier de progression"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) void onFile(file)
                e.target.value = ''
              }}
            />
          </div>
          {message && (
            <p role="status" className="text-sm">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
