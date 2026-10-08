import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { image } from "@/lib/images";
import { site } from "@/lib/site";
import { getData } from "@/lib/data";
import { EventsContent } from "./content";

export const metadata: Metadata = pageMetadata({
  title: "Events & News",
  path: "/events/",
  description:
    "Upcoming feasts, celebrations and parish news at St. Mary's Church, Alencherry, with a calendar of the events in the life of our community.",
});

export default function EventsPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = getData("en")
    .events.filter((e) => new Date(e.endDate ?? e.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Structured data for search engines stays in English.
  const eventsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: upcoming.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: e.title,
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
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <EventsContent today={today.toISOString()} />
    </>
  );
}
