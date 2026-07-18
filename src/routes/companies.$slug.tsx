import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getCompanyBySlug } from "@/lib/data/companies";
import { Badge, difficultyTone } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import { BookmarkButton } from "@/components/BookmarkButton";
import type { CompanyExperience, CompanyRound } from "@/types/content";

export const Route = createFileRoute("/companies/$slug")({
  loader: async ({ params }) => {
    const company = await getCompanyBySlug(params.slug);
    if (!company) throw notFound();
    return { company };
  },
  component: CompanyDetail,
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.company;
    return {
      meta: [
        { title: `${c.companyName} — ${c.role} Interview — DevVerse` },
        { name: "description", content: c.content.slice(0, 160) },
        { property: "og:title", content: `${c.companyName} — ${c.role}` },
        { property: "og:url", content: `/companies/${c.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/companies/${c.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="p-24 text-center">
      <h1 className="text-3xl font-bold">Not found</h1>
      <Link to="/companies" className="text-primary mt-4 inline-block">Back</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-8 text-center">
      <p>{error.message}</p>
      <button onClick={reset} className="text-primary">Retry</button>
    </div>
  ),
});

function CompanyDetail() {
  const { company: c } = Route.useLoaderData() as { company: CompanyExperience };
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/companies", label: "Companies" },
          { label: c.companyName },
        ]}
      />

      <header className="mt-4 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">{c.companyName}</h1>
          <div className="mt-2 text-text-secondary">{c.role} · {c.experienceLevel}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone={difficultyTone(c.overallDifficulty)}>{c.overallDifficulty}</Badge>
            <Badge
              tone={
                c.outcome === "selected" ? "easy" : c.outcome === "rejected" ? "hard" : "medium"
              }
            >
              {c.outcome}
            </Badge>
          </div>
        </div>
        <BookmarkButton type="company" slug={c.slug} title={`${c.companyName} — ${c.role}`} />
      </header>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-text-primary">The rounds</h2>
        <div className="mt-4 grid gap-2">
          {c.rounds.map((r: CompanyRound, i: number) => (
            <RoundAccordion key={i} round={r} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-text-primary">Notes</h2>
        <p className="mt-3 text-text-primary leading-relaxed whitespace-pre-line">{c.content}</p>
      </section>
    </div>
  );
}

function RoundAccordion({ round }: { round: CompanyRound }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border-default bg-surface overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div>
          <div className="font-semibold text-text-primary">{round.roundName}</div>
          <div className="text-sm text-text-secondary mt-0.5">{round.description}</div>
        </div>
        <ChevronDown
          className={"h-5 w-5 text-text-muted transition-transform " + (open ? "rotate-180" : "")}
        />
      </button>
      {open && round.questionsAsked.length > 0 && (
        <div className="border-t border-border-default p-4 bg-background">
          <div className="text-xs uppercase tracking-wider text-text-muted font-semibold">
            Questions asked
          </div>
          <ul className="mt-2 grid gap-2 list-disc pl-5 text-text-primary text-sm">
            {round.questionsAsked.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
