"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, CalendarDays } from "lucide-react";

import { image } from "@/lib/images";
import { formatDateRange, dateParts } from "@/lib/format";
import type { ChurchEvent, Organization } from "@/lib/data";
import { useLocale } from "@/lib/i18n/provider";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

export function EventCard({ event }: { event: ChurchEvent }) {
  const { locale, t } = useLocale();
  const { day, month } = dateParts(event.date, locale);
  return (
    <article
      id={event.slug}
      className="card-hover group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image(event.image, { w: 800, q: 68 })}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/50 to-transparent" />
        <div className="absolute left-4 top-4 flex size-14 flex-col items-center justify-center rounded-xl bg-card/95 text-center shadow-md backdrop-blur">
          <span className="font-serif text-xl font-bold leading-none text-primary">
            {day}
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-gold-600">
            {month}
          </span>
        </div>
        <Badge variant="gold" className="absolute right-4 top-4 bg-card/90 backdrop-blur">
          {t.cats.events[event.category] ?? event.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold leading-snug transition-colors group-hover:text-primary">
          {event.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {event.excerpt}
        </p>
        <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <CalendarDays className="size-3.5 text-gold-500" />
            {formatDateRange(event.date, event.endDate, locale)}
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-2">
              <Clock className="size-3.5 text-gold-500" />
              {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-3.5 text-gold-500" />
              {event.location}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function OrgCard({ org }: { org: Organization }) {
  return (
    <article
      id={org.slug}
      className="card-hover group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={image(org.image, { w: 700, q: 66 })}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/85 via-brown-900/30 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-gold-500/90 text-brown-900 shadow-md">
            <Icon name={org.icon} className="size-5" />
          </span>
          <div className="text-cream">
            <h3 className="font-serif text-lg font-semibold leading-none">{org.name}</h3>
            {org.malayalam && (
              <p className="mt-1 text-[0.7rem] text-cream/75">{org.malayalam}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {org.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="size-3.5 text-gold-500" />
            {org.meeting}
          </span>
          <Badge variant="muted">{org.audience}</Badge>
        </div>
      </div>
    </article>
  );
}

export function LinkCard({
  href,
  title,
  description,
  icon,
  className,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "card-hover group flex items-start gap-4 rounded-2xl border border-border bg-card p-5",
        className,
      )}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon name={icon} className="size-5" />
      </span>
      <span className="flex flex-col">
        <span className="flex items-center gap-1.5 font-serif text-lg font-semibold">
          {title}
          <ArrowRight className="size-4 -translate-x-1 text-gold-500 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
        <span className="mt-1 text-sm text-muted-foreground">{description}</span>
      </span>
    </Link>
  );
}
