import dayjs from "dayjs";

it("Navigates properly from photo to photo on the large photo pages", () => {
  cy.visit("/photos");

  // click on the first photo
  cy.findAllByRole("figure")
    .first()
    .within(() => cy.findByRole("img"))
    .click();

  // check for no previous button
  cy.findByRole("button", { name: "previous-photo" }).should("not.exist");

  // click through to the second and third images; from the test db, there should be 3
  cy.findByRole("button", { name: "next-photo" }).click();
  cy.findByText("Photo by Jane A Photographer");

  cy.findByRole("button", { name: "next-photo" }).click();
  cy.findByText("this is Photo 3");

  // on the third image, there should not be a "next-photo" button
  cy.findByRole("button", { name: "next-photo" }).should("not.exist");

  // click through the previous buttons back to the first image
  cy.findByRole("button", { name: "previous-photo" }).click();
  cy.findByText("Photo by Jane A Photographer");

  cy.findByRole("button", { name: "previous-photo" }).click();
  cy.findByRole("heading", { name: dayjs().format("MMM D, YYYY") });
});
