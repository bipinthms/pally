import type { MetadataRoute } from "next";
import { site, navItems } from "@/lib/site";
import { getData } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Nav items could share a page; list each page once.
  const hrefs = [...new Set(navItems.map((item) => item.href))];
  const pages: MetadataRoute.Sitemap = hrefs.map((href) => ({
    // Match the exported URLs (trailingSlash: true) and the canonical links.
    url: `${site.url}${href === "/" ? "/" : `${href}/`}`,
    lastModified: now,
    changeFrequency: href === "/" ? "weekly" : "monthly",
    priority: href === "/" ? 1 : 0.7,
  }));
  const events: MetadataRoute.Sitemap = getData("en").events.map((e) => ({
    url: `${site.url}/events/${e.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));
  return [...pages, ...events];
}
