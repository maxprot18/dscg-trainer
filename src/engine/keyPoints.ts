/**
 * Correction guidée des réponses rédigées : repère, dans la copie, les mots-clés de chaque point clé du
 * corrigé. Les points repérés sont pré-cochés ; l'utilisateur garde la main sur son auto-évaluation
 * (un mot présent ne prouve pas un raisonnement juste, une reformulation peut échapper au repérage).
 */

/** Mots trop fréquents pour signaler un point clé (français et anglais). */
const STOP_WORDS = new Set(
  `alors aussi autre autres avant avec avoir cela celle celles celui cette ceux chaque comme comment dans depuis
  doit donc dont elle elles encore entre etre fait faire leur leurs lors mais meme moins notre nous plus pour
  peut peuvent quand quel quelle quelles quels sans selon sont sous tout toute toutes tous tres vers votre vous
  ainsi article articles code doit cette sera seront etait etre lorsque deux trois
  about after also among and are because been being both but can could does each from have into its may
  more most must not only other over same should such than that the their them then there these they this
  those through under were what when where which while will with would`.split(/\s+/),
)

/** Minuscules, sans accents, ponctuation remplacée par des espaces. */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/** Racines significatives d'un texte : mots de 4 lettres ou plus (6 premières lettres), nombres de 2 chiffres ou plus. */
export function keywordStems(text: string): string[] {
  const stems = new Set<string>()
  for (const word of normalizeText(text).split(' ')) {
    if (/^\d+$/.test(word)) {
      if (word.length >= 2) stems.add(word)
    } else if (word.length >= 4 && !STOP_WORDS.has(word)) {
      stems.add(word.slice(0, 6))
    }
  }
  return [...stems]
}

/** Part des mots-clés d'un point clé retrouvés dans la copie (0 à 1). */
export function keyPointCoverage(point: string, answer: string): number {
  const wanted = keywordStems(point)
  if (wanted.length === 0) return 0
  const found = new Set(keywordStems(answer))
  return wanted.filter((s) => found.has(s)).length / wanted.length
}

/** Seuil de repérage : la moitié des mots-clés du point. */
export const KEY_POINT_THRESHOLD = 0.5

/** Points clés repérés dans la copie (pré-cochés). Une copie vide n'en repère aucun. */
export function suggestKeyPoints(points: readonly string[], answer: string): boolean[] {
  return points.map((p) => keyPointCoverage(p, answer) >= KEY_POINT_THRESHOLD)
}
