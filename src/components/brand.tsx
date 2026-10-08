"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/images";
import { useLocale } from "@/lib/i18n/provider";

/**
 * A stylised St. Thomas Cross (Mar Thoma Sliba) — the emblem of the
 * Nasrani / St. Thomas Christians of Kerala: a cross with trefoil terminals
 * rising from a lotus, with a descending dove of the Holy Spirit.
 */
export function ParishMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  const { t } = useLocale();
  title ??= t.a11y.stThomasCross;
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={cn("h-8 w-8", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {/* descending dove */}
        <path d="M32 6c-2 2.4-2 4.6 0 6 2-1.4 2-3.6 0-6Z" fill="currentColor" stroke="none" />
        {/* vertical arm */}
        <path d="M32 13v33" />
        {/* horizontal arm */}
        <path d="M18 28h28" />
        {/* trefoil terminals */}
        <circle cx="32" cy="12.5" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="28" r="2.1" />
        <circle cx="47.5" cy="28" r="2.1" />
        <circle cx="32" cy="12.5" r="2.1" />
        {/* lotus base */}
        <path d="M22 47c3.2 3.4 6.6 5 10 5s6.8-1.6 10-5" />
        <path d="M26 48.5c-.6 2.8.6 4.8 6 6 5.4-1.2 6.6-3.2 6-6" />
        <path d="M32 46v9" />
      </g>
    </svg>
  );
}

/** Wordmark used in the navbar / footer. */
export function Wordmark({
  className,
  subtitle = true,
}: {
  className?: string;
  markClassName?: string;
  subtitle?: boolean;
}) {
  const { t } = useLocale();
  return (
    <span className={cn("flex min-w-0 items-center gap-3", className)}>
      <span className="relative flex size-11 shrink-0 overflow-hidden rounded-full shadow-sm ring-1 ring-gold-500/30">
        <Image
          src={assetPath("/images/brand/logo.jpg")}
          alt={t.a11y.altLogo}
          fill
          sizes="44px"
          className="object-cover"
        />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span data-wordmark-title className="truncate font-serif text-lg font-semibold tracking-tight text-foreground">
          {t.site.wordmarkTitle}
        </span>
        {subtitle && (
          <span
            data-wordmark-sub
            className="mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-gold-700 dark:text-gold-400"
          >
            {t.site.wordmarkSub}
          </span>
        )}
      </span>
    </span>
  );
}
