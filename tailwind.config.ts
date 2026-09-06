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
            hover: "#1452B5",
            light: "#EFF6FF",
            dark: "#0052BA",
          },
          navy: {
            DEFAULT: "#0A212D",
            muted: "#4C616F",
            dark: "#06151D",
          },
          green: {
            DEFAULT: "#10B981",
            dark: "#006444",
            light: "#E6F8F0",
          },
          gray: {
            DEFAULT: "#F9FAFB",
            secondary: "#F3F4F6",
          },
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Inter", "Plus Jakarta Sans", "sans-serif"],
        heading: ["var(--font-outfit)", "Outfit", "Inter", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
