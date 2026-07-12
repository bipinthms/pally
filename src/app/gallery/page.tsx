import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { GalleryClient } from "@/components/gallery/gallery-client";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A gallery of worship, feasts and fellowship at Alencherry Pally — browse photographs by category and watch highlights from parish celebrations.",
};

export default async function GalleryPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.gallery.heroEyebrow}
        title={t.gallery.heroTitle}
        description={t.gallery.heroDesc}
        imageKey="ornateCeiling"
        crumbs={[{ label: t.nav.gallery.label }]}
      />

      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} subtitle={t.gallery.subtitle} />
          <div className="mt-14">
            <GalleryClient />
          </div>
        </div>
      </section>
    </>
  );
}
