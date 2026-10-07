import type { Metadata } from "next";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

import { getData } from "@/lib/data";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { RevealGroup, RevealItem, Reveal } from "@/components/reveal";
import { OrgCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Parish Organizations",
  description:
    "The ministries and movements of St. Mary's Church, Alencherry — Sunday School, OCYM, MGOCSM, Martha Mariam Vanitha Samajam, the Parish Choir, Prayer Fellowship, Edavaka Mission and more.",
};

export default async function OrganizationsPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const { organizations } = getData(locale);

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

      {/* Join CTA */}
      <section className="pb-24">
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
