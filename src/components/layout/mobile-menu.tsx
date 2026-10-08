"use client";

import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Heart, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/provider";
import { SiteMenu } from "@/components/site-menu";
import { Button } from "@/components/ui/button";

/**
 * Phones and tablets: the hero's side menu is hidden below `lg`, so the navbar
 * shows a Menu button that opens the same SiteMenu as a near-opaque full-screen sheet.
 */
export function MobileMenu({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const { t } = useLocale();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={t.common.menu}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full border border-current/15 text-current transition-colors hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 lg:hidden",
            className,
          )}
        >
          <Menu className="size-[18px]" />
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[60] overflow-y-auto bg-brown-900/95 text-cream backdrop-blur-xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-4 data-[state=open]:slide-in-from-top-4 lg:hidden"
        >
          <DialogPrimitive.Title className="sr-only">{t.a11y.siteMenu}</DialogPrimitive.Title>
          <div className="relative mx-auto flex min-h-full w-full max-w-xl flex-col gap-4 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">
            <DialogPrimitive.Close
              aria-label={t.a11y.closeMenu}
              className="absolute right-5 top-[max(1.35rem,calc(env(safe-area-inset-top)+0.35rem))] z-10 rounded-full p-2 text-cream/80 transition hover:bg-white/10 hover:text-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 sm:right-7"
            >
              <X className="size-5" />
            </DialogPrimitive.Close>
            <SiteMenu
              onNavigate={() => setOpen(false)}
              className="flex-1 animate-none rounded-none border-0 bg-transparent shadow-none backdrop-blur-none"
            />
            <Button asChild variant="gold" className="w-full sm:hidden">
              <Link href="/contact" onClick={() => setOpen(false)}>
                <Heart className="size-4" />
                {t.common.donate}
              </Link>
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
