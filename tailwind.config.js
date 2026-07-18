/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E7D32",
          50: "#EAF5EA",
          100: "#CFE8D0",
          200: "#A6D5A8",
          300: "#7CC280",
          400: "#52AF57",
          500: "#2E7D32",
          600: "#276B2A",
          700: "#1F5722",
          800: "#17421A",
          900: "#0F2E12",
        },
        secondary: {
          DEFAULT: "#4CAF50",
          50: "#EEF8EE",
          100: "#D4EFD5",
        },
        accent: {
          DEFAULT: "#FFC107",
          50: "#FFF8E1",
          600: "#E5A800",
        },
        surface: "#F8FAF7",
        surfaceDark: "#0E1512",
        cardDark: "#161F1B",
        ink: "#12261A",
        clay: "#B5622C",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "22px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(18, 38, 26, 0.06), 0 8px 24px rgba(18, 38, 26, 0.06)",
        lift: "0 8px 16px rgba(18, 38, 26, 0.08), 0 16px 40px rgba(18, 38, 26, 0.10)",
        glow: "0 0 0 4px rgba(76, 175, 80, 0.15)",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0)", opacity: 0.45 },
          "100%": { transform: "scale(2.5)", opacity: 0 },
        },
        floatUp: {
          "0%": { transform: "translateY(8px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        ripple: "ripple 600ms ease-out forwards",
        floatUp: "floatUp 400ms ease-out forwards",
        shimmer: "shimmer 1.4s infinite linear",
      },
    },
  },
  plugins: [],
}

