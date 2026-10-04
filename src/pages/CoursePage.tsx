import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { BookmarkButton } from "@/components/BookmarkButton";
import { Markdown } from "@/components/Markdown";
import { ReportLink } from "@/components/ReportLink";
import { UeBadge } from "@/components/UeBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { exerciseCount, loadCourse, taxonomy } from "@/content/load";
import { buildTaxonomyIndex } from "@/content/taxonomy";
import { setMark } from "@/db/db";
import { useMarks } from "@/db/progress";
import { newSeed, sessionSearch } from "@/engine/sessionConfig";
import { courseIssueUrl } from "@/lib/report";
import { cn } from "@/lib/utils";

const index = buildTaxonomyIndex(taxonomy);

/** Titres de niveau 2 d'une fiche (sommaire). */
function sections(markdown: string): string[] {
  return markdown
    .split("\n")
    .filter((l) => /^## /.test(l))
    .map((l) => l.replace(/^## /, "").trim());
}

export function CoursePage() {
  const { notionId = "" } = useParams();
  const entry = index.notions.get(notionId);
  const navigate = useNavigate();
  const read = useMarks("read");
  const [course, setCourse] = useState<{
    id: string;
    text: string | null;
  } | null>(null);

  useEffect(() => {
    let alive = true;
    void loadCourse(notionId).then(
      (text) => alive && setCourse({ id: notionId, text }),
    );
    return () => {
      alive = false;
    };
  }, [notionId]);

  const text = course?.id === notionId ? course.text : undefined;
  // Fiche considérée lue une fois affichée.
  useEffect(() => {
    if (text) void setMark("read", `notion:${notionId}`);
  }, [text, notionId]);

  const siblings = useMemo(() => entry?.theme.notions ?? [], [entry]);
  const position = siblings.findIndex((n) => n.id === notionId);
  const prev = position > 0 ? siblings[position - 1] : undefined;
  const next =
    position >= 0 && position < siblings.length - 1
      ? siblings[position + 1]
      : undefined;
  const toc = useMemo(() => (text ? sections(text) : []), [text]);

  if (!entry) {
    return (
      <div className="flex flex-col gap-4">
        <p>Notion introuvable.</p>
        <Button asChild variant="outline" className="self-start">
          <Link to="/cours">Retour aux cours</Link>
        </Button>
      </div>
    );
  }

  const count = exerciseCount(`notion:${notionId}`);
  const train = () =>
    navigate(
      `/session${sessionSearch({
        mode: "theme",
        seed: newSeed(),
        scope: { ue: entry.ue.id, theme: entry.theme.id, notion: notionId },
      })}`,
    );

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start lg:gap-8">
      <div className="flex flex-col gap-4">
        <Link
          to={`/cours/ue/${entry.ue.id}`}
          className="text-muted-foreground inline-flex items-center gap-1 text-sm"
        >
          <ArrowLeft className="size-4" /> {entry.ue.id} · {entry.theme.title}
        </Link>
        <div className="flex flex-wrap gap-1">
          <UeBadge ue={entry.ue.id} />
          <Badge variant="outline">{entry.theme.title}</Badge>
        </div>
        {text === undefined ? (
          // Hauteur réservée pour que l'arrivée de la fiche ne décale pas la page.
          <p className="text-muted-foreground min-h-[70vh]" aria-busy="true">
            Chargement…
          </p>
        ) : text === null ? (
          <>
            <h1 className="text-xl font-bold">{entry.notion.title}</h1>
            <p className="text-muted-foreground text-sm">
              La fiche de cours de cette notion n’est pas encore rédigée.
            </p>
          </>
        ) : (
          <>
            <article className="min-h-[70vh] text-sm">
              <Markdown source={text} pageTitle />
            </article>
            <div className="no-print flex flex-wrap items-center gap-2">
              <BookmarkButton target={`notion:${notionId}`} />
              <ReportLink
                href={courseIssueUrl(notionId, entry.notion.title)}
                label="Signaler une erreur dans cette fiche"
              />
            </div>
          </>
        )}
        {/* Bouton et navigation rendus avec la fiche : rien ne descend quand elle arrive (décalage de mise en page). */}
        {text !== undefined && (
          <Button
            size="lg"
            disabled={count === 0}
            onClick={train}
            className="no-print"
          >
            {count === 0
              ? "Pas encore d’exercice sur cette notion"
              : `S’entraîner sur cette notion (${count})`}
          </Button>
        )}
        {text !== undefined && (
          <nav
            aria-label="Notion précédente ou suivante"
            className="no-print flex items-stretch justify-between gap-2 text-sm"
          >
            {prev ? (
              <Link
                to={`/cours/${prev.id}`}
                className="hover:bg-accent flex max-w-[48%] items-center gap-1 rounded-md border px-3 py-2"
              >
                <ChevronLeft className="size-4 shrink-0" aria-hidden />
                <span className="truncate">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={`/cours/${next.id}`}
                className="hover:bg-accent flex max-w-[48%] items-center gap-1 rounded-md border px-3 py-2 text-right"
              >
                <span className="truncate">{next.title}</span>
                <ChevronRight className="size-4 shrink-0" aria-hidden />
              </Link>
            )}
          </nav>
        )}
      </div>
      <aside
        className="no-print hidden lg:sticky lg:top-4 lg:block"
        aria-label="Sommaire et notions du thème"
      >
        {toc.length > 0 && (
          <div className="mb-4">
            <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase">
              Dans cette fiche
            </p>
            <ul className="text-sm">
              {toc.map((t) => (
                <li key={t} className="py-0.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase">
          {entry.theme.title}
        </p>
        <ul className="flex flex-col text-sm">
          {siblings.map((n) => (
            <li key={n.id}>
              <Link
                to={`/cours/${n.id}`}
                aria-current={n.id === notionId ? "page" : undefined}
                className={cn(
                  "hover:bg-accent block rounded px-2 py-1",
                  n.id === notionId
                    ? "bg-accent font-medium"
                    : read?.has(`notion:${n.id}`)
                      ? "text-muted-foreground"
                      : "",
                )}
              >
                {n.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
