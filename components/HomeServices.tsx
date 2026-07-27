"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SERVICES } from "@/lib/services";

/*
 * Homepage "what we do" cards. ~94% of traffic lands on the homepage but it had
 * no path into the (better-converting) service pages — these cards are that
 * bridge. Design: dark indigo gradient card with a bottom-aligned 3D render
 * fused via mix-blend-screen. Colours use only existing brand tokens
 * (--color-brand-mid / --color-brand-strong).
 */

// Owner-provided 3D renders (public/service-cards/*.webp).
const CARD_IMAGE: Record<string, string> = {
  "performance-marketing": "/service-cards/arrow.webp",
  "ecommerce-store-setup": "/service-cards/cubes.webp",
  "d2c-growth-strategy": "/service-cards/rings.webp"
};

// Short pill tag per service (12px, dark text on white).
const CARD_PILL: Record<string, string> = {
  "performance-marketing": "Meta & Google",
  "ecommerce-store-setup": "Shopify",
  "d2c-growth-strategy": "90-day roadmap"
};

const CARD_BG = "linear-gradient(160deg, var(--color-brand-mid), color-mix(in srgb, var(--color-brand-mid) 55%, var(--color-brand-strong)))";
const CARD_BG_HOVER = "linear-gradient(160deg, color-mix(in srgb, var(--color-brand-mid) 82%, var(--color-brand-strong)), color-mix(in srgb, var(--color-brand-mid) 38%, var(--color-brand-strong)))";

export function HomeServices() {
  const reduce = useReducedMotion();

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
  };
  const cardIn: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 scroll-mt-28 px-5 sm:px-8" id="services">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader
          eyebrow="What we do"
          title="Three services. One growth system."
          description="Pick where you are — we run the store, the ads, and the strategy that ties them together for early-stage D2C brands."
        />

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 group/svc"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SERVICES.map((s) => {
            const img = CARD_IMAGE[s.slug];
            const pill = CARD_PILL[s.slug] ?? s.navLabel;
            return (
              <motion.div key={s.slug} variants={cardIn}>
                <Link
                  href={`/services/${s.slug}`}
                  aria-label={`${s.navLabel} — ${s.tagline}`}
                  className="group/card relative flex aspect-[1/1.15] flex-col overflow-hidden rounded-[24px] p-6 sm:p-7 no-underline
                             transition-[transform,box-shadow,opacity] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                             hover:-translate-y-1.5 hover:shadow-[0_18px_44px_-12px_rgba(92,67,253,0.55)]
                             group-hover/svc:opacity-[0.85] hover:!opacity-100
                             motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  style={{ background: CARD_BG }}
                >
                  {/* gradient darkens on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:opacity-100 motion-reduce:transition-none"
                    style={{ background: CARD_BG_HOVER }}
                  />

                  {/* 3D render — bottom-aligned, fused via screen blend */}
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      draggable={false}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] w-full select-none object-cover mix-blend-screen
                                 transition-transform duration-700 ease-out
                                 group-hover/card:scale-[1.08] group-hover/card:rotate-[4deg]
                                 motion-reduce:transition-none motion-reduce:group-hover/card:scale-100 motion-reduce:group-hover/card:rotate-0"
                    />
                  ) : null}

                  {/* content layer */}
                  <div className="relative z-10 flex h-full flex-col">
                    <h3 className="text-[28px] font-semibold leading-[1.1] tracking-tight text-white line-clamp-2">
                      {s.navLabel}
                    </h3>
                    <p className="mt-2 max-w-[88%] text-[14px] leading-snug text-white/75">{s.tagline}</p>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-brand-strong">
                        {pill}
                      </span>
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white
                                   transition-[transform,background-color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                                   group-hover/card:translate-x-[3px] group-hover/card:bg-[var(--color-brand-mid)]
                                   motion-reduce:transition-none motion-reduce:group-hover/card:translate-x-0"
                      >
                        <ArrowUpRight className="h-5 w-5 text-brand-strong transition-colors duration-[400ms] group-hover/card:text-white" />
                      </span>
                    </div>
                  </div>
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
            See all services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
