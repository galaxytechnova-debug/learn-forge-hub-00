import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticleBySlug, getRelatedArticles } from "@/lib/data/articles";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import { BookmarkButton } from "@/components/BookmarkButton";
import type { Article } from "@/types/content";

export const Route = createFileRoute("/career-guidance/$slug")({
  loader: async ({ params }) => {
    const article = await getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article, related: await getRelatedArticles(article.slug) };
  },
  component: ArticleDetail,
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} — DevVerse` },
        { name: "description", content: a.content.slice(0, 160) },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.content.slice(0, 160) },
        { property: "og:url", content: `/career-guidance/${a.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/career-guidance/${a.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="p-24 text-center">
      <h1 className="text-3xl font-bold">Not found</h1>
      <Link to="/career-guidance" className="text-primary mt-4 inline-block">Back</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-8 text-center">
      <p>{error.message}</p>
      <button onClick={reset} className="text-primary">Retry</button>
    </div>
  ),
});

function ArticleDetail() {
  const { article, related } = Route.useLoaderData() as { article: Article; related: Article[] };
  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/career-guidance", label: "Career Guidance" },
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
      <div className="mt-8 prose max-w-none text-text-primary whitespace-pre-line leading-relaxed">
        {article.content}
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border-default pt-8">
          <h2 className="text-lg font-semibold text-text-primary">Related reading</h2>
          <div className="mt-4 grid gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={r.category === "resume" ? "/resume-tips/$slug" : "/career-guidance/$slug"}
                params={{ slug: r.slug }}
                className="rounded-xl border border-border-default bg-surface p-4 hover:bg-surface-2 transition-colors"
              >
                <div className="font-medium text-text-primary">{r.title}</div>
                <div className="text-xs text-text-muted mt-1">{r.estimatedReadTime} min read</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
