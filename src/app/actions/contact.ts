"use server";

export type ContactField = "name" | "email" | "details";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_DETAILS_LENGTH = 20;

function readField(formData: FormData, field: ContactField) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function validate(values: Record<ContactField, string>) {
  const errors: Partial<Record<ContactField, string>> = {};

  if (!values.name) errors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.details.length < MIN_DETAILS_LENGTH) {
    errors.details = `Share a bit more about your project (at least ${MIN_DETAILS_LENGTH} characters).`;
  }

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
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  // Not delivered anywhere yet: connect an email or CRM provider (e.g. Resend, HubSpot) here.
  console.info("[contact] New project inquiry", { name: values.name, email: values.email });

  return {
    status: "success",
    message: `Thanks, ${values.name}! We'll get back to you shortly.`,
  };
}
