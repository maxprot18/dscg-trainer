import { BookOpen, ChartColumn, Dumbbell, House, Search, Settings } from 'lucide-react'
import { Suspense, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { PwaBanner } from '@/components/PwaBanner'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { useKeyboard } from '@/hooks/useKeyboard'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Accueil', icon: House },
  { to: '/entrainement', label: "S'entraîner", icon: Dumbbell },
  { to: '/cours', label: 'Cours', icon: BookOpen },
  { to: '/progression', label: 'Progression', icon: ChartColumn },
]

export function Layout() {
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()
  // « / » ouvre la recherche (hors saisie dans un champ).
  useKeyboard((key) => (key === '/' ? (navigate('/recherche'), true) : false), true)
  // Liens vers une ancre (`/entrainement#examen-blanc`) : défilement jusqu'à l'élément une fois l'écran chargé.
  useEffect(() => {
    if (!hash) return
    let tries = 0
    const timer = window.setInterval(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target || ++tries > 20) {
        window.clearInterval(timer)
        target?.scrollIntoView({ block: 'start' })
      }
    }, 100)
    return () => window.clearInterval(timer)
  }, [pathname, hash])
  // En session, pas de barre de navigation : un toucher malheureux ne fait pas quitter l'exercice (sortie par ✕).
  const inSession = pathname === '/session'
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col lg:max-w-5xl">
      <a
        href="#contenu"
        className="bg-primary text-primary-foreground sr-only z-50 rounded-md px-3 py-2 focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Aller au contenu
      </a>
      <PwaBanner />
      <header className="no-print flex items-center justify-between px-4 pt-3">
        <Link to="/" className="text-muted-foreground text-sm font-semibold">
          DSCG Trainer
        </Link>
        <div className="flex items-center">
          <Button asChild variant="ghost" size="icon">
            <Link to="/recherche" aria-label="Rechercher (raccourci /)" title="Rechercher (/)">
              <Search />
            </Link>
          </Button>
          <ThemeToggle />
          <Button asChild variant="ghost" size="icon">
            <Link to="/reglages" aria-label="Réglages" title="Réglages">
              <Settings />
            </Link>
          </Button>
        </div>
      </header>
      <main id="contenu" tabIndex={-1} className={cn('flex-1 px-4 pt-3 outline-none', inSession ? 'pb-8' : 'pb-24')}>
        {/* Les écrans sont chargés à la demande : l'en-tête et la navigation restent affichés. */}
        <ErrorBoundary resetKey={pathname}>
          <Suspense fallback={<p className="text-muted-foreground">Chargement…</p>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <nav
        className={cn('bg-background/95 fixed inset-x-0 bottom-0 border-t backdrop-blur', inSession && 'hidden')}
        aria-label="Navigation principale"
      >
        <ul className="mx-auto grid max-w-3xl grid-cols-4 lg:max-w-5xl">
          {links.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-1 py-2 text-xs',
                    isActive ? 'text-primary font-semibold' : 'text-muted-foreground',
                  )
                }
              >
                <Icon className="size-5" aria-hidden />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
