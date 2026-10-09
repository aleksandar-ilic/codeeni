import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";

import { MotionProvider } from "@/components/providers/MotionProvider";
import { HTML_LANG, LOCALES } from "@/i18n/config";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getDictionary, getLocale } from "@/i18n/server";
import { THEME_COLORS, THEME_INIT_SCRIPT } from "@/lib/theme";
import "../globals.css";

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
});

const display = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  const locale = await getLocale();

  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: ["software development", "technical consulting", "web applications", "software templates"],
    alternates: { languages: Object.fromEntries(LOCALES.map((lang) => [lang, `/${lang}`])) },
    openGraph: {
      title: t.meta.title,
      description: t.meta.ogDescription,
      type: "website",
      locale: HTML_LANG[locale],
    },
  };
}

export const viewport: Viewport = {
  themeColor: THEME_COLORS.dark,
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <I18nProvider locale={locale}>
          <MotionProvider>{children}</MotionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
