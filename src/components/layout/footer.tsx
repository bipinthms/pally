"use client";

import * as React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { site, navItems } from "@/lib/site";
import { useLocale } from "@/lib/i18n/provider";
import { useCurrentYear } from "@/lib/use-current-year";
import { Wordmark } from "@/components/brand";
import { Ornament } from "@/components/ornament";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/social-icons";

const socials = [
  { href: site.social.facebook, icon: FacebookIcon, label: "Facebook" },
  { href: site.social.instagram, icon: InstagramIcon, label: "Instagram" },
  { href: site.social.youtube, icon: YoutubeIcon, label: "YouTube" },
].filter((s) => s.href);

export function Footer() {
  const { t } = useLocale();
  const year = useCurrentYear();

  return (
    <footer className="relative overflow-hidden bg-brown-900 text-cream/80">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.06]" />
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-maroon-700/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 size-72 rounded-full bg-gold-700/20 blur-3xl" />

      <div className="container-x relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <Wordmark
              className="[&_span.font-serif]:text-cream [&_[data-wordmark-sub]]:text-gold-300"
              markClassName="text-gold-300"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              {t.home.heroSubtitle}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-300"
                >
                  <s.icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label={t.a11y.footerNav}>
            <h3 className="font-serif text-lg text-cream">{t.footer.explore}</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {navItems.slice(0, 6).map((n) => (
                <li key={n.key}>
                  <Link
                    href={n.href}
                    className="text-cream/70 transition hover:text-gold-300"
                  >
                    {t.nav[n.key].label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* More */}
          <nav aria-label={t.a11y.moreLinks}>
            <h3 className="font-serif text-lg text-cream">{t.footer.parish}</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {navItems.slice(6).map((n) => (
                <li key={n.key}>
                  <Link
                    href={n.href}
                    className="text-cream/70 transition hover:text-gold-300"
                  >
                    {t.nav[n.key].label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg text-cream">{t.footer.visitContact}</h3>
            <ul className="mt-5 space-y-4 text-sm text-cream/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <span>{t.site.addressLines.join(", ")}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <a href={`tel:${site.contact.phoneHref}`} className="transition hover:text-gold-300">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <a href={`mailto:${site.contact.email}`} className="transition hover:text-gold-300">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <span>{t.footer.office}: {t.site.officeWeekdays}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14">
          <Ornament width="w-full" className="opacity-40" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-center text-xs text-cream/55 sm:flex-row sm:text-left">
          <p>
            © {year} {t.site.legalName}. {t.footer.rights}
          </p>
          <p className="flex items-center gap-1.5">
            {t.site.diocese} · {t.site.rite}
          </p>
        </div>
      </div>
    </footer>
  );
}
