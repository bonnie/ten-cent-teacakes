// import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";

describe("Instrument mutations", () => {
  beforeEach(() => {
    // from
    // https://docs.cypress.io/guides/testing-strategies/auth0-authentication#Custom-Command-for-Auth0-Authentication
    cy.loginByAuth0Api(
      Cypress.env("auth0_username"),
      Cypress.env("auth0_password"),
    );

    cy.intercept("/api/auth/whitelist", {
      statusCode: 200,
      body: { whitelist: [Cypress.env("auth0_username")] },
    });
  });
  it("can add, edit and delete instrument", () => {
    cy.visit("/band");
    cy.findByRole("button", { name: /add instrument/i }).click();

    // make sure the last instrument is before xylophone in the alphabet, so we can
    // count on xylophone being last

    // expect save not to work if there's no instrument name
    cy.findByRole("button", { name: /save/i }).click();
    cy.findByText(/instrument name is required/i);

    /// ////////////////////////////////////////////////
    // 1. add instrument name and save
    cy.findByLabelText(/Instrument name/i).type("xylophone");
    cy.findByRole("button", { name: /save/i }).click();

    // expect instrument name to be on page
    cy.findByText("xylophone");

    /// ////////////////////////////////////////////////
    // 2. try to add an instrument with the same name

    // expect an error alert

    /// ////////////////////////////////////////////////
    // 3. edit the instrument

    // expect a success alert

    // check for the edited instrument name

    /// ////////////////////////////////////////////////
    // 4. delete the instrument

    // expect a success alert

    // make sure instrument name is no longer represented
  });
});
