import Link from "next/link";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-glow hover:shadow-[0_0_56px_-6px_rgba(139,85,251,0.7)] hover:brightness-110",
  secondary: "glass text-ink-50 hover:border-white/20 hover:bg-white/[0.08]",
  ghost: "text-ink-100 hover:bg-white/5 hover:text-white",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "focus-ring group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
