"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarHeart, ArrowRight } from "lucide-react";

import { image } from "@/lib/images";
import { getData } from "@/lib/data";
import { formatLongDate } from "@/lib/format";
import { useLocale } from "@/lib/i18n/provider";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";

function useCountdown(target: string) {
  const [left, setLeft] = React.useState<{
    d: number;
    h: number;
    m: number;
    s: number;
  } | null>(null);

  React.useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return left;
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass-dark flex h-16 w-16 items-center justify-center rounded-2xl font-serif text-2xl font-bold text-cream tabular-nums sm:h-20 sm:w-20 sm:text-3xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cream/75">
        {label}
      </span>
    </div>
  );
}

export function FeastBanner() {
  const { locale, t } = useLocale();
  const { upcomingFeast } = getData(locale);
  const left = useCountdown(upcomingFeast.date);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image(upcomingFeast.image, { w: 1920, q: 68 })}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/95 via-maroon-900/85 to-brown-900/80" />
        <div className="absolute inset-0 bg-grain opacity-[0.08]" />
      </div>

      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200">
            <CalendarHeart className="size-4" />
            {t.feast.upcoming}
          </span>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-cream md:text-5xl">
            {/* Keep the em dash on the same line as the word before it. */}
            {upcomingFeast.title.replace(" — ", "\u00A0— ")}
          </h2>
          <p className="mt-2 font-serif text-lg italic text-gold-300">
            {upcomingFeast.malayalam} · {formatLongDate(upcomingFeast.date, locale)}
          </p>
          <p className="mt-5 max-w-lg text-pretty leading-relaxed text-cream/80">
            {upcomingFeast.blurb}
          </p>
          <Button asChild variant="gold" size="lg" className="mt-8">
            <Link href="/events">
              {t.feast.viewProgramme}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="flex justify-center gap-3 sm:gap-5 lg:justify-end"
          role="timer"
          aria-label={`${t.feast.upcoming}: ${formatLongDate(upcomingFeast.date, locale)}`}
        >
          {left ? (
            <>
              <Unit value={left.d} label={t.feast.days} />
              <Unit value={left.h} label={t.feast.hours} />
              <Unit value={left.m} label={t.feast.minutes} />
              <Unit value={left.s} label={t.feast.seconds} />
            </>
          ) : (
            <>
              <Unit value={0} label={t.feast.days} />
              <Unit value={0} label={t.feast.hours} />
              <Unit value={0} label={t.feast.minutes} />
              <Unit value={0} label={t.feast.seconds} />
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
