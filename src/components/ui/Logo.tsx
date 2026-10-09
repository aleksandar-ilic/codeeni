import { useId } from "react";
import clsx from "clsx";

import { SITE } from "@/lib/site";

type LogoMarkProps = {
  className?: string;
  size?: keyof typeof MARK_SIZES;
  glow?: boolean;
};

const MARK_SIZES = { md: "h-10", lg: "h-14" } as const;

/**
 * Classic cloud silhouette: four overlapping lobes (left r15, top r22, middle r16, right r13)
 * resting on a flat baseline that opens in the middle to let the circuit traces through.
 */
const CLOUD =
  "M43.5 73H30A15 15 0 1 1 30.2 43A22 22 0 0 1 72.76 32.73A16 16 0 0 1 96 47.05A13 13 0 0 1 95 73H79.5";
/** Wave curl where the left lobe meets the top lobe. */
const CURL = "M30.2 43C36 43 41 46 46 44.5";

const TRACES = [
  "M64.49 40.36L61.5 45V95.2",
  "M80.08 54.04L74.5 60V89.2",
  "M43.05 55.91L48.5 61V89.2",
];

const NODES = [
  { cx: 66, cy: 38 },
  { cx: 82, cy: 52 },
  { cx: 41, cy: 54 },
  { cx: 48.5, cy: 92 },
  { cx: 61.5, cy: 98 },
  { cx: 74.5, cy: 92 },
];

/** Cloud outline whose base dissolves into circuit traces ending in nodes. */
export function LogoMark({ className, size = "md", glow = true }: LogoMarkProps) {
  const gradientId = useId();
  const stroke = `url(#${gradientId})`;

  return (
    <svg
      viewBox="10 12 102 92"
      className={clsx(
        "w-auto shrink-0",
        MARK_SIZES[size],
        glow && "drop-shadow-[0_0_6px_rgba(139,85,251,0.55)]",
        className,
      )}
      role="img"
      aria-label={`${SITE.name} logo`}
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="14" y1="100" x2="108" y2="16">
          <stop offset="0%" stopColor="#3550e8" />
          <stop offset="55%" stopColor="#7c4dff" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>

      <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
        <path d={CLOUD} strokeWidth="4.4" />
        <path d={CURL} strokeWidth="4.4" />
        {TRACES.map((d) => (
          <path key={d} d={d} strokeWidth="2.4" />
        ))}
        {NODES.map(({ cx, cy }) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.8" strokeWidth="2.2" />
        ))}
      </g>
    </svg>
  );
}

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
};

const WORDMARK = "CODEENI";
const WORDMARK_GRADIENT =
  "bg-gradient-to-r from-brand-400 via-accent-400 to-fuchsia-400 bg-clip-text font-display font-bold text-transparent";

export function Logo({ className, showWordmark = true, showTagline = false }: LogoProps) {
  const hasLockup = showWordmark && showTagline;

  return (
    <span className={clsx("inline-flex items-center", hasLockup ? "gap-3" : "gap-2.5", className)}>
      <LogoMark size={hasLockup ? "lg" : "md"} />
      {hasLockup && <WordmarkWithTagline />}
      {showWordmark && !showTagline && (
        <span className={clsx(WORDMARK_GRADIENT, "text-2xl tracking-wide")}>{WORDMARK}</span>
      )}
    </span>
  );
}

/** The tagline sets the column width; the wordmark letters spread to match it exactly. */
function WordmarkWithTagline() {
  return (
    <span className="inline-grid gap-1.5 leading-none">
      <span className={clsx(WORDMARK_GRADIENT, "flex justify-between text-[36px]")}>
        {[...WORDMARK].map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </span>
      <span className="whitespace-nowrap text-[10px] font-medium text-ink-100">{SITE.tagline}</span>
    </span>
  );
}
