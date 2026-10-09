import clsx from "clsx";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  multiline?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

const CONTROL_STYLES =
  "w-full rounded-xl border bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-ink-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-400/60";

export function FormField({ id, label, error, multiline = false, className, ...controlProps }: FormFieldProps) {
  const errorId = `${id}-error`;
  const sharedProps = {
    id,
    name: id,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    className: clsx(
      CONTROL_STYLES,
      error ? "border-rose-400/60" : "border-white/10 hover:border-white/20 focus:border-accent-400/50",
      className,
    ),
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink-100">
        {label}
      </label>
      {multiline ? (
        <textarea rows={5} {...controlProps} {...sharedProps} />
      ) : (
        <input {...controlProps} {...sharedProps} />
      )}
      {error && (
        <p id={errorId} className="mt-2 text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}
