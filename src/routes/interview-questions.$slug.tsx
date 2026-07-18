import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  getInterviewQuestionBySlug,
  getInterviewQuestions,
} from "@/lib/data/interview-questions";
import { Badge, difficultyTone } from "@/components/dv/Badge";
import { Breadcrumb } from "@/components/dv/Breadcrumb";
import { BookmarkButton } from "@/components/BookmarkButton";
import type { InterviewQuestion } from "@/types/content";

export const Route = createFileRoute("/interview-questions/$slug")({
  loader: async ({ params }) => {
    const question = await getInterviewQuestionBySlug(params.slug);
    if (!question) throw notFound();
    const { items } = await getInterviewQuestions({ limit: 1000 });
    return {
      question,
      related: items.filter(
        (q: InterviewQuestion) =>
          question.relatedQuestionSlugs.includes(q.slug) || (q.category === question.category && q.slug !== question.slug),
      ).slice(0, 4),
    };
  },
  component: QuestionDetail,
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Question not found" }, { name: "robots", content: "noindex" }] };
    const q = loaderData.question;
    return {
      meta: [
        { title: `${q.title} — DevVerse` },
        { name: "description", content: q.question.slice(0, 160) },
        { property: "og:title", content: q.title },
        { property: "og:description", content: q.question.slice(0, 160) },
        { property: "og:url", content: `/interview-questions/${q.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/interview-questions/${q.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Question",
            name: q.title,
            text: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer,
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-text-primary">Question not found</h1>
      <Link to="/interview-questions" className="mt-4 inline-block text-primary hover:underline">
        Back to all questions
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p>{error.message}</p>
      <button onClick={reset} className="text-primary hover:underline mt-4">Retry</button>
    </div>
  ),
});

function CodeBlock({ language, body }: { language: string; body: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group my-4">
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-text-muted">{language}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(body);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="inline-flex items-center gap-1 h-7 px-2 rounded-md bg-surface-2 border border-border-default text-xs text-text-secondary hover:text-text-primary"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-xl border border-border-default bg-surface p-4 text-sm">
        <code>{body}</code>
      </pre>
    </div>
  );
}

function QuestionDetail() {
  const { question, related } = Route.useLoaderData() as {
    question: InterviewQuestion;
    related: InterviewQuestion[];
  };
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/interview-questions", label: "Interview Questions" },
          { label: question.title },
        ]}
      />

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge tone={difficultyTone(question.difficulty)}>{question.difficulty}</Badge>
          <Badge tone="muted">{question.category}</Badge>
          <Badge tone="muted">{question.questionType}</Badge>
          {question.companyTags.map((c) => (
            <Badge key={c} tone="info">
              {c}
            </Badge>
          ))}
        </div>
        <BookmarkButton type="interview-question" slug={question.slug} title={question.title} />
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-text-primary">{question.title}</h1>
      <p className="mt-4 text-text-primary leading-relaxed">{question.question}</p>

      <div className="mt-6">
        <button
          onClick={() => setShowAnswer((v) => !v)}
          className="inline-flex items-center h-10 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors"
        >
          {showAnswer ? "Hide answer" : "Show answer"}
        </button>
      </div>

      {showAnswer && (
        <div className="mt-6 rounded-2xl border border-border-default bg-surface p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">Answer</h2>
          <p className="mt-3 text-text-primary leading-relaxed whitespace-pre-line">
            {question.answer}
          </p>
          {question.code && <CodeBlock language={question.code.language} body={question.code.body} />}
          {question.explanation && (
            <>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-text-muted">
                Explanation
              </h3>
              <p className="mt-2 text-text-secondary leading-relaxed">{question.explanation}</p>
            </>
          )}
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-semibold text-text-primary">Related questions</h2>
          <div className="mt-4 grid gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/interview-questions/$slug"
                params={{ slug: r.slug }}
                className="rounded-xl border border-border-default bg-surface p-4 hover:bg-surface-2 transition-colors"
              >
                <div className="font-medium text-text-primary">{r.title}</div>
                <div className="mt-2 flex gap-2">
                  <Badge tone={difficultyTone(r.difficulty)}>{r.difficulty}</Badge>
                  <Badge tone="muted">{r.category}</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
