"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, Images, MapPin, type LucideIcon } from "lucide-react";

import { image } from "@/lib/images";
import { getData } from "@/lib/data";
import { formatDateRange, formatLongDate, dateParts, weekday } from "@/lib/format";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { PhotoAlbum } from "@/components/photo-album";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/provider";

export function EventDetailContent({ slug }: { slug: string }) {
  const { locale, t } = useLocale();
  const event = getData(locale).events.find((e) => e.slug === slug);
  if (!event) return null;

  const category = t.cats.events[event.category] ?? event.category;
  const dates = formatDateRange(event.date, event.endDate, locale);
  const sections = [
    { id: "details", label: t.sections.eventDetails },
    ...(event.schedule ? [{ id: "programme", label: t.sections.schedule }] : []),
    ...(event.album ? [{ id: "photos", label: t.sections.photos }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow={`${category} · ${dates}`}
        title={event.title}
        description={event.excerpt}
        imageKey={event.image}
        crumbs={[{ label: t.nav.events.label, href: "/events" }, { label: event.title }]}
        sections={sections}
      />

      <section id="details" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading align="left" eyebrow={t.events.aboutEyebrow} title={t.sections.eventDetails} />
            <Reveal delay={0.1} className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              {(event.details ?? [event.excerpt]).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            {event.schedule && (
              <div id="programme" className="mt-16 scroll-mt-28">
                <SectionHeading align="left" eyebrow={t.events.programmeEyebrow} title={t.events.programmeTitle} />
                <div className="mt-10 space-y-8">
                  {event.schedule.map((day) => {
                    const { day: d, month } = dateParts(day.date, locale);
                    return (
                      <Reveal key={day.date}>
                        <div className="overflow-hidden rounded-2xl border border-border bg-card">
                          <div className="flex items-center gap-4 border-b border-border bg-secondary/40 p-4 sm:px-5">
                            <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-center">
                              <span className="font-serif text-lg font-bold leading-none text-primary">{d}</span>
                              <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-gold-700">{month}</span>
                            </div>
                            <div>
                              <h3 className="font-serif text-lg font-semibold leading-snug">{weekday(day.date, locale)}</h3>
                              <p className="text-xs text-muted-foreground">{formatLongDate(day.date, locale)}</p>
                            </div>
                          </div>
                          <ol>
                            {day.items.map((item) => (
                              <li
                                key={`${item.time}-${item.title}`}
                                className="flex gap-4 border-b border-border p-4 last:border-0 sm:gap-6 sm:p-5"
                              >
                                <span className="tabular w-16 shrink-0 pt-0.5 text-sm font-semibold text-gold-700 sm:w-20">
                                  {item.time}
                                </span>
                                <div className="min-w-0">
                                  <p className="font-medium leading-snug">{item.title}</p>
                                  {item.lines && (
                                    <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-muted-foreground">
                                      {item.lines.map((line) => (
                                        <li key={line}>{line}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            )}

            {event.album && (
              <div id="photos" className="mt-16 scroll-mt-28">
                <SectionHeading align="left" eyebrow={t.events.photosEyebrow} title={t.events.photosTitle} />
                <div className="mt-10">
                  <PhotoAlbum albumKey={event.album} title={event.title} subtitle={dates} />
                </div>
              </div>
            )}
          </div>

          {/* Poster or photo with the essentials; full width but capped on phones. */}
          <aside className="mx-auto w-full max-w-md lg:max-w-none">
            <Reveal className="overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src={image(event.image, { w: 900, q: 75 })}
                alt={event.title}
                width={900}
                height={1200}
                sizes="(max-width: 1024px) 28rem, 22rem"
                className="h-auto w-full"
              />
              <dl className="space-y-4 p-6 text-sm">
                <Info icon={CalendarDays} label={t.events.dateLabel} value={dates} />
                <Info icon={Clock} label={t.events.timeLabel} value={event.time} />
                <Info icon={MapPin} label={t.common.location} value={event.location} />
              </dl>
              <div className="flex flex-col gap-3 border-t border-border p-6">
                {event.album && (
                  <Button asChild variant="gold">
                    <a href="#photos">
                      <Images className="size-4" />
                      {t.gallery.viewPhotos}
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline">
                  <Link href="/events">
                    <ArrowLeft className="size-4" />
                    {t.events.backToEvents}
                  </Link>
                </Button>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}

function Info({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-gold-500" />
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 font-medium">{value}</dd>
      </div>
    </div>
  );
}
