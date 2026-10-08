/**
 * Date de dernière révision de chaque fiche de cours (dernier commit qui l'a modifiée), calculée au build
 * et affichée sous la fiche : la revue annuelle du contenu devient visible.
 * Sans historique git complet (clone superficiel, archive), aucune date n'est donnée plutôt qu'une fausse.
 */
import { execFileSync } from 'node:child_process'

/** Lit la sortie de `git log --format=%cs --name-only` : `{ id de notion: AAAA-MM-JJ }`, date la plus récente. */
export function parseCourseDates(log: string): Record<string, string> {
  const dates: Record<string, string> = {}
  let current = ''
  for (const line of log.split('\n')) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(line)) current = line
    else {
      const id = line.match(/^content\/courses\/(.+)\.md$/)?.[1]
      if (id && current && !(id in dates)) dates[id] = current
    }
  }
  return dates
}

export function courseDates(root: string): Record<string, string> {
  try {
    const git = (...args: string[]) => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
    if (git('rev-parse', '--is-shallow-repository').trim() !== 'false') return {}
    return parseCourseDates(git('log', '--format=%cs', '--name-only', '--', 'content/courses'))
  } catch {
    return {}
  }
}
