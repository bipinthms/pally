"use client";

import Image from "next/image";
import { CalendarDays, MapPin, Clock, Newspaper } from "lucide-react";

import { image } from "@/lib/images";
import { site } from "@/lib/site";
import { getData, type ChurchEvent } from "@/lib/data";
import { formatDateRange, dateParts, monthYearLabel } from "@/lib/format";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { EventsClient } from "@/components/events/events-client";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/i18n/provider";


export function EventsContent({ today }: { today: string }) {
  const { locale, t } = useLocale();
  const { events } = getData(locale);

  // `today` comes from the server so the build output and the hydrated page agree.
  const now = new Date(today);

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter((e) => new Date(e.endDate ?? e.date) >= now);
  const past = sorted.filter((e) => new Date(e.endDate ?? e.date) < now).reverse();

  const grouped = upcoming.reduce<Record<string, ChurchEvent[]>>((acc, e) => {
    const key = monthYearLabel(e.date, locale);
    (acc[key] ??= []).push(e);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow={t.events.heroEyebrow}
        title={t.events.heroTitle}
        description={t.events.heroDesc}
        verse={t.events.heroVerse}
        imageKey="celebration"
        crumbs={[{ label: t.nav.events.label }]}
      />

      {/* Parish news (past) */}
      {past.length > 0 && (
        <section className="section-y">
          <div className="container-x">
            <SectionHeading eyebrow={t.events.newsEyebrow} title={t.events.newsTitle} subtitle={t.events.newsSubtitle} />
            <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
              {past.map((e) => (
                <RevealItem key={e.slug}>
                  <article className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={image(e.image, { w: 700, q: 66 })}
                        alt={e.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <Badge variant="gold" className="absolute left-4 top-4 bg-card/90 backdrop-blur">
                        <Newspaper className="size-3.5" />
                        {t.cats.events[e.category] ?? e.category}
                      </Badge>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xs text-muted-foreground">{formatDateRange(e.date, e.endDate, locale)}</span>
                      <h3 className="mt-2 font-serif text-lg font-semibold leading-snug">{e.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{e.excerpt}</p>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
      {/* Upcoming (filterable) */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.events.upcomingEyebrow} title={t.events.upcomingTitle} subtitle={t.events.upcomingSubtitle} />
          <div className="mt-14">
            {upcoming.length > 0 ? (
              <EventsClient events={upcoming} />
            ) : (
              <p className="text-center text-muted-foreground">{t.events.noUpcoming}</p>
            )}
          </div>
        </div>
      </section>

      {/* Calendar / agenda */}
      {Object.keys(grouped).length > 0 && (
        <section className="section-y bg-secondary/40">
          <div className="container-x">
            <SectionHeading eyebrow={t.events.calEyebrow} title={t.events.calTitle} subtitle={t.events.calSubtitle} />
            <div className="mx-auto mt-14 max-w-3xl space-y-10">
              {Object.entries(grouped).map(([month, list]) => (
                <Reveal key={month}>
                  <div>
                    <h3 className="mb-4 flex items-center gap-3 font-serif text-xl font-semibold text-primary">
                      <CalendarDays className="size-5 text-gold-500" />
                      {month}
                    </h3>
                    <ul className="overflow-hidden rounded-2xl border border-border bg-card">
                      {list.map((e) => {
                        const { day, month: mon } = dateParts(e.date, locale);
                        return (
                          <li key={e.slug} className="flex items-center gap-4 border-b border-border p-4 last:border-0 transition-colors hover:bg-accent/50">
                            <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-center">
                              <span className="font-serif text-lg font-bold leading-none text-primary">{day}</span>
                              <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-gold-700">{mon}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-medium">{e.title}</p>
                              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                  <Clock className="size-3.5 text-gold-500" />
                                  {e.time}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="size-3.5 text-gold-500" />
                                  {e.location}
                                </span>
                              </div>
                            </div>
                            <Badge variant="muted" className="hidden shrink-0 sm:inline-flex">
                              {t.cats.events[e.category] ?? e.category}
                            </Badge>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
