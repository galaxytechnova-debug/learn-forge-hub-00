import type { FreeResource } from "@/types/content";

const resources: FreeResource[] = [
  { slug: "mdn-web-docs", title: "MDN Web Docs", type: "docs", description: "The definitive reference for HTML, CSS, and JavaScript.", link: "https://developer.mozilla.org", isFree: true, tags: ["web", "reference"] },
  { slug: "javascript-info", title: "The Modern JavaScript Tutorial", type: "course", description: "A deep, well-written JS course from basics to advanced.", link: "https://javascript.info", isFree: true, tags: ["javascript"] },
  { slug: "cs50", title: "Harvard CS50", type: "course", description: "Harvard's flagship intro to computer science.", link: "https://cs50.harvard.edu", isFree: true, tags: ["cs", "fundamentals"] },
  { slug: "you-dont-know-js", title: "You Don't Know JS Yet", type: "book", description: "A book series on JS internals by Kyle Simpson.", link: "https://github.com/getify/You-Dont-Know-JS", isFree: true, tags: ["javascript", "book"] },
  { slug: "fireship-yt", title: "Fireship on YouTube", type: "youtube", description: "Fast, dense videos on modern web tools and concepts.", link: "https://www.youtube.com/@Fireship", isFree: true, tags: ["youtube", "web"] },
  { slug: "lucide-icons", title: "Lucide Icons", type: "icon", description: "Beautiful open-source icon set, tree-shakeable.", link: "https://lucide.dev", isFree: true, tags: ["icons"] },
  { slug: "google-fonts", title: "Google Fonts", type: "font", description: "Free web fonts library.", link: "https://fonts.google.com", isFree: true, tags: ["fonts"] },
  { slug: "vercel", title: "Vercel", type: "hosting", description: "Zero-config hosting for modern web apps.", link: "https://vercel.com", isFree: true, tags: ["hosting"] },
  { slug: "cloudflare-pages", title: "Cloudflare Pages", type: "hosting", description: "Generous free tier, global edge.", link: "https://pages.cloudflare.com", isFree: true, tags: ["hosting", "edge"] },
  { slug: "neon", title: "Neon", type: "database", description: "Serverless Postgres with a free tier.", link: "https://neon.tech", isFree: true, tags: ["postgres"] },
  { slug: "supabase", title: "Supabase", type: "database", description: "Open-source Firebase alternative on Postgres.", link: "https://supabase.com", isFree: true, tags: ["postgres", "auth"] },
  { slug: "openai-api", title: "OpenAI API", type: "api", description: "Access GPT and embeddings models.", link: "https://platform.openai.com", isFree: false, tags: ["ai"] },
  { slug: "llama-3", title: "Llama 3", type: "ai-model", description: "Meta's open weights family of LLMs.", link: "https://llama.meta.com", isFree: true, tags: ["ai", "llm"] },
];

export async function getAllResources(): Promise<FreeResource[]> {
  return resources;
}
export async function getResourceTypes(): Promise<FreeResource["type"][]> {
  return Array.from(new Set(resources.map((r) => r.type)));
}
