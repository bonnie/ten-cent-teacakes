const dayjs = require("dayjs");

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
  cy.task("db:reset").visit("/photos");
};

it("can add, edit and delete photo with minimal data", () => {
  logInAndResetDb();

  /// ////////////////////////////////////////////////
  // 1. expect save not to work if there's no photo
  cy.findByRole("button", { name: /add photo/i })
    .as("addPhotoButton")
    .click();

  cy.findByRole("button", { name: /save/i }).click();
  cy.contains(/file is required/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  /// ////////////////////////////////////////////////
  // 2. add photo and save
  cy.findByLabelText(/Choose a file to upload/i).selectFile(
    "cypress/files/avalanche-of-cheese.jpg",
  );
  // message about upload should appear, then disappear
  cy.findByText(/compressing and uploading/i).should("exist");
  cy.findByText(/compressing and uploading/i).should("not.exist");

  cy.findByRole("button", { name: /save/i }).click();

  // expect success message
  cy.contains(/you have added a photo/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // expect thumbnail image src
  // TODO: flaky (why??)
  cy.get("main")
    .find("img")
    .first() // will be the first image based on database data (don't love this way of identifying; seems fragile)
    .invoke("attr", "src")
    .should("match", /avalanche-of-cheese-\d+-thumb.jpg/);

  /// ////////////////////////////////////////////////
  // 3. edit the image
  cy.findByRole("button", {
    name: /edit photo .*avalanche-of-cheese/i,
  }).click();

  // add a description
  cy.findByLabelText(/description/i).type("avalanche, made of cheese");
  cy.findByRole("button", { name: /save/i }).click();

  // expect a success message
  cy.contains(/you have updated the photo/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // check for the alt text
  cy.findByAltText("avalanche, made of cheese").as("newPhoto");

  /// ////////////////////////////////////////////////
  // 4. view the large image
  cy.get("@newPhoto").click();

  // check for the description display
  cy.findByText("avalanche, made of cheese").should("exist");

  // check that large image is loaded
  cy.get("main")
    .find("img")
    .invoke("attr", "src")
    .should("match", /avalanche-of-cheese-\d+.jpg/);

  // go back to photos
  cy.findByText(/back to photos/i).click();

  /// ////////////////////////////////////////////////
  // 5. delete the photo
  cy.findByRole("button", {
    name: /delete photo avalanche, made of cheese/i,
  }).click();

  // need string delimiters in regex distinguish from all the "delete photo" buttons!
  cy.findByRole("button", { name: /^delete$/i, exact: true }).click();

  // expect a success message
  cy.findByText(/you have deleted the photo/i).should("exist");
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // make sure show date is no longer represented
  cy.findByAltText("avalanche, made of cheese").should("not.exist");
});

it("can add and edit photo with maximal data", () => {
  logInAndResetDb();

  /// ////////////////////////////////////////////////
  // 1. add photo with all data and save
  cy.findByRole("button", { name: /add photo/i })
    .as("addPhotoButton")
    .click();

  cy.findByLabelText(/Choose a file to upload/i).selectFile(
    "cypress/files/avalanche-of-cheese.jpg",
  );
  // message about upload should appear, then disappear
  cy.findByText(/compressing and uploading/i).should("exist");
  cy.findByText(/compressing and uploading/i).should("not.exist");

  cy.findByLabelText(/show/i).select(1); // select the first (and only) show
  cy.findByLabelText(/photographer/i).type("Jane Q. Photographer");
  cy.findByLabelText(/description/i).type("a cheesy avalanche");
  cy.findByLabelText(/photo date/i).type("2200-01-01");

  cy.findByRole("button", { name: /save photo/i }).click();

  // expect success message
  cy.contains(/you have added a photo/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // expect photographer text
  cy.findByText("taken by Jane Q. Photographer").should("exist");

  // expect two photos to be labeled for show yesterday at Venue 1
  const showRegExp = new RegExp(
    `${dayjs().subtract(1, "day").format("MMM D, YYYY")} at Venue 1`,
    "i",
  );
  cy.findAllByText(showRegExp).should("have.length", 2);

  // expect thumbnail image src
  cy.findByAltText("a cheesy avalanche")
    .as("maxThumbImg")
    .invoke("attr", "src")
    .should("include", "thumb");

  /// ////////////////////////////////////////////////
  // 2. view data on individual photo page
  cy.get("@maxThumbImg").click();

  // check for the description and photographer display
  cy.findByText("a cheesy avalanche").should("be.visible");
  cy.findByText("Photo by Jane Q. Photographer").should("be.visible");

  // check that large image is loaded
  cy.get("main")
    .find("img")
    .invoke("attr", "src")
    .should("match", /avalanche-of-cheese-\d+.jpg/);

  // go back to photos
  cy.findByText(/back to photos/i).click();

  /// ////////////////////////////////////////////////
  // 3. edit the photo data
  cy.findByRole("button", {
    name: /edit photo a cheesy avalanche/i,
  }).click();
  cy.findByLabelText(/photographer/i)
    .clear()
    .type("Jane F. Photographer");
  cy.findByLabelText(/description/i)
    .clear()
    .type("an avalanche, cheese-like");
  cy.findByLabelText(/photo date/i)
    .clear()
    .type("2400-01-01");

  cy.findByRole("button", { name: /save photo/i }).click();

  // expect success message
  cy.contains(/you have updated the photo/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // expect photographer text
  cy.findByText("taken by Jane F. Photographer").should("exist");

  // expect new description
  cy.findByAltText("an avalanche, cheese-like")
    .as("editedThumbImage")
    .should("exist");
});