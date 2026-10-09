import type { Metadata } from "next";

import { ProjectBriefForm } from "@/components/brief/ProjectBriefForm";
import { Navbar } from "@/components/layout/Navbar";
import { getDictionary } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.startTitle, description: t.meta.startDescription };
}

export default function StartProjectPage() {
  return (
    <>
      <Navbar />
      <main className="relative isolate flex min-h-svh items-center overflow-hidden pb-20 pt-32 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-brand-600/15 blur-[120px]" />
          <div className="absolute bottom-0 right-[-10%] h-[320px] w-[320px] rounded-full bg-accent-600/15 blur-[120px]" />
        </div>
        <div className="container">
          <ProjectBriefForm />
        </div>
      </main>
    </>
  );
}
