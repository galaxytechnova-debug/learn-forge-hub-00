import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layers, Search } from "lucide-react";
import { getAllRoadmaps } from "@/lib/data/roadmaps";
import { Badge } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import type { Roadmap } from "@/types/content";

export const Route = createFileRoute("/roadmaps/")({
  loader: async () => ({ roadmaps: await getAllRoadmaps() }),
  component: RoadmapsList,
  head: () => ({
    meta: [
      { title: "Developer Roadmaps — DevVerse" },
      {
        name: "description",
        content:
          "Follow structured, opinionated roadmaps for frontend, backend, DevOps, AI/ML, full-stack, and system design.",
      },
      { property: "og:title", content: "Developer Roadmaps — DevVerse" },
      { property: "og:url", content: "/roadmaps" },
    ],
    links: [{ rel: "canonical", href: "/roadmaps" }],
  }),
});

function RoadmapsList() {
  const { roadmaps } = Route.useLoaderData() as { roadmaps: Roadmap[] };
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(roadmaps.map((r) => r.category)))],
    [roadmaps],
  );

  const filtered = useMemo(
    () =>
      roadmaps.filter(
        (r) =>
          (cat === "All" || r.category === cat) &&
          (q === "" ||
            r.title.toLowerCase().includes(q.toLowerCase()) ||
            r.description.toLowerCase().includes(q.toLowerCase())),
      ),
    [roadmaps, q, cat],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Roadmaps" }]} />
      <div className="mt-4 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">Roadmaps</h1>
          <p className="mt-2 text-text-secondary max-w-2xl">
            Pick a track and start moving. Each roadmap is structured beginner → intermediate →
            advanced.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search roadmaps"
            className="w-full h-10 pl-10 pr-3 rounded-lg border border-border-default bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={
              "px-3 py-1.5 rounded-full text-sm border transition-colors " +
              (cat === c
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border-default text-text-secondary hover:bg-surface-2")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <Link
            key={r.slug}
            to="/roadmaps/$slug"
            params={{ slug: r.slug }}
            className="rounded-2xl border border-border-default bg-surface p-6 hover:border-border-strong hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <Layers className="h-5 w-5" />
              </div>
              <Badge tone="muted">{r.category}</Badge>
            </div>
            <h3 className="mt-4 font-semibold text-text-primary">{r.title}</h3>
            <p className="mt-1.5 text-sm text-text-secondary line-clamp-2">{r.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
              <span>{r.sections.reduce((n, s) => n + s.topics.length, 0)} topics</span>
              <span>{r.estimatedTime}</span>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-text-secondary">
            No roadmaps match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
