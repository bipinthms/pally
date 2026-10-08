"use client";

import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { GalleryClient } from "@/components/gallery/gallery-client";
import { useLocale } from "@/lib/i18n/provider";
import { getData } from "@/lib/data";


export function GalleryContent() {
  const { locale, t } = useLocale();
  const { videos } = getData(locale);

  const sections = [
    { id: "photos", label: t.sections.photos },
    ...(videos.length > 0 ? [{ id: "videos", label: t.sections.videos }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow={t.gallery.heroEyebrow}
        title={t.gallery.heroTitle}
        description={t.gallery.heroDesc}
        verse={t.gallery.heroVerse}
        imageKey="ornateCeiling"
        crumbs={[{ label: t.nav.gallery.label }]}
        sections={sections}
      />

      <section id="photos" className="section-y">
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
