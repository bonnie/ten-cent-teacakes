// import { test } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";

import Photos from "@/pages/photos";
import { render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

test("hydrates on load", async () => {
  render(<Photos />, { renderOptions: { hydrate: true } });
  // find all the images; from msw, there are three expected
  const showDates = await screen.findAllByRole("img");
  expect(showDates).toHaveLength(3);
});

test("should have no a11y errors caught by jest-axe", async () => {
  const { container } = render(<Photos />, {
    renderOptions: { hydrate: true },
  });

  await screen.findAllByRole("img"); // to avoid "not wrapped in act"
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
