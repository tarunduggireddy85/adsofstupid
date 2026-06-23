"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BlogImage } from "./BlogImage";

export type BlogCard = {
  slug: string;
  title: string;
  description: string;
  category: string;
  featuredImage: string;
  date: string;
  readTime: string;
};

export function BlogGrid({ posts }: { posts: BlogCard[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {categories.length > 2 && (
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {categories.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full text-[0.86rem] font-semibold border transition-colors duration-200 ${
                  isActive
                    ? "bg-[#5c43fd] border-[#5c43fd] text-white shadow-[0_4px_12px_rgba(92,67,253,0.2)]"
                    : "bg-white border-zinc-200 text-zinc-600 hover:border-[#5c43fd]/40 hover:text-[#5c43fd]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      )}

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.article
              layout
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col rounded-[1.6rem] border border-zinc-200/80 bg-white overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_18px_44px_rgba(92,67,253,0.08)] hover:border-[#5c43fd]/20 transition-all duration-300"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative block aspect-[16/9] overflow-hidden no-underline bg-zinc-100"
              >
                <BlogImage
                  src={post.featuredImage}
                  alt={post.title}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#5c43fd] text-[0.72rem] font-bold tracking-wide leading-none">
                  {post.category}
                </span>
              </Link>

              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-[1.18rem] font-semibold text-zinc-950 tracking-tight leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="no-underline text-inherit hover:text-[#5c43fd] transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-zinc-500 text-[0.95rem] leading-[1.6] mt-2.5 flex-1">
                  {post.description}
                </p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-100 text-[0.82rem] text-zinc-400 font-medium">
                  <span>
                    {post.date} · {post.readTime}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#5c43fd] font-semibold no-underline hover:text-[#4a32e5] transition-colors"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-zinc-400 mt-10">No posts in this category yet.</p>
      )}
    </>
  );
}
