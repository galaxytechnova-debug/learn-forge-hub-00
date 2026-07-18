import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { isBookmarked, toggleBookmark, type BookmarkType } from "@/lib/bookmarks";

interface Props {
  type: BookmarkType;
  slug: string;
  title: string;
}

export function BookmarkButton({ type, slug, title }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked(type, slug));
    const onChange = () => setSaved(isBookmarked(type, slug));
    window.addEventListener("devverse:bookmarks", onChange);
    return () => window.removeEventListener("devverse:bookmarks", onChange);
  }, [type, slug]);

  return (
    <button
      type="button"
      onClick={() => setSaved(toggleBookmark({ type, slug, title }))}
      aria-pressed={saved}
      aria-label={saved ? "Remove bookmark" : "Add bookmark"}
      className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-border-default text-sm font-medium text-text-primary hover:bg-surface-2 transition-colors"
    >
      {saved ? (
        <>
          <BookmarkCheck className="h-4 w-4 text-primary" />
          Saved
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" />
          Save
        </>
      )}
    </button>
  );
}
