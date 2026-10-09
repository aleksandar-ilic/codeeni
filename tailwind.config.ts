import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

/** Maps a color scale to the `--{name}-{shade}` RGB variables defined per theme in globals.css. */
function themeScale(name: string) {
  return Object.fromEntries(SHADES.map((shade) => [shade, `rgb(var(--${name}-${shade}) / <alpha-value>)`]));
}

function themeColor(name: string) {
  return `rgb(var(--${name}) / <alpha-value>)`;
}

/**
 * Codeeni design tokens. Values live in globals.css so the light theme can swap them.
 * - `ink`:    deep navy surfaces and text.
 * - `brand`:  tech blue, primary interactive color.
 * - `accent`: vibrant purple, used for highlights and gradients.
 * - `white`:  "high-contrast foreground"; it turns dark in the light theme.
 * - `on-brand`: always-white text for use on the brand gradient.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        ink: themeScale("ink"),
        brand: themeScale("brand"),
        accent: themeScale("accent"),
        white: themeColor("white"),
        "on-brand": "#ffffff",
        danger: themeColor("danger"),
        success: themeColor("success"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #3374ff 0%, #8b55fb 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(51,116,255,0.15) 0%, rgba(139,85,251,0.15) 100%)",
        "grid-faint":
          "linear-gradient(to right, rgb(var(--grid-line)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--grid-line)) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(139,85,251,0.55)",
        "glow-brand": "0 0 40px -8px rgba(51,116,255,0.6)",
        glass: "var(--shadow-glass)",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-40" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "dash-flow": "dash-flow 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("light", ".light &");
    }),
  ],
};

export default config;
