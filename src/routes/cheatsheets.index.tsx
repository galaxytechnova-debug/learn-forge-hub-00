import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { getAllCheatSheets, getCheatSheetCategories } from "@/lib/data/cheatsheets";
import { Badge } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import type { CheatSheet } from "@/types/content";

export const Route = createFileRoute("/cheatsheets/")({
  loader: async () => ({
    sheets: await getAllCheatSheets(),
    categories: await getCheatSheetCategories(),
  }),
  component: CheatSheetsList,
  head: () => ({
    meta: [
      { title: "Cheat Sheets — DevVerse" },
      { name: "description", content: "Print-friendly cheat sheets for the tools and languages you use every day." },
      { property: "og:title", content: "Cheat Sheets — DevVerse" },
      { property: "og:url", content: "/cheatsheets" },
    ],
    links: [{ rel: "canonical", href: "/cheatsheets" }],
  }),
});

function CheatSheetsList() {
  const { sheets, categories } = Route.useLoaderData() as { sheets: CheatSheet[]; categories: string[] };
  const [cat, setCat] = useState("All");
  const filtered = useMemo(
    () => (cat === "All" ? sheets : sheets.filter((s) => s.category === cat)),
    [sheets, cat],
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Cheat Sheets" }]} />
      <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">Cheat Sheets</h1>
      <p className="mt-2 text-text-secondary max-w-2xl">
        Dense one-page references you'll actually keep open — with visuals where they help.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={
              "px-3 py-1.5 rounded-full text-sm border transition-colors " +
              (cat === c
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border-default text-text-secondary hover:bg-surface-2")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <Link
            key={s.slug}
            to="/cheatsheets/$slug"
            params={{ slug: s.slug }}
            className="rounded-2xl border border-border-default bg-surface overflow-hidden hover:border-border-strong transition-colors group"
          >
            <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent grid place-items-center overflow-hidden">
              {s.thumbnailImageUrl ? (
                <img
                  src={s.thumbnailImageUrl}
                  alt={`${s.title} visual`}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <FileText className="h-10 w-10 text-primary/60" />
              )}
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <Badge tone="muted">{s.category}</Badge>
              </div>
              <h3 className="mt-2 font-semibold text-text-primary">{s.title}</h3>
              <p className="mt-1 text-sm text-text-secondary line-clamp-2">{s.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

