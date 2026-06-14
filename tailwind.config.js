/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          soft: "#ffd6e4",
          DEFAULT: "#ff8fb1",
          deep: "#e75a86",
        },
        lav: "#b79cff",
        mint: "#9be3c9",
        ink: "#5a3b48",
        cream: "#fff6f9",
      },
      fontFamily: {
        cute: ["var(--font-pacifico)", "cursive"],
        body: ["var(--font-quicksand)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        cute: "0 10px 30px rgba(231,90,134,.18)",
        glow: "0 0 60px rgba(255,143,177,.45)",
      },
      keyframes: {
        floaty: {
          "0%": { transform: "translateY(0) rotate(0)" },
          "100%": { transform: "translateY(-110vh) rotate(360deg)", opacity: "0" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        floaty: "floaty linear infinite",
        wiggle: "wiggle 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
