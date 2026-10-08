"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/site";
import { useLocale } from "@/lib/i18n/provider";

/**
 * Page <title>s come from static (English) metadata. When the visitor picks
 * another language, retitle the tab client-side and restore it on switching back.
 */
export function DocumentTitle() {
  const pathname = usePathname();
  const { locale, t } = useLocale();

  React.useEffect(() => {
    if (locale === "en") return;
    const item =
      pathname === "/"
        ? undefined
        : navItems.find((n) => n.href !== "/" && pathname.startsWith(n.href));
    const title =
      pathname === "/"
        ? `${t.site.name} — ${t.site.tagline}`
        : `${item ? t.nav[item.key].label : t.notFound.title} · ${t.site.name}`;
    let original = document.title;
    document.title = title;
    // Next.js may (re)apply the metadata <title> after hydration; win that race.
    const observer = new MutationObserver(() => {
      if (document.title === title) return;
      original = document.title;
      document.title = title;
    });
    observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true });
    return () => {
      observer.disconnect();
      if (document.title === title) document.title = original;
    };
  }, [locale, pathname, t]);

  return null;
}
