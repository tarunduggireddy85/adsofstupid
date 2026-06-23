"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { EyebrowBadge } from "./ui/EyebrowBadge";

/* ============================================================
   DATA
   ============================================================ */
const ELEMENT_COLORS = ["#7F77DD", "#378ADD", "#D85A30", "#639922", "#1D9E75"];

const formulaElements = [
  {
    number: "01",
    tag: "Research",
    color: "#7F77DD",
    icon: "/formula/research.webp",
    title: "Understand the market before spending a rupee.",
    body: "Most agencies launch ads on day one. We start with research — because spending without strategy is just expensive guessing.",
    services: [
      "Competitor teardown (their site, ads, funnel)",
      "Brand positioning and USP discovery",
      "Customer research and survey insights",
      "CAC and LTV math before we spend a rupee",
    ],
  },
  {
    number: "02",
    tag: "Strategy",
    color: "#378ADD",
    icon: "/formula/strategy.webp",
    title: "Build a roadmap that actually makes sense.",
    body: "A roadmap to ₹X revenue — not a list of random campaigns. We tell you what to do, and what to stop doing.",
    services: [
      "Full growth strategy and GTM plan",
      "Pricing, offers and bundle strategy",
      "Channel mix planning",
      "Tag manager and analytics setup",
      "Brand identity refresh (if needed)",
    ],
  },
  {
    number: "03",
    tag: "Acquisition",
    color: "#D85A30",
    icon: "/formula/acquisition.webp",
    title: "Bring qualified buyers to your store.",
    body: "Informed, profitable, tracked. Not boosted Instagram posts and hope.",
    services: [
      "Meta Ads (Facebook and Instagram)",
      "Google Ads (Search, Shopping, PMax)",
      "Marketplace listings (Amazon, Myntra, Flipkart)",
      "Influencer marketing",
      "UGC video creation",
      "Product photography (budget-dependent)",
    ],
  },
  {
    number: "04",
    tag: "Conversion",
    color: "#639922",
    icon: "/formula/conversion.webp",
    title: "Turn visitors into customers — then repeat buyers.",
    body: "Most stores leak money at every step. We find the leaks and plug them.",
    services: [
      "Landing page and funnel optimization (CRO)",
      "Email marketing (welcome, abandoned cart, post-purchase)",
      "WhatsApp marketing (huge for Indian D2C)",
      "SEO and content marketing",
      "Retention and repeat purchase systems",
    ],
  },
  {
    number: "05",
    tag: "Scale",
    color: "#1D9E75",
    icon: "/formula/scale.webp",
    title: "Stay on top of it. Every single month.",
    body: "You won't have to chase us for reports. We bring the numbers, the insights, and the next steps to the table.",
    services: [
      "Monthly performance reports",
      "Continuous campaign optimization",
      "Scaling plan as you grow",
      "Direct WhatsApp and call access",
      "Guaranteed results",
    ],
  },
] as const;

/* ============================================================
   PIE CHART — builds one colored slice per element; the active
   step is shown inside the ring. Bigger, glowing active segment.
   ============================================================ */
function PieChart({
  progress,
  activeIndex,
  filledCount,
  size = "lg",
}: {
  progress: number;
  activeIndex: number;
  filledCount: number;
  size?: "lg" | "sm";
}) {
  const uid = useId().replace(/[:]/g, "");
  const R = 52;
  const C = 2 * Math.PI * R;
  const seg = C / 5;
  const gap = size === "lg" ? 6 : 4;
  const sw = size === "lg" ? 15 : 13;
  const p = Math.max(0, Math.min(1, progress));
  const active = formulaElements[activeIndex];

  return (
    <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
      {/* soft colored glow behind the ring, tinted by the active element */}
      <div
        className="absolute inset-[14%] rounded-full blur-3xl opacity-25 transition-colors duration-500"
        style={{ background: active.color }}
        aria-hidden
      />

      <svg viewBox="0 0 130 130" className="relative w-full h-full -rotate-90" aria-hidden>
        {/* inner disc so the centre reads clean over the glow */}
        <circle cx="65" cy="65" r={R - sw / 2 - 1} fill="#ffffff" />
        {/* track */}
        <circle cx="65" cy="65" r={R} fill="none" stroke="#ecebf6" strokeWidth={sw} />
        {ELEMENT_COLORS.map((c, i) => {
          const segP = Math.max(0, Math.min(1, (p - i / 5) / (1 / 5)));
          const visible = Math.max(0, (seg - gap) * segP);
          const isActive = i === activeIndex && segP > 0 && segP < 1;
          return (
            <circle
              key={`${uid}-${i}`}
              cx="65"
              cy="65"
              r={R}
              fill="none"
              stroke={c}
              strokeWidth={isActive ? sw + 2 : sw}
              strokeLinecap="round"
              strokeDasharray={`${visible} ${C}`}
              transform={`rotate(${i * 72 + 2} 65 65)`}
              style={{
                transition: "stroke-dasharray 0.18s linear, stroke-width 0.3s ease",
                filter: isActive ? `drop-shadow(0 0 6px ${c}99)` : "none",
              }}
            />
          );
        })}
      </svg>

      {/* center label (steps inside the pie) */}
      {size === "lg" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <span className="text-[0.66rem] font-bold tracking-[0.28em] uppercase text-zinc-400">
            Step {active.number} <span className="text-zinc-300">/ 05</span>
          </span>
          <span
            className="mt-1.5 font-sans font-bold tracking-tight leading-none text-[2rem] transition-colors duration-300"
            style={{ color: active.color }}
          >
            {active.tag}
          </span>
          {/* progress dots replace the old "x of 5" line */}
          <div className="mt-4 flex items-center gap-2">
            {ELEMENT_COLORS.map((c, i) => (
              <span
                key={i}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? "1.4rem" : "0.5rem",
                  background: i < filledCount || i === activeIndex ? c : "#dcdbec",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   FORMULA
   ============================================================ */
export function Formula() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const cardsEl = cardsRef.current;
    if (!cardsEl) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      // pie fill — based on the cards block passing the viewport centre
      const cr = cardsEl.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, (vh * 0.5 - cr.top) / cr.height)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const activeIndex = Math.max(0, Math.min(4, Math.floor(progress * 5 - 1e-6)));
  const filledCount = Math.min(5, Math.round(progress * 5));

  return (
    <section ref={sectionRef} className="relative bg-transparent pt-16 sm:pt-24 pb-20 scroll-mt-28 w-full overflow-x-clip" id="formula">
      {/* ===== SECTION TITLE ===== */}
      <div className="w-full max-w-[900px] mx-auto px-5 flex flex-col items-center text-center">
        <div className="flex justify-center">
          <EyebrowBadge animatePulse>The growth formula lab</EyebrowBadge>
        </div>
        <h2 className="mt-4 font-sans font-semibold leading-[1.1] text-zinc-950 tracking-tight text-[clamp(1.9rem,5vw,3.25rem)]">
          The growth formula we run for every{" "}
          <span className="bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] bg-clip-text text-transparent">D2C brand.</span>
        </h2>
        <p className="text-zinc-500 max-w-[580px] mx-auto text-[1.05rem] leading-[1.7] mt-4">
          Five elements. One system. One partner. We decode the science behind the sale so your store stops guessing and starts scaling.
        </p>
      </div>

      {/* mobile pie progress (sticky compact indicator) */}
      <div className="lg:hidden sticky top-[12px] z-20 mx-auto mt-6 w-[min(440px,calc(100vw-2rem))] rounded-full border border-zinc-200/80 bg-white/85 backdrop-blur-md shadow-[0_8px_24px_rgba(30,45,90,0.08)] px-3 py-2 flex items-center gap-3">
        <div className="relative w-9 h-9 shrink-0">
          <PieChart progress={progress} activeIndex={activeIndex} filledCount={filledCount} size="sm" />
        </div>
        <div className="flex-1 flex gap-1.5">
          {ELEMENT_COLORS.map((c, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-zinc-200 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300" style={{ width: i < filledCount ? "100%" : "0%", background: c }} />
            </div>
          ))}
        </div>
        <span className="text-[0.72rem] font-bold tracking-wide shrink-0" style={{ color: formulaElements[activeIndex].color }}>
          {formulaElements[activeIndex].tag}
        </span>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="w-full max-w-[1240px] mx-auto mt-8 lg:mt-14 px-4 md:px-6 lg:px-8 lg:grid lg:grid-cols-[420px_1fr] lg:gap-14 xl:gap-20">
        {/* LEFT: big sticky pie */}
        <div className="hidden lg:block">
          <div className="sticky top-[150px]">
            <div className="w-[400px] mx-auto">
              <PieChart progress={progress} activeIndex={activeIndex} filledCount={filledCount} />
            </div>
          </div>
        </div>

        {/* RIGHT: element cards (scroll under the title) */}
        <div ref={cardsRef} className="flex flex-col gap-7 sm:gap-9">
          {formulaElements.map((element, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.article
                key={element.number}
                className="group relative overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-white p-7 md:p-9 lg:p-10 shadow-[0_20px_50px_rgba(92,67,253,0.05)] transition-shadow duration-300 hover:shadow-[0_28px_64px_rgba(92,67,253,0.09)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* color accent bar */}
                <span className="absolute left-0 top-0 h-full w-1.5" style={{ background: element.color }} />
                {/* faint number watermark, tinted by element */}
                <span
                  className="pointer-events-none absolute -top-4 right-2 font-sans font-black text-[7rem] leading-none select-none"
                  style={{ color: `${element.color}0d` }}
                  aria-hidden
                >
                  {element.number}
                </span>

                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center w-full">
                  {/* text */}
                  <div className={`flex flex-col lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-sans font-bold text-[0.95rem] leading-none"
                        style={{ color: element.color, background: `${element.color}14` }}
                      >
                        {element.number}
                      </span>
                      <span
                        className="px-3.5 py-1.5 rounded-full text-[0.78rem] tracking-[0.08em] font-bold uppercase leading-none"
                        style={{ color: element.color, background: `${element.color}14` }}
                      >
                        {element.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[1.55rem] md:text-[1.95rem] font-sans font-semibold leading-[1.22] text-zinc-900 tracking-tight max-w-[22ch]">
                      {element.title}
                    </h3>
                    <p className="mt-4 text-zinc-600 text-[1.05rem] leading-[1.75] max-w-[48ch]">{element.body}</p>

                    <div className="mt-6 pt-6 border-t border-zinc-100">
                      <span
                        className="text-[0.72rem] font-bold tracking-[0.18em] uppercase"
                        style={{ color: element.color }}
                      >
                        What&apos;s included
                      </span>
                      <ul className="mt-4 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-3.5">
                        {element.services.map((service) => (
                          <li className="flex items-start gap-2.5 text-zinc-700 text-[0.98rem] leading-[1.55]" key={service}>
                            <span
                              className="mt-[3px] flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full"
                              style={{ background: `${element.color}1f`, color: element.color }}
                            >
                              <Check className="h-3 w-3 stroke-[3]" />
                            </span>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* icon visual */}
                  <div className={`flex items-center justify-center lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div
                      className="relative flex items-center justify-center w-full rounded-[1.75rem] p-6 sm:p-8"
                      style={{ background: `linear-gradient(160deg, ${element.color}12, ${element.color}05)` }}
                    >
                      <div className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full blur-3xl opacity-40" style={{ background: element.color }} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={element.icon}
                        alt={`${element.tag} — ${element.title}`}
                        width={280}
                        height={280}
                        draggable={false}
                        className="relative w-36 h-36 sm:w-52 sm:h-52 object-contain rounded-[2rem] select-none drop-shadow-[0_20px_36px_rgba(20,30,70,0.18)] transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* closing */}
      <div className="w-full max-w-[800px] mx-auto px-5 mt-16 flex flex-col items-center text-center">
        <motion.p
          className="font-sans font-semibold text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.15] tracking-tight text-zinc-950"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Five elements. One system.{" "}
          <span className="bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] bg-clip-text text-transparent">One growth partner.</span>
        </motion.p>
        <motion.a
          href="#contact"
          className="mt-7 inline-flex items-center justify-center gap-1.5 min-h-[3rem] px-6 rounded-full text-[0.95rem] font-semibold bg-[#5c43fd] text-white shadow-[0_4px_12px_rgba(92,67,253,0.2)] hover:bg-[#4a32e5] transition-colors duration-200"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Book a free strategy call <span aria-hidden>→</span>
        </motion.a>
      </div>
    </section>
  );
}
