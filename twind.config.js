const themeColors = require("./src/lib/colors");
const colors = require("tailwindcss/colors");

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
    fontFamily: {
      display: "Delfina",
      body: "Ubuntu",
    },
  },
};
