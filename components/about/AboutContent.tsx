"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Search,
  FlaskConical,
  BarChart3,
  MessagesSquare,
  Wrench,
  Hand,
  Check,
  X
} from "lucide-react";
import { EyebrowBadge } from "../ui/EyebrowBadge";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 18 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE } }
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } }
};

function Reveal({
  children,
  className,
  variant = fadeUp
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
}) {
  return (
    <motion.div
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

const BELIEFS = [
  {
    icon: Search,
    title: "Research before rupees.",
    body: "We don't spend a paisa until we know who we're talking to, what they want, and what's worth saying. Spending without strategy is just expensive guessing."
  },
  {
    icon: FlaskConical,
    title: "Science over vibes.",
    body: "Every decision is a test with a reason behind it — not a hunch, not a trend, not “this worked for someone on Twitter.” If we can't explain why, we don't do it."
  },
  {
    icon: BarChart3,
    title: "No vanity metrics.",
    body: "Likes don't pay salaries. Reach doesn't ship orders. We optimise for revenue and profit — the only two numbers that keep your brand alive."
  },
  {
    icon: MessagesSquare,
    title: "You're a partner, not a client.",
    body: "No account-manager wall. No status-email theatre. You talk directly to the person running your ads, on WhatsApp, like a real human."
  },
  {
    icon: Wrench,
    title: "Boring done right beats flashy done wrong.",
    body: "The unglamorous stuff — tracking, retention, abandoned carts — is where the money actually hides. We obsess over it so you don't have to."
  },
  {
    icon: Hand,
    title: "We'll tell you to stop.",
    body: "If something's wasting your money, we'll say so — even if it shrinks our invoice. A partner who only ever says “spend more” isn't a partner."
  }
];

const STATS = [
  { value: "13×", label: "ROAS delivered", note: "Financial services client (₹3L → ₹40L+/mo)" },
  { value: "₹30L+", label: "Ad spend managed", note: "Across Meta & Google" },
  { value: "4 yrs", label: "In performance marketing", note: "Real budgets, measured returns" },
  { value: "5+", label: "Brands grown", note: "Hands-on across industries" }
];

const COMPARISON = [
  { them: "Launch ads on day one.", us: "Research first — we don't spend until we know who's buying." },
  { them: "Hide behind account managers.", us: "You talk to the person running your ads." },
  { them: "Report on reach and impressions.", us: "Report on revenue and profit — the numbers that matter." },
  { them: "Lock you into 6-month retainers.", us: "Earn the next month, every month." },
  { them: "Run one playbook for everyone.", us: "Re-run the formula for your brand, specifically." },
  { them: "“Trust us, it's working.”", us: "Here's the live dashboard. See for yourself." }
];

const SYSTEM = [
  { tag: "Research", color: "#7F77DD", line: "Understand the market first." },
  { tag: "Strategy", color: "#378ADD", line: "A roadmap to revenue." },
  { tag: "Acquisition", color: "#D85A30", line: "Qualified, tracked buyers." },
  { tag: "Conversion", color: "#639922", line: "Visitors into repeat buyers." },
  { tag: "Scale", color: "#1D9E75", line: "Stay on top, every month." }
];

const FLOAT_PILLS = [
  { text: "Research before rupees", color: "#7F77DD", pos: "top-[16%] left-[5%]", delay: "0s" },
  { text: "Revenue > reach", color: "#1D9E75", pos: "top-[24%] right-[6%]", delay: "-2s" },
  { text: "Science over vibes", color: "#378ADD", pos: "bottom-[20%] left-[8%]", delay: "-4s" },
  { text: "No vanity metrics", color: "#D85A30", pos: "bottom-[16%] right-[7%]", delay: "-1s" }
];

export function AboutContent() {
  return (
    <main className="w-full">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden px-4 pt-20 pb-24">
        {/* animated background */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {/* dot grid */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(rgba(92,67,253,0.16) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              WebkitMaskImage: "radial-gradient(circle at 50% 38%, black, transparent 72%)",
              maskImage: "radial-gradient(circle at 50% 38%, black, transparent 72%)"
            }}
          />
          {/* drifting orbs */}
          <div className="aos-drift-a absolute -top-24 -left-10 w-[340px] h-[340px] rounded-full bg-[#8c76ff]/25 blur-[90px]" />
          <div className="aos-drift-b absolute top-6 right-[-50px] w-[380px] h-[380px] rounded-full bg-[#d9b8ff]/30 blur-[100px]" />
          <div
            className="aos-drift-a absolute bottom-[-80px] left-1/3 w-[300px] h-[300px] rounded-full bg-[#fbcfe8]/35 blur-[90px]"
            style={{ animationDelay: "-7s" }}
          />
          {/* floating value pills (desktop) */}
          {FLOAT_PILLS.map((p) => (
            <div key={p.text} className={`hidden lg:block absolute ${p.pos} aos-float-soft`} style={{ animationDelay: p.delay }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 backdrop-blur-sm px-3.5 py-2 text-[0.8rem] font-semibold text-zinc-600 shadow-[0_8px_24px_rgba(30,30,60,0.06)]">
                <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                {p.text}
              </span>
            </div>
          ))}
        </div>

        <div className="relative max-w-[820px] mx-auto flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <EyebrowBadge animatePulse>About us</EyebrowBadge>
          </motion.div>

          <motion.h1
            className="mt-5 font-sans font-semibold text-[clamp(2.3rem,6vw,4rem)] leading-[1.08] tracking-tight text-zinc-950"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            We decode the science{" "}
            <span className="aos-gradient-text bg-gradient-to-r from-[#8c76ff] via-[#c061ff] to-[#5c43fd] bg-clip-text text-transparent">
              behind the sale.
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 text-zinc-600 text-[1.08rem] leading-[1.75] max-w-[640px]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          >
            Ads of Stupid is a performance marketing agency in Pune for early-stage D2C founders.
            No stunts, no vibes, no vanity metrics — just the formula.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[3rem] px-6 rounded-full text-[0.95rem] font-semibold bg-[#5c43fd] text-white shadow-[0_4px_14px_rgba(92,67,253,0.25)] hover:bg-[#4a32e5] hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              Book a free strategy call
            </Link>
            <Link
              href="/#formula"
              className="inline-flex items-center justify-center gap-1.5 min-h-[3rem] px-6 rounded-full text-[0.95rem] font-semibold border border-zinc-200 bg-white/80 backdrop-blur-sm text-zinc-700 hover:bg-white shadow-sm transition-all no-underline"
            >
              See how we work <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== ORIGIN STORY ===== */}
      <section className="max-w-[820px] mx-auto px-4 py-20">
        <Reveal className="flex flex-col items-center text-center mb-8">
          <EyebrowBadge>The origin story</EyebrowBadge>
          <h2 className="mt-4 font-sans font-semibold text-[clamp(1.7rem,4vw,2.6rem)] leading-tight tracking-tight text-zinc-950">
            Why a marketing agency is called{" "}
            <br className="hidden sm:block" />
            <span className="whitespace-nowrap bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] bg-clip-text text-transparent">
              &ldquo;Ads of Stupid.&rdquo;
            </span>
          </h2>
        </Reveal>

        <Reveal className="space-y-5 text-zinc-600 text-[1.06rem] leading-[1.8]">
          <p>
            The name came from a childhood show — <em>Science of Stupid.</em> The host would watch people
            attempt wild stunts and fail spectacularly, then slow the footage down and decode the science
            behind exactly why it went wrong. Every faceplant had a reason. It was never bad luck. It was
            always physics.
          </p>
          <p>
            Years later, running ads for brand after brand, the same pattern kept showing up — just with
            money instead of motorbikes. Founders would launch a great product, boost a few posts, copy
            whatever a competitor was doing, and then watch it all crash. And every crash had a reason too.
            A missing audience. A broken funnel. No tracking. An offer nobody wanted. Spend with no strategy
            behind it.
          </p>
        </Reveal>

        <Reveal variant={scaleIn} className="my-9">
          <blockquote className="relative rounded-[1.6rem] border border-[#5c43fd]/15 bg-gradient-to-br from-[#5c43fd]/[0.05] to-white px-7 py-8 shadow-[0_18px_44px_rgba(92,67,253,0.06)]">
            <span className="absolute top-3 left-5 text-[4rem] leading-none text-[#5c43fd]/15 font-serif select-none">&ldquo;</span>
            <p className="font-accent italic text-[clamp(1.4rem,3vw,1.95rem)] leading-[1.4] text-zinc-900 relative">
              Marketing is just the science of stupid with a budget attached.
            </p>
          </blockquote>
        </Reveal>

        <Reveal className="text-zinc-600 text-[1.06rem] leading-[1.8]">
          <p>
            So we built an agency around the opposite instinct. We don't guess. We don't chase trends. We
            don't do stunts and hope they land. We slow it down, look at the data, and decode the science
            behind the sale — before we spend your money, not after.
          </p>
        </Reveal>
      </section>

      {/* ===== BELIEFS ===== */}
      <section className="bg-[rgba(92,67,253,0.03)] py-20 px-4">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-12">
            <EyebrowBadge>What we believe</EyebrowBadge>
            <h2 className="mt-4 font-sans font-semibold text-[clamp(1.7rem,4vw,2.6rem)] leading-tight tracking-tight text-zinc-950">
              Six rules we don&apos;t break.
            </h2>
            <p className="mt-4 text-zinc-500 text-[1.05rem] leading-[1.7] max-w-[620px]">
              They&apos;re why founders trust us with their growth — and why we sometimes talk ourselves
              out of a bigger invoice.
            </p>
          </Reveal>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {BELIEFS.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  variants={scaleIn}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group flex flex-col rounded-[1.5rem] border border-zinc-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(92,67,253,0.03)] hover:shadow-[0_20px_48px_rgba(92,67,253,0.1)] hover:border-[#5c43fd]/25 transition-[box-shadow,border-color] duration-300"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5c43fd]/8 text-[#5c43fd] transition-all duration-300 group-hover:bg-[#5c43fd] group-hover:text-white group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-[1.18rem] font-semibold text-zinc-950 tracking-tight">{b.title}</h3>
                  <p className="mt-2.5 text-zinc-500 text-[0.98rem] leading-[1.65]">{b.body}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="max-w-[1100px] mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
          <Reveal variant={fadeLeft} className="relative">
            <div className="relative aspect-[4/5] max-w-[400px] mx-auto rounded-[2rem] overflow-hidden border border-zinc-200/80 shadow-[0_24px_60px_rgba(30,30,60,0.14)] bg-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder.png"
                alt="Tharun Duggireddy, founder of Ads of Stupid"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/55 to-transparent">
                <p className="text-white font-semibold text-[1.1rem] leading-none">Tharun Duggireddy</p>
                <p className="text-white/80 text-[0.85rem] mt-1.5">Founder, Ads of Stupid</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal variant={fadeRight}>
              <EyebrowBadge>Who runs your ads</EyebrowBadge>
              <h2 className="mt-4 font-sans font-semibold text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight tracking-tight text-zinc-950">
                You&apos;ll work with the person who actually runs the ads.
              </h2>
              <p className="mt-4 text-zinc-600 text-[1.04rem] leading-[1.75]">
                No layers. No outsourced junior managing your account while a senior name sits on the
                website. The person who pitches you is the person who builds your campaigns, watches your
                numbers, and picks up the phone when you call. Four years in performance marketing — real
                budgets spent, real returns measured. The same playbook, now built for early-stage D2C.
              </p>
            </Reveal>

            <motion.div
              className="mt-8 grid grid-cols-2 gap-4"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={scaleIn}
                  className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
                >
                  <p className="font-sans font-bold text-[1.8rem] leading-none bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] bg-clip-text text-transparent">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[0.9rem] font-semibold text-zinc-800">{s.label}</p>
                  <p className="mt-1 text-[0.78rem] text-zinc-400 leading-snug">{s.note}</p>
                </motion.div>
              ))}
            </motion.div>

            <Reveal className="mt-6">
              <p className="text-zinc-500 text-[0.98rem] leading-[1.7] italic">
                We&apos;re not a 50-person agency. That&apos;s the point — you get senior attention on your
                account, not a seat in a queue.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== THE DIFFERENCE ===== */}
      <section className="bg-[rgba(92,67,253,0.03)] py-20 px-4">
        <div className="max-w-[1000px] mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-12">
            <EyebrowBadge>The difference</EyebrowBadge>
            <h2 className="mt-4 font-sans font-semibold text-[clamp(1.7rem,4vw,2.6rem)] leading-tight tracking-tight text-zinc-950">
              How we&apos;re different.
            </h2>
            <p className="mt-4 text-zinc-500 text-[1.05rem] leading-[1.7] max-w-[560px]">
              Not a dig at anyone. Just the things we refuse to do.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            <Reveal variant={fadeLeft}>
              <div className="h-full rounded-[1.6rem] border border-zinc-200/80 bg-white/70 p-6 sm:p-8">
                <p className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-zinc-400 mb-5">
                  Most agencies
                </p>
                <ul className="flex flex-col gap-4">
                  {COMPARISON.map((row) => (
                    <li key={row.them} className="flex items-start gap-3 text-zinc-500 text-[0.98rem] leading-[1.5]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-200/70 text-zinc-400">
                        <X className="h-3 w-3 stroke-[3]" />
                      </span>
                      {row.them}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal variant={fadeRight}>
              <div className="h-full rounded-[1.6rem] border border-[#5c43fd]/25 bg-gradient-to-br from-[#5c43fd]/[0.05] to-white p-6 sm:p-8 shadow-[0_18px_44px_rgba(92,67,253,0.06)]">
                <p className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#5c43fd] mb-5">
                  Ads of Stupid
                </p>
                <ul className="flex flex-col gap-4">
                  {COMPARISON.map((row) => (
                    <li key={row.us} className="flex items-start gap-3 text-zinc-700 text-[0.98rem] leading-[1.5] font-medium">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5c43fd]/15 text-[#5c43fd]">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      {row.us}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== THE SYSTEM ===== */}
      <section className="max-w-[1100px] mx-auto px-4 py-20">
        <Reveal className="flex flex-col items-center text-center mb-12">
          <EyebrowBadge>The system</EyebrowBadge>
          <h2 className="mt-4 font-sans font-semibold text-[clamp(1.7rem,4vw,2.6rem)] leading-tight tracking-tight text-zinc-950">
            The system behind every brand we grow.
          </h2>
          <p className="mt-4 text-zinc-500 text-[1.05rem] leading-[1.7] max-w-[620px]">
            Five elements. One system. We run the same growth formula for every D2C brand — the difference
            between a store that sits there and a brand that compounds.
          </p>
        </Reveal>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SYSTEM.map((el, i) => (
            <motion.div
              key={el.tag}
              variants={scaleIn}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative flex flex-col rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden"
            >
              <span
                className="absolute top-0 left-0 h-1 w-full"
                style={{ background: el.color }}
              />
              <span className="font-sans font-bold text-[0.8rem]" style={{ color: el.color }}>
                0{i + 1}
              </span>
              <span className="mt-2 font-semibold text-[1.05rem]" style={{ color: el.color }}>
                {el.tag}
              </span>
              <span className="mt-1.5 text-[0.86rem] text-zinc-500 leading-snug">{el.line}</span>
            </motion.div>
          ))}
        </motion.div>

        <Reveal className="mt-8 text-center">
          <Link
            href="/#formula"
            className="inline-flex items-center gap-1.5 text-[#5c43fd] font-semibold hover:text-[#4a32e5] transition-colors no-underline"
          >
            See the full growth formula <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section className="px-4 pb-24">
        <Reveal variant={scaleIn} className="relative max-w-[1000px] mx-auto overflow-hidden rounded-[2.5rem] border border-[#5c43fd]/15 bg-gradient-to-br from-[#f4f0ff] to-[#ede8ff] px-6 sm:px-12 py-14 text-center shadow-[0_24px_60px_rgba(92,67,253,0.08)]">
          <div className="aos-drift-a absolute top-[-30%] right-[-10%] w-[320px] h-[320px] rounded-full bg-[#5c43fd]/10 blur-[70px] pointer-events-none" aria-hidden />
          <div className="aos-drift-b absolute bottom-[-40%] left-[-8%] w-[300px] h-[300px] rounded-full bg-[#c061ff]/10 blur-[70px] pointer-events-none" aria-hidden />
          <h2 className="relative font-sans font-semibold text-[clamp(1.7rem,4vw,2.6rem)] leading-tight tracking-tight text-zinc-950">
            Think we might be your kind of stupid?
          </h2>
          <p className="relative mt-4 text-zinc-600 text-[1.05rem] leading-[1.75] max-w-[640px] mx-auto">
            If the way we think lines up with how you want your brand grown, let&apos;s talk. We&apos;ll dig
            into what you&apos;ve built, audit what you&apos;ve got, and tell you exactly what we&apos;d do —
            even if we don&apos;t end up working together.
          </p>
          <div className="relative mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 min-h-[3rem] px-7 rounded-full text-[0.95rem] font-semibold bg-[#5c43fd] text-white shadow-[0_4px_14px_rgba(92,67,253,0.25)] hover:bg-[#4a32e5] hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              Book a free strategy call <span aria-hidden>→</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-1.5 min-h-[3rem] px-7 rounded-full text-[0.95rem] font-semibold border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 shadow-sm transition-all no-underline"
            >
              Read the free D2C playbook <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="relative mt-6 text-[0.9rem] text-zinc-400 font-medium">
            📍 No pitch. No pressure. Just a real conversation. We&apos;ll get back to you within 24 hours.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
