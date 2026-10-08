"use client";

import { Landmark, Smartphone, Globe, HeartHandshake, ShieldCheck } from "lucide-react";

import { site } from "@/lib/site";
import { getData } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/provider";


export function DonationsContent({ qrSvg }: { qrSvg: string }) {
  const { locale, t } = useLocale();
  const { giving } = getData(locale);

  const bankRows: { label: string; value: string; copy?: boolean }[] = [
    { label: t.donations.accountName, value: giving.bank.accountName },
    { label: t.donations.accountNumber, value: giving.bank.accountNumber, copy: true },
    { label: t.donations.bank, value: giving.bank.bank },
    { label: t.donations.branch, value: giving.bank.branch },
    { label: t.donations.ifsc, value: giving.bank.ifsc, copy: true },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.donations.heroEyebrow}
        title={t.donations.heroTitle}
        description={t.donations.heroDesc}
        verse={t.donations.heroVerse}
        imageKey="churchAlt"
        crumbs={[{ label: t.nav.donations.label }]}
      />

      {/* Purposes */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.donations.purposesEyebrow} title={t.donations.purposesTitle} subtitle={giving.intro} />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {giving.purposes.map((p) => (
              <RevealItem key={p.title}>
                <div className="card-hover flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-center">
                  <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon name={p.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Ways to give */}
      <section className="section-y bg-secondary/40">
        <div className="container-x">
          <SectionHeading eyebrow={t.donations.waysEyebrow} title={t.donations.waysTitle} subtitle={t.donations.waysSubtitle} />

          <div className="mt-14 grid gap-6 lg:grid-cols-3 [&>*]:min-w-0">
            {/* UPI / QR */}
            <Reveal>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 text-center">
                <div className="mx-auto flex items-center gap-2 text-primary">
                  <Smartphone className="size-5" />
                  <h3 className="font-serif text-xl font-semibold">{t.donations.upiTitle}</h3>
                </div>
                <div
                  className="mx-auto mt-6 w-44 rounded-2xl bg-white p-4 shadow-sm [&_svg]:h-auto [&_svg]:w-full"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                  aria-label={t.a11y.upiQr}
                  role="img"
                />
                <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">{t.donations.upiId}</p>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <span className="font-mono text-sm font-medium">{giving.upiId}</span>
                  <CopyButton value={giving.upiId} />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">{t.donations.upiNote}</p>
              </div>
            </Reveal>

            {/* Bank transfer */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                <div className="flex items-center gap-2 text-primary">
                  <Landmark className="size-5" />
                  <h3 className="font-serif text-xl font-semibold">{t.donations.bankTitle}</h3>
                </div>
                <dl className="mt-6 space-y-3.5">
                  {bankRows.map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <dt className="text-xs uppercase tracking-wide text-muted-foreground">{r.label}</dt>
                        <dd className="truncate font-medium">{r.value}</dd>
                      </div>
                      {r.copy && <CopyButton value={r.value.replace(/\s/g, "")} />}
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {/* Online / in person */}
            <Reveal delay={0.2}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                <div className="flex items-center gap-2 text-primary">
                  <Globe className="size-5" />
                  <h3 className="font-serif text-xl font-semibold">{t.donations.onlineTitle}</h3>
                </div>
                <p className="mt-6 flex-1 leading-relaxed text-muted-foreground">{t.donations.onlineBody}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild variant="gold">
                    <a href={`mailto:${site.contact.email}?subject=Online%20Giving`}>
                      <HeartHandshake className="size-4" />
                      {t.donations.requestLink}
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={`tel:${site.contact.phoneHref}`}>{t.common.callOffice}</a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-5 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-gold-700 dark:text-gold-400" />
            <p>{t.donations.assurance}</p>
          </div>
        </div>
      </section>
    </>
  );
}
