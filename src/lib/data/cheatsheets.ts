import type { CheatSheet } from "@/types/content";
import gitVisual from "@/assets/cheatsheet-git.jpg";
import flexboxVisual from "@/assets/cheatsheet-flexbox.jpg";



const cheatsheets: CheatSheet[] = [
  {
    slug: "git-essentials",
    title: "Git Essentials",
    category: "Tools",
    description: "The commands you actually use every day, plus the ones that save you when things break.",
    contentBlocks: [
      { type: "image", content: gitVisual, caption: "How branches diverge from main and merge back." },
      { type: "text", content: "Setup and everyday flow." },
      { type: "code", language: "bash", content: "git init\ngit clone <url>\ngit status\ngit add .\ngit commit -m \"msg\"\ngit push origin main" },
      { type: "text", content: "Branching." },
      { type: "code", language: "bash", content: "git branch feat/x\ngit switch feat/x\ngit merge main\ngit rebase main" },
      { type: "text", content: "Undoing things — the safe way." },
      { type: "code", language: "bash", content: "git restore <file>          # discard working changes\ngit reset HEAD~1            # undo last commit, keep changes\ngit revert <sha>            # new commit that undoes <sha>\ngit reflog                  # find lost commits" },
    ],
    thumbnailImageUrl: gitVisual,

    printable: true,
    tags: ["git", "cli"],
    createdAt: "2025-11-01",
  },
  {
    slug: "javascript-array-methods",
    title: "JavaScript Array Methods",
    category: "JavaScript",
    description: "map, filter, reduce, and everything else with a quick example each.",
    contentBlocks: [
      { type: "code", language: "javascript", content: "[1,2,3].map(x => x * 2)          // [2,4,6]\n[1,2,3].filter(x => x > 1)       // [2,3]\n[1,2,3].reduce((a,x) => a+x, 0)  // 6\n[1,2,3].some(x => x > 2)         // true\n[1,2,3].every(x => x > 0)        // true\n[1,2,3].find(x => x === 2)       // 2\n[1,2,3].flatMap(x => [x, x])     // [1,1,2,2,3,3]" },
    ],
    printable: true,
    tags: ["javascript"],
    createdAt: "2025-11-05",
  },
  {
    slug: "css-flexbox",
    title: "CSS Flexbox",
    category: "CSS",
    description: "Every flex property, when to use it, and the common gotchas.",
    contentBlocks: [
      { type: "image", content: flexboxVisual, caption: "Flex items laid out along the main axis." },
      { type: "text", content: "Container properties." },
      { type: "code", language: "css", content: ".c {\n  display: flex;\n  flex-direction: row | column;\n  justify-content: flex-start | center | space-between;\n  align-items: stretch | center | flex-end;\n  gap: 16px;\n  flex-wrap: wrap;\n}" },
      { type: "text", content: "Item properties." },
      { type: "code", language: "css", content: ".item {\n  flex: 1 1 0;      /* grow shrink basis */\n  align-self: center;\n  order: 2;\n}" },
    ],
    thumbnailImageUrl: flexboxVisual,
    printable: true,
    tags: ["css", "layout"],
    createdAt: "2025-11-10",

  },
  {
    slug: "sql-quick-reference",
    title: "SQL Quick Reference",
    category: "Databases",
    description: "SELECT to window functions, all on one page.",
    contentBlocks: [
      { type: "code", language: "sql", content: "SELECT name, COUNT(*) AS n\nFROM users u\nJOIN orders o ON o.user_id = u.id\nWHERE o.created_at > NOW() - INTERVAL '30 days'\nGROUP BY name\nHAVING COUNT(*) > 5\nORDER BY n DESC\nLIMIT 10;" },
      { type: "text", content: "Window functions." },
      { type: "code", language: "sql", content: "SELECT id, amount,\n  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) AS rn,\n  SUM(amount) OVER (PARTITION BY user_id) AS user_total\nFROM orders;" },
    ],
    printable: true,
    tags: ["sql", "databases"],
    createdAt: "2025-11-12",
  },
  {
    slug: "docker-basics",
    title: "Docker Basics",
    category: "DevOps",
    description: "Images, containers, volumes, compose. The 20 commands you actually need.",
    contentBlocks: [
      { type: "code", language: "bash", content: "docker build -t myapp .\ndocker run -p 3000:3000 myapp\ndocker ps\ndocker logs <id>\ndocker exec -it <id> sh\ndocker compose up -d\ndocker compose down" },
    ],
    printable: true,
    tags: ["docker", "devops"],
    createdAt: "2025-11-14",
  },
];

export async function getAllCheatSheets(): Promise<CheatSheet[]> {
  return cheatsheets;
}
export async function getCheatSheetBySlug(slug: string): Promise<CheatSheet | null> {
  return cheatsheets.find((c) => c.slug === slug) ?? null;
}
export async function getCheatSheetCategories(): Promise<string[]> {
  return Array.from(new Set(cheatsheets.map((c) => c.category))).sort();
}
