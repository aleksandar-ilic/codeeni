import clsx from "clsx";

import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ id, eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <Reveal className={clsx("max-w-2xl", isCentered && "mx-auto text-center")}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-300">{eyebrow}</p>
      <h2 id={id} className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-ink-200 sm:text-lg">{description}</p>}
    </Reveal>
  );
}
