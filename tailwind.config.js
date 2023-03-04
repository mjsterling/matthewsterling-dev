/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eae7ff",
          100: "#d9d3ff",
          200: "#beb0ff",
          300: "#9c81ff",
          400: "#8750ff",
          500: "#7f28ff",
          600: "#8004ff",
          700: "#7e00ff",
          800: "#6800d3",
          900: "#320763",
        },
        secondary: {
          50: "#edfcff",
          100: "#d6f7ff",
          200: "#b5f4ff",
          300: "#83f0ff",
          400: "#48e4ff",
          500: "#1ecbff",
          600: "#06b0ff",
          700: "#009dff",
          800: "#0877c5",
          900: "#0d649b",
        },
      },
      fontFamily: {
        sans: ["Comfortaa", "sans-serif"],
      },
    },
  },
  plugins: [],
};
