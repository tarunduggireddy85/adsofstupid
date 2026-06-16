import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const pages = {
  "d2c-growth-strategy": {
    description:
      "Growth strategy for early-stage D2C brands in Pune across positioning, offers, CAC, LTV, and channel planning.",
    intro:
      "Strategy first. Spend second. This page is ready for the dedicated service build in phase two.",
    title: "D2C Growth Strategy"
  },
  "meta-ads-management": {
    description:
      "Meta and Google Ads management for early-stage D2C brands that need profitable acquisition, not boosted-post chaos.",
    intro:
      "Acquisition support will expand here with deeper service detail, proof, and FAQs.",
    title: "Meta & Google Ads"
  },
  "performance-marketing-agency-pune": {
    description:
      "Performance marketing agency in Pune for early-stage D2C brands across research, strategy, acquisition, conversion, and scale.",
    intro:
      "This service page is reserved for the SEO depth pass in phase two and already linked from the homepage footer.",
    title: "Performance Marketing Agency Pune"
  },
  "shopify-cro": {
    description:
      "Shopify funnel optimization for D2C brands that need better conversion rate, better retention, and cleaner paths to purchase.",
    intro:
      "Conversion optimization gets its own landing page next. The homepage now routes here instead of a 404.",
    title: "Shopify Funnel Optimization"
  },
  "whatsapp-marketing": {
    description:
      "WhatsApp and email marketing systems for Indian D2C brands using retention flows, abandoned cart recovery, and repeat-purchase automation.",
    intro:
      "Retention and WhatsApp lifecycle content will land here in phase two.",
    title: "WhatsApp & Email Marketing"
  }
} as const;

type PageSlug = keyof typeof pages;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const page = pages[resolvedParams.slug as PageSlug];

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description
  };
}

export default async function ServicePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const page = pages[resolvedParams.slug as PageSlug];

  if (!page) {
    notFound();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background:
          "radial-gradient(circle at top, rgba(165, 106, 189, 0.16), transparent 28%), #f5ebfa"
      }}
    >
      <section
        style={{
          width: "min(760px, 100%)",
          padding: "clamp(1.5rem, 4vw, 3rem)",
          borderRadius: "2rem",
          background: "rgba(255,255,255,0.78)",
          border: "1px solid rgba(73, 34, 91, 0.12)"
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#6e3482",
            fontSize: "0.95rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase"
          }}
        >
          Phase two page
        </p>
        <h1
          style={{
            margin: "0.8rem 0 1rem",
            fontFamily:
              '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.035em",
            fontWeight: 500
          }}
        >
          {page.title}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "1.1rem",
            lineHeight: 1.7,
            color: "rgba(31, 31, 28, 0.74)"
          }}
        >
          {page.intro}
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              padding: "0.9rem 1.4rem",
              borderRadius: "999px",
              background: "#49225b",
              color: "#f5ebfa",
              textDecoration: "none"
            }}
          >
            Back to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
