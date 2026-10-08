"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, HandHeart } from "lucide-react";

import { getData } from "@/lib/data";
import { useLocale } from "@/lib/i18n/provider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PrayerForm() {
  const { locale, t } = useLocale();
  const { prayerCategories } = getData(locale);
  const [catIndex, setCatIndex] = React.useState(0);
  const [status, setStatus] = React.useState<"idle" | "sending" | "done">("idle");
  const [name, setName] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // No backend wired up — simulate a submission. Replace with a POST to your
    // API route or a form service (e.g. Formspree) to receive live requests.
    setTimeout(() => setStatus("done"), 1100);
  }

  function reset() {
    setStatus("idle");
    setCatIndex(0);
    setName("");
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
              className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <CheckCircle2 className="size-11" />
            </motion.span>
            <h3 className="mt-6 font-serif text-2xl font-semibold">{t.prayer.doneTitle}</h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
              {name ? `${t.prayer.doneBodyThanks}, ${name}. ` : `${t.prayer.doneBodyThanks}. `}
              {t.prayer.doneBody}
            </p>
            <p className="mt-5 font-serif text-lg italic text-primary">
              {t.prayer.doneVerse}
              <span className="mt-1 block text-sm not-italic text-muted-foreground">
                {t.prayer.doneVerseRef}
              </span>
            </p>
            <Button onClick={reset} variant="outline" className="mt-8">
              {t.prayer.submitAnother}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HandHeart className="size-5" />
              </span>
              <div className="min-w-0">
                <h3 className="font-serif text-xl font-semibold">{t.prayer.shareIntention}</h3>
                <p className="text-sm text-muted-foreground">{t.prayer.shareSub}</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{t.prayer.yourName}</Label>
                <Input
                  id="name"
                  required
                  placeholder={t.prayer.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">{t.prayer.contactLabel}</Label>
                <Input id="contact" placeholder={t.prayer.contactPlaceholder} />
              </div>
            </div>

            <div className="space-y-2.5">
              <Label>{t.prayer.intentionType}</Label>
              <div className="flex flex-wrap gap-2">
                {prayerCategories.map((c, i) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCatIndex(i)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-sm transition-all",
                      catIndex === i
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-gold-500",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intention">{t.prayer.requestLabel}</Label>
              <Textarea
                id="intention"
                required
                rows={5}
                placeholder={t.prayer.requestPlaceholder}
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                className="mt-1 size-4 rounded border-input accent-[var(--primary)]"
              />
              <span>{t.prayer.privateNote}</span>
            </label>

            <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t.common.sending}
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  {t.prayer.send}
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
