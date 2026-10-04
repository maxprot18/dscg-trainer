import { Monitor, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme, type ThemePreference } from '@/lib/theme'

const LABELS: Record<ThemePreference, string> = {
  system: 'Thème : celui du système',
  light: 'Thème : clair',
  dark: 'Thème : sombre',
}

/** Bouton de thème : système → clair → sombre. */
export function ThemeToggle() {
  const [preference, cycle] = useTheme()
  const Icon = preference === 'dark' ? Moon : preference === 'light' ? Sun : Monitor
  return (
    <Button variant="ghost" size="icon" onClick={cycle} aria-label={`${LABELS[preference]} (changer)`} title={LABELS[preference]}>
      <Icon />
    </Button>
  )
}
