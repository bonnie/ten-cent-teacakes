const logInAndResetDb = () => {
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
  cy.task("db:reset").visit("/band");
};

// all data for musician is required, so minimal data === maximal data
it("can add, edit and delete musician", () => {
  logInAndResetDb();

  /// ////////////////////////////////////////////////
  // 1. expect save not to work if there's no performance date
  cy.findByRole("button", { name: /add musician/i })
    .as("addMusicianButton")
    .click();

  // click save button
  cy.findByRole("button", { name: /save/i }).click();

  cy.findByText(
    "First name is required; Last name is required; Bio is required; Photo is required",
  ).should("exist");
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // cancel
  cy.findByRole("button", { name: /cancel/i }).click();

  /// ////////////////////////////////////////////////
  // 2. add musician
  cy.get("@addMusicianButton").click();
  cy.findByLabelText(/first name/i).type("Cheese");
  cy.findByLabelText(/last name/i).type("Avalanche");
  cy.findByLabelText(/bio/i).type("I am an unstoppable avalanche of cheese.");
  cy.findByRole("checkbox", { name: "kazoo" }).click();
  cy.findByRole("checkbox", { name: "vocals" }).click();
  cy.findByLabelText(/select musician image/i).selectFile(
    "cypress/files/avalanche-of-cheese.jpg",
  );

  // message about upload should appear, then disappear
  cy.findByText(/compressing and uploading/i).should("exist");
  cy.findByText(/compressing and uploading/i).should("not.exist");

  cy.findByRole("button", { name: /save/i }).click();

  // expect success message
  cy.contains(/you have added a musician/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // expect the musician data to be on the page
  cy.findByText(/^cheese$/i).should("exist"); // first name
  cy.findByText(/I am an unstoppable avalanche of cheese./i).should("exist");
  // https://testing-library.com/docs/cypress-testing-library/intro#examples
  cy.findByRole("listitem", {
    name: /information about band member cheese/i,
  }).within(() => {
    cy.findByText("kazoo").should("exist");
    cy.findByText("vocals").should("exist");
    cy.get("img.ease-in-out")
      .invoke("attr", "src")
      .should("include", "avalanche");
  });

  /// ////////////////////////////////////////////////
  // 3. edit the musician
  cy.findByRole("button", { name: /edit musician cheese/i }).click();

  cy.findByLabelText(/first name/i)
    .clear()
    .type("Cheddar");
  cy.findByLabelText(/last name/i)
    .clear()
    .type("Landslide");
  cy.findByLabelText(/bio/i)
    .clear()
    .type("I am an unstoppable landslide of cheddar.");

  // remove the vocals, and create a new instrument
  cy.findByRole("checkbox", { name: "vocals" }).click();

  // find add instrument button within modal form (not the one on the page in the background)
  cy.get("form")
    .findByRole("button", { name: /add instrument/i })
    .click();
  cy.findByLabelText(/instrument name/i).type("accordian");
  cy.findByRole("button", { name: /save instrument/i }).click();

  // expect a success message
  // TODO: this sometimes (often!) fails, I think because of "form within form"
  // (a patch request gets sent for the musician and another toast -- "musician updated" appears)
  // (but then why not show / venue ...?)
  cy.findByText(/you have added the instrument "accordian"/i).should("exist");
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // click the accordian to add to the musician
  cy.findByRole("checkbox", { name: "accordian" }).click();

  // update the image
  cy.findByLabelText(/select new musician image/i).selectFile(
    "cypress/files/gustopher.jpg",
  );

  // message about upload should appear, then disappear
  cy.findByText(/compressing and uploading/i).should("exist");
  cy.findByText(/compressing and uploading/i).should("not.exist");

  // save and expect success message
  cy.findByRole("button", { name: /save/i }).click();
  cy.contains(/you have updated the musician/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // check new information
  cy.findByText(/^cheddar$/i).should("exist"); // first name
  cy.findByText(/I am an unstoppable landslide of cheddar./i).should("exist");
  // https://testing-library.com/docs/cypress-testing-library/intro#examples
  cy.findByRole("listitem", {
    name: /information about band member cheddar/i,
  }).within(() => {
    cy.findByText("vocals").should("not.exist");
    cy.findByText("kazoo").should("exist");
    cy.findByText("accordian").should("exist");
    cy.get("img.ease-in-out")
      .invoke("attr", "src")
      .should("include", "gustopher");
  });

  /// ////////////////////////////////////////////////
  // Don't need (4) -- can't delete musicians from the UI!
  cy.findByRole("button", {
    name: /delete musician cheddar/i,
  }).should("not.exist");
});
