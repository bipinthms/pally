"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { image, type ImageKey } from "@/lib/images";
import { EASE } from "@/lib/motion";
import { SiteMenu } from "@/components/site-menu";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/provider";

type Crumb = { label: string; href?: string };
type Verse = { text: string; ref: string };

/**
 * Shared hero band used at the top of every interior page. It fills the viewport,
 * like the home hero, so every page opens with a hero of the same height, and
 * keeps the site menu open beside the text with the current page highlighted.
 */
export function PageHero({
  title,
  eyebrow,
  description,
  verse,
  imageKey,
  crumbs = [],
  className,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  verse: Verse;
  imageKey: ImageKey;
  crumbs?: Crumb[];
  className?: string;
}) {
  const { t } = useLocale();

  return (
    <section
      className={cn(
        "relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28",
        className,
      )}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={image(imageKey, { w: 1920, q: 70 })}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900 via-brown-900/70 to-brown-900/40" />
        <div className="absolute inset-0 bg-brown-900/20" />
      </div>

      <div className="container-x grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          <nav aria-label={t.common.breadcrumb} className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-cream/75">
              <li>
                <Link href="/" className="transition hover:text-gold-300">
                  {t.common.home}
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5 text-gold-400/70" aria-hidden />
                  {c.href ? (
                    <Link href={c.href} className="transition hover:text-gold-300">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-gold-200">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 max-w-3xl text-balance font-serif text-4xl font-semibold leading-tight text-cream sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-cream/80 md:text-lg">
              {description}
            </p>
          )}

          <figure className="mt-7 max-w-2xl border-l-2 border-gold-400/60 pl-5">
            <blockquote className="font-serif text-lg italic leading-relaxed text-cream/90 md:text-xl">
              “{verse.text}”
            </blockquote>
            <figcaption className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-gold-300">
              — {verse.ref}
            </figcaption>
          </figure>
        </div>

        {/* Site menu, always open on desktop (phones/tablets use the navbar Menu button). It matches the home hero's menu height,
            so every item shows without scrolling. */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="hidden lg:block"
        >
          <SiteMenu id="page-menu" className="lg:h-[max(32rem,calc(100svh-13rem))]" />
        </motion.div>
      </div>
    </section>
  );
}
