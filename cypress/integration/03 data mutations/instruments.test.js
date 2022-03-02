it("can add, edit and delete instrument", () => {
  cy.logInAndResetDb("/band");
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
  cy.findByLabelText(/Instrument name/i)
    .clear()
    .type("sousaphone");
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

it("updates musician display with updated instrument name", () => {
  cy.logInAndResetDb("/band");

  // edit venue associated with a show in the pre-populated db
  cy.findByRole("button", { name: /edit instrument baritone/i }).click();
  cy.findByLabelText(/name/i).clear().type("baritone uke");
  cy.findByRole("button", { name: /save/i }).click();

  // make sure there's no reference to the old venue name, even in the shows section
  cy.contains("ukulele").should("not.exist");
});
