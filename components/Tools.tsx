"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const toolRows = [
  {
    description: "Tools we use to understand the market before spending a rupee.",
    key: "research",
    label: "01 / Research",
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
    description: "Tools we use to plan, track, and align.",
    key: "strategy",
    label: "02 / Strategy",
    name: "The blueprint",
    tools: [
      "Google Tag Manager",
      "Meta Pixel",
      "Google Analytics 4",
      "Notion"
    ]
  },
  {
    description: "Tools we use to bring qualified buyers.",
    key: "acquisition",
    label: "03 / Acquisition",
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
    description: "Tools we use to turn traffic into revenue.",
    key: "conversion",
    label: "04 / Conversion",
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
    description: "Tools we use to monitor, report, and grow.",
    key: "scale",
    label: "05 / Scale",
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

interface ToolsProps {
  openTool: (typeof toolRows)[number]["key"];
  setOpenTool: (key: (typeof toolRows)[number]["key"]) => void;
}

export function Tools({
  openTool,
  setOpenTool
}: ToolsProps) {
  return (
    <section className="bg-[rgba(92,67,253,0.03)] py-[7.5rem] scroll-mt-28" id="tools">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto">
        <SectionHeader
          description="Real tools. Used daily. No vanity logos for show."
          eyebrow="The tool stack"
          title="The toolkit behind the formula."
        />

        <div className="w-full max-w-[1100px] mx-auto mt-12 grid gap-3.5">
          {toolRows.map((row) => {
            const isOpen = openTool === row.key;

            return (
              <motion.article
                className="overflow-hidden border border-brand-mid/10 bg-white/72 shadow-[0_18px_44px_rgba(92,67,253,0.05)] rounded-[1.6rem] backdrop-blur-md"
                key={row.key}
                layout
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <button
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 border-0 bg-transparent text-ink-strong cursor-pointer text-left focus:outline-none"
                  onClick={() => setOpenTool(row.key)}
                  type="button"
                >
                  <span className="block text-[0.92rem] tracking-wider text-brand-mid uppercase font-semibold">
                    {row.label}
                    <strong className="block mt-1 text-[1.25rem] font-semibold text-brand-strong normal-case tracking-normal">
                      {row.name}
                    </strong>
                  </span>
                  <span className="flex-none w-8 text-center text-brand-mid text-[1.5rem] font-light">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-6 pb-6"
                      exit={{ height: 0, opacity: 0 }}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                      <p className="text-ink-soft text-[1.05rem] leading-[1.7]">{row.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {row.tools.map((tool) => (
                          <motion.span
                            animate={{ opacity: 1, scale: 1 }}
                            className="px-3 py-1.5 rounded-lg border border-brand-mid/10 bg-white/80 text-[0.88rem] font-medium text-brand-mid"
                            initial={{ opacity: 0, scale: 0.94 }}
                            key={tool}
                            transition={{ duration: 0.18 }}
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        <p className="w-[min(760px,100%)] mx-auto mt-8 text-ink-soft text-center text-[1.05rem] leading-[1.7]">
          30 tools. 5 elements. 1 system.
        </p>
      </div>
    </section>
  );
}
