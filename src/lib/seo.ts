import type { Metadata } from "next";
import { site } from "@/lib/site";
import { image } from "@/lib/images";
import type { ChurchEvent } from "@/lib/data";

/** 1200×630 share image (crop of the church exterior). */
export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: site.legalName };

/**
 * Metadata for an interior page. Next.js replaces (not merges) `openGraph` and
 * `twitter` from the layout, so each page sets its own share title, text and URL.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const shareTitle = `${title} · ${site.shortName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.legalName,
      url: path,
      title: shareTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [OG_IMAGE.url] },
  };
}

/** schema.org Event for a parish event (structured data stays in English). */
export function eventJsonLd(e: ChurchEvent) {
  return {
    "@type": "Event",
    name: e.title,
    url: `${site.url}/events/${e.slug}/`,
    startDate: e.date,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    description: e.excerpt,
    image: `${site.url}${image(e.image)}`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Anchal",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
    },
    organizer: { "@type": "Organization", name: site.legalName, url: site.url },
  };
}
