// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  // from https://stackoverflow.com/a/68098547
  webpack5: true,
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.fallback = {
      fs: false,
      util: false,
      assert: false,
      stream: false,
      constants: false,
      path: false,
      module: false,
      process: false,
      crypto: require.resolve("crypto-browserify"),
    };
    return config;
  },
  images: {
    disableStaticImages: true,
    domains: process.env.SUPABASE_STORAGE_DOMAIN
      ? [process.env.SUPABASE_STORAGE_DOMAIN]
      : [],
  },
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    NODE: process.env.NODE,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    CYPRESS_LOCALSTORAGE_KEY: process.env.CYPRESS_LOCALSTORAGE_KEY,
    REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  include: ".",
  ignore: ["node_modules", "webpack.config.js"],
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
