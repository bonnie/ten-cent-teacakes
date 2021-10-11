// from https://www.npmjs.com/package/next-plugin-antd-less
const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  // modifyVars: { "@background-color": "#000" },
  lessVarsFilePath: "./styles/antd.less",
  // optional
  // lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  // cssLoaderOptions: {},

  // Other Config Here...

  webpack(config) {
    return config;
  },
});
