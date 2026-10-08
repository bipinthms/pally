"use client";

import Image from "next/image";
import Link from "next/link";
import { Target, Eye, CalendarHeart, ArrowRight } from "lucide-react";

import { image } from "@/lib/images";
import { site } from "@/lib/site";
import { getData } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Ornament } from "@/components/ornament";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/provider";


export function AboutContent() {
  const { locale, t } = useLocale();
  const { missionVision, patronSaint, timeline } = getData(locale);

  const sections = [
    { id: "heritage", label: t.sections.heritage },
    { id: "mission-vision", label: t.sections.missionVision },
    { id: "patron-saint", label: t.sections.patron },
    { id: "journey", label: t.sections.journey },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.about.heroEyebrow}
        title={t.about.heroTitle}
        description={t.about.heroDesc}
        verse={t.about.heroVerse}
        imageKey="churchExterior"
        crumbs={[{ label: t.nav.about.label }]}
        sections={sections}
      />

      {/* Intro */}
      <section id="heritage" className="section-y">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)]">
              <Image
                src={image("cathedralArches", { w: 900, q: 70 })}
                alt={t.a11y.altArches}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="glass absolute -bottom-6 right-6 rounded-2xl px-6 py-4 text-center shadow-lg">
              <p className="font-serif text-3xl font-bold text-primary">{site.established}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {t.about.yearEstablished}
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading align="left" eyebrow={t.about.introEyebrow} title={t.about.introTitle} />
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>{t.about.introP1}</p>
              <p>{t.about.introP2}</p>
            </div>
            <Ornament width="w-40" className="mt-8 justify-start" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission-vision" className="section-y bg-secondary/40">
        <div className="container-x">
          <SectionHeading eyebrow={t.about.mvEyebrow} title={t.about.mvTitle} subtitle={t.about.mvSubtitle} />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Target className="size-7" />
                </span>
                <h3 className="mt-6 font-serif text-2xl font-semibold">{t.about.ourMission}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{missionVision.mission}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-700 dark:text-gold-400">
                  <Eye className="size-7" />
                </span>
                <h3 className="mt-6 font-serif text-2xl font-semibold">{t.about.ourVision}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{missionVision.vision}</p>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {missionVision.values.map((v) => (
              <RevealItem key={v.title}>
                <div className="card-hover flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-center">
                  <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon name={v.icon} className="size-5" />
                  </span>
                  <h4 className="mt-4 font-serif text-lg font-semibold">{v.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Patron Saint */}
      <section id="patron-saint" className="section-y">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-700 dark:text-gold-400">
              {patronSaint.title}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{patronSaint.name}</h2>
            <Badge variant="gold" className="mt-4">
              <CalendarHeart className="size-3.5" />
              {t.about.patronFeast} · {patronSaint.feast}
            </Badge>
            <p className="mt-6 leading-relaxed text-muted-foreground">{patronSaint.body}</p>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/events">
                {t.about.feastProgramme}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)] ring-1 ring-gold-500/20">
              <Image
                src={image(patronSaint.image, { w: 800, q: 72 })}
                alt={patronSaint.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/40 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section id="journey" className="section-y bg-brown-900 text-cream">
        <div className="container-x">
          <SectionHeading light eyebrow={t.about.timelineEyebrow} title={t.about.timelineTitle} subtitle={t.about.timelineSubtitle} />

          <div className="relative mx-auto mt-16 max-w-3xl">
            <span className="absolute left-4 top-0 h-full w-px bg-gold-500/30 md:left-1/2" />
            <div className="space-y-10">
              {timeline.map((tl, i) => {
                const left = i % 2 === 0;
                return (
                  <Reveal key={i} delay={i * 0.05}>
                    <div
                      className={`relative flex flex-col gap-4 pl-12 md:flex-row md:items-center md:pl-0 ${
                        left ? "md:justify-start" : "md:justify-end"
                      }`}
                    >
                      <span className="absolute left-4 top-2 z-10 size-4 -translate-x-1/2 rounded-full border-2 border-gold-400 bg-brown-900 md:left-1/2" />
                      <div className={`md:w-[46%] ${left ? "md:pr-8 md:text-right" : "md:pl-8 md:order-2"}`}>
                        <div className="rounded-2xl border border-cream/10 bg-white/5 p-6 backdrop-blur">
                          <span className="font-serif text-2xl font-bold text-gold-300">{tl.year}</span>
                          {tl.date && <span className="ml-2 text-xs font-medium uppercase tracking-wider text-gold-300/70">{tl.date}</span>}
                          <h3 className="mt-1 font-serif text-lg font-semibold text-cream">{tl.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-cream/70">{tl.body}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
