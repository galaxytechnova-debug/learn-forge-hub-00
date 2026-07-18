// Client-side search index. Built once from all repository sources.
// Future migration: replace with fetch("/api/search?q=...").

import { getAllRoadmaps } from "./data/roadmaps";
import { getInterviewQuestions } from "./data/interview-questions";
import { getAllCheatSheets } from "./data/cheatsheets";
import { getAllProjects } from "./data/projects";
import { getAllResources } from "./data/resources";
import { getAllArticles } from "./data/articles";
import { getAllCompanies } from "./data/companies";

export type SearchType =
  | "roadmap"
  | "interview-question"
  | "cheatsheet"
  | "project"
  | "resource"
  | "article"
  | "company";

export interface SearchDoc {
  type: SearchType;
  slug: string;
  title: string;
  description: string;
  category?: string;
  tags: string[];
  href: string;
}

let cache: SearchDoc[] | null = null;

export async function getSearchIndex(): Promise<SearchDoc[]> {
  if (cache) return cache;
  const [roadmaps, qs, sheets, projects, resources, articles, companies] = await Promise.all([
    getAllRoadmaps(),
    getInterviewQuestions({ limit: 10000 }),
    getAllCheatSheets(),
    getAllProjects(),
    getAllResources(),
    getAllArticles(),
    getAllCompanies(),
  ]);
  const docs: SearchDoc[] = [
    ...roadmaps.map((r) => ({ type: "roadmap" as const, slug: r.slug, title: r.title, description: r.description, category: r.category, tags: [], href: `/roadmaps/${r.slug}` })),
    ...qs.items.map((q) => ({ type: "interview-question" as const, slug: q.slug, title: q.title, description: q.question, category: q.category, tags: q.tags, href: `/interview-questions/${q.slug}` })),
    ...sheets.map((c) => ({ type: "cheatsheet" as const, slug: c.slug, title: c.title, description: c.description, category: c.category, tags: c.tags, href: `/cheatsheets/${c.slug}` })),
    ...projects.map((p) => ({ type: "project" as const, slug: p.slug, title: p.title, description: p.description, category: p.category, tags: p.techStack, href: `/projects/${p.slug}` })),
    ...resources.map((r) => ({ type: "resource" as const, slug: r.slug, title: r.title, description: r.description, category: r.type, tags: r.tags, href: r.link })),
    ...articles.map((a) => ({ type: "article" as const, slug: a.slug, title: a.title, description: a.content.slice(0, 160), category: a.category, tags: a.tags, href: a.category === "resume" ? `/resume-tips/${a.slug}` : `/career-guidance/${a.slug}` })),
    ...companies.map((c) => ({ type: "company" as const, slug: c.slug, title: `${c.companyName} — ${c.role}`, description: c.content.slice(0, 160), category: c.experienceLevel, tags: c.tags, href: `/companies/${c.slug}` })),
  ];
  cache = docs;
  return docs;
}

// Tiny scoring: token match on title (weight 3), description (2), tags (1).
export function searchDocs(docs: SearchDoc[], q: string, limit = 20): SearchDoc[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const tokens = query.split(/\s+/).filter(Boolean);
  const scored = docs
    .map((d) => {
      const t = d.title.toLowerCase();
      const desc = d.description.toLowerCase();
      const tags = d.tags.join(" ").toLowerCase();
      let score = 0;
      for (const tok of tokens) {
        if (t.includes(tok)) score += 3;
        if (desc.includes(tok)) score += 2;
        if (tags.includes(tok)) score += 1;
      }
      return { d, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map((x) => x.d);
}

export const SEARCH_TYPE_LABEL: Record<SearchType, string> = {
  roadmap: "Roadmap",
  "interview-question": "Interview Question",
  cheatsheet: "Cheat Sheet",
  project: "Project",
  resource: "Resource",
  article: "Article",
  company: "Company",
};
