"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Coins, Users, Loader2 } from "lucide-react";
import { EyebrowBadge } from "./ui/EyebrowBadge";

type BlogPostShort = {
  title: string;
  slug: string;
  category: string;
  description: string;
  status: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
} as const;

export function Blog() {
  const [blogs, setBlogs] = useState<BlogPostShort[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        if (response.ok) {
          const data = await response.json();
          const published = data
            .filter((post: any) => post.status === "Published")
            .slice(0, 3);
          setBlogs(published);
        }
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  function renderIllustration(slug: string) {
    if (slug === "d2c-brand-launch-checklist") {
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#faf8ff] to-[#f4f0ff] flex items-center justify-center relative overflow-hidden">
          <div className="absolute w-36 h-36 bg-gradient-to-br from-purple-100/40 to-indigo-200/30 rounded-xl transform -rotate-12 translate-x-[-24px] translate-y-[8px] border border-white/50" />
          <div className="absolute w-36 h-36 bg-gradient-to-br from-purple-200/40 to-indigo-300/30 rounded-xl transform -rotate-6 translate-x-[-12px] translate-y-[4px] border border-white/50" />
          <div className="absolute w-36 h-36 bg-white border border-zinc-100 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center z-10 transform rotate-0 select-none">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8c76ff] to-[#5c43fd] flex items-center justify-center text-white shadow-md">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4zm-8-8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4z" />
              </svg>
            </div>
            <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-zinc-950 text-white font-bold text-[0.5rem] flex items-center shadow-md leading-none">
              Ads of Stupid
            </div>
          </div>
        </div>
      );
    }
    if (slug === "shopify-conversion-leaks") {
      return (
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,#eeddff_0%,#fdfaff_75%)] flex items-center justify-center relative overflow-hidden">
          <div className="w-20 h-20 rounded-[1.6rem] bg-gradient-to-br from-[#8c76ff] to-[#5c43fd] shadow-[0_12px_28px_rgba(92,67,253,0.3)] flex items-center justify-center relative select-none">
            <svg className="w-9 h-9 text-white fill-current" viewBox="0 0 24 24">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4zm-8-8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4z" />
            </svg>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full bg-gradient-to-br from-[#eeddff] via-[#fdfaff] to-[#eeddff] flex items-center justify-center relative overflow-hidden">
        <div className="absolute left-6 top-6 w-36 p-2.5 rounded-xl bg-white border border-zinc-100 shadow-md flex flex-col gap-1.5 z-10 scale-95 transform -rotate-3 select-none">
          <div className="flex items-center gap-1 text-[0.45rem] text-zinc-400 font-bold">
            <Coins className="w-2.5 h-2.5 text-[#5c43fd]" />
            <span>Income</span>
          </div>
          <span className="text-[0.72rem] font-bold text-zinc-950 block leading-none">$2,999</span>
          <div className="h-2 rounded bg-zinc-100 w-full mt-0.5 overflow-hidden">
            <div className="h-full rounded bg-[#5c43fd]" style={{ width: "60%" }} />
          </div>
        </div>

        <div className="absolute right-5 bottom-6 w-[130px] p-2.5 rounded-xl bg-white border border-zinc-100 shadow-lg flex flex-col gap-1.5 z-20 scale-95 transform rotate-2 select-none">
          <div className="flex items-center gap-1 text-[0.45rem] text-zinc-400 font-bold">
            <Users className="w-2.5 h-2.5 text-[#5c43fd]" />
            <span>Total Users</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[0.82rem] font-black text-zinc-950 block leading-none">20K+</span>
            <span className="text-[0.38rem] text-zinc-400 font-bold">Users</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-transparent py-16 scroll-mt-28 w-full" id="blog">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto flex flex-col items-center">
        <EyebrowBadge>Blog</EyebrowBadge>

        <motion.h2
          className="text-[clamp(2.1rem,4.5vw,3.3rem)] font-sans font-semibold leading-[1.2] text-zinc-950 text-center tracking-tight max-w-[800px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Maximizing the value of business <span className="text-[#5c43fd]">data</span>
        </motion.h2>

        <motion.p
          className="text-zinc-500 text-[1.05rem] leading-[1.6] text-center max-w-[620px] mt-5 mb-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We provide valuable insights, and establish your brand as a thought leader in the marketing and financial space.
        </motion.p>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-[#5c43fd]">
            <Loader2 className="animate-spin" size={24} />
          </div>
        ) : blogs.length ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.15, once: true }}
            variants={containerVariants}
          >
            {blogs.map((post) => (
              <motion.article
                className="p-6 rounded-[2rem] border border-zinc-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:border-[#5c43fd]/20 transition-all duration-300 flex flex-col justify-between"
                key={post.slug}
                variants={itemVariants}
              >
                <div className="flex flex-col flex-1">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] border border-zinc-100 flex items-center justify-center relative mb-6 shadow-sm">
                    {renderIllustration(post.slug)}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 select-none">
                    <span
                      className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-[#5c43fd]/6 text-[#5c43fd] font-semibold text-[0.78rem] tracking-wide leading-none"
                    >
                      {post.category}
                    </span>
                  </div>

                  <h3 className="m-0 text-[1.32rem] font-medium text-zinc-950 tracking-tight leading-snug mb-6 flex-1">
                    {post.title}
                  </h3>
                </div>

                <Link
                  className="w-full text-center py-3.5 border border-zinc-200 hover:bg-zinc-50 rounded-full font-bold text-[0.88rem] text-zinc-800 hover:text-[#5c43fd] hover:border-[#5c43fd]/25 transition-all duration-200 no-underline block"
                  href={`/blog/${post.slug}`}
                >
                  Read More
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <p className="text-zinc-400">No blog posts found.</p>
        )}
      </div>
    </section>
  );
}
