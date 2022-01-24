module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: "1rem",
    },
    screens: {
      "nav-lg": "800px",
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/forms")],
};
