import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./container/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'hero-pattern': "url('/images/brandstory/automatic.jpg')",
        'bretling-pattern': "url('/images/brandstory/bretling.jpg')",
        'luminox-pattern': "url('/images/brandstory/luminox1440.png')",
        'ingersoll-pattern': "url('/images/brandstory/ingersoll.jpg')",

      }
    },
  },
  plugins: [],
} satisfies Config;
