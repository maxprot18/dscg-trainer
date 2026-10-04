/**
 * Saisie et affichage des nombres au format français.
 */

/**
 * Lit un nombre saisi librement : « 19 781,30 € », « 19781.3 », « -1 250 », « 12,5 % ».
 * Espaces (y compris insécables) et symboles d'unité sont ignorés. Si la saisie contient
 * à la fois « , » et « . », le dernier des deux est le séparateur décimal.
 * Retourne `null` si la saisie n'est pas un nombre.
 */
export function parseNumberInput(raw: string): number | null {
  let s = raw.trim().replace(/[\s  ]/g, '').replace(/[€$%]|eur$/gi, '')
  s = s.replace(/^−/, '-')
  if (s === '') return null
  const lastComma = s.lastIndexOf(',')
  const lastDot = s.lastIndexOf('.')
  if (lastComma >= 0 && lastDot >= 0) {
    const decimal = lastComma > lastDot ? ',' : '.'
    const thousands = decimal === ',' ? '.' : ','
    s = s.split(thousands).join('').replace(decimal, '.')
  } else if (lastComma >= 0) {
    s = s.replace(',', '.')
  }
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) return null
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

export function formatNumber(n: number, decimals?: number): string {
  return n.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? 2,
  })
}
