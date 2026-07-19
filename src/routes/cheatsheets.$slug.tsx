import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, Printer } from "lucide-react";
import { getCheatSheetBySlug } from "@/lib/data/cheatsheets";
import { Badge } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import type { CheatSheet, CheatSheetBlock } from "@/types/content";

export const Route = createFileRoute("/cheatsheets/$slug")({
  loader: async ({ params }) => {
    const sheet = await getCheatSheetBySlug(params.slug);
    if (!sheet) throw notFound();
    return { sheet };
  },
  component: CheatSheetDetail,
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Cheat sheet not found" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.sheet;
    return {
      meta: [
        { title: `${s.title} Cheat Sheet — DevVerse` },
        { name: "description", content: s.description },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.description },
        { property: "og:url", content: `/cheatsheets/${s.slug}` },
      ],
      links: [{ rel: "canonical", href: `/cheatsheets/${s.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-text-primary">Not found</h1>
      <Link to="/cheatsheets" className="mt-4 inline-block text-primary hover:underline">
        Back to cheat sheets
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

function CodeBlock({ language, content }: { language?: string; content: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative my-3">
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {language && (
          <span className="text-[10px] uppercase tracking-wider text-text-muted">{language}</span>
        )}
        <button
          onClick={() => {
            navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="inline-flex items-center gap-1 h-7 px-2 rounded-md bg-surface-2 border border-border-default text-xs text-text-secondary hover:text-text-primary no-print"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-xl border border-border-default bg-surface p-4 text-sm">
        <code>{content}</code>
      </pre>
    </div>
  );
}

function CheatSheetDetail() {
  const { sheet } = Route.useLoaderData() as { sheet: CheatSheet };
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="no-print">
        <Breadcrumb
          items={[
            { href: "/", label: "Home" },
            { href: "/cheatsheets", label: "Cheat Sheets" },
            { label: sheet.title },
          ]}
        />
      </div>

      <header className="mt-4 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Badge tone="muted">{sheet.category}</Badge>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary">
            {sheet.title}
          </h1>
          <p className="mt-2 text-text-secondary">{sheet.description}</p>
        </div>
        <div className="flex items-center gap-2 no-print">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-border-default text-sm hover:bg-surface-2"
          >
            <Printer className="h-4 w-4" /> Print
          </button>
        </div>
      </header>

      <div className="mt-8">
        {sheet.contentBlocks.map((b: CheatSheetBlock, i: number) => {
          if (b.type === "code") return <CodeBlock key={i} language={b.language} content={b.content} />;
          if (b.type === "image" && b.content)
            return (
              <figure key={i} className="my-4">
                <img src={b.content} alt={b.caption ?? ""} className="rounded-xl border border-border-default" loading="lazy" />
                {b.caption && (
                  <figcaption className="mt-2 text-xs text-text-muted text-center">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          return (
            <p key={i} className="mt-4 text-text-primary leading-relaxed">
              {b.content}
            </p>
          );
        })}
      </div>
    </div>
  );
}
