import Link from "next/link";
import { Home, Phone } from "lucide-react";

import { site } from "@/lib/site";
import { ParishMark } from "@/components/brand";
import { Ornament } from "@/components/ornament";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary/50 to-background" />
      <div className="container-x flex flex-col items-center text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-maroon-700 to-maroon-900 text-gold-300 shadow-lg ring-1 ring-gold-500/30">
          <ParishMark className="size-10" />
        </span>
        <p className="mt-8 font-serif text-7xl font-bold text-gradient-maroon">404</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold">Page Not Found</h1>
        <Ornament width="w-40" className="my-6" />
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
          We could not find the page you were looking for. It may have been moved,
          or perhaps you followed a broken link. Let us guide you back home.
        </p>
        <blockquote className="mt-6 max-w-md font-serif text-lg italic text-primary">
          “I am the way, and the truth, and the life.”
          <span className="mt-1 block text-sm not-italic text-muted-foreground">
            — John 14:6
          </span>
        </blockquote>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="gold" size="lg">
            <Link href="/">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`tel:${site.contact.phoneHref}`}>
              <Phone className="size-4" />
              Contact the Parish
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
