import type { Metadata } from "next";
import { eventJsonLd, pageMetadata } from "@/lib/seo";
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
      item: eventJsonLd(e),
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
