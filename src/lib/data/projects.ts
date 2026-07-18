import type { ProjectIdea } from "@/types/content";

const projects: ProjectIdea[] = [
  {
    slug: "realtime-chat-app",
    title: "Realtime Chat App",
    difficulty: "intermediate",
    category: "Full-Stack",
    description:
      "A Slack-style chat with channels, DMs, presence indicators, typing indicators, and message search.",
    features: [
      "Sign up / sign in",
      "Public channels and private DMs",
      "Realtime message delivery via WebSockets",
      "Presence and typing indicators",
      "Message search",
      "File uploads with previews",
    ],
    techStack: ["React", "TypeScript", "Node.js", "WebSockets", "PostgreSQL", "Redis"],
    folderStructure: `chat-app/\n  apps/\n    web/         # React frontend\n    api/         # Node WebSocket + REST\n  packages/\n    shared/      # Shared types\n  docker-compose.yml`,
    apiList: [
      "POST /auth/signup",
      "POST /auth/login",
      "GET /channels",
      "POST /channels",
      "GET /channels/:id/messages",
      "WS /realtime",
    ],
    deploymentNotes:
      "Deploy web to Vercel/Netlify, API to Fly.io or Render (WebSockets supported). Managed Postgres and Redis.",
    challenges: ["Scaling WebSockets horizontally", "Message ordering under load", "Presence accuracy"],
    learningOutcomes: [
      "WebSocket lifecycle and reconnection",
      "Realtime UX patterns",
      "Auth on both HTTP and WS",
    ],
    createdAt: "2025-11-01",
  },
  {
    slug: "kanban-board",
    title: "Kanban Board (Trello Clone)",
    difficulty: "beginner",
    category: "Frontend",
    description: "Drag-and-drop board with lists and cards, persisted locally then to an API.",
    features: ["Boards, lists, cards", "Drag and drop", "Card details modal", "Search and labels"],
    techStack: ["React", "TypeScript", "dnd-kit", "Local storage"],
    folderStructure: `kanban/\n  src/\n    components/\n    store/\n    utils/`,
    apiList: ["GET /boards", "POST /cards", "PATCH /cards/:id"],
    deploymentNotes: "Any static host works — Vercel, Netlify, Cloudflare Pages.",
    challenges: ["Optimistic updates", "Reordering algorithms"],
    learningOutcomes: ["Complex state management", "Accessibility for DnD"],
    createdAt: "2025-11-05",
  },
  {
    slug: "url-shortener",
    title: "URL Shortener",
    difficulty: "intermediate",
    category: "Backend",
    description: "Bitly-style shortener with analytics, custom slugs, and expiration.",
    features: ["Short link creation", "Custom slugs", "Click analytics", "Expiration"],
    techStack: ["Node.js", "Fastify", "PostgreSQL", "Redis"],
    folderStructure: `shortener/\n  src/\n    routes/\n    services/\n    db/`,
    apiList: ["POST /links", "GET /:slug (302)", "GET /links/:id/stats"],
    deploymentNotes: "Fly.io or Railway with managed Postgres. Redis for hot cache.",
    challenges: ["Base62 encoding", "Cache invalidation", "Preventing enumeration"],
    learningOutcomes: ["High-throughput reads", "Caching strategies"],
    createdAt: "2025-11-08",
  },
  {
    slug: "personal-finance-tracker",
    title: "Personal Finance Tracker",
    difficulty: "advanced",
    category: "Full-Stack",
    description:
      "Track expenses, categorize transactions, visualize spending, and set monthly budgets.",
    features: ["CSV import", "Auto-categorization", "Budgets", "Charts and reports"],
    techStack: ["Next.js or TanStack Start", "PostgreSQL", "Recharts"],
    folderStructure: `finance/\n  app/\n  components/\n  lib/\n  db/`,
    apiList: ["GET /transactions", "POST /budgets", "GET /reports/monthly"],
    deploymentNotes: "Vercel + Supabase or Neon.",
    challenges: ["Data privacy", "Aggregation performance"],
    learningOutcomes: ["Real product thinking", "Data visualization"],
    createdAt: "2025-11-15",
  },
];

export interface ProjectFilters {
  difficulty?: ProjectIdea["difficulty"];
  category?: string;
  tech?: string;
}

export async function getAllProjects(filters: ProjectFilters = {}): Promise<ProjectIdea[]> {
  let items = projects.slice();
  if (filters.difficulty) items = items.filter((p) => p.difficulty === filters.difficulty);
  if (filters.category) items = items.filter((p) => p.category === filters.category);
  if (filters.tech) items = items.filter((p) => p.techStack.includes(filters.tech!));
  return items;
}
export async function getProjectBySlug(slug: string): Promise<ProjectIdea | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}
