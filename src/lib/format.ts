import type { Locale } from "@/lib/i18n/config";

const MONTHS: Record<Locale, string[]> = {
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  ml: [
    "ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മേയ്", "ജൂൺ",
    "ജൂലൈ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്ടോബർ", "നവംബർ", "ഡിസംബർ",
  ],
};

const MONTHS_SHORT: Record<Locale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ml: ["ജനു", "ഫെബ്രു", "മാർ", "ഏപ്രി", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗ", "സെപ്", "ഒക്ടോ", "നവം", "ഡിസം"],
};

function parse(iso: string) {
  const [y, m, d] = iso.split("T")[0].split("-").map(Number);
  return { y, m: (m ?? 1) - 1, d: d ?? 1 };
}

export function formatDate(iso: string, locale: Locale = "en"): string {
  const { y, m, d } = parse(iso);
  return `${d} ${MONTHS_SHORT[locale][m]} ${y}`;
}

export function formatLongDate(iso: string, locale: Locale = "en"): string {
  const { y, m, d } = parse(iso);
  return locale === "ml"
    ? `${y} ${MONTHS[locale][m]} ${d}`
    : `${MONTHS[locale][m]} ${d}, ${y}`;
}

export function formatDateRange(startIso: string, endIso?: string, locale: Locale = "en"): string {
  if (!endIso) return formatLongDate(startIso, locale);
  const s = parse(startIso);
  const e = parse(endIso);
  const M = MONTHS[locale];
  if (s.y === e.y && s.m === e.m) {
    return locale === "ml" ? `${s.y} ${M[s.m]} ${s.d}–${e.d}` : `${M[s.m]} ${s.d}–${e.d}, ${s.y}`;
  }
  if (s.y === e.y) {
    return locale === "ml"
      ? `${M[s.m]} ${s.d} – ${M[e.m]} ${e.d}, ${s.y}`
      : `${M[s.m]} ${s.d} – ${M[e.m]} ${e.d}, ${s.y}`;
  }
  return `${formatLongDate(startIso, locale)} – ${formatLongDate(endIso, locale)}`;
}

export function dateParts(iso: string, locale: Locale = "en"): { day: string; month: string } {
  const { m, d } = parse(iso);
  return { day: String(d), month: MONTHS_SHORT[locale][m].toUpperCase() };
}

export function monthYearLabel(iso: string, locale: Locale = "en"): string {
  const { y, m } = parse(iso);
  return locale === "ml" ? `${y} ${MONTHS[locale][m]}` : `${MONTHS[locale][m]} ${y}`;
}
