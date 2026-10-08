import type { MetadataRoute } from "next";
import { site, navItems } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Several nav items can share a page (Donations points at Contact for now).
  const hrefs = [...new Set(navItems.map((item) => item.href))];
  return hrefs.map((href) => ({
    url: `${site.url}${href === "/" ? "" : href}`,
    lastModified: now,
    changeFrequency: href === "/" ? "weekly" : "monthly",
    priority: href === "/" ? 1 : 0.7,
  }));
}
