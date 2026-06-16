import type { Metadata } from "next";
import Link from "next/link";
import { readBlogs } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Strategy, acquisition, conversion, and retention notes for early-stage D2C founders."
};

export default async function BlogIndexPage() {
  const blogs = await readBlogs();
  const publishedBlogs = blogs.filter((blog) => blog.status === "Published");

  function formatPublishDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return dateStr;
    }
  }

  function getReadTime(content: string) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${Math.max(1, minutes)} min read`;
  }

  return (
    <main className="min-h-screen py-24 bg-gradient-to-b from-[#a56abd]/10 to-transparent bg-no-repeat bg-[size:100%_28%]">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto px-4">
        <div className="mb-8">
          <Link
            className="inline-flex items-center text-[0.88rem] font-semibold text-brand-strong hover:text-brand-mid transition-colors duration-200 no-underline"
            href="/"
          >
            ← Back to homepage
          </Link>
        </div>

        <section className="max-w-[760px] mx-auto text-center mb-16">
          <p className="text-brand-mid text-[0.92rem] tracking-[0.08em] uppercase font-semibold m-0">
            Ads of Stupid blog
          </p>
          <h1 className="font-display text-[clamp(2.1rem,4.5vw,3rem)] leading-none tracking-[-0.035em] font-semibold text-brand-strong mt-3 mb-4">
            Field notes for founders building D2C brands without fluff.
          </h1>
          <p className="text-ink-soft text-[1.05rem] leading-[1.7] max-w-[620px] mx-auto">
            Practical articles on performance marketing, Shopify conversion, offer
            design, retention systems, and profitable scale.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px] mx-auto">
          {publishedBlogs.map((post) => (
            <article
              className="p-8 rounded-[2rem] border border-brand-strong/10 bg-white/72 shadow-[0_18px_44px_rgba(73,34,91,0.07)] backdrop-blur-md flex flex-col justify-between"
              key={post.slug}
            >
              <div>
                <p className="m-0 text-brand-mid text-[0.88rem] tracking-[0.08em] uppercase font-semibold">
                  {post.category}
                </p>
                <h2 className="m-0 text-[1.4rem] font-semibold text-brand-strong mt-3 mb-2">
                  {post.title}
                </h2>
                <p className="text-ink-soft text-[0.98rem] leading-[1.7] mt-3 mb-6">
                  {post.description}
                </p>
              </div>
              <div className="flex justify-between items-center text-[0.88rem] text-ink-soft/75 mt-auto pt-4 border-t border-brand-strong/8">
                <span>
                  {formatPublishDate(post.publishDate || post.createdAt)} · {getReadTime(post.content)}
                </span>
                <Link
                  className="text-brand-strong font-semibold hover:text-brand-mid transition-colors duration-200 no-underline"
                  href={`/blog/${post.slug}`}
                >
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
