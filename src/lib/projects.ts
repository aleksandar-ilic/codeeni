export type ProjectCategory = "Web Apps" | "Templates" | "Problem Solving";

export type ProjectPreviewVariant = "dashboard" | "storefront" | "terminal";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  summary: string;
  stack: string[];
  metric: { value: string; label: string };
  preview: ProjectPreviewVariant;
  /** Tailwind gradient stops used for the card's preview glow. */
  accent: string;
  /** Live URL; when omitted the card links to the contact form instead. */
  href?: string;
  terminalLines?: string[];
};

export const PROJECT_CATEGORIES: readonly ProjectCategory[] = ["Web Apps", "Templates", "Problem Solving"];

// Sample content: replace with real projects, clients, and metrics before launch.
export const PROJECTS: readonly Project[] = [
  {
    slug: "fleetpulse",
    title: "FleetPulse",
    client: "Logistics operator",
    category: "Web Apps",
    summary: "Real-time fleet tracking and dispatch dashboard replacing a patchwork of spreadsheets.",
    stack: ["Next.js", "PostgreSQL", "WebSockets"],
    metric: { value: "40%", label: "faster dispatch" },
    preview: "dashboard",
    accent: "from-brand-500 to-cyan-400",
  },
  {
    slug: "launchkit",
    title: "LaunchKit SaaS Starter",
    client: "Codeeni template",
    category: "Templates",
    summary: "Production-ready SaaS foundation with auth, team accounts, Stripe billing, and an admin panel.",
    stack: ["Next.js", "Prisma", "Stripe"],
    metric: { value: "3 wks", label: "saved per launch" },
    preview: "dashboard",
    accent: "from-accent-500 to-fuchsia-400",
  },
  {
    slug: "shopflow",
    title: "ShopFlow Commerce",
    client: "Retail brand",
    category: "Web Apps",
    summary: "Headless storefront with lightning-fast product search and a streamlined one-page checkout.",
    stack: ["Next.js", "Shopify API", "Algolia"],
    metric: { value: "2.1×", label: "conversion rate" },
    preview: "storefront",
    accent: "from-fuchsia-500 to-rose-400",
  },
  {
    slug: "ledger-tuning",
    title: "Ledger Query Tuning",
    client: "Fintech platform",
    category: "Problem Solving",
    summary: "Rescued a slowing transaction ledger through index redesign and query restructuring.",
    stack: ["PostgreSQL", "Redis", "Grafana"],
    metric: { value: "15×", label: "faster reports" },
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
    slug: "storefront-kit",
    title: "Storefront Kit",
    client: "Codeeni template",
    category: "Templates",
    summary: "E-commerce starter with catalog, cart, payments, and CMS-driven pages ready to brand.",
    stack: ["Next.js", "Sanity", "Stripe"],
    metric: { value: "< 1s", label: "page loads" },
    preview: "storefront",
    accent: "from-brand-500 to-accent-500",
  },
  {
    slug: "cloud-migration",
    title: "Cloud Cost Overhaul",
    client: "B2B SaaS company",
    category: "Problem Solving",
    summary: "Containerized a legacy monolith and right-sized infrastructure without a single outage.",
    stack: ["Docker", "Kubernetes", "Terraform"],
    metric: { value: "−38%", label: "monthly cloud bill" },
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
