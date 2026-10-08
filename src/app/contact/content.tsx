"use client";

import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

import { site } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Ornament } from "@/components/ornament";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact/contact-form";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/social-icons";
import { useLocale } from "@/lib/i18n/provider";


const socials = [
  { href: site.social.facebook, icon: FacebookIcon, label: "Facebook" },
  { href: site.social.instagram, icon: InstagramIcon, label: "Instagram" },
  { href: site.social.youtube, icon: YoutubeIcon, label: "YouTube" },
].filter((s) => s.href);

export function ContactContent() {
  const { t } = useLocale();

  const info = [
    { icon: MapPin, title: t.contact.visitUs, lines: t.site.addressLines },
    { icon: Phone, title: t.contact.callUs, lines: [site.contact.phone], href: `tel:${site.contact.phoneHref}` },
    { icon: Mail, title: t.contact.emailUs, lines: [site.contact.email], href: `mailto:${site.contact.email}` },
  ];

  const sections = [
    { id: "get-in-touch", label: t.sections.getInTouch },
    { id: "map", label: t.sections.map },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.contact.heroEyebrow}
        title={t.contact.heroTitle}
        description={t.contact.heroDesc}
        verse={t.contact.heroVerse}
        imageKey="churchStone"
        crumbs={[{ label: t.nav.contact.label }]}
        sections={sections}
      />

      <section id="get-in-touch" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Info */}
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-700 dark:text-gold-400">
              {t.contact.eyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{t.contact.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t.contact.body}</p>

            <Ornament width="w-40" className="my-8 justify-start" />

            <div className="space-y-4">
              {info.map((c) => (
                <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <c.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-serif text-lg font-semibold">{c.title}</p>
                    {c.href ? (
                      <a href={c.href} className="text-sm text-muted-foreground transition hover:text-primary">
                        {c.lines.join(", ")}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{c.lines.join(", ")}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Office timings */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-700 dark:text-gold-400">
                    <Clock className="size-5" />
                  </span>
                  <p className="font-serif text-lg font-semibold">{t.contact.officeTimings}</p>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t.contact.monFri}</dt>
                    <dd className="text-right font-medium">{t.site.officeWeekdays}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t.contact.saturday}</dt>
                    <dd className="text-right font-medium">{t.site.officeSaturday}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t.contact.sunday}</dt>
                    <dd className="text-right font-medium">{t.site.officeSunday}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{t.common.followUs}</span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-gold-500 hover:text-primary"
                >
                  <s.icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="pb-20">
        <div className="container-x">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-card px-6 py-4">
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-primary" />
                  <p className="font-medium">{t.site.addressShort}</p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <a href={site.contact.mapLink} target="_blank" rel="noopener noreferrer">
                    <Navigation className="size-4" />
                    {t.common.getDirections}
                  </a>
                </Button>
              </div>
              <iframe
                title={t.a11y.map}
                src={site.contact.mapEmbed}
                className="h-[420px] w-full border-0 grayscale-[0.2]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
