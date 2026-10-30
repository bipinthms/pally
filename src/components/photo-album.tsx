"use client";

import * as React from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

import { album, type AlbumKey } from "@/lib/images";
import { Lightbox } from "@/components/lightbox";
import { Reveal } from "@/components/reveal";

/** A grid of an album's photos; tapping one opens it in the lightbox. */
export function PhotoAlbum({ albumKey, title, subtitle }: { albumKey: AlbumKey; title: string; subtitle: string }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const items = React.useMemo(
    () => album(albumKey).map((src) => ({ src, title, subtitle })),
    [albumKey, title, subtitle],
  );

  return (
    <>
      <Reveal className="grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:gap-4 md:grid-cols-3">
        {items.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setOpenIndex(i)}
            aria-label={`${title} · ${i + 1} / ${items.length}`}
            className="group relative block h-full w-full overflow-hidden rounded-2xl"
          >
            <Image
              src={p.src}
              alt={title}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-primary opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <ZoomIn className="size-4" />
            </span>
          </button>
        ))}
      </Reveal>
      <Lightbox items={items} index={openIndex} onIndexChange={setOpenIndex} />
    </>
  );
}
