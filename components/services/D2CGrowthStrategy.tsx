"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Search,
  Crosshair,
  Workflow,
  Repeat,
  Map as MapIcon,
  BarChart3,
  Compass,
  ArrowRight,
  Check,
  Target,
  ShoppingBag,
  type LucideIcon
} from "lucide-react";
import { getService, SERVICES } from "@/lib/services";
import GradientText from "@/components/GradientText";
import CountUp from "@/components/CountUp";

const service = getService("d2c-growth-strategy")!;

const BLUE = "#3B8EE6";
const BLUE_RGB = "59,142,230";
const tint = (a: number) => `rgba(${BLUE_RGB},${a})`;

const DELIVERABLE_ICONS: Record<string, LucideIcon> = { Search, Crosshair, Workflow, Repeat, Map: MapIcon, BarChart3 };
const OTHER_ICONS: Record<string, LucideIcon> = { Target, ShoppingBag };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.95, y: 16 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } };

function Reveal({ children, className, variant = fadeUp, style }: { children: React.ReactNode; className?: string; variant?: Variants; style?: React.CSSProperties }) {
  return (
    <motion.div className={className} style={style} variants={variant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.div>
  );
}

function Kicker({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[0.76rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
      {n ? <span style={{ color: BLUE }}>{n}</span> : null}
      <span className="h-px w-8 bg-zinc-300" />
      <span>{children}</span>
    </div>
  );
}

const PHASES = [
  { range: "Days 1–30", title: "Audit & positioning", body: "Find what's working and sharpen who you're for." },
  { range: "Days 31–60", title: "Funnel & offers", body: "Fix the leaks from first click to checkout." },
  { range: "Days 61–90", title: "Retention & scale", body: "Turn buyers into repeat, compounding revenue." }
];

function RoadmapCard() {
  return (
    <div className="relative w-full max-w-[420px] rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_30px_70px_-25px_rgba(59,142,230,0.4)]">
      <div className="flex items-center justify-between">
        <span className="text-[0.78rem] font-semibold text-zinc-500">Your 90-day roadmap</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] font-bold text-emerald-600">● On track</span>
      </div>

      <div className="relative mt-5 pl-7">
        <motion.div
          className="absolute left-[9px] top-1 w-[2px] origin-top rounded-full"
          style={{ background: tint(0.35), height: "calc(100% - 1.5rem)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        <motion.div className="flex flex-col gap-5" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          {PHASES.map((p) => (
            <motion.div key={p.range} variants={scaleIn} className="relative">
              <span className="absolute -left-7 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-white" style={{ background: BLUE }}>
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
              <p className="text-[0.7rem] font-bold uppercase tracking-wide" style={{ color: BLUE }}>{p.range}</p>
              <p className="mt-0.5 text-[0.98rem] font-semibold text-zinc-900 leading-tight">{p.title}</p>
              <p className="mt-0.5 text-[0.84rem] text-zinc-500 leading-snug">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-5 rounded-2xl px-4 py-3 text-center text-[0.82rem] font-semibold" style={{ background: tint(0.07), color: BLUE }}>
        A prioritised plan — not a deck you&apos;ll never open.
      </div>
    </div>
  );
}

const QUESTIONS = ["Who exactly are we for?", "Why us, over the cheaper option?", "Where does growth come from next quarter?"];
const METRICS = [
  { n: 13, suffix: "×", label: "ROAS delivered", hi: true },
  { n: 30, prefix: "₹", suffix: "L+", label: "Ad spend managed" },
  { n: 4, suffix: " yrs", label: "In performance marketing" },
  { n: 5, suffix: "+", label: "D2C brands grown" }
];

export function D2CGrowthStrategy() {
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <main className="w-full bg-white text-zinc-900">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden px-4 pt-14 pb-20 sm:pt-20">
        <div className="absolute -top-28 right-[-10%] h-[380px] w-[380px] rounded-full blur-[120px]" style={{ background: tint(0.16) }} aria-hidden />
        <div className="absolute top-10 left-[-10%] h-[340px] w-[340px] rounded-full blur-[120px]" style={{ background: "rgba(120,180,255,0.16)" }} aria-hidden />

        <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.76rem] font-semibold uppercase tracking-[0.16em]" style={{ borderColor: tint(0.3), background: tint(0.08), color: BLUE }}>
                <Compass className="h-3.5 w-3.5" />
                D2C growth strategy
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 font-sans text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.03] tracking-[-0.025em] text-zinc-950"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
            >
              Know exactly where your{" "}
              <GradientText
                colors={["#2563B8", "#3B8EE6", "#7CBAF5", "#3B8EE6", "#2563B8"]}
                animationSpeed={7}
                className="!mx-0 inline-flex !justify-start !rounded-none !font-bold !leading-[1.03] !cursor-default"
              >
                growth comes from next.
              </GradientText>
            </motion.h1>

            <motion.p
              className="mx-auto lg:mx-0 mt-6 max-w-[540px] text-[1.07rem] leading-[1.75] text-zinc-600"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            >
              {service.heroSub}
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.26, ease: EASE }}>
              <Link href="/contact" className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 no-underline" style={{ background: BLUE, boxShadow: `0 10px 30px -8px ${tint(0.5)}` }}>
                Book a free strategy call <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#approach" className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full border border-zinc-300 px-7 text-[0.95rem] font-semibold text-zinc-800 transition-colors hover:border-zinc-900 no-underline">
                How we build it
              </a>
            </motion.div>
          </div>

          <motion.div className="flex justify-center lg:justify-end" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}>
            <RoadmapCard />
          </motion.div>
        </div>
      </section>

      {/* ============================ QUESTIONS ============================ */}
      <section className="border-y border-zinc-200 bg-zinc-50/70 px-4 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1000px] items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Kicker n="01">Why it matters</Kicker>
            <h2 className="mt-5 font-sans text-[clamp(1.7rem,4.4vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.02em]">{service.problemHeading}</h2>
            <div className="mt-4 space-y-4 text-[1.04rem] leading-[1.8] text-zinc-600">
              {service.problem.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mt-5 font-accent text-[1.2rem] italic leading-snug text-zinc-900">&ldquo;{service.pullQuote}&rdquo;</p>
          </Reveal>

          <Reveal variant={scaleIn}>
            <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-[0_18px_44px_rgba(0,0,0,0.04)]">
              <p className="text-[0.82rem] font-bold uppercase tracking-[0.14em] text-zinc-400">The questions strategy answers</p>
              <ul className="mt-5 flex flex-col gap-4">
                {QUESTIONS.map((q, i) => (
                  <li key={q} className="flex items-start gap-3">
                    <span className="font-sans text-[1.3rem] font-bold leading-none" style={{ color: tint(0.5) }}>0{i + 1}</span>
                    <span className="text-[1.06rem] font-semibold leading-snug text-zinc-900">{q}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-2 border-t border-zinc-100 pt-5 text-[0.95rem] font-semibold" style={{ color: BLUE }}>
                <Check className="h-4 w-4 stroke-[3]" />
                We answer these before a rupee goes out.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ WHAT'S INCLUDED (sticky aside + numbered cards) ============================ */}
      <section className="mx-auto max-w-[1100px] px-4 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="lg:sticky lg:top-28 self-start">
            <Kicker n="02">What&apos;s included</Kicker>
            <h2 className="mt-5 font-sans text-[clamp(1.7rem,4.4vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.02em]">{service.deliverablesHeading}</h2>
            <p className="mt-4 text-[1.04rem] leading-[1.7] text-zinc-500">{service.deliverablesIntro}</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold no-underline" style={{ color: BLUE }}>
              Book a free strategy call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <motion.div className="flex flex-col gap-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
            {service.deliverables.map((d, i) => {
              const Icon = DELIVERABLE_ICONS[d.icon] ?? Search;
              return (
                <motion.div key={d.title} variants={fadeUp} className="flex items-start gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)]" style={{ borderLeft: `3px solid ${BLUE}` }}>
                  <span className="font-sans text-[0.9rem] font-bold tabular-nums pt-0.5" style={{ color: tint(0.6) }}>0{i + 1}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ background: tint(0.1), color: BLUE }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[1.06rem] font-bold tracking-tight text-zinc-950">{d.title}</h3>
                    <p className="mt-1 text-[0.94rem] leading-[1.6] text-zinc-500">{d.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================ APPROACH (arrow-connected) ============================ */}
      <section id="approach" className="scroll-mt-24 border-y border-zinc-200 bg-zinc-50/70 px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mb-12 max-w-[640px]">
            <Kicker n="03">The approach</Kicker>
            <h2 className="mt-5 font-sans text-[clamp(1.7rem,4.4vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.02em]">{service.processHeading}</h2>
            <p className="mt-4 text-[1.04rem] leading-[1.7] text-zinc-500">{service.processIntro}</p>
          </Reveal>

          <motion.div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
            {service.process.map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} className="relative">
                <div className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl font-bold text-white" style={{ background: BLUE }}>{i + 1}</span>
                  <h3 className="mt-4 text-[1.1rem] font-bold text-zinc-950">{step.title}</h3>
                  <p className="mt-1.5 text-[0.93rem] leading-snug text-zinc-500">{step.body}</p>
                </div>
                {i < service.process.length - 1 && (
                  <ArrowRight className="absolute -right-[14px] top-1/2 hidden h-5 w-5 -translate-y-1/2 lg:block" style={{ color: tint(0.6) }} aria-hidden />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================ IMPACT (CountUp) ============================ */}
      <section className="px-4 pt-16 sm:pt-24 pb-4">
        <Reveal variant={scaleIn} className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] border px-6 py-12 sm:px-10" style={{ borderColor: tint(0.2), background: `linear-gradient(135deg, ${tint(0.07)}, #ffffff)` }}>
          <div className="mb-8 max-w-[640px]">
            <Kicker n="04">The proof</Kicker>
            <h2 className="mt-5 font-sans text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-[1.06] tracking-[-0.02em]">Strategy you can measure.</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label} className="rounded-3xl border border-zinc-200 bg-white p-6">
                <p className="flex items-end font-sans text-[clamp(2.2rem,5vw,3rem)] font-bold leading-none tracking-[-0.03em] tabular-nums" style={{ color: m.hi ? BLUE : "#09090b" }}>
                  {m.prefix}
                  <CountUp to={m.n} duration={1.6} />
                  {m.suffix}
                </p>
                <p className="mt-3 text-[0.85rem] font-medium text-zinc-500">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============================ STRATEGY MAKES SPEND WORK HARDER ============================ */}
      <section className="px-4 pt-16 sm:pt-24 pb-4">
        <Reveal variant={scaleIn} className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] border px-6 py-10 sm:px-10" style={{ borderColor: tint(0.2), background: `linear-gradient(135deg, ${tint(0.08)}, #ffffff)` }}>
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em]" style={{ color: BLUE }}>Already running ads?</p>
              <h2 className="mt-2 font-sans text-[clamp(1.5rem,3.6vw,2.2rem)] font-bold leading-[1.08] tracking-[-0.02em] text-zinc-950">Strategy makes the spend you&apos;re already doing work harder.</h2>
              <p className="mt-3 max-w-[520px] text-[1rem] leading-[1.7] text-zinc-600">If the positioning, funnel and retention underneath your ads aren&apos;t right, you&apos;re scaling a leaky bucket. We fix the system so every rupee pulls in the same direction.</p>
              <Link href="/services/performance-marketing" className="mt-5 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold no-underline" style={{ color: BLUE }}>
                See how we run the ads on top <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-200/70 text-zinc-500 text-[0.9rem]">✕</span>
                <span className="text-[0.92rem] text-zinc-500">Spend → leaky funnel → wasted budget</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border px-4 py-3" style={{ borderColor: tint(0.3), background: tint(0.05) }}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white" style={{ background: BLUE }}>
                  <Check className="h-4 w-4 stroke-[3]" />
                </span>
                <span className="text-[0.92rem] font-medium text-zinc-700">Spend → aligned funnel → revenue</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================ OUTCOMES ============================ */}
      <section className="mx-auto max-w-[940px] px-4 py-16 sm:py-24">
        <Reveal className="mb-10 flex flex-col items-center text-center">
          <Kicker>{service.outcomesHeading}</Kicker>
          <h2 className="mt-5 font-sans text-[clamp(1.7rem,4.4vw,2.5rem)] font-bold leading-[1.06] tracking-[-0.02em]">Clarity you can act on.</h2>
        </Reveal>
        <motion.div className="grid gap-4 sm:grid-cols-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {service.outcomes.map((o) => (
            <motion.div key={o} variants={fadeUp} className="flex items-start gap-3 rounded-3xl border border-zinc-200 bg-white p-5 text-[1rem] font-medium text-zinc-700 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: tint(0.16), color: BLUE }}>
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </span>
              {o}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ============================ FAQ ============================ */}
      <section className="mx-auto grid max-w-[1180px] gap-10 px-4 pb-16 sm:pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 self-start">
          <Kicker n="05">FAQ</Kicker>
          <h2 className="mt-5 font-sans text-[clamp(1.7rem,4.4vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.02em]">Frequently asked questions</h2>
        </Reveal>
        <motion.div className="flex flex-col gap-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          {service.faqs.map((f) => (
            <motion.details key={f.q} variants={fadeUp} className="group rounded-3xl border border-zinc-200 bg-white px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.05rem] font-semibold text-zinc-900 marker:hidden">
                {f.q}
                <span className="text-[1.5rem] leading-none transition-transform duration-200 group-open:rotate-45" style={{ color: BLUE }}>+</span>
              </summary>
              <p className="pb-6 text-[0.98rem] leading-[1.7] text-zinc-500">{f.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </section>

      {/* ============================ OTHER SERVICES ============================ */}
      <section className="mx-auto max-w-[1180px] px-4 pb-16">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-sans text-[1.6rem] font-bold tracking-tight sm:text-[2rem]">More of what we do</h2>
          <Link href="/services" className="inline-flex items-center gap-1.5 whitespace-nowrap text-[0.92rem] font-semibold text-zinc-900 no-underline">
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <motion.div className="grid gap-4 sm:grid-cols-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {others.map((o) => {
            const Icon = OTHER_ICONS[o.icon] ?? Target;
            return (
              <motion.div key={o.slug} variants={fadeUp}>
                <Link href={`/services/${o.slug}`} className="group flex h-full items-start gap-4 rounded-3xl border border-zinc-200 bg-white p-7 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={{ background: `rgba(${o.accentRgb},0.1)`, color: o.accent }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[1.2rem] font-bold tracking-tight text-zinc-950">{o.navLabel}</span>
                    <span className="mt-1 text-[0.92rem] leading-snug text-zinc-500">{o.tagline}</span>
                    <span className="mt-2 inline-flex items-center gap-1 text-[0.86rem] font-semibold" style={{ color: o.accent }}>
                      Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="px-4 pb-20">
        <Reveal variant={scaleIn} className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[2.5rem] border px-6 py-16 text-center sm:px-12 sm:py-20" style={{ borderColor: tint(0.22), background: `linear-gradient(135deg, ${tint(0.1)}, ${tint(0.02)})` }}>
          <div className="absolute -top-24 right-[-8%] h-[320px] w-[320px] rounded-full blur-[100px]" style={{ background: tint(0.16) }} aria-hidden />
          <h2 className="relative font-sans text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.02em] text-zinc-950">{service.ctaHeading}</h2>
          <p className="relative mx-auto mt-4 max-w-[600px] text-[1.05rem] leading-[1.7] text-zinc-600">{service.ctaSub}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 no-underline" style={{ background: BLUE, boxShadow: `0 10px 30px -8px ${tint(0.5)}` }}>
              Book a free strategy call <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://wa.me/918530639877" target="_blank" rel="noreferrer" className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full border border-zinc-300 px-7 text-[0.95rem] font-semibold text-zinc-800 transition-colors hover:border-zinc-900 no-underline">
              Chat on WhatsApp
            </a>
          </div>
          <p className="relative mt-6 text-[0.88rem] font-medium text-zinc-400">No pitch. No pressure. We reply within 24 hours.</p>
        </Reveal>
      </section>
    </main>
  );
}
