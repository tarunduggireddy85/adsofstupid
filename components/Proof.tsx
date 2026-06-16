"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "./ui/EyebrowBadge";

/* Counts up from 0 to `to` once the number scrolls into view. */
function CountUp({ to, duration = 1500 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // reduced-motion: snap to final value, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}</span>;
}


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
} as const;

export function Proof() {
  const stats = [
    {
      id: "roas",
      prefix: "",
      number: 13,
      suffix: "x ROAS",
      detail: "Delivered for a financial services client (Rs 3L spend to Rs 40L+/month)",
      type: "gradient",
    },
    {
      id: "spend",
      prefix: "Rs ",
      number: 30,
      suffix: "L+",
      detail: "Ad spend managed across Meta and Google",
      type: "flat",
    },
    {
      id: "experience",
      prefix: "",
      number: 4,
      suffix: " years",
      detail: "In performance marketing",
      type: "gradient",
    },
    {
      id: "brands",
      prefix: "",
      number: 5,
      suffix: "+ brands",
      detail: "Hands-on experience across D2C industries",
      type: "flat",
    }
  ] as const;

  return (
    <section className="py-16 scroll-mt-28" id="proof">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto flex flex-col items-center">
        
        
        <EyebrowBadge animatePulse>Proof</EyebrowBadge>


        
        <motion.div 
          className="text-center max-w-[800px] mx-auto mb-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-sans font-semibold text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.1] text-zinc-950 tracking-tight">
            Built on real results, <br className="hidden sm:inline" />
            not <span className="text-[#5c43fd] bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] bg-clip-text text-transparent">promises.</span>
          </h2>
          <p className="text-zinc-500 max-w-[580px] mx-auto text-[1.05rem] leading-[1.7] mt-4">
            Real numbers from real campaigns. No vanity metrics.
          </p>
        </motion.div>

        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full items-start mt-4"
          initial="hidden"
          variants={containerVariants}
          viewport={{ amount: 0.15, once: true }}
          whileInView="show"
        >
          {stats.map((stat, i) => {
            const isGradient = stat.type === "gradient";
            return (
              <motion.div
                key={stat.id}
                className={isGradient ? "" : "md:mt-[50px]"}
                variants={itemVariants}
              >
                <article
                  className={`aos-card-float p-7 md:p-8 rounded-[2rem] flex flex-col relative group transition-shadow duration-300 select-none text-left ${
                    isGradient
                      ? "h-[176px] md:h-[196px] bg-[radial-gradient(circle_at_top_right,rgba(92,67,253,0.07),#ffffff_60%)] border border-zinc-200/80 shadow-[0_12px_32px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_44px_rgba(92,67,253,0.08)]"
                      : "h-[150px] md:h-[168px] bg-[#f4f4f7]/70 border border-zinc-200/60 shadow-[0_4px_16px_rgba(0,0,0,0.005)] hover:bg-[#f4f4f7]/95"
                  }`}
                  style={{ animationDelay: `${i * 0.7}s` }}
                >
                  <h3 className={`m-0 text-[2.5rem] md:text-[2.85rem] font-bold tracking-tight leading-none ${
                    isGradient ? "text-[#5c43fd]" : "text-[#0f172a]"
                  }`}>
                    {stat.prefix}
                    <CountUp to={stat.number} />
                    {stat.suffix}
                  </h3>

                  <p className={`text-[0.82rem] md:text-[0.85rem] leading-[1.5] font-normal max-w-[220px] mt-2.5 ${
                    isGradient ? "text-zinc-600" : "text-zinc-500"
                  }`}>
                    {stat.detail}
                  </p>
                </article>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="w-[min(760px,100%)] mx-auto mt-10 text-zinc-500 text-center text-[0.95rem] font-medium leading-[1.7]">
          Now applying the same performance marketing playbook to early-stage D2C
          brands in Pune.
        </p>
      </div>
    </section>
  );
}
