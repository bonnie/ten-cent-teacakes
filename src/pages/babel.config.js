/* eslint-disable func-names */
// from https://www.npmjs.com/package/next-plugin-antd-less
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [["next/babel"]],
    plugins: [
      ["import", { libraryName: "antd", style: true }],
      ["module-resolver", { alias: { "@": "./src" } }],
    ],
  };
};
