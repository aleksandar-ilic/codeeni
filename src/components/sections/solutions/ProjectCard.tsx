import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/projects";
import { CONTACT_ANCHOR } from "@/lib/navigation";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectCard({ project }: { project: Project }) {
  const { title, client, category, summary, stack, metric, href } = project;
  const isExternal = Boolean(href);

  return (
    <article className="glass group flex h-full flex-col rounded-2xl p-4 transition-colors duration-300 hover:border-accent-400/30">
      <ProjectPreview project={project} />

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-ink-100">{category}</span>
          <span className="text-ink-300">{client}</span>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-200">{summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {stack.map((tech) => (
            <li key={tech} className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-ink-200">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
          <p>
            <span className="text-gradient block text-2xl font-semibold">{metric.value}</span>
            <span className="text-xs text-ink-300">{metric.label}</span>
          </p>
          <a
            href={href ?? CONTACT_ANCHOR}
            {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
            className="focus-ring inline-flex items-center gap-1 rounded-full text-sm font-medium text-ink-100 transition-colors hover:text-white"
          >
            {isExternal ? "View live" : "Build similar"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
