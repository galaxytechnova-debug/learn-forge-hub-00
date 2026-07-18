import type { CompanyExperience } from "@/types/content";

const experiences: CompanyExperience[] = [
  {
    slug: "google-swe-intern-2025",
    companyName: "Google",
    role: "Software Engineering Intern",
    experienceLevel: "intern",
    overallDifficulty: "hard",
    outcome: "selected",
    rounds: [
      {
        roundName: "Online Assessment",
        description: "Two coding problems in 90 minutes on a shared judge.",
        questionsAsked: ["Sliding window maximum", "Serialize/deserialize a binary tree"],
      },
      {
        roundName: "Technical Phone Screen",
        description: "45-minute coding interview on Google Docs.",
        questionsAsked: ["Word ladder shortest path", "Follow-up: how would you scale it?"],
      },
      {
        roundName: "Virtual Onsite",
        description: "Three coding rounds, one behavioral. Focus on DS/algo and communication.",
        questionsAsked: ["LRU cache", "K closest points to origin", "Design a rate limiter (open-ended)"],
      },
    ],
    content:
      "Preparation took roughly 3 months, ~200 LeetCode problems, and one paid mock. The behavioral round was surprisingly conversational — they seemed to look for genuine curiosity more than rehearsed answers.",
    tags: ["FAANG", "internship"],
    createdAt: "2025-11-15",
  },
  {
    slug: "stripe-backend-l3-2025",
    companyName: "Stripe",
    role: "Backend Engineer (L3)",
    experienceLevel: "entry",
    overallDifficulty: "hard",
    outcome: "selected",
    rounds: [
      { roundName: "Recruiter Chat", description: "Culture, timeline, comp expectations.", questionsAsked: [] },
      { roundName: "Take-home Project", description: "Build a small API endpoint in your language of choice. 4 hours suggested.", questionsAsked: ["Implement a webhook dispatcher with retries and exponential backoff."] },
      { roundName: "Debugging Interview", description: "Given a broken Node service, find and fix three bugs live.", questionsAsked: [] },
      { roundName: "System Design", description: "Design an idempotent payment endpoint.", questionsAsked: ["Design idempotency keys", "How to handle partial failures across services"] },
      { roundName: "Behavioral", description: "Two rounds — impact and collaboration.", questionsAsked: ["Tell me about a project you shipped end-to-end."] },
    ],
    content: "Stripe values real-world software judgement heavily. The debugging round felt like an actual day of work. Practice reading unfamiliar code fast.",
    tags: ["stripe", "backend"],
    createdAt: "2025-12-01",
  },
  {
    slug: "amazon-sde1-2025",
    companyName: "Amazon",
    role: "SDE-1",
    experienceLevel: "entry",
    overallDifficulty: "medium",
    outcome: "rejected",
    rounds: [
      { roundName: "Online Assessment", description: "Two coding problems + work simulation.", questionsAsked: ["Robot on a grid", "Optimal warehouse layout (simulation)"] },
      { roundName: "Phone Screen", description: "One coding + one Leadership Principle.", questionsAsked: ["Merge intervals", "Tell me about a time you disagreed with a manager."] },
      { roundName: "Onsite (Loop)", description: "Four rounds, each mixed coding + LP.", questionsAsked: ["LRU cache", "Design a parking lot", "Behavioral: 'Have Backbone; Disagree and Commit'"] },
    ],
    content: "Coding was fine; I underprepared for Leadership Principles. Bring 2 STAR stories per LP, drilled and specific.",
    tags: ["amazon", "faang"],
    createdAt: "2025-12-10",
  },
];

export async function getAllCompanies(): Promise<CompanyExperience[]> {
  return experiences;
}
export async function getCompanyBySlug(slug: string): Promise<CompanyExperience | null> {
  return experiences.find((c) => c.slug === slug) ?? null;
}
