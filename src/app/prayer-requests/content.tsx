"use client";

import { Clock, Users, ShieldCheck, Church, ExternalLink, Download } from "lucide-react";

import { site } from "@/lib/site";
import { assetPath } from "@/lib/images";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Ornament } from "@/components/ornament";
import { PrayerForm } from "@/components/prayer/prayer-form";
import { useLocale } from "@/lib/i18n/provider";


export function PrayerRequestsContent() {
  const { locale, t } = useLocale();

  const assurances =
    locale === "ml"
      ? [
          { icon: Church, title: "കുർബ്ബാനയിൽ ഓർക്കുന്നു", body: "വിശുദ്ധ കുർബ്ബാനയിൽ ബലിപീഠത്തിൽ നിയോഗങ്ങൾ സമർപ്പിക്കുന്നു." },
          { icon: Users, title: "പ്രാർത്ഥിക്കുന്ന കൂട്ടായ്മ", body: "ഞങ്ങളുടെ പ്രാർത്ഥനാ യോഗങ്ങൾ ഓരോ അപേക്ഷയ്ക്കും വേണ്ടി മാധ്യസ്ഥം വഹിക്കുന്നു." },
          { icon: ShieldCheck, title: "രഹസ്യമായി സൂക്ഷിക്കുന്നു", body: "നിങ്ങളുടെ അപേക്ഷ ഭക്തിയോടും വിവേകത്തോടും കൂടെ കൈകാര്യം ചെയ്യുന്നു." },
          { icon: Clock, title: "ദൈനംദിന പ്രാർത്ഥന", body: "ദിവസേനയുള്ള മാധ്യസ്ഥ്യ പ്രാർത്ഥനയിൽ നിയോഗങ്ങൾ ഓർക്കുന്നു." },
        ]
      : [
          { icon: Church, title: "Remembered at the Qurbana", body: "Intentions are lifted up at the altar during the Holy Qurbana." },
          { icon: Users, title: "A praying community", body: "Our Prayer Groups intercede for every request." },
          { icon: ShieldCheck, title: "Held in confidence", body: "Your request is treated with reverence and discretion." },
          { icon: Clock, title: "Daily prayer", body: "Intentions are remembered in daily intercessory prayer." },
        ];

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
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] [&>*]:min-w-0">
          <Reveal>
            <PrayerForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:pl-4">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-700 dark:text-gold-400">
                {t.prayer.sideEyebrow}
              </span>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">{t.prayer.sideTitle}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t.prayer.sideBody}</p>

              <Ornament width="w-40" className="my-8 justify-start" />

              <div className="grid gap-4 sm:grid-cols-2">
                {assurances.map((a) => (
                  <div key={a.title} className="rounded-2xl border border-border bg-card p-5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <a.icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-serif text-lg font-semibold">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetPath(site.prayerForm.qr)}
                  alt={t.prayer.qrTitle}
                  width={144}
                  height={144}
                  className="size-36 shrink-0 rounded-lg bg-white p-1"
                />
                <div className="min-w-0 text-center sm:text-left">
                  <h3 className="font-serif text-lg font-semibold">{t.prayer.qrTitle}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.prayer.qrBody}</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm sm:justify-start">
                    <a
                      href={site.prayerForm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-primary underline-offset-2 hover:underline"
                    >
                      {t.prayer.qrOpen}
                      <ExternalLink className="size-3.5" />
                    </a>
                    <a
                      href={assetPath(site.prayerForm.qrPng)}
                      download="prayer-request-qr.png"
                      className="inline-flex items-center gap-1 font-medium text-primary underline-offset-2 hover:underline"
                    >
                      {t.prayer.qrDownload}
                      <Download className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-5 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{t.prayer.urgentTitle}</p>
                <p className="mt-1">
                  {t.prayer.urgentBodyA}{" "}
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="font-medium text-primary underline-offset-2 hover:underline"
                  >
                    {site.contact.phone}
                  </a>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
