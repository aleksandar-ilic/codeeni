"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";
import { START_PROJECT_PATH } from "@/lib/navigation";
import { HeroVisual } from "./hero/HeroVisual";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const { t, href } = useI18n();
  const { guarantee } = t.hero;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44"
    >
      <HeroBackground />

      <div className="container grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-2xl">
          <motion.p
            variants={item}
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-ink-100 sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-300" />
            {t.hero.badge}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t.hero.titleStart}
            <span className="text-gradient">{t.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-base leading-relaxed text-ink-200 sm:text-lg">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={href(START_PROJECT_PATH)} size="lg">
              {t.hero.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#solutions" variant="secondary" size="lg">
              {t.hero.secondaryCta}
            </ButtonLink>
          </motion.div>

          <motion.aside
            variants={item}
            aria-label={guarantee.aria}
            className="glass mt-10 inline-flex items-center gap-4 rounded-2xl px-5 py-4"
          >
            <ShieldCheck className="h-7 w-7 shrink-0 text-accent-300" strokeWidth={1.75} />
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
                {guarantee.label}
              </p>
              <p className="mt-1 text-sm text-ink-200 sm:text-base">
                {guarantee.before}
                <strong className="font-semibold text-white">{guarantee.highlight}</strong>
                {guarantee.after}
              </p>
            </div>
          </motion.aside>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />
      <div className="absolute right-[-10%] top-1/3 h-[360px] w-[360px] rounded-full bg-accent-600/20 blur-[120px]" />
    </div>
  );
}
