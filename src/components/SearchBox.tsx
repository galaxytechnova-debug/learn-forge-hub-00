import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon, X } from "lucide-react";
import { getSearchIndex, searchDocs, SEARCH_TYPE_LABEL, type SearchDoc } from "@/lib/search";

export function SearchBox() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [debounced, setDebounced] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSearchIndex().then(setDocs);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 180);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => searchDocs(docs, debounced, 8), [docs, debounced]);
  const grouped = useMemo(() => {
    const g: Record<string, SearchDoc[]> = {};
    for (const r of results) (g[r.type] ??= []).push(r);
    return g;
  }, [results]);

  return (
    <div ref={ref} className="relative flex-1 max-w-md">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary pointer-events-none" />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && q.trim()) {
              setOpen(false);
              navigate({ to: "/search", search: { q } });
            }
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search roadmaps, questions, sheets…"
          className="w-full h-10 pl-10 pr-9 rounded-lg border border-border-default bg-surface text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {q && (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => setQ("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && debounced && (
        <div className="absolute z-50 top-full mt-2 w-[min(28rem,90vw)] max-h-[70vh] overflow-y-auto rounded-xl border border-border-default bg-background shadow-lg">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-text-secondary">
              No results. Try{" "}
              <Link to="/roadmaps" className="text-primary hover:underline" onClick={() => setOpen(false)}>
                browsing roadmaps
              </Link>{" "}
              instead.
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(grouped).map(([type, items]) => (
                <div key={type}>
                  <div className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold text-text-muted">
                    {SEARCH_TYPE_LABEL[type as SearchDoc["type"]]} · {items.length}
                  </div>
                  {items.map((it) => (
                    <Link
                      key={`${it.type}-${it.slug}`}
                      to={it.href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 hover:bg-surface-2 transition-colors"
                    >
                      <div className="text-sm font-medium text-text-primary line-clamp-1">
                        {it.title}
                      </div>
                      <div className="text-xs text-text-secondary line-clamp-1">
                        {it.description}
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                to="/search"
                search={{ q }}
                onClick={() => setOpen(false)}
                className="block border-t border-border-default px-3 py-2 text-sm text-primary hover:bg-surface-2"
              >
                See all results for "{q}" →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
