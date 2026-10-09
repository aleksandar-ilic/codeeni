"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import clsx from "clsx";

import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { NAV_LINKS, START_PROJECT_HREF } from "@/lib/navigation";

const SCROLL_THRESHOLD = 24;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setIsScrolled(y > SCROLL_THRESHOLD));

  useEffect(() => {
    const closeOnDesktop = () => window.innerWidth >= 768 && setIsMenuOpen(false);
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
      <nav aria-label="Primary" className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="focus-ring rounded-md" aria-label="Codeeni home">
          <Logo />
        </Link>

        <DesktopLinks />

        <div className="hidden md:block">
          <ButtonLink href={START_PROJECT_HREF} size="sm">
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-100 hover:bg-white/5 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>{isMenuOpen && <MobileMenu onNavigate={closeMenu} />}</AnimatePresence>
    </motion.header>
  );
}

function DesktopLinks() {
  return (
    <ul className="hidden items-center gap-1 md:flex">
      {NAV_LINKS.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            className="focus-ring relative rounded-full px-4 py-2 text-sm text-ink-200 transition-colors hover:text-white"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      id="mobile-menu"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="overflow-hidden border-t border-white/10 md:hidden"
    >
      <ul className="container flex flex-col gap-1 py-4">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              className="focus-ring block rounded-lg px-3 py-3 text-base text-ink-100 hover:bg-white/5 hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
        <li className="pt-2">
          <ButtonLink href={START_PROJECT_HREF} onClick={onNavigate} className="w-full">
            Start a Project
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </li>
      </ul>
    </motion.div>
  );
}
