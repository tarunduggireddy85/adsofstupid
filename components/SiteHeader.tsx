"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { captureUtm } from "@/lib/leadSource";
import { onScroll } from "@/lib/scrollListen";
import { SERVICES } from "@/lib/services";

const LINKS = [
  { href: "/#proof", label: "Results" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const lastY = useRef(0);

  // Hide on scroll down, reveal on scroll up. Lenis drives native scroll, so a
  // window scroll listener (same pattern as the floating WhatsApp button) works.
  useEffect(() => {
    const handle = (y: number) => {
      setScrolled(y > 8);
      const delta = y - lastY.current;
      if (y < 90) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true); // scrolling down
      } else if (delta < -8) {
        setHidden(false); // scrolling up
      }
      if (Math.abs(delta) > 8 || y < 90) lastY.current = y;
    };
    return onScroll(handle);
  }, []);

  // capture ad attribution (utm/source) once on load
  useEffect(() => {
    captureUtm();
  }, []);

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function isActive(href: string) {
    if (href.startsWith("/#")) return false;
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  }

  const visible = !hidden || menuOpen;

  return (
    <>
      <header
        className="fixed inset-x-0 z-50 px-4 pt-3 sm:pt-4"
        style={{ top: visible ? 0 : "-120px", transition: "top 0.3s ease-out" }}
      >
        <div className="mx-auto w-full max-w-[1080px]">
          <div
            className={`relative flex items-center justify-between gap-4 rounded-[1.6rem] sm:rounded-full border px-4 sm:px-6 min-h-[3.6rem] backdrop-blur-xl transition-colors duration-300 ${
              scrolled
                ? "bg-white/95 border-zinc-200 shadow-[0_12px_32px_rgba(92,67,253,0.08)]"
                : "bg-white/85 border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            }`}
          >
            <Link href="/" className="flex items-center gap-2 no-underline shrink-0 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Ads-of-Stupid-logo.png"
                alt="Ads of Stupid"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-semibold text-zinc-900 tracking-tight text-[1.05rem] hidden sm:inline">
                Ads of Stupid
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-6 lg:gap-7">
              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href="/services"
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  className={`flex items-center gap-1 text-[0.88rem] font-medium transition-colors no-underline ${
                    pathname.startsWith("/services") ? "text-[#5c43fd]" : "text-zinc-600 hover:text-[#5c43fd]"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </Link>

                <AnimatePresence>
                  {servicesOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                    >
                      <div className="w-[300px] rounded-2xl border border-zinc-200 bg-white/98 backdrop-blur-lg p-2 shadow-[0_20px_48px_rgba(0,0,0,0.1)]">
                        {SERVICES.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="flex items-start gap-3 rounded-xl px-3 py-2.5 no-underline transition-colors hover:bg-zinc-50"
                          >
                            <span
                              className="mt-1 h-2 w-2 shrink-0 rounded-full"
                              style={{ background: s.accent }}
                            />
                            <span className="flex flex-col">
                              <span className="text-[0.9rem] font-semibold text-zinc-900 leading-tight">
                                {s.navLabel}
                              </span>
                              <span className="text-[0.78rem] text-zinc-500 leading-snug mt-0.5">
                                {s.tagline}
                              </span>
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="mt-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[0.85rem] font-semibold text-[#5c43fd] no-underline transition-colors hover:bg-[#5c43fd]/6"
                        >
                          View all services →
                        </Link>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[0.88rem] font-medium transition-colors no-underline ${
                    isActive(link.href) ? "text-[#5c43fd]" : "text-zinc-600 hover:text-[#5c43fd]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center bg-[#5c43fd] text-white font-medium text-[0.86rem] px-5 py-2 rounded-full hover:bg-[#4a32e5] transition-colors shadow-[0_2px_8px_rgba(92,67,253,0.2)] no-underline"
              >
                Book a call
              </Link>

              <button
                aria-expanded={menuOpen}
                aria-label="Toggle menu"
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="relative md:hidden flex w-9 h-9 items-center justify-center rounded-full bg-zinc-100 cursor-pointer focus:outline-none"
              >
                <span
                  className={`absolute w-3.5 h-[1.5px] bg-zinc-800 transition-transform duration-200 ${
                    menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[4px]"
                  }`}
                />
                <span
                  className={`absolute w-3.5 h-[1.5px] bg-zinc-800 transition-transform duration-200 ${
                    menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[4px]"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* mobile dropdown */}
          <AnimatePresence initial={false}>
            {menuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="md:hidden mt-3 p-3 rounded-3xl border border-zinc-200 bg-white/98 shadow-[0_20px_48px_rgba(0,0,0,0.08)] backdrop-blur-lg flex flex-col gap-1"
              >
                {/* Services group */}
                <p className="px-4 pt-2 pb-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-zinc-400">
                  Services
                </p>
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 w-full py-2.5 px-4 rounded-xl text-[0.92rem] font-semibold text-zinc-700 no-underline transition-colors hover:text-[#5c43fd] hover:bg-zinc-50"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.accent }} />
                    {s.navLabel}
                  </Link>
                ))}
                <Link
                  href="/services"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-2 px-4 rounded-xl text-[0.85rem] font-semibold text-[#5c43fd] no-underline transition-colors hover:bg-[#5c43fd]/6"
                >
                  View all services →
                </Link>

                <div className="my-1.5 border-t border-zinc-100" />

                {LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block w-full py-3 px-4 rounded-xl text-[0.95rem] font-semibold no-underline transition-colors ${
                      isActive(link.href)
                        ? "text-[#5c43fd] bg-[#5c43fd]/6"
                        : "text-zinc-700 hover:text-[#5c43fd] hover:bg-zinc-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full mt-1 inline-flex items-center justify-center bg-[#5c43fd] text-white font-semibold text-[0.95rem] py-3 px-6 rounded-full shadow-[0_4px_12px_rgba(92,67,253,0.2)] hover:bg-[#4a32e5] transition-colors no-underline"
                >
                  Book a call
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      {/* spacer so page content starts below the fixed header */}
      <div aria-hidden className="h-[78px] sm:h-[86px]" />
    </>
  );
}
