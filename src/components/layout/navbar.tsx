"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Heart, Phone } from "lucide-react";

import { primaryNav, navItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/provider";
import { Wordmark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { SearchDialog } from "@/components/search-dialog";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";

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

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const { t } = useLocale();
  const [open, setOpen] = React.useState(false);

  // Close the mobile menu whenever the route changes.
  React.useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "glass-nav border-b border-border/70 py-2 text-foreground shadow-[0_4px_30px_-12px_rgba(58,24,18,0.25)]"
          : "border-b border-transparent py-4 text-cream",
      )}
    >
      <div className="container-x flex items-center justify-between gap-4">
        <Link href="/" aria-label="Alencherry Pally — home" className="shrink-0">
          <Wordmark
            markClassName=""
            className={cn(
              "[&_span.font-serif]:transition-colors",
              !solid && "[&_span.font-serif]:text-cream",
            )}
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative rounded-full whitespace-nowrap px-3 py-2 text-[0.9rem] font-medium transition-colors",
                  active
                    ? solid
                      ? "text-primary"
                      : "text-gold-200"
                    : "hover:text-gold-500",
                )}
              >
                {t.nav[item.key].label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-500 transition-transform duration-300 group-hover:scale-x-100",
                    active && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageToggle className="mr-0.5 hidden sm:inline-flex" />
          <SearchDialog />
          <ThemeToggle />
          <Button
            asChild
            variant="gold"
            size="sm"
            className="ml-1 hidden md:inline-flex"
          >
            <Link href="/donations">
              <Heart className="size-4" />
              {t.common.donate}
            </Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-current/15 text-current transition hover:bg-current/10 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-border bg-background text-foreground lg:hidden"
          >
            <nav className="container-x grid gap-1 py-5">
              {navItems.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex flex-col rounded-xl px-4 py-3 transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-accent",
                      )}
                    >
                      <span className="font-serif text-lg">{t.nav[item.key].label}</span>
                      <span className="text-xs text-muted-foreground">
                        {t.nav[item.key].desc}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex justify-center pb-1">
                  <LanguageToggle />
                </div>
                <Button asChild variant="gold" className="w-full">
                  <Link href="/donations">
                    <Heart className="size-4" /> {t.common.donate}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={`tel:${site.contact.phoneHref}`}>
                    <Phone className="size-4" /> {t.common.callParishOffice}
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
