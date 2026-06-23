type LenisLike = {
  scroll?: number;
  animatedScroll?: number;
  on: (event: string, cb: (l: unknown) => void) => void;
  off: (event: string, cb: (l: unknown) => void) => void;
};

/**
 * Subscribe to scroll updates. Lenis (smooth scroll) drives scrolling on this
 * site and doesn't always emit native scroll events, so we subscribe to Lenis's
 * own "scroll" event when it's available, and also listen to window scroll as a
 * fallback. The handler receives the current scrollY. Returns an unsubscribe fn.
 */
export function onScroll(handler: (y: number) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const winHandler = () => handler(window.scrollY);
  window.addEventListener("scroll", winHandler, { passive: true });

  let lenis: LenisLike | null = null;
  let lenisCb: ((l: unknown) => void) | null = null;
  let attempts = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const attach = () => {
    const candidate = (window as unknown as { lenis?: LenisLike }).lenis;
    if (candidate && typeof candidate.on === "function") {
      lenis = candidate;
      lenisCb = (e: unknown) => {
        const l = e as LenisLike;
        const y =
          typeof l?.scroll === "number"
            ? l.scroll
            : typeof l?.animatedScroll === "number"
              ? l.animatedScroll
              : window.scrollY;
        handler(y);
      };
      lenis.on("scroll", lenisCb);
    } else if (attempts++ < 50) {
      timer = setTimeout(attach, 100);
    }
  };
  attach();

  handler(window.scrollY); // run once for the initial position

  return () => {
    window.removeEventListener("scroll", winHandler);
    if (timer) clearTimeout(timer);
    if (lenis && lenisCb) lenis.off("scroll", lenisCb);
  };
}
