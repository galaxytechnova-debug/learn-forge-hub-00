import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getAllRoadmaps } from "@/lib/data/roadmaps";
import { getInterviewQuestions } from "@/lib/data/interview-questions";
import { getAllCheatSheets } from "@/lib/data/cheatsheets";
import { getAllProjects } from "@/lib/data/projects";
import { getAllArticles } from "@/lib/data/articles";
import { getAllCompanies } from "@/lib/data/companies";

const BASE_URL = "";

interface E {
  path: string;
  changefreq?: string;
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: E[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/roadmaps", changefreq: "weekly", priority: "0.9" },
          { path: "/interview-questions", changefreq: "weekly", priority: "0.9" },
          { path: "/cheatsheets", changefreq: "weekly", priority: "0.8" },
          { path: "/projects", changefreq: "weekly", priority: "0.7" },
          { path: "/resources", changefreq: "monthly", priority: "0.6" },
          { path: "/career-guidance", changefreq: "weekly", priority: "0.7" },
          { path: "/resume-tips", changefreq: "monthly", priority: "0.6" },
          { path: "/companies", changefreq: "weekly", priority: "0.7" },
        ];

        const [rs, qs, cs, ps, as, cos] = await Promise.all([
          getAllRoadmaps(),
          getInterviewQuestions({ limit: 10000 }),
          getAllCheatSheets(),
          getAllProjects(),
          getAllArticles(),
          getAllCompanies(),
        ]);
        rs.forEach((r) => entries.push({ path: `/roadmaps/${r.slug}`, priority: "0.7" }));
        qs.items.forEach((q) => entries.push({ path: `/interview-questions/${q.slug}`, priority: "0.6" }));
        cs.forEach((c) => entries.push({ path: `/cheatsheets/${c.slug}`, priority: "0.6" }));
        ps.forEach((p) => entries.push({ path: `/projects/${p.slug}`, priority: "0.5" }));
        as.forEach((a) =>
          entries.push({
            path: (a.category === "resume" ? "/resume-tips/" : "/career-guidance/") + a.slug,
            priority: "0.5",
          }),
        );
        cos.forEach((c) => entries.push({ path: `/companies/${c.slug}`, priority: "0.5" }));

        const urls = entries
          .map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
