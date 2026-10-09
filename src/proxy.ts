import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES, hasLocale, type Locale } from "@/i18n/config";

/** Serbian, Croatian, Bosnian and Montenegrin speakers all get the Serbian (Latin) version. */
const SERBIAN_FAMILY = ["sr", "hr", "bs", "sh", "cnr"];

function detectLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const languages = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase().split("-")[0]);

  for (const language of languages) {
    if (SERBIAN_FAMILY.includes(language)) return "sr";
    if (language === "en") return "en";
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocalePrefix = LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocalePrefix) return;

  request.nextUrl.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and any file with an extension (icon.svg, robots.txt, …).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
