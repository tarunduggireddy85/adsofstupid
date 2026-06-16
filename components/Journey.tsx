"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { EyebrowBadge } from "./ui/EyebrowBadge";

/* ============================================================
   TYPEWRITER HEADLINE
   Types "The path most early-stage" on line 1, then the gradient
   "D2C founders" pill pops in on line 2 and " take." types after.
   ============================================================ */
const LINE1 = "The path most early-stage";
const TAIL = " take.";
const FULL_TITLE = "The path most early-stage D2C founders take.";

function JourneyTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [l1, setL1] = useState("");
  const [pill, setPill] = useState(false);
  const [tail, setTail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setL1(LINE1);
      setPill(true);
      setTail(TAIL);
      setDone(true);
      return;
    }
    const timers: number[] = [];
    let i = 0;
    let j = 0;
    const typeTail = () => {
      j += 1;
      setTail(TAIL.slice(0, j));
      if (j < TAIL.length) timers.push(window.setTimeout(typeTail, 75));
      else setDone(true);
    };
    const typeL1 = () => {
      i += 1;
      setL1(LINE1.slice(0, i));
      if (i < LINE1.length) {
        timers.push(window.setTimeout(typeL1, 55));
      } else {
        timers.push(
          window.setTimeout(() => {
            setPill(true);
            timers.push(window.setTimeout(typeTail, 320));
          }, 260)
        );
      }
    };
    timers.push(window.setTimeout(typeL1, 250));
    return () => timers.forEach((t) => clearTimeout(t));
  }, [inView]);

  return (
    <h2
      ref={ref}
      aria-label={FULL_TITLE}
      className="font-sans font-semibold text-[clamp(1.4rem,6vw,4.6rem)] leading-[1.12] tracking-[-0.03em] text-zinc-950"
    >
      <span aria-hidden className="block whitespace-nowrap">
        {l1}
        {!pill && <span className="aos-caret" />}
      </span>
      <span aria-hidden className="flex flex-nowrap items-center justify-center gap-x-2.5 whitespace-nowrap mt-1.5 sm:mt-2 min-h-[1.1em]">
        {pill && (
          <motion.span
            className="inline-block px-4 sm:px-5 py-0.5 sm:py-1 rounded-2xl bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] text-white shadow-[0_8px_25px_rgba(92,67,253,0.22)]"
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            D2C founders
          </motion.span>
        )}
        {pill && (
          <span>
            {tail}
            {!done && <span className="aos-caret" />}
          </span>
        )}
      </span>
    </h2>
  );
}

type Tone = "gray" | "amber" | "red";

const steps: {
  n: string;
  title: string;
  sub: string;
  icon: string;
  tone: Tone;
}[] = [
  { n: "01", title: "The idea", sub: "A product worth selling", icon: "/journey/idea.webp", tone: "gray" },
  { n: "02", title: "The product", sub: "Designed and ready", icon: "/journey/product.webp", tone: "gray" },
  { n: "03", title: "The store", sub: "Live on Shopify", icon: "/journey/store.webp", tone: "gray" },
  { n: "04", title: "The attempt", sub: "Some ads, some posts", icon: "/journey/attempt.webp", tone: "amber" },
  { n: "05", title: "Stuck", sub: "No sales. Now what?", icon: "/journey/stuck.webp", tone: "red" },
];

const toneStyles: Record<
  Tone,
  { card: string; accent: string; title: string; bigNum: string; ring: string }
> = {
  gray: {
    card: "bg-white border-zinc-200/80",
    accent: "text-zinc-400",
    title: "text-zinc-900",
    bigNum: "text-zinc-900/[0.04]",
    ring: "bg-zinc-100",
  },
  amber: {
    card: "bg-[#FFFBEB] border-amber-300/60",
    accent: "text-amber-600",
    title: "text-zinc-900",
    bigNum: "text-amber-500/[0.10]",
    ring: "bg-amber-100",
  },
  red: {
    card: "bg-[#FEF2F2] border-red-300/60",
    accent: "text-red-600",
    title: "text-zinc-900",
    bigNum: "text-red-500/[0.10]",
    ring: "bg-red-100",
  },
};

export function Journey() {
  return (
    <section className="relative scroll-mt-0" id="journey">
      {/* ---- intro headline (typewriter) ---- */}
      <div className="relative overflow-hidden min-h-[64svh] sm:min-h-[100svh] flex flex-col items-center justify-center px-5 py-16 sm:py-0 text-center">
        {/* mobile-only soft glow so the title isn't floating in stark white */}
        <div
          aria-hidden
          className="sm:hidden absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(92,67,253,0.10), rgba(92,67,253,0) 62%)",
          }}
        />

        <div className="relative flex flex-col items-center">
          {/* mobile-only eyebrow anchors the top */}
          <div className="sm:hidden">
            <EyebrowBadge>The problem journey</EyebrowBadge>
          </div>

          <JourneyTitle />

          {/* scroll cue — invites scrolling into the cards */}
          <div
            aria-hidden
            className="mt-12 sm:mt-16 flex flex-col items-center gap-1.5 text-[#5c43fd]"
          >
            <span className="text-[0.66rem] font-semibold tracking-[0.24em] uppercase opacity-70">
              Scroll
            </span>
            <svg className="aos-nudge w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ---- scroll-stacked cards ---- */}
      <div className="w-[min(1000px,calc(100vw-2rem))] mx-auto">
        <ScrollStack
          itemDistance={120}
          itemStackDistance={22}
          stackPosition="16%"
          baseScale={0.9}
          blurAmount={0.6}
        >
          {steps.map((step, i) => {
            const t = toneStyles[step.tone];
            return (
              <ScrollStackItem key={step.n} itemClassName={t.card}>
                {/* giant ghost number */}
                <span
                  className={`pointer-events-none absolute -top-6 right-2 sm:right-6 font-bold leading-none select-none text-[10rem] sm:text-[13rem] md:text-[16rem] ${t.bigNum}`}
                >
                  {step.n}
                </span>

                <div className="relative flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-5 md:gap-10 py-2 md:py-0 md:min-h-[58vh]">
                  {/* text */}
                  <div className="md:flex-1 text-center md:text-left">
                    <span className={`block text-[0.85rem] font-semibold tracking-[0.18em] uppercase ${t.accent}`}>
                      Step {step.n}
                    </span>
                    <h3 className={`mt-3 font-sans font-semibold tracking-tight leading-[1.05] text-[clamp(2.4rem,6vw,4.5rem)] ${t.title}`}>
                      {step.title}
                    </h3>
                    <p className="mt-4 text-zinc-500 text-[1.05rem] sm:text-[1.25rem] leading-[1.5]">
                      {step.sub}
                    </p>
                  </div>

                  {/* floating icon */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    <div className={`absolute w-[170px] h-[170px] sm:w-[230px] sm:h-[230px] rounded-full blur-2xl opacity-60 ${t.ring}`} />
                    <div className="aos-icon-float relative" style={{ animationDelay: `${i * 0.4}s` }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={step.icon}
                        alt={`${step.title} — ${step.sub}`}
                        width={260}
                        height={260}
                        draggable={false}
                        className="w-[150px] h-[150px] sm:w-[210px] sm:h-[210px] md:w-[240px] md:h-[240px] object-contain select-none rounded-[28px] drop-shadow-[0_18px_30px_rgba(20,30,70,0.18)]"
                      />
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>

      {/* ---- two-beat closing: the resolution panel ---- */}
      <div className="w-[min(900px,calc(100vw-2rem))] mx-auto pt-14 pb-24">
        <motion.div
          className="relative overflow-hidden rounded-[2.25rem] md:rounded-[2.75rem] px-6 sm:px-12 py-14 sm:py-20 text-center flex flex-col items-center"
          style={{
            background:
              "radial-gradient(120% 140% at 50% 0%, #7c5cff 0%, #5c43fd 48%, #4a32e5 100%)",
            boxShadow: "0 30px 70px -28px rgba(92,67,253,0.55)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* soft decorative glow */}
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

          {/* handshake */}
          <motion.div
            className="relative mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m11 17 2 2a1 1 0 1 0 3-3" />
              <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
              <path d="m21 3 1 11h-2" />
              <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
              <path d="M3 4h8" />
            </svg>
          </motion.div>

          <motion.p
            className="relative font-sans font-semibold text-[clamp(2.1rem,5.5vw,3.4rem)] leading-[1.08] tracking-tight text-white"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            You&apos;re not stuck.
          </motion.p>

          <motion.p
            className="relative mt-4 text-white/85 text-[1.1rem] sm:text-[1.35rem] leading-[1.55] max-w-[40ch]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.8 }}
          >
            You&apos;re just missing a partner who&apos;s done this before.
          </motion.p>

          <motion.a
            href="#formula"
            className="relative group mt-9 inline-flex items-center justify-center gap-2 min-h-[3.25rem] px-7 rounded-full text-[1rem] font-semibold bg-white text-[#5c43fd] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_38px_-8px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 transition-all duration-200"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.05 }}
          >
            See how we fix it
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
