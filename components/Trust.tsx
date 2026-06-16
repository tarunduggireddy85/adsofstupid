"use client";

import React, { useEffect, useRef } from "react";
import { EyebrowBadge } from "./ui/EyebrowBadge";


interface TrustCardData {
  number: string;
  title: string;
  description: string;
  bgClass: string;
  borderClass: string;
  textColor: string;
  pinClass: string;
  pinShadow: string;
  
  deg: number;
  side: "left" | "right";
  nudge: string;
}

const trustCards: TrustCardData[] = [
  {
    number: "01",
    title: "Testimonials",
    description:
      "Show real customer stories. Include photos, company positions, and direct links to build high credibility.",
    bgClass: "bg-[#fef6f0]",
    borderClass: "border-orange-200/60",
    textColor: "text-orange-600",
    pinClass: "bg-orange-500/80 border-orange-400/40",
    pinShadow: "shadow-orange-500/30",
    deg: 3,
    side: "left",
    nudge: "self-start ml-[5%] lg:ml-[15%]",
  },
  {
    number: "02",
    title: "Trust Badges",
    description:
      "Showcase industry certificates, secure payment seals, and satisfaction guarantees to eliminate checkout friction.",
    bgClass: "bg-[#f4f7fe]",
    borderClass: "border-blue-200/60",
    textColor: "text-blue-600",
    pinClass: "bg-blue-500/80 border-blue-400/40",
    pinShadow: "shadow-blue-500/30",
    deg: -2,
    side: "right",
    nudge: "self-end mr-[5%] lg:mr-[15%]",
  },
  {
    number: "03",
    title: "Add Contacts",
    description:
      "Make support reachable. Provide active WhatsApp support channels, clear phone lines, and responsive emails.",
    bgClass: "bg-[#faf5fe]",
    borderClass: "border-purple-200/60",
    textColor: "text-purple-600",
    pinClass: "bg-purple-500/80 border-purple-400/40",
    pinShadow: "shadow-purple-500/30",
    deg: 2,
    side: "left",
    nudge: "self-start ml-[8%] lg:ml-[18%]",
  },
  {
    number: "04",
    title: "Case Studies",
    description:
      "Share transparent analytical breakdowns of how your strategy solved conversion bottlenecks for real brands.",
    bgClass: "bg-[#fef6f0]",
    borderClass: "border-orange-200/60",
    textColor: "text-orange-600",
    pinClass: "bg-orange-500/80 border-orange-400/40",
    pinShadow: "shadow-orange-500/30",
    deg: -3,
    side: "right",
    nudge: "self-end mr-[8%] lg:mr-[18%]",
  },
  {
    number: "05",
    title: "Clear Refund Policy",
    description:
      "Offer a highly visible money-back guarantee or transparent replacement process to remove purchasing hesitation.",
    bgClass: "bg-[#f4f7fe]",
    borderClass: "border-blue-200/60",
    textColor: "text-blue-600",
    pinClass: "bg-blue-500/80 border-blue-400/40",
    pinShadow: "shadow-blue-500/30",
    deg: 1,
    side: "left",
    nudge: "self-start ml-[5%] lg:ml-[15%]",
  },
];

export function Trust() {
  const sectionRef         = useRef<HTMLDivElement>(null);
  const cardsContainerRef  = useRef<HTMLDivElement>(null);
  const clipRectRef        = useRef<SVGRectElement>(null);
  const cardRefs           = useRef<(HTMLDivElement | null)[]>([]);

  
  const revealedRef = useRef<boolean[]>(trustCards.map(() => false));
  const rafRef      = useRef<number | null>(null);

  useEffect(() => {
    const clipRect = clipRectRef.current;
    if (!clipRect) return;

    
    const SVG_HEIGHT = 1300;

    
    const update = () => {
      const cardsEl = cardsContainerRef.current;
      if (!cardsEl) return;

      const viewH     = window.innerHeight;
      const cardsRect = cardsEl.getBoundingClientRect();

      
      
      
      
      const drawStart = viewH * 0.80;   
      const drawEnd   = viewH * 0.20;   

      
      const entered  = drawStart - cardsRect.top;
      
      const distance = (cardsRect.height + drawStart - drawEnd);
      const svgProg  = Math.max(0, Math.min(1, entered / distance));

      
      clipRect.setAttribute("height", String(SVG_HEIGHT * svgProg));

      
      cardRefs.current.forEach((card, i) => {
        if (!card || revealedRef.current[i]) return;
        const cardRect = card.getBoundingClientRect();
        if (cardRect.top < viewH * 0.85) {
          revealedRef.current[i] = true;
          card.style.opacity   = "1";
          card.style.transform = `rotate(${trustCards[i].deg}deg)`;
        }
      });
    };

    
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const initTimer = setTimeout(update, 80);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      clearTimeout(initTimer);
    };
  }, []);

  return (
    <section
      className="bg-transparent py-20 scroll-mt-28 w-full"
      id="trust-section"
      ref={sectionRef}
    >
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto flex flex-col items-center">

        
        <div className="w-full rounded-[2.5rem] border border-zinc-200 bg-[#fafafa] shadow-[0_24px_60px_rgba(0,0,0,0.02)] relative py-16 px-4 md:px-12">

          
          <div
            className="absolute inset-0 rounded-[2.5rem] opacity-[0.45] pointer-events-none select-none"
            style={{
              backgroundImage: "linear-gradient(#e4e4e7 1px, transparent 1px)",
              backgroundSize: "100% 48px",
            }}
          />

          
          <div className="text-center relative z-10 select-none mb-16">
            <EyebrowBadge animatePulse>Build Credibility</EyebrowBadge>

            <h2 className="font-sans font-semibold text-[clamp(2.1rem,4.5vw,3.2rem)] leading-tight text-zinc-900 tracking-tight max-w-[800px] mx-auto">
              How to Build Trust on <br />
              <span className="text-[#5c43fd]">Your Website</span>
            </h2>
          </div>

          
          <div className="relative w-full z-10" ref={cardsContainerRef}>

            
            <svg
              aria-hidden="true"
              className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-[680px] h-full pointer-events-none select-none hidden md:block"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 680 1300"
              overflow="visible"
            >
              <defs>
                
                <clipPath id="trust-line-clip">
                  <rect
                    ref={clipRectRef}
                    x="0"
                    y="0"
                    width="680"
                    height="0"
                  />
                </clipPath>
              </defs>

              
              <path
                d="M 180 0 C 380 150, 500 220, 500 380 C 500 540, 180 600, 180 760 C 180 920, 500 980, 500 1140 C 500 1240, 300 1280, 180 1300"
                stroke="#5c43fd"
                strokeOpacity="0.08"
                strokeWidth="2"
                strokeDasharray="10 10"
                strokeLinecap="round"
              />

              
              <path
                d="M 180 0 C 380 150, 500 220, 500 380 C 500 540, 180 600, 180 760 C 180 920, 500 980, 500 1140 C 500 1240, 300 1280, 180 1300"
                stroke="#5c43fd"
                strokeOpacity="0.45"
                strokeWidth="2.5"
                strokeDasharray="10 10"
                strokeLinecap="round"
                clipPath="url(#trust-line-clip)"
              />
            </svg>

            
            <div className="flex flex-col gap-16 relative">
              {trustCards.map((card, i) => {
                
                const startX        = card.side === "left" ? "-80px" : "80px";
                const startTransform = `translateX(${startX}) rotate(${card.deg}deg)`;

                return (
                  <div
                    key={card.number}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className={`w-full max-w-[340px] md:max-w-[380px] p-8 md:p-10 rounded-[2.5rem] border ${card.borderClass} ${card.bgClass} shadow-[0_16px_36px_rgba(0,0,0,0.05)] ${card.nudge} relative`}
                    style={{
                      
                      opacity:   0,
                      transform: startTransform,
                      
                      transition: [
                        `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s`,
                        `transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s`,
                      ].join(", "),
                    }}
                  >
                    
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none select-none">
                      <div className={`w-5 h-5 rounded-full border border-white/30 ${card.pinClass} ${card.pinShadow} shadow-lg`} />
                      <div className="w-[2px] h-4 bg-zinc-400/80 -mt-0.5 rounded-b" />
                    </div>

                    
                    <div className="flex flex-col items-start text-left pt-2">
                      <span className={`text-[1.35rem] font-sans font-semibold leading-none ${card.textColor}`}>
                        {card.number}
                      </span>
                      <h3 className="mt-3.5 text-[1.4rem] font-sans font-bold leading-tight text-zinc-900 tracking-tight">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-zinc-500 text-[0.92rem] leading-[1.6]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          
          <div className="mt-20 relative z-10 flex flex-col items-center select-none pt-8 border-t border-zinc-200/50 w-full">
            <div className="flex items-center gap-3.5 bg-white border border-zinc-200/60 p-3 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.015)]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8c76ff] to-[#5c43fd] border border-white flex items-center justify-center text-white text-[0.62rem] font-black shadow-sm uppercase">
                AoS
              </div>
              <span className="text-zinc-500 text-[0.82rem] font-bold tracking-tight pr-2">
                Your <span className="text-[#5c43fd]">all-in-one</span> D2C design partner
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Trust;
