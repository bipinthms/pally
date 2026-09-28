import { defaultLocale, type Locale } from "./config";

/**
 * Static hosts such as GitHub Pages have no request cookies at build time.
 * The client-side provider restores a saved language preference after load.
 */
export async function getLocale(): Promise<Locale> {
  return defaultLocale;
}
