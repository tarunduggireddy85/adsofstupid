/* Tiny client helper to fire Meta Pixel standard events safely (no-op if the
   Pixel isn't loaded, e.g. when NEXT_PUBLIC_FB_PIXEL_ID is unset). */
export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === "function") fbq("track", event, params);
}

/** Fire the standard "Lead" conversion event. */
export function trackLead(params?: Record<string, unknown>) {
  fbqTrack("Lead", params);
}
