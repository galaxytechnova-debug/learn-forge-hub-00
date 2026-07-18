// Client-side bookmark store backed by localStorage.
// Future migration: swap body of load/save with fetch() to an API endpoint.

export type BookmarkType =
  | "roadmap"
  | "interview-question"
  | "cheatsheet"
  | "project"
  | "resource"
  | "article"
  | "company";

export interface Bookmark {
  type: BookmarkType;
  slug: string;
  title: string;
  addedAt: string; // ISO
}

const KEY = "devverse_bookmarks";

function readAll(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Bookmark[]) : [];
  } catch {
    return [];
  }
}

function writeAll(items: Bookmark[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("devverse:bookmarks"));
}

export function getBookmarks(): Bookmark[] {
  return readAll();
}

export function isBookmarked(type: BookmarkType, slug: string): boolean {
  return readAll().some((b) => b.type === type && b.slug === slug);
}

export function toggleBookmark(entry: Omit<Bookmark, "addedAt">): boolean {
  const all = readAll();
  const idx = all.findIndex((b) => b.type === entry.type && b.slug === entry.slug);
  if (idx >= 0) {
    all.splice(idx, 1);
    writeAll(all);
    return false;
  }
  all.unshift({ ...entry, addedAt: new Date().toISOString() });
  writeAll(all);
  return true;
}

export function clearBookmarks() {
  writeAll([]);
}
