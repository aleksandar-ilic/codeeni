"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import clsx from "clsx";

import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useI18n } from "@/i18n/I18nProvider";
import { NAV_SECTIONS, START_PROJECT_PATH } from "@/lib/navigation";

const SCROLL_THRESHOLD = 24;

export function Navbar() {
  const { t, href } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setIsScrolled(y > SCROLL_THRESHOLD));

  useEffect(() => {
    const closeOnDesktop = () => window.innerWidth >= 1024 && setIsMenuOpen(false);
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const isElevated = isScrolled || isMenuOpen;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        isElevated
          ? "border-b border-white/10 bg-ink-950/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label={t.nav.primary} className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href={href("/")} className="focus-ring rounded-md" aria-label={t.nav.home}>
          <Logo />
        </Link>

        <DesktopLinks />

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <ButtonLink href={href(START_PROJECT_PATH)} size="sm">
            {t.nav.startProject}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-100 hover:bg-white/5"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>{isMenuOpen && <MobileMenu onNavigate={closeMenu} />}</AnimatePresence>
    </motion.header>
  );
}

function DesktopLinks() {
  const { t, href } = useI18n();

  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {NAV_SECTIONS.map((section) => (
        <li key={section}>
          <Link
            href={href(`/#${section}`)}
            className="focus-ring relative rounded-full px-4 py-2 text-sm text-ink-200 transition-colors hover:text-white"
          >
            {t.nav.links[section]}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const { t, href } = useI18n();

  return (
    <motion.div
      id="mobile-menu"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="overflow-hidden border-t border-white/10 lg:hidden"
    >
      <ul className="container flex flex-col gap-1 py-4">
        {NAV_SECTIONS.map((section) => (
          <li key={section}>
            <Link
              href={href(`/#${section}`)}
              onClick={onNavigate}
              className="focus-ring block rounded-lg px-3 py-3 text-base text-ink-100 hover:bg-white/5 hover:text-white"
            >
              {t.nav.links[section]}
            </Link>
          </li>
        ))}
        <li className="flex items-center justify-between px-3 py-3">
          <span className="text-sm text-ink-300">{t.controls.language}</span>
          <LanguageSwitcher />
        </li>
        <li className="pt-2">
          <ButtonLink href={href(START_PROJECT_PATH)} onClick={onNavigate} className="w-full">
            {t.nav.startProject}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </li>
      </ul>
    </motion.div>
  );
}
