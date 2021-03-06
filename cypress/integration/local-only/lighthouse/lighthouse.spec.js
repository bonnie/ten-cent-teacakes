import "@cypress-audit/lighthouse/commands";

const lighthouseThresholds = {
  performance: 0,
  accessibility: 100,
  "best-practices": 0,
  seo: 100,
  pwa: 0,
};

it("should pass the audits", () => {
  // TODO: these are VERY slow (3 minutes).
  // Can they be sped up?
  cy.task("db:reset").visit("/");
  cy.log("checking /");
  cy.lighthouse(lighthouseThresholds);

  cy.visit("/shows");
  cy.log("checking /shows");
  cy.lighthouse(lighthouseThresholds);

  cy.visit("/photos");
  cy.log("checking /photos");
  cy.lighthouse(lighthouseThresholds);

  cy.visit("/band");
  cy.log("checking /band");
  cy.lighthouse(lighthouseThresholds);

  cy.visit("/more");
  cy.log("checking /more");
  cy.lighthouse(lighthouseThresholds);
});
