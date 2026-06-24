import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { StrategyPopup } from "@/components/StrategyPopup";
import { getService, GENERIC_SERVICE_SLUGS } from "@/lib/services";

const SITE_URL = "https://www.adsofstupid.com";

export function generateStaticParams() {
  // Bespoke services (e.g. performance-marketing) have their own route folder.
  return GENERIC_SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const url = `/services/${service.slug}`;
  return {
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
}

export default async function ServicePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const url = `${SITE_URL}/services/${service.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.metaTitle,
    serviceType: service.navLabel,
    url,
    description: service.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Ads of Stupid",
      url: SITE_URL
    },
    areaServed: { "@type": "Country", name: "India" },
    audience: { "@type": "Audience", audienceType: "D2C founders and e-commerce brands" }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.navLabel, item: url }
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

  return (
    <div className="min-h-screen bg-surface-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader />
      <ServiceDetail service={service} />
      <BlogFooter />
      <StrategyPopup />
    </div>
  );
}
