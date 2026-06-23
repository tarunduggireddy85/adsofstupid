"use client";

import { X } from "lucide-react";
import { BlogImage } from "@/components/blog/BlogImage";
import { PostBody } from "@/components/blog/PostBody";
import { formatBlogDate, readTime } from "@/lib/blog";
import type { BlogInput } from "@/lib/blogService";

export function BlogPreviewModal({
  values,
  onClose
}: {
  values: BlogInput;
  onClose: () => void;
}) {
  const tags = values.tags?.length ? values.tags : values.category ? [values.category] : [];
  const dateStr = values.publishDate || new Date().toISOString();

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      {/* preview toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-zinc-900 text-white shrink-0">
        <span className="inline-flex items-center gap-2 text-[0.85rem] font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Live preview — this is how your post will look
        </span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-4 py-1.5 text-[0.85rem] font-semibold transition-colors"
        >
          <X size={16} />
          Close preview
        </button>
      </div>

      {/* scrollable rendered post */}
      <div className="flex-1 overflow-y-auto bg-surface-main">
        <article className="w-full">
          {/* title block */}
          <div className="w-full bg-gradient-to-b from-[#f4f0ff] to-transparent pt-12 pb-10 px-4">
            <div className="max-w-[820px] mx-auto">
              <div className="flex flex-wrap gap-2 mb-5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#5c43fd]/6 text-[#5c43fd] font-semibold text-[0.78rem] tracking-wide leading-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-sans font-semibold text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.15] tracking-tight text-zinc-950 mb-5">
                {values.title || "Untitled post"}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-[0.85rem] text-zinc-400 font-medium mb-6">
                <span>{formatBlogDate(dateStr)}</span>
                <span>·</span>
                <span>{readTime(values.content || "")}</span>
                {values.author ? (
                  <>
                    <span>·</span>
                    <span>By {values.author}</span>
                  </>
                ) : null}
                <span>·</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.72rem] font-bold ${
                    values.status === "Published"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {values.status}
                </span>
              </div>

              {values.description ? (
                <p className="text-[1.12rem] leading-[1.7] text-zinc-600 font-medium border-l-[3px] border-[#5c43fd]/30 pl-4 py-1 italic">
                  {values.description}
                </p>
              ) : null}
            </div>
          </div>

          {/* featured image */}
          <div className="max-w-[860px] mx-auto px-4 -mt-2">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-[1.8rem] border border-zinc-200/80 bg-zinc-100 shadow-[0_18px_44px_rgba(30,30,60,0.08)]">
              <BlogImage src={values.featuredImage} alt={values.title || "Featured image"} />
            </div>
          </div>

          {/* body */}
          <div className="max-w-[760px] mx-auto px-4 py-12">
            {values.content?.trim() ? (
              <PostBody content={values.content} />
            ) : (
              <p className="text-zinc-400 italic">No content yet — write some in the Content step.</p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
