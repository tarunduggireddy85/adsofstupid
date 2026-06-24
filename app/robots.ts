import type { MetadataRoute } from "next";

const SITE_URL = "https://www.adsofstupid.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the admin area and API routes out of search results.
      disallow: ["/admin", "/admin/", "/login", "/api/"]
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
