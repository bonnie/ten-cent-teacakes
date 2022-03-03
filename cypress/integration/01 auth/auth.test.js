it("does not provide edit buttons for non whitelist user", () => {
  // "log in" as known user
  cy.loginByAuth0Api(
    Cypress.env("auth0_username"),
    Cypress.env("auth0_password"),
  );

  // define whitelist not to include known user
  cy.intercept("/api/auth/whitelist", {
    statusCode: 200,
    body: { whitelist: ["very@selective.list"] },
  });

  cy.visit("/");

  // expect NO edit, delete or logout buttons (not on whitelist)
  cy.findByRole("button", { name: /edit/i }).should("not.exist");
  cy.findByRole("button", { name: /delete/i }).should("not.exist");

  // log out via api
  cy.visit("/api/auth/logout");
});

it("provides edit buttons for whitelist user", () => {
  // "log in" as known user
  cy.loginByAuth0Api(
    Cypress.env("auth0_username"),
    Cypress.env("auth0_password"),
  );

  // define whitelist for known user
  cy.intercept("/api/auth/whitelist", {
    statusCode: 200,
    body: { whitelist: [Cypress.env("auth0_username")] },
  });

  cy.visit("/");

  // expect edit and delete buttons
  cy.findAllByRole("button", { name: /edit/i }).should("exist");
  cy.findAllByRole("button", { name: /delete/i }).should("exist");

  //   // TODO: logout button doesn't exist for this fake login...?
  //   // log out
  //   cy.findByRole("button", { name: /logout/ }).click();

  //   // make sure buttons requiring auth don't exist
  //   cy.findByRole("button", { name: /edit/i }).should("not.exist");
  //   cy.findByRole("button", { name: /delete/i }).should("not.exist");
  //   cy.findByRole("button", { name: /logout/ }).should("not.exist");
  //
});
