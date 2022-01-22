// TODO:
// warn - The `purge`/`content` options have changed in Tailwind CSS v3.0.
// warn - Update your configuration file to eliminate this warning.
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        heading: ["Delfina"],
        body: ["Ubuntu", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      "nav-lg": "800px",
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/forms")],
};
