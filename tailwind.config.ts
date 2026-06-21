import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(150 44% 96%)",
          100: "hsl(150 44% 90%)",
          200: "hsl(150 40% 80%)",
          300: "hsl(150 38% 64%)",
          400: "hsl(150 40% 44%)",
          500: "hsl(152 55% 32%)",
          600: "hsl(154 62% 24%)",
          700: "hsl(156 66% 18%)",
          800: "hsl(158 70% 13%)",
          900: "hsl(160 72% 9%)",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          foreground: "hsl(var(--gold-foreground))",
          50: "hsl(45 90% 96%)",
          100: "hsl(45 92% 88%)",
          200: "hsl(44 92% 76%)",
          300: "hsl(43 90% 64%)",
          400: "hsl(42 88% 55%)",
          500: "hsl(40 86% 48%)",
          600: "hsl(36 84% 42%)",
          700: "hsl(32 80% 35%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: "hsl(150 60% 38%)",
        warning: "hsl(38 92% 50%)",
        info: "hsl(214 90% 52%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 3px rgba(16, 24, 40, 0.06), 0 1px 2px rgba(16, 24, 40, 0.04)",
        card: "0 4px 24px -8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        lifted: "0 24px 48px -12px rgba(0, 0, 0, 0.5)",
        glow: "0 0 0 1px hsl(var(--primary) / 0.12), 0 8px 32px -8px hsl(var(--primary) / 0.28)",
        "glow-emerald": "0 0 40px -8px hsl(162 72% 46% / 0.35), 0 0 0 1px hsl(162 72% 46% / 0.15)",
        "glow-gold": "0 0 40px -8px hsl(38 92% 50% / 0.35), 0 0 0 1px hsl(38 92% 50% / 0.15)",
        "glow-sm": "0 0 16px -4px hsl(162 72% 46% / 0.4)",
        glass: "0 4px 24px -8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "shimmer-sweep": {
          "0%": { left: "-100%" },
          "100%": { left: "200%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.2)", opacity: "0.15" },
          "100%": { transform: "scale(1)", opacity: "0.6" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        shimmer: "shimmer 2s infinite",
        "shimmer-sweep": "shimmer-sweep 3s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
        "float-gentle": "float-gentle 4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.5s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
      },
      backgroundImage: {
        "kente-grid":
          "linear-gradient(hsl(var(--border) / 0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.6) 1px, transparent 1px)",
        "kente-weave":
          "linear-gradient(hsl(var(--gold) / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold) / 0.08) 1px, transparent 1px), linear-gradient(hsl(var(--primary) / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.05) 1px, transparent 1px)",
        "mesh-emerald":
          "radial-gradient(at 20% 50%, hsl(162 72% 46% / 0.15) 0px, transparent 50%), radial-gradient(at 80% 20%, hsl(38 92% 50% / 0.1) 0px, transparent 50%), radial-gradient(at 60% 80%, hsl(162 72% 46% / 0.08) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
