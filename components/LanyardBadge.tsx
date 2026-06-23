"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

const STRAP_BASE = 80; // px, matches the strap rest height
const MAX_STRETCH = 130; // px the strap can be pulled down

export function LanyardBadge() {
  const reduce = useReducedMotion();
  const pivotRef = useRef<HTMLDivElement>(null);
  const rotate = useMotionValue(0);
  const stretch = useMotionValue(0);
  const strapHeight = useTransform(stretch, (s) => STRAP_BASE + s);
  const dragging = useRef(false);
  const startDist = useRef(0);

  // gentle settle swing on first mount
  useEffect(() => {
    if (reduce) return;
    rotate.set(13);
    const controls = animate(rotate, 0, {
      type: "spring",
      stiffness: 80,
      damping: 8,
      mass: 1
    });
    return () => controls.stop();
  }, [reduce, rotate]);

  function pivotPoint() {
    const el = pivotRef.current;
    if (!el) return { px: 0, py: 0 };
    const r = el.getBoundingClientRect();
    return { px: r.left + r.width / 2, py: r.top + r.height / 2 };
  }

  function applyFromPointer(clientX: number, clientY: number) {
    const { px, py } = pivotPoint();
    const dx = clientX - px;
    const dy = Math.max(1, clientY - py);
    // negate: positive CSS rotation swings the bottom left, so dragging
    // right (dx > 0) must map to a negative angle to follow the pointer.
    const deg = (-Math.atan2(dx, dy) * 180) / Math.PI;
    rotate.set(Math.max(-58, Math.min(58, deg)));
    // stretch the strap when pulled further than where it was grabbed
    const dist = Math.hypot(dx, dy);
    stretch.set(Math.max(0, Math.min(MAX_STRETCH, dist - startDist.current)));
  }

  function handleDown(e: React.PointerEvent) {
    if (reduce) return;
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const { px, py } = pivotPoint();
    startDist.current = Math.hypot(e.clientX - px, e.clientY - py);
    applyFromPointer(e.clientX, e.clientY);
  }
  function handleMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    applyFromPointer(e.clientX, e.clientY);
  }
  function handleUp(e: React.PointerEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    animate(rotate, 0, { type: "spring", stiffness: 140, damping: 4, mass: 1 });
    animate(stretch, 0, { type: "spring", stiffness: 200, damping: 7, mass: 1 });
  }

  return (
    <div className="relative flex flex-col items-center select-none" aria-hidden={false}>
      {/* fixed top mount the lanyard hangs from */}
      <div ref={pivotRef} className="h-2.5 w-32 rounded-full bg-zinc-300/90 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.15)]" />

      {/* rotating assembly: strap + clip + badge */}
      <motion.div
        className={`flex flex-col items-center ${reduce ? "" : "cursor-grab active:cursor-grabbing"}`}
        style={{ rotate, transformOrigin: "50% 0%", touchAction: "none" }}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
      >
        {/* strap (stretches when pulled down) */}
        <motion.div
          className="relative w-7 overflow-hidden rounded-b-[3px] bg-gradient-to-b from-[#8c76ff] to-[#5c43fd] shadow-[0_2px_6px_rgba(92,67,253,0.25)]"
          style={{ height: strapHeight }}
        >
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/25" />
        </motion.div>

        {/* metal clip */}
        <div className="-mt-1 h-4 w-10 rounded-md bg-gradient-to-b from-zinc-200 to-zinc-400 shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />

        {/* badge card */}
        <div className="-mt-1 w-[clamp(220px,72vw,260px)] rounded-[1.4rem] bg-white p-3.5 shadow-[0_26px_60px_rgba(30,30,60,0.22)] ring-1 ring-black/5">
          {/* punched hole */}
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-zinc-300" />

          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100">
            <Image
              src="/founder.png"
              alt="Tharun Duggireddy, founder of Ads of Stupid"
              fill
              sizes="260px"
              draggable={false}
              className="object-cover pointer-events-none"
              priority={false}
            />
          </div>

          <div className="mt-3.5 text-center">
            <p className="font-display font-semibold text-[1.1rem] leading-tight text-brand-strong">
              Tharun Duggireddy
            </p>
            <p className="mt-0.5 text-[0.84rem] text-ink-soft">
              Founder · Ads of Stupid
            </p>
          </div>

          {/* brand accent bar */}
          <div className="mt-3 h-1.5 w-full rounded-full bg-gradient-to-r from-[#8c76ff] to-[#5c43fd]" />
        </div>
      </motion.div>
    </div>
  );
}
