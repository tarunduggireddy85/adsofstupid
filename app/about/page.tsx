import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ShieldAlert, Award, Star, Compass, Zap, ShieldCheck } from "lucide-react";
import { EyebrowBadge } from "../../components/ui/EyebrowBadge";

export const metadata: Metadata = {
  title: "About Us | Ads of Stupid",
  description: "We decode the science behind the sale. Ads of Stupid is a D2C performance marketing agency in Pune. Learn about our origin story, core beliefs, and growth formula."
};

export default function AboutPage() {
  const beliefs = [
    {
      title: "Research before rupees",
      desc: "We don't spend a paisa until we know who we're talking to, what they want, and what's actually worth saying. Spending without strategy is just expensive guessing."
    },
    {
      title: "Science over vibes",
      desc: "Every decision is a test with a reason behind it — not a hunch, not a trend, not 'this worked for someone on Twitter.' If we can't explain why, we don't do it."
    },
    {
      title: "No vanity metrics",
      desc: "Likes don't pay salaries. Reach doesn't ship orders. We optimise for revenue and profit — the only two numbers that keep your brand alive."
    },
    {
      title: "You're a partner, not a client",
      desc: "No account-manager wall. No status-email theatre. You talk directly to the person running your ads, on WhatsApp, like a real human."
    },
    {
      title: "Boring done right beats flashy done wrong",
      desc: "The unglamorous stuff — tracking, retention, abandoned carts — is where the money actually hides. We obsess over it so you don't have to."
    },
    {
      title: "We'll tell you to stop",
      desc: "If something's wasting your money, we'll say so — even if it shrinks our invoice. A partner who only ever says 'spend more' isn't a partner."
    }
  ];

  const differences = [
    {
      label: "Launch ads on day one",
      ours: "Research first. We don't spend until we know who's buying."
    },
    {
      label: "Hide behind account managers",
      ours: "You talk to the person running your ads."
    },
    {
      label: "Report on reach and impressions",
      ours: "Report on revenue and profit — the numbers that matter."
    },
    {
      label: "Lock you into 6-month retainers",
      ours: "Earn the next month, every month."
    },
    {
      label: "Run one playbook for everyone",
      ours: "Re-run the formula for your brand, specifically."
    },
    {
      label: "\"Trust us, it's working\"",
      ours: "Here's the live dashboard. See for yourself."
    }
  ];

  const systemSteps = [
    { name: "Research", desc: "Understand the market first." },
    { name: "Strategy", desc: "A roadmap to revenue." },
    { name: "Acquisition", desc: "Qualified, tracked buyers." },
    { name: "Conversion", desc: "Visitors into repeat buyers." },
    { name: "Scale", desc: "Stay on top, every month." }
  ];

  return (
    <div className="min-h-screen bg-surface-main">
      
      <header className="sticky top-0 z-50 w-full py-4 px-4 flex justify-center bg-surface-main/90 backdrop-blur-xl border-b border-zinc-200/60">
        <div className="w-full max-w-[900px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <svg className="w-6 h-6 text-[#5c43fd] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4zm-8-8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4z" />
            </svg>
            <span className="font-semibold text-zinc-900 tracking-tight text-[1.12rem]">Ads of Stupid</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "/#formula", label: "Services" },
              { href: "/#proof", label: "Projects" },
              { href: "/#blog", label: "Blog" },
              { href: "/#contact", label: "Contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-[0.88rem] font-medium text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center bg-[#5c43fd] text-white font-medium text-[0.88rem] px-5 py-2 rounded-full hover:bg-[#4a32e5] transition-colors shadow-[0_2px_8px_rgba(92,67,253,0.2)] no-underline"
          >
            Book a call
          </Link>
        </div>
      </header>

      <main className="w-full">
        
        <section className="w-full bg-gradient-to-b from-[#f4f0ff] to-transparent pt-16 pb-12 px-4">
          <div className="max-w-[900px] mx-auto text-center">
            <nav className="flex items-center justify-center gap-2 text-[0.82rem] text-zinc-400 mb-6 select-none">
              <Link href="/" className="hover:text-[#5c43fd] transition-colors no-underline">Home</Link>
              <span>/</span>
              <span className="text-[#5c43fd] font-medium">About</span>
            </nav>

            <div className="flex justify-center mb-4">
              <EyebrowBadge>About us</EyebrowBadge>
            </div>

            <h1 className="font-sans font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] tracking-tight text-zinc-950 mb-6">
              We decode the science <br className="hidden sm:inline" />
              behind the sale.
            </h1>

            <p className="text-[1.12rem] font-medium leading-[1.6] text-zinc-900 max-w-[760px] mx-auto mb-4">
              Ads of Stupid is a performance marketing agency in Pune for early-stage D2C founders. No stunts, no vibes, no vanity metrics — just the formula.
            </p>

            <p className="text-zinc-500 text-[1.02rem] leading-[1.7] max-w-[720px] mx-auto mb-10">
              Good products shouldn't die from bad marketing. But most do — not because the founder didn't work hard, but because nobody ever showed them the system that turns a store into sales. We built this agency to be that system. This page is who we are, what we believe, and why we do it the way we do.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center min-h-[3.15rem] px-7 rounded-full text-[0.95rem] font-semibold bg-[#5c43fd] text-white hover:bg-[#4a32e5] active:scale-95 transition-all duration-200 no-underline shadow-[0_4px_16px_rgba(92,67,253,0.2)]"
              >
                Book a free strategy call
              </Link>
              <Link
                href="/#formula"
                className="inline-flex items-center justify-center min-h-[3.15rem] px-7 rounded-full text-[0.95rem] font-semibold border border-zinc-200 hover:bg-zinc-50 text-zinc-800 transition-colors no-underline"
              >
                See how we work →
              </Link>
            </div>
          </div>
        </section>

        
        <section className="py-16 px-4 max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            
            <div className="md:col-span-7 flex flex-col gap-6 text-left">
              <div>
                <span className="text-[#5c43fd] text-[0.8rem] uppercase font-bold tracking-wider block mb-2">The origin story</span>
                <h2 className="font-sans font-semibold text-[1.8rem] leading-tight text-zinc-950 tracking-tight">
                  Why a marketing agency is called "Ads of Stupid."
                </h2>
              </div>

              <p className="text-zinc-600 text-[0.98rem] leading-[1.7] m-0">
                The name came from a childhood show — <strong>Science of Stupid</strong>. The host would watch people attempt wild stunts and fail spectacularly, then slow the footage down and decode the science behind exactly why it went wrong. Every faceplant had a reason. It was never bad luck. It was always physics.
              </p>

              <p className="text-zinc-600 text-[0.98rem] leading-[1.7] m-0">
                Years later, running ads for brand after brand, the same pattern kept showing up — just with money instead of motorbikes. Founders would launch a great product, boost a few posts, copy whatever a competitor was doing, and then watch it all crash. And every crash had a reason too. A missing audience. A broken funnel. No tracking. An offer nobody wanted. Spend with no strategy behind it.
              </p>

              <blockquote className="m-0 border-l-[3.5px] border-[#5c43fd] pl-4 py-1.5 italic text-[1.1rem] font-semibold text-[#5c43fd] leading-relaxed">
                "Marketing is just the science of stupid with a budget attached."
              </blockquote>

              <p className="text-zinc-600 text-[0.98rem] leading-[1.7] m-0">
                So we built an agency around the opposite instinct. We don't guess. We don't chase trends. We don't do stunts and hope they land. We slow it down, look at the data, and decode the science behind the sale — before we spend your money, not after.
              </p>
            </div>

            {/* Right Column: Founder Photo container */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[280px] aspect-[4/5] rounded-[2rem] border border-zinc-200/80 bg-zinc-50 p-2 shadow-lg relative overflow-hidden flex flex-col group select-none">
                <div className="w-full flex-1 rounded-[1.65rem] overflow-hidden bg-zinc-200 relative">
                  <img
                    src="/founder.png"
                    alt="Founder of Ads of Stupid"
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="block text-white font-bold text-[1rem] leading-none">Tharun</span>
                    <span className="block text-zinc-300 font-semibold text-[0.7rem] leading-none mt-1">Founder, Ads of Stupid</span>
                  </div>
                </div>
                <div className="text-center py-2.5">
                  <span className="text-[0.68rem] text-zinc-400 font-bold uppercase tracking-wider">Science of Stupid</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── What We Believe (6 Rules) ── */}
        <section className="py-20 px-4 bg-zinc-50/50 border-y border-zinc-100">
          <div className="max-w-[900px] mx-auto text-center">
            <span className="text-[#5c43fd] text-[0.8rem] uppercase font-bold tracking-wider block mb-2">What we believe</span>
            <h2 className="font-sans font-semibold text-[1.8rem] leading-none text-zinc-950 tracking-tight mb-4">
              Six rules we don't break.
            </h2>
            <p className="text-zinc-500 text-[0.98rem] leading-[1.6] max-w-[580px] mx-auto mb-12">
              They're why founders trust us with their growth — and why we sometimes talk ourselves out of a bigger invoice.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {beliefs.map((belief, i) => (
                <div 
                  key={i}
                  className="p-6 rounded-[1.8rem] border border-zinc-200/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-[#5c43fd]/20 hover:shadow-[0_8px_30px_rgba(92,67,253,0.03)] transition-all duration-300 flex flex-col gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-[#5c43fd]/6 text-[#5c43fd] flex items-center justify-center font-bold text-[0.82rem] border border-[#5c43fd]/10">
                    {i + 1}
                  </div>
                  <h3 className="font-sans font-semibold text-[1rem] text-zinc-950 leading-tight m-0">
                    {belief.title}
                  </h3>
                  <p className="text-zinc-500 text-[0.88rem] leading-[1.6] m-0">
                    {belief.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who runs your ads / Stats ── */}
        <section className="py-20 px-4 max-w-[900px] mx-auto text-center">
          <span className="text-[#5c43fd] text-[0.8rem] uppercase font-bold tracking-wider block mb-2">Who runs your ads</span>
          <h2 className="font-sans font-semibold text-[1.8rem] leading-none text-zinc-950 tracking-tight mb-4">
            You'll work with the person who actually runs the ads.
          </h2>
          <p className="text-zinc-500 text-[0.98rem] leading-[1.6] max-w-[620px] mx-auto mb-12">
            No layers. No outsourced junior managing your account while a senior name sits on the website. The person who pitches you is the person who builds your campaigns, watches your numbers, and picks up the phone when you call.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-left mb-16">
            <div className="flex flex-col gap-5">
              <p className="text-zinc-600 text-[0.98rem] leading-[1.7] m-0">
                Behind Ads of Stupid is <strong>Tharun</strong> — four years in performance marketing, with real money managed and real returns to show for it. Not theory from a course. Campaigns that ran, budgets that were spent, and results that were measured.
              </p>
              <p className="text-zinc-600 text-[0.98rem] leading-[1.7] m-0">
                The exact same playbook — research, paid acquisition, funnel optimisation, retention — is now built for early-stage D2C.
              </p>
              <div className="mt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 text-[0.78rem] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active accounts cap: max 5 clients
                </span>
              </div>
            </div>

            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-150 shadow-[0_4px_16px_rgba(0,0,0,0.005)]">
                <span className="block font-sans font-black text-[#5c43fd] text-[1.8rem] leading-none">13×</span>
                <span className="block font-bold text-[0.8rem] text-zinc-800 leading-tight mt-1.5">Average Peak ROAS</span>
                <span className="block text-[0.65rem] text-zinc-400 font-semibold leading-normal mt-0.5">Delivered for a financial services client (₹3 L → ₹40 L+/mo)</span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-150 shadow-[0_4px_16px_rgba(0,0,0,0.005)]">
                <span className="block font-sans font-black text-[#5c43fd] text-[1.8rem] leading-none">₹30 L+</span>
                <span className="block font-bold text-[0.8rem] text-zinc-800 leading-tight mt-1.5">Ad Spend Managed</span>
                <span className="block text-[0.65rem] text-zinc-400 font-semibold leading-normal mt-0.5">Across Meta & Google search/shopping accounts</span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-150 shadow-[0_4px_16px_rgba(0,0,0,0.005)]">
                <span className="block font-sans font-black text-[#5c43fd] text-[1.8rem] leading-none">4 Years</span>
                <span className="block font-bold text-[0.8rem] text-zinc-800 leading-tight mt-1.5">In Marketing</span>
                <span className="block text-[0.65rem] text-zinc-400 font-semibold leading-normal mt-0.5">In performance marketing and creative strategy execution</span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-150 shadow-[0_4px_16px_rgba(0,0,0,0.005)]">
                <span className="block font-sans font-black text-[#5c43fd] text-[1.8rem] leading-none">5+ Brands</span>
                <span className="block font-bold text-[0.8rem] text-zinc-800 leading-tight mt-1.5">Hands-on Experience</span>
                <span className="block text-[0.65rem] text-zinc-400 font-semibold leading-normal mt-0.5">Scaling accounts across various competitive industries</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 inline-flex items-center gap-2">
            <span className="text-zinc-600 font-semibold text-[0.9rem]">
              We're not a 50-person agency. That's the point. You get senior attention on your account, not a seat in a queue.
            </span>
          </div>
        </section>

        
        <section className="py-20 px-4 bg-zinc-50/50 border-y border-zinc-100">
          <div className="max-w-[800px] mx-auto text-center">
            <span className="text-[#5c43fd] text-[0.8rem] uppercase font-bold tracking-wider block mb-2">The difference</span>
            <h2 className="font-sans font-semibold text-[1.8rem] leading-none text-zinc-950 tracking-tight mb-4">
              How we're different from most agencies.
            </h2>
            <p className="text-zinc-500 text-[0.98rem] leading-[1.6] max-w-[500px] mx-auto mb-12">
              Not a dig at anyone. Just the things we refuse to do.
            </p>

            <div className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
              <div className="grid grid-cols-12 bg-zinc-50/80 border-b border-zinc-200 px-6 py-4 font-bold text-[0.85rem] text-zinc-800 text-left uppercase tracking-wider select-none">
                <div className="col-span-5">Most agencies</div>
                <div className="col-span-2 text-center">— vs —</div>
                <div className="col-span-5 text-[#5c43fd]">Ads of Stupid</div>
              </div>
              <div className="divide-y divide-zinc-100">
                {differences.map((diff, idx) => (
                  <div key={idx} className="grid grid-cols-12 px-6 py-4.5 text-[0.9rem] text-left items-center">
                    <div className="col-span-5 text-zinc-500 font-medium flex items-start gap-2">
                      <X className="w-4.5 h-4.5 text-zinc-400 shrink-0 mt-0.5" />
                      <span>{diff.label}</span>
                    </div>
                    <div className="col-span-2 text-zinc-300 font-bold text-center">→</div>
                    <div className="col-span-5 text-zinc-900 font-bold flex items-start gap-2">
                      <Check className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{diff.ours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── The System ── */}
        <section className="py-20 px-4 max-w-[900px] mx-auto text-center">
          <span className="text-[#5c43fd] text-[0.8rem] uppercase font-bold tracking-wider block mb-2">The system</span>
          <h2 className="font-sans font-semibold text-[1.8rem] leading-none text-zinc-950 tracking-tight mb-4">
            The system behind every brand we grow.
          </h2>
          <p className="text-zinc-500 text-[0.98rem] leading-[1.6] max-w-[620px] mx-auto mb-12">
            Five elements. One system. We run the same growth formula for every D2C brand — the difference between a store that sits there and a brand that compounds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-left mb-10">
            {systemSteps.map((step, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col gap-2 relative overflow-hidden"
              >
                <span className="text-[#5c43fd]/20 font-black text-[1.2rem] leading-none absolute top-4 right-4 select-none">
                  {idx + 1}
                </span>
                <span className="font-bold text-[0.95rem] text-zinc-950 mt-1">{step.name}</span>
                <span className="text-zinc-500 text-[0.78rem] leading-normal">{step.desc}</span>
              </div>
            ))}
          </div>

          <Link
            href="/#formula"
            className="inline-flex items-center gap-1.5 font-bold text-[#5c43fd] hover:text-[#4a32e5] text-[0.95rem] transition-colors no-underline"
          >
            See the full growth formula →
          </Link>
        </section>

        {/* ── Footer CTA ── */}
        <section className="py-16 px-4 bg-zinc-50/50 border-t border-zinc-100">
          <div className="max-w-[760px] mx-auto text-center">
            <h2 className="font-sans font-semibold text-[2rem] leading-tight text-zinc-950 tracking-tight mb-4">
              Think we might be your kind of stupid?
            </h2>
            <p className="text-zinc-500 text-[1.02rem] leading-[1.7] mb-8">
              If the way we think lines up with how you want your brand grown, let's talk. We'll dig into what you've built, audit what you've got, and tell you exactly what we'd do — even if we don't end up working together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link
                href="/#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[3.15rem] px-8 rounded-full text-[0.98rem] font-bold bg-[#5c43fd] text-white hover:bg-[#4a32e5] transition-colors shadow-[0_4px_16px_rgba(92,67,253,0.2)] no-underline"
              >
                Book a free strategy call →
              </Link>
              <Link
                href="/blog"
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[3.15rem] px-8 rounded-full text-[0.98rem] font-bold border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 transition-colors no-underline"
              >
                Read the free D2C playbook →
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-[0.85rem] text-zinc-500 font-semibold">
              <span>📍 No pitch. No pressure. Just a real conversation. We'll get back to you within 24 hours.</span>
            </div>
          </div>
        </section>
      </main>

      
      <footer
        className="relative overflow-hidden pt-16 pb-6 text-left w-full mt-0"
        style={{
          background: `
            radial-gradient(circle at 50% 10%, #ffffff 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0) 70%),
            radial-gradient(at 0% 100%, #8566ff 0px, transparent 55%),
            radial-gradient(at 100% 100%, #9a7eff 0px, transparent 55%),
            radial-gradient(at 0% 50%, #fbcfe8 0px, transparent 40%),
            radial-gradient(at 100% 50%, #f5d0fe 0px, transparent 40%),
            #f8fafc
          `
        }}
      >
        <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 md:px-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/Ads-of-Stupid-logo.png"
                alt="Ads of Stupid"
                className="h-9 w-auto object-contain"
              />
              <h2 className="font-sans text-[1.8rem] leading-none font-bold text-[#0f172a] m-0">Ads of Stupid</h2>
            </div>
            <p className="text-[0.95rem] text-zinc-600 leading-[1.7] mb-2 font-medium">Decoding the science behind the sale - one D2C brand at a time.</p>
            <p className="text-[0.95rem] text-zinc-400 font-bold">Pune, India</p>
          </div>
          <div>
            <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">Quick links</h3>
            <ul className="m-0 p-0 list-none grid gap-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/#formula", label: "What we do" },
                { href: "/#proof", label: "Projects" },
                { href: "/#blog", label: "Blog" },
                { href: "/#contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">Services</h3>
            <ul className="m-0 p-0 list-none grid gap-2.5">
              {[
                { href: "/performance-marketing-agency-pune", label: "Performance marketing" },
                { href: "/d2c-growth-strategy", label: "D2C growth strategy" },
                { href: "/meta-ads-management", label: "Meta and Google Ads" },
                { href: "/shopify-cro", label: "Shopify funnel optimization" },
                { href: "/whatsapp-marketing", label: "WhatsApp and Email marketing" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="m-0 p-0 list-none grid gap-2.5">
              <li><a href="mailto:hello@adsofstupid.com" className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">Email: hello@adsofstupid.com</a></li>
              <li><a href="https://wa.me/910000000000" className="text-zinc-500 hover:text-[#5c43fd] transition-colors no-underline font-semibold text-[0.92rem]">WhatsApp: +91 00000 00000</a></li>
              <li className="text-[0.92rem] text-zinc-400 font-semibold">Pune, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        <div className="w-full text-center text-[clamp(2rem,14vw,11.5rem)] font-sans font-black text-[#5c43fd]/[0.07] pointer-events-none mt-16 mb-[-1.5rem] select-none relative z-10 leading-none whitespace-nowrap">
          Ads Of Stupid
        </div>

        <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto mt-16 pt-6 border-t border-white/20 relative z-10 flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-2 text-white text-[0.82rem] leading-[1.7] px-4 md:px-8 text-center">
          <span>© 2026 Ads of Stupid. All rights reserved.</span>
          <span className="text-white/90">Performance marketing agency in Pune for early-stage D2C brands.</span>
          <span className="text-white/80 font-medium italic">No stupid marketing decisions were harmed in the making of this website.</span>
        </div>
      </footer>
    </div>
  );
}
