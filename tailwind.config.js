/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        c_red: "#F41B3B",
        c_green: "#1EBC99",
        c_yellow: "#F9CC0D",
        c_blue: "#1884F7",
        c_black: "#0A070B",
        c_light_grey: "#737174",
        c_grey: "#4F4E50",
        c_dark_grey: "#363536",
      },
      fontFamily: {
        "sans-serif": ["Gilroy", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
