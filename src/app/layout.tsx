import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { image } from "@/lib/images";
import { getLocale } from "@/lib/i18n/get-locale";
import { LanguageProvider } from "@/lib/i18n/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/floating-actions";
import { ScrollProgress } from "@/components/scroll-progress";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Alencherry Pally",
    "Syro-Malabar Church",
    "Catholic Church Kerala",
    "Ernakulam parish",
    "Holy Mass timings",
    "St. Thomas Christians",
    "Nasrani",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: image("heroInterior", { w: 1200, h: 630, q: 75 }),
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [image("heroInterior", { w: 1200, h: 630, q: 75 })],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f2" },
    { media: "(prefers-color-scheme: dark)", color: "#17100e" },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: site.legalName,
  alternateName: site.name,
  description: site.description,
  url: site.url,
  telephone: site.contact.phone,
  email: site.contact.email,
  foundingDate: String(site.established),
  image: image("churchDusk", { w: 1200, q: 75 }),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alencherry",
    addressLocality: "Ernakulam",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  parentOrganization: {
    "@type": "Organization",
    name: site.diocese,
  },
  sameAs: [site.social.facebook, site.social.instagram, site.social.youtube],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const skipLabel = locale === "ml" ? "ഉള്ളടക്കത്തിലേക്ക് പോകുക" : "Skip to content";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider locale={locale}>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
            />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2 focus:text-sm focus:text-primary-foreground"
            >
              {skipLabel}
            </a>
            <ScrollProgress />
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer locale={locale} />
            <FloatingActions />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
