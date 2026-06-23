import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { AboutContent } from "@/components/about/AboutContent";
import { StrategyPopup } from "@/components/StrategyPopup";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet Ads of Stupid — a D2C performance marketing agency in Pune. Our origin story, the six rules we don't break, and the growth system we run for every brand.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-main">
      <SiteHeader />
      <AboutContent />
      <BlogFooter />
      <StrategyPopup />
    </div>
  );
}
