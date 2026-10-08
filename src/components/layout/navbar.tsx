"use client";

import * as React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/provider";
import { Wordmark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { SearchDialog } from "@/components/search-dialog";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Button } from "@/components/ui/button";

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/**
 * Slim utility bar: brand, language, search, theme and Donate. On desktop, page
 * navigation lives in the hero sections (see SiteMenu); below `lg` a Menu button
 * opens it full screen (see MobileMenu).
 */
export function Navbar() {
  const solid = useScrolled();
  const { t } = useLocale();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "glass-nav border-b border-border/70 py-2 text-foreground shadow-[0_4px_30px_-12px_rgba(58,24,18,0.25)]"
          : "border-b border-transparent py-4 text-cream",
      )}
    >
      <div className="mx-auto flex w-full max-w-[95rem] items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label={t.a11y.homeLink} className="min-w-0 shrink">
          <Wordmark
            markClassName=""
            className={cn(
              "[&_span.font-serif]:transition-colors",
              // Compact the wordmark on phones so the controls fit.
              "max-sm:[&_[data-wordmark-sub]]:hidden max-sm:[&_span.font-serif]:text-base max-[379px]:[&_span.font-serif]:text-[0.9rem] max-[379px]:[&_.size-11]:size-9",
              !solid && "[&_span.font-serif]:text-cream [&_[data-wordmark-sub]]:text-gold-300",
            )}
          />
        </Link>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 max-[379px]:[&_button]:size-9">
          <LanguageToggle className="mr-0.5 hidden sm:inline-flex" />
          <LanguageToggle variant="compact" className="sm:hidden max-[379px]:!w-auto max-[379px]:px-2.5" />
          <SearchDialog />
          <ThemeToggle />
          <Button asChild variant="gold" size="sm" className="ml-1 hidden sm:inline-flex">
            <Link href="/donations">
              <Heart className="size-4" />
              {t.common.donate}
            </Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
