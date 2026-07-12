"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useLocale } from "@/lib/i18n/provider";
import { locales, localeNames } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/** Compact EN / മല segmented toggle. */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

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
