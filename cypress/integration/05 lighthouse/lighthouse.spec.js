import "@cypress-audit/lighthouse/commands";

const lighthouseThresholds = {
  performance: 0,
  accessibility: 95,
  "best-practices": 0,
  seo: 95,
  pwa: 0,
};

it("should pass the audits", () => {
  // TODO: these are VERY slow (3 minutes).
  // Can they be sped up?
  cy.task("db:reset").visit("/");
  cy.lighthouse(lighthouseThresholds);

  cy.visit("/shows");
  cy.lighthouse(lighthouseThresholds);

  cy.visit("/photos");
  cy.lighthouse(lighthouseThresholds);

  cy.visit("/band");
  cy.lighthouse(lighthouseThresholds);

  cy.visit("/more");
  cy.lighthouse(lighthouseThresholds);
});
