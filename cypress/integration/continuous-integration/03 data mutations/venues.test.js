it("can add, edit and delete venue without URL", () => {
  cy.logInAndResetDb("/shows");

  /// ////////////////////////////////////////////////
  // 1. expect save not to work if there's no venue name
  cy.findByRole("button", { name: /add venue/i })
    .as("addVenueButton")
    .click();
  cy.findByRole("button", { name: /save/i }).click();
  cy.contains(/venue name is required/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  /// ////////////////////////////////////////////////
  // 2. add venue and save
  cy.findByLabelText(/venue name/i).type("Carnegie Hall");
  cy.findByRole("button", { name: /save/i }).click();

  // expect success message
  cy.contains(/you have added the venue "Carnegie Hall"/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // expect venue edit button to be on page
  cy.findByRole("button", { name: /edit venue Carnegie Hall/i }).as(
    "editCarnegieHallButton",
  );

  /// ////////////////////////////////////////////////
  // 3. try to add an venue with the same name
  cy.get("@addVenueButton").click();
  cy.findByLabelText(/venue name/i).type("Carnegie Hall");

  // focus away to trigger formik error
  cy.findByRole("heading", { name: /add venue/i }).click();

  // expect save button to be disabled
  cy.findByRole("button", { name: /save/i }).should("be.disabled");

  // expect an error message
  cy.contains(/venue "Carnegie Hall" already exists/i);

  // clear venue name
  cy.findByLabelText(/venue name/i).clear();

  // expect an error message
  cy.contains(/venue name is required/i);

  // close the dialog
  cy.findByRole("button", { name: /cancel/i }).click();

  /// ////////////////////////////////////////////////
  // 4. edit the venue
  cy.get("@editCarnegieHallButton").click();
  cy.findByLabelText(/venue name/i)
    .clear()
    .type("Berkeley Farmers Market");
  cy.findByRole("button", { name: /save/i }).click();

  // expect a success message
  cy.contains(/you have updated the venue "Berkeley Farmers Market"/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // old venue button should not exist
  cy.contains("Carnegie Hall").should("not.exist");

  // check for the delete button for new venue name
  cy.findByRole("button", {
    name: /delete venue Berkeley Farmers Market/i,
  }).as("deleteBerkeleyFarmersMarket");

  /// ////////////////////////////////////////////////
  // 4. delete the venue
  cy.get("@deleteBerkeleyFarmersMarket").click();

  // need string delimiters in regex distinguish from all the "delete venue" buttons!
  cy.findByRole("button", { name: /^delete$/i, exact: true }).click();

  // expect a success message
  cy.contains(/you have deleted the venue/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // make sure venue name is no longer represented
  cy.contains("Berkeley Farmers Market").should("not.exist");
});

it("can add and edit venue with URL", () => {
  cy.logInAndResetDb();

  /// ////////////////////////////////////////////////
  // 1. add venue with url and save
  cy.findByRole("button", { name: /add venue/i })
    .as("addVenueButton")
    .click();

  cy.findByLabelText(/venue name/i).type("Carnegie Hall");
  cy.findByLabelText(/venue URL/i).type("carnegiehall.com");
  cy.findByRole("button", { name: /save/i }).click();

  // expect success message
  cy.contains(/you have added the venue "Carnegie Hall"/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // expect venue edit button to be on page
  cy.findByRole("button", { name: /edit venue Carnegie Hall/i }).as(
    "editCarnegieHallButton",
  );

  /// ////////////////////////////////////////////////
  // 2. edit the venue name and URL
  cy.get("@editCarnegieHallButton").click();
  cy.findByLabelText(/venue name/i)
    .clear()
    .type("Berkeley Farmers Market");
  cy.findByLabelText(/venue URL/i)
    .clear()
    .type("berkeleyfarmersmarket.com");
  cy.findByRole("button", { name: /save/i }).click();

  // expect a success message
  cy.contains(/you have updated the venue "Berkeley Farmers Market"/i);
  cy.findByRole("button", { name: /dismiss alert/i }).click();

  // old venue name and URL should not exist
  cy.contains("Carnegie Hall").should("not.exist");
  cy.contains("carnegiehall.com").should("not.exist");

  // check for new venue name and URL
  cy.contains("Berkeley Farmers Market").should("exist");
  cy.contains("berkeleyfarmersmarket.com").should("exist");
});

it("updates show display with updated venue name", () => {
  cy.logInAndResetDb();

  // edit venue associated with a show in the pre-populated db
  cy.findByRole("button", { name: /edit venue venue 2/i }).click();
  cy.findByLabelText(/venue name/i)
    .clear()
    .type("Venue 12345");
  cy.findByRole("button", { name: /save/i }).click();

  // make sure there's no reference to the old venue name, even in the shows section
  cy.contains("Venue 2").should("not.exist");
});
