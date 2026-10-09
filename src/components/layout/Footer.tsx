import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { localizePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { NAV_SECTIONS } from "@/lib/navigation";
import { SITE } from "@/lib/site";

export async function Footer() {
  const t = await getDictionary();
  const locale = await getLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent"
      />

      <div className="container flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <Link href={localizePath(locale, "/")} className="focus-ring inline-block rounded-md" aria-label={t.nav.home}>
            <Logo tagline={t.site.tagline} />
          </Link>
        </div>

        <nav aria-label={t.nav.footer}>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_SECTIONS.map((section) => (
              <li key={section}>
                <Link
                  href={localizePath(locale, `/#${section}`)}
                  className="focus-ring rounded text-sm text-ink-200 transition-colors hover:text-white"
                >
                  {t.nav.links[section]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks />
      </div>

      <div className="border-t border-white/5">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-400 sm:flex-row">
          <p>
            &copy; {year} {SITE.name}. {t.footer.rights}
          </p>
          <p className="font-mono">{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
