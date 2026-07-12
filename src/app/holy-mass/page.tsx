import type { Metadata } from "next";
import { Sun, Sunrise, Info, type LucideIcon } from "lucide-react";

import { getData, type MassSlot } from "@/lib/data";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Holy Mass Timings",
  description:
    "Sunday and weekday Holy Mass timings, confession, Eucharistic adoration and special feast schedules at Alencherry Pally, a Syro-Malabar Catholic church.",
};

function MassTable({
  title,
  icon: IconCmp,
  slots,
  accent,
}: {
  title: string;
  icon: LucideIcon;
  slots: MassSlot[];
  accent: string;
}) {
  return (
    <Card className="h-full overflow-hidden">
      <div className={`flex items-center gap-3 bg-gradient-to-r ${accent} px-6 py-5 text-cream`}>
        <IconCmp className="size-6 text-gold-200" />
        <h3 className="font-serif text-xl font-semibold">{title}</h3>
      </div>
      <ul className="divide-y divide-border">
        {slots.map((slot, i) => (
          <li key={`${slot.day}-${i}`} className="flex items-center justify-between gap-4 px-6 py-4">
            <span className="flex flex-col">
              <span className="font-medium">{slot.day}</span>
              {slot.note && <span className="text-xs text-muted-foreground">{slot.note}</span>}
            </span>
            <span className="flex flex-wrap justify-end gap-1.5">
              {slot.times.map((t) => (
                <Badge key={t} variant="gold">{t}</Badge>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default async function HolyMassPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const { sundayMass, weekdayMass, devotions, specialSchedules } = getData(locale);

  return (
    <>
      <PageHero
        eyebrow={t.mass.heroEyebrow}
        title={t.mass.heroTitle}
        description={t.mass.heroDesc}
        imageKey="churchWide"
        crumbs={[{ label: t.nav.holyMass.label }]}
      />

      {/* Weekly schedule */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.mass.weeklyEyebrow} title={t.mass.weeklyTitle} subtitle={t.mass.weeklySubtitle} />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <MassTable title={t.mass.sundayHolyMass} icon={Sun} slots={sundayMass} accent="from-maroon-700 to-maroon-900" />
            </Reveal>
            <Reveal delay={0.1}>
              <MassTable title={t.mass.weekdayHolyMass} icon={Sunrise} slots={weekdayMass} accent="from-gold-600 to-gold-800" />
            </Reveal>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-5 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-5 shrink-0 text-gold-600 dark:text-gold-400" />
            <p>{t.mass.infoNote}</p>
          </div>
        </div>
      </section>

      {/* Devotions */}
      <section className="section-y bg-secondary/40">
        <div className="container-x">
          <SectionHeading eyebrow={t.mass.devEyebrow} title={t.mass.devTitle} subtitle={t.mass.devSubtitle} />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2">
            {devotions.map((dv) => (
              <RevealItem key={dv.title}>
                <div className="card-hover flex h-full gap-5 rounded-2xl border border-border bg-card p-6">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon name={dv.icon} className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold">{dv.title}</h3>
                    <p className="mt-1 font-medium text-primary">{dv.detail}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dv.extra}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Special schedules */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.mass.specialEyebrow} title={t.mass.specialTitle} subtitle={t.mass.specialSubtitle} />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
            {specialSchedules.map((s) => (
              <RevealItem key={s.occasion}>
                <div className="card-hover flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-serif text-lg font-semibold leading-snug">{s.occasion}</h3>
                    <Badge variant="maroon" className="shrink-0">{s.dates}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
