const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const lightAqua = "rgb(203, 224, 224)";

module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: "2rem",
    },
    bgColor: {
      color: lightAqua,
    },
    extend: {
      colors: {
        lightAqua,
        darkBrown: colors.darkBrown,
      },
      fontFamily: {
        // fancy: ["SeasideResortNF"],
        heading: ["RitzyRemixNF"],
        body: ["Ubuntu", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
