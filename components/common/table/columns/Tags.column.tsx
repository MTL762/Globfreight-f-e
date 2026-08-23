"use client";
import { Tag } from "lucide-react";

export default function TagsCol({ tags }: { tags?: string[] | string | null }) {
  if (!tags) return <span className="text-muted-foreground text-xs">-</span>;

  const tagList: string[] = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
    ? tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  if (tagList.length === 0) return <span className="text-muted-foreground text-xs">-</span>;

  return (
    <div className="flex flex-wrap gap-1 items-center max-w-[220px]">
      {tagList.map((tag, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-foreground"
        >
          <Tag className="h-2.5 w-2.5 opacity-60" />
          {tag}
        </span>
      ))}
    </div>
  );
}
