import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eventJsonLd, pageMetadata } from "@/lib/seo";
import { getData } from "@/lib/data";
import { EventDetailContent } from "./content";

type Params = { params: Promise<{ slug: string }> };

// Static export: every event page is generated at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return getData("en").events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const event = getData("en").events.find((e) => e.slug === slug);
  if (!event) return {};
  return pageMetadata({ title: event.title, path: `/events/${slug}/`, description: event.excerpt });
}

export default async function EventPage({ params }: Params) {
  const { slug } = await params;
  const event = getData("en").events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", ...eventJsonLd(event) }),
        }}
      />
      <EventDetailContent slug={slug} />
    </>
  );
}
