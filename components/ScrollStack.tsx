"use client";

import React, { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full p-6 sm:p-9 md:p-12 rounded-[32px] md:rounded-[40px] border box-border overflow-hidden ${itemClassName}`.trim()}
    style={{ backfaceVisibility: "hidden", willChange: "transform" }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  /** vertical gap (scroll distance) between cards */
  itemDistance?: number;
  /** how far each stacked card peeks below the previous one */
  itemStackDistance?: number;
  /** sticky offset from the top of the viewport (px or %) */
  stackPosition?: string;
  /** scale a card shrinks to once fully covered */
  baseScale?: number;
  /** max blur applied to a fully-covered card */
  blurAmount?: number;
}

/**
 * Sticky-based card stack. Each card sticks at the top (with a small peek
 * offset per card) and the next card scrolls up and covers it, scaling +
 * blurring the one behind. Because it's pure CSS sticky (no GSAP pinning),
 * it's smooth on mobile + Lenis and the whole stack releases cleanly at the
 * end of the container — so content after it flows normally (no stuck card).
 */
const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 120,
  itemStackDistance = 16,
  stackPosition = "16%",
  baseScale = 0.9,
  blurAmount = 0.8,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(".scroll-stack-card")
    );
    const total = cards.length;
    if (!total) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const topPx = () => {
      const vh = window.innerHeight;
      return stackPosition.includes("%")
        ? (parseFloat(stackPosition) / 100) * vh
        : parseFloat(stackPosition);
    };

    const layout = () => {
      const t0 = topPx();
      // tighter spacing on mobile so the stack flows without big gaps
      const dist = window.innerWidth < 640 ? Math.min(itemDistance, 56) : itemDistance;
      cards.forEach((card, i) => {
        card.style.position = "sticky";
        card.style.top = `${Math.round(t0 + i * itemStackDistance)}px`;
        card.style.zIndex = String(i + 1);
        card.style.marginBottom = i < total - 1 ? `${dist}px` : "0px";
        card.style.transformOrigin = "top center";
      });
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      if (reduce) return;
      const vh = window.innerHeight;
      const t0 = topPx();
      for (let i = 0; i < total - 1; i++) {
        const card = cards[i];
        const next = cards[i + 1];
        const nextTop = next.getBoundingClientRect().top;
        const stickNext = t0 + (i + 1) * itemStackDistance;
        // progress 0 (next at bottom of viewport) -> 1 (next stuck over this card)
        let p = (vh - nextTop) / (vh - stickNext);
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        const scale = 1 - p * (1 - baseScale);
        const blur = p * blurAmount;
        card.style.transform = `scale(${scale.toFixed(4)})`;
        card.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";
        card.style.opacity = String((1 - p * 0.1).toFixed(3));
      }
      const last = cards[total - 1];
      last.style.transform = "";
      last.style.filter = "";
      last.style.opacity = "1";
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      layout();
      onScroll();
    };

    layout();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [itemDistance, itemStackDistance, stackPosition, baseScale, blurAmount]);

  return (
    <div
      ref={ref}
      className={`scroll-stack-container relative w-full ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default ScrollStack;
