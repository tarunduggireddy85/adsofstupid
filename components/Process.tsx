"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const protocolSteps = [
  {
    body:
      "We dig into what you are building, where you are stuck, and what success looks like for you. If you already have a website or running ads, we audit them live on the call. By the end, you will know exactly what is working, what is not, and what we would do differently.",
    heading: "You book a call. We listen.",
    note: "No pitch. No pressure. Just a real conversation.",
    step: "Step 01 - The diagnosis",
    timing: "Day 1, free"
  },
  {
    body:
      "This is where the science begins. Competitor teardowns, customer research, USP discovery, CAC/LTV math. We do not run a single ad until we know exactly who we are talking to, what they want, and what is worth saying.",
    heading: "You give us the green light. We disappear and dig.",
    note: "7 days. Every assumption tested. No guessing.",
    step: "Step 02 - The research lab",
    timing: "Week 1"
  },
  {
    body:
      "Strategy doc, GTM roadmap, channel mix, budget split, expected timelines laid out on a call. Nothing happens until you say go. The moment you do, we start the same second.",
    heading: "We present the plan. You decide.",
    note: "Transparent. Documented. Yours to keep.",
    step: "Step 03 - The formula reveal",
    timing: "Week 2, Day 1"
  },
  {
    body:
      "Store optimization, tracking setup, creatives, ad accounts, automations, retention flows all built in parallel. When the foundation is solid, the campaigns go live. Not before.",
    heading: "We build, integrate, and switch the engine on.",
    note: "Done right, not just done fast.",
    step: "Step 04 - Setup and launch",
    timing: "Week 2 onwards"
  },
  {
    body:
      "WhatsApp, email, calls, whatever works for you. You will always know what we are doing today, this week, and next month. Detailed monthly reports. Direct access. Real conversations, not status emails.",
    heading: "You are not a client. You are a partner.",
    note: "Reachable. Accountable. Always.",
    step: "Step 05 - The ongoing partnership",
    timing: "Every day, forever after"
  }
] as const;

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

export function Process() {
  return (
    <section className="bg-[radial-gradient(circle_at_18%_22%,rgba(92,67,253,0.04),transparent_28%)] py-[7.5rem] scroll-mt-28" id="process">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto">
        <SectionHeader
          description="Five steps from let's talk to you're scaling. No fluff, no surprises."
          eyebrow="The lab protocol"
          title="How we work - the lab protocol."
        />

        <motion.div
          className="mt-12 grid gap-5"
          initial="hidden"
          variants={containerVariants}
          viewport={{ amount: 0.15, once: true }}
          whileInView="show"
        >
          {protocolSteps.map((step) => (
            <motion.article
              className="flex gap-5 p-7 rounded-[2rem] border border-brand-mid/10 bg-white/72 shadow-[0_18px_44px_rgba(92,67,253,0.05)] backdrop-blur-md"
              key={step.step}
              variants={itemVariants}
            >
              <div className="flex-none flex items-center justify-center w-10 h-10 rounded-full bg-brand-mid/10 text-brand-mid text-[1.1rem] font-semibold self-start mt-1">
                🧪
              </div>
              <div className="flex-1">
                <p className="m-0 text-brand-mid text-[0.88rem] tracking-[0.08em] uppercase font-semibold">
                  {step.step}
                </p>
                <p className="mt-1 text-ink-soft/80 text-[0.92rem] font-semibold">
                  {step.timing}
                </p>
                <h3 className="m-0 text-[1.35rem] font-semibold text-brand-strong mt-2">
                  {step.heading}
                </h3>
                <p className="text-ink-soft text-[1.05rem] leading-[1.7] mt-3">
                  {step.body}
                </p>
                <p className="mt-3 text-[0.92rem] text-brand-mid italic font-medium">
                  {step.note}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <p className="w-[min(760px,100%)] mx-auto mt-8 text-ink-soft text-center text-[1.05rem] leading-[1.7]">
          No agencies-in-a-box. No 6-week onboarding. Just a proven protocol,
          repeated for every D2C brand we work with as their performance marketing
          agency.
        </p>

        <div className="text-center mt-6">
          <a
            className="inline-flex items-center w-fit text-brand-strong font-semibold text-[1.05rem] transition-colors duration-200 hover:text-brand-mid no-underline"
            href="#contact"
          >
            Book your free diagnosis
          </a>
        </div>
      </div>
    </section>
  );
}
