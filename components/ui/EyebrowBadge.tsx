"use client";

import React from "react";
import { motion } from "framer-motion";

interface EyebrowBadgeProps {
  children: React.ReactNode;
  className?: string;
  animatePulse?: boolean;
}

export function EyebrowBadge({
  children,
  className = "",
  animatePulse = false,
}: EyebrowBadgeProps) {
  return (
    <motion.div 
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#5c43fd]/20 bg-[#5c43fd]/6 text-[#5c43fd] font-semibold text-[0.82rem] tracking-wide mb-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <svg className={`w-3.5 h-3.5 fill-current ${animatePulse ? "animate-pulse" : ""}`} viewBox="0 0 24 24">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm0 20a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4zm-8-8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4 4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm20 0a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4z" />
      </svg>
      <span>{children}</span>
    </motion.div>
  );
}

export default EyebrowBadge;
