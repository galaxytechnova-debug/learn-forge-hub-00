import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Check, MessageCircle, Sparkles, Target, UserRound, Video } from "lucide-react";
import mentorHero from "@/assets/mentorship-hero.jpg";
import mentor1on1 from "@/assets/mentor-1on1.jpg";
import { Badge } from "@/components/dv/Badge";

export const Route = createFileRoute("/mentorship")({
  component: MentorshipPage,
  head: () => ({
    meta: [
      { title: "1-on-1 Mentorship — Personalized Developer Guidance | DevVerse" },
      {
        name: "description",
        content:
          "Book personalized 1-on-1 mentorship with senior engineers. Career guidance, mock interviews, resume reviews, and project feedback tailored to you.",
      },
      { property: "og:title", content: "1-on-1 Mentorship — DevVerse" },
      { property: "og:description", content: "Personalized guidance from senior engineers who've been where you're headed." },
      { property: "og:url", content: "/mentorship" },
    ],
    links: [{ rel: "canonical", href: "/mentorship" }],
  }),
});

const TRACKS = [
  {
    icon: Target,
    title: "Career Strategy",
    body: "Figure out which stack to bet on, what to build next, and how to position yourself for the roles you actually want.",
  },
  {
    icon: MessageCircle,
    title: "Mock Interviews",
    body: "Live DSA, system design, and behavioral rounds with real-time feedback — the kind you don't get from a rejection email.",
  },
  {
    icon: UserRound,
    title: "Resume & LinkedIn",
    body: "Line-by-line reviews so your resume passes the 30-second skim and your LinkedIn actually gets recruiter DMs.",
  },
  {
    icon: Sparkles,
    title: "Project Review",
    body: "Bring your side project or take-home. Get architecture, code-quality, and portfolio-ready polish notes.",
  },
];

const STEPS = [
  { n: 1, title: "Pick a track", body: "Tell us what you're stuck on — career, interviews, resume, or a specific project." },
  { n: 2, title: "Match with a mentor", body: "We pair you with a senior engineer whose path matches your goal." },
  { n: 3, title: "Meet 1-on-1", body: "45-minute video session, focused agenda, actionable notes you keep afterward." },
];

const PLANS = [
  {
    name: "Single session",
    price: "Free",
    tag: "Try it out",
    features: ["45-minute 1-on-1 video call", "Written follow-up notes", "One focus area of your choice"],
    highlight: false,
  },
  {
    name: "Monthly plan",
    price: "Free during beta",
    tag: "Most popular",
    features: ["4 sessions per month", "Priority mentor matching", "Async chat between calls", "Interview prep track"],
    highlight: true,
  },
  {
    name: "Interview sprint",
    price: "Free during beta",
    tag: "Job seekers",
    features: ["8 sessions over 4 weeks", "DSA + system design + behavioral", "Resume + LinkedIn review", "Referral guidance"],
    highlight: false,
  },
];

function MentorshipPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,theme(colors.primary/15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16 grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface px-3 py-1 text-xs text-text-secondary">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              1-on-1 mentorship — free during beta
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
              Real guidance from engineers who've been where you're headed.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
              Skip the trial-and-error. Get matched with a senior mentor for career strategy, mock interviews, resume reviews, and project feedback — built around your goals, not a generic curriculum.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#book"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors"
              >
                <Calendar className="h-4 w-4" /> Book a free session
              </a>
              <Link
                to="/career-guidance"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-border-strong text-text-primary font-medium hover:bg-surface-2 transition-colors"
              >
                Read career articles
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-4 text-xs text-text-muted">
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> 45-min sessions</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> Written notes</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> Async follow-up</span>
            </div>
          </div>
          <div className="relative">
            <img
              src={mentorHero}
              alt="Senior engineer mentoring a developer during a 1-on-1 session"
              width={1280}
              height={800}
              className="rounded-2xl border border-border-default shadow-2xl w-full h-auto"
            />
            <div className="hidden sm:flex absolute -bottom-5 -left-5 rounded-xl bg-surface border border-border-default p-4 gap-3 items-center shadow-lg max-w-xs">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">Live video, 1-on-1</div>
                <div className="text-xs text-text-secondary">Recorded on request, yours to keep</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 sm:mt-16">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">What you can work on</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Bring the problem you're actually stuck on.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRACKS.map((t) => (
            <div key={t.title} className="rounded-2xl border border-border-default bg-surface p-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-text-primary">{t.title}</h3>
              <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
        <div className="order-2 lg:order-1">
          <img
            src={mentor1on1}
            alt="Mentor smiling during a 1-on-1 video call"
            width={1024}
            height={1024}
            loading="lazy"
            className="rounded-2xl border border-border-default w-full h-auto"
          />
        </div>
        <div className="order-1 lg:order-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">How it works</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Three steps, zero fluff.
          </h2>
          <ol className="mt-8 grid gap-6">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center font-semibold">
                  {s.n}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-text-primary">{s.title}</div>
                  <p className="mt-1 text-sm text-text-secondary leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Plans */}
      <section id="book" className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Plans</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Pick a plan and get started.
          </h2>
          <p className="mt-2 text-text-secondary">Everything is free during beta while we grow the mentor network.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={
                "rounded-2xl border p-6 flex flex-col " +
                (p.highlight
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border-default bg-surface")
              }
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-text-primary">{p.name}</h3>
                <Badge tone={p.highlight ? "medium" : "muted"}>{p.tag}</Badge>
              </div>
              <div className="mt-4 text-3xl font-bold text-text-primary">{p.price}</div>
              <ul className="mt-6 grid gap-2.5 text-sm text-text-secondary">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:mentors@devverse.dev?subject=Mentorship%20request"
                className={
                  "mt-6 inline-flex items-center justify-center h-11 px-5 rounded-lg font-medium transition-colors " +
                  (p.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                    : "border border-border-strong text-text-primary hover:bg-surface-2")
                }
              >
                Request this plan
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 mb-8">
        <div className="rounded-3xl border border-border-default bg-gradient-to-br from-primary/10 to-transparent p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Not sure what to work on?
          </h2>
          <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
            Book a free intro call — we'll figure out the highest-leverage next step for you together.
          </p>
          <a
            href="mailto:mentors@devverse.dev?subject=Intro%20call"
            className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors"
          >
            <Calendar className="h-4 w-4" /> Book a free intro call
          </a>
        </div>
      </section>
    </>
  );
}
