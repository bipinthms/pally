"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

import { getData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { useLocale } from "@/lib/i18n/provider";

export function Testimonials() {
  const { locale, t } = useLocale();
  const { testimonials } = getData(locale);
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const count = testimonials.length;

  const go = React.useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  const active = testimonials[index];

  return (
    <div
      className="relative mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Quote className="mx-auto size-12 text-gold-400/40" />

      <div className="relative mt-6 min-h-[190px] sm:min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="text-balance font-serif text-xl italic leading-relaxed text-foreground md:text-2xl">
              “{active.quote}”
            </p>
            <footer className="mt-6">
              <p className="font-semibold text-primary">{active.name}</p>
              <p className="text-sm text-muted-foreground">{active.role}</p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label={t.a11y.previousTestimonial}
          onClick={() => go(-1)}
          className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-gold-500 hover:text-primary"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-7 bg-gold-500" : "w-2 bg-border hover:bg-gold-300",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={t.a11y.nextTestimonial}
          onClick={() => go(1)}
          className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-gold-500 hover:text-primary"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
