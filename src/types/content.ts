// Shared types used across content collections. Field names match the future
// MongoDB document shape so migration is body-only inside lib/data/*.
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type QDifficulty = "easy" | "medium" | "hard";

export interface RoadmapTopic {
  title: string;
  description: string;
  resourceLinks: string[];
  order: number;
}
export interface RoadmapSection {
  level: Difficulty;
  topics: RoadmapTopic[];
}
export interface Roadmap {
  slug: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  category: string;
  estimatedTime: string;
  sections: RoadmapSection[];
  relatedProjectSlugs: string[];
  relatedInterviewQuestionSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewQuestion {
  slug: string;
  title: string;
  category: string;
  difficulty: QDifficulty;
  questionType: "theory" | "mcq" | "coding" | "scenario" | "behavioral";
  question: string;
  answer: string;
  explanation?: string;
  code?: { language: string; body: string };
  companyTags: string[];
  tags: string[];
  relatedQuestionSlugs: string[];
  createdAt: string;
}

export interface CheatSheetBlock {
  type: "text" | "code" | "table" | "image";
  content: string;
  caption?: string;
  language?: string;
}
export interface CheatSheet {
  slug: string;
  title: string;
  category: string;
  description: string;
  contentBlocks: CheatSheetBlock[];
  thumbnailImageUrl?: string;
  fullImageUrl?: string;
  printable: boolean;
  tags: string[];
  createdAt: string;
}

export interface ProjectIdea {
  slug: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: string;
  features: string[];
  techStack: string[];
  folderStructure: string;
  apiList: string[];
  deploymentNotes: string;
  challenges: string[];
  learningOutcomes: string[];
  createdAt: string;
}

export interface FreeResource {
  slug: string;
  title: string;
  type:
    | "book"
    | "course"
    | "youtube"
    | "docs"
    | "icon"
    | "font"
    | "hosting"
    | "database"
    | "api"
    | "ai-model";
  description: string;
  link: string;
  isFree: boolean;
  tags: string[];
}

export interface Article {
  slug: string;
  title: string;
  category: "career" | "resume";
  content: string; // markdown-lite string, rendered as paragraphs
  author: string;
  publishedAt: string;
  coverImageUrl?: string;
  tags: string[];
  estimatedReadTime: number; // minutes
}

export interface CompanyRound {
  roundName: string;
  description: string;
  questionsAsked: string[];
}
export interface CompanyExperience {
  slug: string;
  companyName: string;
  role: string;
  experienceLevel: "intern" | "entry" | "mid" | "senior";
  rounds: CompanyRound[];
  overallDifficulty: QDifficulty;
  outcome: "selected" | "rejected" | "in-process";
  content: string;
  tags: string[];
  createdAt: string;
}
