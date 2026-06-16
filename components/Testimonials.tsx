"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { EyebrowBadge } from "./ui/EyebrowBadge";


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
} as const;

export function Testimonials() {
  
  const testimonialsList = [
    {
      id: 1,
      name: "Anjali Desai",
      role: "Founder, D2C Apparel Brand",
      rating: 5,
      text: "Working with the team at Ads of Stupid has been a breath of fresh air. Instead of just launching campaigns and hoping for the best, they completely restructured our Meta ad accounts and fixed the leaks in our conversion funnel. What I appreciate most is their proactive approach to creative strategy, they don't just manage the dashboard; they help us figure out exactly what kind of content our audience actually wants to see. They genuinely act like an extension of our internal team.",
      date: "May 10, 2026",
      avatarBg: "bg-gradient-to-br from-[#8c76ff] to-[#5c43fd]",
      initial: "AD"
    },
    {
      id: 2,
      name: "Rohan Kapoor",
      role: "Co-Founder, Smart Gadgets & Electronics",
      rating: 5,
      text: "We were struggling with our store's user experience and high drop-off rates before bringing them on board. Tushar didn't just look at the marketing side; he audited our entire Shopify setup. They optimized our landing pages, refined our Google Ads targeting, and made the whole customer journey frictionless. It's rare to find an agency that understands both the technical web development side and the granular media buying side so well. Their work ethic is unmatched.",
      date: "May 18, 2026",
      avatarBg: "bg-gradient-to-br from-pink-400 to-rose-500",
      initial: "RK"
    },
    {
      id: 3,
      name: "Megha Sharma",
      role: "Director, Organic Skincare",
      rating: 5,
      text: "The biggest difference with this agency is the transparency and the communication. I never have to chase them for updates or wonder what strategy we are testing next. Tharun and the crew took the time to deeply understand our brand voice, ensuring the ad creatives never compromised our premium brand image, and mapped out a full-funnel approach that made sense for our market. Their weekly insights are incredibly sharp, and their ability to pivot based on real-time consumer behavior gives me so much peace of mind.",
      date: "May 24, 2026",
      avatarBg: "bg-gradient-to-br from-amber-400 to-orange-500",
      initial: "MS"
    },
    {
      id: 4,
      name: "Vikram Reddy",
      role: "Founder, Sustainable Home Decor",
      rating: 5,
      text: "We needed a complete overhaul of our digital presence. The team stepped in and took complete ownership, from setting up a solid e-commerce foundation to crafting an Instagram content strategy that actually resonated with our target audience. They are incredibly hands-on, always suggesting new angles and testing different ad formats. It feels great to work with a partner who cares about building the brand just as much as we do.",
      date: "May 28, 2026",
      avatarBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
      initial: "VR"
    },
    {
      id: 5,
      name: "Sneha Iyer",
      role: "Operations Head, Specialty Foods",
      rating: 5,
      text: "Most agencies just want to spend your budget, but Ads of Stupid actually cares about the mechanics of the business. They helped us streamline our backend operations and align our ad strategies with our dropshipping and inventory flow, so we were always pushing the right products at the right time. Their grasp on overall e-commerce operations, combined with their performance marketing execution, makes them an invaluable growth partner. Flawless execution and brilliant strategy.",
      date: "June 02, 2026",
      avatarBg: "bg-gradient-to-br from-blue-400 to-indigo-500",
      initial: "SI"
    }
  ];

  
  const triplicatedTestimonials = [...testimonialsList, ...testimonialsList, ...testimonialsList];

  return (
    <section className="bg-transparent py-16 scroll-mt-28 w-full overflow-hidden" id="testimonials">
      
      <style>{`
        @keyframes marquee-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .animate-marquee-horizontal {
          animation: marquee-horizontal 35s linear infinite;
        }
        .animate-marquee-horizontal:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full flex flex-col items-center">
        
        
        <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto flex flex-col items-center text-center mb-12">
          
          <EyebrowBadge>Testimonials</EyebrowBadge>


          
          <motion.h2 
            className="text-[clamp(2.2rem,5vw,3.3rem)] font-sans font-semibold leading-[1.15] text-zinc-950 tracking-tight mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What our clients are <span className="text-[#5c43fd]">saying</span>
          </motion.h2>

          
          <motion.p 
            className="text-zinc-500 text-[1.05rem] leading-[1.6] max-w-[600px]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our performance marketing playbook is transforming the way D2C founders scale. Here's what some of our partners have to say about their experience.
          </motion.p>
        </div>

        {/* Full-width Horizontal Testimonials Marquee Row */}
        <div 
          className="w-full overflow-hidden relative select-none"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)"
          }}
        >
          {/* Scrolling track */}
          <div className="flex gap-6 animate-marquee-horizontal py-4 w-max">
            {triplicatedTestimonials.map((item, idx) => (
              <div 
                key={item.id + "-" + idx}
                className="w-[360px] md:w-[390px] shrink-0 p-6.5 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between gap-5 hover:border-[#5c43fd]/20 transition-all duration-300 cursor-pointer text-left hover:-translate-y-0.5"
              >
                {/* Top user profile & stars rating */}
                <div className="flex items-center gap-3.5">
                  {/* Avatar circle */}
                  <div className={`w-10 h-10 rounded-full ${item.avatarBg} text-white flex items-center justify-center font-bold text-[0.88rem] shadow-sm`}>
                    {item.initial}
                  </div>
                  {/* Name, Role & Stars block */}
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-[0.95rem] font-bold text-zinc-950 leading-none">{item.name}</span>
                    <span className="text-[0.72rem] text-zinc-400 font-medium leading-none">{item.role}</span>
                    {/* Rating stars stack */}
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {Array.from({ length: item.rating }).map((_, sIdx) => (
                        <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Body text feedback */}
                <p className="text-zinc-500 text-[0.92rem] leading-[1.6] my-0 flex-1">
                  "{item.text}"
                </p>

                {/* Date footer */}
                <span className="text-[0.78rem] text-zinc-400 font-sans font-medium">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
