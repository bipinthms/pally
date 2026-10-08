"use client";

import Image from "next/image";
import { UserRound, Users } from "lucide-react";

import { assetPath, image } from "@/lib/images";
import { getData } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { useLocale } from "@/lib/i18n/provider";

export function CommitteeContent({ photos }: { photos: string[] }) {
  const { locale, t } = useLocale();
  // Some photos are optional — show a placeholder until they're added.
  const hasPhoto = (file: string) => photos.includes(file);
  const hasCommitteePhoto = hasPhoto("committee/group.jpg");
  const { managingCommittee, committeeMembers, auditors } = getData(locale);

  const sections = [
    { id: "managing-committee", label: t.sections.managing },
    { id: "committee-members", label: t.sections.members },
    { id: "auditors", label: t.sections.auditors },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.committee.heroEyebrow}
        title={t.committee.heroTitle}
        description={t.committee.heroDesc}
        verse={t.committee.heroVerse}
        imageKey="gathering"
        crumbs={[{ label: t.nav.committee.label }]}
        sections={sections}
      />

      {/* Managing committee */}
      <section id="managing-committee" className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.committee.managingEyebrow} title={t.committee.managingTitle} subtitle={t.committee.managingSubtitle} />
          <RevealGroup className="mx-auto mt-14 grid max-w-2xl gap-4 sm:grid-cols-2">
            {managingCommittee.map((m, i) => (
              <RevealItem key={`${m.role}-${i}`}>
                {m.photo && hasPhoto(m.photo) ? (
                  <div className="card-hover relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card text-center">
                    <Image
                      src={assetPath(`/images/${m.photo}`)}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 18rem"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pb-5 pt-16">
                      <p className="font-serif text-lg font-semibold leading-snug text-white">{m.name}</p>
                      <p className="mt-1 text-sm text-gold-300">{m.role}</p>
                    </div>
                  </div>
                ) : (
                  <div className="card-hover flex aspect-[4/5] flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <UserRound className="size-6" />
                    </span>
                    <p className="mt-4 font-serif text-lg font-semibold leading-snug">{m.name}</p>
                    <p className="mt-1 text-sm text-gold-700 dark:text-gold-400">{m.role}</p>
                  </div>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Committee members */}
      <section id="committee-members" className="section-y bg-secondary/40">
        <div className="container-x">
          <SectionHeading eyebrow={t.committee.membersEyebrow} title={t.committee.membersTitle} subtitle={t.committee.membersSubtitle} />
          <Reveal className="mx-auto mt-14 max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)] ring-1 ring-gold-500/20">
              {hasCommitteePhoto ? (
                <Image
                  src={image("committeeMembers")}
                  alt={t.committee.membersTitle}
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

          <RevealGroup className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
            {committeeMembers.map((m) => (
              <RevealItem key={m.photo}>
                <div className="card-hover h-full overflow-hidden rounded-2xl border border-border bg-card text-center">
                  <div className="relative aspect-square bg-secondary/40">
                    {hasPhoto(m.photo) ? (
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
                    <p className="font-serif text-base font-semibold leading-snug">{m.name}</p>
                    {m.role && <p className="mt-0.5 text-xs text-gold-700 dark:text-gold-400">{m.role}</p>}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Auditors */}
      <section id="auditors" className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.committee.auditorsEyebrow} title={t.committee.auditorsTitle} subtitle={t.committee.auditorsSubtitle} />
          <RevealGroup className="mx-auto mt-14 grid max-w-md grid-cols-2 gap-4">
            {auditors.map((m) => (
              <RevealItem key={m.photo}>
                <div className="card-hover h-full overflow-hidden rounded-2xl border border-border bg-card text-center">
                  <div className="relative aspect-square bg-secondary/40">
                    {hasPhoto(m.photo) ? (
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
                  <p className="px-3 py-3 font-serif text-base font-semibold leading-snug">{m.name}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
