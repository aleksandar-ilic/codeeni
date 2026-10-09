import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const display = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codeeni — Where Logic Meets Effortless Execution",
  description:
    "Codeeni builds custom web applications, scalable architecture, and ready-to-use software templates that drive your business forward.",
  keywords: [
    "software development",
    "technical consulting",
    "web applications",
    "software templates",
    "scalable architecture",
  ],
  openGraph: {
    title: "Codeeni — Where Logic Meets Effortless Execution",
    description: "Elegant software solutions for complex problems.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#04061a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
