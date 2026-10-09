"use server";

import {
  BRIEF_FIELDS,
  BRIEF_STEPS,
  normalizeBrief,
  validateBriefStep,
  type BriefErrors,
  type BriefValues,
} from "@/lib/project-brief";

export type ProjectBriefState = {
  status: "idle" | "success" | "error";
  fieldErrors?: BriefErrors;
};

function readBrief(formData: FormData): BriefValues {
  const entries = BRIEF_FIELDS.map((field) => {
    const value = formData.get(field);
    return [field, typeof value === "string" ? value : ""];
  });
  return normalizeBrief(Object.fromEntries(entries) as BriefValues);
}

export async function submitProjectBrief(
  _previous: ProjectBriefState,
  formData: FormData,
): Promise<ProjectBriefState> {
  const brief = readBrief(formData);
  const fieldErrors = BRIEF_STEPS.reduce<BriefErrors>(
    (errors, _fields, step) => ({ ...errors, ...validateBriefStep(step, brief) }),
    {},
  );

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  // Not delivered anywhere yet: connect an email or CRM provider (e.g. Resend, HubSpot) here.
  console.info("[brief] New project brief", brief);

  return { status: "success" };
}
