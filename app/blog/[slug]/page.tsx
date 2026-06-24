import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readBlogs } from "@/lib/db";
import { isAdminSession } from "@/lib/adminAuth";
import { formatBlogDate, readTime } from "@/lib/blog";
import { SiteHeader } from "@/components/SiteHeader";
import { StrategyPopup } from "@/components/StrategyPopup";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogImage } from "@/components/blog/BlogImage";
import { PostBody } from "@/components/blog/PostBody";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

export async function generateStaticParams() {
  const blogs = await readBlogs();
  // Only pre-render published posts; drafts/archived stay un-prerendered
  // (still guarded by the cookie check in the page body).
  return blogs.filter((post) => post.status === "Published").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogs = await readBlogs();
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.description;
  const url = `/blog/${slug}`;
  const images = post.featuredImage ? [post.featuredImage] : undefined;
  const keywords = post.seoKeywords
    ? post.seoKeywords.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", images },
    twitter: { card: "summary_large_image", title, description, images }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogs = await readBlogs();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) notFound();

  if (post.status !== "Published") {
    const isAdmin = await isAdminSession();
    if (!isAdmin) notFound();
  }

  const publishedBlogs = blogs.filter((blog) => blog.status === "Published");
  const currentIndex = publishedBlogs.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? publishedBlogs[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < publishedBlogs.length - 1
      ? publishedBlogs[currentIndex + 1]
      : null;
  const otherPosts = publishedBlogs.filter((p) => p.slug !== slug).slice(0, 3);

  const tags = post.tags && post.tags.length ? post.tags : [post.category];
  const formattedPublishDate = formatBlogDate(post.publishDate || post.createdAt);

  return (
    <div className="min-h-screen bg-surface-main">
      <SiteHeader />

      <main className="w-full">
        {/* title block */}
        <div className="w-full bg-gradient-to-b from-[#f4f0ff] to-transparent pt-14 pb-10 px-4">
          <div className="max-w-[820px] mx-auto">
            <nav className="flex items-center gap-2 text-[0.82rem] text-zinc-400 mb-6">
              <Link href="/" className="hover:text-[#5c43fd] transition-colors no-underline">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#5c43fd] transition-colors no-underline">Blog</Link>
              <span>/</span>
              <span className="text-[#5c43fd] font-medium truncate max-w-[180px] md:max-w-none">{post.category}</span>
            </nav>

            <div className="flex flex-wrap gap-2 mb-5">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#5c43fd]/6 text-[#5c43fd] font-semibold text-[0.78rem] tracking-wide leading-none">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-sans font-semibold text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.15] tracking-tight text-zinc-950 mb-5">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-[0.85rem] text-zinc-400 font-medium mb-6">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {formattedPublishDate}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {readTime(post.content)}
              </span>
              {post.author ? (
                <>
                  <span>·</span>
                  <span>By {post.author}</span>
                </>
              ) : null}
            </div>

            <p className="text-[1.12rem] leading-[1.7] text-zinc-600 font-medium border-l-[3px] border-[#5c43fd]/30 pl-4 py-1 italic">
              {post.description}
            </p>
          </div>
        </div>

        {/* featured image */}
        <div className="max-w-[860px] mx-auto px-4 -mt-2">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-[1.8rem] border border-zinc-200/80 bg-zinc-100 shadow-[0_18px_44px_rgba(30,30,60,0.08)]">
            <BlogImage src={post.featuredImage} alt={post.title} />
          </div>
        </div>

        {/* article body */}
        <div className="max-w-[760px] mx-auto px-4 py-12">
          <PostBody content={post.content} />

          {/* prev / next */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4 mt-16 pt-10 border-t border-zinc-200">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="flex-1 group flex flex-col gap-1.5 p-5 rounded-2xl border border-zinc-200 bg-white hover:border-[#5c43fd]/30 hover:shadow-[0_8px_24px_rgba(92,67,253,0.06)] transition-all duration-200 no-underline"
              >
                <span className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-zinc-400 group-hover:text-[#5c43fd] transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                  Previous post
                </span>
                <span className="text-[0.95rem] font-semibold text-zinc-800 group-hover:text-[#5c43fd] transition-colors leading-snug line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div className="flex-1" />}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="flex-1 group flex flex-col gap-1.5 p-5 rounded-2xl border border-zinc-200 bg-white hover:border-[#5c43fd]/30 hover:shadow-[0_8px_24px_rgba(92,67,253,0.06)] transition-all duration-200 no-underline text-right items-end"
              >
                <span className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-zinc-400 group-hover:text-[#5c43fd] transition-colors">
                  Next post
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
                <span className="text-[0.95rem] font-semibold text-zinc-800 group-hover:text-[#5c43fd] transition-colors leading-snug line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div className="flex-1" />}
          </div>

          {/* CTA */}
          <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#f4f0ff] to-[#ede8ff] border border-[#5c43fd]/10 shadow-[0_12px_32px_rgba(92,67,253,0.06)] mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-1">
              <p className="text-[#5c43fd] text-[0.82rem] uppercase font-bold tracking-wider m-0">Need this applied to your brand?</p>
              <h2 className="m-0 text-[1.45rem] font-semibold text-zinc-950 mt-2">Turn the article into a growth plan.</h2>
              <p className="text-zinc-500 text-[0.98rem] leading-[1.7] mt-3 mb-0">
                If your D2C store is facing the same issues, book a strategy call. We will diagnose the funnel, the offer, and the acquisition system.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center min-h-[3rem] px-7 rounded-full text-[0.95rem] font-semibold bg-[#5c43fd] text-white hover:bg-[#4a32e5] transition-all duration-200 no-underline shadow-[0_4px_16px_rgba(92,67,253,0.2)] whitespace-nowrap"
            >
              Book a free strategy call
            </Link>
          </div>
        </div>

        {/* related posts */}
        {otherPosts.length > 0 && (
          <div className="w-full border-t border-zinc-200/80 bg-white/50 py-16 px-4">
            <div className="max-w-[1100px] mx-auto">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <EyebrowBadge>Blog</EyebrowBadge>
                  <h2 className="font-sans font-semibold text-[1.6rem] text-zinc-950 tracking-tight leading-tight mt-2">
                    More from the blog
                  </h2>
                </div>
                <Link href="/blog" className="text-[#5c43fd] font-semibold hover:text-[#4a32e5] transition-colors no-underline text-[0.9rem] whitespace-nowrap">
                  See all →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {otherPosts.map((entry) => (
                  <article
                    key={entry.slug}
                    className="group flex flex-col rounded-[1.6rem] border border-zinc-200/80 bg-white overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:border-[#5c43fd]/20 hover:shadow-[0_18px_44px_rgba(92,67,253,0.08)] transition-all duration-300"
                  >
                    <Link href={`/blog/${entry.slug}`} className="relative block aspect-[16/9] overflow-hidden no-underline bg-zinc-100">
                      <BlogImage
                        src={entry.featuredImage}
                        alt={entry.title}
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#5c43fd] text-[0.72rem] font-bold tracking-wide leading-none">
                        {entry.category}
                      </span>
                    </Link>
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="m-0 text-[1.12rem] font-semibold text-zinc-950 tracking-tight leading-snug">
                        <Link href={`/blog/${entry.slug}`} className="no-underline text-inherit hover:text-[#5c43fd] transition-colors">
                          {entry.title}
                        </Link>
                      </h3>
                      <p className="text-zinc-500 text-[0.93rem] leading-[1.6] mt-2.5 flex-1">
                        {entry.description}
                      </p>
                      <Link
                        href={`/blog/${entry.slug}`}
                        className="mt-5 inline-flex items-center gap-1.5 text-[#5c43fd] font-semibold text-[0.88rem] no-underline hover:text-[#4a32e5] transition-colors"
                      >
                        Read more <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <BlogFooter />
      <StrategyPopup />
    </div>
  );
}
