"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const protocolSteps = [
  {
    number: "01",
    title: "The diagnosis",
    timing: "Day 1, free",
    color: "#7F77DD",
    heading: "You book a call. We listen.",
    body:
      "We dig into what you are building, where you are stuck, and what success looks like for you. If you already have a website or running ads, we audit them live on the call. By the end, you will know exactly what is working, what is not, and what we would do differently.",
    note: "No pitch. No pressure. Just a real conversation."
  },
  {
    number: "02",
    title: "The research lab",
    timing: "Week 1",
    color: "#378ADD",
    heading: "You give us the green light. We disappear and dig.",
    body:
      "This is where the science begins. Competitor teardowns, customer research, USP discovery, CAC/LTV math. We do not run a single ad until we know exactly who we are talking to, what they want, and what is worth saying.",
    note: "7 days. Every assumption tested. No guessing."
  },
  {
    number: "03",
    title: "The formula reveal",
    timing: "Week 2, Day 1",
    color: "#D85A30",
    heading: "We present the plan. You decide.",
    body:
      "Strategy doc, GTM roadmap, channel mix, budget split, expected timelines laid out on a call. Nothing happens until you say go. The moment you do, we start the same second.",
    note: "Transparent. Documented. Yours to keep."
  },
  {
    number: "04",
    title: "Setup and launch",
    timing: "Week 2 onwards",
    color: "#639922",
    heading: "We build, integrate, and switch the engine on.",
    body:
      "Store optimization, tracking setup, creatives, ad accounts, automations, retention flows all built in parallel. When the foundation is solid, the campaigns go live. Not before.",
    note: "Done right, not just done fast."
  },
  {
    number: "05",
    title: "The ongoing partnership",
    timing: "Every day, forever after",
    color: "#1D9E75",
    heading: "You are not a client. You are a partner.",
    body:
      "WhatsApp, email, calls, whatever works for you. You will always know what we are doing today, this week, and next month. Detailed monthly reports. Direct access. Real conversations, not status emails.",
    note: "Reachable. Accountable. Always."
  }
] as const;

const ROTATIONS = [-2, 1.6, -1.5, 2, -1.2];

function Pushpin({ color }: { color: string }) {
  return (
    <span aria-hidden className="pointer-events-none absolute left-1/2 -top-3.5 z-20 -translate-x-1/2">
      <span
        className="block h-5 w-5 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), ${color} 58%, ${color} 100%)`,
          boxShadow: `0 0 10px ${color}99, 0 7px 11px rgba(20,20,45,0.28), inset 0 -2px 3px rgba(0,0,0,0.22)`
        }}
      />
    </span>
  );
}

export function Process() {
  const reduce = useReducedMotion();
  const boardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  // Measure card boxes and draw dashed connectors between consecutive pins.
  useEffect(() => {
    const measure = () => {
      const board = boardRef.current;
      if (!board) return;
      const br = board.getBoundingClientRect();
      setDims({ w: br.width, h: br.height });

      const points = cardRefs.current.map((card) => {
        const r = card!.getBoundingClientRect();
        const cx = r.left - br.left + r.width / 2;
        return { topX: cx, topY: r.top - br.top, botY: r.bottom - br.top };
      });

      const next: string[] = [];
      for (let i = 0; i < points.length - 1; i += 1) {
        const a = points[i];
        const b = points[i + 1];
        const ax = a.topX;
        const ay = a.botY - 18;
        const bx = b.topX;
        const by = b.topY + 4;
        const midY = (ay + by) / 2;
        next.push(`M ${ax} ${ay} C ${ax} ${midY}, ${bx} ${midY}, ${bx} ${by}`);
      }
      setPaths(next);
    };

    measure();
    const t = setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  return (
    <section className="bg-[radial-gradient(circle_at_18%_22%,rgba(92,67,253,0.04),transparent_28%)] py-20 lg:py-[7.5rem] scroll-mt-28" id="process">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto">
        <SectionHeader
          description="Five steps from let's talk to you're scaling. No fluff, no surprises."
          eyebrow="The lab protocol"
          title="How we work - the lab protocol."
        />

        <div ref={boardRef} className="relative max-w-[920px] mx-auto mt-14">
          {/* dashed connectors (desktop only) */}
          <svg
            className="absolute inset-0 hidden lg:block pointer-events-none"
            width={dims.w}
            height={dims.h}
            style={{ zIndex: 0 }}
            aria-hidden
          >
            {paths.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="#c9c7d6"
                strokeWidth={2}
                strokeDasharray="2 7"
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div className="flex flex-col gap-8 lg:gap-0">
            {protocolSteps.map((step, index) => {
              const left = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex justify-center ${
                    left ? "lg:justify-start" : "lg:justify-end"
                  } ${index > 0 ? "lg:-mt-12" : ""}`}
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="relative w-full max-w-[400px] lg:w-[46%]"
                    style={{ zIndex: protocolSteps.length - index + 5 }}
                  >
                    <Pushpin color={step.color} />
                    <motion.article
                      className="relative w-full rounded-[1.4rem] bg-white p-2.5 shadow-[0_20px_46px_rgba(30,30,60,0.13)]"
                      style={{ rotate: `${ROTATIONS[index]}deg` }}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.82, y: 14 }}
                      whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={
                        reduce
                          ? { duration: 0.3 }
                          : { type: "spring", stiffness: 240, damping: 15, mass: 0.7 }
                      }
                    >
                      <div
                        className="rounded-[1.05rem] p-5 sm:p-6"
                        style={{ background: `linear-gradient(160deg, ${step.color}29, ${step.color}0a)` }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span
                            className="font-sans font-semibold text-[1.7rem] leading-none"
                            style={{ color: step.color }}
                          >
                            {step.number}
                          </span>
                          <span
                            className="rounded-full px-3 py-1 text-[0.72rem] font-semibold leading-none"
                            style={{ color: step.color, background: `${step.color}1f` }}
                          >
                            {step.timing}
                          </span>
                        </div>

                        <p
                          className="mt-3 text-[0.78rem] font-bold uppercase tracking-[0.14em]"
                          style={{ color: step.color }}
                        >
                          {step.title}
                        </p>
                        <h3 className="mt-1.5 text-[1.3rem] font-semibold leading-snug text-brand-strong">
                          {step.heading}
                        </h3>
                        <p className="mt-3 text-ink-soft text-[1rem] leading-[1.7]">
                          {step.body}
                        </p>
                        <p className="mt-3 text-[0.9rem] italic font-medium" style={{ color: step.color }}>
                          {step.note}
                        </p>
                      </div>
                    </motion.article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="w-[min(760px,100%)] mx-auto mt-12 text-ink-soft text-center text-[1.05rem] leading-[1.7]">
          No agencies-in-a-box. No 6-week onboarding. Just a proven protocol,
          repeated for every D2C brand we work with as their performance marketing
          agency.
        </p>

        <div className="text-center mt-7">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-1.5 min-h-[3rem] px-7 rounded-full text-[0.95rem] font-semibold bg-[#5c43fd] text-white no-underline shadow-[0_4px_12px_rgba(92,67,253,0.2)] hover:bg-[#4a32e5] transition-colors duration-200"
          >
            Book your free diagnosis <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
