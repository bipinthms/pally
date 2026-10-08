"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { navItems } from "@/lib/site";
import { getData } from "@/lib/data";
import { useLocale } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type Entry = { title: string; href: string; group: string; keywords?: string };

export function SearchDialog({ triggerClassName }: { triggerClassName?: string }) {
  const router = useRouter();
  const { locale, t } = useLocale();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const index = React.useMemo<Entry[]>(() => {
    const { organizations, events } = getData(locale);
    return [
      ...navItems.map((n) => ({
        title: t.nav[n.key].label,
        href: n.href,
        group: t.search.pages,
        keywords: `${t.nav[n.key].desc} ${n.label}`,
      })),
      ...organizations.map((o) => ({
        title: o.name,
        href: `/organizations#${o.slug}`,
        group: t.search.organizations,
        keywords: `${o.malayalam ?? ""} ${o.short}`,
      })),
      ...events.map((e) => ({
        title: e.title,
        href: `/events#${e.slug}`,
        group: t.search.events,
        keywords: `${e.category} ${e.location}`,
      })),
    ];
  }, [locale, t]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index;
    return index.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        (e.keywords ?? "").toLowerCase().includes(q) ||
        e.group.toLowerCase().includes(q),
    );
  }, [query, index]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={t.a11y.search}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full border border-current/15 text-current transition-colors hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
            triggerClassName,
          )}
        >
          <Search className="size-[18px]" />
        </button>
      </DialogTrigger>
      <DialogContent hideClose className="top-[15%] max-w-xl translate-y-0 gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">{t.search.placeholder}</DialogTitle>
        <DialogDescription className="sr-only">{t.search.placeholder}</DialogDescription>
        <div className="flex items-center gap-3 border-b border-border px-5">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground/70"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
            ESC
          </kbd>
        </div>
        <div className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              {t.search.noResults} “{query}”.
            </p>
          ) : (
            results.map((e) => (
              <button
                key={`${e.group}-${e.title}`}
                onClick={() => go(e.href)}
                className="group flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-accent"
              >
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{e.title}</span>
                  <span className="text-xs text-muted-foreground">{e.group}</span>
                </span>
                <CornerDownLeft className="size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
