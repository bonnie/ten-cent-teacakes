import twind from "twind";

const themeColors = require("./src/lib/colors");
const colors = require("tailwindcss/colors");
const forms: twind.Plugin = require("@twind/forms");

const config = {
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
      transparent: "transparent",
    },
    fontFamily: {
      display: "Delfina",
      body: "Ubuntu",
    },
  },
  plugins: {
    forms,
  },
};

export default config;
