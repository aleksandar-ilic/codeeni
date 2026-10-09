"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PROJECT_CATEGORIES, PROJECTS, type ProjectCategory } from "@/lib/projects";
import { ProjectCard } from "./solutions/ProjectCard";

type Filter = "All" | ProjectCategory;

const FILTERS: readonly Filter[] = ["All", ...PROJECT_CATEGORIES];

export function Solutions() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const visibleProjects =
    activeFilter === "All" ? PROJECTS : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          id="solutions-heading"
          eyebrow="Solutions"
          title={
            <>
              Built, shipped, and <span className="text-gradient">running in production</span>
            </>
          }
          description="A selection of custom applications, ready-to-use templates, and technical rescues we've delivered."
        />

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <FilterTabs active={activeFilter} onChange={setActiveFilter} />
        </Reveal>

        <motion.ul layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

type FilterTabsProps = {
  active: Filter;
  onChange: (filter: Filter) => void;
};

function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div role="tablist" aria-label="Filter projects" className="glass inline-flex flex-wrap justify-center gap-1 rounded-full p-1">
      {FILTERS.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={clsx(
              "focus-ring relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isActive ? "text-white" : "text-ink-200 hover:text-white",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="solutions-filter-pill"
                className="absolute inset-0 rounded-full bg-brand-gradient shadow-glow"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{filter}</span>
          </button>
        );
      })}
    </div>
  );
}
