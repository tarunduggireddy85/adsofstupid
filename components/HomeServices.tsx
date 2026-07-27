"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Target, ShoppingBag, Compass, ArrowRight, Check, type LucideIcon } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SERVICES } from "@/lib/services";

/*
 * Homepage "what we do" section. ~94% of traffic lands on the homepage but it
 * had no path into the service pages (which convert far better). This section
 * routes visitors there — lifting engagement (a 2nd pageview) and internal
 * link equity (SEO) at the same time.
 */

const ICONS: Record<string, LucideIcon> = { Target, ShoppingBag, Compass };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const cardIn: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } }
};

export function HomeServices() {
  return (
    <section className="py-16 lg:py-24 scroll-mt-28" id="services">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto">
        <SectionHeader
          eyebrow="What we do"
          title="Three services. One growth system."
          description="Pick where you are — we run the store, the ads, and the strategy that ties them together for early-stage D2C brands."
        />

        <motion.div
          className="mt-10 grid gap-6 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon] ?? Target;
            const tint = (a: number) => `rgba(${s.accentRgb},${a})`;
            return (
              <motion.div key={s.slug} variants={cardIn} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border bg-white p-7 no-underline shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-[box-shadow,border-color,transform] duration-300 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)]"
                  style={{ borderColor: tint(0.18) }}
                >
                  <span className="absolute left-0 top-0 h-1.5 w-full" style={{ background: s.accent }} aria-hidden />
                  <span
                    className="flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    style={{ background: tint(0.1), color: s.accent, height: "3.25rem", width: "3.25rem" }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-[1.35rem] font-semibold tracking-tight text-brand-strong">{s.navLabel}</h3>
                  <p className="mt-2 text-[0.98rem] leading-[1.6] text-ink-soft">{s.tagline}</p>

                  <ul className="mt-5 flex flex-col gap-2.5 border-t border-zinc-100 pt-5">
                    {s.deliverables.slice(0, 3).map((d) => (
                      <li key={d.title} className="flex items-center gap-2.5 text-[0.92rem] font-medium text-zinc-600">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: tint(0.16), color: s.accent }}>
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                        {d.title}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold" style={{ color: s.accent }}>
                    Explore {s.navLabel.toLowerCase()}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-9 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-6 py-3 text-[0.95rem] font-semibold text-brand-strong no-underline transition-colors hover:border-zinc-900"
          >
            See all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
