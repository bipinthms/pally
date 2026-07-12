import type { Metadata } from "next";
import Image from "next/image";
import { Quote, History } from "lucide-react";

import { image } from "@/lib/images";
import { getData, type Clergy } from "@/lib/data";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Ornament } from "@/components/ornament";

export const metadata: Metadata = {
  title: "Our Clergy",
  description:
    "Meet the priests who shepherd Alencherry Pally — our parish priest, assistant priest, and the former vicars who have served our community.",
};

function ClergyFeature({ person, flip = false }: { person: Clergy; flip?: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <Reveal className={`relative mx-auto w-full max-w-sm ${flip ? "lg:order-2" : ""}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)] ring-1 ring-gold-500/20">
          <Image
            src={image(person.image, { w: 700, q: 72 })}
            alt={person.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-900/50 to-transparent" />
        </div>
        <div className="glass absolute -bottom-5 left-1/2 w-[86%] -translate-x-1/2 rounded-2xl px-5 py-3 text-center shadow-lg">
          <p className="font-serif text-lg font-semibold text-foreground">{person.name}</p>
          <p className="text-xs text-gold-600 dark:text-gold-400">{person.role}</p>
        </div>
      </Reveal>

      <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
        <Badge variant="gold">{person.role}</Badge>
        {person.since && <p className="mt-3 text-sm text-muted-foreground">{person.since}</p>}
        <h3 className="mt-2 font-serif text-3xl font-semibold">{person.name}</h3>
        {person.quote && (
          <div className="mt-6 rounded-2xl border-l-2 border-gold-400 bg-secondary/40 p-5">
            <Quote className="size-6 text-gold-400/60" />
            <p className="mt-2 font-serif text-lg italic leading-relaxed">{person.quote}</p>
          </div>
        )}
        <p className="mt-6 leading-relaxed text-muted-foreground">{person.bio}</p>
      </Reveal>
    </div>
  );
}

export default async function ClergyPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const { parishPriest, assistantPriest, formerVicars } = getData(locale);

  return (
    <>
      <PageHero
        eyebrow={t.clergy.heroEyebrow}
        title={t.clergy.heroTitle}
        description={t.clergy.heroDesc}
        imageKey="churchWarm"
        crumbs={[{ label: t.nav.clergy.label }]}
      />

      <section className="section-y">
        <div className="container-x space-y-24">
          <ClergyFeature person={parishPriest} />
          <ClergyFeature person={assistantPriest} flip />
        </div>
      </section>

      {/* Former vicars */}
      <section className="section-y bg-secondary/40">
        <div className="container-x">
          <SectionHeading eyebrow={t.clergy.formerEyebrow} title={t.clergy.formerTitle} subtitle={t.clergy.formerSubtitle} />
          <RevealGroup className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            {formerVicars.map((v) => (
              <RevealItem key={v.name}>
                <div className="card-hover flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <History className="size-5" />
                  </span>
                  <div>
                    <p className="font-serif text-lg font-semibold leading-snug">{v.name}</p>
                    <p className="text-sm text-muted-foreground">{v.years}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-12 flex justify-center">
            <Ornament width="w-52" />
          </div>
        </div>
      </section>
    </>
  );
}
