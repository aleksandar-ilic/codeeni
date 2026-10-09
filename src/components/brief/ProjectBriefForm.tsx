"use client";

import { startTransition, useActionState, useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Check,
  CircleCheck,
  Clock,
  Globe,
  Handshake,
  Link2,
  LoaderCircle,
  MapPin,
  Send,
  ShieldCheck,
} from "lucide-react";
import clsx from "clsx";

import { submitProjectBrief, type ProjectBriefState } from "@/app/actions/project-brief";
import { ButtonLink } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import {
  BRIEF_FIELDS,
  BRIEF_STEPS,
  EMPTY_BRIEF,
  MAX_DESCRIPTION_LENGTH,
  MAX_FIELD_LENGTH,
  PROJECT_TYPES,
  TIMELINES,
  validateBriefStep,
  type BriefErrors,
  type BriefField,
  type BriefValues,
} from "@/lib/project-brief";
import { SITE } from "@/lib/site";

const INITIAL_STATE: ProjectBriefState = { status: "idle" };
const TOTAL_STEPS = BRIEF_STEPS.length;
const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
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
] as const;

const ASSURANCES = [
  { icon: Clock, text: `Reply ${SITE.responseTime.toLowerCase()}` },
  { icon: ShieldCheck, text: "Fixed price, agreed up front" },
  { icon: Handshake, text: "Free estimate, no obligation" },
] as const;

const REFERENCE_FIELDS = [
  { field: "website", label: "Current website", icon: Globe, placeholder: "yourbusiness.com" },
  { field: "social", label: "Instagram or Facebook", icon: AtSign, placeholder: "@yourbusiness" },
  { field: "location", label: "Google Maps location", icon: MapPin, placeholder: "Link or address" },
  {
    field: "links",
    label: "Designs, documents or sites you like",
    icon: Link2,
    placeholder: "Figma, Google Drive, example websites…",
  },
] as const;

const slide: Variants = {
  enter: (direction: number) => ({ opacity: 0, y: direction * 16 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: (direction: number) => ({ opacity: 0, y: direction * -16, transition: { duration: 0.2 } }),
};

export function ProjectBriefForm() {
  const [state, submit, isPending] = useActionState(submitProjectBrief, INITIAL_STATE);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<BriefValues>(EMPTY_BRIEF);
  const [errors, setErrors] = useState<BriefErrors>({});

  useEffect(() => {
    const serverErrors = state.fieldErrors;
    if (state.status !== "error" || !serverErrors) return;
    setErrors(serverErrors);
    const firstInvalidStep = BRIEF_STEPS.findIndex((fields) => fields.some((field) => serverErrors[field]));
    if (firstInvalidStep >= 0) {
      setDirection(-1);
      setStep(firstInvalidStep);
    }
  }, [state]);

  if (state.status === "success") return <SuccessMessage name={values.name.trim()} />;

  const isLastStep = step === TOTAL_STEPS - 1;
  const current = STEPS[step];

  const goTo = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  const update = (field: BriefField, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[field];
      if (field === "email") delete next.phone;
      return next;
    });
  };

  const bind = (field: BriefField) => ({
    id: field,
    value: values[field],
    error: errors[field],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(field, event.target.value),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const stepErrors = validateBriefStep(step, values);
    const firstInvalid = BRIEF_STEPS[step].find((field) => stepErrors[field]);
    if (firstInvalid) {
      setErrors(stepErrors);
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    if (!isLastStep) {
      goTo(step + 1);
      return;
    }

    const formData = new FormData();
    BRIEF_FIELDS.forEach((field) => formData.set(field, values[field]));
    startTransition(() => submit(formData));
  };

  return (
    <div className="mx-auto grid w-full max-w-5xl items-start gap-8 lg:grid-cols-[280px_1fr] lg:gap-14">
      <aside>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">Project brief</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Start your <span className="text-gradient">project</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-200">Four short steps, about two minutes.</p>

        <StepList current={step} onSelect={goTo} />
        <MobileStepper current={step} />

        <ul className="mt-10 hidden space-y-3 border-t border-white/10 pt-8 lg:block">
          {ASSURANCES.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm text-ink-200">
              <Icon className="h-4 w-4 shrink-0 text-accent-300" />
              {text}
            </li>
          ))}
        </ul>
      </aside>

      <form onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-6 sm:p-10">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{current.title}</h2>
            <p className="mt-2 leading-relaxed text-ink-200">{current.description}</p>

            <div className="mt-8 space-y-6">
              {step === 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    {...bind("name")}
                    label="Your name"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    maxLength={MAX_FIELD_LENGTH}
                    autoFocus
                  />
                  <FormField
                    {...bind("business")}
                    label="Business or company"
                    autoComplete="organization"
                    placeholder="e.g. dental clinic, SaaS startup"
                    maxLength={MAX_FIELD_LENGTH}
                  />
                </div>
              )}

              {step === 1 && (
                <>
                  <ChoiceGroup
                    name="projectType"
                    label="Type of project"
                    options={PROJECT_TYPES}
                    value={values.projectType}
                    error={errors.projectType}
                    onChange={(value) => update("projectType", value)}
                  />
                  <FormField
                    {...bind("description")}
                    label="Describe what you need"
                    multiline
                    rows={4}
                    placeholder="e.g. A website for my salon with services, prices and online booking…"
                    maxLength={MAX_DESCRIPTION_LENGTH}
                  />
                  <ChoiceGroup
                    name="timeline"
                    label="When would you like to start?"
                    optional
                    options={TIMELINES}
                    value={values.timeline}
                    error={errors.timeline}
                    onChange={(value) => update("timeline", value)}
                  />
                </>
              )}

              {step === 2 && (
                <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                  {REFERENCE_FIELDS.map(({ field, label, icon: Icon, placeholder }, index) => (
                    <FormField
                      key={field}
                      {...bind(field)}
                      label={label}
                      icon={<Icon className="h-4 w-4 text-accent-300" />}
                      placeholder={placeholder}
                      maxLength={MAX_FIELD_LENGTH}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    {...bind("phone")}
                    label="Phone number"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+381 65 123 4567"
                    maxLength={MAX_FIELD_LENGTH}
                    autoFocus
                  />
                  <FormField
                    {...bind("email")}
                    label="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@business.com"
                    maxLength={MAX_FIELD_LENGTH}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="focus-ring inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-ink-300 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <span />
          )}

          <button
            type="submit"
            disabled={isPending}
            className="focus-ring group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-gradient px-6 font-medium text-white shadow-glow transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : isLastStep ? (
              <>
                Send brief
                <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        <p aria-live="polite" className="mt-4 min-h-[1.25rem] text-right text-sm text-rose-300">
          {state.status === "error" ? state.message : null}
        </p>
      </form>
    </div>
  );
}

function StepList({ current, onSelect }: { current: number; onSelect: (step: number) => void }) {
  return (
    <ol className="mt-10 hidden lg:block">
      {STEPS.map(({ label, hint }, index) => {
        const isDone = index < current;
        const isCurrent = index === current;

        return (
          <li key={label}>
            <button
              type="button"
              disabled={!isDone}
              onClick={() => onSelect(index)}
              aria-current={isCurrent ? "step" : undefined}
              className="focus-ring group flex w-full items-center gap-4 rounded-xl p-2 text-left transition-colors enabled:hover:bg-white/[0.04] disabled:cursor-default"
            >
              <span
                className={clsx(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-sm transition-all duration-300",
                  isDone && "border-transparent bg-brand-gradient text-white",
                  isCurrent && "border-accent-400 bg-accent-500/15 text-white ring-4 ring-accent-500/15",
                  !isDone && !isCurrent && "border-white/10 text-ink-400",
                )}
              >
                {isDone ? <Check className="h-4 w-4" strokeWidth={2.5} /> : index + 1}
              </span>
              <span>
                <span
                  className={clsx(
                    "block text-sm font-medium transition-colors",
                    isCurrent || isDone ? "text-white" : "text-ink-300",
                  )}
                >
                  {label}
                </span>
                <span className="block text-xs text-ink-400">{hint}</span>
              </span>
            </button>
            {index < TOTAL_STEPS - 1 && (
              <span
                aria-hidden
                className={clsx(
                  "ml-[25px] block h-5 w-px transition-colors duration-300",
                  isDone ? "bg-accent-400/60" : "bg-white/10",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function MobileStepper({ current }: { current: number }) {
  return (
    <div className="mt-6 lg:hidden">
      <div className="flex gap-1.5" aria-hidden>
        {STEPS.map(({ label }, index) => (
          <span
            key={label}
            className={clsx(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              index <= current ? "bg-brand-gradient" : "bg-white/10",
            )}
          />
        ))}
      </div>
      <p className="mt-3 text-sm text-ink-200">
        <span className="font-mono text-accent-300">
          {current + 1}/{TOTAL_STEPS}
        </span>{" "}
        {STEPS[current].label}
      </p>
    </div>
  );
}

type ChoiceGroupProps = {
  name: BriefField;
  label: string;
  options: readonly string[];
  value: string;
  error?: string;
  optional?: boolean;
  onChange: (value: string) => void;
};

function ChoiceGroup({ name, label, options, value, error, optional = false, onChange }: ChoiceGroupProps) {
  const errorId = `${name}-error`;

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-3 text-sm font-medium text-ink-100">
        {label} {optional && <span className="font-normal text-ink-400">(optional)</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          const isSelected = value === option;
          return (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                id={index === 0 ? name : undefined}
                name={name}
                value={option}
                checked={isSelected}
                onChange={() => onChange(option)}
                className="peer sr-only"
              />
              <span
                className={clsx(
                  "inline-flex rounded-full border px-4 py-2 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent-400/60",
                  isSelected
                    ? "border-accent-400/80 bg-accent-500/25 text-white"
                    : error
                      ? "border-rose-400/40 bg-white/[0.03] text-ink-200 hover:text-white"
                      : "border-white/10 bg-white/[0.03] text-ink-200 hover:border-white/20 hover:text-white",
                )}
              >
                {option}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-xs text-rose-300">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function SuccessMessage({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="glass mx-auto max-w-xl rounded-3xl p-10 text-center"
    >
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10">
        <CircleCheck className="h-8 w-8 text-emerald-300" />
      </span>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Thanks{name ? `, ${name}` : ""}!
      </h1>
      <p className="mt-4 leading-relaxed text-ink-200">
        We&apos;ve got your brief and will get back to you {SITE.responseTime.toLowerCase()}.
      </p>
      <ButtonLink href="/" variant="secondary" size="lg" className="mt-10">
        Back to homepage
      </ButtonLink>
    </motion.div>
  );
}
