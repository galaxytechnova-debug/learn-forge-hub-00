import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import { Badge } from "@/components/dv/Badge";
import { getSearchIndex, searchDocs, SEARCH_TYPE_LABEL, type SearchDoc } from "@/lib/search";

const searchSchema = z.object({ q: z.string().catch("") });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  component: SearchPage,
  head: () => ({
    meta: [
      { title: "Search — DevVerse" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function SearchPage() {
  const { q } = Route.useSearch();
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  useEffect(() => {
    getSearchIndex().then(setDocs);
  }, []);

  const results = useMemo(() => searchDocs(docs, q, 100), [docs, q]);
  const grouped = useMemo(() => {
    const g: Record<string, SearchDoc[]> = {};
    for (const r of results) (g[r.type] ??= []).push(r);
    return g;
  }, [results]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Search" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-text-primary">
        {q ? `Results for "${q}"` : "Search"}
      </h1>
      <p className="mt-2 text-text-secondary">
        {results.length} matches across roadmaps, questions, cheat sheets, and more.
      </p>

      {results.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border-default p-12 text-center text-text-secondary">
          Nothing matched. Try{" "}
          <Link to="/roadmaps" className="text-primary hover:underline">
            browsing roadmaps
          </Link>{" "}
          instead.
        </div>
      ) : (
        <div className="mt-8 grid gap-8">
          {Object.entries(grouped).map(([type, items]) => (
            <section key={type}>
              <h2 className="text-sm uppercase tracking-wider font-semibold text-text-muted">
                {SEARCH_TYPE_LABEL[type as SearchDoc["type"]]} · {items.length}
              </h2>
              <div className="mt-3 grid gap-2">
                {items.map((it) => (
                  <Link
                    key={`${it.type}-${it.slug}`}
                    to={it.href}
                    className="rounded-xl border border-border-default bg-surface p-4 hover:bg-surface-2 transition-colors"
                  >
                    <div className="font-medium text-text-primary">{it.title}</div>
                    <div className="text-sm text-text-secondary line-clamp-2 mt-1">
                      {it.description}
                    </div>
                    {it.category && (
                      <div className="mt-2">
                        <Badge tone="muted">{it.category}</Badge>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
