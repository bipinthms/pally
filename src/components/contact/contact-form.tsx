"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, CheckCircle2, Mail, MessageCircle } from "lucide-react";

import { useLocale } from "@/lib/i18n/provider";
import { whatsappHref, mailtoHref, type ComposedMessage } from "@/lib/compose";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const { t } = useLocale();
  const [message, setMessage] = React.useState<ComposedMessage | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const field = (key: string) => String(data.get(key) ?? "");
    const msg: ComposedMessage = {
      subject: field("subject").trim() || t.contact.sendTitle,
      lines: [
        [t.contact.name, field("name")],
        [t.common.phone, field("phone")],
        [t.common.email, field("email")],
        [t.contact.message, field("message")],
      ],
    };
    setMessage(msg);
    window.open(whatsappHref(msg), "_blank", "noopener");
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <AnimatePresence mode="wait">
        {message ? (
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold">
                <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  {t.common.openWhatsapp}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={mailtoHref(message)}>
                  <Mail className="size-4" />
                  {t.common.sendByEmail}
                </a>
              </Button>
            </div>
            <Button onClick={() => setMessage(null)} variant="ghost" className="mt-3">
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
                <Input id="c-name" name="name" required placeholder={t.contact.namePlaceholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-phone">{t.common.phone}</Label>
                <Input id="c-phone" name="phone" type="tel" placeholder={t.contact.phonePlaceholder} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-email">{t.common.email}</Label>
              <Input id="c-email" name="email" type="email" required placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-subject">{t.contact.subject}</Label>
              <Input id="c-subject" name="subject" placeholder={t.contact.subjectPlaceholder} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-message">{t.contact.message}</Label>
              <Textarea id="c-message" name="message" required rows={5} placeholder={t.contact.messagePlaceholder} />
            </div>
            <div>
              <Button type="submit" size="lg" className="w-full">
                <Send className="size-4" />
                {t.contact.sendMessage}
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">{t.common.viaWhatsappNote}</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
