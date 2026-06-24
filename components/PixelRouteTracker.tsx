"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/* Fires a Meta Pixel PageView on client-side route changes (the base snippet
   already fires the initial PageView, so we skip the first run). */
export function PixelRouteTracker() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", "PageView");
  }, [pathname]);

  return null;
}
