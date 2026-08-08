import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#05060b",
        panel: "#0b0d16",
        line: "rgba(255,255,255,0.08)",
        foam: "#22d3ee",
        violet: "#a78bfa",
        neon: "#34f5c5",
      },
      fontFamily: {
        display: ["var(--font-space)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(60px, -40px) scale(1.15)" },
          "66%": { transform: "translate(-50px, 30px) scale(0.92)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blink: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0" } },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        gridpan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.8)" },
          "50%": { opacity: "0.9", transform: "scale(1.1)" },
        },
        "scanline": {
          "0%": { top: "-10%" },
          "100%": { top: "110%" },
        },
        "spin-slow": { "100%": { transform: "rotate(360deg)" } },
        pulseglow: {
          "0%, 100%": { opacity: "0.35", filter: "blur(60px)" },
          "50%": { opacity: "0.7", filter: "blur(80px)" },
        },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        bootbar: {
          "0%": { width: "0%" },
          "30%": { width: "40%" },
          "60%": { width: "72%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        blink: "blink 1s steps(1) infinite",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        gridpan: "gridpan 4s linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        pulseglow: "pulseglow 7s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
        bootbar: "bootbar 1.1s ease forwards",
        scanline: "scanline 7s linear infinite",
      },
      boxShadow: {
        neon: "0 0 24px rgba(34,211,238,0.35)",
        "neon-lg": "0 0 60px rgba(167,139,250,0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
