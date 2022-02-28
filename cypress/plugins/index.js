/* eslint-disable no-param-reassign */
const { resetDB } = require("../../src/__tests__/api/prisma/reset-db");

export default (on, config) => {
  on("task", {
    "db:reset": async () => {
      await resetDB();
      return null;
    },
  });

  config.env.auth0_username = process.env.AUTH0_USERNAME;
  config.env.auth0_password = process.env.AUTH0_PASSWORD;
  config.env.auth0_domain = process.env.AUTH0_DOMAIN;
  config.env.auth0_audience = process.env.AUTH0_AUDIENCE;
  config.env.auth0_scope = process.env.AUTH0_SCOPE;
  config.env.auth0_client_id = process.env.AUTH0_CLIENTID;
  config.env.auth0_client_secret = process.env.AUTH0_CLIENT_SECRET;
  config.env.auth0_callback_url = process.env.AUTH0_CALLBACK_URL;
  config.env.cypress_localstorage_key = process.env.CYPRESS_LOCALSTORAGE_KEY;

  return config;
};
