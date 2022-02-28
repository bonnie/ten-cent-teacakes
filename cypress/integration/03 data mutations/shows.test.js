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
  cy.task("db:reset").visit("/shows");
};

it("can add, edit and delete show with minimal data", () => {
  logInAndResetDb();

  /// ////////////////////////////////////////////////
  // 1. expect save not to work if there's no performance date
  cy.findByRole("button", { name: /add show/i })
    .as("addShowButton")
    .click();

  // clear the performance date
  cy.findByLabelText(/performance date/i).clear();

  // focus away to trigger formik error
  cy.findByRole("heading", { name: /add show/i }).click();
  cy.findByText(/performance date is required/i).should("exist");

  // expect save button to be disabled
  cy.findByRole("button", { name: /save/i }).should("be.disabled");

  // cancel
  cy.findByRole("button", { name: /cancel/i }).click();

  /// ////////////////////////////////////////////////
  // 2. add show with default info and save
  cy.get("@addShowButton").click();
  cy.findByRole("button", { name: /save/i }).click();

  // expect success message
  cy.contains(/you have added a show/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // expect show with today's date
  const today = dayjs().format("MMM D, YYYY");
  cy.findByText(today).should("exist");

  /// ////////////////////////////////////////////////
  // 3. edit the show
  const editShowRegExp = new RegExp(
    `edit show at venue 1 on ${dayjs().format("MMM D, YYYY")}`,
    "i",
  );
  cy.findByRole("button", { name: editShowRegExp }).click();

  // cypress types into a date field using a "YYYY-MM-DD" string
  cy.findByLabelText(/performance date/i).type(
    dayjs().add(1, "year").format("YYYY-MM-DD"),
  );
  cy.findByRole("button", { name: /save/i }).click();

  // expect a success message
  cy.contains(/you have updated the show/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // old show date should not exist
  cy.contains(today).should("not.exist");

  // check for the delete button for new show date
  const nextYear = dayjs().add(1, "year").format("MMM D, YYYY");
  const deleteButtonRegExp = new RegExp(
    `delete show at venue 1 on ${nextYear}`,
    "i",
  );
  cy.findByRole("button", {
    name: deleteButtonRegExp,
  }).as("deleteNewShow");

  /// ////////////////////////////////////////////////
  // 4. delete the show
  cy.get("@deleteNewShow").click();

  // need string delimiters in regex distinguish from all the "delete show" buttons!
  cy.findByRole("button", { name: /^delete$/i, exact: true }).click();

  // expect a success message
  cy.findByText(/you have deleted the show/i).should("exist");
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // make sure show date is no longer represented
  cy.findByText(nextYear).should("not.exist");
});

it("can add and edit show with maximal data", () => {
  logInAndResetDb();

  /// ////////////////////////////////////////////////
  // 1. add show with url and save
  cy.findByRole("button", { name: /add show/i })
    .as("addShowButton")
    .click();

  cy.findByLabelText(/performance date/i).type("2020-02-29");
  cy.findByLabelText(/performance time/i).type("10:00");
  cy.findByLabelText("Venue *").select("Venue 2");
  cy.findByLabelText(/url for show/i).type("rickroll.com");

  cy.findByRole("button", { name: /save show/i }).click();

  // expect success message
  cy.contains(/you have added a show/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // expect show link to be entered URL
  // easier with Cypress syntax than Cypress Testing Library
  cy.get('a[href="http://rickroll.com"]').should("have.length", 1);

  // expect show edit button to be on page
  cy.findByRole("button", {
    name: /edit show at venue 2 on Feb 29, 2020, 10:00/i,
  }).as("editNewShowButton");

  /// ////////////////////////////////////////////////
  // 2. edit the show URL and create a new venue
  cy.get("@editNewShowButton").click();
  cy.findByLabelText(/URL/i).clear().type("icanhazcheeseburger.com");

  // find add venue button within modal form (not the one on the page in the background)
  cy.get("form")
    .findByRole("button", { name: /add venue/i })
    .click();
  cy.findByLabelText(/venue name/i).type("New Venue");
  cy.get("form")
    .findByRole("button", { name: /save venue/i })
    .click();
  // expect a success message
  cy.findByText(/you have added the venue "new venue"/i).should("exist");
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // select new venue
  cy.findByLabelText("Venue *").select("New Venue");

  // save show
  cy.findByRole("button", { name: /save show/i }).click();

  // expect a success message
  cy.findByText(/you have updated the show/i).should("exist");
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // old URL link and edit button should not exist
  cy.get('a[href="http://rickroll.com"]').should("not.exist");
  cy.findByRole("button", {
    name: /edit show at venue 2 on Feb 29, 2020, 10:00/i,
  }).should("not.exist");

  // check for new URL link and edit button
  cy.get('a[href="http://icanhazcheeseburger.com"]').should("have.length", 1);
  cy.findByRole("button", {
    name: /edit show at new venue on Feb 29, 2020, 10:00/i,
  });
});
