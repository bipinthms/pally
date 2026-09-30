import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Quote, History, UserRound, Users } from "lucide-react";

import { assetPath, image } from "@/lib/images";
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
    "Meet the priests who shepherd St. Mary's Church, Alayamon — our Catholicos, diocesan Metropolitan, parish priest, managing committee, and the former vicars who have served our community.",
};

// Some photos are optional — show a placeholder until they're added.
const hasPhoto = (file: string) => existsSync(path.join(process.cwd(), "public/images", file));
const hasCommitteePhoto = hasPhoto("commitee_members.jpg");

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
  const { prelates, parishPriest, managingCommittee, committeeMembers, formerVicars } = getData(locale);

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
        <div className="container-x">
          <RevealGroup className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
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

      {/* Managing committee */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.clergy.managingEyebrow} title={t.clergy.managingTitle} subtitle={t.clergy.managingSubtitle} />
          <RevealGroup className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
            {managingCommittee.map((m, i) => (
              <RevealItem key={`${m.role}-${i}`}>
                <div className="card-hover flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserRound className="size-6" />
                  </span>
                  <p className="mt-4 font-serif text-lg font-semibold leading-snug">{m.name}</p>
                  <p className="mt-1 text-sm text-gold-600 dark:text-gold-400">{m.role}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mx-auto mt-12 max-w-4xl">
            <h3 className="text-center font-serif text-2xl font-semibold">{t.clergy.membersTitle}</h3>
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)] ring-1 ring-gold-500/20">
              {hasCommitteePhoto ? (
                <Image
                  src={image("committeeMembers")}
                  alt={t.clergy.membersTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 56rem"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-primary/40">
                  <Users className="size-16" />
                </div>
              )}
            </div>
          </Reveal>

          <RevealGroup className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
            {committeeMembers.map((m) => (
              <RevealItem key={m.photo}>
                <div className="card-hover h-full overflow-hidden rounded-2xl border border-border bg-card text-center">
                  <div className="relative aspect-square bg-secondary/40">
                    {hasPhoto(m.photo) ? (
                      <Image
                        src={assetPath(`/images/${m.photo}`)}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12rem"
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
