"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarClock, MapPin, ChevronDown, Sparkles } from "lucide-react";

import { image } from "@/lib/images";
import { getData } from "@/lib/data";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { useLocale } from "@/lib/i18n/provider";
import { Button } from "@/components/ui/button";
import { SiteMenu } from "@/components/site-menu";
import { SectionMenu, type PageSection } from "@/components/section-menu";
import { cn } from "@/lib/utils";
import type { Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Hero({ sections = [] }: { sections?: PageSection[] }) {
  const { locale, t } = useLocale();
  const { heroVerse } = getData(locale);

  const chips = [
    { icon: CalendarClock, label: t.home.sundayMass, value: "7:00 – 10:00 AM" },
    { icon: MapPin, label: t.common.location, value: t.site.locationShort },
  ];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={image("heroInterior", { w: 2000, q: 70 })}
          alt={t.a11y.altHero}
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown-900/85 via-brown-900/60 to-brown-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/70 via-transparent to-maroon-950/40" />
        <div className="absolute inset-0 bg-grain opacity-[0.08]" />
      </div>

      <div className="container-x relative grid w-full items-center gap-12 pt-28 pb-24 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.span
            variants={rise}
            className="glass-dark inline-flex flex-col items-center gap-x-2 gap-y-0.5 rounded-2xl px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold-200 sm:flex-row sm:rounded-full sm:py-1.5 sm:text-xs sm:tracking-[0.22em]"
          >
            <Sparkles className="hidden size-3.5 sm:block" aria-hidden />
            <span>{t.site.rite}</span>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span>{t.site.diocese}</span>
          </motion.span>

          <motion.p
            variants={rise}
            className="mt-7 font-serif text-sm font-medium uppercase tracking-[0.35em] text-gold-300/90"
          >
            {t.home.estLine} {site.established}
          </motion.p>

          <motion.h1
            variants={rise}
            className={cn(
              "mt-4 text-balance font-serif font-semibold text-cream drop-shadow-sm",
              // Malayalam glyphs are wider and taller — scale the display size down.
              locale === "ml"
                ? "text-[2.1rem] leading-[1.25] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] lg:[@media(max-height:50rem)]:text-[2.75rem]"
                : "text-5xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[4.75rem]",
            )}
          >
            {t.site.name}
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-4 max-w-xl text-pretty text-lg text-cream/85 md:text-xl"
          >
            {t.home.heroSubtitle}
          </motion.p>

          {/* Verse */}
          <motion.figure
            variants={rise}
            className="mt-9 max-w-2xl border-l-2 border-gold-400/60 pl-5 text-left lg:[@media(max-height:50rem)]:mt-6"
          >
            <blockquote className="font-serif text-lg italic leading-relaxed text-cream/90 md:text-xl">
              “{heroVerse.text}”
            </blockquote>
            <figcaption className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-gold-300">
              — {heroVerse.ref}
            </figcaption>
          </motion.figure>

          {/* CTAs */}
          <motion.div
            variants={rise}
            className="mt-10 flex flex-col gap-3 sm:flex-row lg:[@media(max-height:50rem)]:mt-7"
          >
            <Button asChild variant="gold" size="lg">
              <Link href="/holy-mass">
                <CalendarClock className="size-4" />
                {t.home.massTimings}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-cream/40 text-cream hover:bg-cream hover:text-brown-900"
            >
              <Link href="/contact">{t.home.planVisit}</Link>
            </Button>
          </motion.div>

          {/* Quick chips — dropped on short desktop screens so the hero fits the viewport. */}
          <motion.div
            variants={rise}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start lg:[@media(max-height:50rem)]:hidden"
          >
            {chips.map((c) => (
              <div
                key={c.label}
                className="glass-dark flex items-center gap-3 rounded-full px-5 py-2.5 text-left"
              >
                <c.icon className="size-5 text-gold-300" aria-hidden />
                <span className="flex flex-col leading-tight">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-widest text-cream/70">
                    {c.label}
                  </span>
                  <span className="tabular text-sm font-medium text-cream">{c.value}</span>
                </span>
              </div>
            ))}
          </motion.div>

          {/* Sections of the home page */}
          <motion.div variants={rise} className="mt-8 w-full max-w-full">
            <SectionMenu sections={sections} className="sm:[&>ul]:justify-center lg:[&>ul]:justify-start" />
          </motion.div>
        </motion.div>

        {/* Site menu — replaces the navbar links; sized like the interior heroes' menu. */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="hidden lg:block"
        >
          <SiteMenu className="lg:h-[max(32rem,calc(100svh-13rem))]" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute inset-x-0 bottom-6 hidden justify-center sm:flex"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-1 text-cream/60"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.25em]">{t.common.scroll}</span>
          <ChevronDown className="size-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
