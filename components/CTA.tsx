"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, TrendingDown, ArrowUpRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { EyebrowBadge } from "./ui/EyebrowBadge";

interface MetricBadge {
  label: string;
  value: string;
  dotColor: string;
  valueColor: string;
  positionClass: string;
  yRange: [number, number, number];
  duration: number;
  delay?: number;
}

const METRIC_BADGES: MetricBadge[] = [
  {
    label: "ROAS",
    value: "4.8x",
    dotColor: "bg-emerald-400",
    valueColor: "text-emerald-400",
    positionClass: "left-[8%] top-[15%]",
    yRange: [0, -8, 0],
    duration: 4,
  },
  {
    label: "CAC",
    value: "-32%",
    dotColor: "bg-rose-400",
    valueColor: "text-rose-400",
    positionClass: "right-[22%] top-[12%]",
    yRange: [0, 8, 0],
    duration: 5,
    delay: 0.5,
  },
  {
    label: "CTR",
    value: "3.4%",
    dotColor: "bg-blue-400",
    valueColor: "text-blue-400",
    positionClass: "right-[8%] bottom-[15%]",
    yRange: [0, -6, 0],
    duration: 4.5,
    delay: 1,
  },
];

export function CTA() {
  const [emailState, setEmailState] = useState<"idle" | "submitting" | "success">("idle");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setEmailState("submitting");
    setTimeout(() => {
      setEmailState("success");
    }, 1000);
  }

  return (
    <section className="bg-transparent py-8 scroll-mt-28 w-full" id="cta-minimal">
      <motion.div
        className="w-[min(1200px,calc(100vw-2rem))] mx-auto rounded-[2.5rem] border border-white/10 bg-[#0c0926] shadow-[0_24px_60px_rgba(92,67,253,0.12)] overflow-hidden relative isolate py-10 px-6 md:px-12 flex items-center select-none"
        whileHover={{ y: -4, borderColor: "rgba(92, 67, 253, 0.25)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.15] z-0"
          style={{
            background: "radial-gradient(#8c76ff 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black, transparent 85%)",
            maskImage: "radial-gradient(circle at 50% 50%, black, transparent 85%)",
          }}
        />

        
        <div className="absolute top-[-30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#5c43fd]/15 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#8c76ff]/10 blur-[80px] pointer-events-none" />

      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full relative z-10">
          
          
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            <div className="mb-4">
              <EyebrowBadge animatePulse>Our Newsletter</EyebrowBadge>
            </div>

            <h2 className="font-sans font-semibold text-[clamp(2.1rem,4.5vw,3.2rem)] leading-[1.15] text-white tracking-tight">
              Subscribe our <br />
              newsletter
            </h2>
            <p className="text-zinc-400 text-[0.92rem] md:text-[0.98rem] leading-[1.6] max-w-[480px] mt-3">
              Subscribe to our newsletter and be the first to receive insights,
              updates, and expert tips on scaling your D2C brand's marketing and sales.
            </p>
          </div>

          {/* Right Column: Subscription Form */}
          <div className="lg:col-span-6 flex flex-col justify-center w-full">
            <div className="w-full max-w-[460px] flex flex-col gap-3 lg:ml-auto">
              {emailState === "success" ? (
                <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-semibold">Thanks for subscribing to our newsletter!</span>
                </div>
              ) : (
                <>
                  <span className="text-[0.8rem] font-bold text-[#8c76ff] tracking-wider uppercase">
                    Stay up to date
                  </span>
                  <form onSubmit={handleSubscribe} className="flex flex-row gap-2.5 w-full">
                    <div className="flex-1 relative flex items-center">
                      <Mail className="absolute left-4 w-4.5 h-4.5 text-zinc-500 pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full min-h-[3.15rem] pl-11 pr-5 rounded-full bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:bg-white/[0.08] focus:border-[#8c76ff] focus:ring-4 focus:ring-[#8c76ff]/10 transition-all"
                        disabled={emailState === "submitting"}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={emailState === "submitting"}
                      className="min-h-[3.15rem] px-5 sm:px-7 rounded-full text-xs sm:text-sm font-bold bg-[#5c43fd] text-white hover:bg-[#4a32e5] active:scale-95 transition-all whitespace-nowrap cursor-pointer shadow-[0_4px_12px_rgba(92,67,253,0.2)]"
                    >
                      {emailState === "submitting" ? "Submitting..." : "Subscribe"}
                    </button>
                  </form>
                  <p className="text-[0.7rem] text-zinc-500 leading-normal mt-0.5 px-1">
                    By subscribing you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="text-[#8c76ff] underline hover:text-[#735afc] transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>

         

        </div>
      </motion.div>
    </section>
  );
}

export default CTA;
