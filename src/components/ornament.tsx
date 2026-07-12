import * as React from "react";
import { cn } from "@/lib/utils";

/** A slender gold rule with a central diamond — a recurring divider motif. */
export function Ornament({
  className,
  width = "w-full",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-gold-500", width, className)}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/60 to-gold-500/70" />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M7 0l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-500/60 to-gold-500/70" />
    </div>
  );
}
