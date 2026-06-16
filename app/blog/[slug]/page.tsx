import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { readBlogs } from "@/lib/db";
import { EyebrowBadge } from "../../../components/ui/EyebrowBadge";

export async function generateStaticParams() {
  const blogs = await readBlogs();
  return blogs.map((post) => ({ slug: post.slug }));
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
  return { title: post.title, description: post.description };
}

const postTagMap: Record<string, string[]> = {
  "d2c-brand-launch-checklist": ["Launch Systems"],
  "shopify-conversion-leaks": ["Conversion Systems", "Tips"],
  "performance-marketing-playbook-pune": ["Performance Playbook", "Tips"],
};

function PostIllustration({ slug }: { slug: string }) {
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
          <svg className="w-2.5 h-2.5 text-[#5c43fd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          <span>Income</span>
        </div>
        <span className="text-[0.72rem] font-bold text-zinc-950 block leading-none">$2,999</span>
        <div className="h-2 rounded bg-zinc-100 w-full mt-0.5 overflow-hidden">
          <div className="h-full rounded bg-[#5c43fd]" style={{ width: "60%" }} />
        </div>
      </div>
      <div className="absolute right-5 bottom-6 w-[130px] p-2.5 rounded-xl bg-white border border-zinc-100 shadow-lg flex flex-col gap-1.5 z-20 scale-95 transform rotate-2 select-none">
        <div className="flex items-center gap-1 text-[0.45rem] text-zinc-400 font-bold">
          <svg className="w-2.5 h-2.5 text-[#5c43fd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
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

type ParsedSection = {
  title: string;
  body: string[];
};

function parseContent(content: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  const parts = content.split(/\r?\n\r?\n/);
  
  let currentSection: ParsedSection = { title: "", body: [] };
  
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    
    if (trimmed.startsWith("##")) {
      if (currentSection.title || currentSection.body.length > 0) {
        sections.push(currentSection);
      }
      currentSection = {
        title: trimmed.replace(/^##\s*/, ""),
        body: []
      };
    } else {
      currentSection.body.push(trimmed);
    }
  }
  
  if (currentSection.title || currentSection.body.length > 0) {
    sections.push(currentSection);
  }
  
  return sections;
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

  if (post.status === "Draft") {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin_auth")?.value === "true";
    if (!isAdmin) {
      notFound();
    }
  }

  const publishedBlogs = blogs.filter((blog) => blog.status === "Published");
  const currentIndex = publishedBlogs.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? publishedBlogs[currentIndex - 1] : null;
  const nextPost = currentIndex < publishedBlogs.length - 1 ? publishedBlogs[currentIndex + 1] : null;
  const otherPosts = publishedBlogs.filter((p) => p.slug !== slug).slice(0, 3);
  
  const tags = postTagMap[slug] ?? [post.category];

  const wordsPerMinute = 200;
  const words = post.content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  const readTime = `${Math.max(1, minutes)} min read`;

  const sections = parseContent(post.content);

  const formattedPublishDate = new Date(post.publishDate || post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="min-h-screen bg-surface-main">
      <header className="sticky top-0 z-50 w-full py-4 px-4 flex justify-center bg-surface-main/90 backdrop-blur-xl border-b border-zinc-200/60">
        <div className="w-full max-w-[900px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <svg className="w-6 h-6 text-[#5c43fd] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4zm-8-8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4z" />
            </svg>
            <span className="font-semibold text-zinc-900 tracking-tight text-[1.12rem]">Ads of Stupid</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "/#formula", label: "Services" },
              { href: "/#proof", label: "Projects" },
              { href: "/#blog", label: "Blog" },
              { href: "/#contact", label: "Contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-[0.88rem] font-medium text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center bg-[#5c43fd] text-white font-medium text-[0.88rem] px-5 py-2 rounded-full hover:bg-[#4a32e5] transition-colors shadow-[0_2px_8px_rgba(92,67,253,0.2)] no-underline"
          >
            Book a call
          </Link>
        </div>
      </header>

      <main className="w-full">
        <div className="w-full bg-gradient-to-b from-[#f4f0ff] to-transparent pt-14 pb-10 px-4">
          <div className="max-w-[760px] mx-auto">
            <nav className="flex items-center gap-2 text-[0.82rem] text-zinc-400 mb-6">
              <Link href="/" className="hover:text-[#5c43fd] transition-colors no-underline">Home</Link>
              <span>/</span>
              <Link href="/#blog" className="hover:text-[#5c43fd] transition-colors no-underline">Blog</Link>
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
                {readTime}
              </span>
            </div>

            <p className="text-[1.12rem] leading-[1.7] text-zinc-600 font-medium border-l-[3px] border-[#5c43fd]/30 pl-4 py-1 italic">
              {post.description}
            </p>
          </div>
        </div>

        <div className="max-w-[760px] mx-auto px-4 py-12">
          <div className="grid gap-10">
            {sections.map((section, i) => (
              <section key={section.title || i} className="scroll-mt-28">
                {section.title ? (
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-[1.1rem] font-black text-[#5c43fd]/25 leading-none mt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-sans text-[1.5rem] font-semibold text-zinc-950 tracking-tight leading-tight">
                      {section.title}
                    </h2>
                  </div>
                ) : null}
                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className={`text-zinc-500 text-[1.05rem] leading-[1.8] mb-5 ${section.title ? 'ml-8' : ''}`}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

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

        <div className="w-full border-t border-zinc-200/80 bg-white/50 py-16 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <EyebrowBadge>Blog</EyebrowBadge>

                <h2 className="font-sans font-semibold text-[1.6rem] text-zinc-950 tracking-tight leading-tight">
                  More from the blog
                </h2>
              </div>
              <Link href="/#blog" className="text-[#5c43fd] font-semibold hover:text-[#4a32e5] transition-colors no-underline text-[0.9rem] whitespace-nowrap">
                See all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((entry) => {
                const entryTags = postTagMap[entry.slug] ?? [entry.category];
                return (
                  <article
                    key={entry.slug}
                    className="p-6 rounded-[2rem] border border-zinc-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:border-[#5c43fd]/20 hover:shadow-[0_12px_40px_rgba(92,67,253,0.06)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] border border-zinc-100 flex items-center justify-center relative mb-6 shadow-sm">
                        <PostIllustration slug={entry.slug} />
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {entryTags.map((tag) => (
                          <span key={tag} className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-[#5c43fd]/6 text-[#5c43fd] font-semibold text-[0.78rem] tracking-wide leading-none">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="m-0 text-[1.18rem] font-bold text-zinc-950 tracking-tight leading-snug">
                        {entry.title}
                      </h3>
                      <p className="text-zinc-500 text-[0.93rem] leading-[1.6] mt-3 mb-5">
                        {entry.description}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${entry.slug}`}
                      className="w-full text-center py-3.5 border border-zinc-200 hover:bg-zinc-50 rounded-full font-bold text-[0.88rem] text-zinc-800 hover:text-[#5c43fd] hover:border-[#5c43fd]/25 transition-all duration-200 no-underline block"
                    >
                      Read More
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <footer
        className="relative overflow-hidden pt-16 pb-6 text-left w-full mt-0"
        style={{
          background: `
            radial-gradient(circle at 50% 10%, #ffffff 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0) 70%),
            radial-gradient(at 0% 100%, #8566ff 0px, transparent 55%),
            radial-gradient(at 100% 100%, #9a7eff 0px, transparent 55%),
            radial-gradient(at 0% 50%, #fbcfe8 0px, transparent 40%),
            radial-gradient(at 100% 50%, #f5d0fe 0px, transparent 40%),
            #f8fafc
          `
        }}
      >
        <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 md:px-8">
          <div>
            <h2 className="font-sans text-[1.8rem] leading-none font-bold text-[#0f172a] mb-4">Ads of Stupid</h2>
            <p className="text-[0.95rem] text-zinc-600 leading-[1.7] mb-2 font-medium">Decoding the science behind the sale - one D2C brand at a time.</p>
            <p className="text-[0.95rem] text-zinc-400 font-bold">Pune, India</p>
          </div>
          <div>
            <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">Quick links</h3>
            <ul className="m-0 p-0 list-none grid gap-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/#formula", label: "What we do" },
                { href: "/#proof", label: "Projects" },
                { href: "/#blog", label: "Blog" },
                { href: "/#contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">Services</h3>
            <ul className="m-0 p-0 list-none grid gap-2.5">
              {[
                { href: "/performance-marketing-agency-pune", label: "Performance marketing" },
                { href: "/d2c-growth-strategy", label: "D2C growth strategy" },
                { href: "/meta-ads-management", label: "Meta and Google Ads" },
                { href: "/shopify-cro", label: "Shopify funnel optimization" },
                { href: "/whatsapp-marketing", label: "WhatsApp and Email marketing" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="m-0 p-0 list-none grid gap-2.5">
              <li><a href="mailto:hello@adsofstupid.com" className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">Email: hello@adsofstupid.com</a></li>
              <li><a href="https://wa.me/910000000000" className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">WhatsApp: +91 00000 00000</a></li>
              <li className="text-[0.92rem] text-zinc-400 font-semibold">Pune, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        <div className="w-full text-center text-[clamp(2rem,14vw,11.5rem)] font-sans font-black text-[#5c43fd]/[0.07] pointer-events-none mt-16 mb-[-1.5rem] select-none relative z-10 leading-none whitespace-nowrap">
          Ads Of Stupid
        </div>

        <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto mt-16 pt-6 border-t border-white/20 relative z-10 flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-2 text-white text-[0.82rem] leading-[1.7] px-4 md:px-8 text-center">
          <span>© 2026 Ads of Stupid. All rights reserved.</span>
          <span className="text-white/90">Performance marketing agency in Pune for early-stage D2C brands.</span>
          <span className="text-white/80 font-medium italic">No stupid marketing decisions were harmed in the making of this website.</span>
        </div>
      </footer>
    </div>
  );
}
