"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


import { Navbar } from "../components/Navbar";
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

const navLinks = [
  { href: "#formula", label: "Services" },
  { href: "#proof", label: "Results" },
  { href: "#process", label: "Process" },
  { href: "#why", label: "About" },
  { href: "#contact", label: "Contact" }
] as const;



type FormState = "idle" | "submitting" | "success" | "error";

export default function Home() {
  const [activeSection, setActiveSection] = useState("#formula");
  const [errorMessage, setErrorMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [openTool, setOpenTool] = useState<"research" | "strategy" | "acquisition" | "conversion" | "scale">("research");

  
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setNavScrolled(scrollY > 24);
      
      setShowWhatsApp(scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth > 980) {
        setMobileMenuOpen(false);
      }
    }

    function handleHashChange() {
      setMobileMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.65]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
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
          phone: formData.get("phone")
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
      <main className="min-h-screen bg-surface-main py-8 px-4 md:px-8 text-ink-strong">

        
        <div className="max-w-[1280px] mx-auto rounded-[2.5rem] border border-zinc-200/50 bg-[#ffffff]/90 shadow-[0_24px_60px_rgba(92,67,253,0.04)] overflow-hidden relative isolate mb-12">
          <Navbar
            activeSection={activeSection}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            navScrolled={navScrolled}
          />

          <Hero />
        </div>

        <Proof />





        <Journey />

        <div style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
          <Formula />
        </div>

        <Tools
          openTool={openTool}
          setOpenTool={setOpenTool}
        />

        <Process />

        
        <WhyUs />

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
            href="https://wa.me/910000000000?text=Hi%2C%20I%20came%20across%20Ads%20of%20Stupid%20and%20would%20like%20to%20discuss%20my%20brand."
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-[9999] no-underline select-none"
            initial={{ opacity: 0, y: 24, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            
            <motion.div
              className="flex items-center justify-center p-3.5 rounded-full bg-[#25d366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.45)] transition-shadow duration-200"
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 8px 28px rgba(37,211,102,0.35)",
                  "0 14px 36px rgba(37,211,102,0.6)",
                  "0 8px 28px rgba(37,211,102,0.35)"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.0,
                ease: "easeInOut"
              }}
            >
              
              <svg
                className="w-6 h-6 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.div>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
