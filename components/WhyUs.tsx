"use client";

import { motion } from "framer-motion";
import { EyebrowBadge } from "./ui/EyebrowBadge";

export function WhyUs() {
  return (
    <section className="py-[7.5rem] scroll-mt-28 bg-[radial-gradient(circle_at_18%_22%,rgba(165,106,189,0.04),transparent_28%)]" id="why">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.55 }}
            viewport={{ amount: 0.2, once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="relative aspect-[3/4] max-w-[24rem] mx-auto rounded-[2.5rem] bg-gradient-to-b from-[#a56abd] to-[#6e3482] p-[1.5px] shadow-[0_20px_50px_rgba(110,52,130,0.15)]" aria-hidden="true">
              <div className="absolute inset-2 border border-white/20 rounded-[2.25rem] grid place-items-center p-8 bg-[#6e3482]/95 backdrop-blur-sm">
                <span className="text-white text-center font-sans text-[1.6rem] leading-normal italic opacity-90">
                  Science. Systems. No stunts.
                </span>
              </div>
            </div>
          </motion.div>
 
          <motion.div
            className="max-w-[38rem] self-center"
            initial={{ opacity: 0, x: 40 }}
            transition={{ delay: 0.08, duration: 0.55 }}
            viewport={{ amount: 0.2, once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="mb-4">
              <EyebrowBadge>Our Philosophy</EyebrowBadge>
            </div>
            <h2 className="mt-3 mb-4 font-display text-[clamp(2.1rem,4.5vw,3rem)] leading-none tracking-[-0.035em] font-semibold text-brand-strong">
              Why "Ads of Stupid"?
            </h2>
            <p className="text-ink-soft text-[1.05rem] leading-[1.7] mt-3">
              The name was inspired by a childhood show - Science of Stupid.
            </p>
            <p className="text-ink-soft text-[1.05rem] leading-[1.7] mt-3">
              The host watched people do wild stunts and fail. Then he would
              decode the science behind why. Every failure had a reason and it was
              always physics.
            </p>
            <p className="text-ink-soft text-[1.05rem] leading-[1.7] mt-3">
              Marketing is the same.
            </p>
            <p className="text-ink-soft text-[1.05rem] leading-[1.7] mt-3">
              Most brands throw money at ads and hope something works. Boost a
              post. Copy a competitor. Trust vibes over data. Then wonder why they
              crashed.
            </p>
            <p className="my-6 p-5 border-l-4 border-brand-mid bg-brand-strong/4 text-brand-strong font-display text-[1.2rem] leading-[1.6] italic rounded-r-2xl">
              We do not do stunts. We decode the science behind the sale.
            </p>
            <p className="text-ink-soft text-[1.05rem] leading-[1.7] mt-3">
              No more stupid moves. Just the formula.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
