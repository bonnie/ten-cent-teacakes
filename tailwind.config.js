// const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

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
      aqua: {
        light: "rgb(239, 245, 245)",
        medium: "rgb(86, 144, 144)",
        dark: "rgb(48, 80, 80)",
      },
      tan: {
        light: "rgb(237, 221, 197)",
        medium: "rgb(200, 154, 81)",
        dark: "rgb(19, 14, 6)",
      },
    },
    extend: {
      fontFamily: {
        // fancy: ["SeasideResortNF"],
        heading: ["Parsons"],
        body: ["Ubuntu", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
