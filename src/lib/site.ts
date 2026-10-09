export const SITE = {
  name: "Codeeni",
  email: "hello@codeeni.com",
} as const;

export type SocialPlatform = "github" | "linkedin" | "x";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { platform: "github", label: "GitHub", href: "https://github.com/codeeni" },
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/codeeni" },
  { platform: "x", label: "X (Twitter)", href: "https://x.com/codeeni" },
];
