describe("Navigation", () => {
  beforeEach(() => {
    cy.intercept("/api/photos", { statusCode: 200, body: [] });
    cy.intercept("/api/shows", { statusCode: 200, body: [] });
    cy.intercept("/api/musicians", { statusCode: 200, body: [] });
    cy.intercept("/api/instruments", { statusCode: 200, body: [] });
    cy.intercept("/api/venues", { statusCode: 200, body: [] });
  });
  it("should navigate to the more page", () => {
    // Start from the index page
    cy.visit("/");

    // Find an img with alt text containing "more" and click it
    cy.findByAltText(/more/).click();

    // The new url should include "/more"
    cy.url().should("include", "/more");

    // The new page should contain an h1 with "more"
    cy.findByRole("heading", { name: "More" }).should("exist");
  });
  it("should navigate to the shows page", () => {
    // Start from the index page
    cy.visit("/");

    // Find an img with alt text containing "shows" and click it
    cy.findByAltText(/show/).click();

    // The new url should include "/shows"
    cy.url().should("include", "/shows");

    // The new page should contain an h1 with "shows"
    cy.findByRole("heading", { name: "Shows" }).should("exist");
  });
  it("should navigate to the band page", () => {
    // Start from the index page
    cy.visit("/");

    // Find an img with alt text containing "band" and click it
    cy.findByAltText(/band/).click();

    // The new url should include "/band"
    cy.url().should("include", "/band");

    // The new page should contain an h1 with "band"
    cy.findByRole("heading", { name: "The Band" }).should("exist");
  });
  it("should navigate to the photos page", () => {
    // Start from the index page
    cy.visit("/");

    // Find an img with alt text containing "photos" and click it
    cy.findByAltText(/photos/).click();

    // The new url should include "/photos"
    cy.url().should("include", "/photos");

    // The new page should contain an h1 with "photos"
    cy.findByRole("heading", { name: "Photos" }).should("exist");
  });
  it("should navigate to the press page", () => {
    // Start from the index page
    cy.visit("/");

    // Find an img with alt text containing "press" and click it
    cy.findByAltText(/press/).click();

    // The new url should include "/press"
    cy.url().should("include", "/press");

    // The new page should contain an h1 with "press"
    cy.findByRole("heading", { name: "Press" }).should("exist");
  });
});
