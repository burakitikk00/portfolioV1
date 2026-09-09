import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold-champagne': '#ddbf92',
        'gold-champagne-light': '#ebd6b3',
        'gold-champagne-dark': '#bfa06f',
        'dark-bg': '#0a0a0c',
        'charcoal': '#121214',
        brand: {
          cream: "#dfc3a2",
          creamLight: "#faeade",
          gold: "#e2be82",
          goldLight: "#f4dfba",
          goldDark: "#b88a44",
          champagne: "#ddbf92",
          champagneLight: "#ebd6b3",
          black: "#080808",
          deepBlack: "#050505",
          surface: "#111114",
          card: "#141416",
          accentRed: "#E51B24",
          hud: "#00F0FF",
        },
        obsidian: "#080808",
        surface: "#111113",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Inter", "system-ui", "sans-serif"],
        display: ['"Bebas Neue"', '"Anton"', "var(--font-syne)", "sans-serif"],
        hero: ['"Bebas Neue"', '"Anton"', "sans-serif"],
        signature: ["var(--font-caveat)", "Caveat", "cursive"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Space Mono", "monospace"],
        serif: ["var(--font-playfair)", "Cinzel", "serif"],
        tech: ["var(--font-syncopate)", "Syncopate", "sans-serif"],
      },
      boxShadow: {
        "glow-gold": "0 0 35px -5px rgba(227, 200, 150, 0.25)",
        "glow-red": "0 0 45px -5px rgba(229, 27, 36, 0.5), 0 25px 35px -8px rgba(0, 0, 0, 0.7)",
        "card-dark": "0 30px 60px -15px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.09)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
