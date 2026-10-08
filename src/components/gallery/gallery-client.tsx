"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  ZoomIn,
  Clock,
} from "lucide-react";

import { image, type ImageKey } from "@/lib/images";
import {
  getData,
  galleryCategories,
  type GalleryItem,
  type ParishVideo,
} from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icon";
import { useLocale } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const aspectFor = (span?: GalleryItem["span"]) =>
  span === "tall"
    ? "aspect-[2/3]"
    : span === "wide"
      ? "aspect-[4/3]"
      : "aspect-square";

type View = "photos" | "orgs";
type LightboxItem = {
  image: ImageKey;
  title: string;
  subtitle: string;
  span?: GalleryItem["span"];
};

/** Organization cards link here as /gallery#org-<slug>. */
const ORG_HASH = "#org-";

export function GalleryClient() {
  const { locale, t } = useLocale();
  const { gallery, videos, organizations } = getData(locale);
  const [view, setView] = React.useState<View>("photos");
  const [category, setCategory] =
    React.useState<(typeof galleryCategories)[number]>("All");
  const [orgSlug, setOrgSlug] = React.useState(organizations[0]?.slug);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [activeVideo, setActiveVideo] = React.useState<ParishVideo | null>(
    null,
  );
  const tabsRef = React.useRef<HTMLDivElement>(null);

  const org = organizations.find((o) => o.slug === orgSlug) ?? organizations[0];

  // Open the matching organization tab when arriving from an organization card.
  React.useEffect(() => {
    const syncFromHash = () => {
      const { hash } = window.location;
      if (!hash.startsWith(ORG_HASH)) return;
      const slug = decodeURIComponent(hash.slice(ORG_HASH.length));
      if (!organizations.some((o) => o.slug === slug)) return;
      setView("orgs");
      setOrgSlug(slug);
      setOpenIndex(null);
      requestAnimationFrame(() =>
        tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [organizations]);

  const selectOrg = (slug: string) => {
    setOrgSlug(slug);
    setOpenIndex(null);
    window.history.replaceState(null, "", `${ORG_HASH}${slug}`);
  };

  const selectView = (next: View) => {
    setView(next);
    setOpenIndex(null);
    window.history.replaceState(
      null,
      "",
      next === "orgs" && org
        ? `${ORG_HASH}${org.slug}`
        : window.location.pathname,
    );
  };

  const items = React.useMemo<LightboxItem[]>(() => {
    if (view === "orgs") {
      return (org?.photos ?? []).map((photo) => ({
        image: photo,
        title: org.name,
        subtitle: org.short,
      }));
    }
    return (
      category === "All"
        ? gallery
        : gallery.filter((g) => g.category === category)
    ).map((g) => ({
      image: g.image,
      title: g.title,
      subtitle: t.cats.gallery[g.category] ?? g.category,
      span: g.span,
    }));
  }, [view, org, category, gallery, t]);

  const close = React.useCallback(() => setOpenIndex(null), []);
  const step = React.useCallback(
    (dir: number) =>
      setOpenIndex((i) =>
        i === null ? i : (i + dir + items.length) % items.length,
      ),
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
      {/* View tabs */}
      <div ref={tabsRef} className="flex scroll-mt-28 justify-center">
        <div
          role="tablist"
          className="inline-flex rounded-full border border-border bg-card p-1"
        >
          {(["photos", "orgs"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => selectView(v)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                view === v
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              {v === "photos" ? t.gallery.tabPhotos : t.gallery.tabOrgs}
            </button>
          ))}
        </div>
      </div>

      {view === "orgs" && org && (
        <>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {organizations.map((o) => (
              <button
                key={o.slug}
                aria-pressed={o.slug === org.slug}
                onClick={() => selectOrg(o.slug)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  o.slug === org.slug
                    ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                    : "border-border text-muted-foreground hover:border-gold-500 hover:text-primary",
                )}
              >
                {o.name}
              </button>
            ))}
          </div>

          <motion.div
            key={org.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card p-6 text-center md:p-8"
          >
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold-500/90 text-brown-900 shadow-md">
              <Icon name={org.icon} className="size-6" />
            </span>
            <h3 className="mt-4 font-serif text-2xl font-semibold">
              {org.name}
            </h3>
            {org.malayalam && (
              <p className="mt-1 text-sm text-muted-foreground">
                {org.malayalam}
              </p>
            )}
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {org.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="size-4 text-gold-500" />
                {org.meeting}
              </span>
              <Badge variant="muted">{org.audience}</Badge>
            </div>
          </motion.div>
        </>
      )}

      {/* Filters */}
      {view === "photos" && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {galleryCategories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
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
      )}

      {/* Masonry */}
      <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 [column-fill:_balance]">
        {items.map((g, i) => (
          <motion.button
            layout
            key={`${view}-${org?.slug}-${g.image}`}
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
                <p className="text-xs text-gold-300">{g.subtitle}</p>
              </div>
            </div>
            <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-primary opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <ZoomIn className="size-4" />
            </span>
          </motion.button>
        ))}
      </div>

      {/* Videos */}
      {view === "photos" && videos.length > 0 && (
        <div id="videos" className="mt-20">
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
      )}

      {/* Image lightbox */}
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
                  {active.subtitle} · {(openIndex ?? 0) + 1} / {items.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video dialog */}
      <Dialog
        open={!!activeVideo}
        onOpenChange={(o) => !o && setActiveVideo(null)}
      >
        <DialogContent aria-describedby={undefined} closeLabel={t.a11y.close} className="max-w-3xl overflow-hidden p-0">
          <DialogTitle className="sr-only">
            {activeVideo?.title ?? "Video"}
          </DialogTitle>
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
