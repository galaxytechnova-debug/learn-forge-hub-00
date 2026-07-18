import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { clearBookmarks, getBookmarks, type Bookmark, type BookmarkType } from "@/lib/bookmarks";
import { Breadcrumb } from "@/components/dv/Breadcrumb";

export const Route = createFileRoute("/bookmarks")({
  component: BookmarksPage,
  head: () => ({
    meta: [
      { title: "Your Bookmarks — DevVerse" },
      { name: "description", content: "The roadmaps, questions, and cheat sheets you've saved." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const PATH: Record<BookmarkType, (slug: string) => string> = {
  roadmap: (s) => `/roadmaps/${s}`,
  "interview-question": (s) => `/interview-questions/${s}`,
  cheatsheet: (s) => `/cheatsheets/${s}`,
  project: (s) => `/projects/${s}`,
  resource: (s) => `/resources`,
  article: (s) => `/career-guidance/${s}`,
  company: (s) => `/companies/${s}`,
};

const LABEL: Record<BookmarkType, string> = {
  roadmap: "Roadmaps",
  "interview-question": "Interview Questions",
  cheatsheet: "Cheat Sheets",
  project: "Projects",
  resource: "Resources",
  article: "Articles",
  company: "Companies",
};

function BookmarksPage() {
  const [items, setItems] = useState<Bookmark[]>([]);
  useEffect(() => {
    const sync = () => setItems(getBookmarks());
    sync();
    window.addEventListener("devverse:bookmarks", sync);
    return () => window.removeEventListener("devverse:bookmarks", sync);
  }, []);

  const grouped = items.reduce<Record<BookmarkType, Bookmark[]>>(
    (acc, b) => {
      (acc[b.type] ??= []).push(b);
      return acc;
    },
    {} as Record<BookmarkType, Bookmark[]>,
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Bookmarks" }]} />
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight text-text-primary">Your Bookmarks</h1>
        {items.length > 0 && (
          <button
            onClick={clearBookmarks}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border-default text-sm text-danger hover:bg-danger/10"
          >
            <Trash2 className="h-4 w-4" /> Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-border-default p-12 text-center">
          <p className="text-text-secondary">You haven't saved anything yet.</p>
          <Link
            to="/roadmaps"
            className="mt-4 inline-block text-primary font-medium hover:underline"
          >
            Browse roadmaps →
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8">
          {(Object.keys(grouped) as BookmarkType[]).map((type) => (
            <section key={type}>
              <h2 className="text-sm uppercase tracking-wider font-semibold text-text-muted">
                {LABEL[type]}
              </h2>
              <div className="mt-3 grid gap-2">
                {grouped[type].map((b) => (
                  <Link
                    key={`${b.type}-${b.slug}`}
                    to={PATH[b.type](b.slug)}
                    className="rounded-xl border border-border-default bg-surface p-4 hover:bg-surface-2 transition-colors"
                  >
                    <div className="font-medium text-text-primary">{b.title}</div>
                    <div className="text-xs text-text-muted mt-1">
                      Saved {new Date(b.addedAt).toLocaleDateString()}
                    </div>
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
