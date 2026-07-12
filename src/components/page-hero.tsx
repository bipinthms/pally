import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { image, type ImageKey } from "@/lib/images";
import { Ornament } from "@/components/ornament";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

/** Shared hero band used at the top of every interior page. */
export function PageHero({
  title,
  eyebrow,
  description,
  imageKey,
  crumbs = [],
  className,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  imageKey: ImageKey;
  crumbs?: Crumb[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative flex min-h-[52vh] items-end overflow-hidden pb-14 pt-32 md:min-h-[60vh] md:pb-20",
        className,
      )}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={image(imageKey, { w: 1920, q: 70 })}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900 via-brown-900/70 to-brown-900/40" />
        <div className="absolute inset-0 bg-brown-900/20" />
      </div>

      <div className="container-x">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-cream/70">
            <li>
              <Link href="/" className="transition hover:text-gold-300">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5 text-gold-400/70" />
                {c.href ? (
                  <Link href={c.href} className="transition hover:text-gold-300">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-gold-200">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 max-w-3xl text-balance font-serif text-4xl font-semibold leading-tight text-cream sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-cream/80 md:text-lg">
            {description}
          </p>
        )}
        <Ornament width="w-44" className="mt-7 justify-start !text-gold-400 [&>span]:from-gold-400/70" />
      </div>
    </section>
  );
}
