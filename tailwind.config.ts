import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eef7f1",
          100: "#d8eddf",
          600: "#2f6b45",
          700: "#24573a",
          800: "#1d4631",
          900: "#153625"
        },
        civic: {
          50: "#edf7fb",
          100: "#d4edf7",
          600: "#28749c",
          700: "#205e80",
          800: "#1d4f68"
        }
      },
      boxShadow: {
        soft: "0 8px 24px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
