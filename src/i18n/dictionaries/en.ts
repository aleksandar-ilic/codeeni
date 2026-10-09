import type { ContactErrorCode } from "@/app/actions/contact";
import type { NavSection } from "@/lib/navigation";
import type { BriefErrorCode, ProjectType, Timeline } from "@/lib/project-brief";
import type { ProjectCategory, ProjectSlug } from "@/lib/projects";

/** Plain strings render as body text; `{ em }` segments are highlighted. */
export type Segment = string | { em: string };

type Titled = { title: string; description: string };
type FieldCopy = { label: string; placeholder: string };

export type Dictionary = {
  meta: { title: string; description: string; ogDescription: string; startTitle: string; startDescription: string };
  site: { tagline: string; responseTime: string };
  nav: {
    links: Record<NavSection, string>;
    startProject: string;
    home: string;
    primary: string;
    footer: string;
    openMenu: string;
    closeMenu: string;
  };
  controls: { theme: string; language: string };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    guarantee: { aria: string; label: string; before: string; highlight: string; after: string };
    visual: { codeAria: string; uptime: string; deploy: string; tests: string };
  };
  services: {
    eyebrow: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    items: { title: string; summary: string; highlights: string[] }[];
  };
  benefits: {
    eyebrow: string;
    titleStart: string;
    titleHighlight: string;
    groups: { title: string; items: { title: string; body: Segment[] }[] }[];
  };
  solutions: {
    eyebrow: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    filterLabel: string;
    all: string;
    categories: Record<ProjectCategory, string>;
    viewLive: string;
    buildSimilar: string;
    techStack: string;
    projects: Record<ProjectSlug, { title: string; client: string; summary: string; metric: { value: string; label: string } }>;
  };
  process: {
    eyebrow: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    stepLabel: string;
    steps: (Titled & { deliverables: string[] })[];
  };
  pricing: {
    eyebrow: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    principles: Titled[];
    quote: { eyebrow: string; titleStart: string; titleHighlight: string; body: string; cta: string; reply: string };
  };
  contact: {
    eyebrow: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    emailLabel: string;
    responseLabel: string;
    form: {
      name: FieldCopy;
      email: FieldCopy;
      details: FieldCopy;
      submit: string;
      sending: string;
      success: string;
      fixFields: string;
      errors: Record<ContactErrorCode, string>;
    };
  };
  footer: { rights: string; builtWith: string };
  brief: {
    eyebrow: string;
    titleStart: string;
    titleHighlight: string;
    intro: string;
    assurances: [string, string, string];
    steps: (Titled & { label: string; hint: string })[];
    fields: {
      name: FieldCopy;
      business: FieldCopy;
      projectType: string;
      description: FieldCopy;
      timeline: string;
      website: FieldCopy;
      social: FieldCopy;
      location: FieldCopy;
      links: FieldCopy;
      phone: FieldCopy;
      email: FieldCopy;
    };
    projectTypes: Record<ProjectType, string>;
    timelines: Record<Timeline, string>;
    optional: string;
    back: string;
    next: string;
    send: string;
    sending: string;
    reviewAnswers: string;
    errors: Record<BriefErrorCode, string>;
    success: { title: string; titleNoName: string; body: string; back: string };
  };
};

export const en: Dictionary = {
  meta: {
    title: "Codeeni — Where Logic Meets Effortless Execution",
    description:
      "Codeeni builds custom web applications, scalable architecture, and ready-to-use software templates that drive your business forward.",
    ogDescription: "Elegant software solutions for complex problems.",
    startTitle: "Start a Project — Codeeni",
    startDescription: "Tell us about your business and what you need. Four short steps, no obligation.",
  },
  site: {
    tagline: "Where Logic Meets Effortless Execution",
    responseTime: "Within one business day",
  },
  nav: {
    links: { services: "Services", solutions: "Solutions", process: "Process", contact: "Contact" },
    startProject: "Start a Project",
    home: "Codeeni home",
    primary: "Primary",
    footer: "Footer",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  controls: {
    theme: "Toggle light and dark mode",
    language: "Language",
  },
  hero: {
    badge: "Where Logic Meets Effortless Execution.",
    titleStart: "Elegant Software Solutions for ",
    titleHighlight: "Complex Problems.",
    subtitle:
      "We build custom web applications, scalable architecture, and ready-to-use software templates that drive your business forward.",
    primaryCta: "Let's Build Together",
    secondaryCta: "Explore Our Solutions",
    guarantee: {
      aria: "Our guarantee",
      label: "Guarantee",
      before: "A ",
      highlight: "fixed price",
      after: ", agreed before we write a line of code. No surprises on the invoice.",
    },
    visual: {
      codeAria: "Code sample illustrating a Codeeni build",
      uptime: "Uptime",
      deploy: "Deploy",
      tests: "Tests",
    },
  },
  services: {
    eyebrow: "Services",
    titleStart: "Engineering that moves ",
    titleHighlight: "your business",
    description:
      "Whether you're starting from zero or untangling a legacy system, we bring senior-level engineering to every engagement.",
    items: [
      {
        title: "Custom Web Development",
        summary: "Full-stack applications built for scale, from first commit to millions of requests.",
        highlights: ["React & Next.js frontends", "Type-safe APIs & services", "Performance-first by default"],
      },
      {
        title: "Software Templates",
        summary: "Ready-to-deploy architectural foundations that accelerate your launch by weeks.",
        highlights: ["Auth, billing & dashboards", "CI/CD pipelines included", "Documented & extensible"],
      },
      {
        title: "Technical Problem Solving",
        summary: "Resolving complex backend, database, or infrastructure bottlenecks with precision.",
        highlights: ["Query & schema optimization", "Scaling & cost reduction", "Architecture audits"],
      },
    ],
  },
  benefits: {
    eyebrow: "Why it matters",
    titleStart: "What great software ",
    titleHighlight: "actually does for you",
    groups: [
      {
        title: "Grows your revenue",
        items: [
          {
            title: "Found on Google and in AI search",
            body: [
              "Fast, well-structured sites rank higher and become ",
              { em: "the sources ChatGPT and Perplexity cite" },
              " when someone asks for a recommendation.",
            ],
          },
          {
            title: "Speed that converts",
            body: [
              "Every extra second of load time costs sales. We build for sub-second pages, so ",
              { em: "more visitors become customers" },
              ".",
            ],
          },
          {
            title: "Launch weeks earlier",
            body: [
              "Our templates give you auth, billing, and dashboards on day one, so you ",
              { em: "start selling sooner" },
              ".",
            ],
          },
          {
            title: "Scales without a rewrite",
            body: [
              "Architecture planned for growth means your product handles ",
              { em: "10× the users without starting over" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Saves time and money",
        items: [
          {
            title: "Automate the busywork",
            body: [
              "Invoices, reports, onboarding emails, data entry: if your team repeats it, ",
              { em: "software can do it" },
              ".",
            ],
          },
          {
            title: "One dashboard, not ten spreadsheets",
            body: ["Live data in one place, so decisions take ", { em: "minutes instead of meetings" }, "."],
          },
          {
            title: "Lower infrastructure bills",
            body: [
              "Right-sized cloud setups and efficient queries mean you ",
              { em: "stop paying for capacity you don't use" },
              ".",
            ],
          },
          {
            title: "Fewer 3 a.m. emergencies",
            body: [
              "Automated tests, monitoring, and clean deployments let your team ",
              { em: "build features instead of fighting fires" },
              ".",
            ],
          },
        ],
      },
    ],
  },
  solutions: {
    eyebrow: "Solutions",
    titleStart: "Built, shipped, and ",
    titleHighlight: "running in production",
    description: "A selection of custom applications, ready-to-use templates, and technical rescues we've delivered.",
    filterLabel: "Filter projects",
    all: "All",
    categories: { webApps: "Web Apps", templates: "Templates", problemSolving: "Problem Solving" },
    viewLive: "View live",
    buildSimilar: "Build similar",
    techStack: "Tech stack",
    projects: {
      fleetpulse: {
        title: "FleetPulse",
        client: "Logistics operator",
        summary: "Real-time fleet tracking and dispatch dashboard replacing a patchwork of spreadsheets.",
        metric: { value: "40%", label: "faster dispatch" },
      },
      launchkit: {
        title: "LaunchKit SaaS Starter",
        client: "Codeeni template",
        summary: "Production-ready SaaS foundation with auth, team accounts, Stripe billing, and an admin panel.",
        metric: { value: "3 wks", label: "saved per launch" },
      },
      shopflow: {
        title: "ShopFlow Commerce",
        client: "Retail brand",
        summary: "Headless storefront with lightning-fast product search and a streamlined one-page checkout.",
        metric: { value: "2.1×", label: "conversion rate" },
      },
      ledgerTuning: {
        title: "Ledger Query Tuning",
        client: "Fintech platform",
        summary: "Rescued a slowing transaction ledger through index redesign and query restructuring.",
        metric: { value: "15×", label: "faster reports" },
      },
      storefrontKit: {
        title: "Storefront Kit",
        client: "Codeeni template",
        summary: "E-commerce starter with catalog, cart, payments, and CMS-driven pages ready to brand.",
        metric: { value: "< 1s", label: "page loads" },
      },
      cloudMigration: {
        title: "Cloud Cost Overhaul",
        client: "B2B SaaS company",
        summary: "Containerized a legacy monolith and right-sized infrastructure without a single outage.",
        metric: { value: "−38%", label: "monthly cloud bill" },
      },
    },
  },
  process: {
    eyebrow: "How we work",
    titleStart: "The ",
    titleHighlight: "Effortless Execution",
    titleEnd: " process",
    description: "A clear, three-phase path from idea to production, with no surprises along the way.",
    stepLabel: "Step",
    steps: [
      {
        title: "Architecture & Strategy",
        description:
          "We map your goals to a technical blueprint: the right stack, data model, and infrastructure before a single line ships.",
        deliverables: ["Technical roadmap", "System design"],
      },
      {
        title: "Precision Engineering",
        description:
          "Iterative, test-driven development with weekly demos, so you see real progress and steer with confidence.",
        deliverables: ["Weekly demos", "Automated tests"],
      },
      {
        title: "Seamless Deployment",
        description: "Zero-downtime releases, monitoring, and a clean handover. Your product goes live and stays fast.",
        deliverables: ["CI/CD & monitoring", "Docs & handover"],
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    titleStart: "What does it ",
    titleHighlight: "cost?",
    description:
      "Every project is scoped to your needs, so there's no one-size-fits-all price list. What we promise is honesty: pricing that fits your stage, not enterprise budgets.",
    principles: [
      {
        title: "Fair, transparent pricing",
        description:
          "Fixed quotes for well-defined scope, clear rates for ongoing work. You always know what you're paying for.",
      },
      {
        title: "No hidden costs",
        description: "Deliverables, timeline, and budget are agreed upfront, before any work starts.",
      },
      {
        title: "No obligation",
        description: "The first call and estimate are free. Decide only after you've seen our proposal.",
      },
    ],
    quote: {
      eyebrow: "Your quote",
      titleStart: "Tell us what you need and get an ",
      titleHighlight: "exact price.",
      body: "A short call is enough for us to understand your goals and send a concrete proposal. No strings attached.",
      cta: "Request a Quote",
      reply: "Reply within one business day",
    },
  },
  contact: {
    eyebrow: "Contact",
    titleStart: "Let's build ",
    titleHighlight: "together",
    description:
      "Tell us about your project. We'll respond with clear next steps, an honest assessment, and no sales fluff.",
    emailLabel: "Email us",
    responseLabel: "Response time",
    form: {
      name: { label: "Name", placeholder: "Ada Lovelace" },
      email: { label: "Email", placeholder: "ada@company.com" },
      details: {
        label: "Project Details",
        placeholder: "Tell us about your goals, timeline, and any technical challenges…",
      },
      submit: "Send Message",
      sending: "Sending…",
      success: "Thanks, {name}! We'll get back to you shortly.",
      fixFields: "Please fix the highlighted fields.",
      errors: {
        nameRequired: "Please tell us your name.",
        emailInvalid: "Please enter a valid email address.",
        detailsTooShort: "Share a bit more about your project (at least {min} characters).",
      },
    },
  },
  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with logic & care.",
  },
  brief: {
    eyebrow: "Project brief",
    titleStart: "Start your ",
    titleHighlight: "project",
    intro: "Four short steps, about two minutes.",
    assurances: ["Reply within one business day", "Fixed price, agreed up front", "Free estimate, no obligation"],
    steps: [
      {
        label: "About you",
        hint: "Name and business",
        title: "Tell us who you are",
        description: "Whether you run a local shop or a growing company, it all starts with a quick hello.",
      },
      {
        label: "Your project",
        hint: "What you need",
        title: "What can we build for you?",
        description: "A rough idea is enough. We'll shape the details together.",
      },
      {
        label: "References",
        hint: "Optional links",
        title: "Anything we should look at?",
        description: "Everything here is optional. The more you share, the more tailored our proposal.",
      },
      {
        label: "Contact",
        hint: "How to reach you",
        title: "How can we reach you?",
        description: "Leave a phone number, an email, or both. Whatever suits you best.",
      },
    ],
    fields: {
      name: { label: "Your name", placeholder: "Jane Smith" },
      business: { label: "Business or company", placeholder: "e.g. dental clinic, SaaS startup" },
      projectType: "Type of project",
      description: {
        label: "Describe what you need",
        placeholder: "e.g. A website for my salon with services, prices and online booking…",
      },
      timeline: "When would you like to start?",
      website: { label: "Current website", placeholder: "yourbusiness.com" },
      social: { label: "Instagram or Facebook", placeholder: "@yourbusiness" },
      location: { label: "Google Maps location", placeholder: "Link or address" },
      links: { label: "Designs, documents or sites you like", placeholder: "Figma, Google Drive, example websites…" },
      phone: { label: "Phone number", placeholder: "+381 65 123 4567" },
      email: { label: "Email", placeholder: "you@business.com" },
    },
    projectTypes: { website: "Website", store: "Online store", app: "Web app / system", other: "Something else" },
    timelines: { asap: "As soon as possible", soon: "In the next 1–2 months", exploring: "Just exploring" },
    optional: "(optional)",
    back: "Back",
    next: "Continue",
    send: "Send brief",
    sending: "Sending…",
    reviewAnswers: "Some answers need another look.",
    errors: {
      nameRequired: "Please tell us your name.",
      businessRequired: "Tell us what your business does.",
      projectTypeRequired: "Pick the option closest to your project.",
      descriptionTooShort: "A few more words, please (at least {min} characters).",
      timelineInvalid: "Pick one of the options.",
      contactRequired: "Leave a phone number or an email so we can reach you.",
      phoneInvalid: "Please enter a valid phone number.",
      emailInvalid: "Please enter a valid email address.",
    },
    success: {
      title: "Thanks, {name}!",
      titleNoName: "Thanks!",
      body: "We've got your brief and will get back to you within one business day.",
      back: "Back to homepage",
    },
  },
};
