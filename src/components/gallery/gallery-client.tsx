"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, ZoomIn } from "lucide-react";

import { image } from "@/lib/images";
import { getData, galleryCategories, type GalleryItem, type ParishVideo } from "@/lib/data";
import { useLocale } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const aspectFor = (span?: GalleryItem["span"]) =>
  span === "tall" ? "aspect-[2/3]" : span === "wide" ? "aspect-[4/3]" : "aspect-square";

export function GalleryClient() {
  const { locale, t } = useLocale();
  const { gallery, videos } = getData(locale);
  const [category, setCategory] = React.useState<(typeof galleryCategories)[number]>("All");
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [activeVideo, setActiveVideo] = React.useState<ParishVideo | null>(null);

  const items = React.useMemo(
    () => (category === "All" ? gallery : gallery.filter((g) => g.category === category)),
    [category, gallery],
  );

  const close = React.useCallback(() => setOpenIndex(null), []);
  const step = React.useCallback(
    (dir: number) =>
      setOpenIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  React.useEffect(() => {
    if (openIndex === null) return;
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
  }, [openIndex, close, step]);

  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              category === c
                ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                : "border-border text-muted-foreground hover:border-gold-500 hover:text-primary",
            )}
          >
            {t.cats.gallery[c] ?? c}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 [column-fill:_balance]">
        {items.map((g, i) => (
          <motion.button
            layout
            key={g.image}
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.03 }}
            className={cn(
              "group relative mb-4 block w-full overflow-hidden rounded-2xl",
              aspectFor(g.span),
            )}
          >
            <Image
              src={image(g.image, { w: 700, q: 66 })}
              alt={g.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brown-900/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="p-4">
                <p className="text-sm font-medium text-cream">{g.title}</p>
                <p className="text-xs text-gold-300">{t.cats.gallery[g.category] ?? g.category}</p>
              </div>
            </div>
            <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-primary opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <ZoomIn className="size-4" />
            </span>
          </motion.button>
        ))}
      </div>

      {/* Videos */}
      <div className="mt-20">
        <h2 className="text-center font-serif text-2xl font-semibold sm:text-3xl">
          {t.gallery.videosTitle}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground">
          {t.gallery.videosSubtitle}
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {videos.map((v) => (
            <button
              key={v.title}
              onClick={() => setActiveVideo(v)}
              className="group relative aspect-video overflow-hidden rounded-2xl text-left"
            >
              <Image
                src={image(v.poster, { w: 700, q: 66 })}
                alt={v.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/85 to-brown-900/20" />
              <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-500/90 text-brown-900 shadow-lg transition-transform group-hover:scale-110">
                <Play className="size-7 translate-x-0.5 fill-current" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-medium text-cream">{v.title}</p>
                <p className="text-xs text-gold-300">{v.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Image lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-brown-900/95 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            <button
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.figure
              key={active.image}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex max-h-[88vh] w-full max-w-4xl flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[72vh] w-full overflow-hidden rounded-2xl">
                <Image
                  src={image(active.image, { w: 1400, q: 78 })}
                  alt={active.title}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-serif text-lg text-cream">{active.title}</p>
                <p className="text-sm text-gold-300">
                  {t.cats.gallery[active.category] ?? active.category} · {(openIndex ?? 0) + 1} / {items.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video dialog */}
      <Dialog open={!!activeVideo} onOpenChange={(o) => !o && setActiveVideo(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          <DialogTitle className="sr-only">{activeVideo?.title ?? "Video"}</DialogTitle>
          {activeVideo && (
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
