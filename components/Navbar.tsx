"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface NavbarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  navScrolled: boolean;
}

const navLinks = [
  { href: "#proof", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export function Navbar({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  navScrolled
}: NavbarProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 w-full py-4 px-4 md:px-0 pointer-events-none flex justify-center">
      <div className="w-full max-w-[850px] relative">
        <div
          className={`w-full flex items-center justify-between min-h-[3.8rem] px-6 py-2 border rounded-full backdrop-blur-xl pointer-events-auto transition-all duration-300 ${
            navScrolled
              ? "bg-white/98 border-zinc-200 shadow-[0_12px_32px_rgba(92,67,253,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]"
              : "bg-white/94 border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
          }`}
        >
          <Link
            className="flex items-center text-zinc-900 no-underline whitespace-nowrap group focus:outline-none"
            href="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex items-center">
              <img
                src="/Ads-of-Stupid-logo.png"
                alt="Ads of Stupid"
                className="h-8 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </div>
          </Link>

          
          <nav aria-label="Primary" className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  className={`text-[0.88rem] font-medium tracking-wide transition-colors duration-200 no-underline cursor-pointer ${
                    isActive
                      ? "text-[#5c43fd]"
                      : "text-zinc-500 hover:text-[#5c43fd]"
                  }`}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          
          <div className="flex items-center gap-3">
            <a
              className="hidden sm:inline-flex items-center justify-center bg-[#5c43fd] text-white font-medium text-[0.88rem] px-5 py-2 rounded-full hover:bg-[#4a32e5] transition-colors shadow-[0_2px_8px_rgba(92,67,253,0.15)] focus:outline-none"
              href="#contact"
            >
              Book a call
            </a>
            
            <button
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
              className="relative md:hidden flex w-9 h-9 p-0 border-0 rounded-full bg-zinc-100 cursor-pointer items-center justify-center focus:outline-none"
              onClick={() => setMobileMenuOpen((open) => !open)}
              type="button"
            >
              <span
                className={`absolute w-3.5 h-[1.5px] bg-zinc-800 transition-transform duration-200 ${
                  mobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute w-3.5 h-[1.5px] bg-zinc-800 transition-transform duration-200 ${
                  mobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>

        
        <AnimatePresence initial={false}>
          {mobileMenuOpen ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 right-0 top-full mt-3 p-4 rounded-3xl border border-zinc-200 bg-white/98 shadow-[0_20px_48px_rgba(0,0,0,0.06)] backdrop-blur-lg pointer-events-auto flex flex-col gap-1 md:hidden"
              exit={{ opacity: 0, y: -18 }}
              initial={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    className={`block w-full py-3 px-4 rounded-xl text-[0.95rem] font-semibold no-underline transition-all duration-200 ${
                      isActive
                        ? "text-[#5c43fd] bg-[#5c43fd]/6 pl-5"
                        : "text-zinc-600 hover:text-[#5c43fd] hover:bg-zinc-50 hover:pl-5"
                    }`}
                    href={link.href}
                    key={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                className="w-full mt-3 inline-flex items-center justify-center bg-[#5c43fd] text-white font-semibold text-[0.95rem] py-3 px-6 rounded-full border border-transparent shadow-[0_4px_12px_rgba(92,67,253,0.2)] hover:bg-[#4a32e5] transition-colors"
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a free strategy call
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
