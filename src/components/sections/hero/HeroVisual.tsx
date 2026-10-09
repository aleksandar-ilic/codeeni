"use client";

import { motion } from "framer-motion";
import { Activity, CheckCircle2, Rocket, type LucideIcon } from "lucide-react";
import clsx from "clsx";

type NetworkNode = { id: string; x: number; y: number; r: number };

const NODES: readonly NetworkNode[] = [
  { id: "a", x: 60, y: 80, r: 5 },
  { id: "b", x: 190, y: 40, r: 4 },
  { id: "c", x: 330, y: 90, r: 6 },
  { id: "d", x: 110, y: 220, r: 4 },
  { id: "e", x: 250, y: 190, r: 7 },
  { id: "f", x: 370, y: 260, r: 4 },
  { id: "g", x: 50, y: 340, r: 5 },
  { id: "h", x: 200, y: 350, r: 4 },
  { id: "i", x: 320, y: 370, r: 5 },
];

const EDGES: readonly [string, string][] = [
  ["a", "b"], ["b", "c"], ["a", "d"], ["b", "e"], ["c", "e"], ["c", "f"],
  ["d", "e"], ["e", "f"], ["d", "g"], ["d", "h"], ["e", "h"], ["f", "i"],
  ["h", "i"], ["g", "h"],
];

const nodeById = new Map(NODES.map((node) => [node.id, node]));

type CodeToken = { text: string; tone?: "keyword" | "fn" | "string" | "prop" | "muted" | "success" };

const CODE_LINES: readonly CodeToken[][] = [
  [{ text: "const ", tone: "keyword" }, { text: "project = " }, { text: "await ", tone: "keyword" }, { text: "codeeni.", tone: "muted" }, { text: "build", tone: "fn" }, { text: "({" }],
  [{ text: "  stack", tone: "prop" }, { text: ": [" }, { text: '"Next.js"', tone: "string" }, { text: ", " }, { text: '"Postgres"', tone: "string" }, { text: "]," }],
  [{ text: "  architecture", tone: "prop" }, { text: ": " }, { text: '"scalable"', tone: "string" }, { text: "," }],
  [{ text: "  execution", tone: "prop" }, { text: ": " }, { text: '"effortless"', tone: "string" }, { text: "," }],
  [{ text: "});" }],
  [{ text: "" }],
  [{ text: "// ✓ shipped to production in 42s", tone: "success" }],
];

const TONE_STYLES: Record<NonNullable<CodeToken["tone"]>, string> = {
  keyword: "text-accent-300",
  fn: "text-brand-300",
  string: "text-emerald-300",
  prop: "text-sky-200",
  muted: "text-ink-300",
  success: "text-emerald-400/90",
};

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div
        aria-hidden
        className="absolute inset-8 rounded-full bg-brand-gradient opacity-25 blur-3xl"
      />
      <NetworkBackdrop />
      <CodeWindow />

      <StatusChip
        icon={Activity}
        label="Uptime"
        value="99.99%"
        className="left-0 top-[12%] sm:-left-4"
        delay={1.1}
      />
      <StatusChip
        icon={Rocket}
        label="Deploy"
        value="42s"
        className="right-0 top-[4%] sm:-right-2"
        delay={1.3}
        floatOffset
      />
      <StatusChip
        icon={CheckCircle2}
        label="Tests"
        value="248 / 248"
        className="bottom-[8%] right-2 sm:-right-4"
        delay={1.5}
      />
    </div>
  );
}

function NetworkBackdrop() {
  return (
    <svg
      viewBox="0 0 420 420"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5998ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a685ff" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {EDGES.map(([from, to], index) => {
        const a = nodeById.get(from)!;
        const b = nodeById.get(to)!;
        return (
          <motion.line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#hero-edge)"
            strokeWidth="1"
            strokeDasharray="4 6"
            className="animate-dash-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
          />
        );
      })}

      {NODES.map((node, index) => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r * 2.6}
            className="animate-pulse-soft fill-accent-500/15"
            style={{ animationDelay: `${index * 0.35}s` }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            className="fill-brand-300"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.4 + index * 0.06 }}
          />
        </g>
      ))}
    </svg>
  );
}

function CodeWindow() {
  return (
    <div className="absolute inset-0 flex items-center px-4 sm:px-10">
      <motion.figure
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass w-full overflow-hidden rounded-2xl bg-ink-900/60"
        aria-label="Code sample illustrating a Codeeni build"
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-xs text-ink-300">deploy.ts</span>
        </div>

        <pre className="overflow-x-auto px-4 py-4 font-mono text-[11px] leading-6 sm:text-xs sm:leading-6">
          <code>
            {CODE_LINES.map((tokens, index) => (
              <CodeLine key={index} tokens={tokens} lineNumber={index + 1} />
            ))}
          </code>
        </pre>
      </motion.figure>
    </div>
  );
}

function CodeLine({ tokens, lineNumber }: { tokens: CodeToken[]; lineNumber: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.9 + lineNumber * 0.12 }}
      className="flex"
    >
      <span className="mr-4 w-4 select-none text-right text-ink-500">{lineNumber}</span>
      <span className="whitespace-pre text-ink-100">
        {tokens.map((token, index) => (
          <span key={index} className={token.tone && TONE_STYLES[token.tone]}>
            {token.text}
          </span>
        ))}
      </span>
    </motion.div>
  );
}

type StatusChipProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
  delay: number;
  floatOffset?: boolean;
};

function StatusChip({ icon: Icon, label, value, className, delay, floatOffset }: StatusChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={clsx("absolute", className)}
    >
      <div
        className="glass flex animate-float items-center gap-2.5 rounded-xl px-3 py-2"
        style={floatOffset ? { animationDelay: "-3s" } : undefined}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gradient-soft">
          <Icon className="h-3.5 w-3.5 text-accent-300" />
        </span>
        <span className="leading-tight">
          <span className="block text-[10px] uppercase tracking-wider text-ink-300">{label}</span>
          <span className="block text-sm font-semibold text-white">{value}</span>
        </span>
      </div>
    </motion.div>
  );
}
