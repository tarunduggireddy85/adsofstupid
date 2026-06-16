"use client";

import { motion } from "framer-motion";
import { EyebrowBadge } from "./ui/EyebrowBadge";

interface SectionHeaderProps {
  description: string;
  eyebrow: string;
  title: string;
}

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

export function SectionHeader({
  description,
  eyebrow,
  title
}: SectionHeaderProps) {
  return (
    <motion.div
      className="w-[min(760px,100%)] mx-auto text-center mb-12 flex flex-col items-center"
      initial="hidden"
      variants={containerVariants}
      viewport={{ amount: 0.25, once: true }}
      whileInView="show"
    >
      <div className="flex justify-center">
        <EyebrowBadge>{eyebrow}</EyebrowBadge>
      </div>
      <motion.h2
        className="mt-1 mb-4 font-sans text-[clamp(2.1rem,4.5vw,3rem)] leading-none tracking-[-0.035em] font-semibold text-brand-strong"
        variants={itemVariants}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-zinc-500 max-w-[48rem] mx-auto text-[1.05rem] leading-[1.7]"
        variants={itemVariants}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export default SectionHeader;
