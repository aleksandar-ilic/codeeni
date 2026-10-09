"use server";

export type ContactField = "name" | "email" | "details";
export type ContactErrorCode = "nameRequired" | "emailInvalid" | "detailsTooShort";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  name?: string;
  fieldErrors?: Partial<Record<ContactField, ContactErrorCode>>;
  values?: Partial<Record<ContactField, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_DETAILS_LENGTH = 20;

function readField(formData: FormData, field: ContactField) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function validate(values: Record<ContactField, string>) {
  const errors: Partial<Record<ContactField, ContactErrorCode>> = {};

  if (!values.name) errors.name = "nameRequired";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "emailInvalid";
  if (values.details.length < MIN_DETAILS_LENGTH) errors.details = "detailsTooShort";

  return errors;
}

export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    details: readField(formData, "details"),
  };

  const fieldErrors = validate(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values };
  }

  // Not delivered anywhere yet: connect an email or CRM provider (e.g. Resend, HubSpot) here.
  console.info("[contact] New project inquiry", { name: values.name, email: values.email });

  return { status: "success", name: values.name };
}
