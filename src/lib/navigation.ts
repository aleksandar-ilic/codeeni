export const NAV_SECTIONS = ["services", "solutions", "process", "contact"] as const;
export type NavSection = (typeof NAV_SECTIONS)[number];

export const CONTACT_PATH = "/#contact";
export const START_PROJECT_PATH = "/start";
