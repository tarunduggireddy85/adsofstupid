"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, Sparkles } from "lucide-react";
import { leadSource } from "@/lib/leadSource";
import { onScroll } from "@/lib/scrollListen";
import { trackLead } from "@/lib/fbq";

const SESSION_KEY = "aos-strategy-popup";

export function StrategyPopup() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  // show once per session, right after the visitor passes the "you're not
  // stuck / partner" (Why) section — falls back to ~55% scroll on pages
  // that don't have that section.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY)) return;

    const whyEl = document.getElementById("why");
    let triggered = false;
    let unsubscribe = () => {};
    const handle = () => {
      if (triggered) return;
      let shouldOpen = false;
      if (whyEl) {
        const rect = whyEl.getBoundingClientRect();
        shouldOpen = rect.bottom <= window.innerHeight * 0.5;
      } else {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        shouldOpen = docH > 0 && window.scrollY / docH > 0.55;
      }
      if (shouldOpen) {
        triggered = true;
        window.sessionStorage.setItem(SESSION_KEY, "1");
        setOpen(true);
        unsubscribe();
      }
    };
    unsubscribe = onScroll(handle);
    return () => unsubscribe();
  }, []);

  // lock body scroll while open — only touch overflow while open, and restore
  // the previous value so we don't clobber another component's scroll lock.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setState("submitting");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          brand: "",
          painPoint: "Free brand strategy request",
          source: leadSource("Popup")
        })
      });
      if (res.ok) {
        setState("success");
        trackLead({ source: "Popup" });
        return;
      }
      const payload = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error ?? "Could not send right now. Please try again.");
      setState("error");
    } catch {
      setError("Could not send right now. Please try again.");
      setState("error");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="relative w-full max-w-[440px] rounded-[2rem] bg-white p-7 sm:p-9 shadow-[0_30px_80px_rgba(30,30,60,0.28)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-2xl pointer-events-none" style={{ background: "color-mix(in srgb, var(--accent) 12%, transparent)" }} />
            <div className="absolute -bottom-20 -left-16 w-44 h-44 rounded-full blur-2xl pointer-events-none" style={{ background: "color-mix(in srgb, var(--accent) 10%, transparent)" }} />

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 transition-colors"
            >
              <X size={18} />
            </button>

            {state === "success" ? (
              <div className="relative text-center py-4">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <Check className="h-7 w-7 stroke-[2.5]" />
                </div>
                <h2 className="font-sans font-semibold text-[1.5rem] text-zinc-950 tracking-tight">You're in. 🎉</h2>
                <p className="text-zinc-500 text-[1rem] leading-[1.7] mt-2.5 max-w-[320px] mx-auto">
                  We'll review your brand and message you on WhatsApp within 24 hours with a free strategy.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex items-center justify-center min-h-[3rem] px-7 rounded-full text-[0.95rem] font-semibold text-white transition-transform hover:-translate-y-px"
                  style={{ background: "var(--accent)" }}
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="relative flex flex-col items-center text-center">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.74rem] font-bold uppercase tracking-wide text-[color:var(--accent)]"
                  style={{ background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Free strategy
                </span>

                <h2 className="mt-4 font-sans font-bold text-[clamp(1.9rem,6vw,2.5rem)] leading-[1.1] tracking-tight text-zinc-950">
                  Get a free{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(to right, color-mix(in srgb, var(--accent) 68%, white), var(--accent))" }}
                  >
                    brand strategy.
                  </span>
                </h2>
                <p className="mt-3 text-zinc-500 text-[1rem] leading-[1.65] max-w-[340px]">
                  Drop your number and we&apos;ll send a custom growth plan for your brand — no cost, no pressure.
                </p>

                <form className="mt-6 w-full flex flex-col gap-3" onSubmit={handleSubmit}>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white text-[0.95rem] text-zinc-900 text-center placeholder:text-zinc-400 focus:outline-none focus:border-[color:var(--accent)] focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--accent)_8%,transparent)] transition-all"
                  />
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="WhatsApp / phone number"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white text-[0.95rem] text-zinc-900 text-center placeholder:text-zinc-400 focus:outline-none focus:border-[color:var(--accent)] focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--accent)_8%,transparent)] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="mt-1 inline-flex items-center justify-center min-h-[3rem] px-6 rounded-full text-[0.98rem] font-semibold text-white hover:-translate-y-px active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      backgroundImage: "linear-gradient(to right, color-mix(in srgb, var(--accent) 72%, white), var(--accent))",
                      boxShadow: "0 8px 24px color-mix(in srgb, var(--accent) 24%, transparent)"
                    }}
                  >
                    {state === "submitting" ? "Sending..." : "Get my free strategy →"}
                  </button>
                  {state === "error" ? (
                    <p className="text-rose-600 text-[0.85rem] font-medium">{error}</p>
                  ) : null}
                </form>

                <div className="mt-4 flex flex-col items-center gap-1 text-[0.8rem] text-zinc-400">
                  <span>No spam. We reply within 24 hours.</span>
                  <button type="button" onClick={() => setOpen(false)} className="font-medium hover:text-zinc-600 transition-colors">
                    Maybe later
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
