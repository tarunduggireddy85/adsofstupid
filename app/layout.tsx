import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SmoothScroll } from "../components/SmoothScroll";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://www.adsofstupid.com";

const homeTitle = "D2C Performance Marketing Agency India | Ads of Stupid";
const homeDescription =
  "Performance marketing for D2C founders in India. 13× ROAS, ₹30L+ ad spend managed. We decode the science behind the sale. Book a free strategy call.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeTitle,
    template: "%s | Ads of Stupid"
  },
  description: homeDescription,
  keywords: [
    "d2c marketing agency",
    "performance marketing agency",
    "d2c marketing india",
    "meta ads agency",
    "google ads agency",
    "d2c growth",
    "ecommerce marketing",
    "shopify ads",
    "performance marketing pune",
    "ads of stupid"
  ],
  alternates: {
    canonical: "/"
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: SITE_URL,
    siteName: "Ads of Stupid",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ads of Stupid — D2C performance marketing agency in India"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/og-image.png"]
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ads of Stupid",
  url: SITE_URL,
  logo: `${SITE_URL}/Ads-of-Stupid-logo.png`,
  image: `${SITE_URL}/og-image.png`,
  description: homeDescription,
  email: "hello@adsofstupid.com",
  telephone: "+91 85306 39877",
  sameAs: [
    "https://www.instagram.com/adsofstupid/",
    "https://www.facebook.com/people/Ads-of-Stupid/61575891251614/",
    "https://www.linkedin.com/company/adsofstupid/",
    "https://www.youtube.com/@adsofstupid"
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ads of Stupid",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  description: homeDescription,
  areaServed: "Pune, Maharashtra, India",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN"
  },
  email: "hello@adsofstupid.com",
  telephone: "+91 85306 39877"
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
      <body className={`${plusJakarta.variable} ${playfair.variable}`} suppressHydrationWarning>
        <SmoothScroll />

        <Script
          id="ads-of-stupid-organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
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
