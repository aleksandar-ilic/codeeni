import type { Config } from "tailwindcss";

/**
 * Codeeni design tokens.
 * - `ink`:    deep navy surfaces used for backgrounds and cards.
 * - `brand`:  tech blue, primary interactive color.
 * - `accent`: vibrant purple, used for highlights and gradients.
 * Change these scales to re-theme the whole site.
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
        ink: {
          50: "#eef1fb",
          100: "#d5dbf2",
          200: "#aab5e0",
          300: "#7a89c4",
          400: "#4f5f9e",
          500: "#2f3d78",
          600: "#1f2a5c",
          700: "#151d45",
          800: "#0d1330",
          900: "#080c22",
          950: "#04061a",
        },
        brand: {
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd7ff",
          300: "#8ebdff",
          400: "#5998ff",
          500: "#3374ff",
          600: "#1b53f5",
          700: "#143fe1",
          800: "#1734b6",
          900: "#19318f",
          950: "#142057",
        },
        accent: {
          50: "#f6f3ff",
          100: "#ede8ff",
          200: "#ddd4ff",
          300: "#c4b1ff",
          400: "#a685ff",
          500: "#8b55fb",
          600: "#7c33f2",
          700: "#6d21de",
          800: "#5b1bba",
          900: "#4b1898",
          950: "#2e0c67",
        },
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
          "linear-gradient(to right, rgba(170,181,224,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(170,181,224,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(139,85,251,0.55)",
        "glow-brand": "0 0 40px -8px rgba(51,116,255,0.6)",
        glass: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 8px 32px -12px rgba(4,6,26,0.6)",
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
  plugins: [],
};

export default config;
