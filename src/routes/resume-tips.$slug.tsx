import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticleBySlug } from "@/lib/data/articles";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import { BookmarkButton } from "@/components/BookmarkButton";
import type { Article } from "@/types/content";

export const Route = createFileRoute("/resume-tips/$slug")({
  loader: async ({ params }) => {
    const article = await getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  component: ResumeArticle,
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} — DevVerse` },
        { name: "description", content: a.content.slice(0, 160) },
        { property: "og:title", content: a.title },
        { property: "og:url", content: `/resume-tips/${a.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/resume-tips/${a.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="p-24 text-center">
      <h1 className="text-3xl font-bold">Not found</h1>
      <Link to="/resume-tips" className="text-primary mt-4 inline-block">Back</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-8 text-center">
      <p>{error.message}</p>
      <button onClick={reset} className="text-primary">Retry</button>
    </div>
  ),
});

function ResumeArticle() {
  const { article } = Route.useLoaderData() as { article: Article };
  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/resume-tips", label: "Resume Tips" },
          { label: article.title },
        ]}
      />
      <header className="mt-4 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">{article.title}</h1>
          <div className="mt-3 text-sm text-text-secondary">
            {article.author} · {article.estimatedReadTime} min read
          </div>
        </div>
        <BookmarkButton type="article" slug={article.slug} title={article.title} />
      </header>
      <div className="mt-8 text-text-primary whitespace-pre-line leading-relaxed">
        {article.content}
      </div>
    </article>
  );
}
