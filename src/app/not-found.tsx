import Link from "next/link";
import { Home, Phone } from "lucide-react";

import { site } from "@/lib/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { ParishMark } from "@/components/brand";
import { Ornament } from "@/components/ornament";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary/50 to-background" />
      <div className="container-x flex flex-col items-center text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-maroon-700 to-maroon-900 text-gold-300 shadow-lg ring-1 ring-gold-500/30">
          <ParishMark className="size-10" />
        </span>
        <p className="mt-8 font-serif text-7xl font-bold text-gradient-maroon">404</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold">{t.notFound.title}</h1>
        <Ornament width="w-40" className="my-6" />
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">{t.notFound.body}</p>
        <blockquote className="mt-6 max-w-md font-serif text-lg italic text-primary">
          {t.notFound.verse}
          <span className="mt-1 block text-sm not-italic text-muted-foreground">{t.notFound.verseRef}</span>
        </blockquote>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="gold" size="lg">
            <Link href="/">
              <Home className="size-4" />
              {t.notFound.backHome}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`tel:${site.contact.phoneHref}`}>
              <Phone className="size-4" />
              {t.notFound.contactParish}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
