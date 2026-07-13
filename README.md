# St. Mary's Orthodox Syrian Church, Alayamon — Parish Website

A premium, modern website for **St. Mary's Orthodox Syrian Church**, a Malankara
Orthodox Syrian parish in Alayamon (Alanchery, Anchal, Kollam district, Kerala —
under the Thiruvananthapuram Diocese). Designed to feel peaceful, spiritual and
welcoming while honouring the heritage of the St. Thomas Christians.

Contact: Alenchery Onthupacha Road, Alayamon, Anchal, Kollam, Kerala 691306 ·
+91-0475-2274526 · the church opens daily at 6:00 AM for worship.

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme) with a shadcn/ui–style component layer
- **Framer Motion** for scroll & UI animation
- **next-themes** for light / dark mode
- `qrcode` for the build-time UPI QR, `lucide-react` for icons

## Getting Started

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start   # production build
```

## Pages

Home · About · Holy Mass · Clergy · Organizations · Gallery · Events ·
Prayer Requests · Donations · Contact — plus a custom 404, loading state,
`sitemap.xml`, `robots.txt` and a web manifest.

## Languages (English & Malayalam)

The site is fully bilingual. **English is the default**; visitors switch to
**Malayalam (മലയാളം)** with the toggle in the navigation bar. The choice is
saved in a cookie and the whole site — navigation, content, dates and forms —
re-renders on the server in the chosen language (so both languages are
SEO-indexable, with the correct `<html lang>`).

- UI text lives in `src/lib/i18n/dictionary.ts` (`en` and `ml` objects).
- Page/section content lives in `src/lib/data.ts` as `{ en, ml }` pairs.
- To edit a translation, change the matching `en`/`ml` string — nothing else.

## Editing Content (no code required)

All parish content lives in a few plain files so it can be updated without
touching the components:

| What to change | File |
| --- | --- |
| Name, address, phone, email, WhatsApp, social links, navigation | `src/lib/site.ts` |
| Mass timings, devotions, announcements, events, clergy, organizations, gallery captions, testimonials, history, giving/bank details | `src/lib/data.ts` |
| Photographs (see below) | `src/lib/images.ts` |

### Using the parish's own photos

Images are currently pulled from verified stock photography so the site looks
complete out of the box. To use real parish photos:

1. Drop the files into `public/images/` (e.g. `public/images/hero.jpg`).
2. In `src/lib/images.ts`, replace the relevant value — instead of an Unsplash
   ID, point the key at your file, e.g. change the component to use
   `"/images/hero.jpg"`. Everything else (sizing, optimisation) stays the same.

Remote image hosts are whitelisted in `next.config.ts` (`images.remotePatterns`).

### Wiring up the forms

The **Prayer Request** and **Contact** forms currently simulate submission and
show a confirmation. To receive real messages, connect the `handleSubmit` in
`src/components/prayer/prayer-form.tsx` and `src/components/contact/contact-form.tsx`
to an API route or a form service (e.g. Formspree, Resend).

### Things to replace before going live

- `src/lib/site.ts` — real address, phone, email, WhatsApp number, Google Maps
  embed URL, and the actual social links.
- `src/lib/data.ts` — the `giving` block (UPI ID, bank account, IFSC) and the
  `videos` YouTube IDs.
- `patronSaint`, `parishPriest`, `formerVicars`, `timeline` — confirm the real
  parish details.

## Design System

Colours, radii, shadows and animations are defined as tokens in
`src/app/globals.css` (deep **maroon**, **gold**, **cream** and **dark brown**).
Headings use **Playfair Display**, body text uses **Inter**.

## Accessibility & SEO

Semantic landmarks, skip-to-content link, keyboard-navigable dialogs/lightbox,
`prefers-reduced-motion` support, per-page metadata, Open Graph/Twitter cards,
JSON-LD structured data (Church + Events), sitemap and robots.
