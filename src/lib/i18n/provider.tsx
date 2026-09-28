"use client";

import * as React from "react";
import { LOCALE_COOKIE, defaultLocale, locales, type Locale } from "./config";
import { dictionaries, type Dict } from "./dictionary";

type Ctx = {
  locale: Locale;
  t: Dict;
  setLocale: (l: Locale) => void;
};

const LanguageContext = React.createContext<Ctx | null>(null);

export function LanguageProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [activeLocale, setActiveLocale] = React.useState(locale);

  // A static export cannot read cookies on the server. Restore a previously
  // selected language in the browser once the page has hydrated.
  React.useEffect(() => {
    const saved = document.cookie
      .split("; ")
      .find((entry) => entry.startsWith(`${LOCALE_COOKIE}=`))
      ?.split("=")[1] as Locale | undefined;

    const restored = saved && locales.includes(saved) ? saved : defaultLocale;
    document.documentElement.lang = restored;
    setActiveLocale(restored);
  }, []);

  const setLocale = React.useCallback(
    (l: Locale) => {
      document.cookie = `${LOCALE_COOKIE}=${l};path=/;max-age=31536000;samesite=lax`;
      document.documentElement.lang = l;
      setActiveLocale(l);
    },
    [],
  );

  const value = React.useMemo<Ctx>(
    () => ({ locale: activeLocale, t: dictionaries[activeLocale], setLocale }),
    [activeLocale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLocale(): Ctx {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLocale must be used within a LanguageProvider");
  return ctx;
}
