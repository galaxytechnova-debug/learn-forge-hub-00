import type { InterviewQuestion, QDifficulty } from "@/types/content";

const questions: InterviewQuestion[] = [
  {
    slug: "explain-event-loop",
    title: "Explain the JavaScript event loop",
    category: "JavaScript",
    difficulty: "medium",
    questionType: "theory",
    question: "How does the JavaScript event loop work, and how does it coordinate the call stack, task queue, and microtask queue?",
    answer:
      "JavaScript is single-threaded. The event loop repeatedly checks the call stack: if empty, it drains all microtasks (Promise callbacks, queueMicrotask) then takes one macrotask (setTimeout, I/O) and pushes its callback onto the stack. Microtasks always run before the next macrotask, which is why Promise.resolve().then(...) runs before setTimeout(..., 0).",
    explanation:
      "The distinction between microtasks and macrotasks matters for ordering guarantees, DOM updates, and avoiding starvation.",
    code: {
      language: "javascript",
      body: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// Output: A D C B`,
    },
    companyTags: ["Google", "Meta", "Amazon"],
    tags: ["javascript", "async", "concurrency"],
    relatedQuestionSlugs: ["react-reconciliation"],
    createdAt: "2025-11-01",
  },
  {
    slug: "react-reconciliation",
    title: "How does React reconciliation work?",
    category: "React",
    difficulty: "hard",
    questionType: "theory",
    question: "Describe React's reconciliation algorithm and how the virtual DOM diff is computed.",
    answer:
      "React builds a tree of elements on each render, then diffs it against the previous tree using O(n) heuristics: different element types cause a full subtree remount; same type diffs props; lists use `key` to match children between renders. React 18+ uses Fiber, a linked-list of units of work that can be interrupted and prioritized.",
    companyTags: ["Meta", "Netflix"],
    tags: ["react", "internals"],
    relatedQuestionSlugs: ["explain-event-loop"],
    createdAt: "2025-11-02",
  },
  {
    slug: "sql-vs-nosql",
    title: "SQL vs NoSQL: when would you choose each?",
    category: "Databases",
    difficulty: "easy",
    questionType: "theory",
    question: "Compare SQL and NoSQL databases. Give concrete scenarios where each is the better choice.",
    answer:
      "SQL (Postgres, MySQL) offers strong schemas, ACID transactions, and rich joins — pick it when data is highly relational and consistency matters (payments, orders). NoSQL splits into document (MongoDB), key-value (Redis, DynamoDB), wide-column (Cassandra), and graph (Neo4j). Choose document stores for flexible, denormalized data (product catalogs, user profiles); key-value for caching and session stores; wide-column for time-series and huge writes; graph for relationship-heavy data.",
    companyTags: ["Amazon", "Uber"],
    tags: ["databases", "system-design"],
    relatedQuestionSlugs: ["design-rate-limiter"],
    createdAt: "2025-11-03",
  },
  {
    slug: "design-rate-limiter",
    title: "Design a rate limiter",
    category: "System Design",
    difficulty: "hard",
    questionType: "scenario",
    question: "Design a rate limiter that supports 100 requests per user per minute. Discuss algorithms and storage.",
    answer:
      "Common algorithms: fixed window (simple, edge bursts), sliding window log (accurate, memory heavy), sliding window counter (weighted average of two windows, good balance), token bucket (allows bursts up to bucket size), and leaky bucket (smooths traffic). Store counters in Redis with INCR + EXPIRE for atomicity. For distributed systems, use a central Redis or Redis Cluster; if latency matters, do a two-tier design with in-memory local counters that periodically sync.",
    code: {
      language: "javascript",
      body: `// Redis sliding window counter (pseudo)
const key = 'rl:' + userId;
const now = Date.now();
const windowMs = 60_000;
await redis.zremrangebyscore(key, 0, now - windowMs);
const count = await redis.zcard(key);
if (count >= 100) return TOO_MANY;
await redis.zadd(key, now, now + ':' + Math.random());
await redis.expire(key, 60);`,
    },
    companyTags: ["Stripe", "Cloudflare", "Amazon"],
    tags: ["system-design", "redis", "scaling"],
    relatedQuestionSlugs: ["sql-vs-nosql"],
    createdAt: "2025-11-05",
  },
  {
    slug: "two-sum",
    title: "Two Sum",
    category: "DSA",
    difficulty: "easy",
    questionType: "coding",
    question: "Given an array of integers and a target, return the indices of the two numbers that add up to the target.",
    answer:
      "Use a hash map from value to index. For each element, check if `target - x` was already seen; if so return the pair. O(n) time, O(n) space.",
    code: {
      language: "typescript",
      body: `function twoSum(nums: number[], target: number): [number, number] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need)!, i];
    seen.set(nums[i], i);
  }
  throw new Error("no solution");
}`,
    },
    companyTags: ["Google", "Amazon", "Microsoft"],
    tags: ["arrays", "hashmap"],
    relatedQuestionSlugs: [],
    createdAt: "2025-11-06",
  },
  {
    slug: "tell-me-about-a-conflict",
    title: "Tell me about a time you had a conflict with a teammate",
    category: "Behavioral",
    difficulty: "medium",
    questionType: "behavioral",
    question: "Tell me about a time you had a conflict with a teammate and how you resolved it.",
    answer:
      "Use STAR: Situation, Task, Action, Result. Pick a real conflict about approach (not personality). Show you sought to understand their view, proposed a data-backed compromise, and describe the concrete outcome (shipped feature, better team trust). Avoid blaming.",
    companyTags: ["Amazon", "Meta"],
    tags: ["behavioral", "star"],
    relatedQuestionSlugs: [],
    createdAt: "2025-11-08",
  },
  {
    slug: "closures-in-javascript",
    title: "What is a closure in JavaScript?",
    category: "JavaScript",
    difficulty: "easy",
    questionType: "theory",
    question: "Explain closures in JavaScript with an example.",
    answer:
      "A closure is a function bundled with references to its surrounding lexical scope. Even after the outer function returns, the inner function can still access those variables.",
    code: {
      language: "javascript",
      body: `function counter() {
  let n = 0;
  return () => ++n;
}
const c = counter();
c(); c(); c(); // 3`,
    },
    companyTags: ["Google", "Adobe"],
    tags: ["javascript", "fundamentals"],
    relatedQuestionSlugs: ["explain-event-loop"],
    createdAt: "2025-11-10",
  },
  {
    slug: "http-status-codes",
    title: "Common HTTP status codes and when to use them",
    category: "Web",
    difficulty: "easy",
    questionType: "theory",
    question: "Which HTTP status codes would you use for common API scenarios?",
    answer:
      "200 OK for successful GET, 201 Created for successful POST creating a resource, 204 No Content for successful DELETE. 400 for validation errors, 401 for missing/invalid auth, 403 for authenticated-but-forbidden, 404 for missing resources, 409 for conflicts (e.g. duplicate email), 429 for rate limits, 500 for server errors, 503 for maintenance.",
    companyTags: ["Stripe", "Shopify"],
    tags: ["http", "api"],
    relatedQuestionSlugs: [],
    createdAt: "2025-11-12",
  },
];

export interface QuestionFilters {
  category?: string;
  difficulty?: QDifficulty;
  questionType?: InterviewQuestion["questionType"];
  company?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export async function getInterviewQuestions(
  filters: QuestionFilters = {},
): Promise<{ items: InterviewQuestion[]; total: number }> {
  let items = questions.slice();
  if (filters.category) items = items.filter((q) => q.category === filters.category);
  if (filters.difficulty) items = items.filter((q) => q.difficulty === filters.difficulty);
  if (filters.questionType) items = items.filter((q) => q.questionType === filters.questionType);
  if (filters.company) items = items.filter((q) => q.companyTags.includes(filters.company!));
  if (filters.tag) items = items.filter((q) => q.tags.includes(filters.tag!));
  if (filters.search) {
    const s = filters.search.toLowerCase();
    items = items.filter(
      (q) => q.title.toLowerCase().includes(s) || q.question.toLowerCase().includes(s),
    );
  }
  const total = items.length;
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;
  items = items.slice((page - 1) * limit, page * limit);
  return { items, total };
}

export async function getInterviewQuestionBySlug(slug: string): Promise<InterviewQuestion | null> {
  return questions.find((q) => q.slug === slug) ?? null;
}

export async function getInterviewCategories(): Promise<string[]> {
  return Array.from(new Set(questions.map((q) => q.category))).sort();
}

export async function getDailyQuestion(): Promise<InterviewQuestion> {
  // Deterministic daily pick based on YYYY-MM-DD
  const day = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < day.length; i++) hash = (hash * 31 + day.charCodeAt(i)) >>> 0;
  return questions[hash % questions.length];
}
