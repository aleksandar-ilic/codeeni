import { TrendingUp, Zap, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary, Segment } from "@/i18n/dictionaries";
import { getDictionary } from "@/i18n/server";

type BenefitGroup = Dictionary["benefits"]["groups"][number];
type Benefit = BenefitGroup["items"][number];

const GROUP_ICONS: readonly LucideIcon[] = [TrendingUp, Zap];

export async function Benefits() {
  const { benefits: copy } = await getDictionary();

  return (
    <section id="benefits" aria-labelledby="benefits-heading" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          id="benefits-heading"
          align="left"
          eyebrow={copy.eyebrow}
          title={
            <>
              {copy.titleStart}
              <span className="text-gradient">{copy.titleHighlight}</span>
            </>
          }
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-2">
          {copy.groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.12}>
              <BenefitCard group={group} icon={GROUP_ICONS[index]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ group, icon: Icon }: { group: BenefitGroup; icon: LucideIcon }) {
  return (
    <article className="glass rounded-2xl p-6 sm:p-8">
      <header className="flex items-center gap-4 border-b border-white/10 pb-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient-soft ring-1 ring-white/10">
          <Icon className="h-5 w-5 text-accent-300" />
        </span>
        <h3 className="text-xl font-semibold text-white sm:text-2xl">{group.title}</h3>
      </header>

      <ol className="divide-y divide-white/10">
        {group.items.map((benefit, index) => (
          <BenefitItem key={benefit.title} benefit={benefit} number={index + 1} />
        ))}
      </ol>
    </article>
  );
}

function BenefitItem({ benefit, number }: { benefit: Benefit; number: number }) {
  return (
    <li className="flex gap-5 py-6 last:pb-0">
      <span className="w-6 shrink-0 pt-0.5 font-mono text-sm text-ink-400">{String(number).padStart(2, "0")}</span>
      <div>
        <h4 className="font-semibold text-white">{benefit.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-ink-200">
          {benefit.body.map((segment: Segment, index) =>
            typeof segment === "string" ? (
              segment
            ) : (
              <strong key={index} className="font-medium text-brand-300">
                {segment.em}
              </strong>
            ),
          )}
        </p>
      </div>
    </li>
  );
}
