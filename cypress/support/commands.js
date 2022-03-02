/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import "@testing-library/cypress/add-commands";

import failOnConsoleError from "cypress-fail-on-console-error";
import jwt from "jsonwebtoken";

failOnConsoleError();
// failOnConsoleError({excludeMessages: ["^"]});

// source:
// https://docs.cypress.io/guides/testing-strategies/auth0-authentication#Custom-Command-for-Auth0-Authentication
Cypress.Commands.add("loginByAuth0Api", (username, password) => {
  cy.log(`Logging in as ${username}`);

  const client_id = Cypress.env("auth0_client_id");
  const client_secret = Cypress.env("auth0_client_secret");
  const audience = Cypress.env("auth0_audience");
  const scope = Cypress.env("auth0_scope");

  cy.request({
    method: "POST",
    url: `https://${Cypress.env("auth0_domain")}/oauth/token`,
    body: {
      grant_type: "password",
      username,
      password,
      audience,
      scope,
      client_id,
      client_secret,
    },
  }).then(({ body }) => {
    const claims = jwt.decode(body.id_token);
    const {
      nickname,
      name,
      picture,
      updated_at,
      email,
      email_verified,
      sub,
      exp,
    } = claims;

    const item = {
      body: {
        ...body,
        decodedToken: {
          claims,
          user: {
            nickname,
            name,
            picture,
            updated_at,
            email,
            email_verified,
            sub,
          },
          audience,
          client_id,
        },
      },
      expiresAt: exp,
    };

    window.localStorage.setItem(
      Cypress.env("cypress_localstorage_key"),
      JSON.stringify(item),
    );
  });
});

Cypress.Commands.add("logInAndResetDb", (route) => {
  // authenticate, adapted from
  // https://docs.cypress.io/guides/testing-strategies/auth0-authentication#Custom-Command-for-Auth0-Authentication
  cy.loginByAuth0Api(
    Cypress.env("auth0_username"),
    Cypress.env("auth0_password"),
  );

  // define whitelist
  cy.intercept("/api/auth/whitelist", {
    statusCode: 200,
    body: { whitelist: [Cypress.env("auth0_username")] },
  });

  // reset the db, and load the page after
  // This seems to be the best way to make sure the db is reset before page is visited
  cy.task("db:reset").then(() => {
    // don't visit current page to avoid (intermittent) issue with waiting for page to load
    // https://github.com/cypress-io/cypress/issues/1311#issuecomment-393896371
    if (cy.location("pathname") !== route) cy.visit(route);
  });
});
