import clsx from "clsx";

import type { Project } from "@/lib/projects";

const CHART_BARS = [45, 70, 55, 85, 60, 95, 75];

export function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-ink-900">
      <div
        aria-hidden
        className={clsx(
          "absolute -inset-10 bg-gradient-to-br opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-40",
          project.accent,
        )}
      />

      <div className="relative flex h-full flex-col transition-transform duration-500 group-hover:scale-[1.03]">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-950/60 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 h-2 w-24 rounded-full bg-white/10" />
        </div>

        <div className="flex-1 p-3">
          {project.preview === "dashboard" && <DashboardMock accent={project.accent} />}
          {project.preview === "storefront" && <StorefrontMock accent={project.accent} />}
          {project.preview === "terminal" && <TerminalMock lines={project.terminalLines ?? []} />}
        </div>
      </div>
    </div>
  );
}

function DashboardMock({ accent }: { accent: string }) {
  return (
    <div aria-hidden className="flex h-full gap-3">
      <div className="hidden w-1/5 flex-col gap-1.5 sm:flex">
        {[0, 1, 2, 3].map((item) => (
          <span key={item} className={clsx("h-2 rounded-full", item === 0 ? "bg-white/30" : "bg-white/10")} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((tile) => (
            <div key={tile} className="rounded-md border border-white/10 bg-white/[0.04] p-1.5">
              <span className="block h-1.5 w-1/2 rounded-full bg-white/15" />
              <span className="mt-1.5 block h-2.5 w-3/4 rounded-full bg-white/30" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1.5 rounded-md border border-white/10 bg-white/[0.03] p-2">
          {CHART_BARS.map((height, index) => (
            <span
              key={index}
              style={{ height: `${height}%` }}
              className={clsx("flex-1 rounded-sm bg-gradient-to-t opacity-80", accent)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StorefrontMock({ accent }: { accent: string }) {
  return (
    <div aria-hidden className="grid h-full grid-cols-3 gap-2">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex flex-col gap-1 rounded-md border border-white/10 bg-white/[0.04] p-1.5">
          <span className={clsx("flex-1 rounded bg-gradient-to-br", item % 2 === 0 ? accent : "from-white/10 to-white/5")} />
          <span className="h-1.5 w-3/4 rounded-full bg-white/20" />
          <span className="h-1.5 w-1/3 rounded-full bg-white/35" />
        </div>
      ))}
    </div>
  );
}

function TerminalMock({ lines }: { lines: string[] }) {
  return (
    <div className="h-full space-y-1.5 font-mono text-[10px] leading-relaxed sm:text-[11px]">
      {lines.map((line) => (
        <p
          key={line}
          className={clsx(
            "truncate",
            line.startsWith("$") && "text-brand-300",
            line.startsWith("✓") && "text-emerald-300",
            !line.startsWith("$") && !line.startsWith("✓") && "text-ink-200",
          )}
        >
          {line}
        </p>
      ))}
      <span className="inline-block h-3 w-1.5 animate-pulse-soft bg-ink-200" />
    </div>
  );
}
