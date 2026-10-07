import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

import { getData } from "@/lib/data";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem, Reveal } from "@/components/reveal";
import { OrgCard } from "@/components/cards";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { assetPath } from "@/lib/images";

export const metadata: Metadata = {
  title: "Parish Organizations",
  description:
    "The ministries and movements of St. Mary's Church, Alencherry — Sunday School, OCYM, MGOCSM, Martha Mariam Vanitha Samajam, the Parish Choir, Prayer Fellowship, Edavaka Mission and more.",
};

export default async function OrganizationsPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const { organizations, missionProjects } = getData(locale);

  return (
    <>
      <PageHero
        eyebrow={t.orgs.heroEyebrow}
        title={t.orgs.heroTitle}
        description={t.orgs.heroDesc}
        imageKey="gathering"
        crumbs={[{ label: t.nav.organizations.label }]}
      />

      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={t.orgs.eyebrow} title={t.orgs.title} subtitle={t.orgs.subtitle} />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {organizations.map((org) => (
              <RevealItem key={org.slug} className="h-full">
                <OrgCard org={org} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Mission projects */}
      <section id="mission-projects" className="section-y scroll-mt-20 bg-muted/40">
        <div className="container-x">
          <SectionHeading
            eyebrow={t.orgs.projectsEyebrow}
            title={t.orgs.projectsTitle}
            subtitle={t.orgs.projectsSubtitle}
          />
          <Reveal className="mx-auto mt-12 max-w-md">
            <a
              href={assetPath("/images/karmma-padhathikal.jpg")}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[var(--shadow-soft)] ring-1 ring-gold-500/20 transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src={assetPath("/images/karmma-padhathikal.jpg")}
                alt={t.orgs.projectsTitle}
                width={1118}
                height={1600}
                sizes="(max-width: 640px) 100vw, 28rem"
                className="h-auto w-full"
              />
            </a>
          </Reveal>
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {missionProjects.map((p, i) => (
              <RevealItem key={p.malayalam} className="h-full">
                <article className="card-hover relative flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <span className="absolute right-5 top-4 font-serif text-3xl font-semibold text-gold-500/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex size-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
                    <Icon name={p.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">#{p.name}</h3>
                  {locale !== "ml" && <p className="mt-0.5 text-xs text-muted-foreground">{p.malayalam}</p>}
                  <p className="mt-2 text-sm font-medium text-primary">{p.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-maroon-800 via-maroon-900 to-maroon-950 px-8 py-14 text-center text-cream md:px-16 md:py-20">
              <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.07]" />
              <div className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-gold-500/20 blur-3xl" />
              <span className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-gold-500/20 text-gold-200">
                <Users className="size-8" />
              </span>
              <h2 className="relative mt-6 font-serif text-3xl font-semibold md:text-4xl">{t.orgs.ctaTitle}</h2>
              <p className="relative mx-auto mt-4 max-w-xl leading-relaxed text-cream/80">{t.orgs.ctaBody}</p>
              <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild variant="gold" size="lg">
                  <Link href="/contact">
                    {t.orgs.getInvolved}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-cream/40 text-cream hover:bg-cream hover:text-brown-900">
                  <a href={`tel:${site.contact.phoneHref}`}>{t.common.callOffice}</a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
