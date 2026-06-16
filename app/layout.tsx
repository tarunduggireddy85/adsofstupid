import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SmoothScroll } from "../components/SmoothScroll";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const title = "Performance Marketing Agency for D2C Brands in Pune | Ads of Stupid";
const description = "We're the performance marketing agency for early-stage D2C founders in Pune. Ads, funnels, strategy, retention - built for predictable, profitable sales.";

export const metadata: Metadata = {
  metadataBase: new URL("https://adsofstupid.com"),
  title,
  description,
  keywords: [
    "performance marketing agency",
    "performance marketing agency in Pune",
    "performance marketing agency for D2C brands",
    "D2C growth strategy Pune",
    "Meta ads agency Pune",
    "Shopify funnel optimization India"
  ],
  alternates: {
    canonical: "https://adsofstupid.com"
  },
  openGraph: {
    title: "Ads of Stupid - Performance Marketing Agency for D2C Brands",
    description: "You focus on the product. We focus on the profit. The performance marketing agency that runs the entire growth engine for early-stage D2C brands.",
    url: "https://adsofstupid.com",
    siteName: "Ads of Stupid",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ads of Stupid - Performance Marketing Agency for D2C Brands",
    description: "You focus on the product. We focus on the profit. The performance marketing agency that runs the entire growth engine for early-stage D2C brands."
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ads of Stupid",
  url: "https://adsofstupid.com",
  image: "https://adsofstupid.com/og-image.jpg",
  description,
  areaServed: "Pune, Maharashtra, India",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN"
  },
  email: "hello@adsofstupid.com",
  telephone: "+91 00000 00000"
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Performance marketing agency",
  provider: {
    "@type": "Organization",
    name: "Ads of Stupid"
  },
  areaServed: {
    "@type": "City",
    name: "Pune"
  },
  audience: {
    "@type": "Audience",
    audienceType: "Early-stage D2C founders"
  },
  description: "Performance marketing agency for early-stage D2C brands in Pune covering research, strategy, acquisition, conversion, and scale."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusJakarta.variable} suppressHydrationWarning>
        <SmoothScroll />

        <Script
          id="ads-of-stupid-local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema)
          }}
        />
        <Script
          id="ads-of-stupid-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema)
          }}
        />
        {children}
      </body>
    </html>
  );
}
