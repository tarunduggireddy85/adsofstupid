"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Search,
  Target,
  ShoppingBag,
  Compass,
  ArrowRight,
  Check,
  type LucideIcon
} from "lucide-react";
import { EyebrowBadge } from "../ui/EyebrowBadge";
import { SERVICES } from "@/lib/services";

const ICONS: Record<string, LucideIcon> = { Target, ShoppingBag, Compass, Search };

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
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

export function ServicesHub() {
  return (
    <main className="w-full">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden px-4 pt-16 pb-16 sm:pt-20 sm:pb-20">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(rgba(92,67,253,0.15) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              WebkitMaskImage: "radial-gradient(circle at 50% 36%, black, transparent 72%)",
              maskImage: "radial-gradient(circle at 50% 36%, black, transparent 72%)"
            }}
          />
          <div className="aos-drift-a absolute -top-24 -left-10 w-[340px] h-[340px] rounded-full bg-[#8c76ff]/22 blur-[90px]" />
          <div className="aos-drift-b absolute top-6 right-[-50px] w-[380px] h-[380px] rounded-full bg-[#d9b8ff]/28 blur-[100px]" />
        </div>

        <div className="relative max-w-[820px] mx-auto flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <EyebrowBadge animatePulse>What we do</EyebrowBadge>
          </motion.div>

          <motion.h1
            className="mt-5 font-sans font-semibold text-[clamp(2.2rem,6vw,3.9rem)] leading-[1.08] tracking-tight text-zinc-950"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            Three services.{" "}
            <span className="bg-gradient-to-r from-[#8c76ff] via-[#c061ff] to-[#5c43fd] bg-clip-text text-transparent">
              One growth system.
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 text-zinc-600 text-[1.08rem] leading-[1.75] max-w-[640px]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          >
            We help early-stage D2C brands in India grow with research first, spend second. Build the
            store, run the ads, and set the strategy that ties it all together — pick one, or let us run
            the whole system.
          </motion.p>
        </div>
      </section>

      {/* ===== SERVICE CARDS ===== */}
      <section className="max-w-[1100px] mx-auto px-4 pb-8">
        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((s) => {
            const Cmp = ICONS[s.icon] ?? Target;
            const tint = (alpha: number) => `rgba(${s.accentRgb},${alpha})`;
            return (
              <motion.div key={s.slug} variants={scaleIn} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border bg-white p-7 no-underline shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-[box-shadow,border-color] duration-300"
                  style={{ borderColor: tint(0.18) }}
                >
                  <span className="absolute top-0 left-0 h-1.5 w-full" style={{ background: s.accent }} aria-hidden />
                  <span
                    className="flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    style={{ background: tint(0.1), color: s.accent, height: "3.25rem", width: "3.25rem" }}
                  >
                    <Cmp className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-[1.3rem] font-semibold text-zinc-950 tracking-tight">{s.navLabel}</h2>
                  <p className="mt-2 text-zinc-500 text-[0.98rem] leading-[1.6]">{s.tagline}</p>

                  <ul className="mt-5 flex flex-col gap-2.5 border-t border-zinc-100 pt-5">
                    {s.deliverables.slice(0, 3).map((d) => (
                      <li key={d.title} className="flex items-center gap-2.5 text-zinc-600 text-[0.92rem] font-medium">
                        <span
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{ background: tint(0.16), color: s.accent }}
                        >
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                        {d.title}
                      </li>
                    ))}
                  </ul>

                  <span
                    className="mt-6 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold"
                    style={{ color: s.accent }}
                  >
                    Explore {s.navLabel.toLowerCase()}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ===== TIE TO THE FORMULA ===== */}
      <section className="px-4 py-16 sm:py-20">
        <Reveal className="max-w-[820px] mx-auto text-center">
          <EyebrowBadge>One system underneath</EyebrowBadge>
          <h2 className="mt-4 font-sans font-semibold text-[clamp(1.6rem,4vw,2.4rem)] leading-tight tracking-tight text-zinc-950">
            Every service runs on the same growth formula.
          </h2>
          <p className="mt-4 text-zinc-500 text-[1.04rem] leading-[1.7] max-w-[620px] mx-auto">
            Research, strategy, acquisition, conversion, scale. Whichever service you start with, it plugs
            into the same five-element system we run for every D2C brand.
          </p>
          <Link
            href="/#formula"
            className="mt-7 inline-flex items-center gap-1.5 text-[#5c43fd] font-semibold hover:text-[#4a32e5] transition-colors no-underline"
          >
            See the full growth formula <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section className="px-4 pb-24">
        <Reveal
          variant={scaleIn}
          className="relative max-w-[1000px] mx-auto overflow-hidden rounded-[2.5rem] border border-[#5c43fd]/15 bg-gradient-to-br from-[#f4f0ff] to-[#ede8ff] px-6 sm:px-12 py-14 text-center shadow-[0_24px_60px_rgba(92,67,253,0.08)]"
        >
          <div className="aos-drift-a absolute top-[-30%] right-[-10%] w-[320px] h-[320px] rounded-full bg-[#5c43fd]/10 blur-[70px] pointer-events-none" aria-hidden />
          <div className="aos-drift-b absolute bottom-[-40%] left-[-8%] w-[300px] h-[300px] rounded-full bg-[#c061ff]/10 blur-[70px] pointer-events-none" aria-hidden />
          <h2 className="relative font-sans font-semibold text-[clamp(1.7rem,4vw,2.5rem)] leading-tight tracking-tight text-zinc-950">
            Not sure which one you need?
          </h2>
          <p className="relative mt-4 text-zinc-600 text-[1.05rem] leading-[1.75] max-w-[620px] mx-auto">
            That&apos;s what the free call is for. Tell us where your brand is and we&apos;ll tell you
            honestly what would move the needle — even if it&apos;s not us.
          </p>
          <div className="relative mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 min-h-[3rem] px-7 rounded-full text-[0.95rem] font-semibold bg-[#5c43fd] text-white shadow-[0_4px_14px_rgba(92,67,253,0.25)] hover:bg-[#4a32e5] hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              Book a free strategy call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function Reveal({ children, className, variant = fadeUp }: { children: React.ReactNode; className?: string; variant?: Variants }) {
  return (
    <motion.div className={className} variants={variant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.div>
  );
}
