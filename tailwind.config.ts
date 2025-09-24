import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        "background-light": "#F9FAFB",
        "background-dark": "#1F2937",
        "card-light": "#FFFFFF",
        "card-dark": "#1E1E1E",
        "text-light": "#000000",
        "text-dark": "#FFFFFF",
        "secondary-text-light": "#6B7280",
        "secondary-text-dark": "#9CA3AF",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        'xl': '1rem',
        'lg': '0.75rem',
      },
    },
  },
  plugins: [],
};
export default config;