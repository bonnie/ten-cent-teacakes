/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Navigation", () => {
  it("should navigate to the more page", () => {
    // Start from the index page
    cy.visit("/");

    // Find an img with alt text containing "more" and click it
    cy.findByAltText(/more/).click();

    // The new url should include "/more"
    cy.url().should("include", "/more");

    // The new page should contain an h1 with "more page"
    cy.get("h1").contains("More");
  });
});
