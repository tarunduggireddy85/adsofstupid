"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Eye, 
  Zap, 
  Users 
} from "lucide-react";
import { EyebrowBadge } from "./ui/EyebrowBadge";
import { PhoneMockup } from "./ui/PhoneMockup";

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

interface ValueItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const LEFT_VALUES: ValueItem[] = [
  {
    id: "value-1",
    icon: <User className="w-5.5 h-5.5" />,
    title: "Customer Success",
    description: "Our customers are at the heart of everything we do. From onboarding to ongoing support, we're here to ensure our platform delivers real value and drives results."
  },
  {
    id: "value-2",
    icon: <Eye className="w-5.5 h-5.5" />,
    title: "Transparency",
    description: "We believe in clear communication, honest business practices, and providing our customers with the insights they need to make informed decisions."
  }
];

const RIGHT_VALUES: ValueItem[] = [
  {
    id: "value-3",
    icon: <Zap className="w-5.5 h-5.5" />,
    title: "Efficiency",
    description: "We're committed to helping businesses operate more efficiently by simplifying marketing processes and eliminating unnecessary complexity."
  },
  {
    id: "value-4",
    icon: <Users className="w-5.5 h-5.5" />,
    title: "Collaboration",
    description: "We believe that the best solutions come from working together. Whether it's within our team or with our customers, collaboration is key to our success."
  }
];

function ValueCard({ val }: { val: ValueItem }) {
  return (
    <motion.article 
      className="p-6.5 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:border-[#5c43fd]/20 transition-all duration-300 group flex flex-col items-start w-full text-left"
      variants={itemVariants}
    >
      
      <div className="w-10 h-10 rounded-full bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-[#5c43fd] group-hover:text-white shadow-sm">
        {val.icon}
      </div>
      
      <h3 className="text-[1.22rem] font-bold text-zinc-950 tracking-tight mt-4 leading-none">
        {val.title}
      </h3>
      <p className="text-zinc-500 text-[0.92rem] leading-[1.6] mt-3.5">
        {val.description}
      </p>
    </motion.article>
  );
}

export function CoreValues() {
  return (
    <section className="bg-transparent pt-16 pb-0 scroll-mt-28 w-full overflow-hidden" id="values">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto flex flex-col items-center">
        
        <EyebrowBadge>Our values</EyebrowBadge>

        
        <motion.h2 
          className="text-[clamp(2.1rem,4.5vw,3.3rem)] font-sans font-semibold leading-[1.2] text-zinc-950 text-center tracking-tight max-w-[800px] mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our core values Guide <br className="hidden sm:inline" />
          <span className="text-[#5c43fd]">everything</span>
        </motion.h2>

        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.08, once: true }}
          variants={containerVariants}
        >
          
          <div className="lg:col-span-4 flex flex-col gap-6 w-full lg:mb-12">
            {LEFT_VALUES.map((val) => (
              <ValueCard key={val.id} val={val} />
            ))}
          </div>

          
          <div className="lg:col-span-4 flex justify-center items-end select-none w-full relative">
            <PhoneMockup 
              maxHeightClass="h-[340px]" 
              maxWidthClass="max-w-[270px]" 
              borderWidthClass="border-[7px]" 
              roundedClass="rounded-t-[2.75rem]" 
              bezelClass="w-16 h-4.5"
            >
              
              <div className="flex-1 flex items-center justify-center relative z-10">
                <div className="relative w-36 h-36 rounded-full border border-dashed border-zinc-200 bg-white shadow-inner flex items-center justify-center">
                  <div className="relative">
                    
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#8c76ff] to-[#5c43fd] flex items-center justify-center text-white shadow-lg">
                      <svg className="w-6.5 h-6.5 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4zm-8-8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4z" />
                      </svg>
                    </div>

                    
                    <motion.div
                      className="absolute bottom-[-22px] right-[-32px] flex items-center gap-0.5 bg-[#5c43fd] text-white font-bold text-[0.52rem] px-2 py-0.5 rounded-full shadow-lg cursor-default leading-none"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    >
                      <svg className="w-2.5 h-2.5 fill-current rotate-45" viewBox="0 0 24 24">
                        <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
                      </svg>
                      <span>Ads of Stupid</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </PhoneMockup>
          </div>

          
          <div className="lg:col-span-4 flex flex-col gap-6 w-full lg:mb-12">
            {RIGHT_VALUES.map((val) => (
              <ValueCard key={val.id} val={val} />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
