"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";

import { submitContact, type ContactField, type ContactFormState } from "@/app/actions/contact";
import { FormField } from "@/components/ui/FormField";
import { format } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

const INITIAL_STATE: ContactFormState = { status: "idle" };
const MIN_DETAILS_LENGTH = 20;

export function ContactForm() {
  const { t } = useI18n();
  const copy = t.contact.form;
  const [state, formAction, isPending] = useActionState(submitContact, INITIAL_STATE);
  const { fieldErrors, values } = state;

  const errorFor = (field: ContactField) => {
    const code = fieldErrors?.[field];
    return code ? format(copy.errors[code], { min: MIN_DETAILS_LENGTH }) : undefined;
  };

  const message =
    state.status === "success"
      ? format(copy.success, { name: state.name ?? "" })
      : state.status === "error"
        ? copy.fixFields
        : undefined;

  return (
    <form action={formAction} noValidate className="glass space-y-5 rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="name"
          label={copy.name.label}
          autoComplete="name"
          placeholder={copy.name.placeholder}
          defaultValue={values?.name}
          error={errorFor("name")}
          required
        />
        <FormField
          id="email"
          label={copy.email.label}
          type="email"
          autoComplete="email"
          placeholder={copy.email.placeholder}
          defaultValue={values?.email}
          error={errorFor("email")}
          required
        />
      </div>

      <FormField
        id="details"
        label={copy.details.label}
        multiline
        placeholder={copy.details.placeholder}
        defaultValue={values?.details}
        error={errorFor("details")}
        required
      />

      <button
        type="submit"
        disabled={isPending}
        className="focus-ring group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 font-medium text-on-brand shadow-glow transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            {copy.sending}
          </>
        ) : (
          <>
            {copy.submit}
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>

      <FormStatus message={message} isSuccess={state.status === "success"} />
    </form>
  );
}

function FormStatus({ message, isSuccess }: { message?: string; isSuccess: boolean }) {
  return (
    <div aria-live="polite" className="min-h-[1.25rem]">
      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-center justify-center gap-2 text-sm ${isSuccess ? "text-success" : "text-danger"}`}
          >
            {isSuccess && <CircleCheck className="h-4 w-4" />}
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
