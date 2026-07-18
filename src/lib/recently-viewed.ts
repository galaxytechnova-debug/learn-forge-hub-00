const KEY = "devverse_recently_viewed";
const CAP = 10;

export interface RecentItem {
  type: string;
  slug: string;
  title: string;
  viewedAt: string;
}

export function pushRecent(item: Omit<RecentItem, "viewedAt">) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY);
    const list: RecentItem[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter((r) => !(r.type === item.type && r.slug === item.slug));
    filtered.unshift({ ...item, viewedAt: new Date().toISOString() });
    window.localStorage.setItem(KEY, JSON.stringify(filtered.slice(0, CAP)));
  } catch {
    /* noop */
  }
}

export function getRecent(): RecentItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}
