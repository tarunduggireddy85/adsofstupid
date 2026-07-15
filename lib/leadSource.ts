const UTM_KEY = "aos_utm";
const REF_KEY = "aos_ref";
const LANDING_KEY = "aos_landing";

/* Map a referrer hostname to a friendly channel name. AI answer engines are
   called out explicitly, since that's where a lot of our leads come from. */
function labelReferrer(rawHost: string): string {
  const h = rawHost.toLowerCase().replace(/^www\./, "");
  const map: [RegExp, string][] = [
    [/^(chatgpt\.com|chat\.openai\.com|openai\.com)$/, "ChatGPT"],
    [/perplexity\.ai$/, "Perplexity"],
    [/claude\.ai$/, "Claude"],
    [/^(gemini|bard)\.google\.com$/, "Gemini"],
    [/copilot\.microsoft\.com$/, "Copilot"],
    [/^(bing\.com|duckduckgo\.com)$/, "Bing/DDG"],
    [/(^|\.)google\./, "Google"],
    [/linkedin\.com$/, "LinkedIn"],
    [/(instagram\.com|l\.instagram\.com)$/, "Instagram"],
    [/(facebook\.com|l\.facebook\.com|fb\.com)$/, "Facebook"],
    [/youtube\.com$/, "YouTube"],
    [/(t\.co|twitter\.com|x\.com)$/, "X/Twitter"],
    [/whatsapp\.com$/, "WhatsApp"]
  ];
  for (const [re, name] of map) if (re.test(h)) return name;
  return h;
}

/** Capture attribution on landing: ad UTM, referring channel, and the page they
 *  landed on — so a lead can be traced back to (e.g.) ChatGPT → /services/...
 *  Stored per-session; call once on load. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);

    // 1) Ad UTM (only set once, on the first landing of the session)
    const src = params.get("utm_source") || params.get("source");
    if (src && !window.sessionStorage.getItem(UTM_KEY)) {
      const medium = params.get("utm_medium");
      window.sessionStorage.setItem(UTM_KEY, medium ? `${src}/${medium}` : src);
    }

    // 2) Referrer + landing page — first touch of the session wins
    if (!window.sessionStorage.getItem(LANDING_KEY)) {
      window.sessionStorage.setItem(LANDING_KEY, window.location.pathname);

      let ref = "Direct";
      const raw = document.referrer;
      if (raw) {
        try {
          const host = new URL(raw).hostname;
          // ignore self-referrals (internal navigation)
          if (host && host.replace(/^www\./, "") !== window.location.hostname.replace(/^www\./, "")) {
            ref = labelReferrer(host);
          } else {
            ref = "Direct";
          }
        } catch {
          ref = "Direct";
        }
      }
      window.sessionStorage.setItem(REF_KEY, ref);
    }
  } catch {
    /* ignore */
  }
}

/** Back-compat alias — older callers used captureUtm(). */
export const captureUtm = captureAttribution;

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

/** Where this visitor actually came from + what page they first landed on. */
export function getAttribution(): { referrer: string; landingPage: string } {
  if (typeof window === "undefined") return { referrer: "", landingPage: "" };
  try {
    return {
      referrer: window.sessionStorage.getItem(REF_KEY) || "Direct",
      landingPage: window.sessionStorage.getItem(LANDING_KEY) || window.location.pathname
    };
  } catch {
    return { referrer: "", landingPage: "" };
  }
}
