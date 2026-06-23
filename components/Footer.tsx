"use client";

import Link from "next/link";
import React from "react";
import { SocialLinks } from "./SocialLinks";

interface FooterLink {
  href: string;
  label: string;
}

const QUICK_LINKS: FooterLink[] = [
  { href: "/", label: "Home" },
  { href: "/#formula", label: "What we do" },
  { href: "/#process", label: "Our process" },
  { href: "/#why", label: "Why Ads of Stupid" },
  { href: "/#contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
];

const SERVICES_LINKS: FooterLink[] = [
  { href: "/performance-marketing-agency-pune", label: "Performance marketing" },
  { href: "/d2c-growth-strategy", label: "D2C growth strategy" },
  { href: "/meta-ads-management", label: "Meta and Google Ads" },
  { href: "/shopify-cro", label: "Shopify funnel optimization" },
  { href: "/whatsapp-marketing", label: "WhatsApp and Email marketing" },
];

export function Footer() {
  const footerBgStyle = {
    background: `
      radial-gradient(circle at 50% 10%, #ffffff 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0) 70%),
      radial-gradient(at 0% 100%, #8566ff 0px, transparent 55%),
      radial-gradient(at 100% 100%, #9a7eff 0px, transparent 55%),
      radial-gradient(at 0% 50%, #fbcfe8 0px, transparent 40%),
      radial-gradient(at 100% 50%, #f5d0fe 0px, transparent 40%),
      #f8fafc
    `
  };

  return (
    <footer 
      className="relative overflow-hidden pt-16 pb-6 text-left border-x border-b border-zinc-200/60 rounded-[2.5rem] max-w-8xl w-full mx-auto"
      style={footerBgStyle}
    >
      <div className="mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 md:px-8">
        
        <div className="flex flex-col items-start">
          <Link href="/" className="flex items-center gap-2.5 mb-4 group no-underline">
            <img
              src="/Ads-of-Stupid-logo.png"
              alt="Ads of Stupid Logo"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
            />
            <span className="font-sans text-[1.65rem] font-bold text-[#0f172a] leading-none">
              Ads of Stupid
            </span>
          </Link>
          <p className="text-[0.95rem] text-zinc-600 leading-[1.7] mb-2 font-medium">
            Decoding the science behind the sale - one D2C brand at a time.
          </p>
          <p className="text-[0.95rem] text-zinc-400 font-bold">Pune, India</p>
        </div>
        
        
        <div>
          <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">
            Quick links
          </h3>
          <ul className="m-0 p-0 list-none grid gap-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link 
                  className="text-zinc-500 hover:text-[#5c43fd] transition-colors duration-180 no-underline font-semibold text-[0.92rem]" 
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        
        <div>
          <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">
            Services
          </h3>
          <ul className="m-0 p-0 list-none grid gap-2.5">
            {SERVICES_LINKS.map((link) => (
              <li key={link.href}>
                <Link 
                  className="text-zinc-500 hover:text-[#5c43fd] transition-colors duration-180 no-underline font-semibold text-[0.92rem]" 
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        
        <div>
          <h3 className="m-0 text-[0.88rem] font-bold text-[#5c43fd] uppercase tracking-wider mb-4">
            Contact Us
          </h3>
          <ul className="m-0 p-0 list-none grid gap-2.5">
            <li>
              <a className="text-zinc-500 hover:text-[#5c43fd] transition-colors duration-180 no-underline font-semibold text-[0.92rem]" href="mailto:hello@adsofstupid.com">
                Email: hello@adsofstupid.com
              </a>
            </li>
            <li>
              <a className="text-zinc-500 hover:text-[#5c43fd] transition-colors duration-180 no-underline font-semibold text-[0.92rem]" href="https://wa.me/918530639877">
                WhatsApp: +91 85306 39877
              </a>
            </li>
            <li>
              <a className="text-zinc-500 hover:text-[#5c43fd] transition-colors duration-180 no-underline font-semibold text-[0.92rem]" href="tel:+918530639877">
                Phone: +91 85306 39877
              </a>
            </li>
            <li className="text-[0.92rem] text-zinc-400 font-semibold">Pune, Maharashtra, India</li>
          </ul>
          <SocialLinks className="mt-5" />
        </div>
      </div>
      
      
      <div className="w-full text-center text-[clamp(1.5rem,11.5vw,11.5rem)] font-sans font-black text-[#5c43fd]/[0.07] pointer-events-none mt-16 mb-[-1.5rem] select-none relative z-10 leading-none whitespace-nowrap px-2">
        Ads Of Stupid
      </div>
      
      
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto mt-16 pt-6 border-t border-white/20 relative z-10 flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-2 text-white text-[0.82rem] leading-[1.7] px-4 md:px-8 text-center">
        <span>&copy; 2026 Ads of Stupid. All rights reserved.</span>
        <span className="text-white/90">Performance marketing agency in Pune for early-stage D2C brands.</span>
        <span className="text-white/80 font-medium italic">No stupid marketing decisions were harmed in the making of this website.</span>
      </div>
    </footer>
  );
}
