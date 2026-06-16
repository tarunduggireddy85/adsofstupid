export type BlogStatus = "Published" | "Draft";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  status: BlogStatus;
  createdAt: string;
  publishDate: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
};

export const BLOG_CATEGORIES = [
  "Web Development",
  "React",
  "Next.js",
  "UI/UX",
  "SEO",
  "Business"
];

export const mockBlogs: BlogPost[] = [
  {
    id: "blog-001",
    title: "Building Conversion-Ready Landing Pages With Next.js",
    slug: "building-conversion-ready-landing-pages-with-nextjs",
    description:
      "A practical guide to shipping fast, SEO-friendly landing pages that still feel premium and conversion focused.",
    content:
      "Great landing pages are not just pretty. They need to load quickly, create trust in the first few seconds, and direct attention toward one clear action.\n\nWith Next.js, you can combine server rendering, image optimization, and route-level code splitting to keep pages fast without sacrificing design quality.\n\nStart by defining one primary conversion goal. Build your hero, proof, offer, objections, and CTA flow around that single goal. Every section should either clarify the promise or remove friction.\n\nFinally, treat performance as part of the user experience. Compress media, avoid heavy client bundles, and make the interface feel stable on mobile first.",
    featuredImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    category: "Next.js",
    tags: ["nextjs", "landing pages", "conversion"],
    author: "Aarav Mehta",
    status: "Published",
    createdAt: "2026-05-02T09:00:00.000Z",
    publishDate: "2026-05-03",
    seoTitle: "Next.js Landing Pages for Better Conversions",
    seoDescription:
      "Learn how to use Next.js to build high-performance landing pages that convert more visitors into customers.",
    seoKeywords: "next.js landing pages, conversion optimization, performance"
  },
  {
    id: "blog-002",
    title: "React Content Blocks That Make Blog Editing Easier",
    slug: "react-content-blocks-that-make-blog-editing-easier",
    description:
      "A clean editorial model for reusable content sections inside modern React-based content workflows.",
    content:
      "Writers move faster when the system gives them structure without getting in the way.\n\nReusable content blocks help teams maintain layout consistency while still allowing enough flexibility for storytelling. In React projects, this usually means defining a predictable set of block components and storing content in a shape the frontend can render safely.\n\nThe main goal is editorial speed. A good block system should reduce formatting mistakes, improve reusability, and make previews feel close to production output.",
    featuredImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "React",
    tags: ["react", "cms", "editorial workflow"],
    author: "Neha Kulkarni",
    status: "Published",
    createdAt: "2026-05-04T11:30:00.000Z",
    publishDate: "2026-05-05",
    seoTitle: "Reusable React Content Blocks for Editorial Teams",
    seoDescription:
      "Improve blog editing and page consistency with reusable React content block patterns.",
    seoKeywords: "react content blocks, blog editor, reusable components"
  },
  {
    id: "blog-003",
    title: "Why Every Brand Needs an SEO Content Calendar",
    slug: "why-every-brand-needs-an-seo-content-calendar",
    description:
      "A structured publishing calendar helps teams target search demand instead of posting randomly.",
    content:
      "Content without a schedule usually turns into a pile of disconnected ideas.\n\nAn SEO content calendar forces prioritization. It aligns keyword themes, business objectives, and publishing cadence in one system. That makes it easier to plan internal links, supporting articles, and seasonal campaigns.\n\nThe most effective calendars are simple. Focus on topics with commercial relevance, assign clear owners, and review performance monthly.",
    featuredImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    category: "SEO",
    tags: ["seo", "content strategy", "planning"],
    author: "Riya Sharma",
    status: "Draft",
    createdAt: "2026-05-06T08:15:00.000Z",
    publishDate: "2026-05-20",
    seoTitle: "SEO Content Calendar Strategy for Growing Brands",
    seoDescription:
      "Plan smarter blog content with an SEO calendar built around search demand and business goals.",
    seoKeywords: "seo content calendar, content planning, organic growth"
  },
  {
    id: "blog-004",
    title: "Designing Blog Layouts That Keep Readers Scrolling",
    slug: "designing-blog-layouts-that-keep-readers-scrolling",
    description:
      "Typography, spacing, and visual rhythm matter more than decorative clutter when building readable blog pages.",
    content:
      "Long-form reading experiences depend on rhythm. Dense paragraphs, weak hierarchy, and inconsistent spacing increase fatigue.\n\nThe fix is usually straightforward: sharper headings, shorter paragraphs, more generous spacing, and better support visuals. Good UI writing and UI layout work together.\n\nFor editorial pages, readability is a performance metric. If the layout makes the content easier to scan, readers stay longer and consume more of the story.",
    featuredImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    category: "UI/UX",
    tags: ["ui", "ux", "blog design"],
    author: "Kabir Sethi",
    status: "Published",
    createdAt: "2026-05-08T13:45:00.000Z",
    publishDate: "2026-05-09",
    seoTitle: "Readable Blog Layout Design Tips",
    seoDescription:
      "Use layout, typography, and spacing principles to keep readers engaged on blog pages.",
    seoKeywords: "blog ui ux, readable blog layout, editorial design"
  },
  {
    id: "blog-005",
    title: "Using Web Performance Audits to Prioritize Fixes",
    slug: "using-web-performance-audits-to-prioritize-fixes",
    description:
      "Audit reports are only useful when they help the team focus on the highest-impact performance issues.",
    content:
      "A performance audit is not a checklist to complete blindly. It is a prioritization tool.\n\nStart with real user pain: slow LCP, layout shifts, or oversized scripts. Then estimate which fixes reduce friction fastest. Performance work should support business goals, especially on pages tied to revenue or lead capture.\n\nDocument each issue with impact, effort, and ownership. That turns a vague technical concern into an actionable roadmap.",
    featuredImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    category: "Web Development",
    tags: ["performance", "web vitals", "audits"],
    author: "Ishita Rao",
    status: "Draft",
    createdAt: "2026-05-10T10:10:00.000Z",
    publishDate: "2026-05-24",
    seoTitle: "How to Act on Web Performance Audits",
    seoDescription:
      "Turn performance audit findings into a realistic roadmap that improves user experience.",
    seoKeywords: "web performance audit, page speed fixes, core web vitals"
  },
  {
    id: "blog-006",
    title: "Category Architecture for Scalable Business Blogs",
    slug: "category-architecture-for-scalable-business-blogs",
    description:
      "A useful category system supports navigation, internal linking, and editorial clarity as the blog grows.",
    content:
      "Most blogs outgrow their initial category structure quickly. When categories are too broad or inconsistent, content becomes harder to discover and maintain.\n\nA better system starts with business themes. Group articles into buckets that reflect audience intent and internal ownership. This helps both users and editors understand where each piece belongs.\n\nOnce the structure is stable, use it consistently across navigation, templates, and internal linking.",
    featuredImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    category: "Business",
    tags: ["content ops", "blog strategy", "taxonomy"],
    author: "Dev Malhotra",
    status: "Published",
    createdAt: "2026-05-12T07:20:00.000Z",
    publishDate: "2026-05-12",
    seoTitle: "Scalable Blog Category Strategy for Businesses",
    seoDescription:
      "Create a blog category architecture that supports editorial scale and stronger content discovery.",
    seoKeywords: "blog categories, content taxonomy, business blog structure"
  }
];
