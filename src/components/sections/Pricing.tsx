import { ArrowRight, Clock } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { START_PROJECT_HREF } from "@/lib/navigation";
import { SITE } from "@/lib/site";

type Principle = {
  title: string;
  description: string;
};

const PRINCIPLES: readonly Principle[] = [
  {
    title: "Fair, transparent pricing",
    description: "Fixed quotes for well-defined scope, clear rates for ongoing work. You always know what you're paying for.",
  },
  {
    title: "No hidden costs",
    description: "Deliverables, timeline, and budget are agreed upfront, before any work starts.",
  },
  {
    title: "No obligation",
    description: "The first call and estimate are free. Decide only after you've seen our proposal.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          id="pricing-heading"
          align="left"
          eyebrow="Pricing"
          title={
            <>
              What does it <span className="text-gradient">cost?</span>
            </>
          }
          description="Every project is scoped to your needs, so there's no one-size-fits-all price list. What we promise is honesty: pricing that fits your stage, not enterprise budgets."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} as="li" delay={index * 0.1} className="flex gap-5 py-6">
                <span className="w-6 shrink-0 pt-0.5 font-mono text-sm text-accent-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-200">{principle.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.15}>
            <QuoteCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function QuoteCard() {
  return (
    <aside className="glass relative overflow-hidden rounded-2xl p-8 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-600/25 blur-3xl"
      />

      <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-ink-300">Your quote</p>
      <h3 className="relative mt-4 text-2xl font-semibold leading-snug text-white sm:text-3xl">
        Tell us what you need and get an <span className="text-gradient">exact price.</span>
      </h3>
      <p className="relative mt-4 leading-relaxed text-ink-200">
        A short call is enough for us to understand your goals and send a concrete proposal. No strings attached.
      </p>

      <div className="relative mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ButtonLink href={START_PROJECT_HREF} size="lg">
          Request a Quote
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </ButtonLink>
        <p className="flex items-center gap-2 text-sm text-ink-300">
          <Clock className="h-4 w-4 text-accent-300" />
          Reply {SITE.responseTime.toLowerCase()}
        </p>
      </div>
    </aside>
  );
}
