import { TrendingUp, Zap, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Plain strings render as body text; `{ em }` segments are highlighted. */
type Segment = string | { em: string };

type Benefit = {
  title: string;
  body: Segment[];
};

type BenefitGroup = {
  icon: LucideIcon;
  title: string;
  benefits: Benefit[];
};

const BENEFIT_GROUPS: readonly BenefitGroup[] = [
  {
    icon: TrendingUp,
    title: "Grows your revenue",
    benefits: [
      {
        title: "Found on Google and in AI search",
        body: [
          "Fast, well-structured sites rank higher and become ",
          { em: "the sources ChatGPT and Perplexity cite" },
          " when someone asks for a recommendation.",
        ],
      },
      {
        title: "Speed that converts",
        body: [
          "Every extra second of load time costs sales. We build for sub-second pages, so ",
          { em: "more visitors become customers" },
          ".",
        ],
      },
      {
        title: "Launch weeks earlier",
        body: [
          "Our templates give you auth, billing, and dashboards on day one, so you ",
          { em: "start selling sooner" },
          ".",
        ],
      },
      {
        title: "Scales without a rewrite",
        body: [
          "Architecture planned for growth means your product handles ",
          { em: "10× the users without starting over" },
          ".",
        ],
      },
    ],
  },
  {
    icon: Zap,
    title: "Saves time and money",
    benefits: [
      {
        title: "Automate the busywork",
        body: [
          "Invoices, reports, onboarding emails, data entry: if your team repeats it, ",
          { em: "software can do it" },
          ".",
        ],
      },
      {
        title: "One dashboard, not ten spreadsheets",
        body: ["Live data in one place, so decisions take ", { em: "minutes instead of meetings" }, "."],
      },
      {
        title: "Lower infrastructure bills",
        body: [
          "Right-sized cloud setups and efficient queries mean you ",
          { em: "stop paying for capacity you don't use" },
          ".",
        ],
      },
      {
        title: "Fewer 3 a.m. emergencies",
        body: [
          "Automated tests, monitoring, and clean deployments let your team ",
          { em: "build features instead of fighting fires" },
          ".",
        ],
      },
    ],
  },
];

export function Benefits() {
  return (
    <section id="benefits" aria-labelledby="benefits-heading" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          id="benefits-heading"
          align="left"
          eyebrow="Why it matters"
          title={
            <>
              What great software <span className="text-gradient">actually does for you</span>
            </>
          }
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-2">
          {BENEFIT_GROUPS.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.12}>
              <BenefitCard group={group} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ group }: { group: BenefitGroup }) {
  const { icon: Icon, title, benefits } = group;

  return (
    <article className="glass rounded-2xl p-6 sm:p-8">
      <header className="flex items-center gap-4 border-b border-white/10 pb-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient-soft ring-1 ring-white/10">
          <Icon className="h-5 w-5 text-accent-300" />
        </span>
        <h3 className="text-xl font-semibold text-white sm:text-2xl">{title}</h3>
      </header>

      <ol className="divide-y divide-white/10">
        {benefits.map((benefit, index) => (
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
          {benefit.body.map((segment, index) =>
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
