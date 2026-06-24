"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Search,
  Megaphone,
  FlaskConical,
  Activity,
  BarChart3,
  Hand,
  Store,
  Zap,
  ShieldCheck,
  CreditCard,
  Boxes,
  Crosshair,
  Workflow,
  Repeat,
  Map as MapIcon,
  Target,
  ShoppingBag,
  Compass,
  Check,
  ArrowRight,
  type LucideIcon
} from "lucide-react";
import { EyebrowBadge } from "../ui/EyebrowBadge";
import { SERVICES, type Service } from "@/lib/services";

const ICONS: Record<string, LucideIcon> = {
  Search,
  Megaphone,
  FlaskConical,
  Activity,
  BarChart3,
  Hand,
  Store,
  Zap,
  ShieldCheck,
  CreditCard,
  Boxes,
  Crosshair,
  Workflow,
  Repeat,
  Map: MapIcon,
  Target,
  ShoppingBag,
  Compass
};

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Search;
  return <Cmp className={className} />;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 18 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE } }
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } }
};

function Reveal({
  children,
  className,
  variant = fadeUp,
  style
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={variant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// Established proof points (same figures used across the site).
const STATS = [
  { value: "13×", label: "ROAS delivered" },
  { value: "₹30L+", label: "Ad spend managed" },
  { value: "4 yrs", label: "In performance marketing" },
  { value: "5+", label: "D2C brands grown" }
];

export function ServiceDetail({ service }: { service: Service }) {
  const a = service.accent;
  const rgb = service.accentRgb;
  const tint = (alpha: number) => `rgba(${rgb},${alpha})`;
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <main className="w-full">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {/* dot grid */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(${tint(0.16)} 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
              WebkitMaskImage: "radial-gradient(circle at 50% 34%, black, transparent 72%)",
              maskImage: "radial-gradient(circle at 50% 34%, black, transparent 72%)"
            }}
          />
          {/* accent-tinted drifting orbs */}
          <div
            className="aos-drift-a absolute -top-24 -left-10 w-[340px] h-[340px] rounded-full blur-[90px]"
            style={{ background: tint(0.22) }}
          />
          <div
            className="aos-drift-b absolute top-6 right-[-50px] w-[380px] h-[380px] rounded-full blur-[100px]"
            style={{ background: tint(0.18) }}
          />
        </div>

        <div className="relative max-w-[840px] mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em]"
              style={{ borderColor: tint(0.28), background: tint(0.07), color: a }}
            >
              <Icon name={service.icon} className="h-3.5 w-3.5" />
              {service.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            className="mt-5 font-sans font-semibold text-[clamp(2.1rem,5.6vw,3.7rem)] leading-[1.08] tracking-tight text-zinc-950"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            {service.h1Lead}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(90deg, ${a}, ${tint(0.7)})` }}
            >
              {service.h1Highlight}
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 text-zinc-600 text-[1.06rem] leading-[1.75] max-w-[660px]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          >
            {service.heroSub}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 min-h-[3rem] px-6 rounded-full text-[0.95rem] font-semibold text-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 no-underline"
              style={{ background: a }}
            >
              Book a free strategy call <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#what-you-get"
              className="inline-flex items-center justify-center gap-1.5 min-h-[3rem] px-6 rounded-full text-[0.95rem] font-semibold border border-zinc-200 bg-white/80 backdrop-blur-sm text-zinc-700 hover:bg-white shadow-sm transition-all no-underline"
            >
              What you get <span aria-hidden>↓</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="max-w-[820px] mx-auto px-4 py-16 sm:py-20">
        <Reveal className="flex flex-col items-center text-center mb-8">
          <EyebrowBadge>Why it matters</EyebrowBadge>
          <h2 className="mt-4 font-sans font-semibold text-[clamp(1.6rem,4vw,2.5rem)] leading-tight tracking-tight text-zinc-950">
            {service.problemHeading}
          </h2>
        </Reveal>

        <Reveal className="space-y-5 text-zinc-600 text-[1.05rem] leading-[1.8]">
          {service.problem.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>

        <Reveal variant={scaleIn} className="my-9">
          <blockquote
            className="relative rounded-[1.6rem] border px-7 py-8 shadow-[0_18px_44px_rgba(0,0,0,0.05)]"
            style={{
              borderColor: tint(0.18),
              background: `linear-gradient(135deg, ${tint(0.06)}, #ffffff)`
            }}
          >
            <span
              className="absolute top-3 left-5 text-[4rem] leading-none font-serif select-none"
              style={{ color: tint(0.18) }}
            >
              &ldquo;
            </span>
            <p className="font-accent italic text-[clamp(1.3rem,3vw,1.85rem)] leading-[1.4] text-zinc-900 relative">
              {service.pullQuote}
            </p>
          </blockquote>
        </Reveal>

        {/* who it's for */}
        <Reveal className="rounded-[1.4rem] border border-zinc-200/80 bg-white p-6 sm:p-7">
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-zinc-400 mb-4">
            Who it&apos;s for
          </p>
          <ul className="flex flex-col gap-3">
            {service.forWho.map((w) => (
              <li key={w} className="flex items-start gap-3 text-zinc-700 text-[1rem] leading-[1.5] font-medium">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: tint(0.14), color: a }}
                >
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
                {w}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ===== WHAT'S INCLUDED ===== */}
      <section id="what-you-get" className="py-16 sm:py-20 px-4" style={{ background: tint(0.03) }}>
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-12">
            <EyebrowBadge>What&apos;s included</EyebrowBadge>
            <h2 className="mt-4 font-sans font-semibold text-[clamp(1.6rem,4vw,2.5rem)] leading-tight tracking-tight text-zinc-950">
              {service.deliverablesHeading}
            </h2>
            <p className="mt-4 text-zinc-500 text-[1.04rem] leading-[1.7] max-w-[640px]">
              {service.deliverablesIntro}
            </p>
          </Reveal>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {service.deliverables.map((d) => (
              <motion.div
                key={d.title}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex flex-col rounded-[1.5rem] border border-zinc-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-[box-shadow,border-color] duration-300"
                style={{ ["--svc-accent" as string]: a }}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105"
                  style={{ background: tint(0.1), color: a }}
                >
                  <Icon name={d.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[1.16rem] font-semibold text-zinc-950 tracking-tight">
                  {d.title}
                </h3>
                <p className="mt-2.5 text-zinc-500 text-[0.97rem] leading-[1.65]">{d.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="max-w-[1100px] mx-auto px-4 py-16 sm:py-20">
        <Reveal className="flex flex-col items-center text-center mb-12">
          <EyebrowBadge>The process</EyebrowBadge>
          <h2 className="mt-4 font-sans font-semibold text-[clamp(1.6rem,4vw,2.5rem)] leading-tight tracking-tight text-zinc-950">
            {service.processHeading}
          </h2>
          <p className="mt-4 text-zinc-500 text-[1.04rem] leading-[1.7] max-w-[600px]">
            {service.processIntro}
          </p>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {service.process.map((step, i) => (
            <motion.div
              key={step.title}
              variants={scaleIn}
              className="relative flex flex-col rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden"
            >
              <span className="absolute top-0 left-0 h-1 w-full" style={{ background: a }} />
              <span className="font-sans font-bold text-[1.6rem] leading-none" style={{ color: tint(0.45) }}>
                0{i + 1}
              </span>
              <span className="mt-3 font-semibold text-[1.08rem] text-zinc-950">{step.title}</span>
              <span className="mt-1.5 text-[0.92rem] text-zinc-500 leading-snug">{step.body}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== OUTCOMES + STATS ===== */}
      <section className="px-4 pb-4">
        <Reveal
          variant={scaleIn}
          className="relative max-w-[1100px] mx-auto overflow-hidden rounded-[2rem] border px-6 sm:px-10 py-12"
          style={{ borderColor: tint(0.2), background: `linear-gradient(135deg, ${tint(0.06)}, #ffffff)` }}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <EyebrowBadge>{service.outcomesHeading}</EyebrowBadge>
              <ul className="mt-5 flex flex-col gap-3.5">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-zinc-700 text-[1.02rem] leading-[1.5] font-medium">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: tint(0.16), color: a }}
                    >
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
                >
                  <p className="font-sans font-bold text-[1.7rem] leading-none" style={{ color: a }}>
                    {s.value}
                  </p>
                  <p className="mt-2 text-[0.86rem] font-semibold text-zinc-700 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== FAQ ===== */}
      <section className="max-w-[820px] mx-auto px-4 py-16 sm:py-20">
        <Reveal className="flex flex-col items-center text-center mb-10">
          <EyebrowBadge>Questions</EyebrowBadge>
          <h2 className="mt-4 font-sans font-semibold text-[clamp(1.6rem,4vw,2.5rem)] leading-tight tracking-tight text-zinc-950">
            Frequently asked questions
          </h2>
        </Reveal>

        <Reveal className="flex flex-col gap-3">
          {service.faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-zinc-200/80 bg-white px-5 sm:px-6 py-1 transition-colors open:border-[color:var(--svc-accent)]/40"
              style={{ ["--svc-accent" as string]: a }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.02rem] font-semibold text-zinc-900 marker:hidden">
                {f.q}
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[1.2rem] leading-none transition-transform duration-200 group-open:rotate-45"
                  style={{ background: tint(0.1), color: a }}
                >
                  +
                </span>
              </summary>
              <p className="pb-5 -mt-1 text-zinc-600 text-[0.98rem] leading-[1.7]">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </section>

      {/* ===== CROSS-LINK TO OTHER SERVICES ===== */}
      <section className="max-w-[1100px] mx-auto px-4 pb-4">
        <Reveal className="flex items-end justify-between gap-4 mb-6">
          <h2 className="font-sans font-semibold text-[1.4rem] sm:text-[1.7rem] tracking-tight text-zinc-950">
            Explore our other services
          </h2>
          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-[#5c43fd] hover:text-[#4a32e5] no-underline whitespace-nowrap"
          >
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/services/${o.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-zinc-200/80 bg-white p-6 no-underline shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 transition-all duration-200"
              style={{ ["--svc-accent" as string]: o.accent }}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `rgba(${o.accentRgb},0.1)`, color: o.accent }}
              >
                <Icon name={o.icon} className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="font-semibold text-zinc-950 text-[1.05rem] tracking-tight">{o.navLabel}</span>
                <span className="mt-1 text-zinc-500 text-[0.92rem] leading-snug">{o.tagline}</span>
                <span
                  className="mt-2 inline-flex items-center gap-1 text-[0.86rem] font-semibold"
                  style={{ color: o.accent }}
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section className="px-4 py-20">
        <Reveal
          variant={scaleIn}
          className="relative max-w-[1000px] mx-auto overflow-hidden rounded-[2.5rem] border px-6 sm:px-12 py-14 text-center shadow-[0_24px_60px_rgba(0,0,0,0.06)]"
          style={{ borderColor: tint(0.2), background: `linear-gradient(135deg, ${tint(0.08)}, ${tint(0.02)})` }}
        >
          <div
            className="aos-drift-a absolute top-[-30%] right-[-10%] w-[320px] h-[320px] rounded-full blur-[70px] pointer-events-none"
            style={{ background: tint(0.14) }}
            aria-hidden
          />
          <div
            className="aos-drift-b absolute bottom-[-40%] left-[-8%] w-[300px] h-[300px] rounded-full blur-[70px] pointer-events-none"
            style={{ background: tint(0.12) }}
            aria-hidden
          />
          <h2 className="relative font-sans font-semibold text-[clamp(1.7rem,4vw,2.5rem)] leading-tight tracking-tight text-zinc-950">
            {service.ctaHeading}
          </h2>
          <p className="relative mt-4 text-zinc-600 text-[1.05rem] leading-[1.75] max-w-[640px] mx-auto">
            {service.ctaSub}
          </p>
          <div className="relative mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 min-h-[3rem] px-7 rounded-full text-[0.95rem] font-semibold text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-200 no-underline"
              style={{ background: a }}
            >
              Book a free strategy call <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/918530639877"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 min-h-[3rem] px-7 rounded-full text-[0.95rem] font-semibold border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 shadow-sm transition-all no-underline"
            >
              Chat on WhatsApp
            </a>
          </div>
          <p className="relative mt-6 text-[0.9rem] text-zinc-400 font-medium">
            📍 No pitch. No pressure. We&apos;ll get back to you within 24 hours.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
