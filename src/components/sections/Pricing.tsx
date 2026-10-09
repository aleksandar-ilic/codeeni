import { ArrowRight, Clock } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localizePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getDictionary, getLocale } from "@/i18n/server";
import { START_PROJECT_PATH } from "@/lib/navigation";

export async function Pricing() {
  const { pricing: copy } = await getDictionary();
  const locale = await getLocale();

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          id="pricing-heading"
          align="left"
          eyebrow={copy.eyebrow}
          title={
            <>
              {copy.titleStart}
              <span className="text-gradient">{copy.titleHighlight}</span>
            </>
          }
          description={copy.description}
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {copy.principles.map((principle, index) => (
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
            <QuoteCard quote={copy.quote} href={localizePath(locale, START_PROJECT_PATH)} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function QuoteCard({ quote, href }: { quote: Dictionary["pricing"]["quote"]; href: string }) {
  return (
    <aside className="glass relative overflow-hidden rounded-2xl p-8 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-600/25 blur-3xl"
      />

      <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-ink-300">{quote.eyebrow}</p>
      <h3 className="relative mt-4 text-2xl font-semibold leading-snug text-white sm:text-3xl">
        {quote.titleStart}
        <span className="text-gradient">{quote.titleHighlight}</span>
      </h3>
      <p className="relative mt-4 leading-relaxed text-ink-200">{quote.body}</p>

      <div className="relative mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ButtonLink href={href} size="lg">
          {quote.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </ButtonLink>
        <p className="flex items-center gap-2 text-sm text-ink-300">
          <Clock className="h-4 w-4 text-accent-300" />
          {quote.reply}
        </p>
      </div>
    </aside>
  );
}
