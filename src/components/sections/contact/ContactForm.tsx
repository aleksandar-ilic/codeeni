"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";

import { submitContact, type ContactFormState } from "@/app/actions/contact";
import { FormField } from "@/components/ui/FormField";

const INITIAL_STATE: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, INITIAL_STATE);
  const { fieldErrors, values } = state;

  return (
    <form action={formAction} noValidate className="glass space-y-5 rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="name"
          label="Name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          defaultValue={values?.name}
          error={fieldErrors?.name}
          required
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="ada@company.com"
          defaultValue={values?.email}
          error={fieldErrors?.email}
          required
        />
      </div>

      <FormField
        id="details"
        label="Project Details"
        multiline
        placeholder="Tell us about your goals, timeline, and any technical challenges…"
        defaultValue={values?.details}
        error={fieldErrors?.details}
        required
      />

      <button
        type="submit"
        disabled={isPending}
        className="focus-ring group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 font-medium text-white shadow-glow transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>

      <FormStatus state={state} />
    </form>
  );
}

function FormStatus({ state }: { state: ContactFormState }) {
  const isSuccess = state.status === "success";

  return (
    <div aria-live="polite" className="min-h-[1.25rem]">
      <AnimatePresence mode="wait">
        {state.message && (
          <motion.p
            key={state.message}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-center justify-center gap-2 text-sm ${isSuccess ? "text-emerald-300" : "text-rose-300"}`}
          >
            {isSuccess && <CircleCheck className="h-4 w-4" />}
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
