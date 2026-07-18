import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone =
  | "default"
  | "primary"
  | "secondary"
  | "easy"
  | "medium"
  | "hard"
  | "info"
  | "muted";

const toneClasses: Record<Tone, string> = {
  default: "bg-surface-2 text-text-primary border-border-default",
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  easy: "bg-easy/10 text-easy border-easy/20",
  medium: "bg-medium/10 text-medium border-medium/20",
  hard: "bg-hard/10 text-hard border-hard/20",
  info: "bg-info/10 text-info border-info/20",
  muted: "bg-transparent text-text-secondary border-border-default",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function difficultyTone(d: string): Tone {
  if (d === "beginner" || d === "easy") return "easy";
  if (d === "intermediate" || d === "medium") return "medium";
  if (d === "advanced" || d === "hard") return "hard";
  return "default";
}
