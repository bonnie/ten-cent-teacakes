const themeColors = require("./src/lib/colors");
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    colors: {
      aqua: themeColors.aqua,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      red: colors.red,
      yellow: colors.yellow,
      blue: colors.blue,
    },
  },
  extends: {
    fontFamily: {
      heading: "Delfina",
      body: "Ubuntu",
      ...defaultTheme.fontFamily.sans,
    },
  },
};
