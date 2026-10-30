"use client";

import { ExternalLink, Download } from "lucide-react";

import { site } from "@/lib/site";
import { assetPath } from "@/lib/images";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/provider";


export function PrayerRequestsContent() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t.prayer.heroEyebrow}
        title={t.prayer.heroTitle}
        description={t.prayer.heroDesc}
        verse={t.prayer.heroVerse}
        imageKey="prayerBlessing"
        crumbs={[{ label: t.nav.prayer.label }]}
      />

      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath(site.prayerForm.qr)}
                alt={t.prayer.qrTitle}
                width={224}
                height={224}
                className="size-56 shrink-0 rounded-xl bg-white p-2"
              />
              <div className="min-w-0 text-center sm:text-left">
                <h2 className="font-serif text-2xl font-semibold leading-tight">{t.prayer.qrTitle}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t.prayer.qrBody}</p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:items-start">
                  <Button asChild size="lg">
                    <a href={site.prayerForm.url} target="_blank" rel="noopener noreferrer">
                      {t.prayer.qrOpen}
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                  <a
                    href={assetPath(site.prayerForm.qrPng)}
                    download="prayer-request-qr.png"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-2 hover:underline"
                  >
                    {t.prayer.qrDownload}
                    <Download className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
