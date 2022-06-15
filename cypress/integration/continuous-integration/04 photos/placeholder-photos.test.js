it("uses placeholder images on the musicians page", () => {
  // make sure actual images don't load so fast that loading images are missed
  // reference: https://www.cypress.io/blog/2021/01/26/when-can-the-test-blink/#the-loading-element-test
  // the middleware / setTimeout is somewhat convoluted, but I got JSON errors when I returned an image fixture
  cy.intercept(
    "https://yyzmaxpgsxkmyjrxydaa.supabase.co/storage/v1/object/sign/**",
    { middleware: true },
    () => setTimeout(() => {}, 1000),
  );

  cy.resetDbAndIsrCache();
  cy.visit("/band");

  // loading images should appear
  cy.findAllByRole("img", { name: /loading/ }).then(($images) => {
    // need to use .then to "freeze" value so it doesn't change when images load
    expect($images.length).to.equal(3);
    expect($images.first().attr("src")).to.equal("/logo/tencent-tag.svg");
  });

  // and disappear
  cy.findByRole("img", { name: /loading/ }).should("not.exist");

  // wait for images to load, so as not to cause issues for the next test
  cy.get(
    "img[src*='https://yyzmaxpgsxkmyjrxydaa.supabase.co/storage/v1/object/sign']",
  ).should("have.length", 3);
});

// TODO: understand why resetting db doesn't seem to work here
// consistently fails with extra avalanche of cheese photo, even when no tests were run before
it("uses placeholder images on the photos page", () => {
  // make sure actual images don't load so fast that loading images are missed
  // reference: https://www.cypress.io/blog/2021/01/26/when-can-the-test-blink/#the-loading-element-test
  // the middleware / setTimeout is somewhat convoluted, but I got JSON errors when I returned an image fixture
  cy.intercept(
    "https://yyzmaxpgsxkmyjrxydaa.supabase.co/storage/v1/object/sign/**",
    { middleware: true },
    () => setTimeout(() => {}, 1000),
  );

  cy.resetDbAndIsrCache();
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
