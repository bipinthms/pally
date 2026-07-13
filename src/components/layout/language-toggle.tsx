"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useLocale } from "@/lib/i18n/provider";
import { locales, localeNames } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * `full`    — segmented EN / മല control (desktop).
 * `compact` — single pill showing the current language; tap toggles (mobile).
 */
export function LanguageToggle({
  className,
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "compact";
}) {
  const { locale, setLocale } = useLocale();

  if (variant === "compact") {
    const other = locales.find((l) => l !== locale) ?? locale;
    return (
      <button
        type="button"
        onClick={() => setLocale(other)}
        aria-label={`Switch language to ${localeNames[other].label}`}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-full border border-current/15 px-3 text-current transition-colors hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
          className,
        )}
      >
        <Languages className="size-[15px] opacity-70" aria-hidden="true" />
        <span className="text-xs font-semibold">{localeNames[locale].short}</span>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-current/15 p-0.5 text-current",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <Languages className="ml-1.5 mr-0.5 size-[15px] opacity-70" aria-hidden="true" />
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
            locale === l
              ? "bg-gold-500 text-brown-900"
              : "opacity-70 hover:opacity-100",
          )}
        >
          {localeNames[l].short}
        </button>
      ))}
    </div>
  );
}
