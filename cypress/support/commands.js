/* eslint-disable camelcase */

import "@testing-library/cypress/add-commands";

import jwt from "jsonwebtoken";

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

    window.localStorage.setItem("auth0Cypress", JSON.stringify(item));

    cy.visit("/");
  });
});
