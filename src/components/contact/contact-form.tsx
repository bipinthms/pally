"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

import { useLocale } from "@/lib/i18n/provider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const { t } = useLocale();
  const [status, setStatus] = React.useState<"idle" | "sending" | "done">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // No backend wired up — simulate a submission. Replace with a POST to your
    // API route or a form service to receive live messages.
    setTimeout(() => setStatus("done"), 1100);
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
              className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <CheckCircle2 className="size-11" />
            </motion.span>
            <h3 className="mt-6 font-serif text-2xl font-semibold">{t.contact.doneTitle}</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
              {t.contact.doneBody}
            </p>
            <Button onClick={() => setStatus("idle")} variant="outline" className="mt-8">
              {t.contact.sendAnother}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <h3 className="font-serif text-2xl font-semibold">{t.contact.sendTitle}</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="c-name">{t.contact.name}</Label>
                <Input id="c-name" required placeholder={t.contact.namePlaceholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-phone">{t.common.phone}</Label>
                <Input id="c-phone" type="tel" placeholder={t.contact.phonePlaceholder} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-email">{t.common.email}</Label>
              <Input id="c-email" type="email" required placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-subject">{t.contact.subject}</Label>
              <Input id="c-subject" placeholder={t.contact.subjectPlaceholder} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-message">{t.contact.message}</Label>
              <Textarea id="c-message" required rows={5} placeholder={t.contact.messagePlaceholder} />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t.common.sending}
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  {t.contact.sendMessage}
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
