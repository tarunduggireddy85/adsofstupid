import type { Metadata } from "next";
import Link from "next/link";
import { readBlogs } from "@/lib/db";
import { formatBlogDate, readTime } from "@/lib/blog";
import { SiteHeader } from "@/components/SiteHeader";
import { StrategyPopup } from "@/components/StrategyPopup";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogGrid, type BlogCard } from "@/components/blog/BlogGrid";
import { BlogImage } from "@/components/blog/BlogImage";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes for D2C founders — performance marketing, Shopify conversion, offers, retention, and profitable scale. No fluff, from Ads of Stupid.",
  alternates: { canonical: "/blog" }
};

export default async function BlogIndexPage() {
  const blogs = await readBlogs();
  const published = blogs
    .filter((blog) => blog.status === "Published")
    .sort(
      (a, b) =>
        new Date(b.publishDate || b.createdAt).getTime() -
        new Date(a.publishDate || a.createdAt).getTime()
    );

  const [featured, ...rest] = published;

  const cards: BlogCard[] = rest.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    featuredImage: p.featuredImage,
    date: formatBlogDate(p.publishDate || p.createdAt),
    readTime: readTime(p.content)
  }));

  return (
    <div className="min-h-screen bg-surface-main">
      <SiteHeader />

      <main className="w-full">
        {/* hero */}
        <section className="bg-gradient-to-b from-[#f4f0ff] to-transparent pt-16 pb-12 px-4">
          <div className="max-w-[760px] mx-auto flex flex-col items-center text-center">
            <EyebrowBadge>Ads of Stupid blog</EyebrowBadge>
            <h1 className="font-sans font-semibold text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] tracking-tight text-zinc-950 mt-4">
              Field notes for founders building D2C brands.
            </h1>
            <p className="text-zinc-500 text-[1.05rem] leading-[1.7] max-w-[620px] mt-4">
              Practical articles on performance marketing, Shopify conversion, offer design,
              retention systems, and profitable scale — no fluff.
            </p>
          </div>
        </section>

        {/* featured (latest) post */}
        {featured && (
          <section className="max-w-[920px] mx-auto px-4 mb-16">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-[2rem] border border-zinc-200/80 bg-white overflow-hidden shadow-[0_18px_44px_rgba(92,67,253,0.05)] hover:shadow-[0_24px_60px_rgba(92,67,253,0.1)] hover:border-[#5c43fd]/20 transition-all duration-300 no-underline"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100">
                <BlogImage
                  src={featured.featuredImage}
                  alt={featured.title}
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#5c43fd] text-white text-[0.74rem] font-bold tracking-wide leading-none">
                  Featured · {featured.category}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <span className="text-[0.84rem] text-zinc-400 font-medium">
                  {formatBlogDate(featured.publishDate || featured.createdAt)} · {readTime(featured.content)}
                </span>
                <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-semibold text-zinc-950 tracking-tight leading-tight mt-2 group-hover:text-[#5c43fd] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-zinc-500 text-[1.02rem] leading-[1.7] mt-3 max-w-[640px]">
                  {featured.description}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-5 text-[#5c43fd] font-semibold text-[0.95rem]">
                  Read article <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* grid + category filter */}
        <section className="max-w-[1100px] mx-auto px-4 pb-20">
          {cards.length > 0 ? (
            <BlogGrid posts={cards} />
          ) : (
            !featured && <p className="text-center text-zinc-400">No articles published yet.</p>
          )}
        </section>
      </main>

      <BlogFooter />
      <StrategyPopup />
    </div>
  );
}
