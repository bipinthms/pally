"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { navItems, activeNavItem } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/provider";

/**
 * The site's primary navigation: every page, always fully visible (never scrolls),
 * styled to sit over hero imagery (home hero, and interior page heroes via the Menu
 * button). Given a fixed height, the items share it evenly; on short desktop
 * viewports the one-line descriptions drop so all ten items still fit.
 */
export const SiteMenu = React.forwardRef<
  HTMLElement,
  { id?: string; className?: string; onNavigate?: () => void }
>(function SiteMenu({ id, className, onNavigate }, ref) {
  const pathname = usePathname();
  const activeKey = activeNavItem(pathname)?.key;
  const { t } = useLocale();

  return (
    <nav
      ref={ref}
      id={id}
      aria-label={t.a11y.siteMenu}
      className={cn("glass-dark animate-blur-in flex flex-col overflow-hidden rounded-2xl text-cream", className)}
    >
      <p className="border-b border-gold-300/15 px-5 pb-3 pt-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
        {t.common.menu}
      </p>
      <ol className="flex min-h-0 flex-1 flex-col p-2">
        {navItems.map((item, i) => {
          const active = item.key === activeKey;
          return (
            <li key={item.key} className="flex min-h-0 flex-1 flex-col">
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex flex-1 items-center gap-4 rounded-xl px-3 py-2 transition-colors",
                  active ? "bg-gold-400/15" : "hover:bg-white/8",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "tabular w-6 shrink-0 font-serif text-sm",
                    active ? "text-gold-300" : "text-cream/45 group-hover:text-gold-300",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className={cn("font-serif text-lg leading-snug", active ? "text-gold-200" : "text-cream")}>
                    {t.nav[item.key].label}
                  </span>
                  <span data-menu-desc className="truncate text-xs text-cream/65 lg:[@media(max-height:56rem)]:hidden">{t.nav[item.key].desc}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-4 shrink-0 text-gold-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
