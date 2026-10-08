"use client";

import { ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/provider";

export type PageSection = { id: string; label: string };

/**
 * "On this page" links to the sections below a hero, shown under the hero text.
 * A single scrollable row on phones; wraps onto more lines from `sm` up.
 */
export function SectionMenu({ sections, className }: { sections: PageSection[]; className?: string }) {
  const { t } = useLocale();
  if (sections.length < 2) return null;

  return (
    <nav aria-label={t.sections.onThisPage} className={cn("min-w-0", className)}>
      <ul className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        {sections.map((s) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              className="glass-dark inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm text-cream/90 transition-colors hover:text-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <ArrowDown className="size-3.5 text-gold-300" aria-hidden />
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
