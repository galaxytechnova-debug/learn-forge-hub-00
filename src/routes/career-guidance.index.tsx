import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllArticles } from "@/lib/data/articles";
import { Badge } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import type { Article } from "@/types/content";

export const Route = createFileRoute("/career-guidance/")({
  loader: async () => ({ articles: await getAllArticles("career") }),
  component: ArticleList,
  head: () => ({
    meta: [
      { title: "Career Guidance — DevVerse" },
      { name: "description", content: "Honest career advice for developers: interviews, offers, growth, and switching stacks." },
      { property: "og:title", content: "Career Guidance — DevVerse" },
      { property: "og:url", content: "/career-guidance" },
    ],
    links: [{ rel: "canonical", href: "/career-guidance" }],
  }),
});

function ArticleList() {
  const { articles } = Route.useLoaderData() as { articles: Article[] };
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Career Guidance" }]} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">Career Guidance</h1>
      <p className="mt-2 text-text-secondary">
        Practical, opinionated writing on getting hired and growing as a developer.
      </p>
      <div className="mt-8 grid gap-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            to="/career-guidance/$slug"
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
      </div>
    </div>
  );
}
