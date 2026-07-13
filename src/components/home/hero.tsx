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
import type { Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Hero() {
  const { locale, t } = useLocale();
  const { heroVerse } = getData(locale);

  const chips = [
    { icon: CalendarClock, label: t.home.sundayMass, value: "6:00 · 8:00 · 10:00 AM" },
    { icon: MapPin, label: t.common.location, value: "Alayamon, Anchal" },
  ];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={image("heroInterior", { w: 2000, q: 70 })}
          alt="The interior of St. Mary's Orthodox Syrian Church, Alayamon"
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown-900/85 via-brown-900/60 to-brown-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/70 via-transparent to-maroon-950/40" />
        <div className="absolute inset-0 bg-grain opacity-[0.08]" />
      </div>

      <div className="container-x relative w-full pt-28 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.span
            variants={rise}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-gold-200 backdrop-blur"
          >
            <Sparkles className="size-3.5" />
            {site.diocese}
          </motion.span>

          <motion.p
            variants={rise}
            className="mt-7 font-serif text-sm font-medium uppercase tracking-[0.35em] text-gold-300/90"
          >
            {t.home.estLine} {site.established} · {site.rite}
          </motion.p>

          <motion.h1
            variants={rise}
            className="mt-4 text-balance font-serif text-5xl font-semibold leading-[1.05] text-cream drop-shadow-sm sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          >
            {site.name}
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
            className="mt-9 max-w-2xl border-l-2 border-gold-400/60 pl-5 text-left"
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
            className="mt-10 flex flex-col gap-3 sm:flex-row"
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

          {/* Quick chips */}
          <motion.div
            variants={rise}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {chips.map((c) => (
              <div
                key={c.label}
                className="glass flex items-center gap-3 rounded-full px-5 py-2.5 text-left"
              >
                <c.icon className="size-5 text-gold-300" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-widest text-cream/60">
                    {c.label}
                  </span>
                  <span className="text-sm font-medium text-cream">{c.value}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute inset-x-0 bottom-6 flex justify-center"
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
