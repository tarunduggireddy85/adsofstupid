"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll() {
  useEffect(() => {
    
    gsap.registerPlugin(ScrollTrigger);

    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // expose for debugging / programmatic scroll (harmless)
    (window as unknown as { lenis?: unknown }).lenis = lenis;

    
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  return null;
}

export default SmoothScroll;
