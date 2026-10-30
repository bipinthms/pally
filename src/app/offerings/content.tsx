"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, Smartphone } from "lucide-react";

import { site } from "@/lib/site";
import { image } from "@/lib/images";
import { CopyButton } from "@/components/copy-button";
import { Ornament } from "@/components/ornament";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/provider";

/**
 * Payment step after the offering form. Skips PageHero, whose full-screen height
 * would push the pay button below the fold on phones.
 */
export function OfferingsContent({ qrSvg }: { qrSvg: string }) {
  const { t } = useLocale();
  const { upiId, upiUrl } = site.offering;

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pb-12 pt-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image("churchAlt", { w: 1920, q: 70 })}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brown-900/80" />
      </div>

      <div className="container-x flex justify-center">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 text-center shadow-xl sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-700 dark:text-gold-400">
            {t.offering.eyebrow}
          </span>
          <h1 className="mt-2 text-balance font-serif text-3xl font-semibold leading-tight">{t.offering.title}</h1>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{t.offering.body}</p>

          <Button asChild variant="gold" size="lg" className="mt-6 w-full">
            <a href={upiUrl}>
              <Smartphone className="size-4" />
              {t.offering.pay}
            </a>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">{t.offering.payNote}</p>

          <Ornament width="w-32" className="my-6" />

          <div
            className="mx-auto w-40 rounded-2xl bg-white p-3 shadow-sm [&_svg]:h-auto [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
            aria-label={t.a11y.upiQr}
            role="img"
          />
          <p className="mt-3 text-xs text-muted-foreground">{t.offering.qrNote}</p>

          <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">{t.donations.upiId}</p>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="font-mono text-sm font-medium">{upiId}</span>
            <CopyButton value={upiId} />
          </div>

          <Button asChild variant="outline" className="mt-6">
            <Link href="/">
              <Home className="size-4" />
              {t.notFound.backHome}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
