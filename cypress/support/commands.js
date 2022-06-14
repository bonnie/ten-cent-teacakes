/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import "@testing-library/cypress/add-commands";
import "@cypress-audit/lighthouse/commands";

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

Cypress.Commands.add("logoutByLocalStorage", () => {
  window.localStorage.removeItem(Cypress.env("cypress_localstorage_key"));
});

Cypress.Commands.add("logInAndResetDb", (newRoute, currentRoute) => {
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
  // getting location / pathname from within command does not work, so needs to be an arg
  if (newRoute === currentRoute) {
    // try to avoid load timeouts when visiting the same page on subsequent tests
    cy.resetDbAndIsrCache().reload();
  } else {
    cy.resetDbAndIsrCache().visit(newRoute);
  }
});

Cypress.Commands.add("dismissToast", () => {
  cy.findByRole("button", { name: /dismiss alert/i })
    // to avoid sporadic "element has been detached from the DOM" errors
    // reference: https://www.cypress.io/blog/2020/07/22/do-not-get-too-detached/
    .then(($button) => cy.wrap($button))
    .click();
});

Cypress.Commands.add("resetDbAndIsrCache", () => {
  cy.task("db:reset");
  const secret = Cypress.env("revalidation_secret");
  cy.request("GET", `/api/revalidate?secret=${secret}`);
});

Cypress.Commands.add("reloadForISR", () => {
  if (Cypress.env("github_action")) {
    // exponential dropoff for failing CI tests to wait for db
    // update to "take" before reloading page, to mitigate test flake

    //  https://docs.cypress.io/guides/guides/test-retries#Can-I-access-the-current-attempt-counter-from-the-test
    // eslint-disable-next-line no-underscore-dangle
    const attempt = cy.state("runnable")._currentRetry;
    const waitDelay = 2000 ** attempt;
    if (attempt > 0) {
      // eslint-disable-next-line no-console
      console.log(
        `!! increasing ISR cache refresh delay to ${waitDelay}ms for attempt ${attempt}`,
      );
    }

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(waitDelay);
  }
  cy.reload();
});
