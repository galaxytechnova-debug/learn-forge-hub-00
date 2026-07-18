import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, Clock, ExternalLink, Layers } from "lucide-react";
import { getRoadmapBySlug, getAllRoadmaps } from "@/lib/data/roadmaps";
import { getInterviewQuestions } from "@/lib/data/interview-questions";
import { getAllProjects } from "@/lib/data/projects";
import { Badge, difficultyTone } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import { BookmarkButton } from "@/components/BookmarkButton";
import type { Roadmap, InterviewQuestion, ProjectIdea, RoadmapSection } from "@/types/content";

export const Route = createFileRoute("/roadmaps/$slug")({
  loader: async ({ params }) => {
    const roadmap = await getRoadmapBySlug(params.slug);
    if (!roadmap) throw notFound();
    const { items: relatedQuestions } = await getInterviewQuestions({ limit: 100 });
    const projects = await getAllProjects();
    return {
      roadmap,
      relatedQuestions: relatedQuestions.filter((q: InterviewQuestion) =>
        roadmap.relatedInterviewQuestionSlugs.includes(q.slug),
      ),
      relatedProjects: projects.filter((p: ProjectIdea) =>
        roadmap.relatedProjectSlugs.includes(p.slug),
      ),
    };
  },
  component: RoadmapDetail,
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Roadmap not found" }, { name: "robots", content: "noindex" }] };
    const r = loaderData.roadmap;
    return {
      meta: [
        { title: r.seoTitle },
        { name: "description", content: r.seoDescription },
        { property: "og:title", content: r.seoTitle },
        { property: "og:description", content: r.seoDescription },
        { property: "og:url", content: `/roadmaps/${r.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/roadmaps/${r.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-text-primary">Roadmap not found</h1>
      <Link to="/roadmaps" className="mt-4 inline-block text-primary hover:underline">
        Back to all roadmaps
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-text-secondary">Couldn't load this roadmap.</p>
      <button onClick={reset} className="mt-4 text-primary hover:underline">Retry</button>
      <p className="mt-2 text-xs text-text-muted">{error.message}</p>
    </div>
  ),
});

function progressKey(slug: string) {
  return `devverse_progress_${slug}`;
}

function RoadmapDetail() {
  const { roadmap, relatedQuestions, relatedProjects } = Route.useLoaderData() as {
    roadmap: Roadmap;
    relatedQuestions: InterviewQuestion[];
    relatedProjects: ProjectIdea[];
  };
  const [tab, setTab] = useState<Roadmap["sections"][number]["level"]>("beginner");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(progressKey(roadmap.slug));
      if (raw) setChecked(JSON.parse(raw));
    } catch { /* noop */ }
  }, [roadmap.slug]);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem(progressKey(roadmap.slug), JSON.stringify(next));
      } catch { /* noop */ }
      return next;
    });
  }

  const activeSection = useMemo(
    () => roadmap.sections.find((s: RoadmapSection) => s.level === tab) ?? roadmap.sections[0],
    [roadmap.sections, tab],
  );

  const totalTopics = roadmap.sections.reduce((n, s) => n + s.topics.length, 0);
  const doneCount = Object.values(checked).filter(Boolean).length;
  const pct = totalTopics ? Math.round((doneCount / totalTopics) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/roadmaps", label: "Roadmaps" },
          { label: roadmap.title },
        ]}
      />

      <header className="mt-4 flex items-start justify-between gap-6 flex-wrap">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <Badge tone="primary">{roadmap.category}</Badge>
            <Badge tone="muted">
              <Clock className="h-3 w-3" /> {roadmap.estimatedTime}
            </Badge>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary">
            {roadmap.title}
          </h1>
          <p className="mt-3 text-text-secondary text-lg leading-relaxed">{roadmap.description}</p>
        </div>
        <BookmarkButton type="roadmap" slug={roadmap.slug} title={roadmap.title} />
      </header>

      {/* Progress */}
      <div className="mt-8 rounded-2xl border border-border-default bg-surface p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="text-text-secondary">
            <span className="font-semibold text-text-primary">{doneCount}</span> of {totalTopics}{" "}
            topics complete
          </div>
          <div className="text-text-secondary">{pct}%</div>
        </div>
        <div className="mt-2 h-2 rounded-full bg-surface-2 overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Level tabs */}
      <div className="mt-8 border-b border-border-default flex gap-1">
        {roadmap.sections.map((s: RoadmapSection) => (
          <button
            key={s.level}
            onClick={() => setTab(s.level)}
            className={
              "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors " +
              (tab === s.level
                ? "border-primary text-text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary")
            }
          >
            <span className="capitalize">{s.level}</span>
            <span className="ml-2 text-xs text-text-muted">({s.topics.length})</span>
          </button>
        ))}
      </div>

      {/* Topics */}
      <div className="mt-6 grid gap-3">
        {activeSection.topics
          .sort((a, b) => a.order - b.order)
          .map((t) => {
            const id = `${activeSection.level}:${t.order}`;
            const done = checked[id];
            return (
              <div
                key={id}
                className={
                  "rounded-2xl border p-5 transition-colors " +
                  (done
                    ? "border-easy/30 bg-easy/5"
                    : "border-border-default bg-surface hover:border-border-strong")
                }
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggle(id)}
                    aria-pressed={done}
                    aria-label={done ? "Mark incomplete" : "Mark complete"}
                    className="shrink-0 mt-0.5"
                  >
                    {done ? (
                      <CheckCircle2 className="h-5 w-5 text-easy" />
                    ) : (
                      <Circle className="h-5 w-5 text-text-muted" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-text-primary">{t.title}</h3>
                    <p className="mt-1 text-sm text-text-secondary">{t.description}</p>
                    {t.resourceLinks.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {t.resourceLinks.map((link) => (
                          <a
                            key={link}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {new URL(link).hostname.replace("www.", "")}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Related content */}
      {(relatedProjects.length > 0 || relatedQuestions.length > 0) && (
        <section className="mt-16 grid gap-8 md:grid-cols-2">
          {relatedProjects.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" /> Related projects
              </h2>
              <div className="mt-4 grid gap-3">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="rounded-xl border border-border-default bg-surface p-4 hover:bg-surface-2 transition-colors"
                  >
                    <div className="text-sm font-semibold text-text-primary">{p.title}</div>
                    <div className="mt-1 text-xs text-text-secondary line-clamp-2">
                      {p.description}
                    </div>
                    <div className="mt-2">
                      <Badge tone={difficultyTone(p.difficulty)}>{p.difficulty}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {relatedQuestions.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Practice questions</h2>
              <div className="mt-4 grid gap-3">
                {relatedQuestions.map((q) => (
                  <Link
                    key={q.slug}
                    to="/interview-questions/$slug"
                    params={{ slug: q.slug }}
                    className="rounded-xl border border-border-default bg-surface p-4 hover:bg-surface-2 transition-colors"
                  >
                    <div className="text-sm font-semibold text-text-primary">{q.title}</div>
                    <div className="mt-2 flex gap-2">
                      <Badge tone={difficultyTone(q.difficulty)}>{q.difficulty}</Badge>
                      <Badge tone="muted">{q.category}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
