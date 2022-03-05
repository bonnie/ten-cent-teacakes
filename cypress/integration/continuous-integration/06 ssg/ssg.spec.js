/* eslint-disable no-param-reassign */
// reference: https://glebbahmutov.com/blog/ssr-e2e/

it("shows band when skipping client-side bundle", () => {
  cy.request("/band")
    .its("body")
    .then((html) => {
      // remove the application code bundle so that it doesn't override the static generation
      html = html.replace('<script src="/bundle.js"></script>', "");
      cy.state("document").write(html);
    });

  cy.findByRole("heading", { name: /bonnie/i }).should("exist");
});

// it("renders same application after hydration", () => {
//   // technical detail - removes any stubs from previous tests
//   // since our application iframe does not get reset
//   // (there is no "cy.visit" call to reset it)
//   const win = cy.state("window");
//   delete win.createReactClass;

//   let pageHtml;
//   cy.request("/")
//     .its("body")
//     .then((html) => {
//       pageHtml = html;
//       // remove bundle script to only have static HTML
//       cy.state("document").write(
//         html.replace('<script src="/bundle.js"></script>', ""),,
//       );
//     });

//   cy.get("li").should("have.length", 4);
//   cy.get("button").should("be.disabled");

//   let staticHTML;
//   cy.get("#content")
//     .invoke("html")
//     // static HTML before hydration has the "disabled" button attribute
//     // we should remove it before comparing to hydrated HTML
//     .then((html) => (staticHTML = html.replace(' disabled=""', "")))

//     // now mount the full page and let it hydrate
//     .then(resetDocument)
//     .then(() => {
//       cy.state("document").write(pageHtml);
//     });

//   // now the page should be live client-side
//   cy.get("button").should("be.enabled");

//   cy.get("#content")
//     .invoke("html")
//     .then((html) => {
//       expect(html).to.equal(staticHTML);
//     });
// });
