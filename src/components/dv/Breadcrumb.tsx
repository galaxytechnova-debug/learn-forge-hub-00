import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function Breadcrumb({ items }: { items: Array<{ href?: string; label: ReactNode }> }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-text-secondary flex items-center flex-wrap gap-1">
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {it.href ? (
            <Link to={it.href} className="hover:text-text-primary transition-colors">
              {it.label}
            </Link>
          ) : (
            <span className="text-text-primary">{it.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="h-3.5 w-3.5 opacity-50" />}
        </span>
      ))}
    </nav>
  );
}
