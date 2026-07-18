import type { Roadmap } from "@/types/content";

const roadmaps: Roadmap[] = [
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    description:
      "Everything you need to become a modern frontend engineer — from HTML fundamentals to advanced React patterns and performance.",
    icon: "Layout",
    category: "Frontend",
    estimatedTime: "4-6 months",
    sections: [
      {
        level: "beginner",
        topics: [
          {
            order: 1,
            title: "HTML & Semantic Markup",
            description: "Document structure, semantic tags, forms, accessibility basics.",
            resourceLinks: ["https://developer.mozilla.org/en-US/docs/Web/HTML"],
          },
          {
            order: 2,
            title: "CSS Fundamentals",
            description: "Box model, flexbox, grid, positioning, responsive design.",
            resourceLinks: ["https://web.dev/learn/css"],
          },
          {
            order: 3,
            title: "JavaScript Essentials",
            description: "Variables, functions, arrays, objects, DOM manipulation, events.",
            resourceLinks: ["https://javascript.info"],
          },
          {
            order: 4,
            title: "Git & GitHub",
            description: "Version control basics, branching, pull requests, collaboration.",
            resourceLinks: ["https://learngitbranching.js.org"],
          },
        ],
      },
      {
        level: "intermediate",
        topics: [
          {
            order: 1,
            title: "React Fundamentals",
            description: "Components, props, state, hooks, effects, forms.",
            resourceLinks: ["https://react.dev"],
          },
          {
            order: 2,
            title: "TypeScript",
            description: "Types, generics, unions, utility types, typing React components.",
            resourceLinks: ["https://www.typescriptlang.org/docs/"],
          },
          {
            order: 3,
            title: "Modern CSS & Tailwind",
            description: "Utility-first CSS, design tokens, component patterns.",
            resourceLinks: ["https://tailwindcss.com/docs"],
          },
          {
            order: 4,
            title: "Routing & Data Fetching",
            description: "Client routing, loaders, caching, TanStack Query.",
            resourceLinks: ["https://tanstack.com/query/latest"],
          },
        ],
      },
      {
        level: "advanced",
        topics: [
          {
            order: 1,
            title: "Performance & Web Vitals",
            description: "Core Web Vitals, code splitting, image optimization, lazy loading.",
            resourceLinks: ["https://web.dev/vitals"],
          },
          {
            order: 2,
            title: "Testing",
            description: "Unit, integration, end-to-end. Vitest, Playwright.",
            resourceLinks: ["https://playwright.dev"],
          },
          {
            order: 3,
            title: "Architecture Patterns",
            description: "Component composition, state management, monorepos, SSR.",
            resourceLinks: [],
          },
        ],
      },
    ],
    relatedProjectSlugs: ["realtime-chat-app", "kanban-board"],
    relatedInterviewQuestionSlugs: ["explain-event-loop", "react-reconciliation"],
    seoTitle: "Frontend Developer Roadmap — DevVerse",
    seoDescription:
      "Step-by-step frontend roadmap covering HTML, CSS, JavaScript, React, TypeScript, and modern web performance.",
    createdAt: "2025-11-01",
    updatedAt: "2026-01-05",
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    description:
      "Design and build robust APIs, databases, and distributed systems — from HTTP basics to production-scale services.",
    icon: "Server",
    category: "Backend",
    estimatedTime: "5-7 months",
    sections: [
      {
        level: "beginner",
        topics: [
          {
            order: 1,
            title: "How the Internet Works",
            description: "HTTP, DNS, TCP/IP, browsers, servers.",
            resourceLinks: [],
          },
          {
            order: 2,
            title: "A Programming Language",
            description: "Pick Node.js, Python, or Go and learn it deeply.",
            resourceLinks: [],
          },
          {
            order: 3,
            title: "Databases 101",
            description: "Relational vs document, CRUD, indexing basics.",
            resourceLinks: [],
          },
        ],
      },
      {
        level: "intermediate",
        topics: [
          {
            order: 1,
            title: "REST & GraphQL APIs",
            description: "Designing resources, versioning, pagination, authentication.",
            resourceLinks: [],
          },
          {
            order: 2,
            title: "Auth & Security",
            description: "OAuth 2.0, JWT, sessions, CSRF, OWASP top 10.",
            resourceLinks: [],
          },
          {
            order: 3,
            title: "Caching & Queues",
            description: "Redis, message queues, background jobs.",
            resourceLinks: [],
          },
        ],
      },
      {
        level: "advanced",
        topics: [
          {
            order: 1,
            title: "System Design",
            description: "Scalability patterns, load balancing, sharding, CAP theorem.",
            resourceLinks: [],
          },
          {
            order: 2,
            title: "Observability",
            description: "Logging, metrics, tracing, SLO/SLI.",
            resourceLinks: [],
          },
        ],
      },
    ],
    relatedProjectSlugs: ["url-shortener"],
    relatedInterviewQuestionSlugs: ["design-rate-limiter"],
    seoTitle: "Backend Developer Roadmap — DevVerse",
    seoDescription:
      "Complete backend engineering roadmap: APIs, databases, authentication, caching, and distributed system design.",
    createdAt: "2025-11-05",
    updatedAt: "2026-01-05",
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    description:
      "Automate builds, ship reliably, and operate services at scale. From Linux basics to Kubernetes and observability.",
    icon: "Cog",
    category: "DevOps",
    estimatedTime: "6-8 months",
    sections: [
      {
        level: "beginner",
        topics: [
          { order: 1, title: "Linux & Shell", description: "Filesystem, permissions, bash scripting.", resourceLinks: [] },
          { order: 2, title: "Networking", description: "TCP/IP, DNS, HTTP, TLS.", resourceLinks: [] },
          { order: 3, title: "Git & CI Basics", description: "GitHub Actions, GitLab CI.", resourceLinks: [] },
        ],
      },
      {
        level: "intermediate",
        topics: [
          { order: 1, title: "Docker", description: "Containers, images, compose, registries.", resourceLinks: [] },
          { order: 2, title: "Infrastructure as Code", description: "Terraform, Pulumi.", resourceLinks: [] },
          { order: 3, title: "Cloud Providers", description: "AWS, GCP, or Azure fundamentals.", resourceLinks: [] },
        ],
      },
      {
        level: "advanced",
        topics: [
          { order: 1, title: "Kubernetes", description: "Pods, deployments, services, operators.", resourceLinks: [] },
          { order: 2, title: "Observability", description: "Prometheus, Grafana, OpenTelemetry.", resourceLinks: [] },
        ],
      },
    ],
    relatedProjectSlugs: [],
    relatedInterviewQuestionSlugs: [],
    seoTitle: "DevOps Roadmap — DevVerse",
    seoDescription: "Master DevOps: Linux, Docker, Kubernetes, IaC, CI/CD, and observability.",
    createdAt: "2025-11-10",
    updatedAt: "2026-01-05",
  },
  {
    slug: "ai-ml-engineer",
    title: "AI / ML Engineer",
    description:
      "From foundational math and Python to modern LLMs, RAG systems, and production ML pipelines.",
    icon: "Brain",
    category: "AI/ML",
    estimatedTime: "8-12 months",
    sections: [
      {
        level: "beginner",
        topics: [
          { order: 1, title: "Python & NumPy", description: "Language basics and array computing.", resourceLinks: [] },
          { order: 2, title: "Linear Algebra & Statistics", description: "Vectors, matrices, distributions.", resourceLinks: [] },
          { order: 3, title: "Classical ML", description: "Regression, trees, clustering.", resourceLinks: [] },
        ],
      },
      {
        level: "intermediate",
        topics: [
          { order: 1, title: "Deep Learning", description: "Neural networks, PyTorch.", resourceLinks: [] },
          { order: 2, title: "Transformers & LLMs", description: "Attention, tokenization, fine-tuning.", resourceLinks: [] },
        ],
      },
      {
        level: "advanced",
        topics: [
          { order: 1, title: "RAG & Agents", description: "Vector DBs, retrieval, tool use.", resourceLinks: [] },
          { order: 2, title: "MLOps", description: "Model serving, monitoring, versioning.", resourceLinks: [] },
        ],
      },
    ],
    relatedProjectSlugs: [],
    relatedInterviewQuestionSlugs: [],
    seoTitle: "AI / ML Engineer Roadmap — DevVerse",
    seoDescription: "Learn AI/ML end-to-end: Python, math, deep learning, LLMs, RAG, and MLOps.",
    createdAt: "2025-11-15",
    updatedAt: "2026-01-05",
  },
  {
    slug: "fullstack-developer",
    title: "Full-Stack Developer",
    description:
      "Ship end-to-end features. Combine strong frontend fundamentals with backend, databases, and deployment.",
    icon: "Layers",
    category: "Full-Stack",
    estimatedTime: "6-9 months",
    sections: [
      {
        level: "beginner",
        topics: [
          { order: 1, title: "Web Fundamentals", description: "HTML, CSS, JS, Git.", resourceLinks: [] },
          { order: 2, title: "One Frontend Framework", description: "React or Vue.", resourceLinks: [] },
          { order: 3, title: "One Backend Runtime", description: "Node.js or Python.", resourceLinks: [] },
        ],
      },
      {
        level: "intermediate",
        topics: [
          { order: 1, title: "Databases", description: "SQL and NoSQL.", resourceLinks: [] },
          { order: 2, title: "Auth", description: "Sessions, JWT, OAuth.", resourceLinks: [] },
          { order: 3, title: "Deployment", description: "Vercel, Netlify, Docker.", resourceLinks: [] },
        ],
      },
      {
        level: "advanced",
        topics: [
          { order: 1, title: "Performance", description: "Caching, CDN, N+1 fixes.", resourceLinks: [] },
          { order: 2, title: "Testing", description: "Unit, integration, e2e.", resourceLinks: [] },
        ],
      },
    ],
    relatedProjectSlugs: ["realtime-chat-app"],
    relatedInterviewQuestionSlugs: [],
    seoTitle: "Full-Stack Developer Roadmap — DevVerse",
    seoDescription: "Full-stack roadmap covering frontend, backend, databases, auth, and deployment.",
    createdAt: "2025-11-20",
    updatedAt: "2026-01-05",
  },
  {
    slug: "system-design",
    title: "System Design",
    description:
      "Design large-scale distributed systems. Load balancers, caching, sharding, consistency, and real-world case studies.",
    icon: "Network",
    category: "Backend",
    estimatedTime: "3-4 months",
    sections: [
      {
        level: "beginner",
        topics: [
          { order: 1, title: "Fundamentals", description: "Client-server, latency, throughput.", resourceLinks: [] },
          { order: 2, title: "Databases", description: "Indexing, replication, transactions.", resourceLinks: [] },
        ],
      },
      {
        level: "intermediate",
        topics: [
          { order: 1, title: "Caching", description: "Cache layers, eviction, invalidation.", resourceLinks: [] },
          { order: 2, title: "Message Queues", description: "Kafka, RabbitMQ, SQS.", resourceLinks: [] },
          { order: 3, title: "Load Balancing", description: "L4/L7, algorithms, session affinity.", resourceLinks: [] },
        ],
      },
      {
        level: "advanced",
        topics: [
          { order: 1, title: "Case Studies", description: "URL shortener, Twitter, WhatsApp, Uber.", resourceLinks: [] },
          { order: 2, title: "Consistency Patterns", description: "CAP, eventual consistency, quorum.", resourceLinks: [] },
        ],
      },
    ],
    relatedProjectSlugs: ["url-shortener"],
    relatedInterviewQuestionSlugs: ["design-rate-limiter"],
    seoTitle: "System Design Roadmap — DevVerse",
    seoDescription: "Master system design for interviews and real work: caching, queues, sharding, and case studies.",
    createdAt: "2025-12-01",
    updatedAt: "2026-01-05",
  },
];

// Repository API — signatures identical to a future REST wrapper.
export async function getAllRoadmaps(): Promise<Roadmap[]> {
  return roadmaps;
}
export async function getRoadmapBySlug(slug: string): Promise<Roadmap | null> {
  return roadmaps.find((r) => r.slug === slug) ?? null;
}
export async function getRoadmapCategories(): Promise<string[]> {
  return Array.from(new Set(roadmaps.map((r) => r.category))).sort();
}
