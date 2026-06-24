"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Check, X, ArrowUpRight, ArrowDown } from "lucide-react";
import { getService, SERVICES } from "@/lib/services";
import DotGrid from "@/components/DotGrid";
import GradientText from "@/components/GradientText";
import CountUp from "@/components/CountUp";

const service = getService("performance-marketing")!;

const CORAL = "#F2683C";
const CORAL_RGB = "242,104,60";
const tint = (a: number) => `rgba(${CORAL_RGB},${a})`;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

function Reveal({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div className={className} style={style} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.div>
  );
}

function Kicker({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[0.76rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
      {n ? <span style={{ color: CORAL }}>{n}</span> : null}
      <span className="h-px w-8 bg-zinc-300" />
      <span>{children}</span>
    </div>
  );
}

const BARS = [26, 40, 34, 52, 61, 76, 95];

/* "Live campaign" panel for the hero. */
function MetricPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div
      ref={ref}
      className="w-full max-w-[420px] rounded-3xl border border-zinc-200 bg-white"
      style={{ boxShadow: `0 30px 70px -25px ${tint(0.45)}` }}
    >
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3.5">
        <span className="flex items-center gap-2 text-[0.78rem] font-semibold text-zinc-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live campaign
        </span>
        <span className="text-[0.72rem] font-medium text-zinc-400">Last 30 days</span>
      </div>

      <div className="grid grid-cols-2 divide-x divide-zinc-100 border-b border-zinc-100">
        <div className="px-5 py-4">
          <p className="text-[0.64rem] font-bold uppercase tracking-wider text-zinc-400">Ad spend</p>
          <p className="mt-1 text-[1.5rem] font-bold tracking-tight text-zinc-900 tabular-nums">
            ₹<CountUp to={3} duration={1.4} />L
          </p>
        </div>
        <div className="px-5 py-4">
          <p className="text-[0.64rem] font-bold uppercase tracking-wider text-zinc-400">Revenue</p>
          <p className="mt-1 text-[1.5rem] font-bold tracking-tight tabular-nums" style={{ color: CORAL }}>
            ₹<CountUp to={40} duration={1.6} />L+
          </p>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-baseline justify-between">
          <p className="text-[0.64rem] font-bold uppercase tracking-wider text-zinc-400">Return on ad spend</p>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] font-bold text-emerald-600">profitable</span>
        </div>
        <p className="mt-1 flex items-end font-bold tracking-tight tabular-nums" style={{ color: CORAL, fontSize: "2.8rem", lineHeight: 1 }}>
          <CountUp to={13} duration={1.5} />×
        </p>
        <div className="mt-4 flex h-16 items-end gap-1.5">
          {BARS.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md"
              style={{ background: i === BARS.length - 1 ? CORAL : tint(0.3) }}
              initial={{ height: "8%" }}
              animate={inView ? { height: `${h}%` } : { height: "8%" }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const MARQUEE = ["Meta ads", "Google ads", "Tracked to the rupee", "Revenue, not reach", "13× ROAS", "No vanity metrics"];
function Marquee() {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden py-3.5" style={{ background: CORAL }}>
      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={reduce ? undefined : { repeat: Infinity, ease: "linear", duration: 24 }}
      >
        {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
          <span key={i} className="flex items-center gap-8 text-[0.92rem] font-bold uppercase tracking-[0.14em] text-white">
            {m}
            <span className="text-white/60">✳</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const HERO_STATS = [
  { n: 13, suffix: "×", label: "ROAS delivered", hi: true },
  { n: 30, prefix: "₹", suffix: "L+", label: "Ad spend managed" },
  { n: 4, suffix: " yrs", label: "Doing this" },
  { n: 5, suffix: "+", label: "D2C brands grown" }
];

const BEFORE = ["Boosting posts on a hunch", "Guessing who the audience is", "Reach, likes, impressions", "No idea which rupee worked"];
const AFTER = ["Research before a paisa is spent", "Full-funnel, built to convert", "Revenue & profit, tracked", "Every rupee attributed"];

const COMPARE = [
  { aspect: "When they start", them: "Day one, guns blazing", us: "After the research is done" },
  { aspect: "What they report", them: "Reach & impressions", us: "Revenue & profit" },
  { aspect: "Who you talk to", them: "An account manager", us: "The person running your ads" },
  { aspect: "Attribution", them: "The platform's word for it", us: "Tracked to the rupee" },
  { aspect: "The contract", them: "6-month lock-in", us: "We earn the next month" }
];

export function PerformanceMarketing() {
  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const reduce = useReducedMotion();

  return (
    <main className="w-full bg-white text-zinc-900">
      {/* ============================ HERO (LIGHT + DotGrid) ============================ */}
      <section className="relative overflow-hidden">
        {/* React Bits interactive dot-grid background — static fallback for reduced motion */}
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_70%_30%,black,transparent_78%)]">
          {reduce ? (
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `radial-gradient(${tint(0.22)} 1.5px, transparent 1.5px)`,
                backgroundSize: "28px 28px"
              }}
            />
          ) : (
            <DotGrid
              dotSize={4}
              gap={28}
              baseColor="#ead9d0"
              activeColor={CORAL}
              proximity={120}
              shockRadius={220}
              shockStrength={4}
              returnDuration={1.4}
            />
          )}
        </div>
        <div className="absolute -top-28 right-[-8%] h-[420px] w-[420px] rounded-full blur-[120px]" style={{ background: tint(0.16) }} aria-hidden />

        <div className="relative z-10 mx-auto max-w-[1180px] px-4 pt-14 pb-14 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.76rem] font-semibold uppercase tracking-[0.16em]"
                  style={{ borderColor: tint(0.3), background: tint(0.08), color: CORAL }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: CORAL }} />
                  Performance marketing
                </span>
              </motion.div>

              <motion.h1
                className="mt-6 font-sans text-[clamp(2.7rem,6.8vw,4.9rem)] font-bold leading-[1.0] tracking-[-0.03em] text-zinc-950"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
              >
                <span className="block">Turn ad spend into</span>
                <GradientText
                  colors={["#E0531F", "#F2683C", "#FB8C5A", "#F2683C", "#E0531F"]}
                  animationSpeed={7}
                  className="!mx-0 !justify-start !rounded-none !font-bold !leading-[1.0] !cursor-default"
                >
                  revenue you can predict.
                </GradientText>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-[520px] text-[1.08rem] leading-[1.7] text-zinc-600"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
              >
                {service.heroSub}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
              >
                <Link
                  href="/contact"
                  className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 no-underline"
                  style={{ background: CORAL, boxShadow: `0 10px 30px -8px ${tint(0.55)}` }}
                >
                  Get a free funnel audit <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#case"
                  className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full border border-zinc-300 px-7 text-[0.95rem] font-semibold text-zinc-800 transition-colors hover:border-zinc-900 no-underline"
                >
                  See the proof
                </a>
              </motion.div>
            </div>

            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              <MetricPanel />
            </motion.div>
          </div>

          {/* hero stat band */}
          <motion.div
            className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            {HERO_STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="rounded-2xl border border-zinc-200 bg-white/70 px-5 py-6 backdrop-blur-sm"
              >
                <p
                  className="flex items-end font-sans text-[clamp(2.4rem,5vw,3.3rem)] font-bold leading-none tracking-[-0.03em] tabular-nums"
                  style={{ color: s.hi ? CORAL : "#09090b" }}
                >
                  {s.prefix}
                  <CountUp to={s.n} duration={1.5} />
                  {s.suffix}
                </p>
                <p className="mt-3 text-[0.86rem] font-medium text-zinc-500">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Marquee />

      {/* ============================ BEFORE / AFTER ============================ */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 sm:py-24">
        <Reveal className="max-w-[680px]">
          <Kicker n="01">The transformation</Kicker>
          <h2 className="mt-5 font-sans text-[clamp(1.9rem,4.8vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.02em]">
            From spending on guesswork to a system that pays you back.
          </h2>
        </Reveal>

        <motion.div
          className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* BEFORE — muted */}
          <motion.div variants={fadeUp} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7 sm:p-8 grayscale-[0.2]">
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-zinc-400">Before</p>
            <p className="mt-2 text-[1.3rem] font-semibold text-zinc-500">Boosting &amp; hoping</p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {BEFORE.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[0.98rem] text-zinc-400">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t border-zinc-200 pt-5">
              <p className="text-[0.7rem] font-bold uppercase tracking-wider text-zinc-400">Typical return</p>
              <p className="mt-1 font-sans text-[2.2rem] font-bold leading-none tracking-tight text-zinc-400 tabular-nums">~1×</p>
            </div>
          </motion.div>

          {/* arrow */}
          <motion.div variants={fadeUp} className="flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ background: CORAL }}>
              <ArrowRight className="hidden h-5 w-5 lg:block" />
              <ArrowDown className="h-5 w-5 lg:hidden" />
            </span>
          </motion.div>

          {/* AFTER — vibrant */}
          <motion.div
            variants={fadeUp}
            className="rounded-3xl border-2 p-7 sm:p-8"
            style={{ borderColor: CORAL, background: `linear-gradient(160deg, ${tint(0.08)}, #ffffff)` }}
          >
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em]" style={{ color: CORAL }}>After</p>
            <p className="mt-2 text-[1.3rem] font-semibold text-zinc-900">A system that compounds</p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {AFTER.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[0.98rem] font-medium text-zinc-800">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t pt-5" style={{ borderColor: tint(0.2) }}>
              <p className="text-[0.7rem] font-bold uppercase tracking-wider text-zinc-400">Delivered return</p>
              <p className="mt-1 flex items-end font-sans text-[2.2rem] font-bold leading-none tracking-tight tabular-nums" style={{ color: CORAL }}>
                <CountUp to={13} duration={1.6} />×
              </p>
            </div>
          </motion.div>
        </motion.div>

        <p id="case" className="mt-6 scroll-mt-24 text-center text-[0.92rem] font-medium text-zinc-400">
          Real client — financial services: ₹3L/mo spend → ₹40L+/mo revenue. Same formula, every brand.
        </p>
      </section>

      {/* ============================ SERVICES (rounded cards, flood hover) ============================ */}
      <section className="border-y border-zinc-200 bg-zinc-50/70">
        <div className="mx-auto max-w-[1180px] px-4 py-16 sm:py-24">
          <Reveal className="max-w-[680px]">
            <Kicker n="02">What we do</Kicker>
            <h2 className="mt-5 font-sans text-[clamp(1.9rem,4.8vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.02em]">
              {service.deliverablesHeading}
            </h2>
          </Reveal>

          <motion.div className="mt-12 flex flex-col gap-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}>
            {service.deliverables.map((d, i) => (
              <motion.div
                key={d.title}
                variants={fadeUp}
                className="group grid grid-cols-1 items-baseline gap-2 rounded-3xl border border-zinc-200 bg-white px-6 py-6 transition-colors duration-200 hover:bg-[#F2683C] sm:grid-cols-[3.5rem_1fr] sm:gap-6 lg:grid-cols-[3.5rem_1.1fr_1.4fr]"
              >
                <span className="font-sans text-[1.4rem] font-bold tabular-nums text-[#F2683C] transition-colors group-hover:text-white">
                  0{i + 1}
                </span>
                <h3 className="text-[1.35rem] font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-white sm:text-[1.55rem]">
                  {d.title}
                </h3>
                <p className="text-[1rem] leading-[1.65] text-zinc-500 transition-colors group-hover:text-white/90">{d.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================ COMPARISON ============================ */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 sm:py-24">
        <Reveal className="max-w-[680px]">
          <Kicker n="03">The difference</Kicker>
          <h2 className="mt-5 font-sans text-[clamp(1.9rem,4.8vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.02em]">
            Most brands boost. We engineer.
          </h2>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-3xl border border-zinc-200">
          <div className="grid grid-cols-[1fr_1fr] border-b border-zinc-200 sm:grid-cols-[1.2fr_1fr_1fr]">
            <div className="hidden p-5 sm:block" />
            <div className="border-l border-zinc-200 bg-zinc-50 p-5 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-zinc-400">Most agencies</div>
            <div className="border-l border-zinc-200 p-5 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-white" style={{ background: CORAL }}>
              Ads of Stupid
            </div>
          </div>
          {COMPARE.map((row) => (
            <div key={row.aspect} className="grid grid-cols-[1fr_1fr] border-b border-zinc-200 last:border-b-0 sm:grid-cols-[1.2fr_1fr_1fr]">
              <div className="col-span-2 px-5 pt-4 text-[0.74rem] font-bold uppercase tracking-[0.14em] text-zinc-400 sm:col-span-1 sm:py-5">{row.aspect}</div>
              <div className="flex items-start gap-2.5 px-5 pb-4 text-[0.96rem] text-zinc-500 sm:border-l sm:border-zinc-200 sm:py-5">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300" />
                {row.them}
              </div>
              <div className="flex items-start gap-2.5 border-l border-zinc-200 px-5 pb-5 text-[0.96rem] font-semibold text-zinc-900 sm:py-5" style={{ background: tint(0.04) }}>
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: CORAL }} />
                {row.us}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ============================ PROCESS (rounded cards) ============================ */}
      <section className="border-y border-zinc-200 bg-zinc-50/70">
        <div className="mx-auto max-w-[1180px] px-4 py-16 sm:py-24">
          <Reveal className="max-w-[680px]">
            <Kicker n="04">How we run it</Kicker>
            <h2 className="mt-5 font-sans text-[clamp(1.9rem,4.8vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.02em]">
              {service.processHeading}
            </h2>
            <p className="mt-4 text-[1.04rem] leading-[1.7] text-zinc-500">{service.processIntro}</p>
          </Reveal>

          <motion.div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
            {service.process.map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} className="rounded-3xl border border-zinc-200 bg-white p-7">
                <span className="font-sans text-[2rem] font-bold leading-none tabular-nums" style={{ color: tint(0.5) }}>0{i + 1}</span>
                <h3 className="mt-4 text-[1.2rem] font-bold tracking-tight text-zinc-900">{step.title}</h3>
                <p className="mt-2 text-[0.94rem] leading-[1.6] text-zinc-500">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================ FAQ (rounded cards) ============================ */}
      <section className="mx-auto grid max-w-[1180px] gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 self-start">
          <Kicker n="05">FAQ</Kicker>
          <h2 className="mt-5 font-sans text-[clamp(1.9rem,4.8vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.02em]">
            Questions, answered straight.
          </h2>
        </Reveal>
        <motion.div className="flex flex-col gap-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          {service.faqs.map((f) => (
            <motion.details key={f.q} variants={fadeUp} className="group rounded-3xl border border-zinc-200 bg-white px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.08rem] font-semibold text-zinc-900 marker:hidden">
                {f.q}
                <span className="text-[1.5rem] leading-none transition-transform duration-200 group-open:rotate-45" style={{ color: CORAL }}>+</span>
              </summary>
              <p className="pb-6 text-[0.98rem] leading-[1.7] text-zinc-500">{f.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </section>

      {/* ============================ OTHER SERVICES (rounded cards) ============================ */}
      <section className="mx-auto max-w-[1180px] px-4 pb-16">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-sans text-[1.6rem] font-bold tracking-tight sm:text-[2rem]">More of what we do</h2>
          <Link href="/services" className="inline-flex items-center gap-1.5 whitespace-nowrap text-[0.92rem] font-semibold text-zinc-900 no-underline">
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <motion.div className="grid gap-4 sm:grid-cols-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {others.map((o) => (
            <motion.div key={o.slug} variants={fadeUp}>
              <Link
                href={`/services/${o.slug}`}
                className="group flex h-full items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-7 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300"
              >
                <span>
                  <span className="block text-[1.35rem] font-bold tracking-tight text-zinc-900">{o.navLabel}</span>
                  <span className="mt-1 block text-[0.94rem] text-zinc-500">{o.tagline}</span>
                </span>
                <ArrowUpRight className="h-6 w-6 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-900" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ============================ CTA (LIGHT) ============================ */}
      <section className="px-4 pb-20">
        <Reveal
          className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[2.5rem] border px-6 py-16 text-center sm:px-12 sm:py-20"
          style={{ borderColor: tint(0.22), background: `linear-gradient(135deg, ${tint(0.1)}, ${tint(0.02)})` }}
        >
          <div className="absolute -top-24 right-[-8%] h-[320px] w-[320px] rounded-full blur-[100px]" style={{ background: tint(0.18) }} aria-hidden />
          <h2 className="relative font-sans text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.02em] text-zinc-950">
            {service.ctaHeading}
          </h2>
          <p className="relative mx-auto mt-4 max-w-[600px] text-[1.05rem] leading-[1.7] text-zinc-600">{service.ctaSub}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 no-underline"
              style={{ background: CORAL, boxShadow: `0 10px 30px -8px ${tint(0.55)}` }}
            >
              Get a free funnel audit <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/918530639877"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full border border-zinc-300 px-7 text-[0.95rem] font-semibold text-zinc-800 transition-colors hover:border-zinc-900 no-underline"
            >
              Chat on WhatsApp
            </a>
          </div>
          <p className="relative mt-6 text-[0.88rem] font-medium text-zinc-400">No pitch. No pressure. We reply within 24 hours.</p>
        </Reveal>
      </section>
    </main>
  );
}
