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
  cy.get("main")
    .find("img")
    .first() // will be the first image based on database data
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

// it("can add and edit photo with maximal data", () => {
//   logInAndResetDb();

//   /// ////////////////////////////////////////////////
//   // 1. add photo with all data and save
//   cy.findByRole("button", { name: /add show/i })
//     .as("addShowButton")
//     .click();

//   cy.findByLabelText(/performance date/i).type("2020-02-29");
//   cy.findByLabelText(/performance time/i).type("10:00");
//   cy.findByLabelText("Venue *").select("Venue 2");
//   cy.findByLabelText(/url for show/i).type("rickroll.com");

//   cy.findByRole("button", { name: /save show/i }).click();

//   // expect success message
//   cy.contains(/you have added a show/i);
//   cy.findByRole("button", { name: /dismiss alert/i }).click();

//   // expect show link to be entered URL
//   // easier with Cypress syntax than Cypress Testing Library
//   cy.get('a[href="http://rickroll.com"]').should("have.length", 1);

//   // expect show edit button to be on page
//   cy.findByRole("button", {
//     name: /edit show at venue 2 on Feb 29, 2020, 10:00/i,
//   }).as("editNewShowButton");

//   /// ////////////////////////////////////////////////
//   // 2. edit the photo data
//   cy.get("@editNewShowButton").click();
//   cy.findByLabelText(/URL/i).clear().type("icanhazcheeseburger.com");

//   // save show
//   cy.findByRole("button", { name: /save show/i }).click();

//   // expect a success message
//   cy.findByText(/you have updated the show/i).should("exist");
//   cy.findByRole("button", { name: /dismiss alert/i }).click();

//   // old URL link and edit button should not exist
//   cy.get('a[href="http://rickroll.com"]').should("not.exist");
//   cy.findByRole("button", {
//     name: /edit show at venue 2 on Feb 29, 2020, 10:00/i,
//   }).should("not.exist");

//   // check for new URL link and edit button
//   cy.get('a[href="http://icanhazcheeseburger.com"]').should("have.length", 1);
//   cy.findByRole("button", {
//     name: /edit show at new venue on Feb 29, 2020, 10:00/i,
//   });
// });
