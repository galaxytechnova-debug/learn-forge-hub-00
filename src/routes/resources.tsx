import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { getAllResources } from "@/lib/data/resources";
import { Badge } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import type { FreeResource } from "@/types/content";

export const Route = createFileRoute("/resources")({
  loader: async () => ({ resources: await getAllResources() }),
  component: ResourcesPage,
  head: () => ({
    meta: [
      { title: "Free Developer Resources — DevVerse" },
      { name: "description", content: "Hand-picked free books, courses, YouTube channels, tools, hosting, and AI models for developers." },
      { property: "og:title", content: "Free Developer Resources — DevVerse" },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
});

const TYPE_LABEL: Record<FreeResource["type"], string> = {
  book: "Books",
  course: "Courses",
  youtube: "YouTube",
  docs: "Docs",
  icon: "Icons",
  font: "Fonts",
  hosting: "Hosting",
  database: "Databases",
  api: "APIs",
  "ai-model": "AI Models",
};

function ResourcesPage() {
  const { resources } = Route.useLoaderData() as { resources: FreeResource[] };
  const [type, setType] = useState<FreeResource["type"] | "all">("all");

  const types = useMemo(
    () => Array.from(new Set(resources.map((r) => r.type))),
    [resources],
  );

  const filtered = useMemo(
    () => (type === "all" ? resources : resources.filter((r) => r.type === type)),
    [resources, type],
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Resources" }]} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">Free Resources</h1>
      <p className="mt-2 text-text-secondary max-w-2xl">
        The tools, courses, and services worth bookmarking — all free (or with a free tier).
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterButton active={type === "all"} onClick={() => setType("all")}>
          All
        </FilterButton>
        {types.map((t) => (
          <FilterButton key={t} active={type === t} onClick={() => setType(t)}>
            {TYPE_LABEL[t]}
          </FilterButton>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <a
            key={r.slug}
            href={r.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border-default bg-surface p-5 hover:border-border-strong transition-colors group"
          >
            <div className="flex items-center justify-between">
              <Badge tone="muted">{TYPE_LABEL[r.type]}</Badge>
              {r.isFree && <Badge tone="easy">Free</Badge>}
            </div>
            <h3 className="mt-3 font-semibold text-text-primary flex items-center gap-1">
              {r.title}
              <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="mt-1 text-sm text-text-secondary">{r.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1.5 rounded-full text-sm border transition-colors " +
        (active
          ? "bg-primary text-primary-foreground border-primary"
          : "border-border-default text-text-secondary hover:bg-surface-2")
      }
    >
      {children}
    </button>
  );
}
