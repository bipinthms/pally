export const locales = ["en", "ml"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, { label: string; short: string }> = {
  en: { label: "English", short: "EN" },
  ml: { label: "മലയാളം", short: "മല" },
};

export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Pick the right side of a bilingual `{ en, ml }` value. */
export function pick<T>(value: { en: T; ml: T }, locale: Locale): T {
  return value[locale];
}

export type Bi = { en: string; ml: string };
