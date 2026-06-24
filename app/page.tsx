"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


import { SiteHeader } from "../components/SiteHeader";
import { StrategyPopup } from "../components/StrategyPopup";
import { leadSource } from "../lib/leadSource";
import { Hero } from "../components/Hero";
import { Proof } from "../components/Proof";
import { Journey } from "../components/Journey";
import { Formula } from "../components/Formula";
import { Tools } from "../components/Tools";
import { Process } from "../components/Process";
import { WhyUs } from "../components/WhyUs";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

/*
 * NOTE: Workflow, KeyFeatures, CoreValues, Testimonials, Trust, Blog and CTA
 * are the original template's reference sections. They are intentionally NOT
 * rendered — the page now follows ads-of-stupid-homepage-content.md exactly.
 * Their component files are kept in /components for reference and can be
 * re-added later (e.g. Testimonials + Blog in Phase 2 with real content).
 */

type FormState = "idle" | "submitting" | "success" | "error";

/*
 * Shared "floating panel" treatment — mirrors the Hero/Footer card so the
 * lighter sections read as intentional panels resting on the textured
 * backdrop instead of content floating naked on flat white. Translucent fill
 * lets the ambient orbs glow through faintly; border + soft shadow define the
 * edge even where the panel tone is close to the backdrop.
 */
const PANEL =
  "relative isolate overflow-hidden rounded-[2.5rem] border border-zinc-200/60 bg-white/80 shadow-[0_24px_60px_rgba(92,67,253,0.05)] max-w-[1280px] mx-auto mb-8 md:mb-12";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [openTool, setOpenTool] = useState<"research" | "strategy" | "acquisition" | "conversion" | "scale">("research");

  useEffect(() => {
    function handleScroll() {
      setShowWhatsApp(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setFormState("submitting");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const response = await fetch("/api/contact", {
        body: JSON.stringify({
          brand: formData.get("brand"),
          name: formData.get("name"),
          painPoint: formData.get("painPoint"),
          email: formData.get("email"),
          source: leadSource("Homepage contact")
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      if (response.ok) {
        setFormState("success");
        form.reset();
        return;
      }

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setErrorMessage(
        payload?.error ?? "The form could not be submitted right now. Please try again in a bit."
      );
      setFormState("error");
    } catch {
      setErrorMessage("The form could not be submitted right now. Please try again in a bit.");
      setFormState("error");
    }
  }

  return (
    <>
      {/* ambient textured backdrop — a faint dot grid + slow-drifting pastel
          orbs give the wide side gutters and inter-panel gaps structure, so
          they read as designed negative space rather than blank white. Fixed
          and behind everything (-z-10); panels above are translucent so the
          orbs glow through faintly. */}
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-surface-main">
        <div className="absolute inset-0 aos-dotgrid" />
        <div className="absolute -top-[10%] -left-[12%] h-[42rem] w-[42rem] rounded-full bg-[#8566ff]/[0.10] blur-[130px] aos-drift-a" />
        <div className="absolute top-[40%] -right-[14%] h-[40rem] w-[40rem] rounded-full bg-[#f5b8e0]/[0.12] blur-[130px] aos-drift-b" />
        <div className="absolute -bottom-[8%] left-[26%] h-[38rem] w-[38rem] rounded-full bg-[#9a7eff]/[0.10] blur-[120px] aos-drift-a" />
      </div>

      <SiteHeader />

      <main className="min-h-screen pb-8 px-4 md:px-8 text-ink-strong">


        <div className="max-w-[1280px] mx-auto rounded-[2.5rem] border border-zinc-200/50 bg-[#ffffff]/90 shadow-[0_24px_60px_rgba(92,67,253,0.04)] overflow-hidden relative isolate mb-12">
          <Hero />
        </div>

        <div className={PANEL}>
          <Proof />
        </div>


        <Journey />

        <div className="mb-8 md:mb-12" style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
          <Formula />
        </div>

        <div className={PANEL}>
          <Tools
            openTool={openTool}
            setOpenTool={setOpenTool}
          />
        </div>

        <div className={PANEL}>
          <Process />
        </div>

        <div className={PANEL}>
          <WhyUs />
        </div>

        <Contact
          formState={formState}
          errorMessage={errorMessage}
          handleSubmit={handleSubmit}
        />

        <Footer />
      </main>

      
      <AnimatePresence>
        {showWhatsApp && (
          <motion.a
            href="https://wa.me/918530639877?text=Hi%2C%20I%20came%20across%20Ads%20of%20Stupid%20and%20would%20like%20a%20free%20strategy%20for%20my%20brand."
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-6 right-6 z-[9999] no-underline select-none group"
            initial={{ opacity: 0, y: 24, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <motion.div
              className="flex items-center gap-2.5 pl-3 pr-3 sm:pr-5 py-3 rounded-full bg-[#25d366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.4)] group-hover:shadow-[0_14px_40px_rgba(37,211,102,0.55)] group-hover:-translate-y-0.5 transition-all duration-200"
              animate={{
                boxShadow: [
                  "0 8px 28px rgba(37,211,102,0.35)",
                  "0 14px 38px rgba(37,211,102,0.6)",
                  "0 8px 28px rgba(37,211,102,0.35)"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut"
              }}
            >
              <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                <span className="absolute inline-flex h-3 w-3 -top-1 -right-1 rounded-full bg-white text-[#25d366] text-[0.6rem] font-black items-center justify-center shadow">1</span>
              <svg
                className="w-6 h-6 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              </span>
              <span className="hidden sm:inline font-semibold text-[0.92rem] leading-none pr-0.5">
                Chat with us
              </span>
            </motion.div>
          </motion.a>
        )}
      </AnimatePresence>

      <StrategyPopup />
    </>
  );
}
