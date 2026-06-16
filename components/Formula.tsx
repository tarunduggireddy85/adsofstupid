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
   step is shown inside the ring.
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
  const R = 46;
  const C = 2 * Math.PI * R;
  const seg = C / 5;
  const gap = size === "lg" ? 6 : 4;
  const p = Math.max(0, Math.min(1, progress));
  const active = formulaElements[activeIndex];

  return (
    <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r={R} fill="none" stroke="#ecebf6" strokeWidth={size === "lg" ? 12 : 13} />
        {ELEMENT_COLORS.map((c, i) => {
          const segP = Math.max(0, Math.min(1, (p - i / 5) / (1 / 5)));
          const visible = Math.max(0, (seg - gap) * segP);
          return (
            <circle
              key={`${uid}-${i}`}
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke={c}
              strokeWidth={size === "lg" ? 12 : 13}
              strokeLinecap="round"
              strokeDasharray={`${visible} ${C}`}
              transform={`rotate(${i * 72 + 2} 60 60)`}
              style={{ transition: "stroke-dasharray 0.18s linear" }}
            />
          );
        })}
      </svg>

      {/* center label (steps inside the pie) */}
      {size === "lg" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[0.66rem] font-bold tracking-[0.22em] uppercase text-zinc-400">
            Step {active.number} / 05
          </span>
          <span
            className="mt-1 font-sans font-bold tracking-tight leading-none text-[1.7rem]"
            style={{ color: active.color }}
          >
            {active.tag}
          </span>
          <span className="mt-2 text-[0.72rem] font-semibold text-zinc-400">
            {filledCount} of 5 complete
          </span>
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
  const [titleP, setTitleP] = useState(0);

  useEffect(() => {
    const cardsEl = cardsRef.current;
    const sectionEl = sectionRef.current;
    if (!cardsEl || !sectionEl) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      // pie fill — based on the cards block passing the viewport centre
      const cr = cardsEl.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, (vh * 0.5 - cr.top) / cr.height)));
      // title shrink — based on how far the section top has passed the viewport top
      const sr = sectionEl.getBoundingClientRect();
      setTitleP(Math.max(0, Math.min(1, -sr.top / 320)));
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

  // interpolations for the shrinking sticky title
  const titleFont = `clamp(1.35rem, ${(5 - 3.3 * titleP).toFixed(2)}vw, ${(3.5 - 2.1 * titleP).toFixed(2)}rem)`;
  const supOpacity = Math.max(0, 1 - titleP * 1.8);
  const supMax = `${Math.max(0, 1 - titleP * 1.4) * 110}px`;
  const barStuck = titleP > 0.06;

  return (
    <section ref={sectionRef} className="relative bg-transparent pt-16 sm:pt-24 pb-20 scroll-mt-28 w-full overflow-x-clip" id="formula">
      {/* ===== STICKY SHRINKING TITLE ===== */}
      <div
        className={`sticky top-0 z-30 transition-[background-color,box-shadow] duration-300 ${
          barStuck
            ? "bg-surface-main/85 backdrop-blur-md shadow-[0_6px_20px_rgba(30,45,90,0.05)]"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-[900px] mx-auto px-5 py-3 sm:py-4 flex flex-col items-center text-center">
          <div style={{ opacity: supOpacity, maxHeight: supMax, overflow: "hidden" }} className="flex justify-center">
            <EyebrowBadge animatePulse>The growth formula lab</EyebrowBadge>
          </div>
          <h2
            className="font-sans font-semibold leading-[1.08] text-zinc-950 tracking-tight transition-[font-size] duration-150"
            style={{ fontSize: titleFont }}
          >
            The growth formula we run for every{" "}
            <span className="bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] bg-clip-text text-transparent">D2C brand.</span>
          </h2>
          <p
            style={{ opacity: supOpacity, maxHeight: supMax, overflow: "hidden" }}
            className="text-zinc-500 max-w-[580px] mx-auto text-[1.05rem] leading-[1.7] mt-3"
          >
            Five elements. One system. One partner. We decode the science behind the sale so your store stops guessing and starts scaling.
          </p>
        </div>
      </div>

      {/* mobile pie progress (sits just under the title bar) */}
      <div className="lg:hidden sticky top-[58px] z-20 mx-auto mt-2 w-[min(440px,calc(100vw-2rem))] rounded-full border border-zinc-200/80 bg-white/85 backdrop-blur-md shadow-[0_8px_24px_rgba(30,45,90,0.08)] px-3 py-2 flex items-center gap-3">
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
      <div className="w-full max-w-[1200px] mx-auto mt-8 lg:mt-12 px-4 md:px-6 lg:px-8 lg:grid lg:grid-cols-[360px_1fr] lg:gap-16">
        {/* LEFT: big sticky pie */}
        <div className="hidden lg:block">
          <div className="sticky top-[128px]">
            <div className="w-[330px] mx-auto">
              <PieChart progress={progress} activeIndex={activeIndex} filledCount={filledCount} />
            </div>
          </div>
        </div>

        {/* RIGHT: element cards (scroll under the title) */}
        <div ref={cardsRef} className="flex flex-col gap-6 sm:gap-8">
          {formulaElements.map((element, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.article
                key={element.number}
                className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white p-7 md:p-10 shadow-[0_20px_50px_rgba(92,67,253,0.04)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* color accent bar */}
                <span className="absolute left-0 top-0 h-full w-1.5" style={{ background: element.color }} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-center w-full">
                  {/* text */}
                  <div className={`flex flex-col lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-sans font-black text-[1.7rem] leading-none" style={{ color: `${element.color}40` }}>
                        {element.number}
                      </span>
                      <span
                        className="px-3.5 py-1.5 rounded-full text-[0.78rem] tracking-wide font-bold uppercase leading-none"
                        style={{ color: element.color, background: `${element.color}14` }}
                      >
                        {element.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[1.6rem] md:text-[2rem] font-sans font-semibold leading-[1.18] text-zinc-950 tracking-tight max-w-[20ch]">
                      {element.title}
                    </h3>
                    <p className="mt-3.5 text-zinc-600 text-[1.02rem] leading-[1.7] max-w-[46ch]">{element.body}</p>

                    <div className="mt-6 pt-5 border-t border-zinc-100">
                      <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-zinc-400">What&apos;s included</span>
                      <ul className="mt-3.5 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        {element.services.map((service) => (
                          <li className="flex items-start gap-2.5 text-zinc-700 text-[0.95rem] leading-[1.45]" key={service}>
                            <span
                              className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                              style={{ background: `${element.color}1a`, color: element.color }}
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
                    <div className="relative flex items-center justify-center py-2">
                      <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full blur-3xl opacity-45" style={{ background: element.color }} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={element.icon}
                        alt={`${element.tag} — ${element.title}`}
                        width={280}
                        height={280}
                        draggable={false}
                        className="relative w-40 h-40 sm:w-56 sm:h-56 object-contain rounded-[2rem] select-none drop-shadow-[0_20px_36px_rgba(20,30,70,0.18)]"
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
