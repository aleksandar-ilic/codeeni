"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { CONTACT_ANCHOR } from "@/lib/navigation";
import { HeroVisual } from "./hero/HeroVisual";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const TRUST_POINTS = ["Full-stack engineering", "Cloud-native architecture", "Production-ready templates"];

export function Hero() {
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
            Where Logic Meets Effortless Execution.
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Elegant Software Solutions for <span className="text-gradient">Complex Problems.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-base leading-relaxed text-ink-200 sm:text-lg">
            We build custom web applications, scalable architecture, and ready-to-use software
            templates that drive your business forward.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={CONTACT_ANCHOR} size="lg">
              Let&apos;s Build Together
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#solutions" variant="secondary" size="lg">
              Explore Our Solutions
            </ButtonLink>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-300"
          >
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
                {point}
              </li>
            ))}
          </motion.ul>
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
