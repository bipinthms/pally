"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock, Hourglass, MapPin, ArrowRight } from "lucide-react";

import { getData, type NavathiProgram } from "@/lib/data";
import { formatDateRange, dateParts, monthYearLabel } from "@/lib/format";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

/** A YYYY-MM date names a month whose day is not fixed yet. */
const isMonthOnly = (iso: string) => iso.length === 7;

/** The last day a programme runs, at local midnight. */
function lastDay(p: NavathiProgram) {
  const [y, m, d] = (p.endDate ?? p.date).split("-").map(Number);
  // Day 0 of the next month is the last day of this one.
  return d ? new Date(y, m - 1, d) : new Date(y, m, 0);
}

export function NavathiContent({ today }: { today: string }) {
  const { locale, t } = useLocale();
  const { navathiPrograms } = getData(locale);

  // Start from the build date so the static HTML and hydration agree, then switch
  // to the visitor's date so finished programmes are marked as completed.
  const [now, setNow] = React.useState(() => new Date(today));
  React.useEffect(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    setNow(d);
  }, []);

  const programs = [...navathiPrograms].sort((a, b) => a.date.localeCompare(b.date));
  const nextIndex = programs.findIndex((p) => lastDay(p) >= now);

  const grouped = programs.reduce<{ month: string; items: { p: NavathiProgram; i: number }[] }[]>(
    (acc, p, i) => {
      const month = monthYearLabel(p.date, locale);
      const last = acc[acc.length - 1];
      if (last?.month === month) last.items.push({ p, i });
      else acc.push({ month, items: [{ p, i }] });
      return acc;
    },
    [],
  );

  const sections = [
    { id: "about-navathi", label: t.sections.navathi },
    { id: "programmes", label: t.sections.programmes },
    { id: "get-involved", label: t.sections.involved },
  ];

  const stats = [
    { value: "1937", label: t.navathi.statConsecrated },
    { value: "90", label: t.navathi.statYears },
    { value: "2026–27", label: t.navathi.statYear },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.navathi.heroEyebrow}
        title={t.navathi.heroTitle}
        description={t.navathi.heroDesc}
        verse={t.navathi.heroVerse}
        imageKey="navathiInauguration"
        crumbs={[{ label: t.nav.navathi.label }]}
        sections={sections}
      />

      {/* About the Navathi */}
      <section id="about-navathi" className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading align="left" eyebrow={t.navathi.aboutEyebrow} title={t.navathi.aboutTitle} />
            <Reveal delay={0.1} className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>{t.navathi.aboutP1}</p>
              <p>{t.navathi.aboutP2}</p>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {stats.map((s) => (
              <RevealItem key={s.label}>
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 text-center">
                  <span className="font-serif text-4xl font-bold text-primary sm:text-5xl">{s.value}</span>
                  <span className="mt-2 text-sm text-muted-foreground">{s.label}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Programme calendar */}
      <section id="programmes" className="section-y bg-secondary/40">
        <div className="container-x">
          <SectionHeading
            eyebrow={t.navathi.programmesEyebrow}
            title={t.navathi.programmesTitle}
            subtitle={t.navathi.programmesSubtitle}
          />
          <div className="mx-auto mt-14 max-w-3xl space-y-10">
            {grouped.map(({ month, items }) => (
              <Reveal key={month}>
                <div>
                  <h3 className="mb-4 flex items-center gap-3 font-serif text-xl font-semibold text-primary">
                    <CalendarDays className="size-5 text-gold-500" />
                    {month}
                  </h3>
                  <ul className="overflow-hidden rounded-2xl border border-border bg-card">
                    {items.map(({ p, i }) => {
                      const done = nextIndex === -1 || i < nextIndex;
                      const next = i === nextIndex;
                      const monthOnly = isMonthOnly(p.date);
                      const { day, month: mon } = dateParts(p.date, locale);
                      return (
                        <li
                          key={`${p.date}-${p.title}`}
                          className={cn(
                            "flex gap-4 border-b border-border p-4 last:border-0 sm:p-5",
                            next && "bg-gold-500/10",
                          )}
                        >
                          <div
                            className={cn(
                              "flex size-14 shrink-0 flex-col items-center justify-center rounded-xl text-center",
                              done ? "bg-muted" : "bg-primary/10",
                            )}
                          >
                            <span
                              className={cn(
                                "font-serif font-bold leading-none",
                                monthOnly ? "text-sm" : "text-lg",
                                done ? "text-muted-foreground" : "text-primary",
                              )}
                            >
                              {monthOnly ? mon : day}
                            </span>
                            <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-gold-700">
                              {monthOnly ? p.date.slice(0, 4) : mon}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
                              <p className={cn("font-medium leading-snug", done && "text-muted-foreground")}>{p.title}</p>
                              {done && (
                                <Badge variant="muted" className="shrink-0">
                                  <CheckCircle2 className="size-3.5" />
                                  {t.navathi.completed}
                                </Badge>
                              )}
                              {next && (
                                <Badge variant="gold" className="shrink-0">
                                  {t.navathi.next}
                                </Badge>
                              )}
                            </div>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <Clock className="size-3.5 text-gold-500" />
                                {monthOnly
                                  ? t.navathi.dateTba
                                  : [formatDateRange(p.date, p.endDate, locale), p.time].filter(Boolean).join(" · ")}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin className="size-3.5 text-gold-500" />
                                {p.location}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
            <Reveal>
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gold-500/40 bg-card/60 p-8 text-center">
                <Hourglass className="size-6 text-gold-500" />
                <p className="font-serif text-xl font-semibold text-primary">{t.navathi.comingSoonTitle}</p>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{t.navathi.comingSoonBody}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Get involved */}
      <section id="get-involved" className="section-y">
        <div className="container-x">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-gold-500/30 bg-card p-8 text-center sm:p-12">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{t.navathi.involvedTitle}</h2>
            <p className="max-w-xl leading-relaxed text-muted-foreground">{t.navathi.involvedBody}</p>
            <Button asChild variant="gold">
              <Link href="/contact">
                {t.navathi.involvedCta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
