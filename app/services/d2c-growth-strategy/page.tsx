import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { D2CGrowthStrategy } from "@/components/services/D2CGrowthStrategy";
import { StrategyPopup } from "@/components/StrategyPopup";
import { getService } from "@/lib/services";

const SITE_URL = "https://www.adsofstupid.com";
const service = getService("d2c-growth-strategy")!;
const url = `/services/${service.slug}`;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: service.keywords,
  alternates: { canonical: url },
  openGraph: {
    title: `${service.metaTitle} | Ads of Stupid`,
    description: service.metaDescription,
    url: `${SITE_URL}${url}`,
    siteName: "Ads of Stupid",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: service.ogAlt }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${service.metaTitle} | Ads of Stupid`,
    description: service.metaDescription,
    images: ["/og-image.png"]
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.metaTitle,
  serviceType: service.navLabel,
  url: `${SITE_URL}${url}`,
  description: service.metaDescription,
  provider: { "@type": "Organization", name: "Ads of Stupid", url: SITE_URL },
  areaServed: { "@type": "Country", name: "India" },
  audience: { "@type": "Audience", audienceType: "D2C founders and e-commerce brands" }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    { "@type": "ListItem", position: 3, name: service.navLabel, item: `${SITE_URL}${url}` }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: service.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a }
  }))
};

export default function D2CGrowthStrategyPage() {
  return (
    <div className="min-h-screen bg-surface-main" style={{ ["--accent" as string]: service.accent }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader />
      <D2CGrowthStrategy />
      <Footer />
      <StrategyPopup />
    </div>
  );
}
