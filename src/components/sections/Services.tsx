"use client";

import { motion } from "framer-motion";
import { Check, CodeXml, LayoutTemplate, ServerCog, type LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Service = {
  icon: LucideIcon;
  title: string;
  summary: string;
  highlights: string[];
};

const SERVICES: readonly Service[] = [
  {
    icon: CodeXml,
    title: "Custom Web Development",
    summary: "Full-stack applications built for scale, from first commit to millions of requests.",
    highlights: ["React & Next.js frontends", "Type-safe APIs & services", "Performance-first by default"],
  },
  {
    icon: LayoutTemplate,
    title: "Software Templates",
    summary: "Ready-to-deploy architectural foundations that accelerate your launch by weeks.",
    highlights: ["Auth, billing & dashboards", "CI/CD pipelines included", "Documented & extensible"],
  },
  {
    icon: ServerCog,
    title: "Technical Problem Solving",
    summary: "Resolving complex backend, database, or infrastructure bottlenecks with precision.",
    highlights: ["Query & schema optimization", "Scaling & cost reduction", "Architecture audits"],
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          id="services-heading"
          eyebrow="Services"
          title={
            <>
              Engineering that moves <span className="text-gradient">your business</span>
            </>
          }
          description="Whether you're starting from zero or untangling a legacy system, we bring senior-level engineering to every engagement."
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} as="li" delay={index * 0.1} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { icon: Icon, title, summary, highlights } = service;

  const trackPointer = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.article
      onPointerMove={trackPointer}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-colors duration-300 hover:border-accent-400/30"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(139,85,251,0.14), transparent 70%)",
        }}
      />

      <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient-soft ring-1 ring-white/10 transition-shadow duration-300 group-hover:shadow-glow">
        <Icon className="h-6 w-6 text-accent-300" />
      </span>

      <h3 className="relative mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="relative mt-3 leading-relaxed text-ink-200">{summary}</p>

      <ul className="relative mt-6 space-y-2.5 border-t border-white/10 pt-6">
        {highlights.map((highlight) => (
          <li key={highlight} className="flex items-center gap-2.5 text-sm text-ink-100">
            <Check className="h-4 w-4 shrink-0 text-brand-300" />
            {highlight}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
