import clsx from "clsx";

import { SOCIAL_LINKS, type SocialPlatform } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, XIcon } from "./SocialIcons";

const PLATFORM_ICONS: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={clsx("flex items-center gap-3", className)}>
      {SOCIAL_LINKS.map(({ platform, label, href }) => {
        const Icon = PLATFORM_ICONS[platform];
        return (
          <li key={platform}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="focus-ring glass flex h-10 w-10 items-center justify-center rounded-full text-ink-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400/40 hover:text-white hover:shadow-glow"
            >
              <Icon className="h-4 w-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
