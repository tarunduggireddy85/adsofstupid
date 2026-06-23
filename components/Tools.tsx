"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const toolRows = [
  {
    color: "#7F77DD",
    description: "Tools we use to understand the market before spending a rupee.",
    key: "research",
    number: "01",
    element: "Research",
    name: "The lens",
    tools: [
      "SEMrush",
      "Ahrefs",
      "Screaming Frog",
      "Google Trends",
      "Google Keyword Planner",
      "Google Forms"
    ]
  },
  {
    color: "#378ADD",
    description: "Tools we use to plan, track, and align.",
    key: "strategy",
    number: "02",
    element: "Strategy",
    name: "The blueprint",
    tools: [
      "Google Tag Manager",
      "Meta Pixel",
      "Google Analytics 4",
      "Notion"
    ]
  },
  {
    color: "#D85A30",
    description: "Tools we use to bring qualified buyers.",
    key: "acquisition",
    number: "03",
    element: "Acquisition",
    name: "The engine",
    tools: [
      "Meta Ads Manager",
      "Google Ads",
      "Adobe Photoshop",
      "Adobe Premiere Pro",
      "Canva",
      "Leonardo AI",
      "Sora",
      "Veo 3",
      "Fiverr (for UGC creators)"
    ]
  },
  {
    color: "#639922",
    description: "Tools we use to turn traffic into revenue.",
    key: "conversion",
    number: "04",
    element: "Conversion",
    name: "The funnel",
    tools: [
      "Shopify",
      "Klaviyo",
      "Interakt (WhatsApp)",
      "Microsoft Clarity",
      "Judge.me"
    ]
  },
  {
    color: "#1D9E75",
    description: "Tools we use to monitor, report, and grow.",
    key: "scale",
    number: "05",
    element: "Scale",
    name: "The dashboard",
    tools: [
      "Google Analytics 4",
      "Google Search Console",
      "Looker Studio",
      "Microsoft Clarity",
      "Hotjar",
      "Meta Business Suite"
    ]
  }
] as const;

/* Simple Icons slugs for the tools that have an official brand logo.
   Anything not listed falls back to a tinted monogram. */
const TOOL_SLUGS: Record<string, string> = {
  "SEMrush": "semrush",
  "Google Forms": "googleforms",
  "Google Tag Manager": "googletagmanager",
  "Meta Pixel": "meta",
  "Google Analytics 4": "googleanalytics",
  "Notion": "notion",
  "Meta Ads Manager": "meta",
  "Google Ads": "googleads",
  "Fiverr (for UGC creators)": "fiverr",
  "Shopify": "shopify",
  "Interakt (WhatsApp)": "whatsapp",
  "Google Search Console": "googlesearchconsole",
  "Hotjar": "hotjar",
  "Meta Business Suite": "meta"
};

function monogram(name: string) {
  const clean = name.replace(/\(.*?\)/g, "").trim();
  const stripped = clean.replace(/^(Google|Microsoft|Adobe|Meta)\s+/i, "");
  return (stripped[0] || clean[0] || "?").toUpperCase();
}

function ToolLogo({ name, color }: { name: string; color: string }) {
  const slug = TOOL_SLUGS[name];
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Safety net: if the logo 404s before React attaches onError (SSR/hydration
  // gap), the error event is missed — so re-check the broken state on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [slug]);

  if (slug && !failed) {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-zinc-200/80 shadow-[0_4px_12px_rgba(20,30,70,0.05)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={`https://cdn.simpleicons.org/${slug}`}
          alt={`${name} logo`}
          width={26}
          height={26}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
          className="h-[26px] w-[26px] object-contain"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-bold text-[1.15rem] shadow-[0_4px_12px_rgba(20,30,70,0.05)]"
      style={{ color, background: `${color}1f` }}
    >
      {monogram(name)}
    </span>
  );
}

interface ToolsProps {
  openTool: (typeof toolRows)[number]["key"];
  setOpenTool: (key: (typeof toolRows)[number]["key"]) => void;
}

export function Tools({ openTool, setOpenTool }: ToolsProps) {
  const active = toolRows.find((row) => row.key === openTool) ?? toolRows[0];

  return (
    <section className="bg-[rgba(92,67,253,0.03)] py-20 lg:py-[7.5rem] scroll-mt-28" id="tools">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto">
        <SectionHeader
          description="Real tools. Used daily. No vanity logos for show."
          eyebrow="The tool stack"
          title="The toolkit behind the formula."
        />

        {/* ===== HORIZONTAL PILL TAB BAR ===== */}
        <div
          role="tablist"
          aria-label="Tool categories"
          className="mt-12 flex flex-wrap justify-center gap-2.5"
        >
          {toolRows.map((row) => {
            const isActive = row.key === active.key;
            return (
              <button
                key={row.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setOpenTool(row.key)}
                type="button"
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.95rem] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={
                  isActive
                    ? { background: row.color, borderColor: row.color, color: "#fff", outlineColor: row.color }
                    : { background: "#ffffff", borderColor: `${row.color}33`, color: row.color, outlineColor: row.color }
                }
              >
                <span
                  className="text-[0.72rem] font-bold tabular-nums opacity-80"
                  style={{ color: isActive ? "rgba(255,255,255,0.85)" : `${row.color}` }}
                >
                  {row.number}
                </span>
                {row.element}
              </button>
            );
          })}
        </div>

        {/* ===== FULL-WIDTH LOGO TILE GRID ===== */}
        <div className="relative mt-9 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* caption row */}
              <div className="flex flex-col items-center text-center mb-7">
                <h3 className="font-semibold text-[1.4rem] md:text-[1.65rem] leading-tight text-brand-strong tracking-tight">
                  <span style={{ color: active.color }}>{active.element}</span>
                  <span className="text-ink-soft font-normal"> — {active.name}</span>
                </h3>
                <p className="mt-2 text-ink-soft text-[1.02rem] leading-[1.7] max-w-[58ch]">
                  {active.description}
                </p>
              </div>

              {/* tiles */}
              <motion.div
                className="flex flex-wrap justify-center gap-3.5 max-w-[920px] mx-auto"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } }
                }}
              >
                {active.tools.map((tool) => (
                  <motion.div
                    key={tool}
                    variants={{
                      hidden: { opacity: 0, y: 14, scale: 0.97 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    className="group flex w-[calc(50%-0.4375rem)] sm:w-[172px] flex-col items-center justify-center text-center gap-3 rounded-2xl border border-zinc-200/70 bg-white/80 px-3 py-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${active.color}66`;
                      e.currentTarget.style.boxShadow = `0 12px 28px ${active.color}1f`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <ToolLogo name={tool} color={active.color} />
                    <span className="text-[0.92rem] font-medium text-brand-strong leading-tight">
                      {tool}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="w-[min(760px,100%)] mx-auto mt-10 text-ink-soft text-center text-[1.05rem] leading-[1.7]">
          30 tools. 5 elements. 1 system.
        </p>
      </div>
    </section>
  );
}
