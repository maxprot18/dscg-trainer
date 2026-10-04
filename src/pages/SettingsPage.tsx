import { Download, RotateCcw, ShieldCheck, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

import { useInstallPrompt } from '@/hooks/useInstallPrompt'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { clearProgress, importProgress, type ProgressExport } from '@/db/db'
import { downloadBackup, isIosBrowserTab, requestPersistence, useStorageStatus } from '@/lib/backup'
import { DAILY_GOAL_CHOICES, saveSettings, SESSION_SIZE_CHOICES, useSettings } from '@/lib/settings'

const selectClass =
  'border-input bg-background focus-visible:ring-ring/50 h-10 rounded-md border px-3 text-sm outline-none focus-visible:ring-[3px]'

export function SettingsPage() {
  const settings = useSettings()
  const install = useInstallPrompt()
  const storage = useStorageStatus()
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
            <Button variant="outline" onClick={() => void downloadBackup()}>
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
          <p className="text-muted-foreground text-sm">
            {storage.lastBackup
              ? `Dernière sauvegarde depuis cet appareil : ${new Date(storage.lastBackup).toLocaleDateString('fr-FR')}.`
              : 'Aucune sauvegarde exportée depuis cet appareil.'}{' '}
            {storage.persisted === true
              ? 'Stockage protégé : le navigateur ne l’effacera pas pour gagner de la place.'
              : storage.persisted === false
                ? 'Stockage non protégé : le navigateur peut l’effacer s’il manque de place.'
                : ''}
            {isIosBrowserTab() && ' Sur iPhone, installez l’application : Safari efface les données d’un site après 7 jours sans visite.'}
          </p>
          {storage.persisted === false && storage.canPersist && (
            <Button
              variant="outline"
              className="self-start"
              onClick={() =>
                void requestPersistence().then((ok) =>
                  setMessage(ok ? 'Stockage protégé.' : 'Le navigateur a refusé : exportez régulièrement votre progression.'),
                )
              }
            >
              <ShieldCheck /> Protéger le stockage
            </Button>
          )}
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
