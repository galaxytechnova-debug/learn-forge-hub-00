import type { Article } from "@/types/content";

function wordsPerMin(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

const raw: Omit<Article, "estimatedReadTime">[] = [
  {
    slug: "how-to-crack-your-first-swe-interview",
    title: "How to Crack Your First SWE Interview",
    category: "career",
    author: "DevVerse Editorial",
    publishedAt: "2025-12-01",
    tags: ["interview", "career", "entry-level"],
    content: `Landing your first software engineering role is less about being a genius and more about being prepared, deliberate, and consistent.\n\nStart with fundamentals. Data structures and algorithms are still the gatekeeper at most companies — arrays, hashmaps, trees, graphs, and dynamic programming. Do 100 problems slowly, not 500 in a panic.\n\nBuild two portfolio projects that are complete: hosted, with a README, tests, and one non-trivial feature. Depth beats breadth. Recruiters will ask what you built. Have a two-minute story for each.\n\nApply widely but tailor each application. Reference the company's product or a recent blog post in your outreach. Cold-apply is a numbers game — expect a 5–10% response rate at best.\n\nPractice mock interviews out loud. The gap between "I know this" and "I can explain this while a stranger watches" is huge, and it closes only with reps.\n\nFinally: negotiate. Even entry-level offers have a spread. Ask, politely, once.`,
  },
  {
    slug: "resume-red-flags-and-fixes",
    title: "Resume Red Flags — and How to Fix Them",
    category: "resume",
    author: "DevVerse Editorial",
    publishedAt: "2025-12-10",
    tags: ["resume"],
    content: `Recruiters spend 7 seconds on your resume. Make each line earn its place.\n\nRed flag: skill soup. A list of 40 technologies signals nothing. Instead, list the 8–12 you'd feel comfortable defending in an interview.\n\nRed flag: vague bullet points. "Worked on the frontend" tells me nothing. Rewrite: "Rebuilt the checkout flow in React + TypeScript, cutting drop-off by 18%." Numbers, action verb, outcome.\n\nRed flag: two pages for a two-year career. If you can't fit it on one page, you haven't edited hard enough.\n\nRed flag: dated buzzwords. "Synergized cross-functional stakeholders" reads as filler. Say what you actually did.\n\nFix: for every bullet, ask "so what?" until you land on a business or technical outcome. That's the version that goes on the page.`,
  },
  {
    slug: "how-to-choose-your-first-tech-stack",
    title: "How to Choose Your First Tech Stack",
    category: "career",
    author: "DevVerse Editorial",
    publishedAt: "2025-12-20",
    tags: ["beginners", "learning"],
    content: `The best stack for learning is the one you'll actually finish a project in.\n\nFor most beginners in 2026, that means: HTML + CSS + JavaScript, then React for the frontend, then Node.js with a lightweight framework (Fastify or Hono) for the backend, and Postgres for the database.\n\nAvoid picking niche or bleeding-edge tools first. You want a big community when you get stuck at 11pm on a Wednesday. Boring is a feature.\n\nOnce you've shipped one full-stack project end-to-end, then experiment. Try Rust, try Elixir, try whatever catches your eye. The second stack is much easier than the first.`,
  },
];

const articles: Article[] = raw.map((a) => ({ ...a, estimatedReadTime: wordsPerMin(a.content) }));

export async function getAllArticles(category?: Article["category"]): Promise<Article[]> {
  return category ? articles.filter((a) => a.category === category) : articles;
}
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return articles.find((a) => a.slug === slug) ?? null;
}
export async function getRelatedArticles(slug: string, limit = 3): Promise<Article[]> {
  const target = articles.find((a) => a.slug === slug);
  if (!target) return [];
  const scored = articles
    .filter((a) => a.slug !== slug)
    .map((a) => {
      let score = a.category === target.category ? 2 : 0;
      score += a.tags.filter((t) => target.tags.includes(t)).length;
      return { a, score };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
  return scored;
}
