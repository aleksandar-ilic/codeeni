export const PROJECT_TYPES = ["Website", "Online store", "Web app / system", "Something else"] as const;
export const TIMELINES = ["As soon as possible", "In the next 1–2 months", "Just exploring"] as const;

export type BriefField =
  | "name"
  | "business"
  | "projectType"
  | "description"
  | "timeline"
  | "website"
  | "social"
  | "location"
  | "links"
  | "phone"
  | "email";

export type BriefValues = Record<BriefField, string>;
export type BriefErrors = Partial<Record<BriefField, string>>;

export const BRIEF_STEPS: readonly (readonly BriefField[])[] = [
  ["name", "business"],
  ["projectType", "description", "timeline"],
  ["website", "social", "location", "links"],
  ["phone", "email"],
];

export const BRIEF_FIELDS: readonly BriefField[] = BRIEF_STEPS.flat();

export const EMPTY_BRIEF = Object.fromEntries(BRIEF_FIELDS.map((field) => [field, ""])) as BriefValues;

export const MIN_DESCRIPTION_LENGTH = 20;
export const MAX_DESCRIPTION_LENGTH = 2000;
export const MAX_FIELD_LENGTH = 200;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()/-]{6,20}$/;

function isOneOf(options: readonly string[], value: string) {
  return options.includes(value);
}

export function normalizeBrief(values: BriefValues): BriefValues {
  return Object.fromEntries(
    BRIEF_FIELDS.map((field) => {
      const limit = field === "description" ? MAX_DESCRIPTION_LENGTH : MAX_FIELD_LENGTH;
      return [field, (values[field] ?? "").trim().slice(0, limit)];
    }),
  ) as BriefValues;
}

export function validateBriefStep(step: number, rawValues: BriefValues): BriefErrors {
  const values = normalizeBrief(rawValues);
  const errors: BriefErrors = {};

  switch (step) {
    case 0:
      if (!values.name) errors.name = "Please tell us your name.";
      if (!values.business) errors.business = "Tell us what your business does.";
      break;
    case 1:
      if (!isOneOf(PROJECT_TYPES, values.projectType)) errors.projectType = "Pick the option closest to your project.";
      if (values.description.length < MIN_DESCRIPTION_LENGTH) {
        errors.description = `A few more words, please (at least ${MIN_DESCRIPTION_LENGTH} characters).`;
      }
      if (values.timeline && !isOneOf(TIMELINES, values.timeline)) errors.timeline = "Pick one of the options.";
      break;
    case 3:
      if (!values.phone && !values.email) {
        errors.phone = "Leave a phone number or an email so we can reach you.";
        break;
      }
      if (values.phone && !PHONE_PATTERN.test(values.phone)) errors.phone = "Please enter a valid phone number.";
      if (values.email && !EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
      break;
  }

  return errors;
}
