"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { useLocale } from "@/lib/i18n/provider";

export type LightboxItem = { src: string; title: string; subtitle: string };

/** Full-screen photo viewer; `index` is the open photo, or null when closed. */
export function Lightbox({
  items,
  index,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}) {
  const { t } = useLocale();

  const close = React.useCallback(() => onIndexChange(null), [onIndexChange]);
  const step = React.useCallback(
    (dir: number) => {
      if (index !== null) onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  React.useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const active = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-brown-900/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            autoFocus
            aria-label={t.a11y.close}
            onClick={close}
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
          <button
            aria-label={t.a11y.previousImage}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            aria-label={t.a11y.nextImage}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="size-6" />
          </button>

          <motion.figure
            key={active.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex max-h-[88vh] w-full max-w-4xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[72vh] w-full overflow-hidden rounded-2xl">
              <Image src={active.src} alt={active.title} fill sizes="90vw" className="object-contain" />
            </div>
            <figcaption className="mt-4 text-center">
              <p className="font-serif text-lg text-cream">{active.title}</p>
              <p className="text-sm text-gold-300">
                {active.subtitle} · {(index ?? 0) + 1} / {items.length}
              </p>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
