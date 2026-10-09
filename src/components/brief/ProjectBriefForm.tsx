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
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";

import { submitProjectBrief, type ProjectBriefState } from "@/app/actions/project-brief";
import { ButtonLink } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { format } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import {
  BRIEF_FIELDS,
  BRIEF_STEPS,
  EMPTY_BRIEF,
  MAX_DESCRIPTION_LENGTH,
  MAX_FIELD_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  PROJECT_TYPES,
  TIMELINES,
  validateBriefStep,
  type BriefErrors,
  type BriefField,
  type BriefValues,
} from "@/lib/project-brief";

const INITIAL_STATE: ProjectBriefState = { status: "idle" };
const TOTAL_STEPS = BRIEF_STEPS.length;
const EASE = [0.22, 1, 0.36, 1] as const;

const ASSURANCE_ICONS: readonly LucideIcon[] = [Clock, ShieldCheck, Handshake];

const REFERENCE_FIELDS = [
  { field: "website", icon: Globe },
  { field: "social", icon: AtSign },
  { field: "location", icon: MapPin },
  { field: "links", icon: Link2 },
] as const;

const slide: Variants = {
  enter: (direction: number) => ({ opacity: 0, y: direction * 16 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: (direction: number) => ({ opacity: 0, y: direction * -16, transition: { duration: 0.2 } }),
};

export function ProjectBriefForm() {
  const { t, href } = useI18n();
  const copy = t.brief;
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

  if (state.status === "success") {
    const name = values.name.trim();
    return (
      <SuccessMessage
        title={name ? format(copy.success.title, { name }) : copy.success.titleNoName}
        body={copy.success.body}
        backLabel={copy.success.back}
        backHref={href("/")}
      />
    );
  }

  const isLastStep = step === TOTAL_STEPS - 1;
  const current = copy.steps[step];

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

  const errorFor = (field: BriefField) => {
    const code = errors[field];
    return code ? format(copy.errors[code], { min: MIN_DESCRIPTION_LENGTH }) : undefined;
  };

  const bind = (field: Exclude<BriefField, "projectType" | "timeline">) => ({
    id: field,
    value: values[field],
    error: errorFor(field),
    label: copy.fields[field].label,
    placeholder: copy.fields[field].placeholder,
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
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">{copy.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {copy.titleStart}
          <span className="text-gradient">{copy.titleHighlight}</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-200">{copy.intro}</p>

        <StepList current={step} onSelect={goTo} />
        <MobileStepper current={step} />

        <ul className="mt-10 hidden space-y-3 border-t border-white/10 pt-8 lg:block">
          {copy.assurances.map((text, index) => {
            const Icon = ASSURANCE_ICONS[index];
            return (
              <li key={text} className="flex items-center gap-3 text-sm text-ink-200">
                <Icon className="h-4 w-4 shrink-0 text-accent-300" />
                {text}
              </li>
            );
          })}
        </ul>
      </aside>

      <form onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-6 sm:p-10">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div key={step} custom={direction} variants={slide} initial="enter" animate="center" exit="exit">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{current.title}</h2>
            <p className="mt-2 leading-relaxed text-ink-200">{current.description}</p>

            <div className="mt-8 space-y-6">
              {step === 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField {...bind("name")} autoComplete="name" maxLength={MAX_FIELD_LENGTH} autoFocus />
                  <FormField {...bind("business")} autoComplete="organization" maxLength={MAX_FIELD_LENGTH} />
                </div>
              )}

              {step === 1 && (
                <>
                  <ChoiceGroup
                    name="projectType"
                    label={copy.fields.projectType}
                    options={PROJECT_TYPES.map((value) => ({ value, label: copy.projectTypes[value] }))}
                    value={values.projectType}
                    error={errorFor("projectType")}
                    onChange={(value) => update("projectType", value)}
                  />
                  <FormField {...bind("description")} multiline rows={4} maxLength={MAX_DESCRIPTION_LENGTH} />
                  <ChoiceGroup
                    name="timeline"
                    label={copy.fields.timeline}
                    optionalLabel={copy.optional}
                    options={TIMELINES.map((value) => ({ value, label: copy.timelines[value] }))}
                    value={values.timeline}
                    error={errorFor("timeline")}
                    onChange={(value) => update("timeline", value)}
                  />
                </>
              )}

              {step === 2 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {REFERENCE_FIELDS.map(({ field, icon: Icon }, index) => (
                    <FormField
                      key={field}
                      {...bind(field)}
                      icon={<Icon className="h-4 w-4 text-accent-300" />}
                      maxLength={MAX_FIELD_LENGTH}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField {...bind("phone")} type="tel" autoComplete="tel" maxLength={MAX_FIELD_LENGTH} autoFocus />
                  <FormField {...bind("email")} type="email" autoComplete="email" maxLength={MAX_FIELD_LENGTH} />
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
              {copy.back}
            </button>
          ) : (
            <span />
          )}

          <button
            type="submit"
            disabled={isPending}
            className="focus-ring group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-gradient px-6 font-medium text-on-brand shadow-glow transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                {copy.sending}
              </>
            ) : isLastStep ? (
              <>
                {copy.send}
                <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </>
            ) : (
              <>
                {copy.next}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        <p aria-live="polite" className="mt-4 min-h-[1.25rem] text-right text-sm text-danger">
          {state.status === "error" ? copy.reviewAnswers : null}
        </p>
      </form>
    </div>
  );
}

function StepList({ current, onSelect }: { current: number; onSelect: (step: number) => void }) {
  const { t } = useI18n();

  return (
    <ol className="mt-10 hidden lg:block">
      {t.brief.steps.map(({ label, hint }, index) => {
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
                  isDone && "border-transparent bg-brand-gradient text-on-brand",
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
  const { t } = useI18n();
  const steps = t.brief.steps;

  return (
    <div className="mt-6 lg:hidden">
      <div className="flex gap-1.5" aria-hidden>
        {steps.map(({ label }, index) => (
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
        {steps[current].label}
      </p>
    </div>
  );
}

type ChoiceGroupProps = {
  name: BriefField;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  error?: string;
  optionalLabel?: string;
  onChange: (value: string) => void;
};

function ChoiceGroup({ name, label, options, value, error, optionalLabel, onChange }: ChoiceGroupProps) {
  const errorId = `${name}-error`;

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-3 text-sm font-medium text-ink-100">
        {label} {optionalLabel && <span className="font-normal text-ink-400">{optionalLabel}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          const isSelected = value === option.value;
          return (
            <label key={option.value} className="cursor-pointer">
              <input
                type="radio"
                id={index === 0 ? name : undefined}
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span
                className={clsx(
                  "inline-flex rounded-full border px-4 py-2 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent-400/60",
                  isSelected
                    ? "border-accent-400/80 bg-accent-500/25 text-white"
                    : error
                      ? "border-danger/40 bg-white/[0.03] text-ink-200 hover:text-white"
                      : "border-white/10 bg-white/[0.03] text-ink-200 hover:border-white/20 hover:text-white",
                )}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}

type SuccessMessageProps = { title: string; body: string; backLabel: string; backHref: string };

function SuccessMessage({ title, body, backLabel, backHref }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="glass mx-auto max-w-xl rounded-3xl p-10 text-center"
    >
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
        <CircleCheck className="h-8 w-8 text-success" />
      </span>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
      <p className="mt-4 leading-relaxed text-ink-200">{body}</p>
      <ButtonLink href={backHref} variant="secondary" size="lg" className="mt-10">
        {backLabel}
      </ButtonLink>
    </motion.div>
  );
}
