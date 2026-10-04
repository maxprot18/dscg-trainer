import { Download, ShieldAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { downloadBackup, isIosBrowserTab, shouldRemindBackup, snoozeBackupReminder, useStorageStatus } from '@/lib/backup'

/** Rappel de sauvegarde sur l'accueil, quand la progression n'est garantie que par ce navigateur. */
export function BackupReminder({ attempts, now }: { attempts: number; now: number }) {
  const status = useStorageStatus()
  if (!shouldRemindBackup(attempts, status, now)) return null
  const ios = isIosBrowserTab()
  return (
    <section aria-label="Sauvegarde de la progression" className="border-warn/50 bg-warn/8 flex flex-col gap-2 rounded-xl border p-4 text-sm">
      <p className="flex gap-2 font-semibold">
        <ShieldAlert aria-hidden className="text-warn mt-0.5 size-4 shrink-0" />
        Votre progression n’est enregistrée que sur cet appareil
      </p>
      <p>
        {ios
          ? 'Sur iPhone et iPad, Safari efface les données d’un site après 7 jours sans visite. Installez l’application (Partager, puis « Sur l’écran d’accueil ») et gardez une sauvegarde.'
          : status.lastBackup
            ? 'Votre dernière sauvegarde date de plus de deux semaines. Exportez-la pour ne rien perdre si le navigateur efface ses données.'
            : 'Exportez une sauvegarde pour ne rien perdre si le navigateur efface ses données ou pour changer d’appareil.'}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => void downloadBackup()}>
          <Download /> Exporter ma progression
        </Button>
        <Button size="sm" variant="ghost" onClick={() => snoozeBackupReminder()}>
          Plus tard
        </Button>
      </div>
    </section>
  )
}
