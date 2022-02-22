// import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";

describe("Instrument mutations", () => {
  beforeEach(() => {
    // from
    // https://docs.cypress.io/guides/testing-strategies/auth0-authentication#Custom-Command-for-Auth0-Authentication
    cy.loginByAuth0Api(
      Cypress.env("auth0_username"),
      Cypress.env("auth0_password"),
    );
  });
  it("can add, edit and delete instrument", () => {
    cy.visit("/band");
    cy.findByRole("button", { name: /add instrument/i }).click();

    // expect save not to work if there's no instrument name
    cy.findByRole("button", { name: /save/i }).click();
    cy.findByRole("alert", { name: /instrument name is required/i });

    // add instrument name and save
    cy.findByLabel("Instrument name").type("xylophone");
    cy.findByRole("button", { name: /save/i }).click();

    // expect instrument name to be on page
    cy.findByText("xylophone");
  });
});
