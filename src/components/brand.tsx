import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A stylised St. Thomas Cross (Mar Thoma Sliba) — the emblem of the
 * Nasrani / St. Thomas Christians of Kerala: a cross with trefoil terminals
 * rising from a lotus, with a descending dove of the Holy Spirit.
 */
export function ParishMark({
  className,
  title = "St. Thomas Cross",
}: {
  className?: string;
  title?: string;
}) {
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
  markClassName,
  subtitle = true,
}: {
  className?: string;
  markClassName?: string;
  subtitle?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-maroon-700 to-maroon-900 text-gold-300 shadow-sm ring-1 ring-gold-500/30">
        <ParishMark className={cn("h-6 w-6", markClassName)} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
          Alencherry Pally
        </span>
        {subtitle && (
          <span className="mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-gold-600 dark:text-gold-400">
            Syro-Malabar Church
          </span>
        )}
      </span>
    </span>
  );
}
