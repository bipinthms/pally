"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "./config";
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
  const router = useRouter();

  const setLocale = React.useCallback(
    (l: Locale) => {
      document.cookie = `${LOCALE_COOKIE}=${l};path=/;max-age=31536000;samesite=lax`;
      document.documentElement.lang = l;
      // Re-render server components with the new cookie.
      router.refresh();
    },
    [router],
  );

  const value = React.useMemo<Ctx>(
    () => ({ locale, t: dictionaries[locale], setLocale }),
    [locale, setLocale],
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
