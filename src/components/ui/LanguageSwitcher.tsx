"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { LOCALE_COOKIE, LOCALE_LABELS, LOCALES, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

const ONE_YEAR = 60 * 60 * 24 * 365;

function swapLocale(pathname: string, locale: Locale) {
  const [, , ...rest] = pathname.split("/");
  return `/${[locale, ...rest].filter(Boolean).join("/")}`;
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale: current, t } = useI18n();
  const pathname = usePathname();

  return (
    <div role="group" aria-label={t.controls.language} className={clsx("glass inline-flex rounded-full p-0.5", className)}>
      {LOCALES.map((locale) => {
        const isActive = locale === current;
        return (
          <Link
            key={locale}
            href={swapLocale(pathname, locale)}
            hrefLang={locale}
            aria-current={isActive ? "true" : undefined}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
            }}
            className={clsx(
              "focus-ring rounded-full px-2.5 py-1 font-mono text-xs font-medium transition-colors",
              isActive ? "bg-brand-gradient text-on-brand" : "text-ink-300 hover:text-white",
            )}
          >
            {LOCALE_LABELS[locale]}
          </Link>
        );
      })}
    </div>
  );
}
