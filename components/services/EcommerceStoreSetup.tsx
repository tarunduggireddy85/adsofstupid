"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import {
  Store,
  Zap,
  ShieldCheck,
  CreditCard,
  Activity,
  Boxes,
  ShoppingCart,
  Star,
  Check,
  ArrowRight,
  Truck,
  Smartphone,
  Target,
  Compass,
  Rocket,
  type LucideIcon
} from "lucide-react";
import { getService, SERVICES } from "@/lib/services";
import GradientText from "@/components/GradientText";
import BlurText from "@/components/BlurText";
import CountUp from "@/components/CountUp";

const service = getService("ecommerce-store-setup")!;

/* Fresh, brighter green (was the darker olive #639922). */
const GREEN = "#5BA82F";
const GREEN_RGB = "91,168,47";
const tint = (a: number) => `rgba(${GREEN_RGB},${a})`;

const DELIVERABLE_ICONS: Record<string, LucideIcon> = { Store, Zap, ShieldCheck, CreditCard, Activity, Boxes };
const OTHER_ICONS: Record<string, LucideIcon> = { Target, Compass };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } };

function Reveal({ children, className, variant = fadeUp, style }: { children: React.ReactNode; className?: string; variant?: Variants; style?: React.CSSProperties }) {
  return (
    <motion.div className={className} style={style} variants={variant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[0.76rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
      <span className="h-px w-8" style={{ background: GREEN }} />
      <span>{children}</span>
    </div>
  );
}

/* Subtle 3D tilt wrapper (TiltedCard from React Bits is image-only, so this
   hand-rolled version lets us tilt the custom storefront mockup). */
function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 7);
    rx.set(-py * 7);
    mx.set(px);
    my.set(py);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div className={className} style={{ perspective: 1100 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>{children}</motion.div>
    </motion.div>
  );
}

/* Animated storefront browser mockup. */
function StorefrontMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      <Tilt>
        <motion.div
          className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_40px_90px_rgba(91,168,47,0.16)]"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50/80 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 text-[0.72rem] font-medium text-zinc-400 border border-zinc-100">
              yourbrand.store
            </span>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
            <div className="relative flex aspect-square items-center justify-center rounded-2xl" style={{ background: `linear-gradient(135deg, ${tint(0.16)}, ${tint(0.05)})` }}>
              <Store className="h-14 w-14" style={{ color: GREEN }} />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.66rem] font-bold text-zinc-600 shadow-sm">Bestseller</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-[0.72rem] font-semibold text-zinc-400">
                  4.9 (<CountUp to={2318} separator="," duration={2} />)
                </span>
              </div>
              <h3 className="mt-2 text-[1.1rem] font-bold text-zinc-900 leading-tight">Your hero product</h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-[1.4rem] font-bold" style={{ color: GREEN }}>
                  ₹<CountUp to={1299} separator="," duration={1.6} />
                </span>
                <span className="text-[0.85rem] text-zinc-400 line-through">₹1,999</span>
              </div>

              <motion.button
                type="button"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[0.9rem] font-semibold text-white"
                style={{ background: GREEN }}
                animate={{ boxShadow: [`0 6px 18px ${tint(0.3)}`, `0 10px 26px ${tint(0.5)}`, `0 6px 18px ${tint(0.3)}`] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              >
                <ShoppingCart className="h-4 w-4" /> Add to cart
              </motion.button>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: ShieldCheck, label: "Secure" },
                  { icon: Truck, label: "Free ship" },
                  { icon: CreditCard, label: "COD" }
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.label} className="flex flex-col items-center gap-1 rounded-xl border border-zinc-100 py-2">
                      <Icon className="h-3.5 w-3.5" style={{ color: GREEN }} />
                      <span className="text-[0.62rem] font-semibold text-zinc-500">{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </Tilt>

      <motion.div
        className="absolute -right-2 -top-4 hidden items-center gap-2 rounded-2xl border border-zinc-100 bg-white px-3.5 py-2.5 shadow-[0_14px_34px_rgba(0,0,0,0.1)] sm:flex"
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
        transition={{ opacity: { delay: 0.9 }, scale: { delay: 0.9 }, y: { repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: 1 } }}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: GREEN }}>
          <Check className="h-4 w-4 stroke-[3]" />
        </span>
        <span className="text-left">
          <span className="block text-[0.74rem] font-bold leading-none text-zinc-900">Order placed</span>
          <span className="block text-[0.64rem] text-zinc-400 mt-0.5">just now · Mumbai</span>
        </span>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-2 hidden items-center gap-2 rounded-2xl border border-zinc-100 bg-white px-3.5 py-2.5 shadow-[0_14px_34px_rgba(0,0,0,0.1)] sm:flex"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.1 }, scale: { delay: 1.1 }, y: { repeat: Infinity, duration: 3.6, ease: "easeInOut", delay: 1.2 } }}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: tint(0.14), color: GREEN }}>
          <Smartphone className="h-4 w-4" />
        </span>
        <span className="text-left">
          <span className="block text-[0.74rem] font-bold leading-none text-zinc-900">Mobile-first</span>
          <span className="block text-[0.64rem] text-zinc-400 mt-0.5">loads in under 2s</span>
        </span>
      </motion.div>
    </div>
  );
}

const SYMPTOMS = ["Traffic comes, but barely anyone buys", "Slow, clunky pages on mobile", "Carts abandoned right at checkout", "No idea where visitors drop off"];

export function EcommerceStoreSetup() {
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <main className="w-full bg-white text-zinc-900">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden px-4 pt-14 pb-16 sm:pt-20">
        {/* clean, minimal background — soft green glow only */}
        <div className="absolute -top-28 left-1/4 h-[360px] w-[360px] rounded-full blur-[130px]" style={{ background: tint(0.16) }} aria-hidden />
        <div className="absolute top-10 right-[-8%] h-[320px] w-[320px] rounded-full blur-[130px]" style={{ background: "rgba(170,205,90,0.18)" }} aria-hidden />

        <div className="relative mx-auto flex max-w-[820px] flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.76rem] font-semibold uppercase tracking-[0.16em]" style={{ borderColor: tint(0.3), background: tint(0.08), color: GREEN }}>
              <Store className="h-3.5 w-3.5" />
              E-commerce store setup
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 font-sans text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.04] tracking-[-0.025em] text-zinc-950"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
          >
            Launch a store that{" "}
            <GradientText
              colors={["#3E7A12", "#5BA82F", "#86C443", "#5BA82F", "#3E7A12"]}
              animationSpeed={7}
              className="!mx-0 inline-flex !rounded-none !font-bold !leading-[1.04] !cursor-default"
            >
              turns visitors into buyers.
            </GradientText>
          </motion.h1>

          <BlurText
            text={service.heroSub}
            animateBy="words"
            delay={22}
            className="mt-6 max-w-[620px] justify-center text-[1.07rem] leading-[1.8] text-zinc-600"
          />

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            <Link href="/contact" className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 no-underline" style={{ background: GREEN, boxShadow: `0 10px 30px -8px ${tint(0.5)}` }}>
              Get a free store audit <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#build" className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full border border-zinc-300 px-7 text-[0.95rem] font-semibold text-zinc-800 transition-colors hover:border-zinc-900 no-underline">
              How we build it
            </a>
          </motion.div>
        </div>

        <div className="relative mt-14">
          <StorefrontMockup />
        </div>
      </section>

      {/* ============================ SOUND FAMILIAR ============================ */}
      <section className="mx-auto max-w-[940px] px-4 py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Kicker>Why it matters</Kicker>
            <h2 className="mt-5 font-sans text-[clamp(1.7rem,4.4vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.02em]">{service.problemHeading}</h2>
            <div className="mt-4 space-y-4 text-[1.04rem] leading-[1.8] text-zinc-600">
              {service.problem.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mt-5 font-accent text-[1.2rem] italic leading-snug text-zinc-900">&ldquo;{service.pullQuote}&rdquo;</p>
          </Reveal>

          <Reveal variant={{ hidden: { opacity: 0, scale: 0.95, y: 18 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}>
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_18px_44px_rgba(0,0,0,0.04)] sm:p-7">
              <p className="text-[0.82rem] font-bold uppercase tracking-[0.14em] text-zinc-400">Sound familiar?</p>
              <ul className="mt-4 flex flex-col gap-3">
                {SYMPTOMS.map((s) => (
                  <li key={s} className="flex items-start gap-3 rounded-2xl bg-zinc-50 px-4 py-3 text-[0.96rem] font-medium text-zinc-600">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-zinc-300" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-center gap-2 text-[0.95rem] font-semibold" style={{ color: GREEN }}>
                <Check className="h-4 w-4 stroke-[3]" />
                Every one of those has a fix. We build them in from the start.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ WHAT'S INCLUDED (bento, rounded) ============================ */}
      <section id="build" className="scroll-mt-24 border-y border-zinc-200 bg-zinc-50/70 px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mb-12 max-w-[640px]">
            <Kicker>What&apos;s included</Kicker>
            <h2 className="mt-5 font-sans text-[clamp(1.7rem,4.4vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.02em]">{service.deliverablesHeading}</h2>
            <p className="mt-4 text-[1.04rem] leading-[1.7] text-zinc-500">{service.deliverablesIntro}</p>
          </Reveal>

          <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[1fr]" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
            {service.deliverables.map((d, i) => {
              const Icon = DELIVERABLE_ICONS[d.icon] ?? Store;
              const isFeature = i === 0;
              return (
                <motion.div
                  key={d.title}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`flex flex-col rounded-3xl border p-7 ${isFeature ? "sm:col-span-2 lg:row-span-2 justify-between" : "border-zinc-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)]"}`}
                  style={isFeature ? { borderColor: tint(0.25), background: `linear-gradient(135deg, ${tint(0.1)}, #ffffff)` } : undefined}
                >
                  <span className={`flex items-center justify-center rounded-2xl ${isFeature ? "h-14 w-14" : "h-12 w-12"}`} style={{ background: tint(isFeature ? 0.16 : 0.1), color: GREEN }}>
                    <Icon className={isFeature ? "h-7 w-7" : "h-6 w-6"} />
                  </span>
                  <div className={isFeature ? "mt-auto pt-6" : "mt-5"}>
                    <h3 className={`font-bold tracking-tight text-zinc-950 ${isFeature ? "text-[1.5rem]" : "text-[1.16rem]"}`}>{d.title}</h3>
                    <p className={`mt-2 leading-[1.65] text-zinc-500 ${isFeature ? "text-[1.02rem] max-w-[420px]" : "text-[0.97rem]"}`}>{d.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================ BUILD PROCESS (rounded cards) ============================ */}
      <section className="mx-auto max-w-[1100px] px-4 py-16 sm:py-24">
        <Reveal className="mb-12 max-w-[640px]">
          <Kicker>The build</Kicker>
          <h2 className="mt-5 font-sans text-[clamp(1.7rem,4.4vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.02em]">{service.processHeading}</h2>
          <p className="mt-4 text-[1.04rem] leading-[1.7] text-zinc-500">{service.processIntro}</p>
        </Reveal>

        <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {service.process.map((step, i) => {
            const isLast = i === service.process.length - 1;
            return (
              <motion.div key={step.title} variants={fadeUp} className="flex flex-col rounded-3xl border border-zinc-200 bg-white p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl font-bold text-white" style={{ background: GREEN }}>
                  {isLast ? <Rocket className="h-5 w-5" /> : i + 1}
                </span>
                <h3 className="mt-4 text-[1.12rem] font-bold text-zinc-950">{step.title}</h3>
                <p className="mt-1.5 text-[0.94rem] leading-snug text-zinc-500">{step.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ============================ READY FOR ADS ============================ */}
      <section className="px-4 pb-4">
        <Reveal
          variant={{ hidden: { opacity: 0, scale: 0.96, y: 18 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
          className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[2rem] border px-6 py-10 sm:px-10"
          style={{ borderColor: tint(0.2), background: `linear-gradient(135deg, ${tint(0.08)}, #ffffff)` }}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em]" style={{ color: GREEN }}>Built launch-ready</p>
              <h2 className="mt-2 font-sans text-[clamp(1.5rem,3.6vw,2.2rem)] font-bold leading-[1.08] tracking-[-0.02em] text-zinc-950">Your store goes live ready to take ads.</h2>
              <p className="mt-3 max-w-[520px] text-[1rem] leading-[1.7] text-zinc-600">Tracking, payments and shipping are wired and tested before launch — so the day you go live, your first ad rupee is measurable and working.</p>
              <Link href="/services/performance-marketing" className="mt-5 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold no-underline" style={{ color: GREEN }}>
                See how we run the ads on top <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {[
                { icon: Activity, label: "Tracking" },
                { icon: CreditCard, label: "Payments + COD" },
                { icon: Truck, label: "Shipping" }
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="flex items-center gap-2.5 rounded-2xl border border-zinc-200 bg-white px-4 py-3">
                    <Icon className="h-4 w-4" style={{ color: GREEN }} />
                    <span className="text-[0.9rem] font-semibold text-zinc-700">{c.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================ OUTCOMES (rounded cards) ============================ */}
      <section className="mx-auto max-w-[940px] px-4 py-16 sm:py-24">
        <Reveal className="mb-10 flex flex-col items-center text-center">
          <Kicker>{service.outcomesHeading}</Kicker>
          <h2 className="mt-5 font-sans text-[clamp(1.7rem,4.4vw,2.5rem)] font-bold leading-[1.06] tracking-[-0.02em]">A store you won&apos;t have to rebuild.</h2>
        </Reveal>
        <motion.div className="grid gap-4 sm:grid-cols-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {service.outcomes.map((o) => (
            <motion.div key={o} variants={fadeUp} className="flex items-start gap-3 rounded-3xl border border-zinc-200 bg-white p-5 text-[1rem] font-medium text-zinc-700 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: tint(0.16), color: GREEN }}>
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </span>
              {o}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ============================ FAQ (rounded cards) ============================ */}
      <section className="mx-auto grid max-w-[1180px] gap-10 px-4 pb-16 sm:pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 self-start">
          <Kicker>FAQ</Kicker>
          <h2 className="mt-5 font-sans text-[clamp(1.7rem,4.4vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.02em]">Frequently asked questions</h2>
        </Reveal>
        <motion.div className="flex flex-col gap-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          {service.faqs.map((f) => (
            <motion.details key={f.q} variants={fadeUp} className="group rounded-3xl border border-zinc-200 bg-white px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.05rem] font-semibold text-zinc-900 marker:hidden">
                {f.q}
                <span className="text-[1.5rem] leading-none transition-transform duration-200 group-open:rotate-45" style={{ color: GREEN }}>+</span>
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
          {others.map((o) => {
            const Icon = OTHER_ICONS[o.icon] ?? Compass;
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

      {/* ============================ CTA (LIGHT) ============================ */}
      <section className="px-4 pb-20">
        <Reveal
          variant={{ hidden: { opacity: 0, scale: 0.96, y: 18 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
          className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[2.5rem] border px-6 py-16 text-center sm:px-12 sm:py-20"
          style={{ borderColor: tint(0.22), background: `linear-gradient(135deg, ${tint(0.1)}, ${tint(0.02)})` }}
        >
          <div className="absolute -top-24 right-[-8%] h-[320px] w-[320px] rounded-full blur-[100px]" style={{ background: tint(0.16) }} aria-hidden />
          <h2 className="relative font-sans text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.02em] text-zinc-950">{service.ctaHeading}</h2>
          <p className="relative mx-auto mt-4 max-w-[600px] text-[1.05rem] leading-[1.7] text-zinc-600">{service.ctaSub}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 no-underline" style={{ background: GREEN, boxShadow: `0 10px 30px -8px ${tint(0.5)}` }}>
              Get a free store audit <ArrowRight className="h-4 w-4" />
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
