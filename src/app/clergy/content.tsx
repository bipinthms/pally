"use client";

import Image from "next/image";
import { Quote, History, UserRound } from "lucide-react";

import { assetPath, image } from "@/lib/images";
import { getData, type Clergy } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Ornament } from "@/components/ornament";
import { useLocale } from "@/lib/i18n/provider";



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

export function ClergyContent({ photos }: { photos: string[] }) {
  const { locale, t } = useLocale();
  // Some photos are optional — show a placeholder until they're added.
  const hasPhoto = (file: string) => photos.includes(file);
  const { prelates, parishPriest, sacristans, parishPriests, formerVicars } = getData(locale);

  const sections = [
    { id: "leadership", label: t.sections.leadership },
    { id: "sacristan", label: t.sections.sacristan },
    { id: "parish-priests", label: t.sections.parishPriests },
    { id: "former-vicars", label: t.sections.formerVicars },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.clergy.heroEyebrow}
        title={t.clergy.heroTitle}
        description={t.clergy.heroDesc}
        verse={t.clergy.heroVerse}
        imageKey="churchWarm"
        crumbs={[{ label: t.nav.clergy.label }]}
        sections={sections}
      />

      <section id="leadership" className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.clergy.prelatesEyebrow} title={t.clergy.prelatesTitle} subtitle={t.clergy.prelatesSubtitle} />
          <RevealGroup className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-2">
            {prelates.map((p) => (
              <RevealItem key={p.name}>
                <div className="text-center">
                  <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2rem] bg-card shadow-[var(--shadow-soft)] ring-1 ring-gold-500/20">
                    {hasPhoto(p.file) ? (
                      <Image
                        src={image(p.image)}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 20rem"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-primary/40">
                        <UserRound className="size-16" />
                      </div>
                    )}
                  </div>
                  <Badge variant="gold" className="mt-6">{p.title}</Badge>
                  <p className="mt-3 font-serif text-xl font-semibold leading-snug">{p.name}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="my-16 flex justify-center">
            <Ornament width="w-52" />
          </div>
          <ClergyFeature person={parishPriest} />
        </div>
      </section>

      {/* Sacrist */}
      <section id="sacristan" className="section-y bg-secondary/40">
        <div className="container-x">
          <SectionHeading eyebrow={t.clergy.sacristanEyebrow} title={t.clergy.sacristanTitle} subtitle={t.clergy.sacristanSubtitle} />
          <RevealGroup className="mx-auto mt-14 grid max-w-[14rem] gap-4">
            {sacristans.map((m) => (
              <RevealItem key={m.photo}>
                <div className="card-hover h-full overflow-hidden rounded-2xl border border-border bg-card text-center">
                  <div className="relative aspect-square bg-secondary/40">
                    {hasPhoto(m.photo) ? (
                      <Image
                        src={assetPath(`/images/${m.photo}`)}
                        alt={m.name}
                        fill
                        sizes="14rem"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-primary/40">
                        <UserRound className="size-10" />
                      </div>
                    )}
                  </div>
                  <p className="px-3 py-3 font-serif text-base font-semibold leading-snug">{m.name}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Parish priests */}
      <section id="parish-priests" className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.clergy.parishPriestsEyebrow} title={t.clergy.parishPriestsTitle} subtitle={t.clergy.parishPriestsSubtitle} />
          <RevealGroup className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
            {parishPriests.map((m) => (
              <RevealItem key={m.name}>
                <div className="card-hover h-full overflow-hidden rounded-2xl border border-border bg-card text-center">
                  <div className="relative aspect-square bg-secondary/40">
                    {m.photo && hasPhoto(m.photo) ? (
                      <Image
                        src={assetPath(`/images/${m.photo}`)}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 14rem"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-primary/40">
                        <UserRound className="size-10" />
                      </div>
                    )}
                  </div>
                  <div className="px-3 py-3">
                    {m.memorial && <p className="mb-0.5 text-xs italic text-muted-foreground">{t.clergy.inLovingMemory}</p>}
                    <p className="font-serif text-base font-semibold leading-snug">{m.name}</p>
                    {m.role && <p className="mt-0.5 text-xs text-gold-700 dark:text-gold-400">{m.role}</p>}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Former vicars */}
      <section id="former-vicars" className="section-y bg-secondary/40">
        <div className="container-x">
          <SectionHeading eyebrow={t.clergy.formerEyebrow} title={t.clergy.formerTitle} subtitle={t.clergy.formerSubtitle} />
          <RevealGroup className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            {formerVicars.map((v) => (
              <RevealItem key={`${v.name}-${v.years}`}>
                <div className="card-hover flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <History className="size-5" />
                  </span>
                  <div>
                    <p className="font-serif text-lg font-semibold leading-snug">{v.name}</p>
                    {v.note && <p className="text-sm italic text-muted-foreground">({v.note})</p>}
                    <p className="text-sm text-muted-foreground">
                      {v.role ? `${v.role} · ` : ""}
                      {v.years}
                    </p>
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
