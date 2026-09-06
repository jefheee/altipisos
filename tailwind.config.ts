import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        altipisos: {
          blue: {
            DEFAULT: "#1B6AE3",
            dark: "#0052BA",
            light: "#EBF3FE",
            hover: "#1452B5",
          },
          navy: {
            DEFAULT: "#0A212D",
            light: "#1B2F3C",
            muted: "#4C616F",
          },
          green: {
            DEFAULT: "#10B981",
            light: "#E6F8F0",
            dark: "#008058",
          },
          ice: "#F3F7FC",
          clay: "#F97316",
          cyan: "#00C2FF",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        heading: ["var(--font-outfit)", "Outfit", "sans-serif"],
      },
      boxShadow: {
        tile: "0 1px 3px rgba(10, 33, 45, 0.05), 0 4px 12px rgba(10, 33, 45, 0.04)",
        "tile-hover": "0 8px 24px rgba(27, 106, 227, 0.12), 0 2px 6px rgba(10, 33, 45, 0.04)",
        modal: "0 24px 48px -12px rgba(10, 33, 45, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
