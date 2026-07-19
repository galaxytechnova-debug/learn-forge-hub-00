import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProjectBySlug } from "@/lib/data/projects";
import { Badge, difficultyTone } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import type { ProjectIdea } from "@/types/content";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    const project = await getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetail,
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.title} — Project Idea — DevVerse` },
        { name: "description", content: p.description },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:url", content: `/projects/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${p.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-text-primary">Not found</h1>
      <Link to="/projects" className="mt-4 inline-block text-primary hover:underline">
        Back to projects
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-8 text-center">
      <p>{error.message}</p>
      <button onClick={reset} className="text-primary">Retry</button>
    </div>
  ),
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData() as { project: ProjectIdea };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/projects", label: "Projects" },
          { label: p.title },
        ]}
      />

      <header className="mt-4 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex gap-2">
            <Badge tone={difficultyTone(p.difficulty)}>{p.difficulty}</Badge>
            <Badge tone="muted">{p.category}</Badge>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary">{p.title}</h1>
          <p className="mt-3 text-text-secondary text-lg leading-relaxed">{p.description}</p>
        </div>
      </header>

      <Section title="Features">
        <ul className="grid gap-2 list-disc pl-5 text-text-primary">
          {p.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </Section>

      <Section title="Tech stack">
        <div className="flex flex-wrap gap-2">
          {p.techStack.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-md border border-border-default bg-surface text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Folder structure">
        <pre className="overflow-x-auto rounded-xl border border-border-default bg-surface p-4 text-sm">
          <code>{p.folderStructure}</code>
        </pre>
      </Section>

      <Section title="API surface">
        <ul className="grid gap-2 text-text-primary font-mono text-sm">
          {p.apiList.map((a) => (
            <li key={a} className="px-3 py-2 rounded-md bg-surface border border-border-default">
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Deployment notes">
        <p className="text-text-primary leading-relaxed">{p.deploymentNotes}</p>
      </Section>

      <Section title="Challenges">
        <ul className="grid gap-2 list-disc pl-5 text-text-primary">
          {p.challenges.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Section>

      <Section title="Learning outcomes">
        <ul className="grid gap-2 list-disc pl-5 text-text-primary">
          {p.learningOutcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
