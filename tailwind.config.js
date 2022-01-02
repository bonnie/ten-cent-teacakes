// TODO: shift to twind: https://twind.dev/
// const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: "1rem",
    },
    colors: {
      ...defaultTheme.colors,
      aqua: {
        100: "rgb(239, 245, 245)",
        200: "rgb(207, 226, 226)",
        300: "rgb(175, 207, 207)",
        400: "rgb(143, 188, 188)",
        500: "rgb(111, 169, 169)",
        600: "rgb(86, 144, 144)",
        700: "rgb(67, 112, 112)",
        800: "rgb(48, 80, 80)",
        900: "rgb(29, 48, 48)",
      },
      tan: {
        light: "rgb(237, 221, 197)",
        medium: "rgb(200, 154, 81)",
        dark: "rgb(19, 14, 6)",
      },
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      red: colors.red,
      yellow: colors.yellow,
      blue: colors.blue,
    },
    extend: {
      fontFamily: {
        heading: ["Delfina"],
        body: ["Ubuntu", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/forms")],
};
