it("uses placeholder images on the musicians page", () => {
  cy.visit("/band");

  // loading images should appear
  cy.findAllByRole("img", { name: /loading/ }).then(($images) => {
    // need to use .then to "freeze" value so it doesn't change when images load
    expect($images.length).to.equal(3);
    expect($images.first().attr("src")).to.equal("/logo/tencent-tag.svg");
  });

  // and disappear
  cy.findByRole("img", { name: /loading/ }).should("not.exist");
});

it("uses placeholder images on the photos page", () => {
  cy.visit("/photos");

  // loading images should appear
  cy.findAllByRole("img", { name: /loading/ }).then(($images) => {
    // need to use .then to "freeze" value so it doesn't change when images load
    expect($images.length).to.equal(3);
    expect($images.first().attr("src")).to.equal("/logo/tencent-tag.svg");
  });

  // and disappear
  cy.findByRole("img", { name: /loading/ }).should("not.exist");
});
