export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "codeeni-theme";
export const THEME_COLORS: Record<Theme, string> = { dark: "#04061a", light: "#f6f7fc" };

/** Runs before paint so a saved light preference never flashes the dark theme first. */
export const THEME_INIT_SCRIPT = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="light"){document.documentElement.classList.add("light");document.querySelector('meta[name="theme-color"]')?.setAttribute("content","${THEME_COLORS.light}")}}catch(e){}`;
