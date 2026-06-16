"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Landmark, 
  Shuffle, 
  SlidersHorizontal,
  Users,
  BarChart3,
  TrendingUp
} from "lucide-react";
import React from "react";
import { EyebrowBadge } from "./ui/EyebrowBadge";
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

interface WorkflowCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  minHeightClass?: string;
}

function WorkflowCard({
  icon,
  title,
  description,
  children,
  minHeightClass = "min-h-[500px]"
}: WorkflowCardProps) {
  return (
    <motion.div 
      className={`p-8 rounded-xl bg-[#f8fafc] border border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between overflow-hidden group hover:border-[#5c43fd]/20 transition-all duration-300 ${minHeightClass} relative`}
      variants={itemVariants}
    >
      
      <div className="relative z-30 text-left">
        
        <div className="w-11 h-11 rounded-full bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center">
          {icon}
        </div>
        
        <h3 className="text-[1.75rem] font-bold text-zinc-950 tracking-tight mt-6 leading-none">
          {title}
        </h3>
        <p className="text-zinc-500 text-[0.98rem] leading-[1.6] mt-4 max-w-[420px]">
          {description}
        </p>
      </div>

      
      <div className="absolute bottom-[-16px] left-0 right-0 h-[280px] flex justify-center items-end pointer-events-none select-none z-10">
        {children}
      </div>

      
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent pointer-events-none z-20" />
    </motion.div>
  );
}

export function Workflow() {
  
  const avatars = [
    { bg: "bg-gradient-to-br from-[#8c76ff] to-[#5c43fd]", text: "A" },
    { bg: "bg-gradient-to-br from-pink-400 to-rose-500", text: "B" },
    { bg: "bg-gradient-to-br from-amber-400 to-orange-500", text: "C" },
    { bg: "bg-gradient-to-br from-emerald-400 to-teal-500", text: "D" },
  ];

  const manageTransactions: TransactionItem[] = [
    { id: 1, name: "North Faxe", date: "August 30, 2024", amount: "+$200", isPositive: true }
  ];

  
  const cardsData = [
    {
      id: "signup",
      icon: <User className="w-5.5 h-5.5" />,
      title: "Sign up and customize",
      description: "Create your account in minutes and tailor the platform to meet your company's unique financial needs.",
      minHeightClass: "min-h-[500px]",
      visual: (
        <div className="w-full max-w-[360px] p-6 rounded-2xl bg-white border border-zinc-100 shadow-[0_12px_36px_rgba(0,0,0,0.035)] flex flex-col gap-4 transform translate-y-2 group-hover:-translate-y-1 transition-transform duration-300 relative z-10">
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[0.78rem] font-bold text-zinc-800">Total Users</span>
          </div>

          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[1.55rem] font-extrabold text-zinc-950 block leading-none">20K+</span>
              <span className="text-[0.62rem] text-zinc-400 font-semibold mt-1 block">Users</span>
            </div>
            
            <div className="flex items-center -space-x-2">
              {avatars.map((avatar, idx) => (
                <div 
                  key={idx} 
                  className={`w-8 h-8 rounded-full ${avatar.bg} border-2 border-white flex items-center justify-center text-white text-[0.68rem] font-bold shadow-sm`}
                >
                  {avatar.text}
                </div>
              ))}
            </div>
          </div>

          
          <div className="border-t border-zinc-50 pt-3.5">
            <div className="flex items-center justify-between text-[0.72rem] font-semibold text-zinc-500 mb-1.5">
              <span>Monthly Users</span>
              <span className="text-zinc-800 font-bold">1K+</span>
            </div>
            
            <div className="h-4.5 p-0.5 rounded-lg bg-zinc-100 w-full overflow-hidden flex items-center">
              <div 
                className="h-full rounded-md bg-gradient-to-r from-[#8c76ff] to-[#5c43fd] flex items-center px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                style={{ width: "60%" }}
              >
                <span className="text-[0.5rem] text-white font-extrabold leading-none">60%</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "link",
      icon: <Landmark className="w-5.5 h-5.5" />,
      title: "Link Your Accounts",
      description: "Easily link your bank accounts, credit cards, loans, and investment accounts.",
      minHeightClass: "min-h-[500px]",
      visual: (
        <div className="w-full max-w-[420px] h-[230px] rounded-2xl bg-white border border-zinc-100 shadow-[0_12px_36px_rgba(0,0,0,0.035)] flex items-center justify-between px-6 relative overflow-hidden transform translate-y-2 group-hover:-translate-y-1 transition-transform duration-300">
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-zinc-200 stroke-[1.5]" viewBox="0 0 420 230">
            
            <path d="M78 55 C 130 55, 150 115, 210 115" fill="none" />
            <path d="M78 115 L 210 115" fill="none" />
            <path d="M78 175 C 130 175, 150 115, 210 115" fill="none" />
            
            <path d="M342 55 C 290 55, 270 115, 210 115" fill="none" />
            <path d="M342 115 L 210 115" fill="none" />
            <path d="M342 175 C 290 175, 270 115, 210 115" fill="none" />
          </svg>

          
          <div className="flex flex-col justify-between h-[160px] z-10">
            
            <div className="w-9 h-9 rounded-full bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 9c3 0 3 3 6 3s3-3 6-3 3 3 6 3" />
                <path d="M4 14c3 0 3 3 6 3s3-3 6-3 3 3 6 3" />
              </svg>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4zm-8-8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4z" />
              </svg>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M13 3l-5 8h4l-2 7 8-9h-4l3-6z" />
              </svg>
            </div>
          </div>

          
          <div className="w-14 h-14 rounded-full bg-[#5c43fd] flex items-center justify-center text-white shadow-[0_8px_24px_rgba(92,67,253,0.32)] z-10">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4zm-8-8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4z" />
            </svg>
          </div>

          
          <div className="flex flex-col justify-between h-[140px] z-10">
            
            <div className="w-9 h-9 rounded-full bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 9c3 0 3 3 6 3s3-3 6-3 3 3 6 3" />
                <path d="M4 14c3 0 3 3 6 3s3-3 6-3 3 3 6 3" />
              </svg>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4zm-8-8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4z" />
              </svg>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M13 3l-5 8h4l-2 7 8-9h-4l3-6z" />
              </svg>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "manage",
      icon: <Shuffle className="w-5.5 h-5.5" />,
      title: "Start Managing Efficiently",
      description: "Seamlessly connect your existing financial tools and import your data for a smooth transition.",
      minHeightClass: "min-h-[500px]",
      visual: (
        <div className="w-full max-w-[380px] p-5.5 rounded-2xl bg-white border border-zinc-100 shadow-[0_12px_36px_rgba(0,0,0,0.035)] flex flex-col gap-4 transform translate-y-2 group-hover:-translate-y-1 transition-transform duration-300 text-left">
          <DashboardPreview transactions={manageTransactions} />
        </div>
      )
    },
    {
      id: "integrate",
      icon: <SlidersHorizontal className="w-5.5 h-5.5" />,
      title: "Integrate Your Data",
      description: "Seamlessly connect your existing financial tools and import your data for a smooth transition.",
      minHeightClass: "min-h-[500px]",
      visual: (
        <div className="w-full max-w-[380px] p-6 rounded-2xl bg-white border border-zinc-100 shadow-[0_12px_36px_rgba(0,0,0,0.035)] flex flex-col gap-4 transform translate-y-2 group-hover:-translate-y-1 transition-transform duration-300">
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <span className="text-[0.78rem] font-bold text-zinc-800">Weekly Overview</span>
          </div>

          
          <div className="flex items-center justify-between border-b border-zinc-50 pb-2">
            <div className="text-left">
              <span className="text-[0.6rem] text-zinc-400 font-bold block leading-none">Amount</span>
              <span className="text-[1.35rem] font-black text-zinc-950 block mt-1.5 leading-none">$159.00</span>
            </div>
            
            <div className="flex items-center gap-0.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-extrabold text-[0.68rem]">
              <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+20%</span>
            </div>
          </div>

          
          <div className="flex items-end justify-between h-[85px] pt-1 px-2.5 select-none">
            {[
              { val: "h-8", active: false },
              { val: "h-12", active: false },
              { val: "h-20", active: true },
              { val: "h-10", active: false },
              { val: "h-16", active: false },
              { val: "h-24", active: true },
              { val: "h-11", active: false }
            ].map((bar, idx) => (
              <div 
                key={idx} 
                className={`w-7.5 rounded-t-md relative overflow-hidden transition-all duration-300 ${bar.val} ${
                  bar.active 
                    ? "bg-gradient-to-t from-[#5c43fd] to-[#8c76ff] shadow-sm" 
                    : "bg-zinc-100"
                }`}
              />
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="bg-transparent py-16 scroll-mt-28 w-full" id="workflow">
      <div className="w-[min(1200px,calc(100vw-2rem))] mx-auto flex flex-col items-center">
        
        <EyebrowBadge>Our workflow</EyebrowBadge>

        
        <motion.h2 
          className="text-[clamp(2.1rem,4.5vw,3.3rem)] font-sans font-semibold leading-[1.2] text-zinc-950 text-center tracking-tight max-w-[800px] mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          How our platform makes your <br className="hidden sm:inline" />
          workflow <span className="text-[#5c43fd]">easier</span>
        </motion.h2>

        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.08, once: true }}
          variants={containerVariants}
        >
          {cardsData.map((card) => (
            <WorkflowCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              description={card.description}
              minHeightClass={card.minHeightClass}
            >
              {card.visual}
            </WorkflowCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Workflow;
