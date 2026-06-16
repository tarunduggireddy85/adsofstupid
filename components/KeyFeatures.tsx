"use client";

import { motion } from "framer-motion";
import { 
  ArrowRightLeft, 
  Smartphone, 
  Headphones, 
  PenTool,
} from "lucide-react";
import { EyebrowBadge } from "./ui/EyebrowBadge";
import { PhoneMockup } from "./ui/PhoneMockup";
import { DashboardPreview, TransactionItem } from "./ui/DashboardPreview";

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

export function KeyFeatures() {
  
  const features = [
    {
      id: "feature-1",
      icon: <ArrowRightLeft className="w-5.5 h-5.5" />,
      title: "Flexible Campaign Transfer",
      description: "Easily import and export campaign metrics to and from our platform."
    },
    {
      id: "feature-2",
      icon: <Smartphone className="w-5.5 h-5.5" />,
      title: "Personalized ROI Reports",
      description: "Create and customize ROI reports tailored to your brand's growth needs."
    },
    {
      id: "feature-3",
      icon: <Headphones className="w-5.5 h-5.5" />,
      title: "Dedicated Expert Support",
      description: "Our performance marketing specialists are available 24/7 to assist."
    },
    {
      id: "feature-4",
      icon: <PenTool className="w-5.5 h-5.5" />,
      title: "Custom Strategy Tools",
      description: "Formulate and track marketing strategy funnels tailored to your target CAC."
    }
  ];

  
  const transactionItems: TransactionItem[] = [
    { id: 1, name: "North Faxe", date: "August 30, 2024", amount: "+$200", isPositive: true },
    { id: 2, name: "North Faxe", date: "August 27, 2024", amount: "-$400", isPositive: false },
    { id: 3, name: "North Faxe", date: "August 30, 2024", amount: "+$200", isPositive: true },
    { id: 4, name: "North Faxe", date: "August 27, 2024", amount: "-$400", isPositive: false }
  ];

  return (
    <section className="bg-transparent py-16 scroll-mt-28 w-full overflow-hidden" id="key-features">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        
        <div className="lg:col-span-7 flex flex-col items-start">
          
          <EyebrowBadge>Key Features</EyebrowBadge>

          
          <motion.h2 
            className="text-[clamp(2.2rem,5vw,3.3rem)] font-sans font-semibold leading-[1.15] text-zinc-950 tracking-tight mb-14"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Boost your finances <br className="hidden sm:inline" />
            with <span className="text-[#5c43fd]">Ads of Stupid</span>
          </motion.h2>

          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.1, once: true }}
            variants={containerVariants}
          >
            {features.map((feature) => (
              <motion.article 
                key={feature.id} 
                className="flex flex-col items-start p-6 md:p-7 rounded-2xl bg-white border border-zinc-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:border-[#5c43fd]/20 hover:shadow-[0_12px_40px_rgba(92,67,253,0.04)] hover:-translate-y-0.5 transition-all duration-300 group text-left"
                variants={itemVariants}
              >
                
                <div className="w-11 h-11 rounded-full bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center transition-all duration-300 group-hover:bg-[#5c43fd] group-hover:text-white shadow-xs">
                  {feature.icon}
                </div>
                
                <h3 className="text-[1.25rem] font-bold text-zinc-950 tracking-tight mt-5 leading-none">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-[0.92rem] leading-[1.6] mt-3.5 max-w-[280px]">
                  {feature.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        
        <div className="lg:col-span-5 flex justify-center lg:justify-end select-none w-full relative">
          
          
          <div 
            className="relative w-full max-w-[340px] h-[580px] overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)"
            }}
          >
            <PhoneMockup 
              maxHeightClass="h-[580px]" 
              maxWidthClass="max-w-[340px]"
            >
              <DashboardPreview transactions={transactionItems} />
            </PhoneMockup>
          </div>
        </div>

      </div>
    </section>
  );
}

export default KeyFeatures;
