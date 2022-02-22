describe("Navigation", () => {
  it("should navigate to the more page", () => {
    // Start from the index page
    cy.visit("/");

    // Find an img with alt text containing "more" and click it
    cy.findByAltText(/more/).click();

    // The new url should include "/more"
    cy.url().should("include", "/more");

    // The new page should contain an h1 with "more"
    cy.get("h1").contains("More");
  });
  it("should navigate to the shows page", () => {
    // Start from the index page
    cy.visit("/");

    // Find an img with alt text containing "shows" and click it
    cy.findByAltText(/show/).click();

    // The new url should include "/shows"
    cy.url().should("include", "/shows");

    // The new page should contain an h1 with "shows"
    cy.get("h1").contains("Shows");
    // cy.get("h1").contains("Past Shows");
  });
});
