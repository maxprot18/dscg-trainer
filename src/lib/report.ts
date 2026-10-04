/**
 * Bouton « signaler une erreur » : lien vers une nouvelle issue GitHub pré-remplie avec la
 * référence de l'exercice ou de la fiche.
 */
import type { Exercise } from '@/content/schema'

export const REPO_URL = 'https://github.com/maxprot18/dscg-trainer'

function issueUrl(title: string, lines: string[]): string {
  const body = [
    ...lines,
    `- Version de l'application : ${__APP_VERSION__}`,
    '',
    '**Quel est le problème ?** (réponse fausse, énoncé ambigu, référence erronée, faute…)',
    '',
    '',
    '**Correction proposée et source** (article, paragraphe de norme, compte PCG) :',
    '',
  ].join('\n')
  const params = new URLSearchParams({ title, body, labels: 'contenu' })
  return `${REPO_URL}/issues/new?${params.toString()}`
}

export function exerciseIssueUrl(ex: Exercise): string {
  return issueUrl(`Erreur dans l'exercice ${ex.id}`, [
    `- Exercice : \`${ex.id}\` (${ex.type}, niveau ${ex.difficulty})`,
    `- Notion : \`${ex.notion}\` (${ex.ue})`,
    `- Référence citée : ${ex.source_ref}`,
  ])
}

export function courseIssueUrl(notionId: string, title: string): string {
  return issueUrl(`Erreur dans la fiche ${notionId}`, [
    `- Fiche de cours : \`content/courses/${notionId}.md\` (${title})`,
  ])
}
