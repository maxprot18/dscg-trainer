import { BookOpen, ChartColumn, Dumbbell, House } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'

import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Accueil', icon: House },
  { to: '/entrainement', label: "S'entraîner", icon: Dumbbell },
  { to: '/cours', label: 'Cours', icon: BookOpen },
  { to: '/progression', label: 'Progression', icon: ChartColumn },
]

export function Layout() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col">
      <header className="flex items-center justify-between px-4 pt-3">
        <Link to="/" className="text-muted-foreground text-sm font-semibold">
          DSCG Trainer
        </Link>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 px-4 pt-3 pb-24">
        <Outlet />
      </main>
      <nav className="bg-background/95 fixed inset-x-0 bottom-0 border-t backdrop-blur" aria-label="Navigation principale">
        <ul className="mx-auto grid max-w-3xl grid-cols-4">
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
