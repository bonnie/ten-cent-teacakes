beforeEach(() => {
  // visit login page
  cy.visit("/auth/login");

  // click login button
  cy.findByRole("button", { name: /log in/i }).click();

  // enter login information for known user on auth0 page
  cy.findByLabelText(/email address/i).type(Cypress.env("auth0_username"));
  cy.findByLabelText(/password/i).type(Cypress.env("auth0_password"));
  cy.findByRole("button", { name: "Continue" }).click();
});

it("does not provide edit buttons for non whitelist user", () => {
  // define whitelist not to include known user
  cy.intercept("/api/auth/whitelist", {
    statusCode: 200,
    body: { whitelist: ["very@selective.list"] },
  });

  // expect NO edit, delete or logout buttons (not on whitelist)
  cy.findByRole("button", { name: /edit/i }).should("not.exist");
  cy.findByRole("button", { name: /delete/i }).should("not.exist");

  // log out via api
  cy.visit("/api/auth/logout");
});

it("provides edit buttons for whitelist user", () => {
  // define whitelist for known user
  cy.intercept("/api/auth/whitelist", {
    statusCode: 200,
    body: { whitelist: [Cypress.env("auth0_username")] },
  });

  // expect edit and delete buttons
  cy.findAllByRole("button", { name: /edit/i }).should("exist");
  cy.findAllByRole("button", { name: /delete/i }).should("exist");

  // log out
  cy.findByRole("button", { name: /logout/ }).click();

  // make sure buttons requiring auth don't exist
  cy.findByRole("button", { name: /edit/i }).should("not.exist");
  cy.findByRole("button", { name: /delete/i }).should("not.exist");
  cy.findByRole("button", { name: /logout/ }).should("not.exist");
});
