"use client";

import { motion } from "framer-motion";
import { Compass, Cpu, Rocket, type LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
  deliverables: string[];
};

const STEP_ICONS: readonly LucideIcon[] = [Compass, Cpu, Rocket];

export function Process() {
  const { t } = useI18n();
  const copy = t.process;

  return (
    <section id="process" aria-labelledby="process-heading" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-700/10 blur-[120px]"
      />

      <div className="container">
        <SectionHeading
          id="process-heading"
          eyebrow={copy.eyebrow}
          title={
            <>
              {copy.titleStart}
              <span className="text-gradient">{copy.titleHighlight}</span>
              {copy.titleEnd}
            </>
          }
          description={copy.description}
        />

        <div className="relative mt-16 lg:mt-20">
          <TimelineLine />

          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {copy.steps.map((step, index) => (
              <Reveal key={step.title} as="li" delay={index * 0.15} className="relative h-full pl-16 lg:pl-0">
                <StepCard step={{ ...step, icon: STEP_ICONS[index] }} stepNumber={index + 1} stepLabel={copy.stepLabel} />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineLine() {
  const lineClass = "absolute from-brand-500 via-accent-500 to-brand-500";

  return (
    <div aria-hidden>
      <motion.div
        className={`${lineClass} left-[16.66%] right-[16.66%] top-6 hidden h-px origin-left bg-gradient-to-r lg:block`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <motion.div
        className={`${lineClass} bottom-6 left-6 top-6 w-px origin-top bg-gradient-to-b lg:hidden`}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
    </div>
  );
}

function StepCard({ step, stepNumber, stepLabel }: { step: Step; stepNumber: number; stepLabel: string }) {
  const { icon: Icon, title, description, deliverables } = step;
  const label = String(stepNumber).padStart(2, "0");

  return (
    <article className="flex h-full flex-col lg:items-center lg:text-center">
      <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-ink-950 ring-1 ring-accent-400/40 shadow-glow lg:relative">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient">
          <Icon className="h-5 w-5 text-on-brand" />
        </span>
      </span>

      <div className="glass flex-1 rounded-2xl p-6 lg:mt-8 lg:w-full">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-300">
          {stepLabel} {label}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        <p className="mt-3 leading-relaxed text-ink-200">{description}</p>

        <ul className="mt-5 flex flex-wrap gap-2 lg:justify-center">
          {deliverables.map((deliverable) => (
            <li
              key={deliverable}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-ink-100"
            >
              {deliverable}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
