import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { ServicesHub } from "@/components/services/ServicesHub";
import { StrategyPopup } from "@/components/StrategyPopup";
import { SERVICES } from "@/lib/services";

const SITE_URL = "https://www.adsofstupid.com";

const title = "Our services";
const description =
  "What Ads of Stupid does for D2C brands in India: performance marketing, e-commerce store setup, and D2C growth strategy — three services, one growth system.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "d2c marketing services",
    "performance marketing",
    "ecommerce store setup",
    "d2c growth strategy",
    "d2c agency services india"
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${title} | Ads of Stupid`,
    description,
    url: `${SITE_URL}/services`,
    siteName: "Ads of Stupid",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ads of Stupid services" }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Ads of Stupid`,
    description,
    images: ["/og-image.png"]
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` }
  ]
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.navLabel,
    description: s.tagline,
    url: `${SITE_URL}/services/${s.slug}`
  }))
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-surface-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <SiteHeader />
      <ServicesHub />
      <Footer />
      <StrategyPopup />
    </div>
  );
}
