import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Braces,
  ChevronRight,
  FileCode,
  FileText,
  Layers,
  Lightbulb,
  Map,
  Rocket,
  Sparkles,
} from "lucide-react";
import { getAllRoadmaps } from "@/lib/data/roadmaps";
import mentorshipHero from "@/assets/mentorship-hero.jpg";
import { getDailyQuestion } from "@/lib/data/interview-questions";
import { getAllCheatSheets } from "@/lib/data/cheatsheets";
import { getAllArticles } from "@/lib/data/articles";
import { getAllCompanies } from "@/lib/data/companies";
import { Badge, difficultyTone } from "@/components/dv/Badge";
import type {
  Roadmap,
  CheatSheet,
  Article,
  CompanyExperience,
  RoadmapSection,
} from "@/types/content";

export const Route = createFileRoute("/")({
  loader: async () => {
    const roadmaps = await getAllRoadmaps();
    const daily = await getDailyQuestion();
    const sheets = await getAllCheatSheets();
    const articles = await getAllArticles();
    const companies = await getAllCompanies();
    return { roadmaps, daily, sheets, articles, companies };
  },
  component: HomePage,
  head: () => ({
    meta: [
      { title: "DevVerse — Roadmaps, Interview Prep & Cheat Sheets for Developers" },
      {
        name: "description",
        content:
          "Learn faster with structured roadmaps, practice with real interview questions, and reference the cheat sheets you'll actually use.",
      },
      { property: "og:title", content: "DevVerse — The Developer Learning Platform" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const VALUE_PROPS = [
  {
    icon: Map,
    title: "Structured Roadmaps",
    body: "Follow a clear path from beginner to advanced across frontend, backend, DevOps, AI/ML, and more.",
  },
  {
    icon: Braces,
    title: "Interview Prep",
    body: "Real questions with detailed answers, code samples, and difficulty tags — filter by company or topic.",
  },
  {
    icon: FileText,
    title: "Cheat Sheets",
    body: "The one-page references you'll actually keep open in a second tab. Print-friendly and dark-mode aware.",
  },
  {
    icon: Lightbulb,
    title: "Project Ideas",
    body: "Ship-worthy build ideas with feature lists, folder structures, and learning outcomes.",
  },
];

function HomePage() {
  const { roadmaps, daily, sheets, articles, companies } = Route.useLoaderData();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,theme(colors.primary/12),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 md:pt-28 md:pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface px-3 py-1 text-xs text-text-secondary">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Built for IT & CS students and working engineers
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
              Learn, prepare, and grow as a developer.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
              DevVerse gives you the roadmaps to follow, the interview questions to practice, and
              the cheat sheets to reference — plus 1-on-1 mentorship when you need real guidance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/roadmaps"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors"
              >
                Explore Roadmaps <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/interview-questions"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-border-strong text-text-primary font-medium hover:bg-surface-2 transition-colors"
              >
                Browse Interview Questions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border-default bg-surface p-6"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-text-primary">{v.title}</h3>
              <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured roadmaps */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <SectionHeader
          eyebrow="Roadmaps"
          title="Start with a clear path"
          subtitle="Structured, opinionated learning tracks that meet you at your level."
          href="/roadmaps"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roadmaps.slice(0, 6).map((r: Roadmap) => (
            <Link
              key={r.slug}
              to="/roadmaps/$slug"
              params={{ slug: r.slug }}
              className="group rounded-2xl border border-border-default bg-surface p-6 transition-all hover:border-border-strong hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                  <Layers className="h-5 w-5" />
                </div>
                <Badge tone="muted">{r.category}</Badge>
              </div>
              <h3 className="mt-4 font-semibold text-text-primary">{r.title}</h3>
              <p className="mt-1.5 text-sm text-text-secondary line-clamp-2">{r.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                <span>{r.sections.reduce((n: number, s: RoadmapSection) => n + s.topics.length, 0)} topics</span>
                <span>{r.estimatedTime}</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Open roadmap <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily question + Cheatsheets strip */}
      <section className="max-w-7xl mx-auto px-4 mt-20 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Rocket className="h-3.5 w-3.5" /> Question of the day
          </div>
          <h3 className="mt-3 text-lg font-semibold text-text-primary">{daily.title}</h3>
          <p className="mt-2 text-sm text-text-secondary line-clamp-3">{daily.question}</p>
          <div className="mt-4 flex items-center gap-2">
            <Badge tone={difficultyTone(daily.difficulty)}>{daily.difficulty}</Badge>
            <Badge tone="muted">{daily.category}</Badge>
          </div>
          <Link
            to="/interview-questions/$slug"
            params={{ slug: daily.slug }}
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Attempt it <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text-primary flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Popular cheat sheets
            </h3>
            <Link to="/cheatsheets" className="text-sm text-primary hover:underline">
              All sheets →
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {sheets.slice(0, 4).map((c: CheatSheet) => (
              <Link
                key={c.slug}
                to="/cheatsheets/$slug"
                params={{ slug: c.slug }}
                className="rounded-xl border border-border-default bg-surface p-4 hover:bg-surface-2 transition-colors"
              >
                <div className="text-sm font-semibold text-text-primary">{c.title}</div>
                <div className="mt-1 text-xs text-text-secondary line-clamp-2">
                  {c.description}
                </div>
                <div className="mt-3">
                  <Badge tone="muted">{c.category}</Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-border-default bg-gradient-to-br from-primary/10 via-surface to-transparent">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                1-on-1 Mentorship
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
                Personal guidance, not another course to skim.
              </h2>
              <p className="mt-3 text-text-secondary leading-relaxed max-w-xl">
                Get matched with a senior engineer for live sessions on career strategy, mock interviews, resume reviews, and project feedback — free during beta.
              </p>
              <ul className="mt-6 grid gap-2.5 text-sm text-text-secondary">
                <li className="flex items-start gap-2"><Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" /> 45-minute 1-on-1 video sessions with written notes</li>
                <li className="flex items-start gap-2"><Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Mentors matched to your goal, not a random assignment</li>
                <li className="flex items-start gap-2"><Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Async follow-up between calls so momentum sticks</li>
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/mentorship"
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors"
                >
                  Book a mentor <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/career-guidance"
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-border-strong text-text-primary font-medium hover:bg-surface-2 transition-colors"
                >
                  Browse career articles
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={mentorshipHero}
                alt="Developer receiving 1-on-1 mentorship from a senior engineer"
                loading="lazy"
                width={1280}
                height={800}
                className="rounded-2xl border border-border-default shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Articles */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <SectionHeader
          eyebrow="Career"
          title="Advice worth reading"
          subtitle="From cracking your first interview to fixing your resume."
          href="/career-guidance"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((a: Article) => (
            <Link
              key={a.slug}
              to={a.category === "resume" ? "/resume-tips/$slug" : "/career-guidance/$slug"}
              params={{ slug: a.slug }}
              className="rounded-2xl border border-border-default bg-surface p-6 hover:border-border-strong transition-colors"
            >
              <Badge tone="muted">{a.category === "resume" ? "Resume" : "Career"}</Badge>
              <h3 className="mt-3 font-semibold text-text-primary">{a.title}</h3>
              <p className="mt-2 text-sm text-text-secondary line-clamp-3">
                {a.content.slice(0, 160)}…
              </p>
              <div className="mt-4 text-xs text-text-muted">
                {a.estimatedReadTime} min read · {a.author}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Companies */}
      <section className="max-w-7xl mx-auto px-4 mt-20 mb-8">
        <SectionHeader
          eyebrow="Interview experiences"
          title="Real interviews, real feedback"
          subtitle="Anonymized breakdowns from candidates who went through the loops."
          href="/companies"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {companies.slice(0, 3).map((c: CompanyExperience) => (
            <Link
              key={c.slug}
              to="/companies/$slug"
              params={{ slug: c.slug }}
              className="rounded-2xl border border-border-default bg-surface p-6 hover:border-border-strong transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-text-primary">{c.companyName}</div>
                <Badge
                  tone={
                    c.outcome === "selected" ? "easy" : c.outcome === "rejected" ? "hard" : "medium"
                  }
                >
                  {c.outcome}
                </Badge>
              </div>
              <div className="text-sm text-text-secondary mt-1">{c.role}</div>
              <div className="mt-4 flex items-center gap-2">
                <Badge tone={difficultyTone(c.overallDifficulty)}>{c.overallDifficulty}</Badge>
                <Badge tone="muted">{c.rounds.length} rounds</Badge>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  href,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</div>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
          {title}
        </h2>
        <p className="mt-2 text-text-secondary max-w-2xl">{subtitle}</p>
      </div>
      <Link to={href} className="text-sm text-primary hover:underline flex items-center gap-1">
        View all <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
