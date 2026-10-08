/**
 * Saisie et correction d'une partie d'exercice (choix, vrai/faux, calcul, écriture,
 * réponse rédigée, flashcard). Chaque composant gère sa saisie, appelle `onSubmit`
 * avec la réponse, puis s'affiche en lecture seule avec la correction.
 */
import { Check, Plus, Scale, Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import type {
  AccountCheck,
  ChoiceResponse,
  JournalResponse,
  OpenResponse,
  PartResponse,
  PartResult,
} from '@/engine/grading'
import { PCG_ACCOUNTS, pcgLabel } from '@/content/pcg'
import { suggestKeyPoints } from '@/engine/keyPoints'
import { formatNumber, parseNumberInput } from '@/engine/numbers'
import type { BooleanPart, ChoicePart, FlashcardPart, JournalPart, NumericPart, OpenPart, Part } from '@/engine/parts'
import { Markdown } from '@/components/Markdown'
import { useKeyboard } from '@/hooks/useKeyboard'
import { cn } from '@/lib/utils'

import { Explanation, Verdict } from './Feedback'
import { emptyLine, toJournalLines, type DraftLine } from './journalDraft'

export interface PartProps<P> {
  part: P
  /** Réponse déjà donnée (affichage corrigé). */
  response?: PartResponse
  result?: PartResult
  /** Seule la partie active réagit aux raccourcis clavier. */
  active: boolean
  onSubmit: (response: PartResponse) => void
  /** Examen : aucune correction pendant l'épreuve (réponse rédigée enregistrée sans corrigé). */
  deferred?: boolean
  /** Examen : réponse déjà enregistrée, saisie verrouillée et boutons de validation masqués. */
  locked?: boolean
}

export function PartView(props: PartProps<Part>) {
  const { part } = props
  return (
    <section className="flex flex-col gap-3" aria-label={part.prompt ?? 'Réponse'}>
      {part.prompt && <p className="font-medium whitespace-pre-line">{part.prompt}</p>}
      {part.kind === 'choice' && <ChoiceInput {...props} part={part} />}
      {part.kind === 'boolean' && <BooleanInput {...props} part={part} />}
      {part.kind === 'numeric' && <NumericInput {...props} part={part} />}
      {part.kind === 'journal' && <JournalInput {...props} part={part} />}
      {part.kind === 'open' && <OpenInput {...props} part={part} />}
      {part.kind === 'flashcard' && <FlashcardInput {...props} part={part} />}
      {props.result && part.kind !== 'flashcard' && part.kind !== 'open' && (
        <Verdict correct={props.result.correct} score={props.result.score} />
      )}
      {props.result && part.explanation && <Explanation>{part.explanation}</Explanation>}
      {props.locked && <p className="text-muted-foreground text-xs">Réponse enregistrée : correction à la fin de l’examen.</p>}
    </section>
  )
}

function ChoiceInput({ part, response, result, active, onSubmit, locked }: PartProps<ChoicePart>) {
  const [selected, setSelected] = useState<number[]>([])
  const done = result !== undefined
  const shown = done ? (response as ChoiceResponse).selected : selected
  const toggle = (i: number) => {
    if (done) return
    setSelected((s) => (part.multiple ? (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]) : [i]))
  }
  const submit = () => selected.length > 0 && onSubmit({ kind: 'choice', selected })
  useKeyboard((key) => {
    const n = Number(key)
    if (n >= 1 && n <= part.options.length) return toggle(n - 1), true
    if (key === 'Enter' && selected.length > 0) return submit(), true
    return false
  }, active && !done)

  return (
    <div className="flex flex-col gap-2">
      {part.multiple && !done && <p className="text-muted-foreground text-xs">Plusieurs réponses possibles.</p>}
      <ul className="flex flex-col gap-2" role={part.multiple ? 'group' : 'radiogroup'}>
        {part.options.map((option, i) => {
          const isSelected = shown.includes(i)
          const isAnswer = part.answer.includes(i)
          return (
            // La liste porte le rôle de groupe de choix : ses éléments ne sont pas des éléments de liste.
            <li key={i} role="none">
              <button
                type="button"
                role={part.multiple ? 'checkbox' : 'radio'}
                aria-checked={isSelected}
                disabled={done}
                onClick={() => toggle(i)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors',
                  !done && 'hover:bg-accent',
                  !done && isSelected && 'border-primary bg-primary/5 ring-primary ring-1',
                  done && isAnswer && 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950',
                  done && isSelected && !isAnswer && 'border-red-600 bg-red-50 dark:bg-red-950',
                )}
              >
                <span className="text-muted-foreground mt-0.5 w-4 shrink-0 text-xs font-semibold">{i + 1}</span>
                <span className="flex-1">
                  {option}
                  {done && part.option_explanations?.[i] && (
                    <span className="text-muted-foreground mt-1 block text-xs">{part.option_explanations[i]}</span>
                  )}
                </span>
                {done && isAnswer && <Check className="size-4 shrink-0 text-emerald-700 dark:text-emerald-400" aria-label="bonne réponse" />}
                {done && isSelected && !isAnswer && (
                  <X className="size-4 shrink-0 text-red-700 dark:text-red-400" aria-label="mauvaise réponse" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
      {!done && !locked && (
        <Button onClick={submit} disabled={selected.length === 0} className="self-start">
          Valider
        </Button>
      )}
    </div>
  )
}

function BooleanInput({ part, response, result, active, onSubmit, locked }: PartProps<BooleanPart>) {
  // Choix gardé pour l'afficher (sans correction) quand la réponse est verrouillée en examen.
  const [chosen, setChosen] = useState<boolean | null>(null)
  const done = result !== undefined
  const given = done && response?.kind === 'boolean' ? response.value : undefined
  const choose = (value: boolean) => {
    setChosen(value)
    onSubmit({ kind: 'boolean', value })
  }
  useKeyboard((key) => {
    if (key === '1') return choose(true), true
    if (key === '2') return choose(false), true
    return false
  }, active && !done && !locked)
  return (
    <div className="grid grid-cols-2 gap-2">
      {[true, false].map((value, i) => (
        <Button
          key={String(value)}
          variant="outline"
          size="lg"
          disabled={done || locked}
          aria-pressed={locked ? chosen === value : undefined}
          onClick={() => choose(value)}
          className={cn(
            locked && !done && chosen === value && 'border-primary ring-primary opacity-100 ring-1',
            done && value === part.answer && 'border-emerald-600 bg-emerald-50 opacity-100 dark:bg-emerald-950',
            done && given === value && value !== part.answer && 'border-red-600 bg-red-50 opacity-100 dark:bg-red-950',
          )}
        >
          <span className="text-muted-foreground text-xs">{i + 1}</span> {value ? 'Vrai' : 'Faux'}
        </Button>
      ))}
    </div>
  )
}

function NumericInput({ part, response, result, onSubmit, locked }: PartProps<NumericPart>) {
  const [raw, setRaw] = useState('')
  const done = result !== undefined
  const value = done && response?.kind === 'numeric' ? response.raw : raw
  const parsed = parseNumberInput(raw)
  const submit = () => parsed !== null && onSubmit({ kind: 'numeric', raw })
  return (
    <div className="flex flex-col gap-2">
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <input
          aria-label="Votre réponse"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          disabled={done}
          onChange={(e) => setRaw(e.target.value)}
          className="border-input bg-background focus-visible:ring-ring/50 h-10 w-48 rounded-md border px-3 text-right outline-none focus-visible:ring-[3px]"
        />
        {part.unit && <span className="text-muted-foreground text-sm">{part.unit}</span>}
        {!done && !locked && (
          <Button type="submit" disabled={parsed === null}>
            Valider
          </Button>
        )}
      </form>
      {!done && raw !== '' && parsed === null && <p className="text-destructive text-xs">Saisissez un nombre (ex. 19 781,30).</p>}
      {done && (
        <p className="text-sm">
          Réponse attendue : <strong>{formatNumber(part.expected_value, part.decimals)}</strong>
          {part.unit ? ` ${part.unit}` : ''}{' '}
          <span className="text-muted-foreground">
            (tolérance{' '}
            {part.tolerance.kind === 'relative'
              ? `± ${formatNumber(part.tolerance.value * 100)} %`
              : `± ${formatNumber(part.tolerance.value)}`}
            )
          </span>
        </p>
      )}
    </div>
  )
}

const STATUS_LABEL: Record<AccountCheck['status'], string> = {
  ok: 'Juste',
  'wrong-amount': 'Montant faux',
  'wrong-side': 'Sens inversé',
  missing: 'Compte manquant',
  extra: 'Compte en trop',
}

function amount(sides?: { debit: number; credit: number }): string {
  if (!sides) return '—'
  return sides.debit > 0 ? `D ${formatNumber(sides.debit, 2)}` : `C ${formatNumber(sides.credit, 2)}`
}

function JournalInput({ part, response, result, onSubmit, locked }: PartProps<JournalPart>) {
  const [draft, setDraft] = useState<DraftLine[]>([emptyLine(), emptyLine()])
  const done = result !== undefined
  const lines = toJournalLines(draft)
  const totalDebit = lines.reduce((s, l) => s + l.debit, 0)
  const totalCredit = lines.reduce((s, l) => s + l.credit, 0)
  const set = (i: number, key: keyof DraftLine, value: string) =>
    setDraft((d) => d.map((l, j) => (j === i ? { ...l, [key]: value } : l)))
  const difference = Math.round((totalDebit - totalCredit) * 100) / 100
  /** Complète la première ligne sans montant (ou une nouvelle ligne) pour équilibrer l'écriture. */
  const balance = () => {
    if (Math.abs(difference) < 0.005) return
    const amount = formatNumber(Math.abs(difference), 2)
    const side: keyof DraftLine = difference > 0 ? 'credit' : 'debit'
    setDraft((d) => {
      const i = d.findIndex((l) => l.debit.trim() === '' && l.credit.trim() === '')
      if (i === -1) return [...d, { ...emptyLine(), [side]: amount }]
      return d.map((l, j) => (j === i ? { ...l, [side]: amount } : l))
    })
  }
  const inputClass =
    'border-input bg-background focus-visible:ring-ring/50 h-9 w-full rounded-md border px-2 text-sm outline-none focus-visible:ring-[3px]'

  if (done) {
    const given = (response as JournalResponse).lines
    return (
      <div className="flex flex-col gap-3 text-sm">
        <table className="w-full">
          <caption className="text-muted-foreground mb-1 text-left text-xs">Correction compte par compte</caption>
          <thead className="text-muted-foreground text-left text-xs">
            <tr>
              <th className="py-1">Compte</th>
              <th>Attendu</th>
              <th>Votre saisie</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            {result.accounts?.map((a) => (
              <tr key={a.account + a.status} className="border-t">
                <td className="py-1 font-mono">{a.account}</td>
                <td>{amount(a.expected)}</td>
                <td>{amount(a.given)}</td>
                <td className={a.status === 'ok' ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}>
                  {STATUS_LABEL[a.status]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <details>
          <summary className="cursor-pointer text-xs">Écriture attendue{part.date ? ` (${part.date})` : ''}</summary>
          <table className="mt-2 w-full">
            <tbody>
              {part.entries.map((e, i) => (
                <tr key={i} className="border-t">
                  <td className="py-1 font-mono">{e.account}</td>
                  <td>{e.label}</td>
                  <td className="text-right">{e.debit ? formatNumber(e.debit, 2) : ''}</td>
                  <td className="text-right">{e.credit ? formatNumber(e.credit, 2) : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
        {given.length === 0 && <p className="text-muted-foreground text-xs">Aucune ligne saisie.</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-muted-foreground grid grid-cols-[1fr_1fr_1fr_auto] gap-2 text-xs">
        <span>Compte PCG</span>
        <span>Débit</span>
        <span>Crédit</span>
        <span className="w-9" />
      </div>
      <datalist id="pcg-accounts">
        {PCG_ACCOUNTS.map((a) => (
          <option key={a.number} value={a.number}>
            {a.label}
          </option>
        ))}
      </datalist>
      {draft.map((line, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
          <div className="flex min-w-0 flex-col">
            <input
              aria-label={`Compte ligne ${i + 1}`}
              inputMode="numeric"
              list="pcg-accounts"
              autoComplete="off"
              className={cn(inputClass, 'font-mono')}
              value={line.account}
              onChange={(e) => set(i, 'account', e.target.value.replace(/\D/g, ''))}
            />
            {line.account.length >= 2 && (
              <span className="text-muted-foreground truncate text-[11px] leading-4" title={pcgLabel(line.account)}>
                {pcgLabel(line.account) ?? 'Compte hors liste'}
              </span>
            )}
          </div>
          <input
            aria-label={`Débit ligne ${i + 1}`}
            inputMode="decimal"
            className={cn(inputClass, 'text-right')}
            value={line.debit}
            onChange={(e) => set(i, 'debit', e.target.value)}
          />
          <input
            aria-label={`Crédit ligne ${i + 1}`}
            inputMode="decimal"
            className={cn(inputClass, 'text-right')}
            value={line.credit}
            onChange={(e) => set(i, 'credit', e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Supprimer la ligne ${i + 1}`}
            disabled={draft.length <= 1}
            onClick={() => setDraft((d) => d.filter((_, j) => j !== i))}
          >
            <Trash2 />
          </Button>
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setDraft((d) => [...d, emptyLine()])}>
          <Plus /> Ligne
        </Button>
        <Button variant="outline" size="sm" onClick={balance} disabled={Math.abs(difference) < 0.005} title="Complète le montant manquant">
          <Scale /> Équilibrer
        </Button>
        <span className={cn('text-xs', Math.abs(difference) > 0.005 ? 'text-amber-700 dark:text-amber-400' : 'text-muted-foreground')}>
          Total débit {formatNumber(totalDebit, 2)} · total crédit {formatNumber(totalCredit, 2)}
        </span>
      </div>
      {!locked && (
        <Button className="self-start" disabled={lines.length === 0} onClick={() => onSubmit({ kind: 'journal', lines })}>
          Valider l’écriture
        </Button>
      )}
    </div>
  )
}

function OpenInput({ part, response, result, onSubmit, deferred, locked }: PartProps<OpenPart>) {
  const [text, setText] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [checked, setChecked] = useState<boolean[]>(() => part.key_points.map(() => false))
  const done = result !== undefined
  const shownText = done ? (response as OpenResponse).text : text
  const shownChecked = done ? (response as OpenResponse).checked : checked
  const guided = shownText.trim().length > 0
  const found = useMemo(() => suggestKeyPoints(part.key_points, shownText), [part.key_points, shownText])

  return (
    <div className="flex flex-col gap-3">
      <textarea
        aria-label="Votre réponse rédigée"
        rows={4}
        value={shownText}
        disabled={revealed || done}
        onChange={(e) => setText(e.target.value)}
        placeholder="Rédigez votre réponse, puis comparez-la au corrigé."
        className="border-input bg-background focus-visible:ring-ring/50 rounded-md border p-2 text-sm outline-none focus-visible:ring-[3px]"
      />
      {deferred && !done ? (
        // Examen : la réponse est enregistrée sans corrigé ; les points clés repérés dans la copie font la
        // note, et le corrigé est montré à la fin de l'épreuve.
        !locked && (
          <Button
            variant="secondary"
            className="self-start"
            onClick={() => onSubmit({ kind: 'open', text, checked: suggestKeyPoints(part.key_points, text) })}
          >
            Enregistrer ma réponse
          </Button>
        )
      ) : !revealed && !done ? (
        <Button
          variant="secondary"
          className="self-start"
          onClick={() => {
            // Correction guidée : les points clés dont les mots-clés figurent dans la copie sont pré-cochés.
            setChecked(suggestKeyPoints(part.key_points, text))
            setRevealed(true)
          }}
        >
          Voir le corrigé
        </Button>
      ) : (
        <div className="bg-muted/50 flex flex-col gap-3 rounded-md p-3 text-sm">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase">Corrigé type</p>
            <Markdown source={part.model_answer} />
          </div>
          <fieldset className="flex flex-col gap-1">
            <legend className="text-muted-foreground mb-1 text-xs font-semibold uppercase">
              Cochez les points présents dans votre réponse
            </legend>
            {!done && guided && (
              <p className="text-muted-foreground mb-1 text-xs">
                Pré-cochés d’après les mots-clés retrouvés dans votre copie : vérifiez chaque point, une reformulation peut
                échapper au repérage et un mot présent ne suffit pas.
              </p>
            )}
            {part.key_points.map((point, i) => (
              <label key={i} className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={shownChecked[i] ?? false}
                  disabled={done}
                  onChange={(e) => setChecked((c) => c.map((v, j) => (j === i ? e.target.checked : v)))}
                />
                <span>
                  {point}
                  {guided && (
                    <span className={cn('ml-2 text-xs', found[i] ? 'text-emerald-700 dark:text-emerald-400' : 'text-muted-foreground')}>
                      {found[i] ? 'repéré dans votre copie' : 'non repéré'}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </fieldset>
          {done ? (
            <Verdict
              correct={result.correct}
              score={result.score}
              label={`Auto-évaluation : ${Math.round(result.score * 100)} % des points clés`}
            />
          ) : (
            <Button className="self-start" onClick={() => onSubmit({ kind: 'open', text, checked })}>
              Valider mon auto-évaluation
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

function FlashcardInput({ part, result, active, onSubmit }: PartProps<FlashcardPart>) {
  const [flipped, setFlipped] = useState(false)
  const done = result !== undefined
  useKeyboard((key) => {
    if (!flipped && (key === 'Enter' || key === ' ')) return setFlipped(true), true
    if (flipped && key === '1') return onSubmit({ kind: 'flashcard', known: true }), true
    if (flipped && key === '2') return onSubmit({ kind: 'flashcard', known: false }), true
    return false
  }, active && !done)
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border p-4">
        <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase">Recto</p>
        <p className="font-medium whitespace-pre-line">{part.front}</p>
      </div>
      {flipped || done ? (
        <div className="bg-muted/50 rounded-xl border p-4">
          <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase">Verso</p>
          <p className="text-sm whitespace-pre-line">{part.back}</p>
        </div>
      ) : (
        <Button variant="secondary" className="self-start" onClick={() => setFlipped(true)}>
          Retourner la carte
        </Button>
      )}
      {flipped && !done && (
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => onSubmit({ kind: 'flashcard', known: true })}>
            <span className="text-muted-foreground text-xs">1</span> Je savais
          </Button>
          <Button variant="outline" onClick={() => onSubmit({ kind: 'flashcard', known: false })}>
            <span className="text-muted-foreground text-xs">2</span> À revoir
          </Button>
        </div>
      )}
      {done && <Verdict correct={result.correct} label={result.correct ? 'Je savais' : 'À revoir'} />}
    </div>
  )
}
