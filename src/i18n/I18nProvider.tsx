"use client";

import { createContext, useContext } from "react";

import { localizePath, type Locale } from "./config";
import { DICTIONARIES, type Dictionary } from "./dictionaries";

type I18nContextValue = {
  locale: Locale;
  t: Dictionary;
  href: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const value: I18nContextValue = {
    locale,
    t: DICTIONARIES[locale],
    href: (path) => localizePath(locale, path),
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside <I18nProvider>.");
  return context;
}
