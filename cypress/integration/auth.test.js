it("does not provide edit buttons for non whitelist user", () => {
  // define whitelist
  cy.intercept("/api/auth/whitelist", {
    statusCode: 200,
    body: { whitelist: ["very@selective.list"] },
  });

  // visit login page
  cy.visit("/auth/login");
});
