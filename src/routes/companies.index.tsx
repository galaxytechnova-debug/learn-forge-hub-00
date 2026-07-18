import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { getAllCompanies } from "@/lib/data/companies";
import { Badge, difficultyTone } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import type { CompanyExperience } from "@/types/content";

export const Route = createFileRoute("/companies/")({
  loader: async () => ({ companies: await getAllCompanies() }),
  component: CompaniesList,
  head: () => ({
    meta: [
      { title: "Company Interview Experiences — DevVerse" },
      { name: "description", content: "Anonymized interview loops from real candidates — rounds, questions, and how they prepared." },
      { property: "og:title", content: "Interview Experiences — DevVerse" },
      { property: "og:url", content: "/companies" },
    ],
    links: [{ rel: "canonical", href: "/companies" }],
  }),
});

function CompaniesList() {
  const { companies } = Route.useLoaderData() as { companies: CompanyExperience[] };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Companies" }]} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">
        Company Interview Experiences
      </h1>
      <p className="mt-2 text-text-secondary max-w-2xl">
        Round-by-round breakdowns from real candidates. Learn what to prep for before you apply.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((c) => (
          <Link
            key={c.slug}
            to="/companies/$slug"
            params={{ slug: c.slug }}
            className="rounded-2xl border border-border-default bg-surface p-6 hover:border-border-strong transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-text-primary">{c.companyName}</div>
                <div className="text-xs text-text-secondary">{c.role}</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone={difficultyTone(c.overallDifficulty)}>{c.overallDifficulty}</Badge>
              <Badge
                tone={
                  c.outcome === "selected" ? "easy" : c.outcome === "rejected" ? "hard" : "medium"
                }
              >
                {c.outcome}
              </Badge>
              <Badge tone="muted">{c.rounds.length} rounds</Badge>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
