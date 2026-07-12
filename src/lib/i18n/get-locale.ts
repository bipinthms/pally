import { cookies } from "next/headers";
import { defaultLocale, locales, LOCALE_COOKIE, type Locale } from "./config";

/** Server-side: resolve the active locale from the cookie (English default). */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value as Locale | undefined;
  return value && locales.includes(value) ? value : defaultLocale;
}
