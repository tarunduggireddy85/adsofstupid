"use client";

import { motion } from "framer-motion";
import { memo, useEffect, useMemo, useRef, useState } from "react";

/* ============================================================
   ENTRANCE ANIMATION
   ============================================================ */
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

/* H1 reveals line-by-line; the gradient pill pops in last. */
const lineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } }
} as const;

const lineGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
} as const;

const pillVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
} as const;

/* ============================================================
   LOGOS (app-icon squircles)
   ============================================================ */
function Squircle({
  bg,
  ring,
  children,
}: {
  bg: string;
  ring?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full h-full rounded-[22px] flex items-center justify-center border border-white/65"
      style={{
        background: bg,
        boxShadow: ring
          ? "0 8px 22px rgba(20,30,60,.18)"
          : "0 6px 18px rgba(20,30,60,.16)",
      }}
    >
      {children}
    </div>
  );
}

/* Image-based brand logo — uses the real files in /public/logos. */
function ImgLogo({ src, alt, pct = 70 }: { src: string; alt: string; pct?: number }) {
  return (
    <Squircle bg="#fff" ring>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="object-contain select-none"
        style={{ width: `${pct}%`, height: `${pct}%` }}
      />
    </Squircle>
  );
}

/* ---- orbit logos (real platform/tool marks) ---- */
function GoogleAnalyticsLogo() {
  return (
    <Squircle bg="#fff" ring>
      <svg viewBox="0 0 32 32" className="w-[66%] h-[66%]">
        <rect x="20" y="5" width="6.5" height="22" rx="3.25" fill="#F9AB00" />
        <rect x="12" y="11" width="6.5" height="16" rx="3.25" fill="#E8710A" />
        <circle cx="7.2" cy="24" r="3.2" fill="#E8710A" />
      </svg>
    </Squircle>
  );
}

function TagManagerLogo() {
  return <ImgLogo src="/logos/google-tag-manager.webp" alt="Google Tag Manager" pct={72} />;
}

function GoogleAdsLogo() {
  return <ImgLogo src="/logos/google-ads.webp" alt="Google Ads" pct={74} />;
}

function MetaLogo() {
  return <ImgLogo src="/logos/meta.webp" alt="Meta Ads" pct={74} />;
}

function ShopifyLogo() {
  return <ImgLogo src="/logos/shopify.webp" alt="Shopify" pct={66} />;
}

function WhatsAppLogo() {
  return (
    <Squircle bg="#25D366">
      <svg viewBox="0 0 32 32" className="w-[62%] h-[62%]">
        <path d="M16 5C9.9 5 5 9.9 5 16c0 1.9.5 3.7 1.4 5.3L5 27l5.9-1.5c1.5.8 3.3 1.3 5.1 1.3 6.1 0 11-4.9 11-11S22.1 5 16 5z" fill="#fff" />
        <path d="M16 7.2c4.9 0 8.8 3.9 8.8 8.8s-3.9 8.8-8.8 8.8c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3c-.9-1.4-1.4-3-1.4-4.6 0-4.9 3.9-8.8 8.8-8.8z" fill="#25D366" />
        <path d="M12.6 11.3c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7s1.5-.6 1.7-1.2c.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.7-1.2-1.4-1.4-1.7-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3.2-.4 0-.2 0-.3 0-.4l-.8-1.7z" fill="#fff" />
      </svg>
    </Squircle>
  );
}

function InstagramLogo() {
  return (
    <Squircle bg="radial-gradient(circle at 30% 110%,#FEDA77 0%,#F58529 25%,#DD2A7B 55%,#8134AF 80%,#515BD4 100%)">
      <svg viewBox="0 0 32 32" className="w-[60%] h-[60%]" fill="none" stroke="#fff" strokeWidth="2.4">
        <rect x="7" y="7" width="18" height="18" rx="5.5" />
        <circle cx="16" cy="16" r="4.6" />
        <circle cx="21.4" cy="10.6" r="1.3" fill="#fff" stroke="none" />
      </svg>
    </Squircle>
  );
}

function AmazonLogo() {
  return (
    <Squircle bg="#fff" ring>
      <svg viewBox="0 0 32 32" className="w-[68%] h-[68%]">
        <text x="16" y="19" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" fill="#232F3E">a</text>
        <path d="M7 21c2.6 1.9 6 2.8 9 2.8 2.4 0 5-.6 7.2-1.8.4-.2.7.3.3.6-1.9 1.6-4.8 2.5-7.3 2.5-3.5 0-6.7-1.3-9.1-3.5-.2-.2 0-.5.2-.4z" fill="#FF9900" />
        <path d="M24.6 20.8c-.3-.4-2-.2-2.7-.1-.2 0-.2-.2-.1-.3 1.3-.9 3.5-.6 3.7-.3.3.3 0 2.5-1.2 3.5-.2.2-.4.1-.3-.1.3-.7.9-2.2.6-2.6z" fill="#FF9900" />
      </svg>
    </Squircle>
  );
}

/* Orbit ring = the real tools/platforms we run (decorative, no sales). */
const ORBIT_LOGOS: { id: string; Comp: () => React.ReactElement }[] = [
  { id: "analytics", Comp: GoogleAnalyticsLogo },
  { id: "tagmanager", Comp: TagManagerLogo },
  { id: "googleads", Comp: GoogleAdsLogo },
  { id: "meta", Comp: MetaLogo },
  { id: "shopify", Comp: ShopifyLogo },
];

type Channel = {
  id: string;
  name: string;
  color: string;
  Comp: () => React.ReactElement;
  weight: number;
  total: number;
};

/* Phone breakdown = live sales by channel. */
const CHANNELS_BASE: Omit<Channel, "total">[] = [
  { id: "shopify", name: "Shopify", color: "#5E8E2C", Comp: ShopifyLogo, weight: 5 },
  { id: "meta", name: "Meta Ads", color: "#0866FF", Comp: MetaLogo, weight: 4 },
  { id: "google", name: "Google Ads", color: "#4285F4", Comp: GoogleAdsLogo, weight: 4 },
  { id: "whatsapp", name: "WhatsApp", color: "#1FAE54", Comp: WhatsAppLogo, weight: 3 },
  { id: "instagram", name: "Instagram", color: "#DD2A7B", Comp: InstagramLogo, weight: 3 },
  { id: "amazon", name: "Amazon", color: "#E88A00", Comp: AmazonLogo, weight: 2 },
];

/* deterministic starting totals (sum = 1,28,400) — avoids hydration mismatch */
const INITIAL_TOTALS: Record<string, number> = {
  shopify: 38400,
  meta: 30000,
  google: 26000,
  whatsapp: 16000,
  instagram: 12000,
  amazon: 6000,
};

/* ============================================================
   HELPERS
   ============================================================ */
function formatINR(n: number) {
  const s = Math.round(n).toString();
  let last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  if (rest) last3 = "," + last3;
  rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return "₹" + rest + last3;
}

function pickWeighted<T extends { weight: number }>(arr: T[]) {
  const total = arr.reduce((s, x) => s + x.weight, 0);
  let r = Math.random() * total;
  for (const x of arr) {
    if ((r -= x.weight) <= 0) return x;
  }
  return arr[0];
}

const SALE_INTERVAL = 1750;
const ACCENT = "#5c43fd";

/* ============================================================
   COUNT-UP NUMBER (isolated so per-frame easing re-renders ONLY
   this tiny node, never the whole dashboard) -> kills the lag.
   ============================================================ */
function CountUpRupee({
  target,
  className,
  style,
}: {
  target: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [val, setVal] = useState(target);
  const valRef = useRef(target);

  // Animate toward the new target, then STOP — don't keep an idle rAF loop
  // running forever (that was burning a frame every tick for the page's life).
  useEffect(() => {
    let raf: number;
    const loop = () => {
      const diff = target - valRef.current;
      if (Math.abs(diff) < 1) {
        valRef.current = target;
        setVal(target);
        return; // settled: loop ends until target changes
      }
      valRef.current += diff * 0.12;
      setVal(valRef.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <span className={className} style={style}>
      {formatINR(val)}
    </span>
  );
}

/* ============================================================
   LIVE SPARKLINE
   ============================================================ */
function Sparkline({ points }: { points: number[] }) {
  const W = 244;
  const H = 60;
  const pad = 4;
  const path = useMemo(() => {
    if (points.length < 2) return { line: "", area: "" };
    const max = Math.max(...points);
    const min = Math.min(...points);
    const span = max - min || 1;
    const step = (W - pad * 2) / (points.length - 1);
    const xy = points.map((p, i) => [
      pad + i * step,
      H - pad - ((p - min) / span) * (H - pad * 2),
    ]);
    let d = `M ${xy[0][0]} ${xy[0][1]}`;
    for (let i = 1; i < xy.length; i++) {
      const [x0, y0] = xy[i - 1];
      const [x1, y1] = xy[i];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    const area = d + ` L ${xy[xy.length - 1][0]} ${H} L ${xy[0][0]} ${H} Z`;
    return { line: d, area };
  }, [points]);

  return (
    <svg className="w-full h-[60px] block" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="chFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.28" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path.area} fill="url(#chFill)" />
      <path d={path.line} fill="none" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============================================================
   PHONE DASHBOARD  (no toast — sales number stays fully visible)
   ============================================================ */
function Phone({
  revenue,
  orders,
  channels,
  points,
}: {
  revenue: number;
  orders: number;
  channels: Channel[];
  points: number[];
}) {
  const ranked = [...channels].sort((a, b) => b.total - a.total);
  const maxTotal = ranked[0]?.total || 1;

  return (
    <div
      className="relative w-[250px] h-[510px] rounded-[40px] bg-[#0E1424] p-[9px]"
      style={{ boxShadow: "0 40px 80px -28px rgba(20,30,70,.45), 0 8px 24px rgba(20,30,70,.18)" }}
    >
      {/* notch */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[15px] w-[84px] h-[21px] bg-[#0E1424] rounded-[14px] z-[5]" />

      <div className="relative w-full h-full rounded-[32px] overflow-hidden flex flex-col" style={{ background: "linear-gradient(180deg,#FBFCFE 0%,#F4F7FD 100%)" }}>
        {/* status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1 text-[11px] font-bold text-[#0E1424]">
          <span>9:41</span>
          <span className="flex gap-1 items-center">
            <span className="w-1 h-1 rounded-full bg-[#0E1424]" />
            <span className="w-1 h-1 rounded-full bg-[#0E1424]" />
            <span className="w-1 h-1 rounded-full bg-[#0E1424]" />
          </span>
        </div>

        {/* dashboard */}
        <div className="px-4 pb-4 flex flex-col gap-3 overflow-hidden">
          {/* head */}
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-zinc-400 font-semibold">Today · 3 Jun</span>
            <span className="flex items-center gap-1.5 font-mono font-bold text-[9px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <span className="aos-blip w-1.5 h-1.5 rounded-full bg-emerald-500" />
              LIVE
            </span>
          </div>

          {/* hero number */}
          <div>
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.08em]">Today&apos;s Sales</div>
            <CountUpRupee
              target={revenue}
              className="block text-[30px] font-extrabold tracking-[-0.02em] leading-[1.05] mt-1"
              style={{
                background: `linear-gradient(120deg,#0E1424,${ACCENT})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            />
            <div className="mt-1.5 text-[11px] text-zinc-400 font-semibold flex gap-1.5 items-center">
              <b className="text-emerald-600">↑ {orders}</b> orders · <span>all channels</span>
            </div>
          </div>

          {/* sparkline card */}
          <div className="bg-white rounded-[18px] px-3 pt-3 pb-1.5 border border-[#1e2d5a]/[0.04]" style={{ boxShadow: "0 6px 18px rgba(30,45,90,.06)" }}>
            <div className="text-[10px] font-bold text-zinc-400 mb-1">Sales today</div>
            <Sparkline points={points} />
          </div>

          {/* channel breakdown */}
          <div className="bg-white rounded-[18px] px-3.5 py-3 border border-[#1e2d5a]/[0.04] flex flex-col gap-2.5" style={{ boxShadow: "0 6px 18px rgba(30,45,90,.06)" }}>
            <div className="text-[10px] font-bold text-zinc-400 flex justify-between">
              <span>By channel</span>
              <span>{formatINR(revenue)}</span>
            </div>
            {ranked.map((c) => (
              <div className="flex items-center gap-2.5" key={c.id}>
                <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 [&_div]:!rounded-lg [&_div]:!border-0 [&_div]:!shadow-none">
                  <c.Comp />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-zinc-500">{c.name}</span>
                    <span className="text-[#0E1424]">{formatINR(c.total)}</span>
                  </div>
                  <div className="h-[5px] rounded-md bg-[#EEF1F7] overflow-hidden">
                    <div
                      className="h-full rounded-md transition-[width] duration-700 ease-out"
                      style={{ width: Math.max(6, (c.total / maxTotal) * 100) + "%", background: c.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ORBIT RING  (CSS-animated, memoized so it never re-renders)
   ============================================================ */
const OrbitRing = memo(function OrbitRing({ paused = false }: { paused?: boolean }) {
  const R = 270;
  const playState = paused ? "paused" : "running";
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      {/* static rings */}
      <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute -inset-[30px] rounded-full" style={{ background: "radial-gradient(circle, rgba(92,67,253,.10) 0%, rgba(92,67,253,0) 62%)" }} />
        <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed" style={{ borderColor: "rgba(92,67,253,.22)" }} />
        <div className="absolute inset-[70px] rounded-full border-[1.5px]" style={{ borderColor: "rgba(92,67,253,.10)" }} />
      </div>

      {/* rotating spokes (CSS keyframes) — paused when off-screen */}
      <div className="aos-orbit absolute left-1/2 top-1/2" style={{ width: 0, height: 0, animationPlayState: playState }}>
        {ORBIT_LOGOS.map((l, i) => {
          const a = (i / ORBIT_LOGOS.length) * Math.PI * 2;
          // integer px so SSR and client render identical strings
          const x = Math.round(Math.sin(a) * R);
          const y = Math.round(-Math.cos(a) * R);
          return (
            <div key={l.id} className="absolute left-0 top-0" style={{ transform: `translate(${x}px, ${y}px)` }}>
              <div className="aos-orbit-rev w-[80px] h-[80px] -translate-x-1/2 -translate-y-1/2" style={{ animationPlayState: playState }}>
                <l.Comp />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

/* ============================================================
   HERO
   ============================================================ */
export function Hero() {
  /* ---- pause all hero animation work when scrolled out of view ---- */
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "120px"
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---- reveal hero content on first scroll (header is visible on landing) ---- */
  const [started, setStarted] = useState(false);
  useEffect(() => {
    // honour reduced-motion: show immediately, no scroll gate
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      return;
    }
    const trigger = () => setStarted(true);
    const opts: AddEventListenerOptions = { passive: true, once: true };
    window.addEventListener("scroll", trigger, opts);
    window.addEventListener("wheel", trigger, opts);
    window.addEventListener("touchmove", trigger, opts);
    window.addEventListener("keydown", trigger, opts);
    return () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("wheel", trigger);
      window.removeEventListener("touchmove", trigger);
      window.removeEventListener("keydown", trigger);
    };
  }, []);

  /* ---- live sales state (updates once per SALE_INTERVAL, not per frame) ---- */
  const [revenue, setRevenue] = useState(128400);
  const [orders, setOrders] = useState(327);
  const [channels, setChannels] = useState<Channel[]>(() =>
    CHANNELS_BASE.map((c) => ({ ...c, total: INITIAL_TOTALS[c.id] }))
  );
  const [points, setPoints] = useState<number[]>(() => {
    let v = 60000;
    const arr: number[] = [];
    for (let i = 0; i < 18; i++) {
      v += 3000 + (i % 4) * 1200;
      arr.push(v);
    }
    return arr;
  });

  /* sale engine — only runs while the hero is on-screen */
  useEffect(() => {
    if (!inView) return;
    const fire = () => {
      const chan = pickWeighted(CHANNELS_BASE);
      const amount = Math.round((299 + Math.random() * 5200) / 10) * 10;
      setRevenue((r) => r + amount);
      setOrders((o) => o + 1);
      setChannels((cs) =>
        cs.map((c) => (c.id === chan.id ? { ...c, total: c.total + amount } : c))
      );
      setPoints((pts) => [...pts.slice(-23), (pts[pts.length - 1] || 0) + amount]);
    };
    const t = setInterval(fire, SALE_INTERVAL);
    return () => clearInterval(t);
  }, [inView]);

  const heroBgStyle = {
    background: `
      radial-gradient(circle at 50% 25%, #ffffff 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0) 70%),
      radial-gradient(at 0% 100%, #8566ff 0px, transparent 55%),
      radial-gradient(at 100% 100%, #9a7eff 0px, transparent 55%),
      radial-gradient(at 0% 50%, #fbcfe8 0px, transparent 40%),
      radial-gradient(at 100% 50%, #f5d0fe 0px, transparent 40%),
      #f8fafc
    `,
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-clip flex flex-col items-center min-h-[62svh] sm:min-h-[80svh] lg:min-h-[86svh] pt-10 sm:pt-20 lg:pt-24 pb-10 sm:pb-16 scroll-mt-28 isolate w-full"
      id="home"
      style={heroBgStyle}
    >
      {/* dotted mask overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(to bottom, #b5b5be68 0%, #ffffff68 100%)",
          WebkitMaskImage: "radial-gradient(circle, black 1px, transparent 1px)",
          WebkitMaskSize: "28px 28px",
          maskImage: "radial-gradient(circle, black 1px, transparent 1px)",
          maskSize: "28px 28px",
        }}
      />

      {/* soft blur blob */}
      <div aria-hidden="true" className="absolute bottom-[8%] right-[5%] w-[min(32vw,24rem)] aspect-square rounded-full bg-[#5c43fd]/6 blur-[72px] pointer-events-none z-0" />

      <motion.div
        className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 relative z-[1] flex flex-col items-center flex-1 justify-center"
        initial="hidden"
        variants={containerVariants}
        animate="show"
      >
        {/* eyebrow badge */}
        <motion.div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#5c43fd]/20 bg-[#5c43fd]/6 text-[#5c43fd] font-semibold text-[0.74rem] sm:text-[0.82rem] tracking-wide mb-4 sm:mb-6"
          variants={itemVariants}
        >
          <span>Decoding the science behind the sale</span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="relative font-sans text-[clamp(2.3rem,7vw,5.2rem)] leading-[1.1] tracking-[-0.035em] font-semibold text-zinc-950 text-center max-w-[960px] w-full"
          variants={lineContainer}
        >
          <motion.span className="block" variants={itemVariants}>
            You focus on the product.
          </motion.span>
          <motion.span
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-1 sm:mt-2"
            variants={lineGroup}
          >
            <motion.span variants={itemVariants}>We focus on</motion.span>

            <motion.span
              className="relative inline-block px-5 sm:px-7 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] text-white font-bold shadow-[0_8px_25px_rgba(92,67,253,0.22)] align-middle my-1"
              variants={pillVariants}
            >
              the profit
                {/* floating brand tags (CSS float, no JS loop) */}
                <div className="aos-float-up absolute left-[-115px] top-[-10px] hidden md:flex items-center gap-1 bg-[#5c43fd] text-white font-semibold text-[0.7rem] px-2.5 py-1 rounded-full shadow-md cursor-default select-none whitespace-nowrap tracking-normal">
                  <span>Ads of Stupid</span>
                  <svg className="w-3.5 h-3.5 fill-current rotate-70" viewBox="0 0 24 24">
                    <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
                  </svg>
                </div>

                <div className="aos-float-down absolute right-[-115px] bottom-[-10px] hidden md:flex items-center gap-1 bg-[#5c43fd] text-white font-semibold text-[0.7rem] px-2.5 py-1 rounded-full shadow-md cursor-default select-none whitespace-nowrap tracking-normal">
                  <svg className="w-3.5 h-3.5 fill-current -rotate-90" viewBox="0 0 24 24">
                    <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
                  </svg>
                  <span>Ads of Stupid</span>
                </div>
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* everything below the headline reveals on first scroll —
           collapsed to zero height on landing so the title sits centred
           with no empty gap below it. */}
        <motion.div
          className="w-full overflow-hidden"
          initial={false}
          animate={{ height: started ? "auto" : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
        <motion.div
          className="w-full flex flex-col items-center pt-2"
          initial="hidden"
          variants={containerVariants}
          animate={started ? "show" : "hidden"}
        >
        {/* sub-headline */}
        <motion.p
          className="text-zinc-700 max-w-[640px] mx-auto text-[1rem] sm:text-[1.12rem] leading-[1.55] sm:leading-[1.6] mt-4 sm:mt-6 text-center font-medium"
          variants={itemVariants}
        >
          The performance marketing agency that runs the entire growth engine for
          early-stage D2C brands in Pune.
        </motion.p>

        {/* body */}
        <motion.p
          className="text-zinc-500 max-w-[620px] mx-auto text-[0.92rem] sm:text-[1.02rem] leading-[1.6] sm:leading-[1.7] mt-2.5 sm:mt-3 text-center"
          variants={itemVariants}
        >
          You handle the product. We handle the ads, the funnel, the strategy, and
          the retention — so your store generates predictable, profitable sales
          from day one.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center" variants={itemVariants}>
          <a
            className="inline-flex items-center justify-center min-h-[3rem] px-6 rounded-full text-[0.92rem] font-semibold bg-[#5c43fd] text-white shadow-[0_4px_12px_rgba(92,67,253,0.2)] hover:bg-[#4a32e5] transition-colors duration-200"
            href="#contact"
          >
            Book a free strategy call
          </a>
          <a
            className="inline-flex items-center justify-center gap-1.5 min-h-[3rem] px-6 rounded-full text-[0.92rem] font-semibold border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 shadow-sm transition-all duration-200"
            href="#process"
          >
            See how we work <span aria-hidden>→</span>
          </a>
        </motion.div>

        {/* LIVE-SALES VISUAL: phone + orbit ring */}
        <motion.div className="relative w-full flex items-center justify-center mt-8 sm:mt-12 h-[340px] sm:h-[450px] md:h-[540px] lg:h-[600px]" variants={itemVariants}>
          <div className="relative w-[600px] h-[600px] flex-shrink-0 origin-center scale-[0.58] sm:scale-[0.74] md:scale-90 lg:scale-100">
            <OrbitRing paused={!inView} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Phone revenue={revenue} orders={orders} channels={channels} points={points} />
            </div>
          </div>
        </motion.div>
        </motion.div>
        </motion.div>

        {/* scroll hint — only on landing, before the reveal */}
        {!started && (
          <motion.div
            className="flex flex-col items-center gap-1.5 mt-10 text-zinc-400 select-none pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 7, 0] }}
            transition={{ opacity: { delay: 0.9, duration: 0.6 }, y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } }}
          >
            <span className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase">Scroll</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
