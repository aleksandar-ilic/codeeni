"use client";

import { motion } from "framer-motion";
import { Compass, Cpu, Rocket, type LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
  deliverables: string[];
};

const STEPS: readonly Step[] = [
  {
    icon: Compass,
    title: "Architecture & Strategy",
    description:
      "We map your goals to a technical blueprint: the right stack, data model, and infrastructure before a single line ships.",
    deliverables: ["Technical roadmap", "System design"],
  },
  {
    icon: Cpu,
    title: "Precision Engineering",
    description:
      "Iterative, test-driven development with weekly demos, so you see real progress and steer with confidence.",
    deliverables: ["Weekly demos", "Automated tests"],
  },
  {
    icon: Rocket,
    title: "Seamless Deployment",
    description:
      "Zero-downtime releases, monitoring, and a clean handover. Your product goes live and stays fast.",
    deliverables: ["CI/CD & monitoring", "Docs & handover"],
  },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-700/10 blur-[120px]"
      />

      <div className="container">
        <SectionHeading
          id="process-heading"
          eyebrow="How we work"
          title={
            <>
              The <span className="text-gradient">Effortless Execution</span> process
            </>
          }
          description="A clear, three-phase path from idea to production, with no surprises along the way."
        />

        <div className="relative mt-16 lg:mt-20">
          <TimelineLine />

          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} as="li" delay={index * 0.15} className="relative h-full pl-16 lg:pl-0">
                <StepCard step={step} stepNumber={index + 1} />
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

function StepCard({ step, stepNumber }: { step: Step; stepNumber: number }) {
  const { icon: Icon, title, description, deliverables } = step;
  const label = String(stepNumber).padStart(2, "0");

  return (
    <article className="flex h-full flex-col lg:items-center lg:text-center">
      <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-ink-950 ring-1 ring-accent-400/40 shadow-glow lg:relative">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient">
          <Icon className="h-5 w-5 text-white" />
        </span>
      </span>

      <div className="glass flex-1 rounded-2xl p-6 lg:mt-8 lg:w-full">
        <p className="font-mono text-xs tracking-widest text-accent-300">STEP {label}</p>
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
