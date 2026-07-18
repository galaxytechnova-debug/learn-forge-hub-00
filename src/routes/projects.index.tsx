import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getAllProjects } from "@/lib/data/projects";
import { Badge, difficultyTone } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import type { ProjectIdea, Difficulty } from "@/types/content";

export const Route = createFileRoute("/projects/")({
  loader: async () => ({ projects: await getAllProjects() }),
  component: ProjectsList,
  head: () => ({
    meta: [
      { title: "Project Ideas — DevVerse" },
      { name: "description", content: "Buildable project ideas with features, tech stacks, and learning outcomes for every level." },
      { property: "og:title", content: "Project Ideas — DevVerse" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
});

function ProjectsList() {
  const { projects } = Route.useLoaderData() as { projects: ProjectIdea[] };
  const [diff, setDiff] = useState<Difficulty | "all">("all");

  const filtered = useMemo(
    () => (diff === "all" ? projects : projects.filter((p) => p.difficulty === diff)),
    [projects, diff],
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Projects" }]} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">Project Ideas</h1>
      <p className="mt-2 text-text-secondary max-w-2xl">
        Portfolio-worthy builds, sized by difficulty. Each idea comes with features, a folder
        structure, and what you'll actually learn from shipping it.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", "beginner", "intermediate", "advanced"] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDiff(d)}
            className={
              "px-3 py-1.5 rounded-full text-sm border capitalize transition-colors " +
              (diff === d
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border-default text-text-secondary hover:bg-surface-2")
            }
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="rounded-2xl border border-border-default bg-surface p-6 hover:border-border-strong transition-colors"
          >
            <div className="flex items-center gap-2">
              <Badge tone={difficultyTone(p.difficulty)}>{p.difficulty}</Badge>
              <Badge tone="muted">{p.category}</Badge>
            </div>
            <h3 className="mt-3 font-semibold text-text-primary">{p.title}</h3>
            <p className="mt-1.5 text-sm text-text-secondary line-clamp-2">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.techStack.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-0.5 rounded-md border border-border-default text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
