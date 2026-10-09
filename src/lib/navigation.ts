export type NavLink = {
  label: string;
  href: `#${string}`;
};

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const CONTACT_ANCHOR = "#contact";
