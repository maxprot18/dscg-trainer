import { ArrowRight, Download, Mic, Shuffle, Square } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Markdown } from '@/components/Markdown'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { taxonomy } from '@/content/load'
import { ORAL_CRITERIA, ORAL_CRITERION_MAX, ORAL_INTERVIEW_MINUTES, ORAL_PREP_MINUTES, ORAL_TALK_MINUTES, type OralTopic } from '@/content/oral'
import { loadOralTopics } from '@/content/oralTopics'
import { useRecorder } from '@/hooks/useRecorder'
import { drawTopic, readOralHistory, saveOralResult, type OralResult } from '@/lib/oralHistory'
import { cn } from '@/lib/utils'

type Step = 'choose' | 'prep' | 'talk' | 'interview' | 'review'

const selectClass =
  'border-input bg-background focus-visible:ring-ring/50 h-10 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-[3px]'
const ue6 = taxonomy.ues.find((u) => u.id === 'UE6')!
const PREP_CHOICES = [ORAL_PREP_MINUTES, 30, 15] as const

const clock = (seconds: number) => {
  const s = Math.abs(seconds)
  return `${seconds < 0 ? '+' : ''}${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/** Compte à rebours d'une étape ; passe en dépassement (affiché en rouge) une fois le temps écoulé. */
function Countdown({ minutes, label, startedAt }: { minutes: number; label: string; startedAt: number }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(t)
  }, [])
  const left = minutes * 60 - Math.floor((now - startedAt) / 1000)
  return (
    <p className="flex items-baseline justify-between gap-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn('text-2xl font-bold tabular-nums', left < 0 ? 'text-destructive' : left < 120 ? 'text-warn' : '')}>
        {clock(left)}
      </span>
    </p>
  )
}

/** Entraînement à l'oral de l'UE 6 : préparation, exposé, entretien, puis auto-évaluation. */
export function OralPage() {
  const [topics, setTopics] = useState<OralTopic[] | null>(null)
  const [step, setStep] = useState<Step>('choose')
  const [topic, setTopic] = useState<OralTopic | null>(null)
  const [theme, setTheme] = useState('')
  const [prepMinutes, setPrepMinutes] = useState<number>(ORAL_PREP_MINUTES)
  const [stepStart, setStepStart] = useState(0)
  const [notes, setNotes] = useState('')
  const [question, setQuestion] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [history, setHistory] = useState<OralResult[]>(readOralHistory)
  const [saved, setSaved] = useState(false)
  const recorder = useRecorder()

  useEffect(() => {
    let alive = true
    void loadOralTopics().then((list) => alive && setTopics(list))
    return () => {
      alive = false
    }
  }, [])

  const available = useMemo(() => (topics ?? []).filter((t) => !theme || t.theme === theme), [topics, theme])
  const go = (next: Step) => {
    setStep(next)
    setStepStart(Date.now())
    window.scrollTo(0, 0)
  }
  const begin = (t: OralTopic | undefined) => {
    if (!t) return
    setTopic(t)
    setNotes('')
    setQuestion(0)
    setScores({})
    setSaved(false)
    go('prep')
  }

  if (step === 'choose' || !topic) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Oral d’anglais (UE 6)</h1>
        <p className="text-muted-foreground text-sm">
          L’épreuve : {ORAL_PREP_MINUTES} minutes de préparation sur un document, {ORAL_TALK_MINUTES} minutes d’exposé, puis{' '}
          {ORAL_INTERVIEW_MINUTES} minutes d’entretien avec le jury, en anglais. Entraînez-vous dans les mêmes conditions et
          enregistrez-vous pour vous réécouter.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Tirer un sujet</CardTitle>
            <CardDescription>{topics ? `${topics.length} sujets disponibles` : 'Chargement des sujets…'}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <label className="flex flex-col gap-1 text-sm">
              Thème
              <select className={selectClass} value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="">Tous les thèmes</option>
                {ue6.themes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({(topics ?? []).filter((x) => x.theme === t.id).length})
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Temps de préparation
              <select className={selectClass} value={prepMinutes} onChange={(e) => setPrepMinutes(Number(e.target.value))}>
                {PREP_CHOICES.map((m) => (
                  <option key={m} value={m}>
                    {m} minutes{m === ORAL_PREP_MINUTES ? ' (conditions de l’épreuve)' : ''}
                  </option>
                ))}
              </select>
            </label>
            <Button
              size="lg"
              disabled={available.length === 0}
              onClick={() => begin(drawTopic(available, history.map((h) => h.topicId)))}
            >
              <Shuffle /> {available.length === 0 ? 'Aucun sujet pour ce thème' : 'Tirer un sujet au hasard'}
            </Button>
            {available.length > 0 && (
              <details className="text-sm">
                <summary className="cursor-pointer">Ou choisir un sujet</summary>
                <ul className="mt-2 flex flex-col gap-1">
                  {available.map((t) => (
                    <li key={t.id}>
                      <button type="button" className="hover:bg-accent w-full rounded px-2 py-1 text-left" onClick={() => begin(t)}>
                        {t.title}
                        {history.some((h) => h.topicId === t.id) && <span className="text-muted-foreground"> · déjà passé</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </CardContent>
        </Card>
        {history.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Mes oraux blancs</CardTitle>
              <CardDescription>Notes d’auto-évaluation sur 20.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-1 text-sm">
                {history.slice(0, 8).map((h) => (
                  <li key={h.date} className="flex justify-between gap-3">
                    <span className="min-w-0">
                      <span className="text-muted-foreground">{new Date(h.date).toLocaleDateString('fr-FR')} · </span>
                      {h.title}
                    </span>
                    <span className="font-semibold tabular-nums">{h.score} / 20</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const document = (
    <article lang="en" className="bg-card rounded-xl border p-4 text-[15px] leading-relaxed">
      <h2 className="mb-2 text-lg font-semibold">{topic.title}</h2>
      <Markdown source={topic.document} />
    </article>
  )
  const task = (
    <p lang="en" className="border-primary bg-primary/6 rounded-r-lg border-l-4 px-4 py-3 text-sm">
      <strong>Task</strong> — {topic.task}
    </p>
  )
  const recording = (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {recorder.state === 'recording' ? (
        <Button variant="outline" onClick={recorder.stop}>
          <Square className="text-destructive" /> Arrêter l’enregistrement
        </Button>
      ) : recorder.state === 'idle' || recorder.state === 'stopped' ? (
        <Button variant="outline" onClick={() => void recorder.start()}>
          <Mic /> {recorder.state === 'stopped' ? 'Recommencer l’enregistrement' : 'M’enregistrer'}
        </Button>
      ) : null}
      {recorder.state === 'recording' && (
        <span className="text-destructive flex items-center gap-1">
          <span aria-hidden className="bg-destructive size-2 animate-pulse rounded-full" /> Enregistrement en cours (local)
        </span>
      )}
      {recorder.state === 'unsupported' && <span className="text-muted-foreground">Enregistrement non disponible sur ce navigateur.</span>}
      {recorder.state === 'denied' && <span className="text-muted-foreground">Micro refusé : autorisez-le dans le navigateur pour vous enregistrer.</span>}
    </div>
  )

  if (step === 'prep') {
    return (
      <div className="flex flex-col gap-4">
        <Countdown minutes={prepMinutes} label="Préparation" startedAt={stepStart} />
        {document}
        {task}
        <label className="flex flex-col gap-1 text-sm">
          Mes notes (plan, idées, vocabulaire)
          <textarea
            className="border-input bg-background min-h-40 rounded-md border p-3 text-sm"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            lang="en"
          />
        </label>
        <Button size="lg" onClick={() => go('talk')}>
          Commencer l’exposé <ArrowRight />
        </Button>
      </div>
    )
  }

  if (step === 'talk') {
    return (
      <div className="flex flex-col gap-4">
        <Countdown minutes={ORAL_TALK_MINUTES} label="Exposé" startedAt={stepStart} />
        <p className="text-sm">Présentez le document et traitez la consigne, sans lire vos notes mot à mot.</p>
        {recording}
        {notes && (
          <div className="bg-muted/50 rounded-lg border p-3 text-sm whitespace-pre-wrap" lang="en">
            {notes}
          </div>
        )}
        <details className="text-sm">
          <summary className="cursor-pointer">Revoir le document</summary>
          <div className="mt-2 flex flex-col gap-3">
            {document}
            {task}
          </div>
        </details>
        <Button size="lg" onClick={() => go('interview')}>
          Passer à l’entretien <ArrowRight />
        </Button>
      </div>
    )
  }

  if (step === 'interview') {
    return (
      <div className="flex flex-col gap-4">
        <Countdown minutes={ORAL_INTERVIEW_MINUTES} label="Entretien" startedAt={stepStart} />
        {recording}
        <Card>
          <CardHeader>
            <CardDescription>
              Question du jury {question + 1} / {topic.jury_questions.length}
            </CardDescription>
            <CardTitle lang="en" className="text-lg leading-snug">
              {topic.jury_questions[question]}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">Répondez à voix haute, en développant (2 à 3 minutes par question).</CardContent>
        </Card>
        {question < topic.jury_questions.length - 1 ? (
          <Button size="lg" variant="outline" onClick={() => setQuestion((q) => q + 1)}>
            Question suivante <ArrowRight />
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={() => {
              recorder.stop()
              go('review')
            }}
          >
            Terminer et m’évaluer <ArrowRight />
          </Button>
        )}
      </div>
    )
  }

  const total = Object.values(scores).reduce((s, v) => s + v, 0)
  const complete = ORAL_CRITERIA.every((c) => scores[c.id] !== undefined)
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Bilan de l’oral</h1>
      {recorder.url && (
        <Card>
          <CardHeader>
            <CardTitle>Mon enregistrement</CardTitle>
            <CardDescription>Gardé sur cet appareil seulement ; il disparaît en quittant la page, sauf si vous le téléchargez.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <audio controls src={recorder.url} className="w-full" />
            <Button asChild variant="outline" size="sm" className="self-start">
              <a href={recorder.url} download={`oral-${topic.id}.${recorder.mimeType.includes('mp4') ? 'm4a' : 'webm'}`}>
                <Download /> Télécharger
              </a>
            </Button>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Plan type</CardTitle>
          <CardDescription>À comparer avec votre exposé.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol lang="en" className="flex list-decimal flex-col gap-1.5 pl-5 text-sm">
            {topic.outline.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ol>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vocabulaire utile</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-[max-content_1fr]">
            {topic.vocabulary.map((v) => (
              <div key={v.term} className="contents">
                <dt lang="en" className="font-medium">
                  {v.term}
                </dt>
                <dd className="text-muted-foreground mb-1 sm:mb-0">{v.translation}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Auto-évaluation</CardTitle>
          <CardDescription>Chaque critère sur {ORAL_CRITERION_MAX} points ; réécoutez-vous avant de noter.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {ORAL_CRITERIA.map((c) => (
            <fieldset key={c.id} className="flex flex-col gap-1 text-sm">
              <legend className="font-medium">{c.label}</legend>
              <p className="text-muted-foreground text-xs">{c.hint}</p>
              <div className="flex gap-1">
                {Array.from({ length: ORAL_CRITERION_MAX + 1 }, (_, v) => (
                  <label
                    key={v}
                    className={cn(
                      'flex size-9 cursor-pointer items-center justify-center rounded-md border text-sm',
                      scores[c.id] === v ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent',
                    )}
                  >
                    <input
                      type="radio"
                      name={c.id}
                      value={v}
                      className="sr-only"
                      checked={scores[c.id] === v}
                      onChange={() => setScores((s) => ({ ...s, [c.id]: v }))}
                    />
                    {v}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <p className="text-lg font-semibold tabular-nums">Note : {total} / 20</p>
          <div className="flex flex-wrap gap-2">
            <Button
              disabled={!complete || saved}
              onClick={() => {
                setHistory(saveOralResult({ date: Date.now(), topicId: topic.id, title: topic.title, score: total, scores }))
                setSaved(true)
              }}
            >
              {saved ? 'Enregistré' : 'Enregistrer ma note'}
            </Button>
            <Button variant="outline" onClick={() => setStep('choose')}>
              Nouveau sujet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
