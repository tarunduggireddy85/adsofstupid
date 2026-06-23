const UTM_KEY = "aos_utm";

/** Capture utm_source/utm_medium (or ?source=) on landing so we can attribute
 *  leads to ads even after the visitor navigates around. Call once per page. */
export function captureUtm() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const src = params.get("utm_source") || params.get("source");
    if (src && !window.sessionStorage.getItem(UTM_KEY)) {
      const medium = params.get("utm_medium");
      window.sessionStorage.setItem(UTM_KEY, medium ? `${src}/${medium}` : src);
    }
  } catch {
    /* ignore */
  }
}

/** Build a lead source label: the form's own label, plus any captured ad UTM. */
export function leadSource(base: string) {
  if (typeof window === "undefined") return base;
  try {
    const utm = window.sessionStorage.getItem(UTM_KEY);
    return utm ? `${base} · Ad (${utm})` : base;
  } catch {
    return base;
  }
}
