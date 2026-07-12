import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { Ornament } from "@/components/ornament";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.28em]",
            light ? "text-gold-300" : "text-gold-600 dark:text-gold-400",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "max-w-3xl text-balance font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-[2.65rem]",
          light ? "text-cream" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {centered && (
        <Ornament width="w-40" className={light ? "opacity-90" : ""} />
      )}
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed md:text-lg",
            light ? "text-cream/80" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
