"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { useLocale } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  label,
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const { t } = useLocale();
  const copyLabel = label ?? t.common.copy;
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${copyLabel} ${value}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-gold-500 hover:text-primary",
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-emerald-600" />
          {t.common.copied}
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          {copyLabel}
        </>
      )}
    </button>
  );
}
