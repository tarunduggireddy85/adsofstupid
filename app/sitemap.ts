import type { MetadataRoute } from "next";
import { readBlogs } from "@/lib/db";
import { SERVICE_SLUGS } from "@/lib/services";

const SITE_URL = "https://www.adsofstupid.com";

// Refresh hourly so new published posts enter the sitemap without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 }
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await readBlogs();
    blogRoutes = blogs
      .filter((post) => post.status === "Published")
      .map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.publishDate ? new Date(post.publishDate) : new Date(post.createdAt),
        changeFrequency: "monthly",
        priority: 0.6
      }));
  } catch {
    // If blogs can't be read at build time, ship the rest of the sitemap anyway.
    blogRoutes = [];
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
