# St. Mary's Orthodox Syrian Church, Alencherry — Parish Website

A premium, modern website for **St. Mary's Orthodox Syrian Church**, a Malankara
Orthodox Syrian parish in Alencherry (Alayamon, Anchal, Kollam district, Kerala —
under the Thiruvananthapuram Diocese). Live at https://www.alencherrychurch.org. Designed to feel peaceful, spiritual and
welcoming while honouring the heritage of the St. Thomas Christians.

Contact details, social links and navigation live in `src/lib/site.ts`.

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme) with a shadcn/ui–style component layer
- **Framer Motion** for scroll & UI animation
- **next-themes** for light / dark mode
- `lucide-react` for icons
- Static export (`output: "export"`) deployed to GitHub Pages by
  `.github/workflows/deploy-pages.yml` on every push to `main` and daily (to
  refresh date-dependent content such as upcoming events)

## Getting Started

```bash
npm ci
npm run dev       # http://localhost:3000
npm run lint
npm run build     # static site in out/ (stop `npm run dev` first)
```

## Pages

Home · About · Holy Mass · Clergy · Organizations · Gallery · Events ·
Prayer Requests · Contact — plus a custom 404, loading state,
`sitemap.xml`, `robots.txt` and a web manifest.

## Languages (English & Malayalam)

The site is fully bilingual. **English is the default**; visitors switch to
**Malayalam (മലയാളം)** with the toggle in the navigation bar. The choice is
saved in a cookie and the whole site — navigation, content, dates and forms —
re-renders in the browser in the chosen language. Because the site is a static
export, the HTML served to search engines is English only.

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

All photos are local files in `public/images/`, mapped to keys in
`src/lib/images.ts`. Images are served as-is (no optimisation on a static
site), so resize photos to about 2000px on the long side before adding them.
The social-share image is `public/og.jpg` (1200×630).

### Wiring up the forms

The site has no backend, so the **Prayer Request** and **Contact** forms open
WhatsApp (to `site.contact.whatsapp`) with the message filled in, and offer
email as a fallback (`src/lib/compose.ts`). To receive submissions directly
instead, post the form to a service such as Formspree or Web3Forms.

### Still to fill in

- `src/lib/site.ts` — the parish YouTube channel (`social.youtube`; the icon is
  hidden while empty).
- `src/lib/data.ts` — the `giving` block (UPI ID, bank account, IFSC) before
  re-enabling `/donations` (currently redirected to Contact), and `videosRaw`
  (the gallery Videos section is hidden while empty).
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
