import { Clock, Mail } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SITE } from "@/lib/site";
import { ContactForm } from "./contact/ContactForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-24 sm:py-32">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="flex flex-col">
          <SectionHeading
            id="contact-heading"
            align="left"
            eyebrow="Contact"
            title={
              <>
                Let&apos;s build <span className="text-gradient">together</span>
              </>
            }
            description="Tell us about your project. We'll respond with clear next steps, an honest assessment, and no sales fluff."
          />

          <Reveal delay={0.15} className="mt-10 space-y-5">
            <ContactDetail icon={<Mail className="h-5 w-5 text-accent-300" />} label="Email us">
              <a href={`mailto:${SITE.email}`} className="focus-ring rounded text-white hover:text-accent-200">
                {SITE.email}
              </a>
            </ContactDetail>
            <ContactDetail icon={<Clock className="h-5 w-5 text-accent-300" />} label="Response time">
              <span className="text-white">{SITE.responseTime}</span>
            </ContactDetail>
            <SocialLinks className="pt-3" />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

type ContactDetailProps = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
};

function ContactDetail({ icon, label, children }: ContactDetailProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient-soft ring-1 ring-white/10">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-ink-300">{label}</p>
        {children}
      </div>
    </div>
  );
}
