import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { AboutContent } from "@/components/about/AboutContent";
import { StrategyPopup } from "@/components/StrategyPopup";

const SITE_URL = "https://www.adsofstupid.com";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet Ads of Stupid — a D2C performance marketing agency in Pune. Our origin story, the six rules we don't break, and the growth system we run for every brand.",
  alternates: { canonical: "/about" }
};

/* Person + AboutPage schema. AI engines preferentially cite named humans with
   a clear role and affiliation — this makes the founder a recognisable entity. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tharun Duggireddy",
  jobTitle: "Founder",
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/founder.png`,
  worksFor: {
    "@type": "Organization",
    name: "Ads of Stupid",
    url: SITE_URL
  },
  knowsAbout: [
    "Performance marketing",
    "D2C growth strategy",
    "Meta Ads",
    "Google Ads",
    "E-commerce store setup",
    "Conversion rate optimisation"
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN"
  }
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}/about`,
  name: "About Ads of Stupid",
  description:
    "Meet Ads of Stupid — a D2C performance marketing agency in Pune. Our origin story, the six rules we don't break, and the growth system we run for every brand.",
  mainEntity: { "@type": "Organization", name: "Ads of Stupid", url: SITE_URL }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` }
  ]
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SiteHeader />
      <AboutContent />
      <BlogFooter />
      <StrategyPopup />
    </div>
  );
}
