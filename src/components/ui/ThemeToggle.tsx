"use client";

import { Moon, Sun } from "lucide-react";
import clsx from "clsx";

import { useI18n } from "@/i18n/I18nProvider";
import { THEME_COLORS, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
}

/** Icons swap via the `light:` variant, so server and client render identical markup. */
export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useI18n();

  const toggle = () => {
    const isLight = document.documentElement.classList.contains("light");
    applyTheme(isLight ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.controls.theme}
      title={t.controls.theme}
      className={clsx(
        "focus-ring glass inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-100 transition-colors hover:text-white",
        className,
      )}
    >
      <Sun className="h-4 w-4 light:hidden" />
      <Moon className="hidden h-4 w-4 light:block" />
    </button>
  );
}
