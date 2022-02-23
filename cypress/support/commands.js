/* eslint-disable no-param-reassign */
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
    //   }).then(({ body }) => {
    //     const { access_token, expires_in, id_token } = body;
    //     const auth0State = {
    //       nonce: "",
    //       state: "some-random-state",
    //     };
    //     const callbackUrl = `${Cypress.env(
    //       "auth0_callback_url",
    //     )}?access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${
    //       auth0State.state
    //     }`;
    //     cy.visit(callbackUrl, {
    //       onBeforeLoad(win) {
    //         win.document.cookie = `com.auth0.auth.some-random-state=${JSON.stringify(
    //           auth0State,
    //         )}`;
    //       },
    //     });
    //   });
    // });
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
  });
});
