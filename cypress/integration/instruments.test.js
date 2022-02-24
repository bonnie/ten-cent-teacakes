describe("Instrument mutations", () => {
  beforeEach(() => {
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

    // make sure beforeEach doesn't return until db reset is finished
    return cy.task("db:reset");
  });
  it("can add, edit and delete instrument", () => {
    cy.visit("/band");

    /// ////////////////////////////////////////////////
    // 1. expect save not to work if there's no instrument name
    cy.findByRole("button", { name: /add instrument/i })
      .as("addInstrumentButton")
      .click();
    cy.findByRole("button", { name: /save/i }).click();
    cy.contains(/instrument name is required/i);
    cy.findByRole("button", { name: /dismiss alert/i }).click();

    /// ////////////////////////////////////////////////
    // 2. add instrument and save
    cy.findByLabelText(/Instrument name/i).type("xylophone");
    cy.findByRole("button", { name: /save/i }).click();

    // expect success message
    cy.contains(/you have added the instrument "xylophone"/i);
    cy.findByRole("button", { name: /dismiss alert/i }).click();

    // expect instrument edit button to be on page
    cy.findByRole("button", { name: /edit instrument xylophone/i }).as(
      "editXylophoneButton",
    );

    /// ////////////////////////////////////////////////
    // 3. try to add an instrument with the same name
    cy.get("@addInstrumentButton").click();
    cy.findByLabelText(/Instrument name/i).type("xylophone");

    // focus away to trigger formik error
    cy.findByRole("heading", { name: /add instrument/i }).click();

    // expect save button to be disabled
    cy.findByRole("button", { name: /save/i }).should("be.disabled");

    // expect an error message
    cy.contains(/instrument "xylophone" already exists/i);

    // clear instrument name
    cy.findByLabelText(/Instrument name/i).clear();

    // expect an error message
    cy.contains(/instrument name is required/i);

    // close the dialog
    cy.findByRole("button", { name: /cancel/i }).click();

    /// ////////////////////////////////////////////////
    // 4. edit the instrument
    cy.get("@editXylophoneButton").click();
    cy.findByLabelText(/Instrument name/i).clear();
    cy.findByLabelText(/Instrument name/i).type("sousaphone");
    cy.findByRole("button", { name: /save/i }).click();

    // expect a success message
    cy.contains(/you have updated the instrument "sousaphone"/i);
    cy.findByRole("button", { name: /dismiss alert/i }).click();

    // old instrument button should not exist
    cy.contains("xylophone").should("not.exist");

    // check for the delete button for new instrument name
    cy.findByRole("button", { name: /delete instrument sousaphone/i }).as(
      "deleteSousaphoneButton",
    );

    /// ////////////////////////////////////////////////
    // 4. delete the instrument
    cy.get("@deleteSousaphoneButton").click();

    // need string delimiters in regex distinguish from all the "delete instrument" buttons!
    cy.findByRole("button", { name: /^delete$/i, exact: true }).click();

    // expect a success message
    cy.contains(/you have deleted the instrument/i);
    cy.findByRole("button", { name: /dismiss alert/i }).click();

    // make sure instrument name is no longer represented
    cy.contains("sousaphone").should("not.exist");
  });
});
