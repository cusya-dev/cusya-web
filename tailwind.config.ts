import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"] },
      colors: {
        cusya: {
          50: "#EEF6FF", 100: "#DCEBFF", 200: "#BCD7FB", 300: "#93BCF5", 400: "#6A9DEA",
          500: "#4A82DB", 600: "#3A6CC4", 700: "#2F559D", 800: "#264279", 900: "#172A4E",
        },
        background: "hsl(var(--background))", foreground: "hsl(var(--foreground))",
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        border: "hsl(var(--border))", ring: "hsl(var(--ring))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
      },
      borderRadius: { xl: "1rem", "2xl": "1.5rem", "3xl": "2rem" },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        blink: { "0%,92%,100%": { transform: "scaleY(1)" }, "96%": { transform: "scaleY(0.1)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "mesh-slide": { from: { transform: "translateX(0)" }, to: { transform: "translateX(-800px)" } },
        "mesh-drift": { "0%,100%": { transform: "translateX(-30px)" }, "50%": { transform: "translateX(30px)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        blink: "blink 5s infinite",
        marquee: "marquee 28s linear infinite",
        "mesh-slide": "mesh-slide 40s linear infinite",
        "mesh-drift": "mesh-drift 12s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};
export default config;
