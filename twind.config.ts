import twind, { strict } from "twind";

const themeColors = require("./src/lib/colors");
const forms: twind.Plugin = require("@twind/forms");

const config = {
  mode: strict,
  theme: {
    extend: {
      colors: {
        aqua: themeColors.aqua,
        transparent: "transparent",
      },
      fontFamily: {
        display: "Delfina",
        body: "Ubuntu",
      },
    },
  },
  plugins: {
    forms,
  },
};

export default config;
