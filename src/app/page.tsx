import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Church,
  Sun,
  Sunrise,
  HeartHandshake,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Quote,
} from "lucide-react";

import { image } from "@/lib/images";
import { site } from "@/lib/site";
import { getData } from "@/lib/data";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Ornament } from "@/components/ornament";
import { OrgCard } from "@/components/cards";
import { Hero } from "@/components/home/hero";
import { FeastBanner } from "@/components/home/feast-banner";
import { Testimonials } from "@/components/home/testimonials";

export default async function HomePage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const d = getData(locale);

  const stats = [
    { value: String(site.established), label: t.home.statEstablished },
    { value: "850+", label: t.home.statFamilies },
    { value: "12", label: t.home.statMinistries },
    { value: t.home.statQurbana, label: t.home.sundayMass },
  ];

  const massBlocks = [
    { title: t.home.sundayHolyMass, icon: Sun, slots: d.sundayMass, accent: "from-maroon-700 to-maroon-900" },
    { title: t.home.weekdayMass, icon: Sunrise, slots: d.weekdayMass.slice(0, 4), accent: "from-gold-600 to-gold-800" },
  ];

  return (
    <>
      <Hero />

      {/* ---------------- Welcome ---------------- */}
      <section className="section-y">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)]">
              <Image
                src={image("churchExterior", { w: 900, q: 70 })}
                alt="St. Mary's Orthodox Syrian Church"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-52 overflow-hidden rounded-2xl border-4 border-background shadow-xl sm:block md:-right-8 md:w-60">
              <div className="relative aspect-square">
                <Image
                  src={image("candles", { w: 500, q: 70 })}
                  alt="Votive candles"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="glass absolute -left-4 top-8 flex items-center gap-3 rounded-2xl px-5 py-3 shadow-lg md:-left-8">
              <Church className="size-7 text-primary" />
              <div className="leading-tight">
                <p className="font-serif text-lg font-bold text-foreground">
                  {new Date().getFullYear() - site.established}+ {t.home.yearsWord}
                </p>
                <p className="text-xs text-muted-foreground">{t.home.yearsSub}</p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow={t.home.welcomeEyebrow}
              title={
                <>
                  {t.home.welcomeTitleA}{" "}
                  <span className="text-gradient-maroon">{t.home.welcomeTitleB}</span>
                </>
              }
            />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">{t.home.welcomeP1}</p>
              <p className="leading-relaxed">{t.home.welcomeP2}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
                  <p className="font-serif text-2xl font-bold text-primary">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            <Button asChild className="mt-8">
              <Link href="/about">
                {t.home.discoverStory}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- Mass timings ---------------- */}
      <section className="section-y bg-secondary/40">
        <div className="container-x">
          <SectionHeading eyebrow={t.home.massEyebrow} title={t.home.massTitle} subtitle={t.home.massSubtitle} />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {massBlocks.map((block) => (
              <Reveal key={block.title}>
                <Card className="h-full overflow-hidden">
                  <div className={`flex items-center gap-3 bg-gradient-to-r ${block.accent} px-6 py-5 text-cream`}>
                    <block.icon className="size-6 text-gold-200" />
                    <h3 className="font-serif text-xl font-semibold">{block.title}</h3>
                  </div>
                  <ul className="divide-y divide-border">
                    {block.slots.map((slot, i) => (
                      <li key={`${slot.day}-${i}`} className="flex items-center justify-between gap-4 px-6 py-3.5">
                        <span className="flex flex-col">
                          <span className="text-sm font-medium">{slot.day}</span>
                          {slot.note && <span className="text-xs text-muted-foreground">{slot.note}</span>}
                        </span>
                        <span className="flex flex-wrap justify-end gap-1.5">
                          {slot.times.map((tm) => (
                            <Badge key={tm} variant="gold">{tm}</Badge>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { icon: HeartHandshake, title: t.home.confession, detail: t.home.confessionDetail },
              { icon: Church, title: t.home.adoration, detail: t.home.adorationDetail },
              { icon: Sparkles, title: t.home.rosary, detail: t.home.rosaryDetail },
            ].map((dv) => (
              <div key={dv.title} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <dv.icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">{dv.title}</p>
                  <p className="text-sm text-muted-foreground">{dv.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/holy-mass">
                {t.home.viewFullSchedule}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- Announcements ---------------- */}
      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading align="left" eyebrow={t.home.annEyebrow} title={t.home.annTitle} />
            <Button asChild variant="ghost" className="text-primary">
              <Link href="/events">
                {t.home.allNewsEvents}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {d.announcements.map((a) => (
              <RevealItem key={a.title}>
                <article className="card-hover flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="gold">{a.tag}</Badge>
                    <span className="text-xs text-muted-foreground">{a.date}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold leading-snug">{a.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Feast banner ---------------- */}
      <FeastBanner />

      {/* ---------------- Gallery preview ---------------- */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.home.galEyebrow} title={t.home.galTitle} subtitle={t.home.galSubtitle} />

          <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
            {d.gallery.slice(0, 6).map((g, i) => (
              <Reveal
                key={g.image}
                delay={i * 0.06}
                className={i === 0 ? "col-span-2 row-span-2" : i === 3 ? "md:row-span-2" : ""}
              >
                <Link href="/gallery" className="group relative block h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src={image(g.image, { w: 800, q: 66 })}
                    alt={g.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-medium text-cream">{g.title}</p>
                    <p className="text-xs text-gold-300">{t.cats.gallery[g.category] ?? g.category}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="gold">
              <Link href="/gallery">
                {t.home.exploreGallery}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- Priest message ---------------- */}
      <section className="section-y bg-brown-900 text-cream">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-gold-500/30">
              <Image
                src={image(d.parishPriest.image, { w: 700, q: 72 })}
                alt={d.parishPriest.name}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 to-transparent" />
            </div>
            <div className="glass absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl px-5 py-3 text-center">
              <p className="font-serif text-lg font-semibold text-cream">{d.parishPriest.name}</p>
              <p className="text-xs text-gold-300">{d.parishPriest.role}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">{t.home.vicarMessage}</span>
            <Quote className="mt-6 size-12 text-gold-400/50" />
            <blockquote className="mt-4 font-serif text-2xl font-medium leading-relaxed text-cream md:text-3xl">
              {d.parishPriest.quote}
            </blockquote>
            <p className="mt-6 max-w-xl leading-relaxed text-cream/75">{d.parishPriest.bio}</p>
            <Ornament width="w-40" className="mt-8 justify-start" />
            <Button asChild variant="gold" className="mt-8">
              <Link href="/clergy">
                {t.home.meetClergy}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Organizations ---------------- */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.home.orgEyebrow} title={t.home.orgTitle} subtitle={t.home.orgSubtitle} />

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {d.organizations.slice(0, 6).map((org) => (
              <RevealItem key={org.slug} className="h-full">
                <OrgCard org={org} />
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/organizations">
                {t.home.seeAllOrgs}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="section-y bg-secondary/40">
        <div className="container-x">
          <SectionHeading eyebrow={t.home.testiEyebrow} title={t.home.testiTitle} />
          <div className="mt-14">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ---------------- Contact CTA ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-maroon-800 via-maroon-900 to-maroon-950 py-20 text-cream md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.07]" />
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">{t.home.ctaEyebrow}</span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl">{t.home.ctaTitle}</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-cream/80">{t.home.ctaBody}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg">
                <Link href="/contact">{t.common.getInTouch}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-cream/40 text-cream hover:bg-cream hover:text-brown-900">
                <a href={site.contact.mapLink} target="_blank" rel="noopener noreferrer">
                  <MapPin className="size-4" />
                  {t.common.getDirections}
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
            {[
              { icon: MapPin, label: t.common.address, value: site.contact.addressShort },
              { icon: Phone, label: t.common.phone, value: site.contact.phone, href: `tel:${site.contact.phoneHref}` },
              { icon: Mail, label: t.common.email, value: site.contact.email, href: `mailto:${site.contact.email}` },
            ].map((c) => (
              <div key={c.label} className="glass flex items-center gap-4 rounded-2xl px-6 py-4">
                <span className="flex size-11 items-center justify-center rounded-full bg-gold-500/20 text-gold-200">
                  <c.icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-cream/60">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="font-medium text-cream transition hover:text-gold-300">{c.value}</a>
                  ) : (
                    <p className="font-medium text-cream">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
