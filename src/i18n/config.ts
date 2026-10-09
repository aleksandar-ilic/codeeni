export const LOCALES = ["en", "sr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const LOCALE_LABELS: Record<Locale, string> = { en: "EN", sr: "SR" };
export const HTML_LANG: Record<Locale, string> = { en: "en", sr: "sr-Latn" };

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Prefixes an app path ("/", "/start", "/#contact") with the locale segment. */
export function localizePath(locale: Locale, path: string) {
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Fills `{placeholder}` tokens in a dictionary string. */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
