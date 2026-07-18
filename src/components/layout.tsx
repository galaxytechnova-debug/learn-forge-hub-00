import { Link } from "@tanstack/react-router";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBox } from "./SearchBox";

const NAV = [
  { to: "/roadmaps", label: "Roadmaps" },
  { to: "/interview-questions", label: "Interview Q&A" },
  { to: "/cheatsheets", label: "Cheat Sheets" },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/career-guidance", label: "Career" },
  { to: "/companies", label: "Companies" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border-default no-print">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-text-primary shrink-0">
          <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center">
            <Code2 className="h-4 w-4" />
          </span>
          <span>DevVerse</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
              activeProps={{ className: "text-text-primary bg-surface-2" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 justify-end min-w-0">
          <SearchBox />
        </div>

        <div className="flex items-center gap-2 ml-auto md:ml-2">
          <Link
            to="/bookmarks"
            className="hidden md:inline-flex h-10 px-3 items-center rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
          >
            Bookmarks
          </Link>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-default"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border-default bg-background">
          <div className="max-w-7xl mx-auto px-4 py-3 grid gap-1">
            <div className="pb-2">
              <SearchBox />
            </div>
            {NAV.concat({ to: "/bookmarks", label: "Bookmarks" }).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-2"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border-default mt-24 no-print">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 font-semibold text-text-primary">
            <span className="h-6 w-6 rounded-md bg-primary text-primary-foreground grid place-items-center">
              <Code2 className="h-3.5 w-3.5" />
            </span>
            DevVerse
          </div>
          <p className="mt-3 text-text-secondary">
            The developer learning platform for IT/CS students and engineers.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-text-primary mb-3">Learn</h4>
          <ul className="grid gap-2 text-text-secondary">
            <li><Link to="/roadmaps" className="hover:text-text-primary">Roadmaps</Link></li>
            <li><Link to="/cheatsheets" className="hover:text-text-primary">Cheat Sheets</Link></li>
            <li><Link to="/projects" className="hover:text-text-primary">Project Ideas</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-text-primary mb-3">Prepare</h4>
          <ul className="grid gap-2 text-text-secondary">
            <li><Link to="/interview-questions" className="hover:text-text-primary">Interview Questions</Link></li>
            <li><Link to="/companies" className="hover:text-text-primary">Company Experiences</Link></li>
            <li><Link to="/resume-tips" className="hover:text-text-primary">Resume Tips</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-text-primary mb-3">More</h4>
          <ul className="grid gap-2 text-text-secondary">
            <li><Link to="/career-guidance" className="hover:text-text-primary">Career Guidance</Link></li>
            <li><Link to="/resources" className="hover:text-text-primary">Free Resources</Link></li>
            <li><Link to="/bookmarks" className="hover:text-text-primary">Your Bookmarks</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border-default">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-text-muted">
          © {new Date().getFullYear()} DevVerse. Built for learners.
        </div>
      </div>
    </footer>
  );
}
