import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllArticles } from "@/lib/data/articles";
import { Badge } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import type { Article } from "@/types/content";

export const Route = createFileRoute("/resume-tips/")({
  loader: async () => ({ articles: await getAllArticles("resume") }),
  component: ResumeList,
  head: () => ({
    meta: [
      { title: "Resume Tips for Developers — DevVerse" },
      { name: "description", content: "Concrete resume advice that gets developers past the 7-second recruiter scan." },
      { property: "og:title", content: "Resume Tips — DevVerse" },
      { property: "og:url", content: "/resume-tips" },
    ],
    links: [{ rel: "canonical", href: "/resume-tips" }],
  }),
});

function ResumeList() {
  const { articles } = Route.useLoaderData() as { articles: Article[] };
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Resume Tips" }]} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">Resume Tips</h1>
      <div className="mt-8 grid gap-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            to="/resume-tips/$slug"
            params={{ slug: a.slug }}
            className="rounded-2xl border border-border-default bg-surface p-6 hover:border-border-strong transition-colors"
          >
            <Badge tone="muted">{a.estimatedReadTime} min read</Badge>
            <h2 className="mt-3 text-lg font-semibold text-text-primary">{a.title}</h2>
            <p className="mt-2 text-sm text-text-secondary line-clamp-2">
              {a.content.slice(0, 200)}…
            </p>
          </Link>
        ))}
        {articles.length === 0 && (
          <div className="text-center py-16 text-text-secondary">No resume articles yet.</div>
        )}
      </div>
    </div>
  );
}
