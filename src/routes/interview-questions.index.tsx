import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getInterviewQuestions, getInterviewCategories } from "@/lib/data/interview-questions";
import { Badge, difficultyTone } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import type { InterviewQuestion, QDifficulty } from "@/types/content";

export const Route = createFileRoute("/interview-questions/")({
  loader: async () => {
    const { items } = await getInterviewQuestions({ limit: 1000 });
    return { questions: items, categories: await getInterviewCategories() };
  },
  component: QuestionsList,
  head: () => ({
    meta: [
      { title: "Interview Questions & Answers — DevVerse" },
      {
        name: "description",
        content:
          "Practice with real developer interview questions across JavaScript, React, DSA, system design, and behavioral rounds.",
      },
      { property: "og:title", content: "Interview Questions — DevVerse" },
      { property: "og:url", content: "/interview-questions" },
    ],
    links: [{ rel: "canonical", href: "/interview-questions" }],
  }),
});

const DIFFICULTIES: Array<QDifficulty | "all"> = ["all", "easy", "medium", "hard"];

function QuestionsList() {
  const { questions, categories } = Route.useLoaderData() as {
    questions: InterviewQuestion[];
    categories: string[];
  };
  const [q, setQ] = useState("");
  const [diff, setDiff] = useState<QDifficulty | "all">("all");
  const [cat, setCat] = useState<string>("All");
  const [page, setPage] = useState(1);
  const perPage = 12;

  const filtered = useMemo(
    () =>
      questions.filter(
        (x) =>
          (diff === "all" || x.difficulty === diff) &&
          (cat === "All" || x.category === cat) &&
          (q === "" || x.title.toLowerCase().includes(q.toLowerCase())),
      ),
    [questions, diff, cat, q],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Interview Questions" }]} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">
        Interview Questions
      </h1>
      <p className="mt-2 text-text-secondary max-w-2xl">
        Filter by topic, difficulty, or company. Every question has a written answer and, where
        useful, a code sample.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search questions"
            className="w-full h-10 pl-10 pr-3 rounded-lg border border-border-default bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => {
            setCat(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-lg border border-border-default bg-surface px-3 text-sm"
        >
          <option>All</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div className="flex gap-1 rounded-lg border border-border-default bg-surface p-1">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => {
                setDiff(d);
                setPage(1);
              }}
              className={
                "px-3 py-1.5 rounded-md text-xs font-medium capitalize " +
                (diff === d ? "bg-primary text-primary-foreground" : "text-text-secondary hover:bg-surface-2")
              }
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        {pageItems.map((x) => (
          <Link
            key={x.slug}
            to="/interview-questions/$slug"
            params={{ slug: x.slug }}
            className="rounded-xl border border-border-default bg-surface p-4 hover:border-border-strong transition-colors flex items-start justify-between gap-4"
          >
            <div className="min-w-0">
              <div className="font-medium text-text-primary">{x.title}</div>
              <div className="mt-1 text-sm text-text-secondary line-clamp-1">{x.question}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone={difficultyTone(x.difficulty)}>{x.difficulty}</Badge>
                <Badge tone="muted">{x.category}</Badge>
                <Badge tone="muted">{x.questionType}</Badge>
                {x.companyTags.slice(0, 2).map((c) => (
                  <Badge key={c} tone="info">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        ))}
        {pageItems.length === 0 && (
          <div className="text-center py-16 text-text-secondary">No matching questions.</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-9 px-4 rounded-lg border border-border-default disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-9 px-4 rounded-lg border border-border-default disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
