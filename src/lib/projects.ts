export const PROJECT_CATEGORIES = ["webApps", "templates", "problemSolving"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectPreviewVariant = "dashboard" | "storefront" | "terminal";

export const PROJECT_SLUGS = [
  "fleetpulse",
  "launchkit",
  "shopflow",
  "ledgerTuning",
  "storefrontKit",
  "cloudMigration",
] as const;
export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

/** Language-independent project data; titles, summaries and metrics live in the dictionaries. */
export type Project = {
  slug: ProjectSlug;
  category: ProjectCategory;
  stack: string[];
  preview: ProjectPreviewVariant;
  /** Tailwind gradient stops used for the card's preview glow. */
  accent: string;
  /** Live URL; when omitted the card links to the contact form instead. */
  href?: string;
  terminalLines?: string[];
};

// Sample content: replace with real projects, clients, and metrics before launch.
export const PROJECTS: readonly Project[] = [
  {
    slug: "fleetpulse",
    category: "webApps",
    stack: ["Next.js", "PostgreSQL", "WebSockets"],
    preview: "dashboard",
    accent: "from-brand-500 to-cyan-400",
  },
  {
    slug: "launchkit",
    category: "templates",
    stack: ["Next.js", "Prisma", "Stripe"],
    preview: "dashboard",
    accent: "from-accent-500 to-fuchsia-400",
  },
  {
    slug: "shopflow",
    category: "webApps",
    stack: ["Next.js", "Shopify API", "Algolia"],
    preview: "storefront",
    accent: "from-fuchsia-500 to-rose-400",
  },
  {
    slug: "ledgerTuning",
    category: "problemSolving",
    stack: ["PostgreSQL", "Redis", "Grafana"],
    preview: "terminal",
    accent: "from-emerald-500 to-brand-500",
    terminalLines: [
      "$ explain analyze monthly_report",
      "before  p95 1,840ms  seq scan",
      "after   p95   120ms  index scan",
      "✓ deployed with zero downtime",
    ],
  },
  {
    slug: "storefrontKit",
    category: "templates",
    stack: ["Next.js", "Sanity", "Stripe"],
    preview: "storefront",
    accent: "from-brand-500 to-accent-500",
  },
  {
    slug: "cloudMigration",
    category: "problemSolving",
    stack: ["Docker", "Kubernetes", "Terraform"],
    preview: "terminal",
    accent: "from-amber-400 to-accent-500",
    terminalLines: [
      "$ terraform plan -out=rightsize",
      "~ 14 resources resized",
      "- 6 idle instances removed",
      "✓ monthly cost: −38%",
    ],
  },
];
